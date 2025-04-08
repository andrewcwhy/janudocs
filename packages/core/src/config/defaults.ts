import { JanudocsConfig } from '@/types/config'

export const defaultConfig: JanudocsConfig = {
    sidebar: {
        position: 'left',
        collapsible: true,
        categories: {
            collapsible: true,
            initialState: 'expanded',
            descriptions: {
                enabled: true,
                textStyle: {
                    textTransform: 'capitalize',
                },
            },
            textStyle: {
                textTransform: 'capitalize',
            },
        },
        items: {
            highlightActive: true,
            textStyle: {
                textTransform: 'capitalize',
            },
        },
    },
}
