"use client";

import { startTransition, useMemo, useState } from "react";
import {
  personalities,
  personalityOrder,
  questions,
  type PersonalityKey,
  type PersonalityProfile,
} from "./quiz-data";

type Stage = "intro" | "quiz" | "results";

function buildPercentages(values: number[], total: number) {
  if (total === 0) {
    return values.map(() => 0);
  }

  const rawPercentages = values.map((value) => (value / total) * 100);
  const roundedDown = rawPercentages.map((value) => Math.floor(value));
  let remainder = 100 - roundedDown.reduce((sum, value) => sum + value, 0);

  const rankedRemainders = rawPercentages
    .map((value, index) => ({
      index,
      remainder: value - roundedDown[index],
    }))
    .sort((left, right) => right.remainder - left.remainder);

  for (let index = 0; index < rankedRemainders.length && remainder > 0; index += 1) {
    roundedDown[rankedRemainders[index].index] += 1;
    remainder -= 1;
  }

  return roundedDown;
}

function buildResults(answers: PersonalityKey[]) {
  const counts = personalityOrder.reduce<Record<PersonalityKey, number>>(
    (totals, key) => ({ ...totals, [key]: 0 }),
    {
      darkRoastRebel: 0,
      balancedBrew: 0,
      cozySipper: 0,
      flavorChaser: 0,
    },
  );

  answers.forEach((answer) => {
    counts[answer] += 1;
  });

  const percentages = buildPercentages(
    personalityOrder.map((key) => counts[key]),
    answers.length,
  );

  const breakdown = personalities.map((profile, index) => ({
    ...profile,
    count: counts[profile.key],
    percentage: percentages[index],
  }));

  const primary = [...breakdown].sort((left, right) => {
    if (right.count !== left.count) {
      return right.count - left.count;
    }

    return (
      personalityOrder.indexOf(left.key) - personalityOrder.indexOf(right.key)
    );
  })[0];

  const orderedBreakdown = [...breakdown].sort(
    (left, right) => right.percentage - left.percentage,
  );

  return { primary, breakdown: orderedBreakdown };
}

