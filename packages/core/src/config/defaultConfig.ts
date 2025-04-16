import { JanudocsConfig } from '@/types/config'

export const defaultConfig: JanudocsConfig = {
    title: 'Janudocs',
    url: 'https://janudocs.com',
    navbar: {
        title: 'Janudocs',
        items: {
            highlightActive: true,
            textStyle: {
                textTransform: 'capitalize',
            },
        },
    },
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
