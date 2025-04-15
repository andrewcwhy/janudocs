import { Link } from '@tanstack/react-router'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-950 text-center max-w-xl px-6 mx-auto text-slate-100">
            <h1 className="text-6xl font-extrabold text-amber-500 mb-4">404</h1>
            <p className="text-2xl font-semibold text-slate-200 mb-6">
                Janus looked both ways... but this page wasn’t found.
            </p>
        </div>
    )
}
