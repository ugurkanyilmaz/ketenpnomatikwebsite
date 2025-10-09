import { useEffect, useState } from 'react'

/**
 * Returns true when animations should run.
 * Disables animations on small screens and when the user prefers reduced motion.
 */
export default function useShouldAnimate() {
  const [should, setShould] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq && mq.matches) return false
    return window.innerWidth >= 768
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleReduce = () => setShould(!(reduceMotion && reduceMotion.matches) && window.innerWidth >= 768)
    const handleResize = () => setShould(!(reduceMotion && reduceMotion.matches) && window.innerWidth >= 768)

    if (reduceMotion) reduceMotion.addEventListener ? reduceMotion.addEventListener('change', handleReduce) : reduceMotion.addListener(handleReduce)
    window.addEventListener('resize', handleResize)

    // initial
    handleReduce()

    return () => {
      if (reduceMotion) reduceMotion.removeEventListener ? reduceMotion.removeEventListener('change', handleReduce) : reduceMotion.removeListener(handleReduce)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return should
}
