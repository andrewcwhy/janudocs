import { JanudocsConfig } from '@/types/config'

export const defaultConfig: JanudocsConfig = {
    sidebar: {
        categories: {
            togglable: true,
            viewState: 'expanded',
            descriptions: {
                show: true,
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
