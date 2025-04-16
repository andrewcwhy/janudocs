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

interface SiteConfig {
    title: string
    url: string
}

interface NavBarConfig {
    title: string
    items: {
        highlightActive: boolean
        textStyle: {
            textTransform: TextTransform
        }
    }
}

interface SidebarConfig {
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

export interface JanudocsConfig {
    navbar: NavBarConfig
    sidebar: SidebarConfig
}
