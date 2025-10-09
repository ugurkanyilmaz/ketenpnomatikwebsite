import { useEffect, useState } from 'react'

type DemoRequest = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  company?: string
  products?: string
  notes?: string
  created_at?: string
}

export default function DemoRequestsAdmin() {
  const [items, setItems] = useState<DemoRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch('/php/api/demo_requests_list.php?limit=500')
      .then(r => r.json())
      .then(data => {
        if (data && data.items) setItems(data.items)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Demo Talepleri</h2>
      {loading ? (
        <div>Yükleniyor...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg p-4 shadow">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad Soyad</th>
                <th>E-posta</th>
                <th>Telefon</th>
                <th>Firma</th>
                <th>Ürünler</th>
                <th>Notlar</th>
                <th>Tarih</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.first_name} {item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.company}</td>
                  <td style={{maxWidth:300}}>
                    <pre className="whitespace-pre-wrap text-xs">{item.products}</pre>
                  </td>
                  <td style={{maxWidth:300}}>
                    <pre className="whitespace-pre-wrap text-xs">{item.notes}</pre>
                  </td>
                  <td>{item.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <div className="mt-2 text-sm text-muted">Kayıt yok</div>}
        </div>
      )}
    </div>
  )
}
