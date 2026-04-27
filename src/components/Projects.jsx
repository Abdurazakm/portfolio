import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, ExternalLink } from "lucide-react";

function ProjectPreview({ title, demo }) {
  if (!demo || demo === "#") {
    return (
      <div className="h-48 sm:h-56 lg:h-64 rounded-lg border border-dashed border-blue-500/30 bg-black/20 flex flex-col items-center justify-center gap-3 px-4 text-center">
        <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-300">
          <Globe className="w-5 h-5" />
        </div>
        <p className="text-sm text-gray-300 font-medium">{title}</p>
        <p className="text-sm text-gray-400 max-w-xs">
          Demo preview is not available yet for this project.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-blue-500/20 bg-black/30">
      <div className="h-48 sm:h-56 lg:h-64 relative">
        <iframe
          src={demo}
          title={`${title} live preview`}
          loading="lazy"
          className="w-full h-full border-0"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <div className="absolute top-3 right-3 pointer-events-none">
          <Badge className="bg-blue-600/90 text-white border-blue-500/60">
            Live Preview
          </Badge>
        </div>
      </div>
      <div className="px-3 py-2 border-t border-blue-500/20 bg-black/40">
        <p className="text-xs text-blue-200/80 break-all">{demo}</p>
      </div>
    </div>
  );
}

export function Projects() {
  const projects = [
    {
      title: "Fetan Delivery",
      description:
        "A full-stack food delivery platform that streamlines restaurant orders, admin management, and SMS notifications. Includes real-time service availability, order tracking, and admin dashboards.",
      tech: ["React", "Node.js", "Express", "Prisma", "PostgreSQL"],
      github: "https://fetandelivery.netlify.app/",
      demo: "https://fetandelivery.netlify.app/",
    },
    {
      title: "Automated Agency Client Information System",
      description:
        "PHP & MySQL based system for client registration, management, and reporting. Features comprehensive client data management, automated reporting, and secure authentication.",
      tech: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
      github: "https://github.com/Abdurazakm/IP2-PROJECT",
      demo: "https://automatedagenceclientinfosystem.netlify.app/",
    },
    // {
    //   title: "Reunit Hub",
    //   description:
    //     "React + Django web app for reconnecting lost people, presented at AASTU Tech Fest. Includes user authentication, search functionality, and real-time notifications.",
    //   tech: ["React.js", "Django", "Python", "PostgreSQL"],
    //   github: "https://github.com/Eyuel763/ReuniteHub",
    //   demo: "#",
    // },
    // {
    //   title: "EthioHeritage360: The Ethiopian Digital Heritage Ecosystem",
    //   description:
    //     "Developed components of a digital platform to preserve, manage, and promote Ethiopian heritage. Features include a digital archive, interactive maps, and user-generated content.",
    //   tech: ["React.js", "tailwindcss", "MongoDB", "Express.js", "Node.js"],
    //   github: "https://github.com/Summer-Camp-Project/Project-for-G25",
    //   demo: "#",
    // },
    {
      title: "VoiceLocal",
      description:
        "Community issue reporting and voting platform available as both a web app and a Flutter mobile app. Residents can submit issues with photos or videos, vote on priorities, and track status updates. Includes role-based routing (user, sector_admin, super_admin), real-time Firestore feeds with search/pagination, admin moderation by sector/region, and a Firestore-powered notification inbox.",
      tech: [
        "React",
        "Web App",
        "Flutter 3.9+",
        "Dart 3.9",
        "Mobile App",
        "Firebase Auth",
        "Firestore",
        "Firebase Storage",
        "Cloudinary",
        "Material 3",
      ],
      github: "https://github.com/Abdurazakm/VoiceLocal",
      demo: "https://voice-local.netlify.app/",
      status: "Completed",
    },
    {
      title: "Eye Optics Digital Platform",
      description:
        "Digital platform for eye clinic services, improving patient access to clinic information and online visibility for eye care offerings.",
      tech: ["Web Platform", "React", "UI/UX"],
      github: "#",
      demo: "https://mayayeeyeclinic.com",
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

  const hasValidLink = (link) =>
    typeof link === "string" && link.trim() !== "" && link !== "#";

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-gray-900 via-black to-blue-900 relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>

      <motion.div
        initial="visible"
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
                  <ProjectPreview title={project.title} demo={project.demo} />

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

                  <div className="flex flex-wrap gap-3 pt-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-500/30 text-gray-300 hover:bg-blue-600/10 hover:border-blue-500/50 transition-all duration-300"
                        disabled={!hasValidLink(project.github)}
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </motion.div>
                    {hasValidLink(project.demo) && (
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
                          Live Site
                        </Button>
                      </motion.div>
                    )}
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
