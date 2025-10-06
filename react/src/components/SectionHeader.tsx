export default function SectionHeader({ title, subtitle, dark }: { title: string; subtitle?: string; dark?: boolean }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-center">
        <h2 className={`text-3xl md:text-4xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
  {subtitle && <p className={`mt-2 text-base md:text-lg ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{subtitle}</p>}
      </div>
    </div>
  )
}
