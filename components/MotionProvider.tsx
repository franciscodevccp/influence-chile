'use client'

import { MotionConfig } from 'framer-motion'

/** Respeta la preferencia del sistema "reducir movimiento": framer-motion
 *  desactiva las animaciones de transform/escala para usuarios que lo piden. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
