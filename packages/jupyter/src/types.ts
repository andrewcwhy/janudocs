export interface Notebook {
    cells: Array<{
        cell_type: 'markdown' | 'code'
        source: string | string[]
        execution_count?: number
        outputs?: Array<{
            output_type: string
            text?: string | string[]
            name?: string
            data?: Record<string, any>
        }>
    }>
    metadata: Record<string, any>
    nbformat: number
    nbformat_minor: number
}
