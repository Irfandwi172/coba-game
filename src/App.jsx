import React, { useState } from "react";

/*
  PETUALANGAN BINTANG — GAME EDUKASI
  ------------------------------------
  Struktur: Home -> Peta (5 level) -> Materi -> Kuis (5 soal, feedback
  langsung di halaman yang sama) -> Hasil (bintang, cap maksimal 3).

  CARA GANTI MATERI KAMU SENDIRI:
  Edit array LEVEL_DATA di bawah. Tiap level punya:
    - title, subtitle       : nama pulau/level
    - materi.text           : bacaan materi (teks)
    - materi.imageEmoji     : ilustrasi sederhana (ganti emoji sesuai tema)
    - questions[]           : 5 soal, tiap soal { question, options: [4], correct: index }

  ATURAN BINTANG:
  Tiap jawaban benar menambah 1 bintang, tapi maksimal berhenti di 3.
  Minimal 3 bintang (penuh) untuk membuka level berikutnya.
*/

const LEVEL_DATA = [
  {
    id: 1,
    title: "Pantai Berbisik",
    subtitle: "Ekosistem Pantai",
    materi: {
      text: "Pantai adalah daerah pertemuan antara daratan dan lautan yang dipengaruhi oleh pasang surut air laut. Di ekosistem pantai, kita bisa menemukan berbagai makhluk hidup seperti kepiting, burung camar, dan tumbuhan seperti pandan laut. Hewan-hewan ini punya cara unik untuk bertahan hidup, misalnya kepiting yang bersembunyi di pasir saat air laut surut.",
      imageEmoji: "🏖️",
    },
    questions: [
      { question: "Apa ciri utama ekosistem pantai?", options: ["Pertemuan daratan dan lautan yang dipengaruhi pasang surut", "Curah hujan sangat tinggi sepanjang tahun", "Daerah beku tertutup es", "Padang rumput luas tanpa pohon"], correct: 0 },
      { question: "Contoh hewan yang hidup di ekosistem pantai adalah...", options: ["Unta", "Kepiting", "Serigala", "Panda"], correct: 1 },
      { question: "Mengapa kepiting sering bersembunyi di pasir?", options: ["Mencari makanan di dalam tanah", "Menghindari matahari dan predator saat air surut", "Tidak suka air laut", "Membuat sarang permanen"], correct: 1 },
      { question: "Tumbuhan yang biasa ditemukan di pantai adalah...", options: ["Pandan laut", "Kaktus gurun", "Cemara pegunungan", "Bunga tulip"], correct: 0 },
      { question: "Apa yang dimaksud dengan pasang surut?", options: ["Perubahan suhu air laut", "Naik turunnya permukaan air laut secara berkala", "Gelombang besar akibat badai", "Aliran sungai menuju laut"], correct: 1 },
    ],
  },
  {
    id: 2,
    title: "Hutan Rimbun",
    subtitle: "Ekosistem Hutan",
    materi: {
      text: "Hutan adalah ekosistem darat yang dipenuhi pepohonan lebat dan menjadi rumah bagi jutaan spesies. Hutan hujan tropis, seperti yang ada di Indonesia, punya kelembapan tinggi dan curah hujan besar sepanjang tahun. Hutan berperan penting sebagai paru-paru dunia karena menghasilkan oksigen dan menyerap karbon dioksida.",
      imageEmoji: "🌳",
    },
    questions: [
      { question: "Fungsi utama hutan bagi bumi disebut sebagai...", options: ["Paru-paru dunia", "Gudang air asin", "Pabrik es alami", "Sumber angin topan"], correct: 0 },
      { question: "Ciri khas hutan hujan tropis adalah...", options: ["Kering sepanjang tahun", "Kelembapan dan curah hujan tinggi", "Selalu tertutup salju", "Tidak memiliki pohon"], correct: 1 },
      { question: "Proses tumbuhan menyerap CO2 dan menghasilkan oksigen disebut...", options: ["Respirasi", "Fotosintesis", "Fermentasi", "Evaporasi"], correct: 1 },
      { question: "Berikut yang BUKAN manfaat hutan adalah...", options: ["Menyimpan cadangan air", "Habitat hewan liar", "Mencegah erosi tanah", "Meningkatkan polusi udara"], correct: 3 },
      { question: "Indonesia punya hutan hujan tropis luas, salah satunya di pulau...", options: ["Kalimantan", "Greenland", "Antartika", "Kepulauan Kanari"], correct: 0 },
    ],
  },
  {
    id: 3,
    title: "Padang Savana",
    subtitle: "Ekosistem Savana",
    materi: {
      text: "Savana adalah padang rumput luas dengan sedikit pohon, biasanya ditemukan di daerah tropis dengan musim kemarau panjang. Savana menjadi habitat bagi hewan-hewan besar seperti zebra, singa, dan gajah yang beradaptasi dengan kondisi kering.",
      imageEmoji: "🦁",
    },
    questions: [
      { question: "Ciri utama ekosistem savana adalah...", options: ["Padang rumput luas dengan sedikit pohon", "Hutan lebat sepanjang tahun", "Dasar laut yang dalam", "Tertutup salju sepanjang tahun"], correct: 0 },
      { question: "Hewan yang khas hidup di savana Afrika adalah...", options: ["Beruang kutub", "Singa dan zebra", "Penguin", "Paus biru"], correct: 1 },
      { question: "Savana biasanya memiliki musim kemarau yang...", options: ["Sangat singkat", "Panjang", "Tidak pernah terjadi", "Selalu basah"], correct: 1 },
      { question: "Mengapa pohon di savana jarang ditemukan?", options: ["Kondisi kering membatasi pertumbuhan pohon", "Terlalu banyak hujan", "Tanahnya selalu beku", "Manusia menanam terlalu banyak rumput"], correct: 0 },
      { question: "Savana banyak ditemukan di benua...", options: ["Afrika", "Antartika", "Eropa Utara", "Asia Tengah bagian kutub"], correct: 0 },
    ],
  },
  {
    id: 4,
    title: "Gunung Berkabut",
    subtitle: "Ekosistem Gunung",
    materi: {
      text: "Ekosistem gunung memiliki suhu yang semakin dingin seiring bertambahnya ketinggian. Di lereng gunung yang tinggi, vegetasi berubah dari hutan lebat menjadi semak-semak kecil, hingga akhirnya menjadi area berbatu tanpa tumbuhan di puncak yang sangat tinggi.",
      imageEmoji: "⛰️",
    },
    questions: [
      { question: "Semakin tinggi sebuah gunung, suhu udaranya cenderung semakin...", options: ["Panas", "Dingin", "Lembap tanpa perubahan", "Stabil selalu 30°C"], correct: 1 },
      { question: "Perubahan jenis tumbuhan sesuai ketinggian disebut...", options: ["Zonasi vegetasi", "Rotasi tanaman", "Fotosintesis", "Migrasi tumbuhan"], correct: 0 },
      { question: "Di puncak gunung yang sangat tinggi, biasanya kita menemukan...", options: ["Hutan hujan lebat", "Area berbatu dengan sedikit tumbuhan", "Sawah yang subur", "Terumbu karang"], correct: 1 },
      { question: "Salah satu tantangan hidup di gunung tinggi adalah...", options: ["Udara tipis dan dingin", "Udara terlalu panas", "Kelembapan terlalu tinggi", "Terlalu banyak air laut"], correct: 0 },
      { question: "Contoh gunung tinggi terkenal di Indonesia adalah...", options: ["Gunung Jaya Wijaya", "Gunung Fuji", "Gunung Everest", "Gunung Kilimanjaro"], correct: 0 },
    ],
  },
  {
    id: 5,
    title: "Puncak Harta",
    subtitle: "Tantangan Campuran",
    materi: {
      text: "Selamat sudah sampai di level terakhir! Di sini kamu akan diuji dengan pertanyaan campuran dari semua ekosistem yang sudah dipelajari: pantai, hutan, savana, dan gunung. Ingat kembali ciri khas masing-masing ekosistem untuk menyelesaikan tantangan ini!",
      imageEmoji: "🏆",
    },
    questions: [
      { question: "Ekosistem manakah yang dicirikan oleh pertemuan daratan dan lautan?", options: ["Pantai", "Savana", "Gunung", "Gurun"], correct: 0 },
      { question: "Ekosistem yang berfungsi sebagai paru-paru dunia adalah...", options: ["Hutan", "Savana", "Gunung", "Pantai"], correct: 0 },
      { question: "Zebra dan singa adalah hewan khas ekosistem...", options: ["Savana", "Hutan hujan", "Pantai", "Puncak gunung bersalju"], correct: 0 },
      { question: "Semakin tinggi lokasi di gunung, kondisi udaranya menjadi...", options: ["Semakin dingin dan tipis", "Semakin panas dan lembap", "Selalu sama seperti dataran rendah", "Semakin berkabut tapi hangat"], correct: 0 },
      { question: "Keempat ekosistem yang dipelajari menunjukkan bahwa lingkungan bumi itu...", options: ["Beragam dan berbeda karakteristiknya", "Semuanya sama persis", "Hanya ada satu jenis ekosistem", "Tidak memengaruhi makhluk hidup"], correct: 0 },
    ],
  },
];

