"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function home() {
  
  //const timestamp = Date.now();
  
  return (
      <div>
        <h1>Home Page</h1>
        <div>Fange an zu üben oder schaue dir unsere Videos an -{'>'}
            <a href="https://www.youtube.com/channel/UC-kerZk2Q59SnmOJmICIbjw">
              <Button variant="link" >Youtube</Button>
              <div></div>
            </a>
          
        </div>
        <div className="flex justify-center items-center min-h-screen">
        <Button asChild>
          <Link href={{
            pathname: '/exercises',
            //query: { timestamp : timestamp.toString() } 
          }}>Aufgabe Üben</Link>
        </Button>
        </div>
      </div>
      
    );
  }