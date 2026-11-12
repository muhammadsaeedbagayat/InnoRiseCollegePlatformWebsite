import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Code, Users, Calendar, Award, Brain } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Home() {
  const departments = [
    { name: 'Computer Science & Engineering', code: 'CSE', color: 'bg-blue-500' },
    { name: 'Electronics & Communication', code: 'ECE', color: 'bg-purple-500' },
    { name: 'Mechanical Engineering', code: 'MECH', color: 'bg-orange-500' },
    { name: 'Civil Engineering', code: 'CIVIL', color: 'bg-green-500' },
    { name: 'Electrical Engineering', code: 'EEE', color: 'bg-yellow-500' },
  ];

  const years = [
    { year: '1st Year', desc: 'Foundation courses', icon: '📚' },
    { year: '2nd Year', desc: 'Core subjects', icon: '💡' },
    { year: '3rd Year', desc: 'Specializations', icon: '🎯' },
    { year: '4th Year', desc: 'Projects & Placements', icon: '🚀' },
  ];

  const features = [
    {
      icon: <BookOpen className="text-blue-600" size={32} />,
      title: 'Resources',
      desc: 'Access notes, papers, and study materials',
      link: '/resources',
    },
    {
      icon: <Code className="text-purple-600" size={32} />,
      title: 'Coding Practice',
      desc: 'LeetCode integration and challenges',
      link: '/coding',
    },
    {
      icon: <Brain className="text-green-600" size={32} />,
      title: 'Aptitude Tests',
      desc: 'Practice quant, logical, and verbal',
      link: '/aptitude',
    },
    {
      icon: <Users className="text-orange-600" size={32} />,
      title: 'Collaborate',
      desc: 'Work on projects with peers',
      link: '/projects',
    },
    {
      icon: <Award className="text-red-600" size={32} />,
      title: 'Interview Prep',
      desc: 'Company-wise questions and tips',
      link: '/interviews',
    },
    {
      icon: <Calendar className="text-indigo-600" size={32} />,
      title: 'Events',
      desc: 'Hackathons, workshops, seminars',
      link: '/events',
    },
  ];



  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6">
              InnoRise – Student Collaboration Platform
            </h1>
            <p className="text-blue-100 mb-8 text-lg">
              Your one-stop destination for notes, previous year question papers, events, 
              mini-projects, project ideas, coding practice, and interview preparation. 
              Collaborate with peers and excel in your academic journey.
            </p>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">Everything You Need to Succeed</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From study resources to coding practice, we've got you covered
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Departments Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">All Departments</h2>
            <p className="text-gray-600">Resources and materials for every engineering branch</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow cursor-pointer text-center"
              >
                <div className={`${dept.color} w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white`}>
                  {dept.code}
                </div>
                <h4 className="text-gray-900 text-sm">{dept.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Year-wise Resources */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">Year-wise Resources</h2>
          <p className="text-gray-600">Find materials tailored to your academic year</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {years.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl hover:shadow-lg transition-shadow cursor-pointer text-center"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-gray-900 mb-2">{item.year}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of students already using InnoRise to excel in their studies
          </p>
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
          >
            Explore Resources
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
