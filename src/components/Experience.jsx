import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  SimpleModal,
  SimpleModalHeader,
  SimpleModalContent,
} from "./ui/simple-modal";
import { CertificateGalleryModal } from "./ui/certificate-gallery-modal";
import { Calendar, MapPin, Award, Eye } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Experience() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Debug function to check if modal opens
  const handleCertificateClick = (cert) => {
    console.log("Certificate clicked:", cert.title);
    setSelectedCertificate(cert);
    console.log("Selected certificate set:", cert);
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setSelectedCertificate(null);
  };

  const experiences = [
    {
      title: "INSA Cyber Talent Summer Camp",
      role: "Development Department",
      period: "Summer 2025",
      location: "Ethiopia",
      description:
        "Participated in intensive cybersecurity and development training program.",
      type: "Training",
    },
    {
      title: "ALX Backend Development Student",
      role: "Python + Django Specialization",
      period: "2025",
      location: "Remote",
      description:
        "Advanced backend development program focusing on Python, Django, and scalable web applications.",
      type: "Education",
    },
  ];

  const education = [
    {
      degree: "Bachelor of Software Engineering",
      institution: "Addis Ababa Science and Technology University (AASTU)",
      period: "2023 – Present",
      status: "4th Year Student",
      description:
        "Comprehensive software engineering program covering algorithms, data structures, software design patterns, and modern development practices.",
    },
  ];

  const certificates = [
    {
      title: "Software Engineering – Backend Web Development",
      issuer: "ALX Africa",
      year: "2025",
      image: "https://i.postimg.cc/rF0m2xBZ/70-back-end-web-development-certificate-abdurazak-mohammed.png",
      description:
        "Graduated from the ALX Software Engineering Program specializing in backend web development, mastering Python, Django, APIs, and software design principles.",
    },
    {
      title: "Programming Fundamentals",
      issuer: "Udacity",
      year: "2024",
      image: "https://i.postimg.cc/3JCY0MCv/Screenshot-2025-08-28-132156.png",
      description:
        "Comprehensive course covering fundamental programming concepts, syntax, and problem-solving techniques.",
    },
    {
      title: "Android Developer Fundamentals",
      issuer: "Udacity",
      year: "2024",
      image: "https://i.postimg.cc/RCfqVDWk/Screenshot-2025-08-28-132352.png",
      description:
        "Mobile application development course focusing on Android platform, UI/UX design, and app deployment.",
    },
    {
      title: "Python Basics",
      issuer: "Microsoft",
      year: "2024",
      image: "https://i.postimg.cc/8CZ2BNj7/Screenshot-2025-08-28-131906.png",
      description:
        "Foundation course in Python programming covering data types, control structures, and object-oriented programming.",
    },
    {
      title: "React Certificate",
      issuer: "GDG",
      year: "2024",
      image: "https://i.postimg.cc/ZqC5k7kD/Abdurazak-Mohammed.png",
      description:
        "React.js development course covering component architecture, state management, and modern React patterns.",
    },
    {
      title: "Data Structures and Algorithms (DSA)",
      issuer: "Skillbridge",
      year: "2024",
      image: "https://i.postimg.cc/RFwTC07y/Screenshot-2025-08-28-130126.png",
      description:
        "Advanced course in data structures and algorithms, covering complexity analysis and optimization techniques.",
    },
    {
      title: "Data Collection",
      issuer: "The Talent Firm",
      year: "2025",
      image: "https://i.postimg.cc/TYN88RRf/Screenshot-2025-08-28-131824.png",
      description:
        "Course on data collection techniques, tools, and best practices for effective data gathering and analysis.",
    },
    {
      title: "Professional Foundations",
      issuer: "ALX",
      year: "2025",
      image: "https://i.postimg.cc/kgSZ9Dff/alx-pf.jpg",
      description:
        "Professional Foundations program focusing on essential workplace skills, collaboration, leadership, and strategic use of technology to succeed in software engineering careers.",
    },
    {
      title: "e-SHE Certificate",
      issuer: "e-SHE Online Learning",
      year: "2025",
      type: "gallery",
      images: [
        "https://i.postimg.cc/X792yHvZ/e-SHE-CE104-Certificate-e-SHE-Online-Learning-page-0001.jpg",
        "https://i.postimg.cc/HLWz7TJn/e-SHE-OEX100-Certificate-e-SHE-Online-Learning-page-0001.jpg",
        "https://i.postimg.cc/cHmFb6VQ/e-SHE-DS201-Certificate-e-SHE-Online-Learning-page-0001.jpg",
        "https://i.postimg.cc/tRxbwkYD/e-SHE-CE101-Certificate-e-SHE-Online-Learning-page-0001.jpg",
        "https://i.postimg.cc/66dSCm7s/e-SHE-CE102-Certificate-e-SHE-Online-Learning-page-0001.jpg",
        "https://i.postimg.cc/j247R7sj/e-SHE-CE105-Certificate-e-SHE-Online-Learning-page-0001.jpg",
        "https://i.postimg.cc/y6DR5D4s/e-SHE-CE106-Certificate-e-SHE-Online-Learning-page-0001.jpg",
      ],
      certificateNames: [
        "Set Goals to Manage Your Time",
        "How to Take a Course",
        "Strategies for Successful Online Learning",
        "How to Study Effectively",
        "How to Evaluate Resources",
        "Academic Integrity",
        "Keeping Yourself Safe Online",
      ],
      description:
        "Comprehensive educational certificate series covering essential academic and online learning skills. This 7-certificate collection demonstrates proficiency in effective study methods, online safety, academic integrity, time management, and resource evaluation - fundamental skills for successful digital learning and professional development.",
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-br from-black via-gray-900 to-blue-900 relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/15 via-transparent to-transparent"></div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="container mx-auto px-6 relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Experience & Education
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-blue-500 mx-auto"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-blue-400" />
              Experience & Training
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card
                  key={index}
                  className="bg-gray-900/80 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-semibold text-lg">
                          {exp.title}
                        </h4>
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

          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Award className="w-6 h-6 mr-3 text-green-400" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card
                  key={index}
                  className="bg-gray-900/80 backdrop-blur-sm border-blue-500/20 hover:border-green-500/40 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-semibold text-lg">
                          {edu.degree}
                        </h4>
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

        <motion.div variants={itemVariants} className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Certificates & Achievements
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gray-800/80 backdrop-blur-sm border-blue-500/20 hover:border-purple-500/40 transition-all duration-300 h-full">
                  <CardContent className="p-4 text-center flex flex-col h-full">
                    <h4 className="text-white font-medium mb-2">
                      {cert.title}
                    </h4>
                    <p className="text-purple-400 text-sm mb-2">
                      {cert.issuer}
                    </p>
                    <Badge className="bg-purple-600/10 text-purple-400 border-purple-500/30 mb-4">
                      {cert.year}
                    </Badge>
                    <div className="mt-auto">
                      <Button
                        onClick={() => handleCertificateClick(cert)}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 w-full"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Certificate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certificate Gallery Modal for multi-image certificates */}
        <CertificateGalleryModal
          isOpen={
            !!selectedCertificate && selectedCertificate.type === "gallery"
          }
          onClose={handleCloseModal}
          certificate={selectedCertificate}
        />

        {/* Simple Modal Implementation for single-image certificates */}
        <SimpleModal
          isOpen={
            !!selectedCertificate && selectedCertificate.type !== "gallery"
          }
          onClose={handleCloseModal}
          className="bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white border border-blue-500/30"
        >
          {selectedCertificate && selectedCertificate.type !== "gallery" && (
            <>
              <SimpleModalHeader className="border-b border-blue-500/20">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedCertificate.title}
                </h2>
                <p className="text-gray-300 text-sm">
                  {selectedCertificate.description}
                </p>
                <div className="flex items-center gap-4 text-gray-300 mt-2">
                  <span className="text-purple-400">
                    {selectedCertificate.issuer}
                  </span>
                  <Badge className="bg-purple-600/10 text-purple-400 border-purple-500/30">
                    {selectedCertificate.year}
                  </Badge>
                </div>
              </SimpleModalHeader>

              <SimpleModalContent>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-500/20">
                    <ImageWithFallback
                      src={selectedCertificate.image}
                      alt={`${selectedCertificate.title} Certificate`}
                      className="w-full h-auto max-h-[50vh] object-contain rounded-lg shadow-2xl"
                    />
                    <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-blue-400/60"></div>
                    <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-blue-400/60"></div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-purple-400/60"></div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-purple-400/60"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-blue-500/20"
                >
                  <h4 className="text-white font-medium mb-2">
                    About this Certificate
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {selectedCertificate.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <h5 className="text-white font-medium mb-2">
                      Certificate Details
                    </h5>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex justify-between">
                        <span>Issued by:</span>
                        <span className="text-purple-400">
                          {selectedCertificate.issuer}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Year:</span>
                        <span className="text-blue-400">
                          {selectedCertificate.year}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Status:</span>
                        <span className="text-green-400">Completed</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <h5 className="text-white font-medium mb-2">
                      Skills Gained
                    </h5>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      This certificate demonstrates proficiency in key concepts
                      and practical applications related to{" "}
                      {selectedCertificate.title.toLowerCase()}. The coursework
                      included hands-on projects, assessments, and real-world
                      problem-solving scenarios.
                    </p>

                    <h6 className="text-white font-medium mb-2 mt-4">
                      Key Learning Outcomes:
                    </h6>
                    <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                      <li>
                        Understanding of fundamental concepts and principles
                      </li>
                      <li>Practical application through hands-on projects</li>
                      <li>Problem-solving techniques and methodologies</li>
                      <li>Industry best practices and standards</li>
                      <li>Real-world implementation strategies</li>
                    </ul>

                    <h6 className="text-white font-medium mb-2 mt-4">
                      Certification Value:
                    </h6>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      This certification validates expertise in{" "}
                      {selectedCertificate.title.toLowerCase()} and demonstrates
                      commitment to professional development and continuous
                      learning. It represents successful completion of
                      comprehensive coursework and assessments.
                    </p>
                  </div>
                </motion.div>
              </SimpleModalContent>
            </>
          )}
        </SimpleModal>
      </motion.div>
    </section>
  );
}
