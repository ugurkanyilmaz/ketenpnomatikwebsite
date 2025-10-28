import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

type LogoItem = { src: string; alt: string; href?: string }

export default function DistributorSections() {
  const [logos, setLogos] = useState<LogoItem[] | null>(null)

  // Defaults: user placed logos directly in the project's `public/` root.
  // Put the logos you added (e.g. hawanox_logo.jpg, Delta_Regis_Logo.png, asa_logo.jpg)
  // into `react/public/` so they are served from `/<filename>` at runtime.
  const defaultLogos: LogoItem[] = [
    // prefer public-root copies first (user-confirmed filenames)
    { src: '/hawanox_logo.png', alt: 'Hawanox', href: '/hakkimizda/hawanox' },
    { src: '/Delta_Regis_Logo.png', alt: 'Delta Regis', href: '/hakkimizda/delta-regis' },
    { src: '/asa_logo.png', alt: 'ASA', href: '/hakkimizda/asa' },
    // fallbacks: older uploads placed under /uploads/site_images
    { src: '/kolver_logo.png', alt: 'Kolver', href: '/hakkimizda/kolver' },
    { src: '/apac_logo.png', alt: 'APAC', href: '/hakkimizda/apac' },
    { src: '/hiyoki_logo.png', alt: 'Hiyoki', href: '/hakkimizda/hiyoki' }
  ]

  useEffect(() => {
    // Optional manifest support: if you drop a JSON file at
    // /uploads/site_images/logos.json (array of { src, alt, href }), the component will use it.
    // This lets you add arbitrary brand logos without changing code.
    const manifestUrl = '/uploads/site_images/logos.json'

    fetch(manifestUrl)
      .then(res => {
        if (!res.ok) throw new Error('no-manifest')
        return res.json()
      })
      .then((data: any) => {
        if (Array.isArray(data)) {
          // sanitize entries
          const parsed: LogoItem[] = data
            .filter(Boolean)
            .map((it: any) => ({ src: String(it.src), alt: String(it.alt || ''), href: it.href ? String(it.href) : undefined }))
          if (parsed.length) {
            setLogos(parsed)
            return
          }
        }
        setLogos(defaultLogos)
      })
      .catch(() => {
        // no manifest -> use defaults
        setLogos(defaultLogos)
      })
  }, [])

  const items = logos ?? defaultLogos

  return (
    <section aria-label="Distribütörlük bölümü" className="py-12">
      <SectionHeader title="Distribütörlük" subtitle="Yetkili olduğumuz markalar" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 mt-8"
      >
        {/* layout: 3 columns × 2 rows on small+ screens, 2 columns on extra-small */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-center justify-items-center sm:grid-rows-2">
          {items.map((l) => (
            <a key={l.src} href={l.href ?? '#'} className="block p-4 hover:scale-105 transition-transform" aria-label={l.alt}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.src} alt={`${l.alt} logo`} className="max-h-28 object-contain mx-auto" loading="lazy" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
