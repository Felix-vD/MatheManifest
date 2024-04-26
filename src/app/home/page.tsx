"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function home() {
  const router = useRouter(); // Use the useRouter hook to get the router object

  const handleClick = () => {
      router.push('/exercises'); // Replace '/your-target-page' with your desired path
  };  
  return (
      <div>
        <h1>Home Page</h1>

        <div>
          <Button onClick={handleClick}>Üben Üben Üben</Button>
        </div>
      </div>
      
    );
  }