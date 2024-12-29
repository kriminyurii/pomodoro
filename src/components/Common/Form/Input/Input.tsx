import clsx from "clsx";
import styles from "./input.module.css";

interface InputProps {
	type: string;
	name: string;
	className?: string;
	value?: string;
	placeholder?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	ariaLabel?: string;
	ariaLabelledBy?: string;
	id?: string;
}

const Input: React.FC<InputProps> = ({
	type,
	name,
	className,
	value,
	placeholder,
	onChange,
	ariaLabel,
	ariaLabelledBy,
	id,
}) => {
	return (
		<input
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			className={clsx(styles.input, className)}
			aria-label={ariaLabel}
			aria-labelledby={ariaLabelledBy}
			id={id}
		/>
	);
};

export default Input;
