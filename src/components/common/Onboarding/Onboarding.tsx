"use client"

import { onboardingStore } from '../../../store/onboardingStore';
import type { ComponentType, ReactNode } from 'react';
import type { StepNumber } from '../../../store/onboardingStore';
import SplitLayout from './layouts/SplitLayout';
import CenteredLayout from './layouts/CenteredLayout';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';

interface StepConfig {
  layout: ComponentType<{ children: ReactNode }>;
  component: ComponentType;
}

const STEPS: Record<StepNumber, StepConfig> = {
  1: {
    layout: SplitLayout,
    component: Step1,
  },
  2: {
    layout: CenteredLayout,
    component: Step2,
  },
  3: {
    layout: CenteredLayout,
    component: Step3,
  },
  4: {
    layout: CenteredLayout,
    component: Step4,
  },
  5: {
    layout: CenteredLayout,
    component: Step5,
  },
};

const Onboarding = () => {
  const step = onboardingStore((state) => state.step);

  const current = STEPS[step] ?? STEPS[1];


  const Layout = current.layout;
  const StepComponent = current.component;

  return (
    <Layout>
      <StepComponent />
    </Layout>
  );
};

export default Onboarding;
