"use client";

import {
	type ChangeEventHandler,
	type CompositionEventHandler,
	type ForwardedRef,
	forwardRef,
	useState,
} from "react";
import { Input, type InputProps } from "./ui/input";

interface PropType extends InputProps {
	onValueChange: (value: string) => void;
}

const ChineseInput = forwardRef(
	(
		{ onValueChange, ...props }: PropType,
		ref: ForwardedRef<HTMLInputElement>,
	) => {
		const [isEditingChinese, setIsEditingChinese] = useState(false);

		const onCompositionStart: CompositionEventHandler<HTMLInputElement> = (
			e,
		) => {
			setIsEditingChinese(true);
		};

		const onCompositionEnd: CompositionEventHandler<HTMLInputElement> = (e) => {
			const value = e.currentTarget.value;
			setIsEditingChinese(false);
			onValueChange(value);
		};

		const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
			if (!isEditingChinese) {
				const value = e.currentTarget.value;
				onValueChange(value);
			}
		};

		return (
			<Input
				onCompositionStart={onCompositionStart}
				onCompositionEnd={onCompositionEnd}
				onChange={onChange}
				ref={ref}
				{...props}
			/>
		);
	},
);

ChineseInput.displayName = "ChineseInput";

export default ChineseInput;
