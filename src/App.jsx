import React, { useState, useEffect } from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import NamePage from "./pages/NamePage";
import GuidePage from "./pages/GuidePage";
import MapPage from "./pages/MapPage";
import MateriPage from "./pages/MateriPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import LeaderboardPage from "./pages/LeaderBoardpage";

import { LEVEL_DATA, MAX_STARS, PASS_THRESHOLD } from "./data/levelData";
import {
  getSavedName,
  saveName,
  getSavedProgress,
  saveProgress,
  getOrSetStartTime,
  hasSubmittedLeaderboard,
  markLeaderboardSubmitted,
} from "./utils/storage";
import { submitScore } from "./utils/Leaderboardapi";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [playerName, setPlayerName] = useState(() => getSavedName());
  const [progress, setProgress] = useState(() => getSavedProgress(LEVEL_DATA.length));

  const [activeLevel, setActiveLevel] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [starCount, setStarCount] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answered, setAnswered] = useState(false);

  // simpan progres tiap kali berubah
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const isUnlocked = (i) => i === 0 || progress[i - 1] >= PASS_THRESHOLD;

  function handleStartClick() {
    // kalau belum pernah isi nama, minta isi dulu; kalau sudah ada, langsung ke peta
    if (playerName) {
      getOrSetStartTime(); // jaga-jaga kalau belum pernah ke-set
      setScreen("map");
    } else {
      setScreen("name");
    }
  }

  function handleNameSubmit(name) {
    setPlayerName(name);
    saveName(name);
    getOrSetStartTime(); // mulai hitung waktu dari sini
    setScreen("map");
  }

  function openLevel(i) {
    if (!isUnlocked(i)) return;
    setActiveLevel(i);
    setScreen("materi");
  }

  function startQuiz() {
    setQIndex(0);
    setStarCount(0);
    setSelectedOptions([]);
    setAnswered(false);
    setScreen("quiz");
  }

  function toggleOption(idx) {
    if (answered) return;
    const pickCount = LEVEL_DATA[activeLevel].pickCount;
    setSelectedOptions((prev) => {
      if (prev.includes(idx)) {
        return prev.filter((v) => v !== idx);
      }
      if (pickCount === 1) return [idx]; // single-select: ganti pilihan langsung
      if (prev.length >= pickCount) return prev; // sudah penuh, jangan tambah lagi
      return [...prev, idx];
    });
  }

  function submitAnswer() {
    const pickCount = LEVEL_DATA[activeLevel].pickCount;
    if (answered || selectedOptions.length !== pickCount) return;
    const q = LEVEL_DATA[activeLevel].questions[qIndex];
    const chosenSorted = [...selectedOptions].sort();
    const correctSorted = [...q.correct].sort();
    const isCorrect =
      chosenSorted.length === correctSorted.length &&
      chosenSorted.every((v, i) => v === correctSorted[i]);
    setAnswered(true);
    if (isCorrect) setStarCount((s) => Math.min(MAX_STARS, s + 1));
  }

  function nextQuestion() {
    const total = LEVEL_DATA[activeLevel].questions.length;
    if (qIndex + 1 < total) {
      setQIndex(qIndex + 1);
      setSelectedOptions([]);
      setAnswered(false);
    } else {
      setProgress((p) => {
        const copy = [...p];
        copy[activeLevel] = Math.max(copy[activeLevel], starCount);
        return copy;
      });

      // kalau ini level terakhir dan lulus, kirim skor ke leaderboard
      const isLastLevel = activeLevel === LEVEL_DATA.length - 1;
      const passedThisLevel = starCount >= PASS_THRESHOLD;
      if (isLastLevel && passedThisLevel && !hasSubmittedLeaderboard()) {
        const finalProgress = [...progress];
        finalProgress[activeLevel] = Math.max(finalProgress[activeLevel], starCount);
        const totalBintang = finalProgress.reduce((a, b) => a + b, 0);
        const startTime = getOrSetStartTime();
        const waktuDetik = Math.max(1, Math.round((Date.now() - startTime) / 1000));
        submitScore({ nama: playerName || "Tanpa Nama", bintang: totalBintang, waktu: waktuDetik });
        markLeaderboardSubmitted();
      }

      setScreen("result");
    }
  }

  function backToMap() {
    setScreen("map");
  }

  return (
    <div className="gh-app">
      {screen === "home" && (
        <HomePage
          onStart={handleStartClick}
          onGuide={() => setScreen("guide")}
          onLeaderboard={() => setScreen("leaderboard")}
        />
      )}

      {screen === "leaderboard" && <LeaderboardPage onBack={() => setScreen("home")} />}

      {screen === "name" && <NamePage onSubmit={handleNameSubmit} />}

      {screen === "guide" && <GuidePage onBack={() => setScreen("home")} />}

      {screen === "map" && (
        <MapPage
          playerName={playerName}
          progress={progress}
          isUnlocked={isUnlocked}
          onOpenLevel={openLevel}
          onHome={() => setScreen("home")}
        />
      )}

      {screen === "materi" && (
        <MateriPage level={LEVEL_DATA[activeLevel]} onStartQuiz={startQuiz} onBack={backToMap} />
      )}

      {screen === "quiz" && (
        <QuizPage
          level={LEVEL_DATA[activeLevel]}
          qIndex={qIndex}
          starCount={starCount}
          selectedOptions={selectedOptions}
          answered={answered}
          onToggleOption={toggleOption}
          onSubmit={submitAnswer}
          onNext={nextQuestion}
          onBack={backToMap}
        />
      )}

      {screen === "result" && (
        <ResultPage
          starCount={starCount}
          passed={starCount >= PASS_THRESHOLD}
          isLast={activeLevel === LEVEL_DATA.length - 1}
          activeLevel={activeLevel}
          onRetry={startQuiz}
          onNextLevel={() => openLevel(activeLevel + 1)}
          onBackToMap={backToMap}
        />
      )}
    </div>
  );
}