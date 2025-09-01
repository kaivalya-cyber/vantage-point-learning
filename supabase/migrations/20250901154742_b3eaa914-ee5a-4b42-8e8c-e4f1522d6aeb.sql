-- Insert sample users (profiles)
INSERT INTO public.profiles (id, user_id, email, display_name, role, college, graduation_year, major, bio, points, reputation, badges, total_questions, total_answers, helpful_answers) VALUES
('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'alex@college.edu', 'Alex Chen', 'senior', 'Stanford University', 2025, 'Computer Science', 'CS senior passionate about algorithms and machine learning. Always happy to help!', 850, 1250, ARRAY['computer-science', 'Helper', 'Top Contributor'], 8, 45, 32),
('22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'maya@university.edu', 'Maya Rodriguez', 'alumni', 'MIT', 2023, 'Mathematics', 'Math PhD student at MIT. Love helping with calculus and linear algebra problems.', 1200, 1800, ARRAY['math', 'Expert', 'Mentor'], 12, 68, 54),
('33333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'jordan@school.edu', 'Jordan Williams', 'freshman', 'UC Berkeley', 2028, 'Psychology', 'First-year psych major. Still learning but eager to contribute!', 320, 450, ARRAY['psychology', 'Newcomer'], 15, 8, 3),
('44444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 'sarah@college.edu', 'Sarah Johnson', 'senior', 'Harvard University', 2025, 'Biology', 'Pre-med student specializing in molecular biology and biochemistry.', 920, 1400, ARRAY['science', 'Helper', 'Study Group Leader'], 6, 38, 28),
('55555555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', 'mike@uni.edu', 'Mike Thompson', 'alumni', 'University of Chicago', 2022, 'Economics', 'Working in finance now. Happy to share insights about econ and business courses.', 680, 980, ARRAY['business', 'Mentor'], 4, 29, 18);

-- Insert sample questions
INSERT INTO public.questions (id, title, content, category, asker_id, upvotes, status) VALUES
('q1111111-1111-1111-1111-111111111111', 'Help with Calculus II Integration by Parts', 'I''m struggling with integration by parts problems, especially when they involve trigonometric functions. Can someone explain the LIATE rule and provide some examples?', 'Mathematics', '33333333-3333-3333-3333-333333333333', 8, 'open'),
('q2222222-2222-2222-2222-222222222222', 'Data Structures: When to use HashMap vs TreeMap?', 'I''m working on a project and can''t decide between HashMap and TreeMap. What are the performance implications and use cases for each?', 'Computer Science', '33333333-3333-3333-3333-333333333333', 12, 'answered'),
('q3333333-3333-3333-3333-333333333333', 'Understanding Classical Conditioning in Psychology', 'Can someone help me understand the difference between classical and operant conditioning? I have an exam coming up and I keep mixing them up.', 'Psychology', '33333333-3333-3333-3333-333333333333', 6, 'open'),
('q4444444-4444-4444-4444-444444444444', 'Organic Chemistry: Nucleophilic Substitution Mechanisms', 'I''m having trouble understanding SN1 vs SN2 mechanisms. How do I determine which mechanism a reaction will follow?', 'Chemistry', '33333333-3333-3333-3333-333333333333', 15, 'answered'),
('q5555555-5555-5555-5555-555555555555', 'Essay Writing: Crafting Strong Thesis Statements', 'My English professor keeps saying my thesis statements are too weak. How do I write a compelling, arguable thesis for analytical essays?', 'English', '11111111-1111-1111-1111-111111111111', 4, 'open');

-- Insert sample answers
INSERT INTO public.question_answers (id, question_id, content, answerer_id, upvotes, is_accepted) VALUES
('a1111111-1111-1111-1111-111111111111', 'q2222222-2222-2222-2222-222222222222', 'Great question! HashMap provides O(1) average case for get/put operations, while TreeMap provides O(log n). Use HashMap when you need fast access and don''t care about ordering. Use TreeMap when you need sorted keys or range queries. For most cases, HashMap is preferred due to better performance.', '11111111-1111-1111-1111-111111111111', 18, true),
('a2222222-2222-2222-2222-222222222222', 'q4444444-4444-4444-4444-444444444444', 'SN1 vs SN2 depends on several factors: 1) Substrate structure - SN2 favors primary carbons, SN1 favors tertiary. 2) Nucleophile strength - strong nucleophiles favor SN2. 3) Solvent - polar protic solvents favor SN1, polar aprotic favor SN2. 4) Temperature - higher temps favor SN1. Draw out the mechanisms to visualize the differences!', '44444444-4444-4444-4444-444444444444', 22, true),
('a3333333-3333-3333-3333-333333333333', 'q1111111-1111-1111-1111-111111111111', 'LIATE rule helps you choose u in integration by parts: Logarithmic, Inverse trig, Algebraic, Trig, Exponential. Pick u as the first type that appears. For example, in ∫x sin(x) dx, x is algebraic and sin(x) is trig, so u = x and dv = sin(x)dx. Remember: ∫u dv = uv - ∫v du', '22222222-2222-2222-2222-222222222222', 14, false),
('a4444444-4444-4444-4444-444444444444', 'q3333333-3333-3333-3333-333333333333', 'Classical conditioning involves learning through association (Pavlov''s dogs - bell + food = salivation). Operant conditioning involves learning through consequences (rewards/punishments). Key difference: classical is involuntary responses, operant is voluntary behaviors. Think: classical = automatic, operant = choice-based.', '33333333-3333-3333-3333-333333333333', 9, false);

-- Insert sample advice
INSERT INTO public.advice (id, course, study_tip, mistake, resources, author_id, difficulty_rating, upvotes, tags, is_anonymous) VALUES
('ad111111-1111-1111-1111-111111111111', 'Calculus I', 'Practice derivatives daily, even if just 15 minutes. Use the chain rule breakdown method: identify outer function, inner function, then apply the rule step by step.', 'Don''t skip the algebra review! I thought I could jump straight into limits but my algebra was rusty and it hurt me all semester.', 'Khan Academy Calculus playlist, Professor Leonard on YouTube, Paul''s Online Math Notes', '22222222-2222-2222-2222-222222222222', 'intermediate', 34, ARRAY['calculus', 'derivatives', 'study-tips'], false),
('ad222222-2222-2222-2222-222222222222', 'Data Structures & Algorithms', 'Implement each data structure from scratch at least once. Don''t just memorize - understand WHY each operation has its time complexity.', 'I relied too heavily on memorizing Big O notations without understanding the underlying mechanics. During interviews, I couldn''t explain my reasoning.', 'LeetCode, Cracking the Coding Interview book, Visualgo.net for algorithm visualization', '11111111-1111-1111-1111-111111111111', 'hard', 28, ARRAY['programming', 'algorithms', 'interview-prep'], false),
('ad333333-3333-3333-3333-333333333333', 'Organic Chemistry', 'Draw mechanisms by hand repeatedly. Use different colored pens for electron movement. Make flashcards for each reaction type with conditions and products.', 'I tried to memorize reactions without understanding electron flow. Failed my first midterm because I couldn''t adapt to new reaction variations.', 'Organic Chemistry as a Second Language by David Klein, Master Organic Chemistry website', '44444444-4444-4444-4444-444444444444', 'hard', 19, ARRAY['chemistry', 'mechanisms', 'memorization'], false),
('ad444444-4444-4444-4444-444444444444', 'Statistics 101', 'Always check your assumptions before running statistical tests. Create a checklist: normality, independence, equal variance. Visualize your data first!', 'Jumped straight into t-tests without checking if my data was normally distributed. Got completely wrong conclusions on my final project.', 'R for Data Science book, StatQuest YouTube channel, Khan Academy Statistics', '55555555-5555-5555-5555-555555555555', 'beginner', 16, ARRAY['statistics', 'assumptions', 'data-analysis'], false);

-- Insert sample course ratings
INSERT INTO public.course_ratings (id, course_name, professor, difficulty, workload_hours, rating, review, rater_id) VALUES
('cr111111-1111-1111-1111-111111111111', 'CS 161: Data Structures', 'Dr. Smith', 'hard', 15, 4, 'Challenging but rewarding course. Dr. Smith explains concepts clearly and provides great coding examples. Heavy workload but you learn a lot.', '11111111-1111-1111-1111-111111111111'),
('cr222222-2222-2222-2222-222222222222', 'MATH 21A: Calculus', 'Prof. Johnson', 'intermediate', 10, 5, 'Excellent professor! Makes calculus concepts intuitive. Office hours are super helpful. Exams are fair if you do the homework.', '22222222-2222-2222-2222-222222222222'),
('cr333333-3333-3333-3333-333333333333', 'CHEM 51A: Organic Chemistry', 'Dr. Williams', 'hard', 20, 3, 'Very difficult course. Dr. Williams knows the material but goes through it quickly. Definitely attend discussion sections and form study groups.', '44444444-4444-4444-4444-444444444444'),
('cr444444-4444-4444-4444-444444444444', 'PSYC 1: Introduction to Psychology', 'Prof. Davis', 'easy', 8, 4, 'Great introductory course! Prof. Davis uses interesting real-world examples. Lots of reading but material is fascinating.', '33333333-3333-3333-3333-333333333333');

-- Insert sample scholarships
INSERT INTO public.scholarships (id, title, description, amount, deadline, requirements, application_url, submitted_by) VALUES
('s1111111-1111-1111-1111-111111111111', 'STEM Excellence Scholarship', 'Supporting outstanding students in Science, Technology, Engineering, and Mathematics fields. Open to undergraduates with strong academic performance.', '$5,000', '2024-04-15', 'Minimum 3.5 GPA, STEM major, essay submission, letter of recommendation', 'https://example.com/stem-scholarship', '11111111-1111-1111-1111-111111111111'),
('s2222222-2222-2222-2222-222222222222', 'First-Generation College Student Award', 'Supporting students who are the first in their family to attend college. Financial need and academic merit considered.', '$3,000', '2024-05-01', 'First-generation college student, financial need demonstration, personal statement', 'https://example.com/first-gen-scholarship', '22222222-2222-2222-2222-222222222222'),
('s3333333-3333-3333-3333-333333333333', 'Psychology Research Grant', 'Funding for undergraduate psychology students conducting original research projects with faculty mentorship.', '$2,500', '2024-03-30', 'Psychology major, research proposal, faculty mentor agreement, minimum 3.0 GPA', 'https://example.com/psych-research-grant', '33333333-3333-3333-3333-333333333333');

-- Insert some upvotes for questions
INSERT INTO public.question_upvotes (id, question_id, user_id) VALUES
('qu111111-1111-1111-1111-111111111111', 'q1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
('qu222222-2222-2222-2222-222222222222', 'q1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222'),
('qu333333-3333-3333-3333-333333333333', 'q2222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333'),
('qu444444-4444-4444-4444-444444444444', 'q2222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444');

-- Insert some upvotes for answers
INSERT INTO public.answer_upvotes (id, answer_id, user_id) VALUES
('au111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222'),
('au222222-2222-2222-2222-222222222222', 'a1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333'),
('au333333-3333-3333-3333-333333333333', 'a2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111');

-- Insert some upvotes for advice
INSERT INTO public.advice_upvotes (id, advice_id, user_id) VALUES
('adu11111-1111-1111-1111-111111111111', 'ad111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
('adu22222-2222-2222-2222-222222222222', 'ad111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333'),
('adu33333-3333-3333-3333-333333333333', 'ad222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222');