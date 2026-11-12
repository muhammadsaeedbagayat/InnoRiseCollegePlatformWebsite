import { useState } from 'react';
import { Plus, Users, Clock, CheckCircle, Search, Code, Sparkles } from 'lucide-react';

export default function ProjectCollaboration() {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'looking' | 'completed'>('ongoing');
  const [searchQuery, setSearchQuery] = useState('');

  const projects = {
    ongoing: [
      {
        title: 'AI-Powered Chatbot for College',
        description: 'Building an intelligent chatbot to answer student queries about courses, schedules, and campus facilities.',
        team: ['Rahul', 'Priya', 'Amit'],
        dept: 'CSE',
        tech: ['Python', 'NLP', 'React'],
        progress: 65,
      },
      {
        title: 'Smart Irrigation System',
        description: 'IoT-based automated irrigation system using soil moisture sensors and weather data.',
        team: ['Sneha', 'Vivek'],
        dept: 'ECE',
        tech: ['Arduino', 'IoT', 'Sensors'],
        progress: 40,
      },
      {
        title: 'Campus Energy Monitor',
        description: 'Real-time energy consumption monitoring and optimization system for college buildings.',
        team: ['Ravi', 'Neha', 'Karthik', 'Divya'],
        dept: 'EEE',
        tech: ['Raspberry Pi', 'Python', 'Dashboard'],
        progress: 80,
      },
    ],
    looking: [
      {
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce website with payment integration. Looking for 1 frontend developer and 1 UI/UX designer.',
        poster: 'Ankit Sharma',
        dept: 'CSE',
        tech: ['MERN Stack', 'Stripe'],
        needed: ['Frontend Dev', 'UI/UX Designer'],
      },
      {
        title: 'Drone-based Surveying',
        description: 'Automated land surveying using drones and computer vision. Need someone with drone experience.',
        poster: 'Meera Patel',
        dept: 'Civil',
        tech: ['Drones', 'Computer Vision'],
        needed: ['Drone Operator', 'ML Engineer'],
      },
      {
        title: 'Automated Robotic Arm',
        description: 'Industrial robotic arm with pick-and-place capabilities. Looking for mechanical designer.',
        poster: 'Sanjay Kumar',
        dept: 'Mechanical',
        tech: ['Robotics', 'CAD', 'Arduino'],
        needed: ['Mechanical Designer'],
      },
    ],
    completed: [
      {
        title: 'Student Attendance System',
        description: 'Face recognition-based attendance system deployed in 5 classrooms.',
        team: ['Pooja', 'Rohit', 'Shruti'],
        dept: 'CSE',
        tech: ['Python', 'OpenCV', 'Flask'],
        completedDate: 'Oct 2024',
        impact: 'Used by 500+ students',
      },
      {
        title: 'Traffic Management System',
        description: 'Smart traffic signal control using real-time traffic density analysis.',
        team: ['Arun', 'Kavya'],
        dept: 'ECE',
        tech: ['Computer Vision', 'Embedded C'],
        completedDate: 'Sep 2024',
        impact: 'Reduced wait time by 30%',
      },
    ],
  };

  const filteredProjects = projects[activeTab].filter((project) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.dept.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-white mb-4">Project Collaboration</h1>
          <p className="text-purple-100 text-lg max-w-2xl">
            Discover projects, find team members, and showcase your work
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            <Plus size={20} />
            Post Your Project
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-8 flex gap-2">
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors ${
              activeTab === 'ongoing'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Clock size={18} />
            <span>Ongoing Projects</span>
          </button>
          <button
            onClick={() => setActiveTab('looking')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors ${
              activeTab === 'looking'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users size={18} />
            <span>Looking for Members</span>
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors ${
              activeTab === 'completed'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <CheckCircle size={18} />
            <span>Completed</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeTab === 'ongoing' &&
            filteredProjects.map((project: any, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <Code className="text-purple-600" size={24} />
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                    {project.dept}
                  </span>
                </div>

                <h3 className="text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-purple-600">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {project.team.length} members
                    </span>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}

          {activeTab === 'looking' &&
            filteredProjects.map((project: any, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-orange-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <Sparkles className="text-orange-600" size={24} />
                  </div>
                  <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">
                    Recruiting
                  </span>
                </div>

                <h3 className="text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Looking for:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.needed.map((role: string, i: number) => (
                      <span
                        key={i}
                        className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-600">Posted by {project.poster}</span>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                    Join Team
                  </button>
                </div>
              </div>
            ))}

          {activeTab === 'completed' &&
            filteredProjects.map((project: any, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                    Completed
                  </span>
                </div>

                <h3 className="text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                <div className="bg-green-50 p-3 rounded-lg mb-4">
                  <p className="text-green-800 text-sm">{project.impact}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {project.team.join(', ')}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{project.completedDate}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
