import React, { useState } from "react";
import "./NamePage.css";

export default function NamePage({ onSubmit }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Nama tidak boleh kosong ya!");
      return;
    }
    onSubmit(trimmed);
  }

  return (
    <div className="scene name-scene">
        <div className="name-emoji">🧭</div>
        <h2 className="gh-title card-title">Siapa Namamu?</h2>
        <p className="gh-body card-text">
          Tuliskan namamu dulu sebelum memulai petualangan, supaya progresmu bisa tersimpan.
        </p>
        <form onSubmit={handleSubmit} className="name-form">
          <input
            type="text"
            className="gh-body name-input"
            placeholder="Tulis namamu di sini..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            maxLength={30}
            autoFocus
          />
          {error && <div className="name-error gh-body">{error}</div>}
          <button type="submit" className="gh-btn gh-body btn-primary name-submit-btn">
            Mulai Petualangan
          </button>
        </form>
    </div>
  );
}
