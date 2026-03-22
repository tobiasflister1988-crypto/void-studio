"use client"

import { cn } from "@/lib/utils"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import type * as React from "react"
import { DayPicker } from "react-day-picker"

// Module-level constants — stable references, no recreation per render
const navBtnCls = "flex items-center justify-center w-9 h-9 rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors"

const defaultClassNames = {
  months: "flex flex-col gap-4",
  month: "flex flex-col gap-4",
  month_caption: "flex items-center justify-center relative h-9",
  caption_label: "text-sm font-semibold text-white",
  nav: "absolute top-0 flex w-full justify-between items-center h-9",
  button_previous: navBtnCls,
  button_next: navBtnCls,
  month_grid: "w-full border-collapse mt-1",
  weekdays: "flex",
  weekday: "w-9 h-9 flex items-center justify-center text-xs font-medium text-white/30",
  week: "flex mt-1",
  day: "w-9 h-9 p-0 text-center relative",
  day_button: cn(
    "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-normal text-white/80",
    "hover:bg-white/10 hover:text-white transition-colors",
    "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60"
  ),
  selected: "[&>button]:bg-orange-500 [&>button]:text-black [&>button]:font-semibold [&>button]:hover:bg-orange-400",
  today: "[&>button]:text-orange-400 [&>button]:font-semibold",
  outside: "[&>button]:text-white/20 [&>button]:hover:bg-transparent",
  disabled: "[&>button]:opacity-25 [&>button]:cursor-not-allowed",
  range_start: "[&>button]:rounded-r-none [&>button]:bg-orange-500 [&>button]:text-black",
  range_end: "[&>button]:rounded-l-none [&>button]:bg-orange-500 [&>button]:text-black",
  range_middle: "[&>button]:rounded-none [&>button]:bg-orange-500/20",
  hidden: "invisible",
}

function Chevron({ orientation }: { orientation?: string }) {
  return orientation === "left"
    ? <ChevronLeftIcon className="w-4 h-4" aria-hidden="true" />
    : <ChevronRightIcon className="w-4 h-4" aria-hidden="true" />
}

const defaultComponents = { Chevron }

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 select-none", className)}
      classNames={classNames ? { ...defaultClassNames, ...classNames } : defaultClassNames}
      components={defaultComponents}
      {...props}
    />
  )
}