const MAX_STARS = 3;

// Ganti URL ini sesuai link Genially kamu (halaman yang mau dituju setelah menang)
const GENIALLY_URL = "https://view.genially.com/6a73f94f54076ea3a8962983";

// Untuk percobaan: link Genially yang dituju setelah level 1 selesai (arahkan ke peta level 2 di Genially)
const GENIALLY_MAP_URL = "https://view.genially.com/6a73f94f54076ea3a8962983";

export default function PetualanganBintangGame() {
  const [screen, setScreen] = useState("home");
  const [activeLevel, setActiveLevel] = useState(0);
  const [progress, setProgress] = useState(LEVEL_DATA.map(() => 0));
  const [qIndex, setQIndex] = useState(0);
  const [starCount, setStarCount] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const isUnlocked = (i) => i === 0 || progress[i - 1] >= MAX_STARS;

  function openLevel(i) {
    if (!isUnlocked(i)) return;
    setActiveLevel(i);
    setScreen("materi");
  }
  function startQuiz() {
    setQIndex(0);
    setStarCount(0);
    setSelected(null);
    setAnswered(false);
    setScreen("quiz");
  }
  function selectOption(idx) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const q = LEVEL_DATA[activeLevel].questions[qIndex];
    if (idx === q.correct) setStarCount((s) => Math.min(MAX_STARS, s + 1));
  }
  function nextQuestion() {
    const total = LEVEL_DATA[activeLevel].questions.length;
    if (qIndex + 1 < total) {
      setQIndex(qIndex + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setProgress((p) => {
        const copy = [...p];
        copy[activeLevel] = Math.max(copy[activeLevel], starCount);
        return copy;
      });
      setScreen("result");
    }
  }
  function backToMap() {
    setScreen("map");
  }

  return (
    <div style={S.appWrap}>
      {screen === "home" && (
        <HomeScreen onStart={() => setScreen("map")} onGuide={() => setScreen("guide")} />
      )}
      {screen === "guide" && <GuideScreen onBack={() => setScreen("home")} />}
      {screen === "map" && (
        <MapScreen
          progress={progress}
          isUnlocked={isUnlocked}
          onOpenLevel={openLevel}
          onHome={() => setScreen("home")}
        />
      )}
      {screen === "materi" && (
        <MateriScreen
          level={LEVEL_DATA[activeLevel]}
          onStartQuiz={startQuiz}
          onBack={backToMap}
        />
      )}
      {screen === "quiz" && (
        <QuizScreen
          level={LEVEL_DATA[activeLevel]}
          qIndex={qIndex}
          starCount={starCount}
          selected={selected}
          answered={answered}
          onSelect={selectOption}
          onNext={nextQuestion}
          onBack={backToMap}
        />
      )}
      {screen === "result" && (
        <ResultScreen
          starCount={starCount}
          passed={starCount >= MAX_STARS}
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

/* ---------------- HOME ---------------- */

function HomeScreen({ onStart, onGuide }) {
  return (
    <div style={S.scene}>
      <GlobalStyle />
      <div style={S.sky} />
      <svg style={S.skyline} viewBox="0 0 900 200" preserveAspectRatio="none">
        <rect x="20" y="70" width="60" height="130" fill="#AFC9E3" />
        <rect x="95" y="40" width="50" height="160" fill="#9DBCDC" />
        <rect x="700" y="60" width="55" height="140" fill="#9DBCDC" />
        <rect x="770" y="30" width="45" height="170" fill="#AFC9E3" />
      </svg>
      <div style={S.ground} />
      <div style={S.path} />

      <div style={S.homeContent}>
        <h1 className="gh-title" style={S.title}>
          <span style={S.titleLine}>PETUALANGAN</span>
          <span style={S.titleLine}>BINTANG</span>
        </h1>
        <div style={S.buttonCol}>
          <button className="gh-btn gh-body" style={S.btnPrimary} onClick={onStart}>
            <PlayIcon /> <span>MULAI</span>
          </button>
          <button className="gh-btn gh-body" style={S.btnSecondary} onClick={onGuide}>
            <BookIcon /> <span>PETUNJUK</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function GuideScreen({ onBack }) {
  return (
    <div style={S.scene}>
      <GlobalStyle />
      <div style={S.sky} />
      <div style={S.ground} />
      <div style={S.centerCardWrap}>
        <div style={S.parchmentCard}>
          <BackButton onClick={onBack} />
          <h2 className="gh-title" style={S.cardTitle}>Cara Bermain</h2>
          <ul style={S.guideList} className="gh-body">
            <li>Klik pulau di peta untuk membuka materi & kuis level itu.</li>
            <li>Baca materinya dulu, lalu klik "Mulai Kuis".</li>
            <li>Jawab 5 soal — tiap jawaban benar menambah 1 bintang (maksimal 3).</li>
            <li>Kumpulkan bintang penuh (3/3) untuk membuka level berikutnya.</li>
            <li>Kalau belum penuh, kamu bisa mengulang levelnya kapan saja.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------------- MAP ---------------- */

function MapScreen({ progress, isUnlocked, onOpenLevel, onHome }) {
  const positions = [
    { x: 50, y: 82 },
    { x: 78, y: 64 },
    { x: 50, y: 46 },
    { x: 22, y: 28 },
    { x: 50, y: 10 },
  ];
  const totalStars = progress.reduce((a, b) => a + b, 0);

  return (
    <div style={S.scene}>
      <GlobalStyle />
      <div style={S.sky} />
      <div style={S.ground} />
      <div style={S.mapHeader}>
        <BackButton onClick={onHome} />
        <div className="gh-body" style={S.mapHeaderText}>
          <div style={S.mapTitle}>Peta Petualangan</div>
          <div style={S.mapSubtitle}>⭐ {totalStars} / {LEVEL_DATA.length * MAX_STARS}</div>
        </div>
      </div>

      <div style={S.mapArea}>
        <svg style={S.trailSvg} viewBox="0 0 400 500" preserveAspectRatio="none">
          <path
            d="M200,410 L312,320 L200,230 L88,140 L200,50"
            fill="none"
            stroke="#E0A840"
            strokeWidth="4"
            strokeDasharray="2 12"
            strokeLinecap="round"
          />
        </svg>
        {LEVEL_DATA.map((lvl, i) => {
          const unlocked = isUnlocked(i);
          const stars = progress[i];
          const pos = positions[i];
          return (
            <button
              key={lvl.id}
              className="gh-btn"
              onClick={() => onOpenLevel(i)}
              disabled={!unlocked}
              style={{
                ...S.node,
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                background: unlocked ? "#3F7A5A" : "#9A9A92",
                cursor: unlocked ? "pointer" : "not-allowed",
              }}
            >
              <span className="gh-title" style={S.nodeNumber}>
                {unlocked ? i + 1 : "🔒"}
              </span>
              <div style={S.nodeStars}>
                {[0, 1, 2].map((s) => (
                  <span key={s} style={{ opacity: s < stars ? 1 : 0.3 }}>⭐</span>
                ))}
              </div>
              <div className="gh-body" style={S.nodeLabel}>{lvl.title}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- MATERI ---------------- */

function MateriScreen({ level, onStartQuiz, onBack }) {
  return (
    <div style={S.scene}>
      <GlobalStyle />
      <div style={S.sky} />
      <div style={S.ground} />
      <div style={S.centerCardWrap}>
        <div style={S.parchmentCard}>
          <BackButton onClick={onBack} />
          <div style={S.materiEmoji}>{level.materi.imageEmoji}</div>
          <h2 className="gh-title" style={S.cardTitle}>{level.title}</h2>
          <div className="gh-body" style={S.cardSubtitle}>{level.subtitle}</div>
          <p className="gh-body" style={S.materiText}>{level.materi.text}</p>
          <button className="gh-btn gh-body" style={S.btnPrimary} onClick={onStartQuiz}>
            Mulai Kuis
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- QUIZ ---------------- */

function QuizScreen({ level, qIndex, starCount, selected, answered, onSelect, onNext, onBack }) {
  const q = level.questions[qIndex];
  const total = level.questions.length;

  return (
    <div style={S.scene}>
      <GlobalStyle />
      <div style={S.sky} />
      <div style={S.ground} />
      <div style={S.centerCardWrap}>
        <div style={S.parchmentCard}>
          <BackButton onClick={onBack} />
          <div style={S.quizTopRow}>
            <span className="gh-body" style={S.quizProgress}>Soal {qIndex + 1} / {total}</span>
            <span style={S.quizStars}>
              {[0, 1, 2].map((s) => (
                <span key={s} style={{ opacity: s < starCount ? 1 : 0.3 }}>⭐</span>
              ))}
            </span>
          </div>

          <h3 className="gh-title" style={S.quizQuestion}>{q.question}</h3>

          <div style={S.optionsWrap}>
            {q.options.map((opt, idx) => {
              let bg = "#fff";
              let border = "#D4BC85";
              if (answered) {
                if (idx === q.correct) {
                  bg = "#DCEFD4";
                  border = "#3F7A5A";
                } else if (idx === selected) {
                  bg = "#F6D9D2";
                  border = "#C0523A";
                }
              }
              return (
                <button
                  key={idx}
                  className="gh-btn gh-body"
                  onClick={() => onSelect(idx)}
                  disabled={answered}
                  style={{ ...S.optionBtn, background: bg, borderColor: border }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {answered && (
            <div
              className="gh-body"
              style={{
                ...S.feedback,
                color: selected === q.correct ? "#3F7A5A" : "#C0523A",
              }}
            >
              {selected === q.correct ? "Benar! ✓" : "Salah ✗"}
            </div>
          )}

          {answered && (
            <button className="gh-btn gh-body" style={S.btnPrimary} onClick={onNext}>
              {qIndex + 1 < total ? "Lanjut" : "Lihat Hasil"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- RESULT ---------------- */

function ResultScreen({ starCount, passed, isLast, activeLevel, onRetry, onNextLevel, onBackToMap }) {
  return (
    <div style={S.scene}>
      <GlobalStyle />
      <div style={S.sky} />
      <div style={S.ground} />
      <div style={S.centerCardWrap}>
        <div style={S.parchmentCard}>
          <div style={S.resultStars}>
            {[0, 1, 2].map((s) => (
              <span key={s} style={{ fontSize: 40, opacity: s < starCount ? 1 : 0.25 }}>⭐</span>
            ))}
          </div>
          <h2 className="gh-title" style={S.cardTitle}>
            {passed ? (isLast ? "Harta Ditemukan!" : "Level Selesai!") : "Coba Lagi Yuk"}
          </h2>
          <div className="gh-body" style={S.cardSubtitle}>{starCount} / 3 bintang</div>
          <p className="gh-body" style={S.materiText}>
            {passed
              ? "Kerja bagus! Kamu berhasil mengumpulkan bintang penuh."
              : "Kumpulkan bintang penuh (3/3) untuk membuka level berikutnya."}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button className="gh-btn gh-body" style={S.btnSecondary} onClick={onRetry}>
              Ulangi
            </button>
            {passed && !isLast && (
              <button className="gh-btn gh-body" style={S.btnPrimary} onClick={() => { window.location.href = GENIALLY_URL; }}>
                Level Berikutnya
              </button>
            )}
            {passed && isLast ? (
              <button
                className="gh-btn gh-body"
                style={S.btnPrimary}
                onClick={() => { window.location.href = GENIALLY_URL; }}
              >
                Selesai
              </button>
            ) : (
              <button className="gh-btn gh-body" style={S.btnPrimary} onClick={onBackToMap}>
                Kembali ke Peta
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SHARED PIECES ---------------- */

function BackButton({ onClick }) {
  return (
    <button className="gh-btn gh-body" onClick={onClick} style={S.backBtn}>
      ← Kembali
    </button>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M5 3.5L16 10L5 16.5V3.5Z" fill="#fff" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M3 4C3 3.4 3.4 3 4 3H9V17H4C3.4 17 3 16.6 3 16V4Z" fill="#fff" />
      <path d="M17 4C17 3.4 16.6 3 16 3H11V17H16C16.6 17 17 16.6 17 16V4Z" fill="#fff" opacity="0.8" />
    </svg>
  );
}

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Quicksand:wght@500;700&display=swap');
      .gh-title { font-family: 'Baloo 2', system-ui, sans-serif; }
      .gh-body { font-family: 'Quicksand', system-ui, sans-serif; }
      .gh-btn { transition: transform .15s ease; cursor:pointer; border:none; }
      .gh-btn:hover:not(:disabled) { transform: translateY(-2px); }
      .gh-btn:active:not(:disabled) { transform: translateY(1px) scale(.98); }
      .gh-btn:disabled { opacity: 0.85; }
    `}</style>
  );
}

/* ---------------- STYLES ---------------- */

const S = {
  appWrap: {
    width: "100%",
    maxWidth: 480,
    margin: "0 auto",
    fontFamily: "system-ui, sans-serif",
  },
  scene: {
    position: "relative",
    width: "100%",
    minHeight: 720,
    overflow: "hidden",
    borderRadius: 20,
    boxShadow: "0 10px 40px rgba(10,40,60,0.25)",
  },
  sky: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, #6FB8EE 0%, #A9DBF6 55%, #CFEFEC 100%)",
  },
  skyline: { position: "absolute", top: "6%", left: 0, width: "100%", height: "18%", opacity: 0.6 },
  ground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "40%",
    background: "linear-gradient(180deg, #8FD65C 0%, #6FBF4F 100%)",
  },
  path: {
    position: "absolute",
    bottom: "-8%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "60%",
    aspectRatio: "1 / 1",
    borderRadius: "50%",
    background: "repeating-conic-gradient(#E7CE9C 0deg 12deg, #DEC28A 12deg 24deg)",
    opacity: 0.9,
  },
  homeContent: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
    padding: "0 6%",
  },
  title: {
    margin: 0,
    textAlign: "center",
    lineHeight: 0.95,
    fontWeight: 800,
    fontSize: "clamp(30px, 9vw, 44px)",
    color: "#FFD84D",
    WebkitTextStroke: "3px #1E5FA8",
    textShadow: "0 6px 0 #1E5FA8, 0 10px 14px rgba(0,0,0,0.25)",
  },
  titleLine: { display: "block", letterSpacing: "1px" },
  buttonCol: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 },
  btnPrimary: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 30px",
    borderRadius: 999,
    background: "linear-gradient(180deg, #4FA3F0 0%, #2E7FDE 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    boxShadow: "0 4px 0 #1E5FA8, 0 8px 14px rgba(0,0,0,0.2)",
  },
  btnSecondary: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 24px",
    borderRadius: 999,
    background: "linear-gradient(180deg, #A77CE8 0%, #8A5AD8 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    boxShadow: "0 4px 0 #6A3FB0, 0 8px 14px rgba(0,0,0,0.2)",
  },
  centerCardWrap: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8%",
  },
  parchmentCard: {
    position: "relative",
    width: "100%",
    maxWidth: 380,
    background: "#F3E9D2",
    border: "3px solid #D4BC85",
    borderRadius: 20,
    padding: "20px 22px 26px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  backBtn: {
    position: "absolute",
    top: 12,
    left: 12,
    background: "transparent",
    color: "#2B2119",
    fontWeight: 700,
    fontSize: 13,
  },
  cardTitle: { margin: "10px 0 2px", color: "#2B2119", fontSize: 22 },
  cardSubtitle: { color: "#6B5C3E", fontSize: 13, marginBottom: 10 },
  materiEmoji: { fontSize: 54, marginTop: 6 },
  materiText: { color: "#3D3421", fontSize: 14, lineHeight: 1.6, margin: "6px 0 18px" },
  guideList: { textAlign: "left", color: "#3D3421", fontSize: 14, lineHeight: 1.8, margin: "14px 0 4px", paddingLeft: 20 },
  mapHeader: { position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: 14, padding: "18px 18px 0" },
  mapHeaderText: { color: "#0D3B3E" },
  mapTitle: { fontWeight: 700, fontSize: 16 },
  mapSubtitle: { fontSize: 13, opacity: 0.8 },
  mapArea: { position: "relative", width: "100%", height: 620 },
  trailSvg: { position: "absolute", inset: 0, width: "100%", height: "100%" },
  node: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    width: 78,
    height: 78,
    borderRadius: "50%",
    border: "4px solid #F3E9D2",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
  },
  nodeNumber: { color: "#fff", fontSize: 20, fontWeight: 800 },
  nodeStars: { fontSize: 9, display: "flex", gap: 1 },
  nodeLabel: {
    position: "absolute",
    top: "104%",
    whiteSpace: "nowrap",
    fontSize: 11,
    color: "#0D3B3E",
    fontWeight: 700,
    background: "#F3E9D2CC",
    padding: "2px 8px",
    borderRadius: 8,
  },
  quizTopRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 26, marginBottom: 6 },
  quizProgress: { fontSize: 13, color: "#6B5C3E", fontWeight: 700 },
  quizStars: { fontSize: 14 },
  quizQuestion: { color: "#2B2119", fontSize: 18, margin: "8px 0 16px", lineHeight: 1.3 },
  optionsWrap: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 6 },
  optionBtn: {
    padding: "12px 16px",
    borderRadius: 14,
    border: "2px solid #D4BC85",
    textAlign: "left",
    fontSize: 14,
    color: "#2B2119",
  },
  feedback: { fontWeight: 800, fontSize: 16, margin: "10px 0" },
  resultStars: { display: "flex", justifyContent: "center", gap: 6, marginTop: 8, marginBottom: 4 },
};