import BackButton from "../components/BackButton";
import "./MateriPage.css";

export default function MateriPage({ level, onStartQuiz, onBack }) {
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
      <BackButton onClick={onBack} />
      <div
        className="content-materi"
        style={{ backgroundImage: `url(${level.backgroundMateri})` }}
      >
        <div className="materi-main">
          <div className="materi-emoji">{level.materi.imageEmoji}</div>
          <h2 className="gh-title card-title">{level.title}</h2>
          <div className="gh-body card-subtitle">{level.subtitle}</div>
          <p className="gh-body card-text">{level.materi.text}</p>
          <button className="gh-btn gh-body btn-primary" onClick={onStartQuiz}>
            Mulai Kuis
          </button>
        </div>
      </div>
    </div>
  );
}
