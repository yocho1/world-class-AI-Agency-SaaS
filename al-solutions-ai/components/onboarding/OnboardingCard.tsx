"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "@/components/ui";

const ONBOARDING_STEPS = [
  {
    id: 1,
    title: "Welcome to your workspace",
    description: "You're all set! Your workspace is ready to use.",
    icon: "🎉",
  },
  {
    id: 2,
    title: "Invite your team",
    description: "Add your teammates to collaborate on leads and conversations.",
    icon: "👥",
    action: "Invite team members",
    actionPath: "/settings",
  },
  {
    id: 3,
    title: "Explore the dashboard",
    description: "View your leads, conversations, and analytics in one place.",
    icon: "📊",
    action: "Go to dashboard",
    actionPath: "/dashboard",
  },
];

export function OnboardingCard({
  userName,
  workspaceName,
}: {
  userName: string;
  workspaceName: string;
}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const step = ONBOARDING_STEPS[currentStep];
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  function handleNext() {
    if (isLastStep) {
      setCompleted(true);
      router.push("/dashboard");
    } else {
      setCurrentStep(currentStep + 1);
    }
  }

  function handleAction() {
    if (step.actionPath) {
      router.push(step.actionPath);
    }
  }

  if (completed) {
    return null;
  }

  return (
    <Card className="w-full space-y-8 p-8 max-w-2xl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-medium text-text-primary">{step.icon}</h1>
        <h2 className="mt-4 text-2xl font-medium text-text-primary">{step.title}</h2>
        <p className="mt-2 text-text-secondary">Welcome, {userName}!</p>
      </div>

      {/* Workspace info */}
      <div className="rounded-lg border border-border-subtle bg-bg-elevated px-4 py-3">
        <p className="text-xs uppercase tracking-[0.12em] text-text-tertiary">Your workspace</p>
        <p className="mt-2 text-lg font-medium text-text-primary">{workspaceName}</p>
      </div>

      {/* Description */}
      <div className="text-center">
        <p className="text-text-secondary">{step.description}</p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2">
        {ONBOARDING_STEPS.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index <= currentStep ? "bg-accent-500" : "bg-border-subtle"
            }`}
          />
        ))}
      </div>

      {/* Steps checklist */}
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.12em] text-text-tertiary">Setup checklist</p>
        {ONBOARDING_STEPS.map((s, index) => (
          <div
            key={s.id}
            className={`flex items-start gap-3 rounded-lg px-4 py-3 transition-colors ${
              index < currentStep
                ? "border border-green-500/30 bg-green-500/5"
                : index === currentStep
                  ? "border border-accent-500/30 bg-accent-500/5"
                  : "border border-border-subtle bg-bg-elevated"
            }`}
          >
            <span className="mt-1 text-lg">
              {index < currentStep ? "✓" : index === currentStep ? "→" : "○"}
            </span>
            <div>
              <p className={`text-sm font-medium ${index <= currentStep ? "text-text-primary" : "text-text-secondary"}`}>
                {s.title}
              </p>
              <p className="mt-1 text-xs text-text-tertiary">{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4">
        <Button
          variant="secondary"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <div className="flex gap-3">
          {step.action ? (
            <Button variant="secondary" onClick={handleAction}>
              {step.action}
            </Button>
          ) : null}
          <Button onClick={handleNext}>
            {isLastStep ? "Go to dashboard" : "Next"}
          </Button>
        </div>
      </div>

      {/* Skip option */}
      <div className="text-center">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-xs text-text-tertiary hover:text-text-secondary"
        >
          Skip onboarding
        </button>
      </div>
    </Card>
  );
}
