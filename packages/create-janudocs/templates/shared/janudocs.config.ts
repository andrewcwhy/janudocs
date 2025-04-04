import { defineConfig } from '@janudocs/core'

export default defineConfig({
    sidebar: {
        categories: {
            togglable: true,
            viewState: 'expanded',
            descriptions: {
                show: true,
                textStyle: { textTransform: 'capitalize' },
            },
            textStyle: { textTransform: 'capitalize' },
        },
        items: {
            highlightActive: true,
            textStyle: { textTransform: 'capitalize' },
        },
    },
})
