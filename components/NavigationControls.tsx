'use client';

interface NavigationControlsProps {
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  isLastStep: boolean;
}

export default function NavigationControls({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  isLastStep,
}: NavigationControlsProps) {
  return (
    <div className="flex items-center justify-between mt-10 pt-6 border-t border-black/[0.06]">
      {canGoBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-inter font-medium text-navy/50 hover:text-navy transition-colors focus:outline-none focus:text-navy"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="rotate-180"
          >
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
      ) : (
        <div />
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        className="btn-primary text-sm px-6 py-3"
      >
        {isLastStep ? 'Complete Assessment' : 'Continue'}
        {!isLastStep && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="ml-2"
          >
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
