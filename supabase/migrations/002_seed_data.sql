-- Seed aptitude questions
INSERT INTO aptitude_questions (section, topic, question, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty) VALUES
-- Quantitative Aptitude - Easy
('Quantitative Aptitude', 'Number System', 'What is the sum of first 10 natural numbers?', '50', '55', '60', '45', 'B', 'Sum = n(n+1)/2 = 10(11)/2 = 55', 'Easy'),
('Quantitative Aptitude', 'Percentages', 'What is 25% of 200?', '25', '50', '75', '100', 'B', '25% of 200 = (25/100) × 200 = 50', 'Easy'),
('Quantitative Aptitude', 'Profit & Loss', 'If CP = 100 and SP = 120, what is the profit %?', '10%', '15%', '20%', '25%', 'C', 'Profit% = [(SP-CP)/CP] × 100 = [(120-100)/100] × 100 = 20%', 'Easy'),

-- Quantitative Aptitude - Medium
('Quantitative Aptitude', 'Time & Work', 'A can complete work in 10 days, B in 15 days. Together in how many days?', '5', '6', '7', '8', 'B', '1/10 + 1/15 = 5/30 = 1/6, so 6 days', 'Medium'),
('Quantitative Aptitude', 'Probability', 'Probability of getting a head when tossing a fair coin?', '0.25', '0.5', '0.75', '1', 'B', 'P(Head) = 1/2 = 0.5', 'Easy'),
('Quantitative Aptitude', 'Data Interpretation', 'If sales increased from 100 to 150, what is the % increase?', '30%', '40%', '50%', '60%', 'C', '[(150-100)/100] × 100 = 50%', 'Medium'),

-- Logical Reasoning - Easy
('Logical Reasoning', 'Series Completion', 'Complete the series: 2, 4, 6, 8, ?', '9', '10', '11', '12', 'B', 'Arithmetic progression with difference 2', 'Easy'),
('Logical Reasoning', 'Coding-Decoding', 'If CAT = 312, then DOG = ?', '415', '426', '437', '448', 'C', 'C=3, A=1, T=20 (simplified). D=4, O=15, G=7', 'Medium'),
('Logical Reasoning', 'Blood Relations', 'A is B''s sister. B is C''s father. How is A related to C?', 'Mother', 'Sister', 'Aunt', 'Daughter', 'C', 'A is C''s aunt', 'Easy'),

-- Logical Reasoning - Medium
('Logical Reasoning', 'Seating Arrangement', 'In a row of 5 people, A is to the left of B. B is to the right of C. C is to the left of D. Who is in the middle?', 'A', 'B', 'C', 'D', 'C', 'Order: A, C, B, D (with one more person)', 'Medium'),
('Logical Reasoning', 'Puzzles', 'If 1=3, 2=3, 3=5, 4=4, 5=4, then 6=?', '3', '4', '5', '6', 'A', 'Based on number of letters: six has 3 letters', 'Hard'),

-- Verbal Ability - Easy
('Verbal Ability', 'Synonyms', 'Synonym of "Happy":', 'Sad', 'Joyful', 'Angry', 'Tired', 'B', 'Joyful means happy', 'Easy'),
('Verbal Ability', 'Antonyms', 'Antonym of "Dark":', 'Night', 'Black', 'Light', 'Shadow', 'C', 'Light is opposite of dark', 'Easy'),
('Verbal Ability', 'Sentence Completion', 'She is very _____ in her work.', 'lazy', 'diligent', 'careless', 'rude', 'B', 'Diligent means hardworking', 'Easy'),

-- Verbal Ability - Medium
('Verbal Ability', 'Error Detection', 'Find the error: "He don''t like coffee."', 'He', 'don''t', 'like', 'coffee', 'B', 'Should be "doesn''t" for third person singular', 'Medium'),
('Verbal Ability', 'Para Jumbles', 'Arrange: (A) Finally, he succeeded. (B) He tried many times. (C) John wanted to win. (D) He never gave up.', 'ABCD', 'CBDA', 'CABD', 'DCBA', 'B', 'Logical order: C-B-D-A', 'Medium'),

