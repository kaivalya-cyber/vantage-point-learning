-- Create sample profiles first for the sample questions using correct enum values
INSERT INTO public.profiles (user_id, email, display_name, role, college, major) VALUES
('00000000-0000-0000-0000-000000000001', 'student1@example.com', 'Alex Johnson', 'freshman', 'State University', 'Computer Science'),
('00000000-0000-0000-0000-000000000002', 'student2@example.com', 'Sarah Chen', 'senior', 'Tech Institute', 'Biomedical Engineering');

-- Add sample questions for different categories
INSERT INTO public.questions (title, content, category, asker_id, status) VALUES
('How to balance sports and academics?', 'I''m struggling to manage my time between basketball practice and studying. Any tips from fellow student athletes?', 'Sports', '00000000-0000-0000-0000-000000000001', 'open'),
('Best pre-med courses for freshman year?', 'I want to get into medical school. Which courses should I prioritize in my first year?', 'Academic', '00000000-0000-0000-0000-000000000001', 'open'),
('How to start a club at college?', 'I want to create a robotics club but don''t know the process. Has anyone done this before?', 'Extracurriculars', '00000000-0000-0000-0000-000000000001', 'open'),
('SAT vs ACT - which is better?', 'I''m a junior and need to decide which standardized test to focus on. What are the pros and cons?', 'College Prep', '00000000-0000-0000-0000-000000000001', 'answered'),
('Effective study techniques for calculus?', 'I''m really struggling with calculus concepts. What study methods work best for math courses?', 'Study Tips', '00000000-0000-0000-0000-000000000001', 'open'),
('How to manage multiple deadlines?', 'I have 3 projects due next week and I''m feeling overwhelmed. Any time management strategies?', 'Time Management', '00000000-0000-0000-0000-000000000001', 'open'),
('Internship vs research opportunities?', 'Should I prioritize getting an internship or doing undergraduate research for my career goals?', 'Career', '00000000-0000-0000-0000-000000000001', 'open'),
('Making friends in college as an introvert?', 'I''m naturally shy and having trouble connecting with people in my dorm. Any advice?', 'Social', '00000000-0000-0000-0000-000000000001', 'open'),
('Best way to ask professors for recommendation letters?', 'I need letters of rec for graduate school applications. How do I approach professors I don''t know well?', 'General', '00000000-0000-0000-0000-000000000001', 'open'),
('Training schedule for cross country runners?', 'What''s a good weekly training plan for someone new to cross country running?', 'Sports', '00000000-0000-0000-0000-000000000001', 'open');

-- Add sample answers for some questions
INSERT INTO public.question_answers (question_id, content, answerer_id) VALUES
((SELECT id FROM public.questions WHERE title = 'SAT vs ACT - which is better?' LIMIT 1), 'I took both and found the ACT format worked better for me. The ACT has more straightforward questions and includes a science section, while the SAT focuses more on reading comprehension and evidence-based questions. I''d recommend taking a practice test for both to see which feels more natural!', '00000000-0000-0000-0000-000000000002'),
((SELECT id FROM public.questions WHERE title = 'How to balance sports and academics?' LIMIT 1), 'Time blocking saved my college career! I dedicated specific hours for practice, study, and rest. Also, don''t be afraid to use travel time for reviewing notes or flashcards. Communication with professors about your schedule is key too.', '00000000-0000-0000-0000-000000000002');