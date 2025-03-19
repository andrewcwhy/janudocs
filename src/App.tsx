import { Routes, Route } from 'react-router'
import DocsViewer from './components/DocsViewer'
import Home from '@/pages/Home'
import Layout from '@/components/Layout'

export default function App() {
    return (
        <Routes>
            {/* Wrap all pages with Layout */}
            <Route element={<Layout />}>
                {/* Use index for the home page */}
                <Route index element={<Home />} />
                <Route path="docs/:category/:doc" element={<DocsViewer />} />
            </Route>
        </Routes>
    )
}
