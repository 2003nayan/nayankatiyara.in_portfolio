import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"
import { getFooterData, getHeaderData } from "@/lib/data"

export default function Footer() {
  const footerData = getFooterData()
  const headerData = getHeaderData()

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-500/30">
                <span className="text-xl font-bold text-cyan-400">{headerData.logo.text}</span>
              </div>
              <span className="font-bold text-xl">{headerData.logo.fullName}</span>
            </Link>
            <p className="text-slate-400 max-w-xs text-sm">{footerData.description}</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <Link
                href="https://github.com/2003nayan/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2 rounded-full text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/nayankatiyara/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2 rounded-full text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://twitter.com/NayanKatiyara"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2 rounded-full text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
            <p className="text-slate-500 text-sm">{footerData.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
