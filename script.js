import { muatDariStorage } from "./storage.js";
import { setupTugas, renderTugas } from "./tugas.js";
import { setupCatatan, renderCatatan } from "./catatan.js";
import { ambilKutipan, ambilCuaca } from "./api.js";

console.log("Daily Board siap dijalankan!");

const app = document.getElementById("app");

const dataTersimpan = muatDariStorage();
const state = {
    daftarTugas: dataTersimpan.daftarTugas,
    nextId: dataTersimpan.nextId,
    daftarCatatan: dataTersimpan.daftarCatatan
};

function validasiInput(nilai) {
  if (nilai.trim() === "") {
    alert("Input tidak boleh kosong!");
    return false;
  }
  if (nilai.length > 100) {
    alert("Input maksimal 100 karakter!");
    return false;
  }
  return true;
}

function buatKartu(judulTeks, warnaBorder) {
    const card = document.createElement("div");
    card.className = "card-modul";
    card.style.borderColor = warnaBorder;

    const heading = document.createElement("h2");
    heading.textContent = judulTeks;
    card.appendChild(heading);

    app.appendChild(card);
    return card;
}

const judul = document.createElement("h2");
judul.textContent = "Selamat datang di Daily Board!";
judul.style.gridColumn = "1 / -1";
judul.style.textAlign = "center";
app.appendChild(judul);


const kartuTugas = buatKartu("Tugas", "var(--pink-color)");

const inputPencarian = document.createElement("input");
inputPencarian.id = "pencarian-tugas";
inputPencarian.placeholder = "Cari tugas...";
kartuTugas.appendChild(inputPencarian);

const inputTugas = document.createElement("input");
inputTugas.id = "input-tugas";
inputTugas.placeholder = "Masukkan tugas baru...";
kartuTugas.appendChild(inputTugas);

const tomboltugas = document.createElement("button");
tomboltugas.id = "tombol-tugas";
tomboltugas.textContent = "Tambahkan Tugas";
tomboltugas.style.backgroundColor = "pink";
kartuTugas.appendChild(tomboltugas);

const list = document.createElement("ul");
list.id = "daftar-tugas";
kartuTugas.appendChild(list);

const containerFilter = document.createElement("div");
const btnSemua = document.createElement("button");
btnSemua.textContent = "Semua";
btnSemua.style.backgroundColor = "yellow";
btnSemua.addEventListener("click", () => renderTugas("semua", inputPencarian.value, state, validasiInput));

const btnSelesai = document.createElement("button");
btnSelesai.textContent = "Selesai";
btnSelesai.style.backgroundColor = "aquamarine";
btnSelesai.addEventListener("click", () => renderTugas("selesai", inputPencarian.value, state, validasiInput));

const btnBelum = document.createElement("button");
btnBelum.textContent = "Belum Selesai";
btnBelum.style.backgroundColor = "lightblue";
btnBelum.addEventListener("click", () => renderTugas("belum", inputPencarian.value, state, validasiInput));

containerFilter.appendChild(btnSemua);
containerFilter.appendChild(btnSelesai);
containerFilter.appendChild(btnBelum);
kartuTugas.appendChild(containerFilter);


const kartuCuaca = buatKartu("Cuaca Terkini", "var(--lightblue-color)");

const containerCuaca = document.createElement("div");
containerCuaca.style.marginBottom = "10px";

const inputKota = document.createElement("input");
inputKota.placeholder = "Masukkan nama kota...";
inputKota.style.marginRight = "5px";

const btnCariCuaca = document.createElement("button");
btnCariCuaca.textContent = "Cek Cuaca";
btnCariCuaca.style.backgroundColor = "lightgreen";
btnCariCuaca.addEventListener("click", () => {
    const kota = inputKota.value.trim();
    if (kota !== "") ambilCuaca(kota);
    else alert("Nama kota tidak boleh kosong!");
});

containerCuaca.appendChild(inputKota);
containerCuaca.appendChild(btnCariCuaca);
kartuCuaca.appendChild(containerCuaca);

const infoCuacaEl = document.createElement("div");
infoCuacaEl.id = "info-cuaca";
kartuCuaca.appendChild(infoCuacaEl);

const statusEl = document.createElement("div");
statusEl.id = "status";
statusEl.style.fontSize = "0.9rem";
statusEl.style.marginTop = "5px";
kartuCuaca.appendChild(statusEl);


const kartuCatatan = buatKartu("Catatan", "var(--lightgreen-color)");

const textArea = document.createElement("textarea");
textArea.id = "textarea-catatan";
textArea.placeholder = "Tulis catatan di sini...";
kartuCatatan.appendChild(textArea);

const btnSimpanCatatan = document.createElement("button");
btnSimpanCatatan.id = "btn-simpan-catatan";
btnSimpanCatatan.textContent = "Simpan Catatan";
btnSimpanCatatan.style.backgroundColor = "lightgreen";
kartuCatatan.appendChild(btnSimpanCatatan);

const containerCatatan = document.createElement("div");
containerCatatan.id = "daftar-catatan";
kartuCatatan.appendChild(containerCatatan);


const kartuKutipan = buatKartu("Kutipan Hari Ini", "var(--aquamarine-color)");

const kutipanEl = document.createElement("div");
kutipanEl.id = "kutipan-harian";
kartuKutipan.appendChild(kutipanEl);

const btnAcakKutipan = document.createElement("button");
btnAcakKutipan.textContent = "Kutipan Baru";
btnAcakKutipan.style.backgroundColor = "lightyellow";
btnAcakKutipan.addEventListener("click", () => ambilKutipan());
kartuKutipan.appendChild(btnAcakKutipan);


const toggleTema = document.createElement("button");
toggleTema.id = "toggle-tema";
toggleTema.textContent = "Ganti Tema (Dark/Light)";
toggleTema.style.gridColumn = "1 / -1"; 
toggleTema.style.backgroundColor = "#ddd";
app.appendChild(toggleTema);

toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const tema = document.body.classList.contains("dark-mode") ? "gelap" : "terang";
    localStorage.setItem("tema", tema);
});

window.addEventListener("DOMContentLoaded", () => {
    setupTugas(state, validasiInput);
    setupCatatan(state, validasiInput);

    async function muatSemuaWidget() {
        if (statusEl) statusEl.textContent = "Memuat data...";
        const defaultKota = "Jakarta";
        inputKota.value = defaultKota; 
        await Promise.all([ambilKutipan(), ambilCuaca(defaultKota)]);
        if (statusEl) statusEl.textContent = "Data berhasil dimuat";
    }
    muatSemuaWidget();

    const temaTersimpan = localStorage.getItem("tema");
    if (temaTersimpan === "gelap") {
        document.body.classList.add("dark-mode");
    }
});