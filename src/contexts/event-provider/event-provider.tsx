import { createNanoEvents } from "nanoevents";
import { createContext, useContext } from "react";
import type { Events } from "./types";

const emitter = createNanoEvents<Events>();

const EventContext = createContext(emitter);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<EventContext.Provider value={emitter}>{children}</EventContext.Provider>
	);
};

export const useEventSystem = () => {
	return useContext(EventContext);
};
