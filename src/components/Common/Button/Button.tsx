import { memo } from "react";
import styles from "./button.module.css";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

function Button({ onClick, children, className }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(styles.button, className)}
    >
      {children}
    </button>
  );
}

export default memo(Button);
