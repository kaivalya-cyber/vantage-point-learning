-- Temporarily disable foreign key constraints for sample data insertion
ALTER TABLE public.questions DISABLE TRIGGER ALL;
ALTER TABLE public.question_answers DISABLE TRIGGER ALL;

-- Insert sample questions without foreign key constraint issues
INSERT INTO public.questions (title, content, category, asker_id, status, upvotes) VALUES
-- Sports category
('How to balance sports and academics?', 'I''m struggling to manage my time between basketball practice and studying. Any tips from fellow student athletes? Practice is 3 hours daily and I have a heavy course load.', 'Sports', gen_random_uuid(), 'answered', 5),
('Training schedule for cross country runners?', 'What''s a good weekly training plan for someone new to cross country running? I want to join the team but haven''t run competitively before.', 'Sports', gen_random_uuid(), 'open', 3),
('Nutrition tips for student athletes?', 'I''m always tired after practice and struggling with energy levels. What should I be eating as a student athlete on a budget?', 'Sports', gen_random_uuid(), 'open', 2),

-- Academic category
('Best pre-med courses for freshman year?', 'I want to get into medical school. Which courses should I prioritize in my first year? Should I take organic chemistry right away?', 'Academic', gen_random_uuid(), 'answered', 8),
('Effective study techniques for calculus?', 'I''m really struggling with calculus concepts. What study methods work best for math courses? I''ve tried Khan Academy but need more help.', 'Academic', gen_random_uuid(), 'open', 4),
('How to choose between majors?', 'I''m torn between computer science and electrical engineering. Both seem interesting but I''m not sure which has better career prospects.', 'Academic', gen_random_uuid(), 'open', 6),

-- Extracurriculars category
('How to start a club at college?', 'I want to create a robotics club but don''t know the process. Has anyone done this before? What paperwork is needed?', 'Extracurriculars', gen_random_uuid(), 'answered', 7),
('Best leadership opportunities for freshmen?', 'I want to develop leadership skills but most positions require upperclassmen. What opportunities are available for first-years?', 'Extracurriculars', gen_random_uuid(), 'open', 3),
('Volunteer work vs paid internships?', 'Should I prioritize volunteer work or try to find paid internships? I need both experience and money for college.', 'Extracurriculars', gen_random_uuid(), 'open', 2),

-- College Prep category
('SAT vs ACT - which is better?', 'I''m a junior and need to decide which standardized test to focus on. What are the pros and cons of each? My practice scores are similar.', 'College Prep', gen_random_uuid(), 'answered', 12),
('How many AP classes should I take?', 'My school offers 15 AP courses and I''m not sure how many to take senior year. I want to be competitive but not overwhelmed.', 'College Prep', gen_random_uuid(), 'open', 5),
('College application essay tips?', 'I''m stuck on my personal statement. How do I make my essay stand out without sounding pretentious or cliché?', 'College Prep', gen_random_uuid(), 'open', 9),

-- Study Tips category
('How to manage multiple deadlines?', 'I have 3 projects due next week and I''m feeling overwhelmed. Any time management strategies that actually work?', 'Study Tips', gen_random_uuid(), 'answered', 6),
('Best note-taking methods for lectures?', 'I can never keep up with fast-paced lectures. Should I handwrite or type notes? Any specific systems that work well?', 'Study Tips', gen_random_uuid(), 'open', 4),
('How to stay motivated during finals?', 'I always lose steam during finals week. How do you maintain focus and energy when everything is due at once?', 'Study Tips', gen_random_uuid(), 'open', 8),

-- Time Management category
('Work-study job vs focusing on grades?', 'I need money but my grades are suffering from my part-time job. How do successful students balance work and academics?', 'Time Management', gen_random_uuid(), 'open', 5),
('Morning routine for busy students?', 'I''m always rushing in the morning and it sets a bad tone for the day. What''s a realistic morning routine for college students?', 'Time Management', gen_random_uuid(), 'open', 3),

-- Career category
('Internship vs research opportunities?', 'Should I prioritize getting an internship or doing undergraduate research for my career goals? I''m interested in both industry and academia.', 'Career', gen_random_uuid(), 'answered', 10),
('How to network as an introvert?', 'Networking events make me anxious but I know they''re important for career development. Any tips for introverted students?', 'Career', gen_random_uuid(), 'open', 7),
('When to start thinking about graduate school?', 'I''m a sophomore and wondering when I should start preparing for graduate school applications. Is it too early to think about this?', 'Career', gen_random_uuid(), 'open', 4),

