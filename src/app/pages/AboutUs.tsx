import { Target, Heart, Zap, Users } from 'lucide-react';

export default function AboutUs() {
  const mission = [
    {
      icon: <Target className="text-blue-600" size={32} />,
      title: 'Our Mission',
      description: 'To empower students with easy access to academic resources, collaboration tools, and career preparation materials, fostering a community of innovation and excellence.',
    },
    {
      icon: <Heart className="text-red-600" size={32} />,
      title: 'Our Values',
      description: 'We believe in collaboration, knowledge sharing, and supporting each other\'s growth. Every student deserves access to quality resources and mentorship.',
    },
    {
      icon: <Zap className="text-yellow-600" size={32} />,
      title: 'Our Vision',
      description: 'To become the go-to platform for college students across India, creating a nationwide network of learners and innovators.',
    },
  ];

  const team = [
    { name: 'Aditya Verma', role: 'Platform Lead', dept: 'CSE, 4th Year', avatar: '👨‍💻' },
    { name: 'Sneha Reddy', role: 'Content Manager', dept: 'ECE, 3rd Year', avatar: '👩‍💼' },
    { name: 'Vikram Singh', role: 'Tech Lead', dept: 'CSE, 4th Year', avatar: '👨‍🔧' },
    { name: 'Priya Iyer', role: 'Community Manager', dept: 'Mechanical, 3rd Year', avatar: '👩‍🎓' },
    { name: 'Karthik Nair', role: 'Design Lead', dept: 'CSE, 3rd Year', avatar: '👨‍🎨' },
    { name: 'Divya Sharma', role: 'Events Coordinator', dept: 'EEE, 2nd Year', avatar: '👩‍🏫' },
  ];

  const stats = [
    { number: '5000+', label: 'Active Students' },
    { number: '1500+', label: 'Resources Shared' },
    { number: '250+', label: 'Projects Completed' },
    { number: '50+', label: 'Events Hosted' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-white mb-4">About InnoRise</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Building a stronger, more connected student community through technology and collaboration
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm text-center"
            >
              <p className="text-blue-600 mb-2">{stat.number}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission, Values, Vision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mission.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* What We Offer */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 md:p-12 mb-16">
          <h2 className="text-gray-900 mb-6 text-center">What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <h4 className="text-gray-900 mb-2">📚 Academic Resources</h4>
              <p className="text-gray-600 text-sm">
                Comprehensive notes, lab manuals, assignments, and previous year papers for all departments and years
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h4 className="text-gray-900 mb-2">🤝 Project Collaboration</h4>
              <p className="text-gray-600 text-sm">
                Connect with teammates, share ideas, and work together on innovative projects
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h4 className="text-gray-900 mb-2">💻 Coding Practice</h4>
              <p className="text-gray-600 text-sm">
                LeetCode integration, daily challenges, and progress tracking to sharpen your coding skills
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h4 className="text-gray-900 mb-2">🧠 Aptitude Tests</h4>
              <p className="text-gray-600 text-sm">
                Practice quantitative, logical reasoning, and verbal ability with detailed analytics
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h4 className="text-gray-900 mb-2">💼 Interview Preparation</h4>
              <p className="text-gray-600 text-sm">
                Company-wise interview questions, experiences, and tips from placed seniors
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h4 className="text-gray-900 mb-2">🎉 Events & Workshops</h4>
              <p className="text-gray-600 text-sm">
                Stay updated on hackathons, technical workshops, seminars, and campus events
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-gray-900 mb-6 text-center">Meet Our Team</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            A passionate group of students dedicated to making InnoRise the best platform for our college community
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.dept}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Started */}
        <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm">
          <h2 className="text-gray-900 mb-6">How It All Started</h2>
          
          <div className="space-y-4 text-gray-600">
            <p>
              InnoRise was born from a simple observation: students across different departments and years often struggled to find quality study materials, connect with project partners, and prepare for placements.
            </p>
            
            <p>
              In early 2024, a group of final-year students came together with a vision to solve these problems. We started by creating a shared drive of notes and previous year papers. The response was overwhelming.
            </p>
            
            <p>
              What began as a simple file-sharing initiative quickly evolved into a comprehensive platform. We added features for project collaboration, coding practice, aptitude tests, and interview preparation based on feedback from our fellow students.
            </p>
            
            <p>
              Today, InnoRise serves thousands of students, fostering collaboration, knowledge sharing, and academic excellence. But this is just the beginning. We're constantly working to add new features and improve the platform based on your needs.
            </p>
            
            <p className="text-blue-600">
              Together, we're building something special. Join us in this journey! 🚀
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users size={32} />
          </div>
          <h3 className="text-white mb-4">Want to Join Our Team?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            We're always looking for passionate students to help make InnoRise even better. Whether you're a developer, designer, content creator, or just someone with great ideas, we'd love to hear from you!
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
}
