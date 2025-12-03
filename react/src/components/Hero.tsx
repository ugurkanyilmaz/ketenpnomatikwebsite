import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSiteImage } from '../hooks/useSiteImages'

type Slide = {
  image: string
  title: string
  subtitle: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  alt: string
}

export default function Hero() {
  // Fetch hero images from API
  const { image: hero1 } = useSiteImage('home_hero_1')
  const { image: hero2 } = useSiteImage('home_hero_2')
  const { image: hero3 } = useSiteImage('home_hero_3')
  const { image: hero4 } = useSiteImage('home_hero_4')

  const slidesAll: Slide[] = []
  if (hero1?.image_path) slidesAll.push({ image: hero1.image_path, title: 'Keten Pnömatik', subtitle: 'Endüstriyel pnömatik çözümler ve ekipmanlar', ctaPrimary: { label: 'Ürünleri Keşfet', href: '/kategoriler' }, ctaSecondary: { label: 'Demo Talep Et', href: '/demo-talebi' }, alt: hero1?.alt_text || 'Keten Pnömatik Ana Görsel' })
  if (hero2?.image_path) slidesAll.push({ image: hero2.image_path, title: 'Endüstriyel Seri', subtitle: 'Ağır hizmet için yüksek dayanım ve verimlilik', ctaPrimary: { label: 'Endüstriyel Seriye Git', href: '/kategoriler/endustriyel' }, ctaSecondary: { label: 'Teknik Servis', href: '/teknik-servis' }, alt: hero2?.alt_text || 'Endüstriyel Seri' })
  if (hero3?.image_path) slidesAll.push({ image: hero3.image_path, title: 'Profesyonel Seri', subtitle: 'Usta kullanıcılar için hafif ve güçlü çözümler', ctaPrimary: { label: 'Profesyonel Seriye Git', href: '/kategoriler/profesyonel' }, ctaSecondary: { label: 'Demo Talep Et', href: '/demo-talebi' }, alt: hero3?.alt_text || 'Profesyonel Seri' })
  if (hero4?.image_path) slidesAll.push({ image: hero4.image_path, title: 'Manipülatörler', subtitle: 'Ergonomik taşıma ve kaldırma çözümleri', ctaPrimary: { label: 'Manipülatörleri Keşfet', href: '/kategoriler/manipulatorler' }, ctaSecondary: { label: 'Demo Talep Et', href: '/demo-talebi' }, alt: hero4?.alt_text || 'Manipülatörler' })

  const slides = slidesAll

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  // Auto-advance slides
  useEffect(() => {
    if (paused || slides.length === 0) return
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [slides.length, paused])

  useEffect(() => { if (index >= slides.length) setIndex(0) }, [slides.length])

  if (!slides || slides.length === 0) {
    return (
      <section className="relative w-full min-h-[600px] bg-gradient-to-br from-[#e0e0e0] to-[#d0d0d0] flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg">Hero görselleri yükleniyor...</p>
        </div>
      </section>
    )
  }

  return (
    <section
      className="relative w-full overflow-hidden"
    >
      {/* Desktop: Full-screen Hero with Ken Burns */}
      <div className="hidden md:block relative w-full" style={{
        minHeight: 'max(600px, calc(100dvh - var(--header-height, 72px)))',
        height: 'calc(100dvh - var(--header-height, 72px))'
      }}>
        {/* Background Images with Ken Burns effect */}
        <div className="absolute inset-0">
          {slides.map((slide, i) => (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className={`w-full h-full object-cover ${i === index ? 'animate-ken-burns' : ''
                  }`}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative h-full flex items-center" style={{ minHeight: '600px' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-8">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in-up">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-bold text-white">28+ Yıllık Tecrübe</span>
              </div>

              {/* Main Title - Animated */}
              <h1
                key={`title-${index}`}
                className="font-black text-white mb-6 leading-tight tracking-tight drop-shadow-2xl animate-slide-up"
                style={{ fontSize: 'clamp(1.8rem, 4.4vw, 4.5rem)' }}
              >
                {slides[index].title}
              </h1>

              {/* Subtitle - Animated */}
              <p
                key={`subtitle-${index}`}
                className="text-white/90 mb-10 leading-relaxed drop-shadow-lg font-light animate-slide-up"
                style={{ fontSize: 'clamp(1rem, 1.8vw, 1.6rem)', animationDelay: '0.1s' }}
              >
                {slides[index].subtitle}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">10K+</div>
                  <div className="text-sm md:text-base text-white/80 font-medium">Stok Ürün</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">5000+</div>
                  <div className="text-sm md:text-base text-white/80 font-medium">Müşteri</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">24/7</div>
                  <div className="text-sm md:text-base text-white/80 font-medium">Destek</div>
                </div>
              </div>

              {/* CTA Buttons - Animated */}
              <div
                className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
                style={{ animationDelay: '0.3s' }}
              >
                <a
                  className="btn btn-primary btn-lg gap-3 shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300 group border-none text-base md:text-lg"
                  href={slides[index].ctaPrimary.href}
                >
                  {slides[index].ctaPrimary.label}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  className="btn btn-lg gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-base md:text-lg"
                  href={slides[index].ctaSecondary.href}
                >
                  {slides[index].ctaSecondary.label}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Navigation Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setIndex(i); setPaused(true); setTimeout(() => setPaused(false), 3000) }}
                className={`transition-all duration-500 rounded-full ${i === index
                  ? 'w-12 h-3 bg-white shadow-lg'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                  }`}
                aria-label={`Slayt ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
      </div>

      {/* Mobile: Compact Card-Style Hero */}
      <div className="md:hidden bg-gradient-to-br from-gray-900 to-gray-800 py-6">
        <div className="px-4 space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-bold text-white">28+ Yıllık Tecrübe</span>
          </div>

          {/* Image Card with proper aspect ratio and swipe support */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <motion.div
              className="relative aspect-[16/10]"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x

                if (swipe < -10000) {
                  // Swiped left - next slide
                  setIndex((i) => (i + 1) % slides.length)
                  setPaused(true)
                  setTimeout(() => setPaused(false), 3000)
                } else if (swipe > 10000) {
                  // Swiped right - previous slide
                  setIndex((i) => (i - 1 + slides.length) % slides.length)
                  setPaused(true)
                  setTimeout(() => setPaused(false), 3000)
                }
              }}
            >
              {slides.map((slide, i) => (
                <div
                  key={slide.image}
                  className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover object-center pointer-events-none"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
              {/* Subtle gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1
              key={`mobile-title-${index}`}
              className="text-3xl font-black text-white leading-tight"
            >
              {slides[index].title}
            </h1>

            <p
              key={`mobile-subtitle-${index}`}
              className="text-base text-white/90 leading-relaxed"
            >
              {slides[index].subtitle}
            </p>

            {/* Stats Pills - Compact for mobile */}
            <div className="flex gap-2 flex-wrap">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-lg font-black text-white">10K+</span>
                <span className="text-xs text-white/80 ml-1">Stok</span>
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-lg font-black text-white">5000+</span>
                <span className="text-xs text-white/80 ml-1">Müşteri</span>
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-lg font-black text-white">24/7</span>
                <span className="text-xs text-white/80 ml-1">Destek</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <a
                className="btn btn-primary btn-md gap-2 shadow-xl border-none"
                href={slides[index].ctaPrimary.href}
              >
                {slides[index].ctaPrimary.label}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                className="btn btn-md gap-2 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20"
                href={slides[index].ctaSecondary.href}
              >
                {slides[index].ctaSecondary.label}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
            </div>

            {/* Slide Navigation Dots */}
            {slides.length > 1 && (
              <div className="flex gap-2 justify-center pt-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setIndex(i); setPaused(true); setTimeout(() => setPaused(false), 3000) }}
                    className={`transition-all duration-500 rounded-full ${i === index
                      ? 'w-8 h-2 bg-primary shadow-lg'
                      : 'w-2 h-2 bg-white/40'
                      }`}
                    aria-label={`Slayt ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
