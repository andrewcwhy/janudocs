import { defineConfig } from '@janudocs/core'

export default defineConfig({
    title: 'Janudocs',
    url: 'https://janudocs.com',
    navbar: {
        title: 'Janudocs',
    }
    sidebar: {
        position: 'left',
        collapsible: true,
        categories: {
            collapsible: true,
            initialState: 'expanded',
            descriptions: {
                enabled: false,
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
})
