import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

/* import { cn } from "@/lib/utils" */

const Separator = React.forwardRef<
React.ElementRef<typeof SeparatorPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { style, className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={
          `separator ${className} `
            + (orientation === 'horizontal' ? "horizontal" : "vertical")
        }

        style={{
          width: orientation === 'horizontal' ? "100%" : "1px",
          height: orientation === 'horizontal' ? "1px" : "100%",
          backgroundColor: 'hsla(var(--grey))',
          flexShrink: "0",
          ...style
        }}
        /* className={cn( */
        /*   "shrink-0 bg-border", */
        /*   orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", */
        /*   className */
        /* )} */
        {...props}
      />
    )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
