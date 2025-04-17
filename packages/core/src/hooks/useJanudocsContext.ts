import { useContext } from "react";
import { Context } from "../context/JanudocsContext";
import type { JanudocsContext } from "../types/context";

export function useJanudocsContext(): JanudocsContext {
	return useContext(Context);
}
