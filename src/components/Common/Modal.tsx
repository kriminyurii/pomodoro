import React, { memo } from "react";
import Overlay from "./Overlay";

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
			<div
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						position: "relative",
						backgroundColor: "white",
						padding: "20px",
						borderRadius: "8px",
						width: "90%",
						maxWidth: "500px",
						boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
					}}
				>
					<button
						onClick={onClose}
						style={{
							position: "absolute",
							top: "10px",
							right: "10px",
							background: "none",
							border: "none",
							fontSize: "20px",
							cursor: "pointer",
						}}
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
