export async function ambilKutipan() {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();
    const el = document.getElementById("kutipan-harian");
    if (el) el.textContent = `"${data.quote}" — ${data.author}`;
  } catch (error) {
    console.error("Gagal mengambil kutipan:", error);
    const el = document.getElementById("kutipan-harian");
    if (el) el.textContent = "Gagal memuat kutipan harian.";
  }
}

export async function ambilCuaca(kota) {
  const apiKey = "1efc9f70a387999aa0c4921637163419"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Kota tidak ditemukan");
    const data = await res.json();

    const el = document.getElementById("info-cuaca");
    if (el) {
      el.innerHTML = `
        <p><b>${data.name}</b>: ${data.main.temp}°C</p>
        <p>${data.weather[0].description}</p>
      `;
    }
  } catch (error) {
    const el = document.getElementById("info-cuaca");
    if (el) el.textContent = error.message;
  }
}