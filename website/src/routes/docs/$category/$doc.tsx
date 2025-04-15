import { createFileRoute } from '@tanstack/react-router'
import Renderer from '@/components/docs/Renderer'
import Error from '@/components/Error'

// This route is for the categorized documentation pages
export const Route = createFileRoute('/docs/$category/$doc')({
    component: CategorizedDoc,
    head: ({ params }) => ({
        meta: [
            {
                title: `${params.doc}`,
            },
            {
                name: 'description',
                content: `Janudocs documentation for ${params.category}/${params.doc}`,
            },
        ],
    }),
    loader: async ({ params }) => {
        return {
            category: params.category,
            doc: params.doc,
        }
    },
    errorComponent: () => {
        return <Error />
    },
})

function CategorizedDoc() {
    return <Renderer />
}
