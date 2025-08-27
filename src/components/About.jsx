import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { GraduationCap, Code, Lightbulb } from "lucide-react";

export function About() {
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

  const cardVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-black to-blue-900 relative">
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
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-blue-500 mx-auto"
          />
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} className="text-gray-300 space-y-6">
            <motion.p
              variants={itemVariants}
              className="text-lg leading-relaxed"
            >
              I am a 4th-year Software Engineering student at Addis Ababa Science and Technology University.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-lg leading-relaxed"
            >
              Passionate about backend development, web applications, and emerging technologies.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-lg leading-relaxed"
            >
              Currently learning Node.js, Express.js, and MongoDB while also exploring React.js for frontend.
            </motion.p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            className="grid gap-6"
          >
            <motion.div variants={cardVariants}>
              <Card className="bg-gray-800/80 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 bg-blue-600/10 rounded-lg"
                    >
                      <GraduationCap className="w-8 h-8 text-blue-400" />
                    </motion.div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Education</h3>
                      <p className="text-gray-400">4th-year Software Engineering student at AASTU</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={cardVariants}>
              <Card className="bg-gray-800/80 backdrop-blur-sm border-blue-500/20 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 bg-green-600/10 rounded-lg"
                    >
                      <Code className="w-8 h-8 text-green-400" />
                    </motion.div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Focus Areas</h3>
                      <p className="text-gray-400">Backend Development, Web Applications, APIs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={cardVariants}>
              <Card className="bg-gray-800/80 backdrop-blur-sm border-blue-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 bg-purple-600/10 rounded-lg"
                    >
                      <Lightbulb className="w-8 h-8 text-purple-400" />
                    </motion.div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Currently Learning</h3>
                      <p className="text-gray-400">Node.js, Express.js, MongoDB, React.js</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}