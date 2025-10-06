type Props = {
  subject?: string
  body?: string
  subtitle?: string
}

export default function ContactCTAButton({ subject = 'İletişim - Keten Pnomatik', body = 'Merhaba, size web sitesi üzerinden ulaşmak istiyorum.', subtitle = 'Bilgi Al' }: Props) {
  const mailto = `mailto:info@ketenpnomatik.com.tr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <a
        href={mailto}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={subtitle}
        className="group inline-flex items-center gap-3 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-transform duration-150 transform hover:scale-102"
      >
        {/* left icon circle */}
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-4-.9L3 21l1.9-5.6A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5z" />
            <path d="M16.5 13.5c-.3.8-1 1.6-1.6 2.2-1 .9-2.8 1.8-4.1 1.6-.9-.1-2-.7-2.9-1.3-.8-.6-1.7-1.6-2.1-2.7-.4-1.1-.2-2.4.5-3.3.7-.9 1.8-1.3 2.9-1.1.4.1.8.2 1.1.5.3.3.5.7.8 1 .2.2.3.3.5.3.2 0 .3-.1.4-.3.3-.6.8-1.5 1.8-1.6.9-.1 1.7.2 2.2.7.6.6.9 1.5.8 2.4-.1.6-.4 1.2-.8 1.7z" />
          </svg>
        </div>

        <div className="flex flex-col leading-tight text-left">
          <span className="text-sm font-semibold leading-none">WhatsApp</span>
          <span className="text-xs leading-none">Bilgi Al</span>
        </div>
      </a>
    </div>
  )
}
