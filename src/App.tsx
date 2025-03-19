import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DocsViewer from './components/DocsViewer'
import Home from './pages/Home'
import Contact from '@/pages/Contact'
import Layout from './components/Layout'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Wrap all pages with Layout */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="contact" element={<Contact />} />
                    <Route
                        path="docs/:category/:doc"
                        element={<DocsViewer />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
