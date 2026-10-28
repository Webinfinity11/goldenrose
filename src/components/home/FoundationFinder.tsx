"use client";

import Link from "next/link";
import { useState } from "react";
import { productUrl } from "@/lib/format";

type Option = { name: string; slug: string };

const questions = [
  { title: "How much coverage do you want?", options: ["Light", "Medium", "Full"] },
  { title: "What finish do you prefer?", options: ["Natural", "Matte", "Radiant"] },
  { title: "Which is closest to your skin tone?", options: ["Fair", "Fair-Medium", "Medium", "Medium-Deep", "Deep"] },
  {
    title: "What is your undertone?",
    options: ["Cool", "Neutral", "Warm"],
    description: "Cool: blue-purple veins · Neutral: blue-green veins · Warm: green veins",
  },
];

/** Four-step quiz that suggests a foundation, with the same rules as the design's script. */
export function FoundationFinder({ eyebrow, title, text, foundations }: { eyebrow: string; title: string; text: string; foundations: Option[] }) {
  const [answers, setAnswers] = useState<string[]>([]);
  const step = answers.length;

  const suggest = () => {
    const find = (re: RegExp) => foundations.find((f) => re.test(f.name));
    const depth = questions[2].options.indexOf(answers[2]);
    let pick: Option | undefined;
    if (answers[0] === "Full") pick = find(/Total Cover/i);
    else if (answers[0] === "Medium" && answers[1] === "Matte") pick = find(/Stay Soft/i);
    else {
      const shade = answers[3] === "Neutral" && depth < 3 ? "102" : depth === 0 ? "101" : depth === 1 ? "103" : "104";
      pick = find(new RegExp(`Skin Perfector.*${shade}`));
    }
    return pick ?? foundations[0];
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
              <small>
                STEP {step + 1} / {questions.length}
              </small>
              <h3>{questions[step].title}</h3>
              {questions[step].description && <p className="quiz-result-text">{questions[step].description}</p>}
              <div className="quiz-options">
                {questions[step].options.map((o) => (
                  <button key={o} type="button" onClick={() => setAnswers([...answers, o])}>
                    {o}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button type="button" className="quiz-back" onClick={() => setAnswers(answers.slice(0, -1))}>
                  ← Previous Step
                </button>
              )}
            </>
          ) : (
            <Result answers={answers} pick={suggest()} reset={() => setAnswers([])} />
          )}
        </div>
      </div>
    </section>
  );
}

function Result({ answers, pick, reset }: { answers: string[]; pick?: Option; reset: () => void }) {
  return (
    <>
      <small>YOUR MATCHES</small>
      <h3>Your foundation suggestion is ready</h3>
      <p className="quiz-result-text">
        {answers[0]} coverage · {answers[1]} finish · {answers[2]} skin · {answers[3]} undertone
        {pick && (
          <>
            <br />
            <strong>{pick.name}</strong>
          </>
        )}
      </p>
      <div className="quiz-result-actions">
        {pick && <Link href={productUrl(pick.slug)}>Discover the Product</Link>}
        <button type="button" onClick={reset}>
          Start Over
        </button>
      </div>
    </>
  );
}
