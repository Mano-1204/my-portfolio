import React from 'react';
import { ExternalLink, Github, Calendar, Users, Activity, ShoppingCart } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Medication Tracker Web App",
      description: "Built a multi-role (Patient and Caretaker) medication tracking application with real-time monitoring and email reminders.",
      icon: <Activity size={32} />,
      tech: ["React", "JavaScript", "Supabase", "Day.js", "SendGrid", "Vercel"],
      features: [
        "User authentication with role-based redirection",
        "Patients can log daily medication intake with photo proof",
        "Caretakers can view adherence calendars, streaks, and logs in real time",
        "Integrated Supabase for CRUD operations and real-time updates",
        "Used SendGrid with Supabase Edge Functions for email reminders"
      ],
      role: "Full-Stack Developer",
      gradient: "from-green-400 to-blue-500"
    },
    {
      title: "E-Commerce Website",
      description: "Developed a multi-page e-commerce website with product listings, cart functionality, and Django REST API integration.",
      icon: <ShoppingCart size={32} />,
      tech: ["React", "JavaScript", "React Router", "Django", "CSS"],
      features: [
        "Product listings by category with image-based navigation",
        "Add-to-cart functionality with persistent cart state",
        "Contact form, newsletter signup, and dark mode toggle",
        "Integrated with Django REST API for product data",
        "Focused on clean UI, smooth routing, and reusable components"
      ],
      role: "Frontend Developer",
      gradient: "from-purple-400 to-pink-500"
    }
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Here are some of the projects I've worked on, showcasing my skills in full-stack development
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-all duration-500 hover:scale-105 group"
            >
              <div className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${project.gradient}`}>
                        {project.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-slate-400 font-medium">{project.role}</p>
                      </div>
                    </div>

                    <p className="text-slate-300 text-lg leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="text-white font-semibold text-lg">Key Features:</h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3 text-slate-300">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-4">Tech Stack</h4>
                      <div className="flex flex-wrap gap-3">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-full text-sm text-slate-300 hover:border-slate-500/50 hover:bg-slate-700/70 transition-all duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-700/50">
                      <div className="flex space-x-4">
                        <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105">
                          <ExternalLink size={18} />
                          <span>View Demo</span>
                        </button>
                        <button className="flex items-center space-x-2 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105">
                          <Github size={18} />
                          <span>View Code</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="https://github.com/manochandran12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm text-slate-300 hover:text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 border border-slate-700/50 hover:border-slate-600/50"
          >
            <Github size={20} />
            <span>View All Projects on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;