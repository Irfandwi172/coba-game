import React from "react";
import petunjuk from "../assets/petunjuk.png";
import BackButton from "../components/BackButton";
import "./GuidePage.css";

export default function GuidePage({ onBack }) {
  return (
    <div className="scene guide-scene" style={{ backgroundImage: `url(${petunjuk})` }}>
      <BackButton onClick={onBack} />
      <div className="guide-content">
        <h2 className="gh-title card-title">Cara Bermain</h2>
        <ul className="gh-body guide-list">
          <li>Klik pulau di peta untuk membuka materi & kuis level itu.</li>
          <li>Baca materinya dulu, lalu klik "Mulai Kuis".</li>
          <li>Jawab 5 soal — tiap jawaban benar menambah 1 bintang (maksimal 3).</li>
          <li>Kumpulkan bintang penuh (3/3) untuk membuka level berikutnya.</li>
          <li>Kalau belum penuh, kamu bisa mengulang levelnya kapan saja.</li>
        </ul>
      </div>
    </div>
  );
}