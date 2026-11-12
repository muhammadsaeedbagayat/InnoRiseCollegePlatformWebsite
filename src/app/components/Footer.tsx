import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="text-white" size={24} />
              </div>
              <span className="text-white">InnoRise</span>
            </div>
            <p className="text-sm">
              Empowering students through collaboration, resources, and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resources" className="hover:text-blue-400 transition-colors">Resources</Link></li>
              <li><Link to="/projects" className="hover:text-blue-400 transition-colors">Projects</Link></li>
              <li><Link to="/events" className="hover:text-blue-400 transition-colors">Events</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Study Tools */}
          <div>
            <h3 className="text-white mb-4">Study Tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/aptitude" className="hover:text-blue-400 transition-colors">Aptitude Tests</Link></li>
              <li><Link to="/coding" className="hover:text-blue-400 transition-colors">Coding Practice</Link></li>
              <li><Link to="/interviews" className="hover:text-blue-400 transition-colors">Interview Prep</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@innorise.edu</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Campus, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 InnoRise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
