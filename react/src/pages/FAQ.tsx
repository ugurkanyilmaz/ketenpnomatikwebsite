import { useState } from "react"
// Inline SVG will be used for chevron to avoid extra dependency

const faqs = [
  {
    question: "Servis süreci nasıl işliyor?",
    answer:
      "Ürünü bize gönderdikten sonra arıza tespiti yapılır; onayınız alınırsa onarım sürecine geçilir."
  },
  {
    question: "Yedek parça temini ne kadar sürer?",
    answer:
      "Orijinal yedek parçalar stok durumuna bağlı olarak değişir; ortalama yurt dışı termin süresi 2-4 haftadır."
  },
  {
    question: "Garanti kapsamında neler yapılır?",
    answer:
      "Ürünlerimiz Servisten Çıktıkları tarihten itibaren 6 ay bakım garantisi altındadır."
  },
  {
    question: "Onarım sonrası test yapılıyor mu?",
    answer:
      "Evet, her ürün onarım sonrası kalite kontrol testlerinden geçirilerek teslim edilir."
  },
  {
    question: "Ortalama onarım süresi ne kadar?",
    answer:
      "Servisimize gelen ürünler minimum 3 iş günü içerisinde kontrol sağlanarak parça teminine bağlı süre hesaplanır, ürün sahibi bilgilendirilir."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-10">❓ Sıkça Sorulan Sorular</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-100 shadow-md rounded-2xl p-5 border hover:shadow-lg transition"
          >
            <button
              className="flex justify-between items-center w-full text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-semibold text-lg">{faq.question}</span>
              <svg
                className={`w-5 h-5 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 8l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openIndex === index && (
              <p className="mt-3 text-neutral-600 leading-relaxed">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
