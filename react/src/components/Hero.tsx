import { useEffect, useRef, useState } from 'react'
import { useSiteImage } from '../hooks/useSiteImages'

type Slide = {
  image: string
  title: string
  subtitle: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  alt: string
}

function OverlapImages({ index, slides, onClickImage }: { index: number; slides: Slide[]; onClickImage?: (i: number) => void }) {
  if (!slides || slides.length === 0) return null
  return (
    <div className="relative w-full max-w-2xl aspect-video min-h-[440px]">
      {slides.map((slide, i) => {
        const pos = (i - index + slides.length) % slides.length
        const base =
          pos === 0
            ? 'z-30 left-[68%] top-[35%] -translate-x-1/2 -translate-y-1/2 w-[78%] h-[78%]'
            : pos === 1
            ? 'z-20 left-[-15%] top-[25%] -translate-y-[70%] w-[58%] h-[58%]'
            : 'z-20 left-[-15%] top-[75%] -translate-y-1/2 w-[58%] h-[58%]'
        const anim = pos === 0 ? 'scale-100 opacity-100' : 'scale-95 opacity-95'
        return (
          <img
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
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

  const slidesAll: Slide[] = []
  if (hero1?.image_path) slidesAll.push({ image: hero1.image_path, title: 'Keten  Pnömatik', subtitle: 'Endüstriyel pnömatik çözümler ve ekipmanlar', ctaPrimary: { label: 'Ürünleri Keşfet', href: '/kategoriler' }, ctaSecondary: { label: 'Demo Talep Et', href: '/demo-talebi' }, alt: hero1?.alt_text || 'Keten Pnömatik Ana Görsel' })
  if (hero2?.image_path) slidesAll.push({ image: hero2.image_path, title: 'Endüstriyel Seri', subtitle: 'Ağır hizmet için yüksek dayanım ve verimlilik', ctaPrimary: { label: 'Endüstriyel Seriye Git', href: '/kategoriler/endustriyel' }, ctaSecondary: { label: 'Teknik Servis', href: '/teknik-servis' }, alt: hero2?.alt_text || 'Endüstriyel Seri' })
  if (hero3?.image_path) slidesAll.push({ image: hero3.image_path, title: 'Profesyonel Seri', subtitle: 'Usta kullanıcılar için hafif ve güçlü çözümler', ctaPrimary: { label: 'Profesyonel Seriye Git', href: '/kategoriler/profesyonel' }, ctaSecondary: { label: 'Demo Talep Et', href: '/demo-taledi' }, alt: hero3?.alt_text || 'Profesyonel Seri' })

  const slides = slidesAll

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const textRef = useRef<HTMLDivElement | null>(null)

  // Mobile slider state
  const [mobileIndex, setMobileIndex] = useState(0)
  const mobileTouchStart = useRef<number | null>(null)

  useEffect(() => {
    if (paused || slides.length === 0) return
    const id = setInterval(() => setMobileIndex((i) => (i + 1) % slides.length), 4000)
    return () => clearInterval(id)
  }, [slides.length, paused])

  useEffect(() => {
    if (paused || slides.length === 0) return
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 3000)
    return () => clearInterval(id)
  }, [slides.length, paused])

  useEffect(() => { if (index >= slides.length) setIndex(0) }, [slides.length])
  useEffect(() => { if (mobileIndex >= slides.length) setMobileIndex(0) }, [slides.length])

  function handleImageClick(i: number) {
    if (i === index) { setPaused(p => !p); return }
    setIndex(i); setPaused(true); textRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function MobileSlider({ slides }: { slides: Slide[] }) {
    if (!slides || slides.length === 0) return null

    function prev() { setMobileIndex((i) => (i - 1 + slides.length) % slides.length); setPaused(true) }
    function next() { setMobileIndex((i) => (i + 1) % slides.length); setPaused(true) }

    function onTouchStart(e: React.TouchEvent) { mobileTouchStart.current = e.touches[0].clientX }
    function onTouchEnd(e: React.TouchEvent) {
      if (mobileTouchStart.current == null) return
      const dx = e.changedTouches[0].clientX - mobileTouchStart.current
      mobileTouchStart.current = null
      if (Math.abs(dx) < 40) return
      if (dx > 0) prev(); else next()
    }

    return (
      <div className="w-full relative block lg:hidden">
        <div className="w-full h-56 sm:h-72 md:h-96 bg-black/5 overflow-hidden rounded-box" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {slides.map((s, i) => (
            <img key={s.image} src={s.image} alt={s.alt} className={`w-full h-56 sm:h-72 md:h-96 object-cover transition-transform duration-500 ${i === mobileIndex ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute inset-0'}`} style={{ display: i === mobileIndex ? 'block' : 'none' }} />
          ))}
        </div>

        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <button onClick={prev} className="btn btn-circle btn-sm bg-white/10 border-none text-white">◀</button>
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <button onClick={next} className="btn btn-circle btn-sm bg-white/10 border-none text-white">▶</button>
        </div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => { setMobileIndex(i); setPaused(true) }} className={`w-2 h-2 rounded-full ${i === mobileIndex ? 'bg-white' : 'bg-white/40'}`} />
          ))}
        </div>

        <div className="p-4">
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10 shadow-2xl text-white">
            <h2 className="text-xl font-bold">{slides[mobileIndex].title}</h2>
            <p className="text-sm mt-2">{slides[mobileIndex].subtitle}</p>
            <div className="mt-3 flex gap-2">
              <a className="btn btn-primary btn-sm" href={slides[mobileIndex].ctaPrimary.href}>{slides[mobileIndex].ctaPrimary.label}</a>
              <a className="btn btn-outline btn-sm" href={slides[mobileIndex].ctaSecondary.href}>{slides[mobileIndex].ctaSecondary.label}</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
  <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="relative hero py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hero-content flex-col lg:flex-row items-center justify-between gap-12 relative">
            <div className="shrink-0 hidden lg:block">
              <OverlapImages index={index} slides={slides} onClickImage={handleImageClick} />
            </div>
            <div className="block lg:hidden">
              <MobileSlider slides={slides} />
            </div>
            <div ref={textRef} className="hidden lg:block max-w-xl md:pl-6 lg:pl-10 text-right relative">
              {/* 28. yıl batch görseli */}
              <img 
                src="/28.yil.png" 
                alt="28. Yıl" 
                className="absolute -top-8 -right-8 w-28 h-28 object-contain drop-shadow-xl select-none pointer-events-none z-20 hidden lg:block"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.18))' }}
                draggable="false"
              />
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl">
                {slides.length > 0 && (
                  <>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight transition-all duration-500 ease-out transform-gpu text-white">{slides[index].title}</h1>
                    <p className="py-6 text-lg text-gray-200">{slides[index].subtitle}</p>
                    <div className="flex flex-wrap gap-3 justify-end">
                      <a className="btn btn-primary text-white shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105" href={slides[index].ctaPrimary.href}>{slides[index].ctaPrimary.label}</a>
                      <a className="btn btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white transition-all duration-300" href={slides[index].ctaSecondary.href}>{slides[index].ctaSecondary.label}</a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


