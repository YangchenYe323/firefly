import { useEffect, useState } from "react";

import { getPlayerSingleton, createDummyState } from "./player";

export const usePlayerState = () => {
	const [state, setState] = useState(() => {
		const player = getPlayerSingleton();
		return player ? player.getState() : createDummyState();
	});

	// Subscribe to player's state change and propagate to hook state
	useEffect(() => {
		const player = getPlayerSingleton();
		if (!player) return;

		const unsubscribe = player.subscribe(setState);
		return unsubscribe;
	}, []);

	return state;
};

export const useCurrentTime = () => {
	const [currentTime, setCurrentTime] = useState(() => {
		const player = getPlayerSingleton();
		return player ? player.getCurrentTime() : 0;
	});

	useEffect(() => {
		const player = getPlayerSingleton();
		if (!player) return;

		const unsubscribe = player.onChangeCurrentTime(setCurrentTime);
		return unsubscribe;
	}, []);

	return currentTime;
};
