import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Distributorluk() {
  const brands = [
    { id: "kolver", name: "Kolver", img: "/kolver.jpg", desc: "Kolver hakkında açıklama buraya gelecek." },
    { id: "apac", name: "APAC", img: "/apac.jpg", desc: "APAC hakkında açıklama buraya gelecek." },
    { id: "hiyoki", name: "Hiyoki", img: "/hiyoki.jpg", desc: "Hiyoki hakkında açıklama buraya gelecek." },
  ]

  return (
    <div className="bg-base-100">
      {/* Hero - Modern split design with overlay */}
    <section className="relative w-full min-h-[300px] md:min-h-[500px] lg:min-h-[600px] bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="/dist.jpg"
            alt="Distribütörlük hero"
            className="w-full h-full object-cover opacity-30"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent" />
        </div>

        {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-semibold">Yetkili Distribütör</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Distribütörlüğünü Yaptığımız
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-2">
                  Markalar
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Yetkili olduğumuz markalar ve sunduğumuz çözümler ile endüstriyel ihtiyaçlarınıza profesyonel yanıtlar sunuyoruz.
              </p>
            </motion.div>

            {/* Buttons with enhanced design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              {brands.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className="btn btn-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 shadow-lg"
                  onClick={() => {
                    const el = document.getElementById(b.id)
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                >
                  {b.name}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-base-100 to-transparent" />
      </section>

      {/* Brands are provided by nested routes (Outlet) to avoid duplication */}

      {/* Nested content - no wrapper so sections can control their own backgrounds */}
      <Outlet />
    </div>
  )
}
