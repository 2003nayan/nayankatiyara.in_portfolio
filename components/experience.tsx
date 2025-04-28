"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getExperienceData } from "@/lib/data";

export default function Experience() {
  const experienceData = getExperienceData();
  const [timeline, setTimeline] = useState(experienceData.timeline);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const toggleExpand = (id: string) => {
    setTimeline(
      timeline.map((item) =>
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 z-0"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
        >
          <div className="inline-block mb-4">
            <Badge
              variant="outline"
              className="px-4 py-1 border-cyan-500/30 text-cyan-400 text-sm"
            >
              MY JOURNEY
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {experienceData.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            {experienceData.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-cyan-400 flex items-center">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
              </div>
              Professional Timeline
            </h3>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-slate-500 to-slate-700"></div>

              {timeline.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="mb-12 relative pl-12"
                >
                  <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-500 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  </div>

                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 hover:border-cyan-500/30">
                    <div className="p-6">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                        <div>
                          <h4 className="text-xl font-bold">{item.role}</h4>
                          <p className="text-cyan-400">{item.company}</p>
                        </div>
                        <span className="px-3 py-1 bg-slate-900/50 rounded-full text-sm text-slate-300 border border-slate-700">
                          {item.period}
                        </span>
                      </div>

                      <p className="text-slate-300 mb-4">{item.description}</p>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 p-0 h-auto"
                        onClick={() => toggleExpand(item.id)}
                      >
                        {item.expanded ? (
                          <span className="flex items-center">
                            Show Less <ChevronUp className="ml-1 h-4 w-4" />
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Show Achievements{" "}
                            <ChevronDown className="ml-1 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                      <AnimatePresence>
                        {item.expanded && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 space-y-2 text-sm text-slate-300"
                          >
                            {item.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 mr-2"></div>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-cyan-400 flex items-center">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
              </div>
              Technical Skills
            </h3>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-6 mb-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-wrap gap-3"
              >
                {experienceData.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ delay: 0.5 + index * 0.03, duration: 0.3 }}
                    whileHover={{ scale: 1.05, color: "#22d3ee" }}
                    className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-full text-slate-300 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <h3 className="text-2xl font-bold mb-8 text-cyan-400 flex items-center">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
              </div>
              Leadership & Agile
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {experienceData.leadership.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 text-center hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="text-cyan-400 mb-2">
                    <div className="w-10 h-10 mx-auto bg-slate-900 rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-cyan-500/30 rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
