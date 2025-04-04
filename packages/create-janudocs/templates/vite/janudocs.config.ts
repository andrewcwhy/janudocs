import { defineConfig } from 'janudocs'

export default defineConfig({
    sidebar: {
        categories: {
            togglable: true,
            viewState: 'expanded',
            descriptions: {
                show: true,
                textStyle: { textTransform: 'capitalize' },
            },
            textStyle: { textTransform: 'uppercase' },
        },
        items: {
            highlightActive: true,
            textStyle: { textTransform: 'none' },
        },
    },
})
