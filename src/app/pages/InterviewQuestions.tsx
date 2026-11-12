import { useState } from 'react';
import { Building2, Search, Filter, Code, MessageCircle, BookOpen, ChevronRight } from 'lucide-react';

export default function InterviewQuestions() {
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const companies = [
    { name: 'Infosys', logo: '🏢', color: 'bg-blue-500', questions: 145 },
    { name: 'TCS', logo: '💼', color: 'bg-purple-500', questions: 178 },
    { name: 'Wipro', logo: '🏭', color: 'bg-orange-500', questions: 132 },
    { name: 'Amazon', logo: '📦', color: 'bg-yellow-500', questions: 256 },
    { name: 'Google', logo: '🔍', color: 'bg-red-500', questions: 312 },
    { name: 'Microsoft', logo: '🪟', color: 'bg-blue-600', questions: 289 },
  ];

  const questionTypes = ['All', 'Coding', 'HR', 'Technical', 'Experience'];

  const interviewData = [
    {
      company: 'Amazon',
      type: 'Coding',
      title: 'Two Sum Problem',
      difficulty: 'Medium',
      description: 'Given an array of integers, return indices of two numbers such that they add up to a specific target.',
      topics: ['Array', 'Hash Table'],
      postedBy: 'Rahul Kumar',
      date: 'Nov 25, 2024',
      upvotes: 45,
    },
    {
      company: 'Google',
      type: 'HR',
      title: 'Tell me about a time you failed',
      difficulty: 'Easy',
      description: 'Common HR question asking about handling failure and learning from mistakes.',
      topics: ['Behavioral', 'Self-awareness'],
      postedBy: 'Priya Sharma',
      date: 'Nov 23, 2024',
      upvotes: 67,
    },
    {
      company: 'Microsoft',
      type: 'Coding',
      title: 'Binary Tree Level Order Traversal',
      difficulty: 'Medium',
      description: 'Implement level order traversal of a binary tree using BFS.',
      topics: ['Tree', 'BFS', 'Queue'],
      postedBy: 'Vikram Singh',
      date: 'Nov 22, 2024',
      upvotes: 52,
    },
    {
      company: 'Infosys',
      type: 'Technical',
      title: 'Explain OOPS Concepts',
      difficulty: 'Easy',
      description: 'Detailed explanation of Object-Oriented Programming principles with examples.',
      topics: ['OOP', 'Core Java'],
      postedBy: 'Sneha Reddy',
      date: 'Nov 20, 2024',
      upvotes: 89,
    },
    {
      company: 'TCS',
      type: 'Experience',
      title: 'Campus Interview Experience 2024',
      difficulty: 'N/A',
      description: 'Complete walkthrough of TCS campus placement process including written test, technical interview, and HR round.',
      topics: ['Campus Placement', 'Interview Tips'],
      postedBy: 'Aditya Verma',
      date: 'Nov 18, 2024',
      upvotes: 134,
    },
    {
      company: 'Amazon',
      type: 'Technical',
      title: 'System Design: Design URL Shortener',
      difficulty: 'Hard',
      description: 'Design a scalable URL shortening service like bit.ly with database design and API endpoints.',
      topics: ['System Design', 'Database', 'API'],
      postedBy: 'Karthik Nair',
      date: 'Nov 15, 2024',
      upvotes: 98,
    },
    {
      company: 'Google',
      type: 'Coding',
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      description: 'Find the length of the longest substring without repeating characters using sliding window.',
      topics: ['String', 'Sliding Window'],
      postedBy: 'Anjali Patel',
      date: 'Nov 14, 2024',
      upvotes: 76,
    },
    {
      company: 'Wipro',
      type: 'HR',
      title: 'Why do you want to join Wipro?',
      difficulty: 'Easy',
      description: 'Tips on how to answer this common HR question with company research and personal motivation.',
      topics: ['HR', 'Company Knowledge'],
      postedBy: 'Ravi Kumar',
      date: 'Nov 12, 2024',
      upvotes: 43,
    },
    {
      company: 'Microsoft',
      type: 'Experience',
      title: 'Off-Campus Interview Journey',
      difficulty: 'N/A',
      description: 'How I got into Microsoft through off-campus placement - preparation tips, resources, and timeline.',
      topics: ['Off-Campus', 'Success Story'],
      postedBy: 'Divya Sharma',
      date: 'Nov 10, 2024',
      upvotes: 156,
    },
    {
      company: 'Infosys',
      type: 'Coding',
      title: 'String Manipulation Questions',
      difficulty: 'Easy',
      description: 'Collection of string-based coding problems frequently asked in Infosys interviews.',
      topics: ['String', 'Array'],
      postedBy: 'Suresh Reddy',
      date: 'Nov 8, 2024',
      upvotes: 54,
    },
  ];

  const filteredQuestions = interviewData.filter((item) => {
    const matchesCompany = selectedCompany === 'All' || item.company === selectedCompany;
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCompany && matchesType && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Coding':
        return <Code size={16} className="text-blue-600" />;
      case 'HR':
        return <MessageCircle size={16} className="text-green-600" />;
      case 'Technical':
        return <BookOpen size={16} className="text-purple-600" />;
      default:
        return <MessageCircle size={16} className="text-orange-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-white mb-4">Interview Questions & Experiences</h1>
          <p className="text-purple-100 text-lg max-w-2xl">
            Company-wise coding questions, HR tips, and real interview experiences from placed seniors
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Companies Grid */}
        <div className="mb-12">
          <h2 className="text-gray-900 mb-6">Select Company</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {companies.map((company, index) => (
              <button
                key={index}
                onClick={() => setSelectedCompany(company.name)}
                className={`${
                  selectedCompany === company.name
                    ? 'bg-purple-50 border-purple-300 border-2'
                    : 'bg-white border-gray-200 border'
                } p-6 rounded-xl hover:shadow-md transition-all text-center`}
              >
                <div className={`${company.color} w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl`}>
                  {company.logo}
                </div>
                <h3 className="text-gray-900 text-sm mb-1">{company.name}</h3>
                <p className="text-xs text-gray-500">{company.questions} Q&As</p>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search questions, topics, experiences..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white appearance-none cursor-pointer"
              >
                {questionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'All' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setSelectedCompany('All');
                setSelectedType('All');
                setSearchQuery('');
              }}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="text-gray-900">{filteredQuestions.length}</span> results
            {selectedCompany !== 'All' && <span className="text-purple-600"> for {selectedCompany}</span>}
          </p>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredQuestions.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getTypeIcon(item.type)}
                  <span className="text-xs text-gray-600">{item.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{companies.find(c => c.name === item.company)?.logo}</span>
                  <span className="text-xs text-gray-600">{item.company}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-gray-900 mb-2">{item.title}</h3>

              {/* Difficulty */}
              {item.difficulty !== 'N/A' && (
                <span
                  className={`inline-block text-xs px-2 py-1 rounded mb-3 ${
                    item.difficulty === 'Easy'
                      ? 'bg-green-100 text-green-700'
                      : item.difficulty === 'Medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {item.difficulty}
                </span>
              )}

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>

              {/* Topics */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.topics.map((topic, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>By {item.postedBy}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">👍 {item.upvotes}</span>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contribute CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 size={32} />
          </div>
          <h3 className="text-white mb-4">Share Your Interview Experience</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Help your juniors by sharing the questions you faced, tips, and your overall interview experience
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors">
            Contribute Your Experience
          </button>
        </div>
      </div>
    </div>
  );
}
