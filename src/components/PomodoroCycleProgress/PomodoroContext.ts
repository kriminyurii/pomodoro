import { createContext } from "react";

export interface PomodoroContextProps {
	steps: string[];
	currentStep: string;
	selectCurrentStep: (step: string) => void;
	resetSteps: () => void;
}

export const PomodoroContext = createContext<PomodoroContextProps | undefined>(
	undefined
);
