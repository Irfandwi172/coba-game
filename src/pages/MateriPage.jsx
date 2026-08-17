import React, { useEffect, useRef, useState } from "react";
import BackButton from "../components/BackButton";
import "./MateriPage.css";

export default function MateriPage({ level, onStartQuiz, onBack }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Setiap ganti level (atau pertama kali dibuka), audio yang lama
  // dihentikan, lalu audio yang baru otomatis diputar.
  //
  // Trik "mute lalu unmute": mulai audio dalam keadaan BISU dulu
  // (ini SELALU diizinkan browser, nggak butuh interaksi user sama
  // sekali), baru sepersekian detik kemudian di-unmute lewat kode.
  // Ini biasanya lolos di browser yang masih blokir play() langsung
  // dengan suara.
  useEffect(() => {
    setIsPlaying(false);
    const audioEl = audioRef.current;
    if (audioEl && level.materi.audio) {
      audioEl.currentTime = 0;
      audioEl.muted = true;
      audioEl
        .play()
        .then(() => {
          // baru unmute SETELAH play() berhasil jalan (walau senyap)
          audioEl.muted = false;
          setIsPlaying(true);
        })
        .catch(() => {
          // Kalau ini pun masih ditolak browser, biarkan user klik
          // tombol 🔊 secara manual.
          setIsPlaying(false);
        });
    }
    return () => {
      if (audioEl) audioEl.pause();
    };
  }, [level.materi.audio]);

  function toggleAudio() {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    if (isPlaying) {
      audioEl.pause();
      setIsPlaying(false);
    } else {
      audioEl.play();
      setIsPlaying(true);
    }
  }

  function handleBack() {
    if (audioRef.current) audioRef.current.pause();
    onBack();
  }

  function handleStartQuiz() {
    if (audioRef.current) audioRef.current.pause();
    onStartQuiz();
  }

  return (
    <div
      className="scene materi-scene"
      style={{
        backgroundImage: `url(${level.background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        margin: "0 auto",
        maxWidth: "1610px",
      }}
    >
      <div
        className="content-materi"
        style={{ backgroundImage: `url(${level.backgroundMateri})` }}
      >
        <BackButton onClick={handleBack} />

        {level.materi.audio && (
          <audio
            ref={audioRef}
            src={level.materi.audio}
            onEnded={() => setIsPlaying(false)}
          />
        )}

        <div className="materi-main">
          <div className="materi-emoji">{level.materi.imageEmoji}</div>
          <h2 className="gh-title card-title">{level.title}</h2>
          <div className="gh-body card-subtitle">{level.subtitle}</div>
          <p className="gh-body card-text">{level.materi.text}</p>
          <button className="gh-btn gh-body btn-primary" onClick={handleStartQuiz}>
            Mulai Kuis
          </button>
          {level.materi.audio && (
            <button
              className="gh-btn gh-body btn-secondary materi-audio-btn"
              onClick={toggleAudio}
              aria-label={isPlaying ? "Jeda audio" : "Putar audio"}
            >
              {isPlaying ? "⏸️ Jeda Audio" : "🔊 Putar Audio"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}