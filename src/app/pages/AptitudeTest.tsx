import { useState } from 'react';
import { Brain, Code2, MessageSquare, Layers, Play, Trophy, BarChart3, Clock, CheckCircle } from 'lucide-react';

export default function AptitudeTest() {
  const [activeSection, setActiveSection] = useState<'quant' | 'logical' | 'verbal' | 'domain'>('quant');

  const sections = [
    {
      id: 'quant' as const,
      icon: <Brain className="text-blue-600" size={24} />,
      title: 'Quantitative Aptitude',
      description: 'Numbers, algebra, geometry, and data interpretation',
      topics: ['Number System', 'Percentages', 'Profit & Loss', 'Time & Work', 'Probability', 'Data Interpretation'],
      questions: 150,
      color: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      id: 'logical' as const,
      icon: <Layers className="text-purple-600" size={24} />,
      title: 'Logical Reasoning',
      description: 'Patterns, sequences, and logical problems',
      topics: ['Series Completion', 'Coding-Decoding', 'Blood Relations', 'Seating Arrangement', 'Puzzles', 'Syllogism'],
      questions: 120,
      color: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      id: 'verbal' as const,
      icon: <MessageSquare className="text-green-600" size={24} />,
      title: 'Verbal Ability',
      description: 'Grammar, vocabulary, and comprehension',
      topics: ['Synonyms & Antonyms', 'Sentence Completion', 'Reading Comprehension', 'Error Detection', 'Para Jumbles'],
      questions: 100,
      color: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      id: 'domain' as const,
      icon: <Code2 className="text-orange-600" size={24} />,
      title: 'Domain-Specific MCQs',
      description: 'Technical questions for your branch',
      topics: ['Data Structures', 'Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks', 'OOP Concepts'],
      questions: 200,
      color: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
  ];

  const activeData = sections.find(s => s.id === activeSection)!;

  const scoreHistory = [
    { date: 'Nov 25, 2024', test: 'Quantitative - Medium', score: 85, total: 100, time: '45 min' },
    { date: 'Nov 23, 2024', test: 'Logical - Hard', score: 72, total: 100, time: '60 min' },
    { date: 'Nov 20, 2024', test: 'Verbal - Easy', score: 92, total: 100, time: '30 min' },
    { date: 'Nov 18, 2024', test: 'Domain (CSE) - Medium', score: 78, total: 100, time: '50 min' },
  ];

  const leaderboard = [
    { rank: 1, name: 'Aditya Verma', dept: 'CSE', score: 2456, avatar: '🥇' },
    { rank: 2, name: 'Priya Sharma', dept: 'ECE', score: 2389, avatar: '🥈' },
    { rank: 3, name: 'Rahul Kumar', dept: 'CSE', score: 2301, avatar: '🥉' },
    { rank: 4, name: 'Sneha Reddy', dept: 'EEE', score: 2245, avatar: '👨‍💻' },
    { rank: 5, name: 'Vikram Singh', dept: 'Mechanical', score: 2198, avatar: '👩‍💻' },
    { rank: 6, name: 'Anjali Patel', dept: 'Civil', score: 2156, avatar: '👨‍🎓' },
    { rank: 7, name: 'Karthik Nair', dept: 'CSE', score: 2089, avatar: '👩‍🎓' },
    { rank: 8, name: 'You', dept: 'CSE', score: 2034, avatar: '👤', highlight: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-white mb-4">Aptitude Test Platform</h1>
          <p className="text-green-100 text-lg max-w-2xl">
            Practice quantitative, logical, verbal, and domain-specific questions to ace your placement tests
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`${section.color} border-2 ${
                activeSection === section.id ? section.borderColor : 'border-transparent'
              } p-6 rounded-xl hover:shadow-md transition-all text-left`}
            >
              <div className="mb-4">{section.icon}</div>
              <h3 className="text-gray-900 mb-2">{section.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{section.description}</p>
              <p className="text-xs text-gray-500">{section.questions} questions</p>
            </button>
          ))}
        </div>

        {/* Active Section Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Topics & Practice */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-gray-900 mb-4">{activeData.title}</h2>
              <p className="text-gray-600 mb-6">{activeData.description}</p>

              <h3 className="text-gray-900 mb-4">Topics Covered</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {activeData.topics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                  >
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-gray-700 text-sm">{topic}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <Play size={18} />
                  Practice Mode
                </button>
                <button className="flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                  <Clock size={18} />
                  Test Mode
                </button>
                <button className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                  <BarChart3 size={18} />
                  View Stats
                </button>
              </div>
            </div>

            {/* Difficulty Levels */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-gray-900 mb-4">Select Difficulty Level</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-2 border-green-200 bg-green-50 p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-green-700">Easy</h4>
                    <span className="text-xs text-green-600">⭐</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">Perfect for beginners</p>
                  <p className="text-xs text-gray-500">50 questions • 30 min</p>
                </div>

                <div className="border-2 border-yellow-200 bg-yellow-50 p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-yellow-700">Medium</h4>
                    <span className="text-xs text-yellow-600">⭐⭐</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">Good challenge</p>
                  <p className="text-xs text-gray-500">75 questions • 45 min</p>
                </div>

                <div className="border-2 border-red-200 bg-red-50 p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-red-700">Hard</h4>
                    <span className="text-xs text-red-600">⭐⭐⭐</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">Expert level</p>
                  <p className="text-xs text-gray-500">100 questions • 60 min</p>
                </div>
              </div>
            </div>
          </div>

          {/* Score History & Analytics */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-gray-900 mb-4">Your Performance</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Tests Taken</p>
                  <p className="text-blue-600">24</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Average Score</p>
                  <p className="text-green-600">82%</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Time Spent</p>
                  <p className="text-purple-600">18.5 hrs</p>
                </div>
              </div>
            </div>

            {/* Recent Tests */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-gray-900 mb-4">Recent Tests</h3>
              
              <div className="space-y-3">
                {scoreHistory.slice(0, 3).map((test, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 p-3 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-900">{test.test}</p>
                      <span className={`text-sm ${
                        test.score >= 80 ? 'text-green-600' : test.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {test.score}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{test.date} • {test.time}</p>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-blue-600 text-sm hover:text-blue-700">
                View All Tests →
              </button>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="text-yellow-500" size={24} />
            <h2 className="text-gray-900">Weekly Leaderboard</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Rank</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Student</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Department</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 ${
                      entry.highlight ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <span className="text-2xl">{entry.avatar}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={entry.highlight ? 'text-blue-600' : 'text-gray-900'}>
                        {entry.name}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{entry.dept}</td>
                    <td className="py-3 px-4 text-gray-900">{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
