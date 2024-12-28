import { FormEvent, ReactNode, useId } from "react";

interface FormProps {
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	children: ReactNode;
	className?: string;
	ariaLabel?: string;
	ariaDescribedBy?: string;
	ariaLabelledBy?: string;
	id?: string;
}

const Form = ({
	onSubmit,
	children,
	className,
	ariaLabel,
	ariaDescribedBy,
	ariaLabelledBy,
	id,
}: FormProps) => {
	const formId = useId();
	const combinedId = id || `${formId}-${ariaLabel || "form"}`;

	return (
		<form
			id={combinedId}
			onSubmit={onSubmit}
			className={className}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedBy}
			aria-labelledby={ariaLabelledBy}
		>
			{children}
		</form>
	);
};

export default Form;
