import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { buildBlogSEO, applySEOToHead } from '../utils/blog_seo'

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = React.useState<any | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!slug) return
    fetch(`/php/api/blogs_find.php?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.blog) setPost(data.blog)
        else setError('Yazı bulunamadı')
      })
  .catch(() => setError('Sunucu hatası'))
  }, [slug])

  // Apply blog-specific SEO when post is loaded
  React.useEffect(() => {
    if (!post) return
    try {
      const seo = buildBlogSEO(post)
      applySEOToHead(seo)
    } catch (e) {
      // fail silently
      console.error('Error applying blog SEO', e)
    }
  }, [post])

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{error}</h1>
          <Link to="/blog" className="btn btn-primary">Blog'a Dön</Link>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">Yükleniyor...</div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-sm breadcrumbs mb-6">
          <ul>
            <li><Link to="/">Ana Sayfa</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li>{post.title}</li>
          </ul>
        </div>

        <div className="mb-8">
          {
            (() => {
              const imageSrc = post.image
                ? post.image.startsWith('http')
                  ? post.image
                  : `${window.location.origin}${post.image}`
                : '/keten_banner.jpg'
              return <img src={imageSrc} alt={post.title} className="w-full h-96 object-cover rounded-lg shadow-lg" />
            })()
          }
        </div>

        <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
          {post.category && <span className="badge badge-primary">{post.category}</span>}
          <span>•</span>
          <span>{post.published_date || post.created_at}</span>
          <span>•</span>
          <span>Yazar: {post.author}</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

        {(() => {
          const renderParagraph = (content?: string) => {
            if (!content) return null
            const looksLikeHtml = /<[^>]+>/.test(content)
            if (looksLikeHtml) {
              return <div className="prose prose-lg max-w-none mb-6" dangerouslySetInnerHTML={{ __html: content }} />
            }
            // Plain text: preserve line breaks and spaces while allowing wrapping
            return (
              <div
                className="prose prose-lg max-w-none mb-6"
                style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}
              >
                {content}
              </div>
            )
          }

          return (
            <>
              {renderParagraph(post.paragraph1)}
              {renderParagraph(post.paragraph2)}
              {renderParagraph(post.paragraph3)}
            </>
          )
        })()}

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link to="/blog" className="btn btn-outline">
            ← Blog'a Dön
          </Link>
        </div>
      </article>
    </div>
  )
}
