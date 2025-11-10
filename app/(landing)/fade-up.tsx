"use client"

import { motion, useInView } from "framer-motion"
import { ReactNode, useRef } from "react"

interface FadeUpProps {
  children: ReactNode
  delay?: number
  duration?: number
}

export function FadeUp({ children, delay = 0, duration = 0.5 }: FadeUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  )
}