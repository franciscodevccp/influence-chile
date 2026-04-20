import Image from 'next/image'

type LogoProps = {
  size?: number
  className?: string
  priority?: boolean
}

/** Marca Influence — recorte circular; el asset está en `public/logo/logo.PNG`. */
export default function Logo({ size = 44, className = '', priority = false }: LogoProps) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-full ring-1 ring-white/20 shadow-[0_0_24px_rgba(20,184,190,0.2)] ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo/logo.PNG"
        alt="Influence — agencia de marketing"
        width={size}
        height={size}
        className="h-full w-full object-cover"
        priority={priority}
      />
    </span>
  )
}
