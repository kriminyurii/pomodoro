import { ReactNode, useMemo } from "react";
import { PomodoroContext } from "./PomodoroContext";

interface PomodoroStepsHostProps {
	children: ReactNode;
	steps: string[];
	currentStep: string;
	selectCurrentStep: (step: string) => void;
	resetSteps: () => void;
}

export const PomodoroStepsHost = ({
	children,
	steps,
	currentStep,
	selectCurrentStep,
	resetSteps,
}: PomodoroStepsHostProps) => {
	const contextValue = useMemo(
		() => ({
			steps,
			currentStep,
			selectCurrentStep,
			resetSteps,
		}),
		[steps, currentStep, selectCurrentStep, resetSteps]
	);

	return (
		<PomodoroContext.Provider value={contextValue}>
			{children}
		</PomodoroContext.Provider>
	);
};
