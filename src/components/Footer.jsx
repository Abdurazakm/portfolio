import { Github, Linkedin, Mail, Heart, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-blue-900 border-t border-blue-500/20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4">Abdurazak Mohammed</h3>
            <p className="text-gray-400 mb-4">
              Software Engineering Student passionate about building scalable solutions 
              and solving real-world problems through code.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/Abdurazakm"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800/50 hover:bg-blue-600/20 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/abdurazak-mohammed-a437b62b6/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800/50 hover:bg-blue-600/20 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a
                href="mailto:abdurazakm343@gmail.com"
                className="p-2 rounded-full bg-gray-800/50 hover:bg-blue-600/20 transition-colors"
              >
                <Mail className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  About Me
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Skills
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Experience
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2">
              <p className="text-gray-400">
                <Mail className="w-4 h-4 inline mr-2" />
                abdurazakm343@gmail.com
              </p>
              <p className="text-gray-400">
              <MapPin className="w-6 h-6 inline mr-2" />
                Sidama Hawassa, Ethiopia
              </p>
              <p className="text-gray-400">
                🎓 AASTU Software Engineering Student
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-500/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Abdurazak Mohammed Ledamo. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> and React.js + Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}