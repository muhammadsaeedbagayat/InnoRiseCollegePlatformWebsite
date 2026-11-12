import { useState } from 'react';
import { Search, BookOpen, FileText, FlaskConical, Folder, ClipboardList, Filter } from 'lucide-react';

export default function Resources() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const departments = ['All', 'CSE', 'ECE', 'Mechanical', 'Civil', 'EEE'];
  const years = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year'];

  const resourceTypes = [
    { icon: <BookOpen className="text-blue-600" size={32} />, title: 'Notes', count: 245, color: 'bg-blue-50' },
    { icon: <FlaskConical className="text-purple-600" size={32} />, title: 'Lab Manuals', count: 89, color: 'bg-purple-50' },
    { icon: <ClipboardList className="text-green-600" size={32} />, title: 'Assignments', count: 156, color: 'bg-green-50' },
    { icon: <Folder className="text-orange-600" size={32} />, title: 'Mini Projects', count: 78, color: 'bg-orange-50' },
    { icon: <FileText className="text-red-600" size={32} />, title: 'Previous Year Papers', count: 312, color: 'bg-red-50' },
  ];

  const resources = [
    { title: 'Data Structures Notes', type: 'Notes', dept: 'CSE', year: '2nd Year', subject: 'Data Structures', downloads: 1245 },
    { title: 'Digital Electronics Lab Manual', type: 'Lab Manuals', dept: 'ECE', year: '2nd Year', subject: 'Digital Electronics', downloads: 856 },
    { title: 'Engineering Mechanics Assignment', type: 'Assignments', dept: 'Mechanical', year: '1st Year', subject: 'Engineering Mechanics', downloads: 567 },
    { title: 'IoT Home Automation', type: 'Mini Projects', dept: 'CSE', year: '3rd Year', subject: 'Internet of Things', downloads: 923 },
    { title: 'DBMS Question Paper 2024', type: 'Previous Year Papers', dept: 'CSE', year: '3rd Year', subject: 'Database Management', downloads: 2134 },
    { title: 'Control Systems Notes', type: 'Notes', dept: 'EEE', year: '3rd Year', subject: 'Control Systems', downloads: 745 },
    { title: 'Concrete Technology Lab', type: 'Lab Manuals', dept: 'Civil', year: '3rd Year', subject: 'Concrete Technology', downloads: 534 },
    { title: 'Machine Learning Assignment', type: 'Assignments', dept: 'CSE', year: '4th Year', subject: 'Machine Learning', downloads: 1678 },
    { title: 'Smart Parking System', type: 'Mini Projects', dept: 'ECE', year: '3rd Year', subject: 'Embedded Systems', downloads: 892 },
    { title: 'CAD Question Paper 2023', type: 'Previous Year Papers', dept: 'Mechanical', year: '2nd Year', subject: 'Computer Aided Design', downloads: 1456 },
    { title: 'Power Systems Notes', type: 'Notes', dept: 'EEE', year: '3rd Year', subject: 'Power Systems', downloads: 823 },
    { title: 'Surveying Lab Manual', type: 'Lab Manuals', dept: 'Civil', year: '2nd Year', subject: 'Surveying', downloads: 678 },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesDept = selectedDept === 'All' || resource.dept === selectedDept;
    const matchesYear = selectedYear === 'All' || resource.year === selectedYear;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesYear && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-white mb-4">Academic Resources</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Access notes, lab manuals, assignments, and previous year papers for all departments and years
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Resource Types */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {resourceTypes.map((type, index) => (
            <div
              key={index}
              className={`${type.color} p-6 rounded-xl hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="mb-3">{type.icon}</div>
              <h3 className="text-gray-900 text-sm mb-1">{type.title}</h3>
              <p className="text-gray-600 text-xs">{type.count} items</p>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for resources, subjects, topics..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'All' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year === 'All' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="text-gray-900">{filteredResources.length}</span> resources
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                  {resource.type}
                </span>
              </div>

              <h3 className="text-gray-900 mb-2">{resource.title}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                    {resource.dept}
                  </span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                    {resource.year}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{resource.subject}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  {resource.downloads} downloads
                </span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
