'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react';
import type { AssessmentState, AssessmentAction } from './types';
import { saveSessionProgress, loadSessionProgress } from './services/persistence';

const initialState: AssessmentState = {
  user: null,
  answers: {},
  currentStep: 0,
  isEmailGateComplete: false,
  resultId: null,
  startedAt: null,
  completedAt: null,
};

function reducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isEmailGateComplete: true,
        startedAt: state.startedAt ?? new Date().toISOString(),
      };
    case 'SET_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.payload.step]: action.payload.key },
        currentStep: action.payload.step,
      };
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'COMPLETE':
      return {
        ...state,
        resultId: action.payload.resultId,
        completedAt: new Date().toISOString(),
      };
    case 'RESTORE':
      return action.payload;
    default:
      return state;
  }
}

interface AssessmentContextValue {
  state: AssessmentState;
  dispatch: React.Dispatch<AssessmentAction>;
  setUser: (firstName: string, email: string) => void;
  setAnswer: (step: number, key: string) => void;
  setStep: (step: number) => void;
  complete: (resultId: string) => void;
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Restore session on mount
  useEffect(() => {
    const saved = loadSessionProgress();
    if (saved && saved.isEmailGateComplete && !saved.completedAt) {
      dispatch({ type: 'RESTORE', payload: saved });
    }
  }, []);

  // Persist on every state change (after initial mount)
  useEffect(() => {
    if (state.isEmailGateComplete && !state.completedAt) {
      saveSessionProgress(state);
    }
  }, [state]);

  const setUser = useCallback((firstName: string, email: string) => {
    dispatch({ type: 'SET_USER', payload: { firstName, email } });
  }, []);

  const setAnswer = useCallback((step: number, key: string) => {
    dispatch({ type: 'SET_ANSWER', payload: { step, key } });
  }, []);

  const setStep = useCallback((step: number) => {
    dispatch({ type: 'SET_STEP', payload: step });
  }, []);

  const complete = useCallback((resultId: string) => {
    dispatch({ type: 'COMPLETE', payload: { resultId } });
  }, []);

  return (
    <AssessmentContext.Provider value={{ state, dispatch, setUser, setAnswer, setStep, complete }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment(): AssessmentContextValue {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error('useAssessment must be used within AssessmentProvider');
  return ctx;
}
