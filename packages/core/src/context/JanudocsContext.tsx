import React, { type ReactNode } from "react";
import type { JanudocsContext } from "../types/context";
import { defaultConfig } from "../config/defaultConfig";

const contextValue: JanudocsContext = {
	siteConfig: defaultConfig,
};

export const Context = React.createContext<JanudocsContext>(contextValue);

export function JanudocsContextProvider({
	children,
}: {
	children: ReactNode;
}): ReactNode {
	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
