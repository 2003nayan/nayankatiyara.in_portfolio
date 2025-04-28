"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import SkillCloud from "@/components/three/skill-cloud"
import { useTerminalMode } from "@/hooks/use-terminal-mode"
import { useAppStore } from "@/lib/store"

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const { isTerminalMode } = useTerminalMode()
  const { isSkillCloudActive, toggleSkillCloud } = useAppStore()

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div
        className={`absolute inset-0 z-0 ${
          isTerminalMode ? "bg-black" : "bg-gradient-to-b from-slate-800 to-slate-900"
        }`}
      ></div>

      {/* Decorative elements */}
      {!isTerminalMode && (
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
      )}

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
              className={`px-4 py-1 ${
                isTerminalMode ? "border-green-500/30 text-green-500" : "border-cyan-500/30 text-cyan-400"
              } text-sm`}
            >
              SKILLS & EXPERTISE
            </Badge>
          </div>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
              isTerminalMode ? "text-green-500" : "text-white"
            }`}
          >
            Interactive Skill Cloud
          </h2>
          <p
            className={`text-lg md:text-xl ${
              isTerminalMode ? "text-green-500/80" : "text-slate-300"
            } max-w-2xl mx-auto`}
          >
            Explore my technical skills and expertise in an interactive 3D visualization.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[500px] md:h-[600px] mb-12"
        >
          <SkillCloud />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p className={`text-lg ${isTerminalMode ? "text-green-500/80" : "text-slate-300"} max-w-2xl mx-auto mb-6`}>
            This interactive visualization represents my technical skills and their relationships. Use the filters below
            to explore different skill categories.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isTerminalMode
                  ? "bg-green-500/20 text-green-500 border border-green-500/30 hover:bg-green-500/30"
                  : "bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:bg-slate-700"
              }`}
              onClick={() => console.log("Filter clicked")}
            >
              All Skills
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isTerminalMode
                  ? "bg-green-500/20 text-green-500 border border-green-500/30 hover:bg-green-500/30"
                  : "bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:bg-slate-700"
              }`}
              onClick={() => console.log("Filter clicked")}
            >
              Frontend
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isTerminalMode
                  ? "bg-green-500/20 text-green-500 border border-green-500/30 hover:bg-green-500/30"
                  : "bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:bg-slate-700"
              }`}
              onClick={() => console.log("Filter clicked")}
            >
              Backend
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isTerminalMode
                  ? "bg-green-500/20 text-green-500 border border-green-500/30 hover:bg-green-500/30"
                  : "bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:bg-slate-700"
              }`}
              onClick={() => console.log("Filter clicked")}
            >
              Web3
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
