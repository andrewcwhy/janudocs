import { useEffect, useState } from 'react'

interface FileExplorerProps {
    onSelect: (filePath: string) => void
}

interface FileNode {
    name: string
    path: string
    isDirectory: boolean
    children?: FileNode[]
}

export default function FileExplorer({ onSelect }: FileExplorerProps) {
    const [tree, setTree] = useState<FileNode[]>([])

    useEffect(() => {
        fetchTree('')
    }, [])

    const fetchTree = async (relativePath: string) => {
        const res = await fetch(
            `/api/files?path=${encodeURIComponent(relativePath)}`
        )
        const data = await res.json()
        const entries: FileNode[] = data.files.map((name: string) => ({
            name,
            path: relativePath ? `${relativePath}/${name}` : name,
            isDirectory: !name.endsWith('.md'),
        }))
        setTree((prev) => {
            if (!relativePath) return entries
            return updateNode(prev, relativePath, entries)
        })
    }

    const updateNode = (
        nodes: FileNode[],
        path: string,
        children: FileNode[]
    ): FileNode[] => {
        return nodes.map((node) => {
            if (node.path === path) {
                return { ...node, children }
            }
            if (node.isDirectory && node.children) {
                return {
                    ...node,
                    children: updateNode(node.children, path, children),
                }
            }
            return node
        })
    }

    const toggleFolder = async (node: FileNode) => {
        if (!node.children) {
            await fetchTree(node.path)
        } else {
            // Collapse
            setTree((prev) => collapseNode(prev, node.path))
        }
    }

    const collapseNode = (nodes: FileNode[], path: string): FileNode[] => {
        return nodes.map((node) => {
            if (node.path === path) {
                const { children, ...rest } = node
                return { ...rest } // remove children to collapse
            }
            if (node.children) {
                return { ...node, children: collapseNode(node.children, path) }
            }
            return node
        })
    }

    const renderTree = (nodes: FileNode[]) => (
        <ul className="pl-2">
            {nodes.map((node) => (
                <li key={node.path}>
                    {node.isDirectory ? (
                        <div
                            className="cursor-pointer font-medium text-blue-600 hover:underline"
                            onClick={() => toggleFolder(node)}
                        >
                            📁 {node.name}
                        </div>
                    ) : (
                        <div
                            className="cursor-pointer hover:underline"
                            onClick={() => onSelect(node.path)}
                        >
                            📝 {node.name}
                        </div>
                    )}
                    {node.children && renderTree(node.children)}
                </li>
            ))}
        </ul>
    )

    return (
        <div className="text-sm">
            <h2 className="font-bold mb-2">📂 Project Files</h2>
            {renderTree(tree)}
        </div>
    )
}
