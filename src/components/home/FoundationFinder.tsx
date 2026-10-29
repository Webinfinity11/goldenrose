"use client";

import Link from "@/components/Link";
import { useState } from "react";
import { fill } from "@/i18n";
import { useT } from "@/i18n/client";
import { productUrl } from "@/lib/format";

type Option = { name: string; slug: string };

/**
 * Four-step quiz that suggests a foundation, with the same rules as the design's script.
 * Answers are option indexes, so the rules don't depend on the language:
 * coverage 0 light · 1 medium · 2 full; finish 0 natural · 1 matte · 2 radiant;
 * skin 0 fair … 4 deep; undertone 0 cool · 1 neutral · 2 warm.
 */
export function FoundationFinder({ eyebrow, title, text, foundations }: { eyebrow: string; title: string; text: string; foundations: Option[] }) {
  const { layout } = useT();
  const t = layout.finder;
  const questions = t.questions;
  const [answers, setAnswers] = useState<number[]>([]);
  const step = answers.length;

  const suggest = (): { pick?: Option; shade?: string } => {
    const find = (re: RegExp) => foundations.find((f) => re.test(f.name));
    const [coverage, finish, depth, undertone] = answers;
    if (coverage === 2) return { pick: find(/Total Cover/i) ?? foundations[0] };
    if (coverage === 1 && finish === 1) return { pick: find(/Stay Soft/i) ?? foundations[0] };
    const shade = undertone === 1 && depth < 3 ? "102 Neutral" : depth === 0 ? "101 Beige" : depth === 1 ? "103 Nude" : "104 Warm Honey";
    return { pick: find(/Skin Perfector/i) ?? foundations[0], shade };
  };

  return (
    <section className="finder" aria-label={title}>
      <div className="finder-card">
        <div className="finder-heading">
          <strong>{eyebrow}</strong>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div id="quiz-content" aria-live="polite">
          {step < questions.length ? (
            <>
              <small>{fill(t.step, { n: step + 1, total: questions.length })}</small>
              <h3>{questions[step].title}</h3>
              {"description" in questions[step] && <p className="quiz-result-text">{questions[step].description}</p>}
              <div className="quiz-options">
                {questions[step].options.map((o, i) => (
                  <button key={o} type="button" onClick={() => setAnswers([...answers, i])}>
                    {o}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button type="button" className="quiz-back" onClick={() => setAnswers(answers.slice(0, -1))}>
                  {t.back}
                </button>
              )}
            </>
          ) : (
            <>
              <small>{t.matches}</small>
              <h3>{t.ready}</h3>
              <Result labels={answers.map((a, i) => questions[i].options[a])} {...suggest()} reset={() => setAnswers([])} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Result({ labels, pick, shade, reset }: { labels: string[]; pick?: Option; shade?: string; reset: () => void }) {
  const t = useT().layout.finder;
  const [a, b, c, d] = labels;
  return (
    <>
      <p className="quiz-result-text">
        {fill(t.summary, { a, b, c, d })}
        {pick && (
          <>
            <br />
            <strong>{pick.name}</strong>
            {shade && (
              <>
                {" "}
                · {t.suggestedShade} <strong>{shade}</strong>
              </>
            )}
          </>
        )}
      </p>
      <div className="quiz-result-actions">
        {pick && <Link href={productUrl(pick.slug)}>{t.discover}</Link>}
        <button type="button" onClick={reset}>
          {t.restart}
        </button>
      </div>
    </>
  );
}
