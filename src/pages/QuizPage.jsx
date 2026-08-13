import React from "react";
import BackButton from "../components/BackButton";
import { MAX_STARS } from "../data/levelData";
import quizBg1 from "../assets/kuis1.png";
import quizBg2 from "../assets/kuis2.png";
import quizBg3 from "../assets/kuis3.png";
import background from "../assets/bg-question.png";
import "./QuizPage.css";

const LETTERS = ["A", "B", "C", "D", "E"];

// Pemetaan id level -> background kuisnya masing-masing.
// Ganti nama file import di atas kalau nama file asetmu berbeda.
const QUIZ_BACKGROUNDS = {
  1: quizBg1,
  2: quizBg2,
  3: quizBg3,
};

export default function QuizPage({
  level,
  qIndex,
  starCount,
  selectedOptions,
  answered,
  onToggleOption,
  onSubmit,
  onNext,
  onBack,
}) {
  const q = level.questions[qIndex];
  const total = level.questions.length;
  const quizBg = QUIZ_BACKGROUNDS[level.id];
  const pickCount = level.pickCount;
  const isCorrect =
    answered &&
    [...selectedOptions].sort().join(",") === [...q.correct].sort().join(",");

  const sisaPilih = pickCount - selectedOptions.length;
  const hintText =
    pickCount === 1
      ? "Pilih 1 jawaban yang paling tepat."
      : `Pilih ${sisaPilih > 0 ? `${sisaPilih} lagi` : `${pickCount} jawaban`} dari opsi A–${LETTERS[q.options.length - 1]}.`;

  return (
    <div className="scene quiz-scene">
      <div className="quiz-board" style={{ backgroundImage: `url(${quizBg})` }}>
        <div className="quiz-board-back">
          <BackButton onClick={onBack} />
        </div>

        <div className="quiz-progress-pill gh-body">
          <span>
            Soal {qIndex + 1}/{total}
          </span>
          <span className="quiz-progress-stars">
            {Array.from({ length: MAX_STARS }, (_, s) => (
              <span key={s} style={{ opacity: s < starCount ? 1 : 0.35 }}>
                ⭐
              </span>
            ))}
          </span>
        </div>

        <div className="quiz-content-box" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}>
          <h3 className="gh-title quiz-question" style={{ textAlign: "center", marginTop: "10px" }}>
            {q.question}
          </h3>

          {q.image && (
            <img src={q.image} alt="Ilustrasi soal" className="quiz-question-image" />
          )}

          {!answered && (
            <div className="gh-body quiz-hint" style={{ textAlign: "center", marginTop: "10px" }}>
              {hintText}
            </div>
          )}
          {answered && (
            <div
              className={`quiz-feedback gh-body ${isCorrect ? "feedback-correct" : "feedback-wrong"}`}
            >
              {isCorrect ? "Benar! ✓" : "Kurang tepat ✗"}
            </div>
          )}
        </div>

        <div className="quiz-options-col">
          {q.options.map((opt, idx) => {
            const letter = LETTERS[idx];
            const isSelected = selectedOptions.includes(idx);
            const isCorrectOption = q.correct.includes(idx);

            let stateClass = "";
            if (answered) {
              if (isCorrectOption) stateClass = "option-correct";
              else if (isSelected) stateClass = "option-wrong";
            } else if (isSelected) {
              stateClass = "option-selected";
            }

            return (
              <button
                key={idx}
                className={`gh-btn gh-body quiz-option ${stateClass}`}
                onClick={() => onToggleOption(idx)}
                disabled={answered}
              >
                <span className="quiz-option-letter">{letter}</span>
                <span className="quiz-option-text">{opt}</span>
              </button>
            );
          })}
        </div>

        <div className="quiz-action-row">
          {!answered && (
            <button
              className="gh-btn gh-body btn-primary"
              onClick={onSubmit}
              disabled={selectedOptions.length !== pickCount}
            >
              Jawab
            </button>
          )}
          {answered && (
            <button className="gh-btn gh-body btn-primary" onClick={onNext}>
              {qIndex + 1 < total ? "Lanjut" : "Lihat Hasil"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}