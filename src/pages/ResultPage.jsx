import React from "react";
import { GENIALLY_URL, GENIALLY_MAP_URL, MAX_STARS, PASS_THRESHOLD } from "../data/levelData";
import "./ResultPage.css";
import bgResult from "../assets/bgmateri.png";
import ulangi from "../assets/retrybutton.png";
import next from "../assets/nextbutton.png";
import peta from "../assets/peta.png";
import leaderboard from "../assets/leaderboard.png";

export default function ResultPage({
  starCount,
  passed,
  isLast,
  activeLevel,
  onRetry,
  onNextLevel,
  onBackToMap,
  onLeaderboard,
}) {
  const gameFullyCompleted = passed && isLast;

  return (
    <div
      className="scene"
      style={{
        backgroundImage: `url(${bgResult})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="center-card-wrap">
        <div className="parchment-card">
        <div className="result-stars">
          {Array.from({ length: MAX_STARS }, (_, s) => (
            <span key={s} style={{ fontSize: 40, opacity: s < starCount ? 1 : 0.25 }}>
              ⭐
            </span>
          ))}
        </div>
        <h2 className="gh-title card-title">
          {passed ? (isLast ? "Harta Ditemukan!" : "Level Selesai!") : "Coba Lagi Yuk"}
        </h2>
        <div className="gh-body card-subtitle">{starCount} / {MAX_STARS} bintang</div>
        <p className="gh-body card-text">
          {passed
            ? "Kerja bagus! Kamu berhasil mengumpulkan cukup bintang."
            : `Kumpulkan minimal ${PASS_THRESHOLD} dari ${MAX_STARS} bintang untuk membuka level berikutnya.`}
        </p>

        <div className="action-row">
          {/* Tombol Ulangi disembunyikan kalau game sudah tuntas
              (level terakhir + lulus) - nggak ada gunanya lagi diulang */}
          {!gameFullyCompleted && (
            <button className="action-btn" onClick={onRetry}>
              <img src={ulangi} alt="" />
            </button>
          )}

          {/* Percobaan: level 1 selesai -> redirect keluar ke peta Genially */}
          {passed && activeLevel === 0 && (
            <button
              className="action-btn"
              onClick={onNextLevel}
            >
              <img src={next} alt="" />
            </button>
          )}

          {passed && !isLast && activeLevel !== 0 && (
           <button
              className="action-btn"
              onClick={onNextLevel}
            >
              <img src={next} alt="" />
            </button>
          )}

          {gameFullyCompleted && (
            <button className="leaderboard-btn" onClick={onLeaderboard}>
            <img src={leaderboard} alt="" />
            <h3>Lihat Leaderboard</h3>
          </button>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}