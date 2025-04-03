export type TextTransform = 'capitalize' | 'uppercase' | 'lowercase' | 'none'
export type ViewState = 'expanded' | 'collapsed'

// General reusable settings for text styles
interface TextStyleConfig {
    textTransform: TextTransform
}

export interface JanudocsConfig {
    sidebar: {
        categories: {
            // Whether categories can be toggled open/closed
            togglable: boolean
            // Default state for categories
            viewState: ViewState
            // Text transform for category labels
            textStyle: TextStyleConfig
            descriptions: {
                // Show category descriptions
                show: boolean
                // Text style for descriptions
                textStyle: TextStyleConfig
            }
        }

        items: {
            // Highlight the active document
            highlightActive: boolean
            // Text transform for item labels
            textStyle: TextStyleConfig
        }
    }
}

const config: JanudocsConfig = {
    sidebar: {
        categories: {
            togglable: true,
            viewState: 'expanded',
            textStyle: { textTransform: 'capitalize' },
            descriptions: {
                show: true,
                textStyle: {
                    textTransform: 'capitalize',
                },
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

export default config
