type CollapseState = 'expanded' | 'collapsed'
type TextTransform = 'capitalize' | 'uppercase' | 'lowercase'
type SidebarPosition = 'left' | 'right'

interface TextStyleConfig {
    textTransform: TextTransform
}

interface DescriptionConfig {
    enabled: boolean
    textStyle: TextStyleConfig
}

export interface SidebarConfig {
    position: SidebarPosition
    collapsible: boolean
    categories: {
        collapsible: boolean
        initialState: CollapseState
        descriptions: DescriptionConfig
        textStyle: TextStyleConfig
    }
    items: {
        highlightActive: boolean
        textStyle: {
            textTransform: TextTransform
        }
    }
}
