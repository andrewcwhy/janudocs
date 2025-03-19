import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function DocsViewer() {
    const { category, doc } = useParams()
    const [content, setContent] = useState('')

    useEffect(() => {
        fetch(`/docs/${category}/${doc}.md`)
            .then((res) => res.text())
            .then(setContent)
    }, [category, doc])

    return (
        <div>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
    )
}
