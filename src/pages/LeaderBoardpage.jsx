import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { fetchLeaderboard } from "../utils/Leaderboardapi";
import { GENIALLY_URL } from "../data/levelData";
import "./LeaderBoardpage.css";

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}m ${s}s`;
}

export default function LeaderboardPage({ onBack }) {
  const [data, setData] = useState(null); // null = masih loading
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    fetchLeaderboard()
      .then((rows) => {
        if (alive) setData(rows);
      })
      .catch(() => {
        if (alive) setError("Gagal memuat leaderboard. Cek koneksi internet atau coba lagi nanti.");
      });
    return () => {
      alive = false;
    };
  }, []);

  function goToGenially() {
    window.location.href = GENIALLY_URL;
  }

  return (
    <div className="scene">
      <div className="sky" />
      <div className="ground" />

      <div className="center-card-wrap">
        <div className="parchment-card leaderboard-card">
          <BackButton onClick={onBack} />
          <h2 className="gh-title card-title">🏆 Leaderboard</h2>
          <div className="gh-body card-subtitle">Ranking bintang tertinggi, waktu tercepat</div>

          {error && <p className="gh-body card-text">{error}</p>}
          {!error && data === null && <p className="gh-body card-text">Memuat data...</p>}
          {!error && data && data.length === 0 && (
            <p className="gh-body card-text">
              Belum ada yang menyelesaikan semua level. Jadilah yang pertama!
            </p>
          )}

          {!error && data && data.length > 0 && (
            <ol className="leaderboard-list gh-body">
              {data.map((row, i) => (
                <li key={row.nama + i} className={`leaderboard-row ${i < 3 ? `rank-${i + 1}` : ""}`}>
                  <span className="leaderboard-rank">#{i + 1}</span>
                  <span className="leaderboard-name">{row.nama}</span>
                  <span className="leaderboard-stars">⭐ {row.bintang}</span>
                  <span className="leaderboard-time">{formatTime(row.waktu)}</span>
                </li>
              ))}
            </ol>
          )}

          <button className="btn-genially" onClick={goToGenially}>
            Ke Genially
          </button>
        </div>
      </div>
    </div>
  );
}