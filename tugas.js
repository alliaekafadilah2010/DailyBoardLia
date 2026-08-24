import { simpanKeStorage } from "./storage.js";

function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

export function setupTugas(dataPenyimpanan, validasiInput) {
    const tomboltugas = document.getElementById("tombol-tugas");
    const inputTugas = document.getElementById("input-tugas");
    const inputPencarian = document.getElementById("pencarian-tugas");

    if (tomboltugas) {
        tomboltugas.addEventListener("click", () => {
            if (!validasiInput(inputTugas.value)) return;
            tambahTugas(inputTugas.value, dataPenyimpanan);
            inputTugas.value = "";
            alert("Tugas berhasil ditambahkan!");
        });
    }

    if (inputPencarian) {
        const cariTugasDebounced = debounce((kataKunci) => {
            renderTugas("semua", kataKunci, dataPenyimpanan, validasiInput);
        }, 300);
        
        inputPencarian.addEventListener("input", (e) => {
            renderTugas("semua", e.target.value, dataPenyimpanan, validasiInput);
        });
    }

    renderTugas("semua", "", dataPenyimpanan, validasiInput);
}

export function tambahTugas(nama, dataPenyimpanan) {
    dataPenyimpanan.daftarTugas.push({ id: dataPenyimpanan.nextId++, nama: nama, selesai: false });
    simpanKeStorage(dataPenyimpanan.daftarTugas);
    renderTugas("semua", document.getElementById("pencarian-tugas")?.value || "", dataPenyimpanan);
}

export function hapusTugas(id, dataPenyimpanan) {
    dataPenyimpanan.daftarTugas = dataPenyimpanan.daftarTugas.filter((t) => t.id !== id);
    simpanKeStorage(dataPenyimpanan.daftarTugas);
    renderTugas("semua", document.getElementById("pencarian-tugas")?.value || "", dataPenyimpanan);
}

export function editTugas(id, namaBaru, dataPenyimpanan) {
    dataPenyimpanan.daftarTugas = dataPenyimpanan.daftarTugas.map((t) =>
        t.id === id ? { ...t, nama: namaBaru } : t
    );
    simpanKeStorage(dataPenyimpanan.daftarTugas);
    renderTugas("semua", document.getElementById("pencarian-tugas")?.value || "", dataPenyimpanan);
}

export function toggleSelesai(id, dataPenyimpanan) {
    dataPenyimpanan.daftarTugas = dataPenyimpanan.daftarTugas.map((t) =>
        t.id === id ? { ...t, selesai: !t.selesai } : t
    );
    simpanKeStorage(dataPenyimpanan.daftarTugas);
    renderTugas("semua", document.getElementById("pencarian-tugas")?.value || "", dataPenyimpanan);
}

export function renderTugas(filter = "semua", keyword = "", dataPenyimpanan, validasiInput) {
  const list = document.getElementById("daftar-tugas");
  if (!list) return;
  list.innerHTML = "";

  const tugasTersaring = dataPenyimpanan.daftarTugas.filter((t) => {
    const sesuaiFilter = filter === "selesai" ? t.selesai : filter === "belum" ? !t.selesai : true;
    const sesuaiKeyword = t.nama.toLowerCase().includes(keyword.toLowerCase());
    return sesuaiFilter && sesuaiKeyword;
  });

  tugasTersaring.forEach((tugasItem) => {
    const li = document.createElement("li");
    const span = document.createElement("span");

    li.className = "tugas-item"; 
    li.dataset.id = tugasItem.id;
    span.textContent = tugasItem.nama;
    span.style.textDecoration = tugasItem.selesai ? "line-through" : "none";
    li.style.cursor = "grab";
    li.style.margin = "5px 0";
    span.addEventListener("click", () => toggleSelesai(tugasItem.id, dataPenyimpanan));

    li.appendChild(span);

    li.addEventListener("dblclick", () => {
        const tugasBaru = prompt("Masukkan nama baru tugas:", tugasItem.nama);
        if (tugasBaru !== null && validasiInput(tugasBaru)) {
            editTugas(tugasItem.id, tugasBaru, dataPenyimpanan);
        }
    });
    
    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.style.marginLeft = "10px";
    tombolHapus.addEventListener("click", (e) => {
        e.stopPropagation();
        hapusTugas(tugasItem.id, dataPenyimpanan);
    });

    li.appendChild(tombolHapus);
    list.appendChild(li);
  });

  aktifkanDragDrop(dataPenyimpanan);
}

function aktifkanDragDrop(dataPenyimpanan) {
    const items = document.querySelectorAll('.tugas-item');
    items.forEach(item => {
        item.setAttribute('draggable', true);
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.dataset.id);
        });
    });

    const listEl = document.getElementById('daftar-tugas');
    if (!listEl) return;
    
    listEl.addEventListener('dragover', (e) => e.preventDefault());
    
    listEl.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedId = Number(e.dataTransfer.getData('text/plain'));
        const targetLi = e.target.closest('.tugas-item');
        if (!targetLi) return;
        
        const targetId = Number(targetLi.dataset.id);
        if (draggedId === targetId) return;

        const draggedIndex = dataPenyimpanan.daftarTugas.findIndex(t => t.id === draggedId);
        const targetIndex = dataPenyimpanan.daftarTugas.findIndex(t => t.id === targetId);

        if (draggedIndex > -1 && targetIndex > -1) {
            const [movedItem] = dataPenyimpanan.daftarTugas.splice(draggedIndex, 1);
            dataPenyimpanan.daftarTugas.splice(targetIndex, 0, movedItem);
            
            simpanKeStorage(dataPenyimpanan.daftarTugas);
            renderTugas("semua", document.getElementById("pencarian-tugas")?.value || "", dataPenyimpanan);
        }
    });
}