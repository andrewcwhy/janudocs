import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function PreviewPane({ markdown }: { markdown: string }) {
    return <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
}
