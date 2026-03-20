import Hero from "@/components/ui/animated-shader-hero"

export default function Home() {
  return (
    <Hero
      trustBadge={{
        text: "KI-gestützte Content-Produktion für den Mittelstand",
        icons: ["✨"],
      }}
      headline={{
        line1: "KI-Content.",
        line2: "Social Media. Wachstum.",
      }}
      subtitle="Agenturqualität, monatlich geliefert — KI-produzierte Posts, Reels und Motion Graphics für Unternehmen, die mehr wollen als nur Präsenz."
      buttons={{
        primary: {
          text: "Jetzt anfragen",
        },
        secondary: {
          text: "Leistungen entdecken",
        },
      }}
    />
  )
}
