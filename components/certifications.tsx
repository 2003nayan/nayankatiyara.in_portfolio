"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCertificationsData } from "@/lib/data";

export default function Certifications() {
  const certData = getCertificationsData();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % certData.certificates.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) =>
        (prev - 1 + certData.certificates.length) % certData.certificates.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % certData.certificates.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="certifications" className="py-20 bg-slate-800">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {certData.title}
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            {certData.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900 rounded-xl p-8 border border-slate-700 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full -ml-12 -mb-12" />

            <div className="relative">
              <div className="flex items-center mb-6">
                <GraduationCap className="h-8 w-8 text-cyan-500 mr-3" />
                <h3 className="text-2xl font-bold">Education</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold mb-1">
                    {certData.education.degree}
                  </h4>
                  <p className="text-cyan-400 mb-2">
                    {certData.education.institution}
                  </p>
                  <p className="text-slate-300 text-sm">
                    {certData.education.period}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {certData.education.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 mr-2" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-6">
              <Award className="h-8 w-8 text-cyan-500 mr-3" />
              <h3 className="text-2xl font-bold">Certifications</h3>
            </div>

            <div className="relative">
              <div className="flex justify-between mb-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-cyan-500/30 text-cyan-400 hover:bg-slate-700 hover:text-white"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-cyan-500/30 text-cyan-400 hover:bg-slate-700 hover:text-white"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="overflow-hidden" ref={carouselRef}>
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {certData.certificates.map((cert) => (
                    <div key={cert.id} className="w-full flex-shrink-0">
                      <div className="perspective">
                        <motion.div
                          transition={{ duration: 0.6 }}
                          className="relative w-full h-64 cursor-pointer"
                        >
                          {/* Front of card */}
                          <div className="absolute inset-0 backface-hidden">
                            <Card className="h-full bg-slate-900 border-slate-700 overflow-hidden">
                              <div className="relative h-full">
                                <Image
                                  src={cert.image || "/placeholder.svg"}
                                  alt={cert.name}
                                  fill
                                  className="object-contain h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                  <h4 className="font-bold text-lg">
                                    {cert.name}
                                  </h4>
                                  <p className="text-cyan-400">{cert.issuer}</p>
                                </div>
                              </div>
                            </Card>
                          </div>

                          {/* Back of card */}
                          <div className="absolute inset-0 backface-hidden rotate-y-180">
                            <Card className="h-full bg-slate-900 border-slate-700 flex items-center justify-center p-6">
                              <CardContent className="text-center">
                                <h4 className="font-bold text-lg mb-2">
                                  {cert.name}
                                </h4>
                                <p className="text-cyan-400 mb-4">
                                  {cert.issuer}
                                </p>
                                <p className="text-slate-300 mb-2">
                                  Issued: {cert.date}
                                </p>
                                <p className="text-sm text-slate-400">
                                  This certification validates expertise in{" "}
                                  {cert.name.toLowerCase()}
                                  and related technologies.
                                </p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-4 border-cyan-500/30 text-cyan-400 hover:bg-slate-700 hover:text-white"
                                >
                                  Verify Certificate
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        </motion.div>
                      </div>
                      <p className="text-center mt-4 text-sm text-slate-400">
                        Hover to see details
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {certData.certificates.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === activeIndex ? "bg-cyan-500" : "bg-slate-700"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
