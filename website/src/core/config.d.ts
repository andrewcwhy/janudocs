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

interface FooterConfig {
    copyright: string
}

export interface ComponentsConfig {
    navbar: NavBarConfig
    sidebar: SidebarConfig
    footer: FooterConfig
}

export type JanudocsConfig = {
    title: string
    url: string
    tagline: string,
    componentsConfig: ComponentsConfig
}

/**
 * Janudocs config, as provided by the user (partial/un-normalized). This type
 * is used to provide type-safety / IDE auto-complete on the config file.
 */
export type Config = Overwrite<
  DeepPartial<JanudocsConfig>,
  {
    title: JanudocsConfig['title'];
    url: JanudocsConfig['url'];
  }
>
  