

import { FlipWords } from "@/components/ui/flip-words";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";
import  Link  from "next/link";
export default function welcomePage() {
    const words = ["Vektoren", "Analysis", "Stochastik"];
    const colors = ["#842249", "#224984", "#22845D"];
  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900 flex items-center justify-center">
            <div className="absolute inset-0 w-full h-full z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            
            <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                    <div className="text-6xl font-bold text-neutral-600 dark:text-neutral-400 mb-6">
                        Willkommen bei {" "}
                        <Link href="http://localhost:3000/auth" className="font-bold">
                        Rechenkunst
                        </Link>
                    </div>
                    <div className="text-4xl font-normal text-neutral-600 dark:text-neutral-400">
                        Lerne
                        <div className="inline-block" style={{ width: "200px" }}>
                            <FlipWords words={words} colors={colors}/>
                        </div>
                        
                    </div>
                </div>
            </div>
    </div>
  );
}