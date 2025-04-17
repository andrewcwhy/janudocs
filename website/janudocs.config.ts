import { defineConfig } from '@/core/defineConfig'

export default defineConfig({
    title: 'Janudocs',
    url: 'https://janudocs.com',
    tagline: 'Janudocs for documentation.',

    componentsConfig: {
        navbar: {
            title: 'Janudocs',
            logo: {
                alt: 'Janudocs Logo',
                src: '',
            },
            items: {
                highlightActive: true,
                textStyle: { textTransform: 'capitalize' },
            },
        },

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

        footer: {
            copyright:
                `© ${new Date().getFullYear()} My Janudocs Site. ` +
                `Built with ❤️ using Janudocs by ACY.`,
        },
    },

    docs: {
        /*
         * Change this to match your repository.
         * Remove this to remove the "Edit this page" link on documenation pages.
         */
        editUrl:
            'https://github.com/andrewcwhy/janudocs/tree/main/packages/create-janudocs/templates/shared/',
    },
})
