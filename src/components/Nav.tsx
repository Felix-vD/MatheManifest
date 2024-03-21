"use client"
import Image from "next/image" 
import { ModeToggle } from "./ui/toggle-mode"


export default function Nav() {
    return (
        <header>
            <nav>
                <ul className = "flex items-center justify-between">
                    <li>
                    </li>
                    <li>
                        <a
                        className = "pointer-events-none flex place-items-center gap-2 p-8" 
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <Image
                            src="/sensei.jpg"
                            alt="Sensei Logo"
                            className="dark:invert"
                            width={100}
                            height={100}
                            priority                                
                        />
                        </a>
                    </li>
                    <li>
                        <ModeToggle />
                    </li>
                </ul>
            </nav>
        </header>
    )
}