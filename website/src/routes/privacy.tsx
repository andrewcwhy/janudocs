import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({
    component: Privacy,
    head: () => ({
        meta: [
            {
                title: 'Privacy Policy',
            },
            {
                name: 'description',
                content: 'Privacy Policy for Janudocs.',
            },
        ],
    }),
})

function Privacy() {
    return (
        <>
            <header>
                <h1>Privacy Policy</h1>
                <p></p>
            </header>
        </>
    )
}
