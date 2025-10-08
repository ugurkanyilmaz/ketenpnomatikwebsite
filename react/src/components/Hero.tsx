import { useEffect, useMemo, useRef, useState } from 'react'
import { useSiteImage } from '../hooks/useSiteImages'

type Slide = {
  image: string
  title: string
  subtitle: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
}

function OverlapImages({
  index,
  slides,
  onClickImage,
}: {
  index: number
  slides: Slide[]
  onClickImage?: (i: number) => void
}) {
  const images = useMemo(() => slides.map(s => s.image), [slides])

  return (
    <div className="relative w-full max-w-2xl aspect-video min-h-[440px]">
      {images.map((src, i) => {
        const pos = (i - index + images.length) % images.length
        const base =
          pos === 0
            ? 'z-30 left-[68%] top-[35%] -translate-x-1/2 -translate-y-1/2 w-[78%] h-[78%]'
            : pos === 1
            ? 'z-20 left-[-15%] top-[25%] -translate-y-[70%] w-[58%] h-[58%]'
            : 'z-20 left-[-15%] top-[75%] -translate-y-1/2 w-[58%] h-[58%]'
        const anim = pos === 0 ? 'scale-100 opacity-100' : 'scale-95 opacity-95'
        return (
          <img
            key={src}
            src={src}
            alt="Hero görseli"
            onClick={() => onClickImage && onClickImage(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onClickImage && onClickImage(i)
            }}
            className={`absolute object-cover rounded-box shadow-2xl transition-all duration-700 ease-out cursor-pointer ${base} ${anim}`}
            loading="lazy"
          />
        )
      })}
    </div>
  )
}

export default function Hero() {
  // Fetch hero images from API
  const { image: hero1 } = useSiteImage('home_hero_1')
  const { image: hero2 } = useSiteImage('home_hero_2')
  const { image: hero3 } = useSiteImage('home_hero_3')

  const slides: Slide[] = [
    {
      image: hero1?.image_path || '/keten_banner.jpg',
      title: 'Keten  Pnömatik',
      subtitle: 'Endüstriyel pnömatik çözümler ve ekipmanlar',
      ctaPrimary: { label: 'Ürünleri Keşfet', href: '/kategoriler' },
      ctaSecondary: { label: 'Demo Talep Et', href: '/demo-talebi' },
    },
    {
      image: hero2?.image_path || '/endus.jpg',
      title: 'Endüstriyel Seri',
      subtitle: 'Ağır hizmet için yüksek dayanım ve verimlilik',
      ctaPrimary: { label: 'Endüstriyel Seriye Git', href: '/kategoriler/endustriyel' },
      ctaSecondary: { label: 'Teknik Servis', href: '/teknik-servis' },
    },
    {
      image: hero3?.image_path || '/professional_banner.png',
      title: 'Profesyonel Seri',
      subtitle: 'Usta kullanıcılar için hafif ve güçlü çözümler',
      ctaPrimary: { label: 'Profesyonel Seriye Git', href: '/kategoriler/profesyonel' },
      ctaSecondary: { label: 'Demo Talep Et', href: '/demo-talebi' },
    },
  ]

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const textRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 3000)
    return () => clearInterval(id)
  }, [slides.length, paused])

  function handleImageClick(i: number) {
    // If clicking same currently-active image -> toggle pause
    if (i === index) {
      setPaused(p => !p)
      return
    }
    // Jump to that image and pause
    setIndex(i)
    setPaused(true)
    // Scroll the text area into view smoothly
    textRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Gradient orbs for depth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="relative hero py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hero-content flex-col lg:flex-row items-center justify-between gap-12 relative">
            <div className="shrink-0">
              <OverlapImages index={index} slides={slides} onClickImage={handleImageClick} />
            </div>
            <div ref={textRef} className="max-w-xl md:pl-6 lg:pl-10 text-right">
              {/* Glassmorphism card effect */}
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight transition-all duration-500 ease-out transform-gpu text-white"
                  style={{ opacity: 1 }}
                  key={slides[index].title}
                >
                  {slides[index].title}
                </h1>
                <p className="py-6 text-lg text-gray-200 transition-opacity duration-500"
                  key={slides[index].subtitle}
                >
                  {slides[index].subtitle}
                </p>
                <div className="flex flex-wrap gap-3 justify-end">
                  <a className="btn btn-primary text-white shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105" href={slides[index].ctaPrimary.href}>{slides[index].ctaPrimary.label}</a>
                  <a className="btn btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white transition-all duration-300" href={slides[index].ctaSecondary.href}>{slides[index].ctaSecondary.label}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


