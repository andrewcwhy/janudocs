export type TextTransform = 'capitalize' | 'uppercase' | 'lowercase' | 'none'
export type ViewState = 'expanded' | 'collapsed'

export interface JanudocsConfig {
    sidebar: {
        categories: {
            togglable: boolean
            viewState: ViewState
            descriptions: {
                show: boolean
                textStyle: {
                    textTransform: TextTransform
                }
            }
            textStyle: {
                textTransform: TextTransform
            }
        }
        items: {
            highlightActive: boolean
            textStyle: {
                textTransform: TextTransform
            }
        }
    }
}
