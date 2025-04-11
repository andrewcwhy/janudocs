export interface CategoryProps {
    label: string
    description?: string
    path: string
    files: string[]
    count: number
    position?: number
}

export interface Doc {
    id: string
    label: string
}

export interface DocLink {
    label: string
    href: string
    description?: string
}
