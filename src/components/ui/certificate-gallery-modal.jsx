import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SimpleModal,
  SimpleModalHeader,
  SimpleModalContent,
} from "./simple-modal";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Badge } from "./badge";
import { Button } from "./button";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";

export function CertificateGalleryModal({ isOpen, onClose, certificate }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!certificate || !certificate.images) return null;

  const totalImages = certificate.images.length;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleClose = () => {
    setCurrentImageIndex(0); // Reset to first image when closing
    onClose();
  };

  return (
    <SimpleModal
      isOpen={isOpen}
      onClose={handleClose}
      className="bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white border border-blue-500/30 max-w-5xl"
    >
      <SimpleModalHeader className="border-b border-blue-500/20">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          <Images className="w-6 h-6 mr-3 text-purple-400" />
          {certificate.title}
        </h2>
        <p className="text-gray-300 text-sm">{certificate.description}</p>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-300 mt-2">
          <span className="text-purple-400">{certificate.issuer}</span>
          <Badge className="bg-purple-600/10 text-purple-400 border-purple-500/30">
            {certificate.year}
          </Badge>
          <Badge className="bg-blue-600/10 text-blue-400 border-blue-500/30">
            {currentImageIndex + 1} of {totalImages} certificates
          </Badge>
          {certificate.certificateNames && (
            <Badge className="bg-green-600/10 text-green-400 border-green-500/30 text-xs sm:text-sm max-w-full truncate">
              {certificate.certificateNames[currentImageIndex]}
            </Badge>
          )}
        </div>
      </SimpleModalHeader>

      <SimpleModalContent>
        {/* Main Gallery Display */}
        <div className="relative">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-500/20 relative">
              <ImageWithFallback
                src={certificate.images[currentImageIndex]}
                alt={`${certificate.title} Certificate ${
                  currentImageIndex + 1
                }`}
                className="w-full h-auto max-h-[60vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Decorative corners */}
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-blue-400/60"></div>
              <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-blue-400/60"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-purple-400/60"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-purple-400/60"></div>

              {/* Navigation Arrows */}
              {totalImages > 1 && (
                <>
                  <Button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white border-blue-500/30 p-2 rounded-full backdrop-blur-sm"
                    size="sm"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>

                  <Button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white border-blue-500/30 p-2 rounded-full backdrop-blur-sm"
                    size="sm"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}

              {/* Image Counter Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-blue-500/30">
                {currentImageIndex + 1} / {totalImages}
              </div>
            </div>
          </motion.div>

          {/* Thumbnail Navigation */}
          {totalImages > 1 && (
            <div className="mt-6">
              <h5 className="text-white font-medium mb-3 text-center">
                Certificate Gallery
              </h5>
              <div className="flex justify-center gap-2 flex-wrap max-h-24 overflow-y-auto">
                {certificate.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex
                        ? "border-purple-400 ring-2 ring-purple-400/30"
                        : "border-gray-600 hover:border-blue-400"
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`Certificate ${index + 1} thumbnail`}
                      className="w-full h-full object-cover"
                    />
                    {index === currentImageIndex && (
                      <div className="absolute inset-0 bg-purple-500/20"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Certificate Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-blue-500/20"
        >
          <h4 className="text-white font-medium mb-2">
            About this Certificate Series
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {certificate.description}
          </p>

          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <h5 className="text-white font-medium mb-2">Certificate Details</h5>
            <ul className="text-gray-300 text-sm space-y-2">
              <li className="flex justify-between">
                <span>Issued by:</span>
                <span className="text-purple-400">{certificate.issuer}</span>
              </li>
              <li className="flex justify-between">
                <span>Year:</span>
                <span className="text-blue-400">{certificate.year}</span>
              </li>
              <li className="flex justify-between">
                <span>Total Certificates:</span>
                <span className="text-green-400">{totalImages}</span>
              </li>
              <li className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-400">Completed</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <h5 className="text-white font-medium mb-2">Key Areas Covered</h5>
            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>Time management and goal setting for academic success</li>
              <li>
                Effective strategies for navigating and completing courses
              </li>
              <li>Best practices for successful online learning</li>
              <li>Study skills and techniques for better learning outcomes</li>
              <li>Evaluating and selecting credible academic resources</li>
              <li>Upholding academic integrity and ethical standards</li>
              <li>
                Staying safe and protecting privacy in online environments
              </li>
            </ul>
          </div>
        </motion.div>
      </SimpleModalContent>
    </SimpleModal>
  );
}
