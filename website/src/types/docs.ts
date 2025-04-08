export interface Category {
    label: string
    description: string
    path: string
    files: string[]
    count: number
    position?: number
}

export interface LooseFiles {
    files: string[]
    count: number
}
