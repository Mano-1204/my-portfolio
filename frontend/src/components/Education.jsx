import React from 'react';
import { GraduationCap, Calendar, Award, MapPin } from 'lucide-react';

const Education = () => {
  const educationData = [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "KG College of Arts and Science",
      year: "2021-2024",
      cgpa: "7.3",
      type: "Graduation",
      icon: <GraduationCap size={24} />,
      gradient: "from-blue-400 to-purple-500"
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Government Higher Secondary School",
      year: "2020-2021",
      cgpa: "8.2",
      type: "12th Grade",
      icon: <Award size={24} />,
      gradient: "from-green-400 to-blue-500"
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC)",
      institution: "Government Higher Secondary School",
      year: "2018-2019",
      cgpa: "7.4",
      type: "10th Grade",
      icon: <Award size={24} />,
      gradient: "from-purple-400 to-pink-500"
    }
  ];

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            My educational journey and academic achievements that laid the foundation for my career in technology
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>

          <div className="space-y-12">
            {educationData.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:flex-row`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-1/2 z-10">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.gradient} border-4 border-slate-900`}></div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                }`}>
                  <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 group">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${item.gradient} flex-shrink-0`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
                            {item.type}
                          </span>
                          <div className="flex items-center space-x-1 text-slate-400">
                            <Calendar size={16} />
                            <span className="text-sm">{item.year}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                          {item.degree}
                        </h3>
                        
                        <div className="flex items-center space-x-2 text-slate-300 mb-3">
                          <MapPin size={16} />
                          <span>{item.institution}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-400">CGPA:</span>
                            <span className="text-lg font-semibold text-white">{item.cgpa}</span>
                          </div>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < Math.round(parseFloat(item.cgpa)) ? `bg-gradient-to-r ${item.gradient}` : 'bg-slate-600'
                                }`}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Summary */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">3</div>
            <div className="text-slate-300">Years of Study</div>
            <div className="text-slate-400 text-sm mt-1">BCA Program</div>
          </div>
          
          <div className="bg-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">7.6</div>
            <div className="text-slate-300">Average CGPA</div>
            <div className="text-slate-400 text-sm mt-1">Across All Levels</div>
          </div>
          
          <div className="bg-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">2024</div>
            <div className="text-slate-300">Graduation Year</div>
            <div className="text-slate-400 text-sm mt-1">BCA Completion</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;