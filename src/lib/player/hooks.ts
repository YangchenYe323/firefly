import { useEffect, useState } from "react";

import { getPlayerSingleton, initializePlayer, createDummyState } from "./player";

export const usePlayerState = () => {
	const [state, setState] = useState(() => {
		const player = getPlayerSingleton();
		return player ? player.getState() : createDummyState();
	});

	// Subscribe to player's state change and propagate to hook state.
	// Initialize the player here (client-only) so subscription never misses
	// because the singleton has not been created yet.
	useEffect(() => {
		const player = initializePlayer();

		const unsubscribe = player.subscribe(setState);
		// Sync any state changes that happened before subscribing
		setState(player.getState());
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
		const player = initializePlayer();

		const unsubscribe = player.onChangeCurrentTime(setCurrentTime);
		setCurrentTime(player.getCurrentTime());
		return unsubscribe;
	}, []);

	return currentTime;
};
