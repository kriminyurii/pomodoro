import { useContext, useState, ReactNode, useMemo } from "react";
import { PomodoroContext, PomodoroContextProps } from "./PomodoroContext";

export const POMODORO = "Pomodoro";
export const SHORT_BREAK = "Short Break";
export const LONG_BREAK = "Long Break";
const steps = [POMODORO, SHORT_BREAK, LONG_BREAK];

export const PomodoroStepsHost = ({ children }: { children: ReactNode }) => {
	const [currentStep, setCurrentStep] = useState<string>(POMODORO);

	const selectCurrentStep = (nextStep: string) => {
		setCurrentStep(nextStep);
	};

	const resetSteps = () => {
		setCurrentStep(POMODORO);
	};

	const contextValue = useMemo(
		() => ({
			steps,
			currentStep,
			selectCurrentStep,
			resetSteps,
		}),
		[currentStep]
	);

	return (
		<PomodoroContext.Provider value={contextValue}>
			{children}
		</PomodoroContext.Provider>
	);
};

export const usePomodoro = (): PomodoroContextProps => {
	const context = useContext(PomodoroContext);
	if (!context) {
		throw new Error("usePomodoro must be used within a PomodoroProvider");
	}
	return context;
};
