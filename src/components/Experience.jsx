import { motion} from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Award } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      title: "INSA Cyber Talent Summer Camp",
      role: "Development Department",
      period: "Summer 2025",
      location: "Ethiopia",
      description: "Participated in intensive cybersecurity and development training program.",
      type: "Training"
    },
    {
      title: "ALX Backend Development Student", 
      role: "Python + Django Specialization",
      period: "2025",
      location: "Remote",
      description: "Advanced backend development program focusing on Python, Django, and scalable web applications.",
      type: "Education"
    }
  ];

  const education = [
    {
      degree: "Bachelor of Software Engineering",
      institution: "Addis Ababa Science and Technology University (AASTU)",
      period: "2022 – Present",
      status: "4th Year Student",
      description: "Comprehensive software engineering program covering algorithms, data structures, software design patterns, and modern development practices."
    }
  ];

  const certificates = [
    {
      title: "Programming Fundamentals",
      issuer: "Udacity",
      year: "2024"
    },
    {
      title: "Android Developer Fundamentals", 
      issuer: "Udacity",
      year: "2024"
    },
    {
      title: "Python Basics",
      issuer: "Microsoft",
      year: "2024"
    },
    {
      title: "React Certificate",
      issuer: "GDG",
      year: "2024"
    },
    {
      title: "Data Structures and Algorithms (DSA)",
      issuer: "Skillbridge",
      year: "2024"
    }
  ];

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
    <section id="experience" className="py-20 bg-gradient-to-br from-black via-gray-900 to-blue-900 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/15 via-transparent to-transparent"></div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="container mx-auto px-6 relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Experience & Education</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-blue-500 mx-auto"
          />
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience & Training */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-blue-400" />
              Experience & Training
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="bg-gray-900/80 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-semibold text-lg">{exp.title}</h4>
                        <p className="text-blue-400">{exp.role}</p>
                      </div>
                      <Badge className="bg-blue-600/10 text-blue-400 border-blue-500/30">
                        {exp.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.period}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {exp.location}
                      </span>
                    </div>
                    <p className="text-gray-300">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Award className="w-6 h-6 mr-3 text-green-400" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} className="bg-gray-900/80 backdrop-blur-sm border-blue-500/20 hover:border-green-500/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-semibold text-lg">{edu.degree}</h4>
                        <p className="text-green-400">{edu.institution}</p>
                      </div>
                      <Badge className="bg-green-600/10 text-green-400 border-green-500/30">
                        {edu.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      {edu.period}
                    </div>
                    <p className="text-gray-300">{edu.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        {/* Certificates */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Certificates & Achievements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert, index) => (
              <Card key={index} className="bg-gray-800/80 backdrop-blur-sm border-blue-500/20 hover:border-purple-500/40 transition-colors">
                <CardContent className="p-4 text-center">
                  <h4 className="text-white font-medium mb-2">{cert.title}</h4>
                  <p className="text-purple-400 text-sm">{cert.issuer}</p>
                  <Badge className="bg-purple-600/10 text-purple-400 border-purple-500/30 mt-2">
                    {cert.year}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}