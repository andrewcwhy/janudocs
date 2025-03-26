import { Routes, Route } from 'react-router'
import DocsViewer from '@/components/DocsViewer'
import Home from '@/pages/Home'
import Layout from '@/components/Layout'
import Contact from '@/pages/Contact'
import DocsLayout from '@/components/DocsLayout'

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="contact" element={<Contact />} />

                <Route path="docs" element={<DocsLayout />}>
                    {/* Route for loose (root-level) files */}
                    <Route path=":doc" element={<DocsViewer />} />
                    {/* Route for categorized files */}
                    <Route path=":category/:doc" element={<DocsViewer />} />
                </Route>
            </Route>
        </Routes>
    )
}
