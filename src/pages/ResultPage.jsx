import React from "react";
import { GENIALLY_URL, GENIALLY_MAP_URL, MAX_STARS, PASS_THRESHOLD } from "../data/levelData";
import "./ResultPage.css";
import bgResult from "../assets/bgmateri.png";

export default function ResultPage({
  starCount,
  passed,
  isLast,
  activeLevel,
  onRetry,
  onNextLevel,
  onBackToMap,
}) {
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
          <button className="gh-btn gh-body btn-secondary" onClick={onRetry}>
            Ulangi
          </button>

          {/* Percobaan: level 1 selesai -> redirect keluar ke peta Genially */}
          {passed && activeLevel === 0 && (
            <button
              className="gh-btn gh-body btn-primary"
              onClick={onNextLevel}
            >
              Selanjutnya
            </button>
          )}

          {passed && !isLast && activeLevel !== 0 && (
            <button className="gh-btn gh-body btn-primary" onClick={onNextLevel}>
              Level Berikutnya
            </button>
          )}

          {passed && isLast ? (
            <button
              className="gh-btn gh-body btn-primary"
              onClick={() => {
                window.location.href = GENIALLY_URL;
              }}
            >
              Selesai
            </button>
          ) : (
            !(passed && activeLevel === 0) && (
              <button className="gh-btn gh-body btn-primary" onClick={onBackToMap}>
                Kembali ke Peta
              </button>
            )
          )}
        </div>
        </div>
      </div>
    </div>
  );
}