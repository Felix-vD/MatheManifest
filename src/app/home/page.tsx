"use client"
import { ExerciseType1 } from "@/components/ExerciseType1";
import { ExerciseType2 } from "@/components/ExerciseType2";
import { ExerciseType3 } from "@/components/ExerciseType3";
import { ExerciseType4 } from "@/components/ExerciseType4";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function home() {
  
  //const timestamp = Date.now();
  
  return (
    
    
      <div>
        <h1>Home Page</h1>
        <div>Fange an zu üben oder schaue dir unsere Videos an -{'>'}
            <a href="https://www.youtube.com/channel/UC-kerZk2Q59SnmOJmICIbjw">
              <Button variant="link" >Youtube</Button> 
            </a>
            <div className="flex justify-center items-center min-h-screen">
              <div className="flex space-x-6">
                
                <ExerciseType1 />
                <ExerciseType2 />
                <ExerciseType3 />
                <ExerciseType4 />
              </div>
            </div>
        </div>
        
        

      </div>
      
      
    );
  }