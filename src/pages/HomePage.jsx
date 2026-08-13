import React from "react";
import { PlayIcon, BookIcon } from "../components/Icons";
import "./HomePage.css";
import bgHome from "../assets/bg-image-home.png";

export default function HomePage({ onStart, onGuide, onLeaderboard }) {
  return (
    <div className="scene home-scene" style={{ backgroundImage: `url(${bgHome})` }}>
      <div className="home-content">
        <h1 className="gh-title home-title">
          <span className="home-title-line">PETUALANGAN</span>
          <span className="home-title-line">BINTANG</span>
        </h1>
        <div className="btn-col">
          <button className="gh-btn gh-body btn-primary" onClick={onStart}>
            <PlayIcon /> <span>MULAI</span>
          </button>
          <button className="gh-btn gh-body btn-secondary" onClick={onGuide}>
            <BookIcon /> <span>PETUNJUK</span>
          </button>
          <button className="gh-btn gh-body btn-secondary" onClick={onLeaderboard}>
            <span>🏆 LEADERBOARD</span>
          </button>
        </div>
      </div>
    </div>
  );
}