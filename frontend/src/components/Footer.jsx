import React from 'react';
import { Heart, Code, Coffee } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Mano Chandran
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Full-Stack Web Developer passionate about creating amazing digital experiences. 
              Based in Coimbatore, India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <div className="space-y-2">
              {['About', 'Projects', 'Skills', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    document.querySelector(`#${item.toLowerCase()}`).scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-slate-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Get In Touch</h3>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:manomano6868@gmail.com"
                className="block text-slate-300 hover:text-white transition-colors duration-200"
              >
                manomano6868@gmail.com
              </a>
              <a
                href="tel:+916369710262"
                className="block text-slate-300 hover:text-white transition-colors duration-200"
              >
                +91 6369710262
              </a>
              <p className="text-slate-300">Coimbatore, India</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-slate-300 text-sm">
              <span>Made with</span>
              <Heart size={16} className="text-red-400" />
              <span>and</span>
              <Code size={16} className="text-blue-400" />
              <span>and lots of</span>
              <Coffee size={16} className="text-amber-400" />
            </div>
            
            <div className="text-slate-400 text-sm">
              © {currentYear} Mano Chandran. All rights reserved.
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
      </div>
    </footer>
  );
};

export default Footer;