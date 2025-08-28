import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import Web3Section from "@/components/web3-section";
import Certifications from "@/components/certifications";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <Header />
      <Hero />
      <Projects />
      <Experience />
      <Web3Section />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
