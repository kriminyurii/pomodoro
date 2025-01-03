import { memo, useEffect, useRef } from "react";
import clsx from "clsx";
import Overlay from "./Overlay";
import styles from "./modal.module.css";

interface ModalProps {
	in: boolean;
	onClose: () => void;
	onClickOutside?: () => void;
	children: React.ReactNode;
	className?: string;
}

const Modal: React.FC<ModalProps> = ({
	in: isOpen,
	onClose,
	onClickOutside,
	children,
	className,
}) => {
	const overlayRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		const handleClickOutside = (event: MouseEvent) => {
			if (overlayRef.current === event.target) {
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

	return (
		<Overlay>
			<div ref={overlayRef} className={styles.modalOverlay}>
				<div
					aria-modal="true"
					role="dialog"
					className={clsx(styles.modal, className)}
				>
					<button
						onClick={onClose}
						className={styles.closeButton}
						aria-label="Close"
					>
						&times;
					</button>
					{children}
				</div>
			</div>
		</Overlay>
	);
};

export default memo(Modal);
