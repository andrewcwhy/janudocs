export default function Footer() {
    return (
        <footer className="w-full bg-white border-t border-gray-200 text-sm text-gray-600 py-6 mt-auto">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>
                    &copy; {new Date().getFullYear()} Janudocs. All rights
                    reserved.
                </p>

                <div className="flex gap-4">
                    <a
                        href="https://github.com/andrewcwhy/janudocs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    )
}
