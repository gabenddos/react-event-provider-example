import { useEffect } from "react";
import { useEventSystem } from "./event-provider";
import type { Events } from "./types";

export function useEvent<T extends keyof Events>(
	eventName: T,
	callback: Events[T],
) {
	const events = useEventSystem();

	useEffect(() => {
		const unsubscribe = events.on(eventName, callback);
		return () => unsubscribe();
	}, [eventName, callback, events]);
}
