import React from 'react';
import { Code, Database, Settings, Brain, Palette, Globe } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Palette size={24} />,
      skills: ["HTML", "CSS", "JavaScript", "React JS"],
      color: "from-blue-400 to-cyan-400"
    },
    {
      title: "Backend Development",
      icon: <Database size={24} />,
      skills: ["Python", "Django", "SQL"],
      color: "from-green-400 to-emerald-400"
    },
    {
      title: "Tools & Technologies",
      icon: <Settings size={24} />,
      skills: ["VS Code", "Git", "GitHub", "MySQL Workbench"],
      color: "from-purple-400 to-violet-400"
    },
    {
      title: "Vibecoding Tools",
      icon: <Code size={24} />,
      skills: ["Emergent"],
      color: "from-pink-400 to-rose-400"
    },
    {
      title: "AI Tools",
      icon: <Brain size={24} />,
      skills: ["ChatGPT", "n8n Workflows"],
      color: "from-orange-400 to-amber-400"
    }
  ];

  const certifications = [
    {
      title: "Fullstack Python Developer Course",
      duration: "6 months",
      provider: "Career Ladder",
      year: "2025",
      icon: <Globe size={20} />
    }
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and the tools I use to build amazing web applications
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3 hover:bg-slate-700/50 transition-colors duration-200"
                  >
                    <span className="text-slate-300 font-medium">{skill}</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < 4 ? `bg-gradient-to-r ${category.color}` : 'bg-slate-600'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="bg-slate-800/20 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Certifications & Training
          </h3>
          
          <div className="grid md:grid-cols-1 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg">
                    {cert.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-2">{cert.title}</h4>
                    <div className="flex flex-wrap gap-4 text-slate-300">
                      <span className="flex items-center space-x-1">
                        <span className="text-blue-400">Duration:</span>
                        <span>{cert.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="text-purple-400">Provider:</span>
                        <span>{cert.provider}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="text-pink-400">Year:</span>
                        <span>{cert.year}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-400">5+</div>
              <div className="text-slate-300">Frontend Technologies</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">3+</div>
              <div className="text-slate-300">Backend Technologies</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-400">6+</div>
              <div className="text-slate-300">Development Tools</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-pink-400">1</div>
              <div className="text-slate-300">Certification</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;