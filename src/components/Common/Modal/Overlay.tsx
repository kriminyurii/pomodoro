import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface OverlayProps {
	children: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
	const portalParentRef = useRef<HTMLDivElement>(null);
	const previousActiveElement = useRef<HTMLElement | null>(null);

	useEffect(() => {
		previousActiveElement.current = document.activeElement as HTMLElement;
		if (portalParentRef.current) portalParentRef.current.focus();
		document.body.style.overflow = "hidden";
		() => {
			if (previousActiveElement.current) previousActiveElement.current.focus();
			document.body.style.overflow = "auto";
		};
	}, []);

	return ReactDOM.createPortal(
		<div ref={portalParentRef} tabIndex={-1}>
			{children}
		</div>,
		document.body
	);
};

export default Overlay;
