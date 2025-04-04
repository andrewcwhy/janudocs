import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { MDXProvider } from '@mdx-js/react'

// Tailwind-styled components for both MDX and Markdown
const components = {
  h1: (props) => <h1 className="text-4xl font-bold mb-4" {...props} />,
  h2: (props) => <h2 className="text-3xl font-semibold mt-3 mb-3" {...props} />,
  h3: (props) => <h3 className="text-2xl font-semibold mt-3 mb-3" {...props} />,
  p: (props) => <p className="mb-4 leading-relaxed text-gray-800" {...props} />,
  ul: (props) => <ul className="list-disc list-inside mb-4" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside mb-4" {...props} />,
  li: (props) => <li className="mb-2" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4" {...props} />
  ),
  code: (props) => {
    const { className, children, ...rest } = props
    const isInline = !className

    return isInline ? (
      <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono" {...rest}>
        {children}
      </code>
    ) : (
      <pre className="bg-gray-900 text-white rounded p-4 overflow-x-auto mb-4">
        <code className={`font-mono text-sm ${className ?? ''}`} {...rest}>
          {children}
        </code>
      </pre>
    )
  },
  table: (props) => <table className="table-auto w-full border mb-4" {...props} />,
  th: (props) => <th className="border p-2 bg-gray-200 text-left" {...props} />,
  td: (props) => <td className="border p-2" {...props} />,
  a: (props) => <a className="text-blue-600 underline" {...props} />,
}

export default function DocsViewer() {
  const { category, doc } = useParams()
  const [content, setContent] = useState<{ type: 'mdx' | 'md'; component: any } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadDocument = async () => {
      setIsLoading(true)
      setError(null)
      setContent(null)

      if (!doc) {
        setError('No document specified')
        setIsLoading(false)
        return
      }

      const basePath = category ? `/docs/${category}/${doc}` : `/docs/${doc}`
      const urls = [`${basePath}.mdx`, `${basePath}.md`]

      // Try both extensions in parallel
      const promises = urls.map(async (url) => {
        try {
          if (url.endsWith('.mdx')) {
            const module = await import(/* @vite-ignore */ url)
            return { type: 'mdx' as const, component: module.default }
          } else {
            const response = await fetch(url)
            if (!response.ok) throw new Error('Not found')
            const text = await response.text()
            return { type: 'md' as const, component: text }
          }
        } catch {
          return null
        }
      })

      const results = await Promise.all(promises)
      const successfulLoad = results.find(result => result !== null)

      if (successfulLoad) {
        setContent(successfulLoad)
      } else {
        setError('Document not found. Please check the URL.')
      }

      setIsLoading(false)
    }

    loadDocument()
  }, [category, doc])

  if (isLoading) {
    return <div className="p-4">Loading document...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>
  }

  if (!content) {
    return <div className="p-4">No content to display</div>
  }

  return (
    <div className="p-4">
      {content.type === 'mdx' ? (
        <MDXProvider components={components}>
          <content.component />
        </MDXProvider>
      ) : (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {content.component}
        </ReactMarkdown>
      )}
    </div>
  )
}