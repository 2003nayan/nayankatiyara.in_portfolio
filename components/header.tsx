"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHeaderData } from "@/lib/data";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");

  const headerData = getHeaderData();
  const { logo, navItems } = headerData;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine current section based on scroll position
      const sections = navItems.map((item) => item.section);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-3 bg-slate-900/80 backdrop-blur-md shadow-lg"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-500/30 transition-all duration-300 group-hover:bg-cyan-500/30">
            <span className="text-xl font-bold text-cyan-400">{logo.text}</span>
          </div>
          <span className="font-bold text-xl">{logo.fullName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium ${
                currentSection === item.section
                  ? "text-cyan-400"
                  : "text-slate-300"
              } hover:text-white relative group`}
              onClick={(e) => {
                e.preventDefault();
                if (item.href && item.href !== "#") {
                  const target = document.querySelector(item.href);
                  target?.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
          <Button
            className="bg-cyan-500 hover:bg-cyan-600 text-white ml-2"
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/17H0wc7EOPBypvlytBZUuBRNWCPxgs7WC/view?usp=sharing",
                "_blank"
              )
            }
          >
            Hire Me!
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-slate-300 hover:text-white hover:bg-slate-800"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md md:hidden"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-between items-center mb-10">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-500/30">
                      <span className="text-xl font-bold text-cyan-400">
                        {logo.text}
                      </span>
                    </div>
                    <span className="font-bold text-xl">{logo.fullName}</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-300 hover:text-white hover:bg-slate-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>

                <nav className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-lg font-medium ${
                        currentSection === item.section
                          ? "text-cyan-400"
                          : "text-slate-300"
                      } hover:text-white py-2 border-b border-slate-800`}
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .querySelector(item.href)
                          ?.scrollIntoView({ behavior: "smooth" });
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button
                    className="bg-cyan-500 hover:bg-cyan-600 text-white mt-4"
                    onClick={() => {
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                      setMobileMenuOpen(false);
                    }}
                  >
                    Hire Me!
                  </Button>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
