"use client";

import type React from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Copy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getContactData } from "@/lib/data";
import * as LucideIcons from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const contactData = getContactData();

  const copyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    toast({
      title: "Email copied!",
      description: "Email address copied to clipboard.",
    });
  };

  // Function to dynamically render Lucide icons
  const renderIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons];
    // return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    // Get form data
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Show loading state (optional)
    // setIsSubmitting(true);

    try {
      // Send data to your API route
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message
        alert("Message sent successfully!");
        form.reset();
      } else {
        // Show error message
        alert("Failed to send message. Please try again.");
        console.error("Error:", data.error);
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800 z-0"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute top-40 right-20 w-64 h-64 rounded-full border border-cyan-500/10"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 rounded-full border border-cyan-500/10"></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(34, 211, 238, 0.2) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
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
              GET IN TOUCH
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {contactData.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            {contactData.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-6 md:p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Send me a message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  className="bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  required
                  className="min-h-32 bg-slate-900/50 border-slate-700 focus-visible:ring-cyan-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                <span className="flex items-center">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-6 md:p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">Contact details</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-slate-400 mb-2">Email</p>
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                    <span className="text-cyan-400">{contactData.email}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-white hover:bg-slate-800"
                      onClick={copyEmail}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy email</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-400 mb-2">Location</p>
                  <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                    <span className="text-slate-300">
                      {contactData.location}
                    </span>
                  </div>
                </div>

                {/* <div>
                  <p className="text-sm text-slate-400 mb-2">Social profiles</p>
                  <div className="flex gap-3">
                    {contactData.social.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="bg-slate-900/50 p-3 rounded-full text-slate-400 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500/30 transition-colors duration-300"
                      >
                        <span className="sr-only">{social.platform}</span>
                      </motion.a>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/20 to-slate-800/20 p-6 rounded-xl border border-slate-700">
              <h4 className="font-bold text-lg mb-4">Available For</h4>
              <ul className="space-y-3">
                {contactData.availability.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 mr-2"></div>
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                className="mt-6 border-cyan-500/30 text-cyan-400 hover:bg-slate-800"
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
