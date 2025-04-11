import { useParams, Link } from 'react-router'
import { useDocsManifest } from '@/hooks'
import { removeFileExtension, formatFileName } from '@/utils'

export default function CategoryTOC() {
    const { category } = useParams()
    const { manifest } = useDocsManifest()

    const currentCategory = manifest.categories.find((c) => c.path === category)

    if (!currentCategory) {
        return <div className="p-4 text-red-500">Category not found.</div>
    }

    return (
        <article className="p-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold mb-6">
                    {currentCategory.label}
                </h1>
                {currentCategory.description && (
                    <p className="text-gray-600 mb-4">
                        {currentCategory.description}
                    </p>
                )}
            </header>
            <nav>
                <ul className="list-disc list-inside space-y-2">
                    {currentCategory.files.map((file) => {
                        const fileSlug = removeFileExtension(file)
                        const routePath = `/docs/${category}/${fileSlug}`
                        const displayName = formatFileName(file)

                        return (
                            <li key={file} className="">
                                <Link to={routePath}>
                                    <h2 className="truncate">{displayName}</h2>
                                    <p className="truncate"></p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </article>
    )
}
