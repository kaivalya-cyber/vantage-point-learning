-- Add tags and difficulty to advice table
ALTER TABLE public.advice ADD COLUMN tags text[] DEFAULT '{}';
ALTER TABLE public.advice ADD COLUMN tags_search text GENERATED ALWAYS AS (array_to_string(tags, ' ')) STORED;

-- Add reputation and badges to profiles
ALTER TABLE public.profiles ADD COLUMN reputation integer DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN badges text[] DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN total_answers integer DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN total_questions integer DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN helpful_answers integer DEFAULT 0;

-- Add accepted answer functionality to question_answers
ALTER TABLE public.question_answers ADD COLUMN is_accepted boolean DEFAULT false;

-- Create upvotes tracking table for advice
CREATE TABLE public.advice_upvotes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  advice_id uuid NOT NULL REFERENCES public.advice(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(advice_id, user_id)
);

-- Create upvotes tracking table for questions
CREATE TABLE public.question_upvotes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(question_id, user_id)
);

-- Create upvotes tracking table for answers
CREATE TABLE public.answer_upvotes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  answer_id uuid NOT NULL REFERENCES public.question_answers(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(answer_id, user_id)
);

-- Enable RLS on upvote tables
ALTER TABLE public.advice_upvotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_upvotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answer_upvotes ENABLE ROW LEVEL SECURITY;

-- Policies for advice upvotes
CREATE POLICY "Users can view all advice upvotes" 
ON public.advice_upvotes FOR SELECT USING (true);

CREATE POLICY "Users can create their own advice upvotes" 
ON public.advice_upvotes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own advice upvotes" 
ON public.advice_upvotes FOR DELETE 
USING (auth.uid() = user_id);

-- Policies for question upvotes
CREATE POLICY "Users can view all question upvotes" 
ON public.question_upvotes FOR SELECT USING (true);

CREATE POLICY "Users can create their own question upvotes" 
ON public.question_upvotes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own question upvotes" 
ON public.question_upvotes FOR DELETE 
USING (auth.uid() = user_id);

-- Policies for answer upvotes
CREATE POLICY "Users can view all answer upvotes" 
ON public.answer_upvotes FOR SELECT USING (true);

CREATE POLICY "Users can create their own answer upvotes" 
ON public.answer_upvotes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own answer upvotes" 
ON public.answer_upvotes FOR DELETE 
USING (auth.uid() = user_id);

-- Functions to update upvote counts
CREATE OR REPLACE FUNCTION public.update_advice_upvotes()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.advice 
    SET upvotes = upvotes + 1 
    WHERE id = NEW.advice_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.advice 
    SET upvotes = GREATEST(upvotes - 1, 0) 
    WHERE id = OLD.advice_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_question_upvotes()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.questions 
    SET upvotes = upvotes + 1 
    WHERE id = NEW.question_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.questions 
    SET upvotes = GREATEST(upvotes - 1, 0) 
    WHERE id = OLD.question_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_answer_upvotes()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.question_answers 
    SET upvotes = upvotes + 1 
    WHERE id = NEW.answer_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.question_answers 
    SET upvotes = GREATEST(upvotes - 1, 0) 
    WHERE id = OLD.answer_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers for upvote counting
CREATE TRIGGER advice_upvote_trigger
  AFTER INSERT OR DELETE ON public.advice_upvotes
  FOR EACH ROW EXECUTE FUNCTION public.update_advice_upvotes();

CREATE TRIGGER question_upvote_trigger
  AFTER INSERT OR DELETE ON public.question_upvotes
  FOR EACH ROW EXECUTE FUNCTION public.update_question_upvotes();

CREATE TRIGGER answer_upvote_trigger
  AFTER INSERT OR DELETE ON public.answer_upvotes
  FOR EACH ROW EXECUTE FUNCTION public.update_answer_upvotes();

-- Function to update profile stats
CREATE OR REPLACE FUNCTION public.update_profile_stats()
RETURNS trigger AS $$
DECLARE
  profile_user_id uuid;
BEGIN
  -- Determine the user_id based on the operation
  IF TG_TABLE_NAME = 'questions' THEN
    profile_user_id = COALESCE(NEW.asker_id, OLD.asker_id);
  ELSIF TG_TABLE_NAME = 'question_answers' THEN
    profile_user_id = COALESCE(NEW.answerer_id, OLD.answerer_id);
  END IF;

  -- Update profile stats
  UPDATE public.profiles SET
    total_questions = (
      SELECT COUNT(*) FROM public.questions 
      WHERE asker_id = profile_user_id
    ),
    total_answers = (
      SELECT COUNT(*) FROM public.question_answers 
      WHERE answerer_id = profile_user_id
    ),
    helpful_answers = (
      SELECT COUNT(*) FROM public.question_answers 
      WHERE answerer_id = profile_user_id AND is_accepted = true
    ),
    reputation = (
      SELECT COALESCE(
        (SELECT COUNT(*) FROM public.questions WHERE asker_id = profile_user_id) * 5 +
        (SELECT COUNT(*) FROM public.question_answers WHERE answerer_id = profile_user_id) * 10 +
        (SELECT COUNT(*) FROM public.question_answers WHERE answerer_id = profile_user_id AND is_accepted = true) * 25 +
        (SELECT COALESCE(SUM(upvotes), 0) FROM public.questions WHERE asker_id = profile_user_id) * 2 +
        (SELECT COALESCE(SUM(upvotes), 0) FROM public.question_answers WHERE answerer_id = profile_user_id) * 3,
        0
      )
    )
  WHERE user_id = profile_user_id;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers for profile stats
CREATE TRIGGER update_profile_stats_on_questions
  AFTER INSERT OR UPDATE OR DELETE ON public.questions
  FOR EACH ROW EXECUTE FUNCTION public.update_profile_stats();

CREATE TRIGGER update_profile_stats_on_answers
  AFTER INSERT OR UPDATE OR DELETE ON public.question_answers
  FOR EACH ROW EXECUTE FUNCTION public.update_profile_stats();