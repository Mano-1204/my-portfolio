import React from 'react';
import { Code, Database, Globe, Zap } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Code size={24} />,
      title: "Full-Stack Development",
      description: "Building end-to-end web applications with modern technologies"
    },
    {
      icon: <Globe size={24} />,
      title: "Responsive Design",
      description: "Creating beautiful, mobile-first user interfaces"
    },
    {
      icon: <Database size={24} />,
      title: "Database Management",
      description: "Designing and implementing efficient database solutions"
    },
    {
      icon: <Zap size={24} />,
      title: "Performance Optimization",
      description: "Ensuring fast, scalable web applications"
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-slate-300 leading-relaxed">
              Hi, I'm <span className="text-blue-400 font-semibold">Mano Chandran</span>, a passionate and detail-oriented Web Developer based in Coimbatore. I love bringing ideas to life through clean, responsive, and user-centric web applications.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              My skill set spans both frontend and backend technologies, including <span className="text-purple-400 font-semibold">HTML, CSS, JavaScript, React, Python, Django, and MySQL</span>. I have hands-on experience in building full-stack web apps, designing intuitive user interfaces, implementing secure authentication, managing databases, and deploying applications to the web.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              I'm always eager to learn new tools and technologies, and I stay up-to-date by working on real-world projects and refining my skills every day.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              When I'm not coding, I enjoy <span className="text-pink-400 font-semibold">playing sports and traveling</span> — staying active, curious, and creative.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70"
              >
                <div className="text-blue-400 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">2+</div>
            <div className="text-slate-300">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">10+</div>
            <div className="text-slate-300">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">5+</div>
            <div className="text-slate-300">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">24/7</div>
            <div className="text-slate-300">Learning Mode</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;