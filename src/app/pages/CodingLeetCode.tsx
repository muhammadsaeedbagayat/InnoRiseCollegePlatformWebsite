import { useState } from 'react';
import { Code, TrendingUp, Award, Calendar, Link as LinkIcon, Play, Zap, BarChart3 } from 'lucide-react';

export default function CodingLeetCode() {
  const [isConnected, setIsConnected] = useState(false);

  const leetcodeStats = {
    totalSolved: 342,
    easy: 145,
    medium: 168,
    hard: 29,
    streak: 23,
    ranking: 45234,
    acceptance: 68.5,
    recentSubmissions: [
      { title: 'Two Sum', difficulty: 'Easy', status: 'Accepted', time: '2 hours ago' },
      { title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', status: 'Accepted', time: '5 hours ago' },
      { title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', status: 'Accepted', time: '1 day ago' },
      { title: 'Trapping Rain Water', difficulty: 'Hard', status: 'Wrong Answer', time: '2 days ago' },
    ],
  };

  const dailyChallenge = {
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: 'Given a string containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    topics: ['String', 'Stack'],
    acceptance: 40.2,
  };

  const recommendedProblems = [
    { title: 'Add Two Numbers', difficulty: 'Medium', topics: ['Linked List', 'Math'], acceptance: 38.1 },
    { title: 'Merge Two Sorted Lists', difficulty: 'Easy', topics: ['Linked List', 'Recursion'], acceptance: 60.5 },
    { title: 'Valid Sudoku', difficulty: 'Medium', topics: ['Array', 'Hash Table'], acceptance: 56.8 },
    { title: 'Maximum Subarray', difficulty: 'Medium', topics: ['Array', 'Dynamic Programming'], acceptance: 49.7 },
    { title: 'Climbing Stairs', difficulty: 'Easy', topics: ['Math', 'Dynamic Programming'], acceptance: 51.3 },
    { title: 'Binary Tree Inorder Traversal', difficulty: 'Easy', topics: ['Tree', 'Stack'], acceptance: 71.2 },
  ];

  const progressData = [
    { month: 'Jul', solved: 45 },
    { month: 'Aug', solved: 52 },
    { month: 'Sep', solved: 58 },
    { month: 'Oct', solved: 63 },
    { month: 'Nov', solved: 70 },
    { month: 'Dec', solved: 54 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-white mb-4">Coding & LeetCode Practice</h1>
          <p className="text-orange-100 text-lg max-w-2xl">
            Track your LeetCode progress, practice daily challenges, and improve your problem-solving skills
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Connect LeetCode */}
        {!isConnected ? (
          <div className="bg-white rounded-xl shadow-sm p-12 mb-8 text-center">
            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Code className="text-orange-600" size={40} />
            </div>
            <h2 className="text-gray-900 mb-4">Connect Your LeetCode Account</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Link your LeetCode profile to track your progress, view statistics, and get personalized recommendations
            </p>
            <button
              onClick={() => setIsConnected(true)}
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <LinkIcon size={20} />
              Connect LeetCode Account
            </button>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Code className="text-blue-600" size={24} />
                  <span className="text-gray-600 text-sm">Total Solved</span>
                </div>
                <p className="text-blue-600">{leetcodeStats.totalSolved}</p>
                <div className="flex gap-2 mt-3 text-xs">
                  <span className="text-green-600">E: {leetcodeStats.easy}</span>
                  <span className="text-yellow-600">M: {leetcodeStats.medium}</span>
                  <span className="text-red-600">H: {leetcodeStats.hard}</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="text-orange-600" size={24} />
                  <span className="text-gray-600 text-sm">Current Streak</span>
                </div>
                <p className="text-orange-600">{leetcodeStats.streak} days</p>
                <p className="text-xs text-gray-500 mt-2">Keep it going! 🔥</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="text-green-600" size={24} />
                  <span className="text-gray-600 text-sm">Global Ranking</span>
                </div>
                <p className="text-green-600">#{leetcodeStats.ranking.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-2">Top 10%</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-purple-600" size={24} />
                  <span className="text-gray-600 text-sm">Acceptance</span>
                </div>
                <p className="text-purple-600">{leetcodeStats.acceptance}%</p>
                <p className="text-xs text-gray-500 mt-2">Avg. across all problems</p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Daily Challenge */}
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-sm p-6 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={24} />
                    <h3 className="text-white">Daily Challenge</h3>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white">{dailyChallenge.title}</h4>
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                        {dailyChallenge.difficulty}
                      </span>
                    </div>
                    <p className="text-orange-100 text-sm mb-3">{dailyChallenge.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {dailyChallenge.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="bg-white/20 text-white text-xs px-2 py-1 rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-orange-100">Acceptance: {dailyChallenge.acceptance}%</p>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 bg-white text-orange-600 py-3 rounded-lg hover:bg-orange-50 transition-colors">
                    <Play size={18} />
                    Solve Now
                  </button>
                </div>

                {/* Recommended Problems */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-gray-900 mb-4">Recommended for You</h3>
                  <p className="text-gray-600 text-sm mb-6">Based on your solving patterns and skill level</p>

                  <div className="space-y-3">
                    {recommendedProblems.map((problem, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-gray-900">{problem.title}</h4>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              problem.difficulty === 'Easy'
                                ? 'bg-green-100 text-green-700'
                                : problem.difficulty === 'Medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {problem.topics.map((topic, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">Acceptance: {problem.acceptance}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Progress Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 size={20} className="text-blue-600" />
                    <h3 className="text-gray-900">Monthly Progress</h3>
                  </div>

                  <div className="space-y-3">
                    {progressData.map((data, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">{data.month}</span>
                          <span className="text-sm text-gray-900">{data.solved}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${(data.solved / 80) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Submissions */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-gray-900 mb-4">Recent Submissions</h3>

                  <div className="space-y-3">
                    {leetcodeStats.recentSubmissions.map((submission, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 p-3 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <p className="text-sm text-gray-900">{submission.title}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              submission.status === 'Accepted'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {submission.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{submission.difficulty}</span>
                          <span>{submission.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 text-blue-600 text-sm hover:text-blue-700">
                    View All Submissions →
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-gray-900 mb-4">Quick Actions</h3>
                  
                  <div className="space-y-2">
                    <button className="w-full bg-white text-gray-700 py-2 px-4 rounded-lg hover:shadow-md transition-shadow text-sm">
                      🎯 Practice by Topic
                    </button>
                    <button className="w-full bg-white text-gray-700 py-2 px-4 rounded-lg hover:shadow-md transition-shadow text-sm">
                      📊 View Detailed Stats
                    </button>
                    <button className="w-full bg-white text-gray-700 py-2 px-4 rounded-lg hover:shadow-md transition-shadow text-sm">
                      🏆 Join a Contest
                    </button>
                    <button className="w-full bg-white text-gray-700 py-2 px-4 rounded-lg hover:shadow-md transition-shadow text-sm">
                      👥 Find Study Buddies
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
