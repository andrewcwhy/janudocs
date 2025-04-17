type CollapseState = "expanded" | "collapsed";
type TextTransform = "capitalize" | "uppercase" | "lowercase";
type SidebarPosition = "left" | "right";

interface TextStyleConfig {
	textTransform: TextTransform;
}

interface DescriptionConfig {
	enabled: boolean;
	textStyle: TextStyleConfig;
}

interface MetaData {
	title: string;
	description: string;
	url: string;
}

interface ThemeConfig {
	navbar: NavBarConfig;
	sidebar: SidebarConfig;
	footer: FooterConfig;
}

interface NavBarConfig {
	title: string;
	logo: {
		alt: string;
		src: string;
	};
	items: {
		highlightActive: boolean;
		textStyle: {
			textTransform: TextTransform;
		};
	};
}

interface SidebarConfig {
	position: SidebarPosition;
	collapsible: boolean;
	categories: {
		collapsible: boolean;
		initialState: CollapseState;
		descriptions: DescriptionConfig;
		textStyle: TextStyleConfig;
	};
	items: {
		highlightActive: boolean;
		textStyle: {
			textTransform: TextTransform;
		};
	};
}

interface FooterConfig {
	copyright: string;
}

interface SocialLinks {
	platform: string;
	icon?: IconType;
	url: string;
}

interface Docs {
	editUrl?: string;
}

export type JanudocsConfig = {
	metaData: MetaData;
	themeConfig: ThemeConfig;
	socialLinks?: SocialLinks[];
	docs?: Docs;
};

/**
 * Janudocs config, as provided by the user (partial/un-normalized). This type
 * is used to provide type-safety / IDE auto-complete on the config file.
 */
export type Config = Overwrite<
	DeepPartial<JanudocsConfig>,
	{
		title: JanudocsConfig["title"];
		url: JanudocsConfig["url"];
	}
>;
