"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Wallet, ExternalLink, ArrowRight, Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getWeb3Data } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Web3Section() {
  const web3Data = getWeb3Data();
  const [walletConnected, setWalletConnected] = useState(false);
  const [isNftModalOpen, setIsNftModalOpen] = useState(false);

  const connectWallet = () => {
    setWalletConnected(true);
  };

  return (
    <section id="web3" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {web3Data.title}
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            {web3Data.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-cyan-400">
              {web3Data.projectTitle}
            </h3>
            <p className="text-slate-300 mb-6">{web3Data.projectDescription}</p>

            <div className="bg-gradient-to-r from-cyan-500/20 to-slate-800/20 p-4 rounded-lg border border-slate-700 mb-6">
              <div className="flex items-center text-cyan-400 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2" />
                <span className="font-semibold">Key Metrics</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                {web3Data.metrics.map((metric, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 mr-2" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* <Button
                className="bg-cyan-500 hover:bg-cyan-600 transition-transform hover:scale-105 text-white"
                onClick={connectWallet}
              >
                <Wallet className="mr-2 h-4 w-4" />
                {walletConnected ? "Wallet Connected" : "Connect Wallet"}
              </Button> */}

              <Button
                variant="outline"
                className="border-cyan-500/30 text-cyan-400 hover:bg-slate-800 transition-transform hover:scale-105"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  View Project
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-lg">NFT Gallery</h4>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                    walletConnected
                      ? "bg-green-500/20 text-green-400"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Nayan's Wallet Connected
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {web3Data.nfts.slice(0, 4).map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(34, 211, 238, 0.1)",
                    }}
                  >
                    <Card className="bg-slate-900 border-slate-700 overflow-hidden hover:border-cyan-500/30 transition-all duration-300">
                      <div className="relative h-32 w-full">
                        <Image
                          src={nft.image || "/placeholder.svg"}
                          alt={nft.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-3">
                        <h5 className="font-medium text-sm truncate">
                          {nft.name}
                        </h5>
                        <p className="text-cyan-400 text-xs">{nft.price}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-cyan-500/30 text-cyan-400 hover:bg-slate-700 hover:text-white text-sm cursor-pointer"
                  onClick={() => setIsNftModalOpen(true)}
                >
                  View All NFTs
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>

                {isNftModalOpen && (
                  <Dialog
                    open={isNftModalOpen}
                    onOpenChange={setIsNftModalOpen}
                  >
                    <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-4xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold flex items-center justify-between mr-6">
                          <span>My NFT Collection</span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                              walletConnected
                                ? "bg-green-500/20 text-green-400"
                                : "bg-slate-700 text-slate-400"
                            }`}
                          >
                            <span className="relative flex h-2 w-2 mr-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Nayan's Wallet Connected
                          </span>
                        </DialogTitle>
                        <DialogDescription className="text-slate-400">
                          Displaying all NFTs in your connected wallet
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 max-h-[60vh] overflow-y-auto p-1">
                        {web3Data.nfts.map((nft) => (
                          <Card
                            key={nft.id}
                            className="bg-slate-800 border-slate-700 overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
                          >
                            <div className="relative h-40 w-full">
                              <Image
                                src={nft.image || "/placeholder.svg"}
                                alt={nft.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <CardContent className="p-3">
                              <h5 className="font-medium text-sm truncate">
                                {nft.name}
                              </h5>
                              <div className="flex justify-between items-center mt-1">
                                <p className="text-cyan-400 text-xs">
                                  {nft.price}
                                </p>
                                <Badge
                                  // variant="outline"
                                  className="text-xs border-cyan-500/30 text-cyan-400"
                                >
                                  {/* x{nft.quantity || 1} */}
                                  100
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <DialogFooter className="flex items-center justify-between border-t border-slate-700 pt-4">
                        <div className="text-sm text-slate-400">
                          Total Value:{" "}
                          <span className="text-cyan-400 font-medium">
                            0.18 ETH
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          className="border-cyan-500/30 text-cyan-400 hover:bg-slate-700 hover:text-white"
                          onClick={() => setIsNftModalOpen(false)}
                        >
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