export default function Home() {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<PersonalityKey[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<PersonalityProfile | null>(null);

  const totalQuestions = questions.length;
  const currentPrompt = questions[currentQuestion];
  const progressPercent =
    stage === "intro" ? 0 : Math.round(((currentQuestion + 1) / totalQuestions) * 100);

  const results = useMemo(() => buildResults(answers), [answers]);

  const handleStart = () => {
    startTransition(() => {
      setSelectedProfile(null);
      setStage("quiz");
      setCurrentQuestion(0);
      setAnswers([]);
    });
  };

  const handleRetake = () => {
    startTransition(() => {
      setSelectedProfile(null);
      setStage("intro");
      setCurrentQuestion(0);
      setAnswers([]);
    });
  };

  const handleAnswer = (personality: PersonalityKey) => {
    const nextAnswers = [...answers, personality];
    const isLastQuestion = currentQuestion === totalQuestions - 1;

    startTransition(() => {
      setAnswers(nextAnswers);

      if (isLastQuestion) {
        setStage("results");
        return;
      }

      setCurrentQuestion((previous) => previous + 1);
    });
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.62),transparent_64%)]" />
        <div className="grid-dust absolute inset-0 opacity-25" />
        <div className="absolute left-[8%] top-[16%] h-36 w-36 rounded-full bg-[rgba(231,205,168,0.26)] blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] h-44 w-44 rounded-full bg-[rgba(160,106,69,0.14)] blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl items-stretch">
        <div className="panel-surface fine-line flex w-full flex-col rounded-[32px] px-5 py-5 sm:px-8 sm:py-7 lg:px-10 lg:py-8">
          <header className="flex flex-col gap-6 border-b border-[var(--line)] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <span className="inline-flex w-fit rounded-full border border-[rgba(96,68,48,0.14)] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[rgba(73,52,39,0.72)]">
                NovaBrew Coffee Co.
              </span>
              <div>
                <p className="text-sm font-medium text-[rgba(78,60,49,0.7)]">
                  Coffee Taste Profile
                </p>
                <h1 className="font-display text-3xl leading-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
                  Find Your Perfect Brew
                </h1>
              </div>
            </div>

            <div className="w-full max-w-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(73,52,39,0.56)]">
                <span>Progress</span>
                <span>
                  {stage === "intro"
                    ? "Ready to begin"
                    : stage === "results"
                      ? "Complete"
                      : `${currentQuestion + 1} of ${totalQuestions}`}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[rgba(92,63,39,0.09)]">
                <div
                  className="progress-sheen relative h-full rounded-full bg-[linear-gradient(90deg,#cfa16f,#8c5a3a)] transition-all duration-500"
                  style={{ width: `${stage === "results" ? 100 : progressPercent}%` }}
                />
              </div>
            </div>
          </header>

          {stage === "intro" ? (
            <div className="animate-rise grid flex-1 gap-6 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:py-10">
              <div className="flex flex-col justify-between gap-8">
                <div className="space-y-5">
                  <p className="max-w-2xl text-lg leading-8 text-[rgba(47,34,28,0.8)] sm:text-xl">
                    Now live: a six-question experience built to turn generic
                    coffee subscriptions into something personal, polished, and
                    worth staying for.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      "6 short questions",
                      "Personalized percentage breakdown",
                      "A signature NovaBrew coffee match",
                    ].map((item) => (
                      <div
                        key={item}
                        className="warm-card fine-line rounded-[22px] bg-white/72 px-4 py-4 text-sm leading-6 text-[rgba(58,41,32,0.84)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <button
                    type="button"
                    onClick={handleStart}
                    className="warm-card inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#fbf6ef] transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a2922]"
                  >
                    Start the quiz
                  </button>
                  <p className="max-w-xl text-sm leading-7 text-[rgba(73,52,39,0.68)]">
                    Designed as a NovaBrew retention prototype: the goal is not
                    just to classify taste, but to make subscribers feel seen
                    from the very first interaction.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {personalities.map((profile) => (
                  <button
                    key={profile.key}
                    type="button"
                    onClick={() => setSelectedProfile(profile)}
                    className="warm-card fine-line rounded-[26px] bg-white/76 p-5 text-left transition duration-300 hover:-translate-y-1 hover:bg-white"
                  >
                    <div
                      className="mb-5 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]"
                      style={{
                        backgroundColor: profile.accentSoft,
                        color: profile.accent,
                      }}
                    >
                      {profile.coffee.name}
                    </div>
                    <div className="space-y-3">
                      <h2 className="font-display text-2xl text-[var(--foreground)]">
                        {profile.name}
                      </h2>
                      <p className="text-sm leading-6 text-[rgba(73,52,39,0.8)]">
                        {profile.headline}
                      </p>
                      <p className="pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(73,52,39,0.48)]">
                        Click to explore this brew
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {stage === "quiz" ? (
            <div className="animate-rise flex flex-1 items-center py-8 lg:py-10">
              <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
                <aside className="flex flex-col justify-between rounded-[28px] bg-[rgba(89,61,43,0.95)] px-6 py-6 text-[#f7f0e7] sm:px-7 sm:py-7">
                  <div className="space-y-6">
                    <span className="inline-flex w-fit rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/72">
                      Question {currentQuestion + 1}
                    </span>
                    <div className="space-y-4">
                      <p className="text-sm uppercase tracking-[0.22em] text-white/55">
                        Choose what feels most like you
                      </p>
                      <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                        {currentPrompt.prompt}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-4 pt-10">
                    <p className="text-sm leading-7 text-white/72">
                      NovaBrew uses your answers to shape a coffee personality,
                      then pairs you with a roast that feels considered rather
                      than random.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {personalities.map((profile) => (
                        <span
                          key={profile.key}
                          className="rounded-full border border-white/12 px-3 py-1 text-xs text-white/74"
                        >
                          {profile.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </aside>

                <div className="grid gap-4">
                  {currentPrompt.options.map((option, index) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => handleAnswer(option.personality)}
                      className="warm-card fine-line group rounded-[28px] bg-white/80 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-[rgba(92,63,39,0.22)] hover:bg-white"
                    >
                      <div className="flex items-start gap-4">
                        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(87,61,42,0.15)] bg-[rgba(248,241,232,0.95)] text-sm font-semibold text-[rgba(66,46,35,0.8)] transition group-hover:border-[rgba(92,63,39,0.28)]">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <div className="space-y-2">
                          <p className="text-lg leading-7 text-[var(--foreground)]">
                            {option.label}
                          </p>
                          <p className="text-sm leading-6 text-[rgba(73,52,39,0.62)]">
                            Tap to move to the next question.
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {stage === "results" ? (
            <div className="animate-rise flex flex-1 items-center py-8 lg:py-10">
              <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <section className="warm-card fine-line rounded-[30px] bg-white/82 p-6 sm:p-8">
                  <div
                    className="mb-6 inline-flex rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em]"
                    style={{
                      backgroundColor: results.primary.accentSoft,
                      color: results.primary.accent,
                    }}
                  >
                    Your primary taste profile
                  </div>
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-[rgba(73,52,39,0.56)]">
                        You are
                      </p>
                      <h2 className="font-display text-4xl leading-none text-[var(--foreground)] sm:text-6xl">
                        {results.primary.name}
                      </h2>
                    </div>
                    <p className="max-w-2xl text-lg leading-8 text-[rgba(46,34,28,0.8)]">
                      {results.primary.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {results.primary.traits.map((trait) => (
                        <span
                          key={trait}
                          className="rounded-full border border-[rgba(87,61,42,0.14)] bg-[rgba(249,243,235,0.86)] px-3 py-1.5 text-sm capitalize text-[rgba(73,52,39,0.74)]"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 rounded-[28px] bg-[rgba(247,238,226,0.88)] p-6">
                    <p className="text-sm uppercase tracking-[0.22em] text-[rgba(73,52,39,0.56)]">
                      NovaBrew should send you
                    </p>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h3 className="font-display text-3xl text-[var(--foreground)]">
                          {results.primary.coffee.name}
                        </h3>
                        <p className="mt-2 text-sm font-medium text-[rgba(73,52,39,0.68)]">
                          {results.primary.coffee.notes}
                        </p>
                      </div>
                      <span className="rounded-full border border-[rgba(87,61,42,0.14)] bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[rgba(73,52,39,0.62)]">
                        Personalized recommendation
                      </span>
                    </div>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-[rgba(58,41,32,0.82)]">
                      {results.primary.coffee.description}
                    </p>
                  </div>
                </section>

                <section className="grid gap-6">
                  <article className="warm-card fine-line rounded-[30px] bg-[rgba(89,61,43,0.95)] p-6 text-[#f7f0e7] sm:p-8">
                    <div className="space-y-2">
                      <p className="text-sm uppercase tracking-[0.22em] text-white/56">
                        Full breakdown
                      </p>
                      <h3 className="font-display text-3xl sm:text-4xl">
                        Your taste mix
                      </h3>
                    </div>

                    <div className="mt-7 space-y-5">
                      {results.breakdown.map((profile) => (
                        <div key={profile.key} className="space-y-2">
                          <div className="flex items-end justify-between gap-4">
                            <div>
                              <p className="text-base font-semibold text-white">
                                {profile.name}
                              </p>
                              <p className="text-sm text-white/60">
                                {profile.headline}
                              </p>
                            </div>
                            <span className="text-2xl font-semibold">
                              {profile.percentage}%
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${profile.percentage}%`,
                                backgroundColor: profile.accent,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="warm-card fine-line rounded-[30px] bg-white/78 p-6 sm:p-8">
                    <p className="text-sm uppercase tracking-[0.22em] text-[rgba(73,52,39,0.56)]">
                      What this prototype proves
                    </p>
                    <p className="mt-4 text-base leading-7 text-[rgba(58,41,32,0.82)]">
                      NovaBrew can turn a generic sign-up flow into something
                      more personal in under two minutes. The result is a
                      stronger first impression and a recommendation story the
                      founders can actually show to stakeholders.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={handleRetake}
                        className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#fbf6ef] transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a2922]"
                      >
                        Retake quiz
                      </button>
                      <button
                        type="button"
                        onClick={handleStart}
                        className="inline-flex items-center justify-center rounded-full border border-[rgba(87,61,42,0.16)] bg-[rgba(249,243,235,0.9)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[rgba(58,41,32,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
                      >
                        Try a new path
                      </button>
                    </div>
                  </article>
                </section>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {selectedProfile ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(34,24,19,0.48)] px-4 py-6 backdrop-blur-sm">
          <div className="panel-surface fine-line warm-card relative w-full max-w-2xl rounded-[30px] bg-[rgba(255,251,246,0.96)] p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setSelectedProfile(null)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(87,61,42,0.12)] bg-white/80 text-lg text-[rgba(58,41,32,0.78)] transition hover:bg-white"
              aria-label="Close details"
            >
              ×
            </button>

            <div className="space-y-6">
              <div className="space-y-3">
                <span
                  className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{
                    backgroundColor: selectedProfile.accentSoft,
                    color: selectedProfile.accent,
                  }}
                >
                  {selectedProfile.coffee.name}
                </span>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[rgba(73,52,39,0.52)]">
                    Brew details
                  </p>
                  <h2 className="font-display text-3xl text-[var(--foreground)] sm:text-4xl">
                    {selectedProfile.name}
                  </h2>
                </div>
                <p className="text-base leading-7 text-[rgba(58,41,32,0.82)]">
                  {selectedProfile.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] bg-[rgba(247,238,226,0.9)] p-5">
                  <p className="text-sm uppercase tracking-[0.22em] text-[rgba(73,52,39,0.52)]">
                    Tasting notes
                  </p>
                  <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">
                    {selectedProfile.coffee.notes}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[rgba(58,41,32,0.8)]">
                    {selectedProfile.coffee.description}
                  </p>
                </div>

                <div className="rounded-[24px] bg-white/80 p-5">
                  <p className="text-sm uppercase tracking-[0.22em] text-[rgba(73,52,39,0.52)]">
                    Personality traits
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedProfile.traits.map((trait) => (
                      <span
                        key={trait}
                        className="rounded-full border border-[rgba(87,61,42,0.12)] bg-[rgba(249,243,235,0.92)] px-3 py-1.5 text-sm capitalize text-[rgba(73,52,39,0.74)]"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[rgba(58,41,32,0.8)]">
                    Best for subscribers who want their first bag to feel intentional, not random.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleStart}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#fbf6ef] transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a2922]"
                >
                  Start quiz with this vibe
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProfile(null)}
                  className="inline-flex items-center justify-center rounded-full border border-[rgba(87,61,42,0.16)] bg-[rgba(249,243,235,0.9)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[rgba(58,41,32,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
