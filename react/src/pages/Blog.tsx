import React from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'

interface BlogPost {
  id: string
  title: string
  excerpt?: string
  slug?: string
  author?: string
  date?: string
  category?: string
  image?: string
}

export default function Blog() {
  const [posts, setPosts] = React.useState<BlogPost[] | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let mounted = true
  fetch('/php/api/blogs.php')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return
        if (Array.isArray(data)) {
          setPosts(data)
        } else if (data && Array.isArray(data.blogs)) {
          setPosts(data.blogs)
        } else {
          setPosts([])
        }
      })
      .catch((e) => {
        console.error(e)
        setError('Blog verileri alınamadı')
      })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <SectionHeader title="Blog" subtitle="Havalı El Aletleri hakkında güncel bilgiler ve ipuçları" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {(posts || []).map((post) => {
            const imageSrc = post.image
              ? post.image.startsWith('http')
                ? post.image
                : `${window.location.origin}${post.image}`
              : '/keten_banner.jpg'

            return (
              <article key={post.id} className="card bg-white shadow-md hover:shadow-xl transition-shadow">
                <figure>
                  <img src={imageSrc} alt={post.title} className="w-full h-56 object-cover" />
                </figure>
                <div className="card-body">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    {post.category && <span className="badge badge-primary badge-sm">{post.category}</span>}
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h2 className="card-title text-xl mb-3">{post.title}</h2>
                  <p className="text-gray-600 mb-4" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Yazar: {post.author}</span>
                    <Link to={`/blog/${post.slug || post.id}`} className="btn btn-primary btn-sm">Devamını Oku</Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
