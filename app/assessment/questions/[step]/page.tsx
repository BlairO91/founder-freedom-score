'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AssessmentShell from '@/components/AssessmentShell';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import NavigationControls from '@/components/NavigationControls';
import { useAssessment } from '@/lib/assessment/context';
import { getQuestionByStep, isValidStep } from '@/lib/assessment/content/questions';
import { buildResult } from '@/lib/assessment/engine/results';
import { saveResult, clearSessionProgress } from '@/lib/assessment/services/persistence';
import { submitResult } from '@/lib/assessment/services/submission';
import { track } from '@/lib/assessment/services/analytics';
import { TOTAL_STEPS } from '@/lib/assessment/constants';

export default function QuestionPage() {
  const router = useRouter();
  const params = useParams();
  const { state, setAnswer, setStep, complete } = useAssessment();
  const [direction, setDirection] = useState(1);
  const hasTrackedRef = useRef<number>(0);

  const step = Number(params.step);
  const question = isValidStep(step) ? getQuestionByStep(step) : undefined;
  const selectedAnswer = state.answers[step];
  const isLastStep = step === TOTAL_STEPS;

  // Redirect if not past email gate
  useEffect(() => {
    if (!state.isEmailGateComplete) {
      router.replace('/assessment/start');
    }
  }, [state.isEmailGateComplete, router]);

  // Redirect if invalid step
  useEffect(() => {
    if (!isValidStep(step)) {
      router.replace('/assessment/questions/1');
    }
  }, [step, router]);

  // Track question view
  useEffect(() => {
    if (question && hasTrackedRef.current !== step) {
      hasTrackedRef.current = step;
      const eventType = question.type === 'qualification' ? 'question_viewed' : 'question_viewed';
      track(eventType, {
        step,
        questionId: question.id,
        foundation: question.foundation ?? 'qualification',
      });
    }
  }, [step, question]);

  // Sync step with context
  useEffect(() => {
    if (step !== state.currentStep && isValidStep(step)) {
      setStep(step);
    }
  }, [step, state.currentStep, setStep]);

  const handleAnswer = useCallback(
    (key: string) => {
      setAnswer(step, key);
      const eventName =
        question?.type === 'qualification' ? 'qualification_answered' : 'question_answered';
      track(eventName, {
        step,
        questionId: question?.id ?? '',
        answer: key,
      });
    },
    [step, question, setAnswer]
  );

  const handleNext = useCallback(async () => {
    if (!selectedAnswer) return;

    if (isLastStep) {
      // Complete the assessment
      const result = buildResult(state);
      saveResult(result);
      complete(result.resultId);
      clearSessionProgress();
      track('assessment_completed', {
        resultId: result.resultId,
        totalScore: result.scoring.totalPercent,
      });

      // Non-blocking submission
      submitResult(result).catch(() => {});

      router.push(`/assessment/complete?id=${result.resultId}`);
    } else {
      setDirection(1);
      router.push(`/assessment/questions/${step + 1}`);
    }
  }, [selectedAnswer, isLastStep, state, complete, router, step]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      setDirection(-1);
      router.push(`/assessment/questions/${step - 1}`);
    }
  }, [step, router]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter' && selectedAnswer) {
        handleNext();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAnswer, handleNext]);

  if (!state.isEmailGateComplete || !question) return null;

  return (
    <AssessmentShell>
      <div className="py-6 md:py-10">
        <ProgressBar currentStep={step} />

        <QuestionCard
          question={question}
          selectedAnswer={selectedAnswer}
          onAnswer={handleAnswer}
          direction={direction}
        />

        <NavigationControls
          onBack={handleBack}
          onNext={handleNext}
          canGoBack={step > 1}
          canGoNext={!!selectedAnswer}
          isLastStep={isLastStep}
        />
      </div>
    </AssessmentShell>
  );
}
