import { memo } from "react";
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
	return (
		<Overlay isOpen={isOpen} onClose={onClose} onClickOutside={onClickOutside}>
			<div className={styles.modalOverlay}>
				<div className={clsx(styles.modal, className)}>
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
