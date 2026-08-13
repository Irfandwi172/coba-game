import React from "react";
import back from "../assets/iconBack.png";

export default function BackButton({ onClick }) {
  return (
    <button className="gh-btn gh-body back-btn" onClick={onClick}>
      <img src={back} alt="" />
    </button>
  );
}