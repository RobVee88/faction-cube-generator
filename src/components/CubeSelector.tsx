import { CubeStep } from '@/util/types';
import { Button, Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react';
import { useCubeContext } from './CubeContext';
import { BanCardsStep } from './steps/ban-cards-step';
import { GenerateCubeStep } from './steps/generate-cube-step';
import { IncludeCardsStep } from './steps/include-cards-step';
import { SelectSetsStep } from './steps/select-sets-step';
import { SetFiltersStep } from './steps/set-filters-step';

const Steps: CubeStep[] = [
    { id: 0, label: 'Select Sets', component: <SelectSetsStep /> },
    { id: 1, label: 'Set Filters', component: <SetFiltersStep /> },
    { id: 2, label: 'Include Cards', component: <IncludeCardsStep /> },
    { id: 3, label: 'Ban Cards', component: <BanCardsStep /> },
    { id: 4, label: 'Finalise Cube', component: <GenerateCubeStep /> },
];

export const CubeSelector = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    const { selectedSets } = useCubeContext();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div
                style={{
                    position: 'sticky',
                    top: '0px',
                    backgroundColor: 'white',
                    zIndex: 10,
                    opacity: 0.9,
                }}
            >
                <Stepper activeStep={activeStep}>
                    {Steps.map((step) => {
                        return (
                            <Step key={step.id}>
                                <StepLabel>{step.label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div style={{ marginBottom: 20 }}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>

                    <Button
                        style={{ marginLeft: 10 }}
                        variant='contained'
                        color='primary'
                        onClick={handleNext}
                        disabled={activeStep === 4 || !selectedSets.length}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {Steps.find((step) => step.id === activeStep)?.component}
        </div>
    );
};