-- Domain-Specific (CSE) - Easy
('Domain-Specific', 'Data Structures', 'Which data structure uses LIFO?', 'Queue', 'Stack', 'Tree', 'Graph', 'B', 'Stack follows Last In First Out', 'Easy'),
('Domain-Specific', 'Algorithms', 'Time complexity of binary search?', 'O(n)', 'O(log n)', 'O(n²)', 'O(1)', 'B', 'Binary search divides array in half each time', 'Medium'),
('Domain-Specific', 'DBMS', 'What does SQL stand for?', 'Standard Query Language', 'Structured Query Language', 'Simple Query Language', 'System Query Language', 'B', 'SQL = Structured Query Language', 'Easy'),

-- Domain-Specific (CSE) - Medium
('Domain-Specific', 'Operating Systems', 'Which scheduling algorithm can cause starvation?', 'FCFS', 'Round Robin', 'Priority Scheduling', 'SJF', 'C', 'Low priority processes may never execute', 'Medium'),
('Domain-Specific', 'Computer Networks', 'Which layer is responsible for routing in OSI model?', 'Physical', 'Data Link', 'Network', 'Transport', 'C', 'Network layer handles routing', 'Medium'),
('Domain-Specific', 'OOP Concepts', 'Which OOP principle hides implementation details?', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction', 'C', 'Encapsulation hides data and methods', 'Easy');

-- Seed daily challenges
INSERT INTO daily_challenges (date, problem_title, problem_slug, difficulty, description, topics, acceptance_rate) VALUES
(CURRENT_DATE, 'Valid Parentheses', 'valid-parentheses', 'Easy', 'Given a string containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid.', ARRAY['String', 'Stack'], 40.2),
(CURRENT_DATE - INTERVAL '1 day', 'Two Sum', 'two-sum', 'Easy', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', ARRAY['Array', 'Hash Table'], 49.1),
(CURRENT_DATE - INTERVAL '2 days', 'Longest Substring Without Repeating Characters', 'longest-substring-without-repeating-characters', 'Medium', 'Given a string s, find the length of the longest substring without repeating characters.', ARRAY['String', 'Sliding Window'], 33.8);

-- Note: Actual user data will be created when users sign up via auth
-- The following are just example structures that show how data would look

-- Seed some interview questions (examples)
INSERT INTO interview_questions (company, type, title, description, difficulty, topics, upvotes) VALUES
('Amazon', 'Coding', 'Two Sum Problem', 'Given an array of integers, return indices of two numbers such that they add up to a specific target. You may assume that each input would have exactly one solution, and you may not use the same element twice.', 'Medium', ARRAY['Array', 'Hash Table'], 45),
('Google', 'HR', 'Tell me about a time you failed', 'Common HR question asking about handling failure and learning from mistakes. Focus on the learning outcome and how you grew from the experience.', 'Easy', ARRAY['Behavioral', 'Self-awareness'], 67),
('Microsoft', 'Coding', 'Binary Tree Level Order Traversal', 'Given the root of a binary tree, return the level order traversal of its nodes'' values (i.e., from left to right, level by level).', 'Medium', ARRAY['Tree', 'BFS', 'Queue'], 52),
('Infosys', 'Technical', 'Explain OOPS Concepts', 'Detailed explanation of Object-Oriented Programming principles including Encapsulation, Inheritance, Polymorphism, and Abstraction with real-world examples.', 'Easy', ARRAY['OOP', 'Core Java'], 89),
('TCS', 'Experience', 'Campus Interview Experience 2024', 'Complete walkthrough of TCS campus placement process including written test (aptitude, technical MCQs), technical interview (data structures, DBMS questions), and HR round (company knowledge, career goals).', NULL, ARRAY['Campus Placement', 'Interview Tips'], 134),
('Wipro', 'HR', 'Why do you want to join Wipro?', 'Tips on how to answer this common HR question: Research company values, recent projects, work culture. Connect your skills and career goals with company''s mission. Show genuine interest.', 'Easy', ARRAY['HR', 'Company Knowledge'], 43);
