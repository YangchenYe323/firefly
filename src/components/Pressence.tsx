import {
	Children,
	cloneElement,
	type FC,
	type ReactElement,
	useCallback,
	useEffect,
	useReducer,
	useRef,
	useState,
} from "react";
import { flushSync } from "react-dom";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useLayoutEffect } from "@radix-ui/react-use-layout-effect";

export interface PresenceProps {
	// A children could either be any ReactElement, in which case we won't manage the presence state, or
	// a function element that accepts a present in its prop, and we manage the presence state for it, handling
	// lazy unmounting to wait for any exit animations to complete
	children: ReactElement | ((props: { present: boolean }) => ReactElement);
	present: boolean;
}

export const Presence: FC<PresenceProps> = ({ children, present }) => {
	const { isPresent, ref } = usePresence(present);
	const child = (
		typeof children === "function"
			? children({ present: isPresent })
			: Children.only(children)
	) as ReactElement;

	const r = useComposedRefs(ref, getElementRef(child));
	const forceMount = typeof children === "function";

	return forceMount || isPresent ? cloneElement(child, { ref: r }) : null;
};

Presence.displayName = "Presence";

/**
 * A hook that suspends the unmounting of a component until the exit enimation is complete. It takes the
 * intention of the parent to present or not present the component, and returns if the component should be present
 * or not at this moment.
 *
 * @param present - Whether the component is present
 */
function usePresence(present: boolean) {
	const [node, setNode] = useState<HTMLElement>();
	const styleRef = useRef<CSSStyleDeclaration>();
	const prevPresentRef = useRef(present);
	const prevAnimationNameRef = useRef<string>("none");
	const initialState = present ? "mounted" : "unmounted";
	const [state, dispatch] = useStateMachine(initialState, {
		mounted: {
			MOUNT: "mounted",
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended",
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted",
			UNMOUNT: "unmountSuspended",
		},
		unmounted: {
			MOUNT: "mounted",
			UNMOUNT: "unmounted",
		},
	});

	useEffect(() => {
		const currentAnimationName = getAnimationName(styleRef.current);
		prevAnimationNameRef.current =
			state === "mounted" ? currentAnimationName : "none";
	}, [state]);

	useLayoutEffect(() => {
		/**
		 * In this effect we trigger ANIMATION_OUT, and suspend the unmounting of the component until the
		 * animation is complete.
		 */

		const styles = styleRef.current;
		const wasPresent = prevPresentRef.current;
		const hasPresentChanged = wasPresent !== present;

		if (!hasPresentChanged) {
			return;
		}

		const prevAnimationName = prevAnimationNameRef.current;
		const currentAnimationName = getAnimationName(styles);

		if (present) {
			// We are trying to mount the component
			dispatch("MOUNT");
			return;
		}

		if (currentAnimationName === "none" || styles?.display === "none") {
			// No exit animation is running, so we can unmount immediately
			dispatch("UNMOUNT");
			return;
		}

		/**
		 * When present changes to false, we check changes to animationName to determine if an exit
		 * animation has started. We chose this approach (reading computed styles) because there is no
		 * "animationrun" event and "animationstart" event fires after "animation-delay" has expired which
		 * would be too late.
		 */
		const isAnimating = prevAnimationName !== currentAnimationName;

		if (wasPresent && isAnimating) {
			dispatch("ANIMATION_OUT");
			return;
		}

		dispatch("UNMOUNT");
	}, [present, dispatch]);

	useLayoutEffect(() => {
		/**
		 * In this effect we trigger UNMOUNT by watching for the exit enimation end
		 */

		if (!node) {
			dispatch("UNMOUNT");
			return;
		}

		/**
		 * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an "animationcancel" event
		 * for ANIMATION_IN after we have entered the "unmountSuspended" state. So, we make sure
		 * we only trigger ANIMATION_END for the currently active animation.
		 */
		const handleAnimationEnd = (event: AnimationEvent) => {
			const currentAnimationName = getAnimationName(styleRef.current);
			const isCurrentAnimation = currentAnimationName.includes(
				event.animationName,
			);
			if (event.target === node && isCurrentAnimation) {
				// With React 18 concurrency this update is applied a frame after the animation ends,
				// creating a flush of visible content. By manually flushing we ensure that they sync
				// within a frame and avoid the flash.
				flushSync(() => dispatch("ANIMATION_END"));
			}
		};

		const handleAnimationStart = (event: AnimationEvent) => {
			if (event.target === node) {
				// If animation occurred, store its name as the previous animation name
				prevAnimationNameRef.current = getAnimationName(styleRef.current);
			}
		};

		node.addEventListener("animationstart", handleAnimationStart);
		node.addEventListener("animationcancel", handleAnimationEnd);
		node.addEventListener("animationend", handleAnimationEnd);

		return () => {
			node.removeEventListener("animationstart", handleAnimationStart);
			node.removeEventListener("animationcancel", handleAnimationEnd);
			node.removeEventListener("animationend", handleAnimationEnd);
		};
	}, [node, dispatch]);

	return {
		isPresent: state === "mounted" || state === "unmountSuspended",
		ref: useCallback((node: HTMLElement) => {
			if (node) {
				styleRef.current = window.getComputedStyle(node);
				setNode(node);
			}
		}, []),
	};
}

function getAnimationName(styles?: CSSStyleDeclaration) {
	return styles?.animationName || "none";
}

// A machine is essentially a map from state -> event -> next state
type Machine<S> = { [k: string]: { [k: string]: S } };
// State of the machine is the union of all state strings
type MachineState<T> = keyof T;
// Event of the machine is the set of events that is present in each state's transition map
type MachineEvent<T> = keyof UnionToIntersection<T[keyof T]>;

// https://fettblog.eu/typescript-union-to-intersection/
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
	x: infer R,
) => any
	? R
	: never;

// A hook that returns a state and a dispatch function
// The state is the current state of the machine
function useStateMachine<M>(
	initialState: MachineState<M>,
	machine: M & Machine<MachineState<M>>,
) {
	return useReducer(
		(state: MachineState<M>, event: MachineEvent<M>): MachineState<M> => {
			const nextState = (machine[state] as any)[event];
			return nextState;
		},
		initialState,
	);
}

/**
 * Before React 19 accessing `element.props.ref` will throw a warning and suggest using `element.ref`
 * After React 19 accessing `element.ref` does the opposite
 *
 * https://github.com/facebook/react/pull/28348
 * @param element
 */
function getElementRef(element: ReactElement) {
	// React <=18 in DEV
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) {
		return (element as any).ref;
	}

	// React >=19 in DEV
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) {
		return element.props.ref;
	}

	// Not DEV
	return element.props.ref || (element as any).ref;
}
