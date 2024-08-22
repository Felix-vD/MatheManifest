"use client"
import { HoverEffect } from "@/components/ui/card-hover-effect";
 
export default function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
const projects = [
  {
    title: "Youtube",
    description:
      "Unser Youtube Kanal, wenn ihr nach Erklärungen sucht oder mehr über uns erfahren wollt schaut doch mal vorbei.",
    link: "https://www.youtube.com/channel/UC-kerZk2Q59SnmOJmICIbjw",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Pornhub",
    description:
      "Wenn ihr ... naja ihr wisst schon...",
    link: "https://pornhub-deutsch.net/",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];