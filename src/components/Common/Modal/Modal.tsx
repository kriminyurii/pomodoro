import React, { memo } from "react";
import Overlay from "./Overlay";
import styles from "./modal.module.css";

interface ModalProps {
	in: boolean;
	onClose: () => void;
	onClickOutside?: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
	in: isOpen,
	onClose,
	onClickOutside,
	children,
}) => {
	return (
		<Overlay isOpen={isOpen} onClose={onClose} onClickOutside={onClickOutside}>
			<div className={styles.modalOverlay}>
				<div className={styles.modal}>
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
