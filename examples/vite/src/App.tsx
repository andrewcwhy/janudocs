import { Routes, Route } from 'react-router'
import Landing from '@/pages/Landing'
import NotFound from '@/pages/NotFound'

export default function App() {
    return (
        <Routes>
                <Route index element={<Landing />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}
