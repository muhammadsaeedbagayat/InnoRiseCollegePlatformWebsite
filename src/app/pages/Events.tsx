import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Events() {
  const upcomingEvents = [
    {
      title: 'TechFest 2025',
      type: 'Hackathon',
      date: 'December 15-17, 2025',
      time: '9:00 AM - 6:00 PM',
      venue: 'Main Auditorium',
      description: '48-hour hackathon with prizes worth ₹2 lakhs. Build innovative solutions to real-world problems.',
      attendees: 250,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      status: 'Registration Open',
      color: 'bg-blue-500',
    },
    {
      title: 'Web Development Workshop',
      type: 'Workshop',
      date: 'December 10, 2025',
      time: '2:00 PM - 5:00 PM',
      venue: 'Computer Lab 1',
      description: 'Learn modern web development with React and Node.js. Hands-on session with industry experts.',
      attendees: 80,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
      status: 'Registration Open',
      color: 'bg-purple-500',
    },
    {
      title: 'AI/ML Seminar',
      type: 'Seminar',
      date: 'December 12, 2025',
      time: '10:00 AM - 1:00 PM',
      venue: 'Seminar Hall',
      description: 'Industry leaders share insights on latest trends in Artificial Intelligence and Machine Learning.',
      attendees: 150,
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800',
      status: 'Registration Open',
      color: 'bg-green-500',
    },
    {
      title: 'Code Sprint Competition',
      type: 'Competition',
      date: 'December 20, 2025',
      time: '11:00 AM - 4:00 PM',
      venue: 'Online',
      description: 'Fast-paced competitive programming event. Test your coding skills against the best.',
      attendees: 320,
      image: 'https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?w=800',
      status: 'Coming Soon',
      color: 'bg-orange-500',
    },
    {
      title: 'Career Fair 2025',
      type: 'Career',
      date: 'January 5, 2025',
      time: '9:00 AM - 5:00 PM',
      venue: 'Sports Complex',
      description: 'Meet recruiters from top companies. Network and explore career opportunities.',
      attendees: 500,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
      status: 'Coming Soon',
      color: 'bg-red-500',
    },
    {
      title: 'Robotics Workshop',
      type: 'Workshop',
      date: 'January 8, 2025',
      time: '1:00 PM - 5:00 PM',
      venue: 'Robotics Lab',
      description: 'Build and program your own robot. Learn about sensors, motors, and automation.',
      attendees: 60,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      status: 'Registration Open',
      color: 'bg-indigo-500',
    },
  ];

  const pastEvents = [
    {
      title: 'InnoHack 2024',
      type: 'Hackathon',
      date: 'November 2024',
      attendees: 200,
      highlights: 'Successfully concluded with 45 innovative projects',
    },
    {
      title: 'Cloud Computing Workshop',
      type: 'Workshop',
      date: 'October 2024',
      attendees: 100,
      highlights: 'Participants learned AWS, Azure, and GCP basics',
    },
    {
      title: 'Tech Talk: Future of AI',
      type: 'Seminar',
      date: 'September 2024',
      attendees: 180,
      highlights: 'Featured speakers from Google and Microsoft',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-white mb-4">Events & Workshops</h1>
          <p className="text-indigo-100 text-lg max-w-2xl">
            Explore hackathons, workshops, seminars, and competitions happening at campus
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-gray-900 mb-6">Upcoming Events</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="relative h-48">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`${event.color} text-white text-xs px-3 py-1 rounded-full`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`${
                      event.status === 'Registration Open'
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                    } text-white text-xs px-3 py-1 rounded-full`}>
                      {event.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-gray-900 mb-3">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} className="text-indigo-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} className="text-indigo-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} className="text-indigo-600" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users size={16} className="text-indigo-600" />
                      <span>{event.attendees} participants expected</span>
                    </div>
                  </div>

                  <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                    Register Now
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h2 className="text-gray-900 mb-6">Past Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                  {event.type}
                </span>
                
                <h3 className="text-gray-900 mt-4 mb-2">{event.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{event.date}</p>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Users size={16} />
                  <span>{event.attendees} attendees</span>
                </div>
                
                <p className="text-gray-600 text-sm">{event.highlights}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h3 className="text-white mb-4">Want to Organize an Event?</h3>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Have an idea for a workshop, hackathon, or seminar? We'd love to help you make it happen!
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
            Submit Your Proposal
          </button>
        </div>
      </div>
    </div>
  );
}
