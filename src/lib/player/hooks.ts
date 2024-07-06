import { useEffect, useState } from "react";

import player from "./player";

export const usePlayerState = () => {
	const [state, setState] = useState(player().getState());

	// Subscribe to player's state change and propagate to hook state
	useEffect(() => {
		const unsubscribe = player().subscribe(setState);

		return unsubscribe;
	}, []);

	return state;
};

export const useCurrentTime = () => {
	const [currentTime, setCurrentTime] = useState(player().getCurrentTime());

	useEffect(() => {
		const unsubscribe = player().onChangeCurrentTime(setCurrentTime);

		return unsubscribe;
	}, []);

	return currentTime;
};
