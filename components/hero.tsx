"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { getHeroData } from "@/lib/data";
import * as LucideIcons from "lucide-react";

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const heroData = getHeroData();

  useEffect(() => {
    if (nameRef.current && subtitleRef.current) {
      const tl = gsap.timeline();

      tl.from(nameRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      tl.from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }
  }, []);

  // Function to dynamically render Lucide icons
  const renderIcon = (iconName: string | null) => {
    if (!iconName) return null;

    const renderIcon = (iconName: string | null) => {
      if (!iconName) return null;

      const Icon = LucideIcons[
        iconName as keyof typeof LucideIcons
      ] as React.FC<{ className?: string }>;
      return <Icon className="ml-2 h-4 w-4" />;
    };
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0"></div>

      {/* Three.js Background */}

      {/* Geometric patterns */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-cyan-500/30"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full border border-cyan-500/20"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-cyan-500/5"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-cyan-500/5"></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(34, 211, 238, 0.2) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6 inline-block py-1 px-3 rounded-full bg-cyan-500/10 border border-cyan-500/30"
            >
              <h2 className="text-sm md:text-base font-medium text-cyan-400">
                {heroData.tagline}
              </h2>
            </motion.div>

            <h1
              ref={nameRef}
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400"
            >
              {heroData.name}
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl"
            >
              {heroData.description}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              {heroData.buttons.map((button, index) => {
                const buttonVariants = {
                  primary: "bg-cyan-500 hover:bg-cyan-600 text-white",
                  outline:
                    "border-cyan-500/30 text-cyan-400 hover:bg-slate-800/80",
                  ghost:
                    "text-slate-300 hover:text-white hover:bg-slate-800/80",
                };

                const buttonClass = `transition-transform hover:scale-105 text-base ${
                  buttonVariants[button.variant as keyof typeof buttonVariants]
                }`;

                return (
                  <Button
                    key={index}
                    size="lg"
                    variant={
                      button.variant === "primary"
                        ? "default"
                        : button.variant === "outline"
                          ? "outline"
                          : "ghost"
                    }
                    className={buttonClass}
                    onClick={() => {
                      if (button.href.startsWith("#")) {
                        document
                          .getElementById(button.href.substring(1))
                          ?.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.open(button.href, "_blank");
                      }
                    }}
                  >
                    {button.text}
                    {renderIcon(button.icon)}
                  </Button>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-16 flex items-center gap-2 text-slate-400"
            >
              <div className="w-12 h-[1px] bg-slate-600"></div>
              <span className="text-sm">Scroll to explore</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-cyan-500/10 -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-cyan-500/10 -z-10"></div>

              {/* Code snippet decoration */}
              <div className="absolute -top-10 -right-10 bg-slate-800/80 backdrop-blur-sm p-4 rounded-lg border border-slate-700 shadow-xl transform rotate-6 z-10 hidden md:block">
                <pre className="text-xs text-cyan-400">
                  <code>{`const developer = {
  name: "${heroData.name}",
  skills: ["Next.js", "React", "Web3"]
};`}</code>
                </pre>
              </div>

              {/* Main image */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-slate-700 shadow-2xl">
                <Image
                  src={heroData.image || "/placeholder.svg"}
                  alt={heroData.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Tech stack badges */}
              {heroData.techBadges.map((badge, index) => {
                const positions = {
                  "bottom-left": "-bottom-4 -left-4",
                  "top-right": "-top-4 -right-4",
                };

                return (
                  <div
                    key={index}
                    className={`absolute ${
                      positions[badge.position as keyof typeof positions]
                    } bg-slate-800/80 backdrop-blur-sm px-3 py-2 rounded-full border border-slate-700 shadow-xl z-10`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                      <span className="text-xs font-medium">{badge.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
