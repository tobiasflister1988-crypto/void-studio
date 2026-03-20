"use client"

import { useState, useRef } from "react"

export const WaitlistHero = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    setTimeout(() => {
      setStatus("success")
      setEmail("")
      fireConfetti()
    }, 1500)
  }

  const fireConfetti = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particles: {
      x: number; y: number; vx: number; vy: number
      life: number; color: string; size: number
    }[] = []
    const confettiColors = ["#0079da", "#10b981", "#fbbf24", "#f472b6", "#fff"]

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const createParticle = () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 2) * 10,
      life: 100,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      size: Math.random() * 4 + 2,
    })

    for (let i = 0; i < 50; i++) particles.push(createParticle())

    const animate = () => {
      if (particles.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.5
        p.life -= 2
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, p.life / 100)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        if (p.life <= 0) { particles.splice(i, 1); i-- }
      }
      requestAnimationFrame(animate)
    }
    animate()
  }

  const colors = {
    textMain: "#ffffff",
    textSecondary: "#94a3b8",
    bluePrimary: "#0079da",
    success: "#10b981",
    inputBg: "#27272a",
    baseBg: "#09090b",
    inputShadow: "rgba(255, 255, 255, 0.1)",
  }

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center">
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 60s linear infinite; }
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 60s linear infinite; }
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes success-pulse {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes success-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 60px rgba(16, 185, 129, 0.8), 0 0 100px rgba(16, 185, 129, 0.4); }
        }
        @keyframes checkmark-draw {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes celebration-ring {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        .animate-success-pulse { animation: success-pulse 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-success-glow { animation: success-glow 2s ease-in-out infinite; }
        .animate-checkmark {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          animation: checkmark-draw 0.4s ease-out 0.3s forwards;
        }
        .animate-ring { animation: celebration-ring 0.8s ease-out forwards; }
      `}</style>

      <div
        className="relative w-full h-screen overflow-hidden shadow-2xl"
        style={{
          backgroundColor: colors.baseBg,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Background Decorative Rings */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            perspective: "1200px",
            transform: "perspective(1200px) rotateX(15deg)",
            transformOrigin: "center bottom",
          }}
        >
          <div className="absolute inset-0 animate-spin-slow">
            <div
              className="absolute top-1/2 left-1/2"
              style={{ width: "2000px", height: "2000px", transform: "translate(-50%, -50%) rotate(279.05deg)", zIndex: 0 }}
            >
              <img
                src="https://framerusercontent.com/images/oqZEqzDEgSLygmUDuZAYNh2XQ9U.png?scale-down-to=2048"
                alt=""
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          </div>

          <div className="absolute inset-0 animate-spin-slow-reverse">
            <div
              className="absolute top-1/2 left-1/2"
              style={{ width: "1000px", height: "1000px", transform: "translate(-50%, -50%) rotate(304.42deg)", zIndex: 1 }}
            >
              <img
                src="https://framerusercontent.com/images/UbucGYsHDAUHfaGZNjwyCzViw8.png?scale-down-to=1024"
                alt=""
                className="w-full h-full object-cover opacity-60"
              />
            </div>
          </div>

          <div className="absolute inset-0 animate-spin-slow">
            <div
              className="absolute top-1/2 left-1/2"
              style={{ width: "800px", height: "800px", transform: "translate(-50%, -50%) rotate(48.33deg)", zIndex: 2 }}
            >
              <img
                src="https://framerusercontent.com/images/Ans5PAxtJfg3CwxlrPMSshx2Pqc.png"
                alt=""
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${colors.baseBg} 10%, rgba(9, 9, 11, 0.8) 40%, transparent 100%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-end pb-24 gap-6">
          {/* Logo badge */}
          <div className="w-16 h-16 rounded-2xl shadow-lg overflow-hidden mb-2 ring-1 ring-white/10 flex items-center justify-center bg-zinc-900">
            <span className="text-white font-bold text-xl tracking-tight">TT</span>
          </div>

          <h1
            className="text-5xl md:text-6xl font-bold text-center tracking-tight"
            style={{ color: colors.textMain }}
          >
            KI-Content.<br />Social Media. Wachstum.
          </h1>

          <p className="text-lg font-medium text-center max-w-md px-4" style={{ color: colors.textSecondary }}>
            Für Unternehmen, die mehr wollen als nur Präsenz.
          </p>

          {/* Form / Success */}
          <div className="w-full max-w-md px-4 mt-4 h-[60px] relative">
            <canvas
              ref={canvasRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-50"
            />

            {/* Success state */}
            <div
              className={`absolute inset-0 flex items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                status === "success"
                  ? "opacity-100 scale-100 animate-success-pulse animate-success-glow"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
              style={{ backgroundColor: colors.success }}
            >
              {status === "success" && (
                <>
                  <div className="absolute top-1/2 left-1/2 w-full h-full rounded-full border-2 border-emerald-400 animate-ring" style={{ animationDelay: "0s" }} />
                  <div className="absolute top-1/2 left-1/2 w-full h-full rounded-full border-2 border-emerald-300 animate-ring" style={{ animationDelay: "0.15s" }} />
                  <div className="absolute top-1/2 left-1/2 w-full h-full rounded-full border-2 border-emerald-200 animate-ring" style={{ animationDelay: "0.3s" }} />
                </>
              )}
              <div className={`flex items-center gap-2 text-white font-semibold text-lg ${status === "success" ? "animate-bounce-in" : ""}`}>
                <div className="bg-white/20 p-1 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      className={status === "success" ? "animate-checkmark" : ""}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>Anfrage gesendet!</span>
              </div>
            </div>

            {/* Form state */}
            <form
              onSubmit={handleSubmit}
              className={`relative w-full h-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                status === "success"
                  ? "opacity-0 scale-95 pointer-events-none"
                  : "opacity-100 scale-100"
              }`}
            >
              <input
                type="email"
                required
                placeholder="deine@email.com"
                value={email}
                disabled={status === "loading"}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[60px] pl-6 pr-[160px] rounded-full outline-none transition-all duration-200 placeholder-zinc-500 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: colors.inputBg,
                  color: colors.textMain,
                  boxShadow: `inset 0 0 0 1px ${colors.inputShadow}`,
                }}
              />
              <div className="absolute top-[6px] right-[6px] bottom-[6px]">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-full px-6 rounded-full font-medium text-white transition-all active:scale-95 hover:brightness-110 disabled:hover:brightness-100 disabled:active:scale-100 disabled:cursor-wait flex items-center justify-center min-w-[140px]"
                  style={{ backgroundColor: colors.bluePrimary }}
                >
                  {status === "loading" ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    "Jetzt anfragen"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
