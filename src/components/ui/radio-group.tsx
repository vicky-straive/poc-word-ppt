"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("grid gap-3", className)} {...props} />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type="radio"
      className={cn(
        "appearance-none border border-green-500 size-5 rounded-full align-middle transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500",
        "checked:bg-green-500 checked:border-green-500 checked:before:content-[''] checked:before:block checked:before:w-3 checked:before:h-3 checked:before:rounded-full checked:before:bg-white checked:before:mx-auto checked:before:my-auto",
        className
      )}
      {...props}
    />
  )
}

export { RadioGroup, RadioGroupItem }
