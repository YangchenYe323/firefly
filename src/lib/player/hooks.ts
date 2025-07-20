import { useEffect, useState } from "react";

import { getPlayerSingleton } from "./player";

export const usePlayerState = () => {
	const [state, setState] = useState(getPlayerSingleton().getState());

	// Subscribe to player's state change and propagate to hook state
	useEffect(() => {
		const unsubscribe = getPlayerSingleton().subscribe(setState);

		return unsubscribe;
	}, []);

	return state;
};

export const useCurrentTime = () => {
	const [currentTime, setCurrentTime] = useState(getPlayerSingleton().getCurrentTime());

	useEffect(() => {
		const unsubscribe = getPlayerSingleton().onChangeCurrentTime(setCurrentTime);

		return unsubscribe;
	}, []);

	return currentTime;
};
