import React, { useState, useEffect } from 'react'

export default function BlogManagement() {
  const [title, setTitle] = useState('')
  const [paragraph1, setParagraph1] = useState('')
  const [paragraph2, setParagraph2] = useState('')
  const [paragraph3, setParagraph3] = useState('')
  const [author, setAuthor] = useState('')
  const [publishedDate, setPublishedDate] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDesc, setMetaDesc] = useState('')
  const [metaKeywords, setMetaKeywords] = useState('')
  const [schemaDesc, setSchemaDesc] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [blogs, setBlogs] = useState<any[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => { loadList() }, [])

  function loadList() {
    fetch('/php/api/blogs.php')
      .then(r => r.json())
      .then(data => setBlogs(data.blogs || []))
      .catch(() => setStatus('Liste alınamadı'))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('Gönderiliyor...')
    const fd = new FormData()
    if (editingId) fd.append('id', String(editingId))
    fd.append('title', title)
    fd.append('paragraph1', paragraph1)
    fd.append('paragraph2', paragraph2)
    fd.append('paragraph3', paragraph3)
    fd.append('author', author)
    fd.append('published_date', publishedDate)
    fd.append('meta_title', metaTitle)
    fd.append('meta_desc', metaDesc)
    fd.append('meta_keywords', metaKeywords)
    fd.append('schema_desc', schemaDesc)
    if (imageFile) fd.append('image', imageFile)

    try {
      const res = await fetch('/php/api/blogs_save.php', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus('Kaydedildi')
        setEditingId(null)
        // clear form
        setTitle('')
        setParagraph1('')
        setParagraph2('')
        setParagraph3('')
        setAuthor('')
        setPublishedDate('')
        setMetaTitle('')
        setMetaDesc('')
        setMetaKeywords('')
        setSchemaDesc('')
        setImageFile(null)
        loadList()
      } else {
        setStatus('Kaydetme hatası: ' + (data.message || JSON.stringify(data)))
      }
    } catch (e) {
      console.error(e)
      setStatus('Sunucu hatası')
    }
  }

  function editItem(b: any) {
    setEditingId(b.id)
    setTitle(b.title || '')
    setParagraph1(b.paragraph1 || '')
    setParagraph2(b.paragraph2 || '')
    setParagraph3(b.paragraph3 || '')
    setAuthor(b.author || '')
    setPublishedDate(b.published_date ? b.published_date.split(' ')[0] : '')
    setMetaTitle(b.meta_title || '')
    setMetaDesc(b.meta_desc || '')
    setMetaKeywords(b.meta_keywords || '')
    setSchemaDesc(b.schema_desc || '')
    setImageFile(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function deleteItem(id: number) {
    if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return
    setStatus('Siliniyor...')
    try {
      const fd = new FormData(); fd.append('id', String(id));
      const res = await fetch('/php/api/blogs_delete.php', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus('Silindi')
        loadList()
      } else {
        setStatus('Silme hatası')
      }
    } catch (e) {
      console.error(e)
      setStatus('Sunucu hatası')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blog Yönetimi</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
        <div>
          <label className="label">Başlık</label>
          <input className="input input-bordered w-full" value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div>
          <label className="label">Paragraf 1</label>
          <textarea className="textarea textarea-bordered w-full" value={paragraph1} onChange={e => setParagraph1(e.target.value)} />
        </div>

        <div>
          <label className="label">Paragraf 2</label>
          <textarea className="textarea textarea-bordered w-full" value={paragraph2} onChange={e => setParagraph2(e.target.value)} />
        </div>

        <div>
          <label className="label">Paragraf 3</label>
          <textarea className="textarea textarea-bordered w-full" value={paragraph3} onChange={e => setParagraph3(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Yazar</label>
            <input className="input input-bordered w-full" value={author} onChange={e => setAuthor(e.target.value)} />
          </div>
          <div>
            <label className="label">Yayın Tarihi</label>
            <input type="date" className="input input-bordered w-full" value={publishedDate} onChange={e => setPublishedDate(e.target.value)} />
          </div>
        </div>

        <div>
          <label className="label">Görsel</label>
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)} />
        </div>

        <hr />

        <h2 className="text-lg font-semibold">SEO Alanları (sadece kaydedilecek)</h2>
        <div>
          <label className="label">Meta Title</label>
          <input className="input input-bordered w-full" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} />
        </div>
        <div>
          <label className="label">Meta Description</label>
          <textarea className="textarea textarea-bordered w-full" value={metaDesc} onChange={e => setMetaDesc(e.target.value)} />
        </div>
        <div>
          <label className="label">Meta Keywords</label>
          <input className="input input-bordered w-full" value={metaKeywords} onChange={e => setMetaKeywords(e.target.value)} />
        </div>
        <div>
          <label className="label">Schema Description</label>
          <textarea className="textarea textarea-bordered w-full" value={schemaDesc} onChange={e => setSchemaDesc(e.target.value)} />
        </div>

        <div>
          <button className="btn btn-primary" type="submit">Kaydet</button>
          <span className="ml-4">{status}</span>
        </div>
      </form>

      <hr className="my-8" />
      <h2 className="text-xl font-semibold mb-4">Mevcut Blog Yazıları</h2>
      <div className="space-y-4">
        {blogs.length === 0 && <div>Henüz yazı yok.</div>}
        {blogs.map(b => (
          <div key={b.id} className="p-4 bg-base-100 rounded-lg shadow-sm flex items-center justify-between">
            <div>
              <div className="font-semibold">{b.title}</div>
              <div className="text-sm text-gray-500">{b.published_date || b.created_at} • {b.author}</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-ghost" onClick={() => editItem(b)}>Düzenle</button>
              <button className="btn btn-error btn-outline" onClick={() => deleteItem(b.id)}>Sil</button>
              <a className="btn btn-primary btn-sm" href={`/blog/${b.slug || b.id}`} target="_blank" rel="noreferrer">Göster</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
