import { useRef, useEffect, useState } from 'react'

export function useMagnetic(options = {}) {
  const { strength = 0.3, radius = 100 } = options
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

      if (distance < radius) {
        const pull = (radius - distance) / radius
        setPosition({
          x: distanceX * strength * pull,
          y: distanceY * strength * pull,
        })
      } else {
        setPosition({ x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, radius])

  return { ref, position }
}

