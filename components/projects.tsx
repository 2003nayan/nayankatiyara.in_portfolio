"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Code, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { getProjectsData } from "@/lib/data";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const projectsData = getProjectsData();

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800 z-0"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute top-40 right-20 w-64 h-64 rounded-full border border-cyan-500/10"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 rounded-full border border-cyan-500/10"></div>
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
              FEATURED WORK
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {projectsData.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            {projectsData.subtitle}
          </p>
        </motion.div>

        <div className="space-y-32">
          {projectsData.items.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div
                className={`order-2 ${
                  index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-slate-700/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-slate-700 shadow-xl">
                    <Image
                      src={project.thumbnail || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                      <div className="p-6">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/20 text-white bg-slate-900/50 backdrop-blur-sm hover:bg-white hover:text-slate-900"
                          onClick={() => setSelectedProject(project)}
                        >
                          View Case Study
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`order-1 ${
                  index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="space-y-6">
                  <h3 className="text-3xl md:text-4xl font-bold">
                    {project.title}
                  </h3>
                  <p className="text-lg text-slate-300">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-slate-800 text-cyan-400 border border-slate-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-3 bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg border border-slate-700">
                    <h4 className="text-sm font-semibold text-cyan-400">
                      KEY METRICS
                    </h4>
                    {project.metrics.map((metric, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-slate-300"
                      >
                        <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2" />
                        {metric}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    <Button
                      className="bg-cyan-500 hover:bg-cyan-600 text-white"
                      onClick={() => setSelectedProject(project)}
                    >
                      View Case Study
                    </Button>

                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                      asChild
                    >
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 max-w-4xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {selectedProject?.title}
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              {selectedProject?.description}
            </DialogDescription>
          </DialogHeader>
          <DialogClose className="absolute right-4 top-4 text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <div className="relative h-64 md:h-80 my-4 overflow-hidden rounded-lg">
            {selectedProject?.thumbnail && (
              <Image
                src={selectedProject.thumbnail}
                alt={selectedProject.title || "Project"}
                fill
                className="object-contain"
              />
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject?.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-slate-800 text-cyan-400 border border-slate-700"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <h4 className="text-lg font-semibold text-cyan-400 mt-4 mb-2">
                Metrics
              </h4>
              <div className="space-y-2">
                {selectedProject?.metrics.map(
                  (metric: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-slate-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2" />
                      {metric}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                  The Problem
                </h4>
                <p className="text-slate-300">
                  {selectedProject?.caseStudy.problem}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                  The Solution
                </h4>
                <p className="text-slate-300">
                  {selectedProject?.caseStudy.solution}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                  The Impact
                </h4>
                <p className="text-slate-300">
                  {selectedProject?.caseStudy.impact}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button className="bg-cyan-500 hover:bg-cyan-600" asChild>
              <a
                href={selectedProject?.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-slate-600 hover:bg-slate-700"
              asChild
            >
              <a
                href={selectedProject?.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Code
                <Code className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
