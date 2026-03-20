import { ShaderAnimation } from "@/components/ui/shader-animation"
import { HeroContent } from "@/components/ui/hero-content"

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Shader fills entire background */}
      <div className="absolute inset-0">
        <ShaderAnimation />
      </div>

      {/* Dark gradient overlay — bottom fades to black */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
        }}
      />

      {/* Content */}
      <HeroContent />
    </div>
  )
}
