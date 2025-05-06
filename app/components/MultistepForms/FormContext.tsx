'use client';

import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';

export type FormStep = {
  id: string
  title: string
  component: React.FC
}

type FormContextType = {
  formData: Record<string, any>
  setFormData: (data: Record<string, any>) => void
  currentStep: number
  nextStep: () => void
  prevStep: () => void
  config: FormStep[]
  resetForm: () => void
}

const FormContext = createContext<FormContextType | null>(null)

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used inside FormProvider');
  }
  return context;
}

interface FormProviderProps {
  children: React.ReactNode
  config: FormStep[]
}

export const FormProvider = ({ children, config }: FormProviderProps) => {
  const [formData, setFormDataState] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);

  useLocalStorage('formData', formData);

  const setFormData = (data: Record<string, any>) => {
    setFormDataState(prev => ({ ...prev, ...data }));
  }

  const nextStep = () => {
    setCurrentStep(s => Math.min(s + 1, config.length - 1));
  }

  const prevStep = () => {
    setCurrentStep(s => Math.max(s - 1, 0));
  }

  const resetForm = () => {
    setFormDataState({});
    setCurrentStep(0);
  }

  return (
    <FormContext.Provider
      value={{ formData, setFormData, currentStep, nextStep, prevStep, config, resetForm }}
    >
      {children}
    </FormContext.Provider>
  )
}