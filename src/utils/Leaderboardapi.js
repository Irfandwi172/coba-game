/*
  KONEKSI KE LEADERBOARD (Google Sheets via Apps Script)
  ---------------------------------------------------------
  Ganti URL di bawah dengan URL hasil "Deploy > New deployment > Web app"
  dari Google Apps Script kamu (lihat file google-apps-script/Code.gs).
*/

const LEADERBOARD_API_URL =
  "https://script.google.com/macros/s/AKfycbxdyXAc7v4SX1zwcrt9JSbS1emnjgFxyK7efBGGKg3hmdsI3tcIyv2nGX7VVVOdGI8E/exec";

export async function fetchLeaderboard() {
  const res = await fetch(LEADERBOARD_API_URL);
  if (!res.ok) throw new Error("Gagal memuat leaderboard");
  return res.json();
}

export async function submitScore({ nama, bintang, waktu }) {
  try {
    // Content-Type "text/plain" dipakai supaya browser tidak mengirim
    // preflight OPTIONS request, karena Apps Script Web App tidak
    // menangani preflight CORS dengan baik.
    await fetch(LEADERBOARD_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ nama, bintang, waktu }),
    });
  } catch (err) {
    console.error("Gagal mengirim skor ke leaderboard:", err);
  }
}