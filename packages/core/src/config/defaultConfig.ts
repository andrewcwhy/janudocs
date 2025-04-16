import type { JanudocsConfig } from '../types/config'

export const defaultConfig: JanudocsConfig = {
    title: 'My Janudocs Site',
    url: 'https://my-janudocs-site.com',

    componentsConfig: {
        navbar: {
            title: 'My Janudocs Site',
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

        footer: {
            copyright:
                `© ${new Date().getFullYear()} My Janudocs Site. ` +
                `Built with ❤️ using Janudocs by ACY.`,
        },
    },
}
