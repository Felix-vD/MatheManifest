
import Exercise from "@/components/Exercise";
import LoginForm from "@/components/Login";
import Nav from "@/components/Nav";
import SignUpForm from "@/components/SignUp";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const setNewUser = async () => {
    const { data, error } = await supabase
      .from("user")
      .insert({ 
        name: 'random name'
      })

      if(data) console.log(data)
      
      if(error) console.log(error)
  };
  setNewUser(); 
  return (
    <main className="p-24">
      <Nav />
      <section className="px-12 py-12 flex flex-col items-center text-center gap-8">
        <h1 className ="text-4xl font-bold">Die Geschichte des Mathe Sensei, vor langer langer Zeit in einer weit weit entfernten Galaxie:</h1>
        <p className="text-2xl text-muted-foreground">
        Willkommen, junge Mathematik-Enthusiasten, zu einer Reise, wie ihr sie noch nie zuvor erlebt habt! Ich bin euer Mathe-Sensei, ein Meister der Zahlen, der Geometrie und der Algebra. Meine Reise begann vor vielen Jahren, in den abgelegensten Winkeln Asiens, wo ich mich auf die Suche nach dem wahren Wesen der Mathematik begab.

Stellt euch vor: Hohe, nebelverhangene Berge und in ihrer Mitte eine kleine, unscheinbare Hütte. Genau dort, zwischen uralten Schriftrollen und geheimnisvollen Formeln, habe ich gelernt, dass Mathematik nicht nur aus Zahlen besteht, sondern eine Sprache ist, die die Geheimnisse des Universums entschlüsselt.

Unter der Anleitung der weisesten Mathematiker – von denen einige glaubten, sie könnten mit Gleichungen fliegen – habe ich die Kunst der Mathematik verfeinert. Mit nichts weiter als einem Bambusrechner und einem unerschütterlichen Willen habe ich die komplexesten Probleme gelöst, die Naturgesetze herausgefordert und dabei immer ein Auge auf den wahren Preis gehabt: die Weitergabe meines Wissens.

Nun, nach Jahren der Meditation über algebraische Gleichungen und der Kontemplation über geometrische Formen, bin ich zurückgekehrt, um euch, meine Schüler, auf eurer Reise zu begleiten. Auf dieser Website findet ihr die Essenz meiner Erkenntnisse, destilliert in lehrreiche Lektionen, interaktive Herausforderungen und erhellende Übungen, die eure Mathematik-Fähigkeiten auf ein neues Level heben werden.

Vergesst langweilige Lehrbücher und monotone Vorträge! Hier werdet ihr Mathematik erleben, wie sie sein sollte: spannend, lebendig und ein wenig geheimnisvoll. Ob ihr die Grundlagen festigen oder die höchsten Gipfel mathematischer Erkenntnis erklimmen wollt – ich bin hier, um euch den Weg zu weisen.

Also zögert nicht, bindet eure Stirnbänder, schärft eure Bleistifte und macht euch bereit, in eine Welt einzutauchen, in der Mathematik nicht nur ein Fach ist, sondern ein Abenteuer. Ein Abenteuer, das euch lehrt, logisch zu denken, Probleme zu lösen und die Schönheit in den Zahlen zu entdecken. Zusammen werden wir die Geheimnisse der Mathematik lüften und die Kraft, die in euch schlummert, entfesseln. Euer Mathe-Sensei wartet bereits. Lasst die Reise beginnen!         
        </p>
      </section>
        <div>Hello</div>
    </main>
  );
}
