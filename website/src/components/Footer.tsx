import { Link } from '@tanstack/react-router'

import { useJanudocsContext } from '@/core/useJanudocsContext'

export default function Footer() {
    const { siteConfig } = useJanudocsContext()

    return (
        <footer className="bg-slate-950 border-t border-slate-800 text-sm text-gray-400 px-6 py-8">
            <div className="text-center mb-4">
                {siteConfig.componentsConfig.footer.copyright}
            </div>

            <ul className="flex justify-center gap-6 text-gray-500">
                <li>
                    <a
                        href="https://github.com/andrewcwhy/janudocs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#8C7853] transition"
                    >
                        GitHub
                    </a>
                </li>
                <li>
                    <Link
                        to="/privacy"
                        className="hover:text-[#8C7853] transition"
                    >
                        Privacy
                    </Link>
                </li>
                <li>
                    <Link
                        to="/terms"
                        className="hover:text-[#8C7853] transition"
                    >
                        Terms
                    </Link>
                </li>
            </ul>
        </footer>
    )
}
