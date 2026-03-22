"use client"

import { useMemo, useState } from "react"
import { Calendar } from "@/components/ui/calendar"

const FORMAT_LONG: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" }
const FORMAT_SHORT: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
]

export function BookingSection() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | undefined>(undefined)
  const [booked, setBooked] = useState(false)

  const today = useMemo(() => new Date(), [])

  const handleBook = () => {
    if (!date || !time) return
    setBooked(true)
  }

  return (
    <section className="w-full bg-[#09090b] py-24 px-4 border-t border-white/5">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest text-orange-400 uppercase mb-4">
            Kostenloses Erstgespräch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Termin buchen.
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-md mx-auto">
            30 Minuten — wir analysieren deine Situation und zeigen dir, was mit KI möglich ist.
          </p>
        </div>

        {booked ? (
          /* Success state */
          <div className="flex flex-col items-center gap-4 py-16">
            <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">Termin bestätigt!</h3>
            <p className="text-white/50 text-center">
              {date?.toLocaleDateString("de-DE", FORMAT_LONG)} um {time} Uhr.<br />
              Du erhältst eine Bestätigung per E-Mail.
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

            {/* Calendar */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={{ before: today }}
              />
            </div>

            {/* Time slots + CTA */}
            <div className="flex flex-col gap-6 flex-1 min-w-[240px]">
              <div>
                <p className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-3">
                  {date ? date.toLocaleDateString("de-DE", FORMAT_LONG) : "Datum wählen"}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setTime(slot)}
                      disabled={!date}
                      className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all border
                        ${time === slot
                          ? "bg-orange-500 border-orange-500 text-black font-semibold"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed"
                        }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleBook}
                disabled={!date || !time}
                className="w-full py-4 rounded-2xl font-semibold text-base transition-all
                  bg-gradient-to-r from-orange-500 to-yellow-500 text-black
                  hover:from-orange-400 hover:to-yellow-400 hover:scale-[1.02]
                  disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {date && time
                  ? `${date.toLocaleDateString("de-DE", FORMAT_SHORT)} · ${time} Uhr buchen`
                  : "Datum & Uhrzeit wählen"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
