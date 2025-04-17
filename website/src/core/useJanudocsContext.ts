import { useContext } from "react";
import { Context } from "./JanudocsContext";
import type { JanudocsContext } from "./context";

export function useJanudocsContext(): JanudocsContext {
	return useContext(Context);
}
