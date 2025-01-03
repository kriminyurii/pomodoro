import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface OverlayProps {
	isOpen: boolean;
	onClose: () => void;
	onClickOutside?: () => void;
	children: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({
	isOpen,
	onClose,
	onClickOutside,
	children,
}) => {
	const overlayRef = useRef<HTMLDivElement>(null);
	const previousActiveElement = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (isOpen) {
			previousActiveElement.current = document.activeElement as HTMLElement;
			overlayRef.current?.focus();
			document.body.style.overflow = "hidden";
		} else if (previousActiveElement.current) {
			previousActiveElement.current.focus();
			document.body.style.overflow = "auto";
		}
	}, [isOpen]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		const handleClickOutside = (event: MouseEvent) => {
			if (
				overlayRef.current &&
				overlayRef.current.contains(event.target as Node)
			) {
				(onClickOutside || onClose)();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose, onClickOutside]);

	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div role="dialog" aria-modal="true" ref={overlayRef} tabIndex={-1}>
			{children}
		</div>,
		document.body
	);
};

export default Overlay;
