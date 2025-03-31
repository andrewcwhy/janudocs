export default function Toolbar({
    file,
    content,
    setContent,
}: {
    file: string
    content: string
    setContent: (s: string) => void
}) {
    const save = async () => {
        await fetch(`/api/files?path=${encodeURIComponent(file)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        })
        alert('✅ File saved!')
    }

    const del = async () => {
        if (confirm('Are you sure you want to delete this file?')) {
            await fetch(`/api/files?path=${encodeURIComponent(file)}`, {
                method: 'DELETE',
            })
            location.reload()
        }
    }

    const rename = async () => {
        const newName = prompt('Enter new name:')
        if (!newName) return

        const newPath = file.split('/').slice(0, -1).concat(newName).join('/')
        await fetch(`/api/files?path=${encodeURIComponent(file)}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPath }),
        })
        location.reload()
    }

    const create = async () => {
        const name = prompt('Enter name for new .md file:')
        if (!name?.endsWith('.md')) return alert('Must end with .md')

        await fetch(`/api/files?path=${encodeURIComponent(name)}`, {
            method: 'PUT',
        })
        location.reload()
    }

    return (
        <div className="flex gap-2 mb-2">
            <button
                onClick={save}
                className="bg-blue-600 text-white px-3 py-1 rounded"
            >
                Save
            </button>
            <button
                onClick={rename}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
                Rename
            </button>
            <button
                onClick={create}
                className="bg-green-600 text-white px-3 py-1 rounded"
            >
                New File
            </button>
            <button
                onClick={del}
                className="bg-red-600 text-white px-3 py-1 rounded"
            >
                Delete
            </button>
        </div>
    )
}
