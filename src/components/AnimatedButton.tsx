"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  children: React.ReactNode;
  /** Aggiunge il glow ciano disciplinato (.btn-glow). */
  glow?: boolean;
}

export function AnimatedButton({
  children,
  className,
  variant,
  size,
  glow = false,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="inline-flex"
    >
      <Button
        variant={variant}
        size={size}
        className={cn(glow && "btn-glow", className)}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}
