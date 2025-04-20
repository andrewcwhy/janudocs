import type { IconType } from "react-icons";

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

interface Blog {
	editUrl?: string;
}

interface Docs {
	editUrl?: string;
}

export type JanudocsConfig = {
	metaData: MetaData;
	themeConfig: ThemeConfig;
	socialLinks?: SocialLinks[];
	presets: {
		blog?: Blob;
		docs?: Docs;
	}
};
