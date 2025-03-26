import { Link } from 'react-router'

export default function Home() {
    return (
        <>
            <h1 className="text-3xl font-bold">Welcome to Janudocs</h1>
            <Link to="/docs/getting-started/installation">Get Started</Link>
            <p>Your documentation home.</p>
        </>
    )
}
