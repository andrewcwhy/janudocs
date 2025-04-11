import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { MDXProvider } from '@mdx-js/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

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
    code: ({ className, children, ...rest }) => {
        const match = /language-(\w+)/.exec(className || '')
        const language = match?.[1]

        return language ? (
            <SyntaxHighlighter
                style={tomorrow}
                language={language}
                PreTag="div"
                customStyle={{ marginBottom: '1rem', borderRadius: '0.5rem' }}
                {...rest}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        ) : (
            <code
                className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono"
                {...rest}
            >
                {children}
            </code>
        )
    },
    table: (props) => (
        <table className="table-auto w-full border mb-4" {...props} />
    ),
    th: (props) => (
        <th className="border p-2 bg-gray-200 text-left" {...props} />
    ),
    td: (props) => <td className="border p-2" {...props} />,
    a: (props) => <a className="text-blue-600 underline" {...props} />,
}

type Content =
    | { type: 'md'; component: string }
    | { type: 'mdx'; component: React.ElementType }

export default function DocsRenderer() {
    const { category, doc } = useParams()
    const [content, setContent] = useState<Content | null>(null)
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

            const basePath = category
                ? `/docs/${category}/${doc}`
                : `/docs/${doc}`
            const urls = [`${basePath}.mdx`, `${basePath}.md`]

            try {
                const results = await Promise.allSettled(
                    urls.map(async (url) => {
                        if (url.endsWith('.mdx')) {
                            const module = await import(/* @vite-ignore */ url)
                            return {
                                type: 'mdx' as const,
                                component: module.default,
                            }
                        } else {
                            const res = await fetch(url)
                            if (!res.ok) throw new Error('Not found')
                            const text = await res.text()
                            return { type: 'md' as const, component: text }
                        }
                    })
                )

                const successful = results.find(
                    (r): r is PromiseFulfilledResult<Content> =>
                        r.status === 'fulfilled'
                )

                if (successful) {
                    setContent(successful.value)
                } else {
                    setError('Document not found. Please check the URL.')
                }
            } catch {
                setError('An error occurred while loading the document.')
            } finally {
                setIsLoading(false)
            }
        }

        loadDocument()
    }, [category, doc])

    if (isLoading) return <div className="p-4">Loading document...</div>
    if (error) return <div className="p-4 text-red-500">{error}</div>
    if (!content) return <div className="p-4">No content to display</div>

    return (
        <div className="p-4">
            {content.type === 'mdx' ? (
                <MDXProvider components={components}>
                    <content.component />
                </MDXProvider>
            ) : (
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={components}
                >
                    {content.component}
                </Markdown>
            )}
        </div>
    )
}
