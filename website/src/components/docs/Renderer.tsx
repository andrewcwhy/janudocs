import { useEffect, useMemo, useState } from 'react'
import { useLocation } from '@tanstack/react-router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { MDXProvider } from '@mdx-js/react'
import { useManifest } from '@/hooks'

// Import available MD and MDX files statically
const mdFiles = import.meta.glob('/docs/**/*.md', {
    query: '?raw',
    import: 'default',
})
const mdxFiles = import.meta.glob('/docs/**/*.mdx')

const components = {
    h1: (props) => <h1 className="text-4xl font-bold mb-4" {...props} />,
    h2: (props) => (
        <h2 className="text-3xl font-semibold mt-3 mb-3" {...props} />
    ),
    h3: (props) => (
        <h3 className="text-2xl font-semibold mt-3 mb-3" {...props} />
    ),
    p: (props) => (
        <p className="mb-4 leading-relaxed text-gray-800" {...props} />
    ),
    ul: (props) => <ul className="list-disc list-inside mb-4" {...props} />,
    ol: (props) => <ol className="list-decimal list-inside mb-4" {...props} />,
    li: (props) => <li className="mb-2" {...props} />,
    blockquote: (props) => (
        <blockquote
            className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4"
            {...props}
        />
    ),
    code: ({ className, children, ...rest }) =>
        !className ? (
            <code
                className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono"
                {...rest}
            >
                {children}
            </code>
        ) : (
            <pre className="bg-gray-900 text-white rounded p-4 overflow-x-auto mb-4">
                <code className={`font-mono text-sm ${className}`} {...rest}>
                    {children}
                </code>
            </pre>
        ),
    table: (props) => (
        <table className="table-auto w-full border mb-4" {...props} />
    ),
    th: (props) => (
        <th className="border p-2 bg-gray-200 text-left" {...props} />
    ),
    td: (props) => <td className="border p-2" {...props} />,
    a: (props) => <a className="text-blue-600 underline" {...props} />,
}

export default function Renderer() {
    const { pathname } = useLocation()
    const { manifest, loading: manifestLoading } = useManifest()

    const [content, setContent] = useState<null | {
        type: 'mdx' | 'md'
        component: any
    }>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const normalizedPath = pathname.replace(/^\/docs/, '') // e.g. /cli/scripts → /cli/scripts
    const mdxKey = `/docs${normalizedPath}.mdx`
    const mdKey = `/docs${normalizedPath}.md`

    useEffect(() => {
        const load = async () => {
            setError(null)
            setContent(null)
            setIsLoading(true)

            try {
                if (mdxKey in mdxFiles) {
                    const mod = await mdxFiles[mdxKey]() // Dynamic import
                    setContent({ type: 'mdx', component: mod.default })
                } else if (mdKey in mdFiles) {
                    const text = await mdFiles[mdKey]() // Raw content
                    setContent({ type: 'md', component: text })
                } else {
                    throw new Error('Document not found')
                }
            } catch (err) {
                console.error(err)
                setError('Document not found or failed to load')
            }

            setIsLoading(false)
        }

        load()
    }, [mdxKey, mdKey])

    if (manifestLoading || isLoading)
        return <div className="p-4">Loading...</div>
    if (error) return <div className="p-4 text-red-500">{error}</div>
    if (!content) return <div className="p-4">No content available</div>

    return (
        <div className="p-4">
            {content.type === 'mdx' ? (
                <MDXProvider components={components}>
                    <content.component />
                </MDXProvider>
            ) : (
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={components}
                >
                    {content.component}
                </ReactMarkdown>
            )}
        </div>
    )
}
