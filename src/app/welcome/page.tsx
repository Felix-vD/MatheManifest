

import { FlipWords } from "@/components/ui/flip-words";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";
export default function welcomePage() {
    const words = ["Vektoren", "Analysis", "Stochastik"];
 
  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900 flex items-center justify-center">
            <div className="absolute inset-0 w-full h-full z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <Boxes />
            <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                    <div className="text-6xl font-bold text-neutral-600 dark:text-neutral-400 mb-6">
                        Welcome to {" "}
                        <LinkPreview url="https://rechenkunst.vercel.app/auth" className="font-bold">
                        Rechenkunst
                        </LinkPreview>
                    </div>
                    <div className="text-4xl font-normal text-neutral-600 dark:text-neutral-400">
                        Lerne
                        <div className="inline-block" style={{ width: "200px" }}>
                            <FlipWords words={words} />
                        </div>
                        
                    </div>
                </div>
            </div>
    </div>
  );
}