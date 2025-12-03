import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, ExternalLink } from "lucide-react";

export function Projects() {
  const projects = [
    {
      title: "Fetan Delivery",
      description:
        "A full-stack food delivery platform that streamlines restaurant orders, admin management, and SMS notifications. Includes real-time service availability, order tracking, and admin dashboards.",
      tech: ["React", "Node.js", "Express", "Prisma", "PostgreSQL"],
      github: "https://github.com/Abdurazakm/Fast-Delivery",
      demo: "https://fetandelivery.netlify.app/",
    },
    {
      title: "Automated Agency Client Information System",
      description:
        "PHP & MySQL based system for client registration, management, and reporting. Features comprehensive client data management, automated reporting, and secure authentication.",
      tech: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
      github: "https://github.com/Abdurazakm/IP2-PROJECT",
      demo: "#",
    },
    {
      title: "Reunit Hub",
      description:
        "React + Django web app for reconnecting lost people, presented at AASTU Tech Fest. Includes user authentication, search functionality, and real-time notifications.",
      tech: ["React.js", "Django", "Python", "PostgreSQL"],
      github: "https://github.com/Eyuel763/ReuniteHub",
      demo: "#",
    },
    {
      title: "EthioHeritage360: The Ethiopian Digital Heritage Ecosystem",
      description:
        "Developed components of a digital platform to preserve, manage, and promote Ethiopian heritage. Features include a digital archive, interactive maps, and user-generated content.",
      tech: ["React.js", "tailwindcss", "MongoDB", "Express.js", "Node.js"],
      github: "https://github.com/Summer-Camp-Project/Project-for-G25",
      demo: "#",
    },
    {
      title: "VoiceLocal",
      description:
        "A community engagement platform allowing users to raise and vote on local issues. Features real-time voting, geolocation-based reporting, and live updates. Developed with a full-stack approach using Django for the backend and React with Tailwind CSS for the frontend.",
      tech: ["Django", "React", "Tailwind CSS", "MySQL"],
      github: "https://github.com/Abdurazakm/VoiceLocal",
      demo: "#", 
      status: "Completed",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-gray-900 via-black to-blue-900 relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="container mx-auto px-6 relative z-10"
      >
        <motion.div variants={cardVariants} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-blue-500 mx-auto"
          />
          <motion.p
            variants={cardVariants}
            className="text-gray-400 mt-6 max-w-2xl mx-auto"
          >
            Here are some of the projects I've worked on that showcase my skills
            and passion for development
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="bg-gray-800/80 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white text-xl">
                      {project.title}
                    </CardTitle>
                    {project.status && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.5 + index * 0.1,
                          type: "spring",
                        }}
                      >
                        <Badge className="bg-yellow-600/10 text-yellow-400 border-yellow-500/30">
                          {project.status}
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <p className="text-gray-300 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <motion.div
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + techIndex * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge className="bg-blue-600/10 text-blue-400 border-blue-500/30">
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-500/30 text-gray-300 hover:bg-blue-600/10 hover:border-blue-500/50 transition-all duration-300"
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                        onClick={() => window.open(project.demo, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="border-blue-500/30 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500/50 transition-all duration-300"
              onClick={() =>
                window.open("https://github.com/Abdurazakm", "_blank")
              }
            >
              <Github className="w-5 h-5 mr-2" />
              View All Projects on GitHub
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
