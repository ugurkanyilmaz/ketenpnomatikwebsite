const items = [
  { title: "Hızlı Kargo", desc: "Saat 16:00'a kadar aynı gün çıkış", icon: "truck" },
  { title: "Demo Fırsatı", desc: "Saha denemesi ve uygulamalı demo imkanı", icon: "play" },
  { title: "Güvenli Ödeme", desc: "3D Secure, SSL", icon: "credit" },
  { title: "Teknik Destek", desc: "Uzman ekibimiz yanınızda", icon: "support" },
];

function Icon({ name }: { name: string }) {
  const common = "w-6 h-6";
  if (name === "truck") return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={common}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5h13.5V6.75a.75.75 0 00-.75-.75H4.5a.75.75 0 00-.75.75v6.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 13.5h2.378c.621 0 1.146.44 1.236 1.053l.513 3.42a1.238 1.238 0 01-1.236 1.427H18" /><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>);
  if (name === "shield") return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={common}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75l8.25 3v6.75c0 4.556-3.694 8.25-8.25 8.25S3.75 18.056 3.75 13.5V6.75l8.25-3z" /></svg>);
  if (name === "credit") return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={common}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5M3.75 7.5A2.25 2.25 0 016 5.25h12a2.25 2.25 0 012.25 2.25v9A2.25 2.25 0 0118 18.75H6A2.25 2.25 0 013.75 16.5v-9z" /></svg>);
  if (name === "play") return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={common}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.75v12.5L18.75 12 5.25 5.75z" /></svg>);
  return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={common}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9.75a3.75 3.75 0 107.5 0 3.75 3.75 0 00-7.5 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
}

import SectionHeader from './SectionHeader'

export default function Benefits() {
  return (
    <>
      <SectionHeader title="Neden Keten Pnömatik?" subtitle="Hizmetlerimiz ve avantajlarımız" />
      <section className="bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((i) => (
              <div key={i.title} className="rounded-box border border-base-200 p-5 flex items-start gap-4">
                <div className="text-primary"><Icon name={i.icon} /></div>
                <div>
                  <div className="font-semibold">{i.title}</div>
                  <div className="text-sm text-base-content/70">{i.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


