import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";

export function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-black to-blue-900 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="container mx-auto px-6 relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-blue-500 mx-auto"
          />
          <motion.p
            variants={itemVariants}
            className="text-gray-400 mt-6 max-w-2xl mx-auto"
          >
            I'm always interested in new opportunities and collaborations. 
            Feel free to reach out if you'd like to work together!
          </motion.p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Whether you have a project in mind, want to collaborate, or just want to say hello, 
                I'd love to hear from you. I'm currently open to new opportunities and always 
                excited to work on interesting projects.
              </p>
            </div>
            
            <div className="space-y-4">
              <Card className="bg-gray-800/80 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600/10 rounded-lg">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Email</h4>
                      <a 
                        href="mailto:abdurazakm343@gmail.com"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        abdurazakm343@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/80 backdrop-blur-sm border-blue-500/20 hover:border-green-500/40 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-600/10 rounded-lg">
                      <Github className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">GitHub</h4>
                      <a 
                        href="https://github.com/Abdurazakm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-green-400 transition-colors"
                      >
                        github.com/AbdurazakMohammed
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/80 backdrop-blur-sm border-blue-500/20 hover:border-purple-500/40 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-600/10 rounded-lg">
                      <Linkedin className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">LinkedIn</h4>
                      <a 
                        href="https://linkedin.com/in/abdurazakmohammed"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        linkedin.com/in/abdurazakmohammed
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/80 backdrop-blur-sm border-blue-500/20 hover:border-orange-500/40 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-600/10 rounded-lg">
                      <MapPin className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Location</h4>
                      <p className="text-gray-400">Addis Ababa, Ethiopia</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Quick Contact Form */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white mb-2 block">Name</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-gray-700/50 border border-blue-500/20 rounded-lg text-black focus:border-blue-500 focus:outline-none"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="text-white mb-2 block">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-3 bg-gray-700/50 border border-blue-500/20 rounded-lg text-black focus:border-blue-500 focus:outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-white mb-2 block">Subject</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-gray-700/50 border border-blue-500/20 rounded-lg text-black focus:border-blue-500 focus:outline-none"
                  placeholder="Project Collaboration"
                />
              </div>
              
              <div>
                <label className="text-white mb-2 block">Message</label>
                <textarea 
                  rows={5}
                  className="w-full p-3 bg-gray-700/50 border border-blue-500/20 rounded-lg text-black focus:border-blue-500 focus:outline-none resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                onClick={() => 'https://formspree.io/f/mdkgjpjd'}
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}