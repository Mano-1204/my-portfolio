import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">MC</span>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Mano Chandran
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl text-slate-300 mb-8 font-light">
            Full-Stack Web Developer
          </h2>

          <div className="flex items-center justify-center text-slate-400 mb-8">
            <MapPin size={20} className="mr-2" />
            <span>Coimbatore, India</span>
          </div>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Passionate about bringing ideas to life through clean, responsive, and user-centric web applications. 
            I specialize in full-stack development with modern technologies and love creating intuitive digital experiences.
          </p>

          <div className="flex justify-center space-x-6 mb-12">
            <a
              href="https://github.com/manochandran12"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm p-4 rounded-full transition-all duration-300 hover:scale-110 border border-slate-700/50 hover:border-slate-600/50"
            >
              <Github size={24} className="text-slate-300 hover:text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/manoc/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm p-4 rounded-full transition-all duration-300 hover:scale-110 border border-slate-700/50 hover:border-slate-600/50"
            >
              <Linkedin size={24} className="text-slate-300 hover:text-white" />
            </a>
            <a
              href="mailto:manomano6868@gmail.com"
              className="bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm p-4 rounded-full transition-all duration-300 hover:scale-110 border border-slate-700/50 hover:border-slate-600/50"
            >
              <Mail size={24} className="text-slate-300 hover:text-white" />
            </a>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={scrollToAbout}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View My Work
            </button>
            <a
              href="mailto:manomano6868@gmail.com"
              className="border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToAbout} className="text-slate-400 hover:text-slate-300 transition-colors duration-200">
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;