-- Social category
('Making friends in college as an introvert?', 'I''m naturally shy and having trouble connecting with people in my dorm. Any advice for building meaningful friendships?', 'Social', gen_random_uuid(), 'answered', 9),
('Dealing with roommate conflicts?', 'My roommate and I have very different lifestyles and it''s causing tension. How do I address this without making things worse?', 'Social', gen_random_uuid(), 'open', 6),
('Long-distance relationship in college?', 'My high school relationship is getting strained by distance and different college experiences. Any advice on making it work?', 'Social', gen_random_uuid(), 'open', 3),

-- General category
('Best way to ask professors for recommendation letters?', 'I need letters of rec for graduate school applications. How do I approach professors I don''t know well? When should I ask?', 'General', gen_random_uuid(), 'answered', 11),
('How to make the most of office hours?', 'I''ve never been to a professor''s office hours and I''m not sure what to expect. What should I prepare and how do I make a good impression?', 'General', gen_random_uuid(), 'open', 5),
('Transfer student adjustment tips?', 'I''m transferring to a new school next semester and worried about fitting in. Any advice for transfer students?', 'General', gen_random_uuid(), 'open', 4);

-- Insert sample answers
INSERT INTO public.question_answers (question_id, content, answerer_id, upvotes, is_accepted) VALUES
-- Answer for SAT vs ACT
((SELECT id FROM public.questions WHERE title = 'SAT vs ACT - which is better?' LIMIT 1), 
'I took both and found the ACT format worked better for me. The ACT has more straightforward questions and includes a science section, while the SAT focuses more on reading comprehension and evidence-based questions. The ACT is also slightly faster-paced. I''d recommend taking a practice test for both to see which feels more natural to you!', 
gen_random_uuid(), 8, true),

-- Answer for sports/academics balance
((SELECT id FROM public.questions WHERE title = 'How to balance sports and academics?' LIMIT 1), 
'Time blocking saved my college career! I dedicated specific hours for practice, study, and rest. Also, don''t be afraid to use travel time for reviewing notes or flashcards. Communication with professors about your schedule is key too - most are understanding if you''re upfront about your commitments.', 
gen_random_uuid(), 6, true),

((SELECT id FROM public.questions WHERE title = 'How to balance sports and academics?' LIMIT 1), 
'As a former student athlete, I''d add that meal prep is crucial. Having healthy meals ready saves time and keeps your energy up. Also, study with teammates when possible - you''re all dealing with similar schedules!', 
gen_random_uuid(), 4, false),

-- Answer for pre-med courses
((SELECT id FROM public.questions WHERE title = 'Best pre-med courses for freshman year?' LIMIT 1), 
'Don''t rush into organic chemistry! Start with general biology, general chemistry, and calculus. These build the foundation you need. Also take English composition - medical schools require strong writing skills. Save organic chem and physics for when you have a solid GPA established.', 
gen_random_uuid(), 12, true),

-- Answer for starting a club
((SELECT id FROM public.questions WHERE title = 'How to start a club at college?' LIMIT 1), 
'I started our debate club! First, check with Student Life office for the official process. You''ll typically need a faculty advisor, a constitution, and a minimum number of interested students (usually 5-10). Start by finding people who share your interest, then work on the paperwork together.', 
gen_random_uuid(), 9, true),

-- Answer for multiple deadlines
((SELECT id FROM public.questions WHERE title = 'How to manage multiple deadlines?' LIMIT 1), 
'Break everything down into smaller tasks and use a planner or app like Notion. I assign each project a color and work backwards from the due date. Don''t try to multitask - focus on one thing at a time. And don''t forget to schedule breaks!', 
gen_random_uuid(), 7, true),

-- Answer for internship vs research
((SELECT id FROM public.questions WHERE title = 'Internship vs research opportunities?' LIMIT 1), 
'It depends on your career goals! If you''re planning graduate school, research experience is more valuable. If you want to go straight into industry, internships provide practical experience and networking. You might also be able to do both - summer internship and research during the school year.', 
gen_random_uuid(), 8, true),

-- Answer for making friends as introvert
((SELECT id FROM public.questions WHERE title = 'Making friends in college as an introvert?' LIMIT 1), 
'Join smaller clubs or organizations based on your interests rather than large social events. Study groups are also great for building friendships naturally. Don''t feel pressure to be someone you''re not - authentic connections are better than surface-level ones. Quality over quantity!', 
gen_random_uuid(), 10, true),

-- Answer for recommendation letters
((SELECT id FROM public.questions WHERE title = 'Best way to ask professors for recommendation letters?' LIMIT 1), 
'Ask at least 2-3 months in advance. Attend office hours regularly to build relationships first. When you ask, provide your resume, personal statement, and specific details about what you''re applying for. Make it easy for them by explaining why you''re asking them specifically and what you''d like them to highlight.', 
gen_random_uuid(), 13, true);

-- Re-enable triggers
ALTER TABLE public.questions ENABLE TRIGGER ALL;
ALTER TABLE public.question_answers ENABLE TRIGGER ALL;