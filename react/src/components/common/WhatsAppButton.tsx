type Props = {
  message?: string
  subtitle?: string
}

export default function WhatsAppButton({ message = 'Merhaba', subtitle = 'WhatsApp' }: Props) {
  const encoded = encodeURIComponent(message)
  const href = `https://wa.me/?text=${encoded}`
  return (
    <div className="fixed right-6 bottom-6 z-50">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open WhatsApp chat: ${message}`}
        className="group relative flex items-center"
      >
        {/* Circular button */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-xl flex items-center justify-center transform transition-all duration-150 hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-4-.9L3 21l1.9-5.6A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5z" />
            <path d="M16.5 13.5c-.3.8-1 1.6-1.6 2.2-1 .9-2.8 1.8-4.1 1.6-.9-.1-2-.7-2.9-1.3-.8-.6-1.7-1.6-2.1-2.7-.4-1.1-.2-2.4.5-3.3.7-.9 1.8-1.3 2.9-1.1.4.1.8.2 1.1.5.3.3.5.7.8 1 .2.2.3.3.5.3.2 0 .3-.1.4-.3.3-.6.8-1.5 1.8-1.6.9-.1 1.7.2 2.2.7.6.6.9 1.5.8 2.4-.1.6-.4 1.2-.8 1.7z" />
          </svg>
        </div>

        {/* Label on larger screens */}
        <div className="hidden md:flex ml-3 items-center bg-white rounded-md px-3 py-2 shadow text-sm text-neutral-800 group-hover:shadow-md transition">
          <div className="font-medium">{subtitle}</div>
          <div className="text-xs text-neutral-600 ml-2 truncate max-w-[18rem]">{message}</div>
        </div>
      </a>
    </div>
  )
}
