import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Resources from './pages/Resources';
import ProjectCollaboration from './pages/ProjectCollaboration';
import Events from './pages/Events';
import AboutUs from './pages/AboutUs';
import AptitudeTest from './pages/AptitudeTest';
import CodingLeetCode from './pages/CodingLeetCode';
import InterviewQuestions from './pages/InterviewQuestions';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/projects" element={<ProjectCollaboration />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/aptitude" element={<AptitudeTest />} />
            <Route path="/coding" element={<CodingLeetCode />} />
            <Route path="/interviews" element={<InterviewQuestions />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
