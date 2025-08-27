-- Add tags and difficulty to advice table
ALTER TABLE public.advice ADD COLUMN tags text[] DEFAULT '{}';

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