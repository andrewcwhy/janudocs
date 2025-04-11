import { Routes, Route } from 'react-router'
import About from '@/pages/About'
import Landing from '@/pages/Landing'
import BaseLayout from '@/components/Layout'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'
import CategoryTOC from '@/pages/CategoryTOC'

// Docs components
import DocsLayout from '@/components/docs/Layout'
import DocsRenderer from '@/components/docs/Renderer'

export default function App() {
    return (
        <Routes>
            <Route element={<BaseLayout />}>
                <Route index element={<Landing />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />

                <Route path="docs" element={<DocsLayout />}>
                    {/* Route for categorized ToC */}
                    <Route path=":category" element={<CategoryTOC />} />
                    {/* Route for categorized files */}
                    <Route path=":category/:doc" element={<DocsRenderer />} />
                    {/* Route for loose (root-level) files */}
                    <Route path=":doc" element={<DocsRenderer />} />
                </Route>
            </Route>
        </Routes>
    )
}
