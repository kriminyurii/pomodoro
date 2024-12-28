import { createContext, useContext } from "react";

export interface PomodoroContextProps {
	steps?: string[];
	currentStep: string;
	selectCurrentStep?: (step: string) => void;
	resetSteps?: () => void;
}

export const PomodoroContext = createContext<PomodoroContextProps | undefined>(
	undefined
);

export const usePomodoro = (): PomodoroContextProps => {
	const context = useContext(PomodoroContext);
	if (!context) {
		throw new Error("usePomodoro must be used within a PomodoroProvider");
	}
	return context;
};
