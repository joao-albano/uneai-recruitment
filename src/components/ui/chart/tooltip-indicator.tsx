
import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipIndicatorProps {
  color: string
  indicator?: 'line' | 'dot' | 'dashed'
  hideIndicator?: boolean
}

export const TooltipIndicator: React.FC<TooltipIndicatorProps> = ({
  color,
  indicator = "dot",
  hideIndicator = false
}) => {
  if (hideIndicator) {
    return null
  }
  
  return (
    <div
      className={cn(
        "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
        {
          "h-2.5 w-2.5": indicator === "dot",
          "w-1": indicator === "line",
          "w-0 border-[1.5px] border-dashed bg-transparent":
            indicator === "dashed",
          "my-0.5": indicator === "dashed",
        }
      )}
      style={
        {
          "--color-bg": color,
          "--color-border": color,
        } as React.CSSProperties
      }
    />
  )
}
