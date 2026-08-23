import { simpanKeStorage } from "./storage.js";

function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

export function setupTugas(state, validasiInput) {
    const tomboltugas = document.getElementById("tombol-tugas");
    const inputTugas = document.getElementById("input-tugas");
    const inputPencarian = document.getElementById("pencarian-tugas");

    if (tomboltugas) {
        tomboltugas.addEventListener("click", () => {
            if (!validasiInput(inputTugas.value)) return;
            tambahTugas(inputTugas.value, state);
            inputTugas.value = "";
            alert("Tugas berhasil ditambahkan!");
        });
    }

    if (inputPencarian) {
        const cariTugasDebounced = debounce((kataKunci) => {
            renderTugas("semua", kataKunci, state, validasiInput);
        }, 300);
        
        inputPencarian.addEventListener("input", (e) => {
            renderTugas("semua", e.target.value, state, validasiInput);
        });
    }

    renderTugas("semua", "", state, validasiInput);
}

export function tambahTugas(nama, state) {
    state.daftarTugas.push({ id: state.nextId++, nama: nama, selesai: false });
    simpanKeStorage(state.daftarTugas);
    renderTugas("semua", document.getElementById("pencarian-tugas")?.value || "", state);
}

export function hapusTugas(id, state) {
    state.daftarTugas = state.daftarTugas.filter((t) => t.id !== id);
    simpanKeStorage(state.daftarTugas);
    renderTugas("semua", document.getElementById("pencarian-tugas")?.value || "", state);
}

export function editTugas(id, namaBaru, state) {
    state.daftarTugas = state.daftarTugas.map((t) =>
        t.id === id ? { ...t, nama: namaBaru } : t
    );
    simpanKeStorage(state.daftarTugas);
    renderTugas("semua", document.getElementById("pencarian-tugas")?.value || "", state);
}

export function toggleSelesai(id, state) {
    state.daftarTugas = state.daftarTugas.map((t) =>
        t.id === id ? { ...t, selesai: !t.selesai } : t
    );
    simpanKeStorage(state.daftarTugas);
    renderTugas("semua", document.getElementById("pencarian-tugas")?.value || "", state);
}

export function renderTugas(filter = "semua", keyword = "", state, validasiInput) {
  const list = document.getElementById("daftar-tugas");
  if (!list) return;
  list.innerHTML = "";

  const tugasTersaring = state.daftarTugas.filter((t) => {
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
    span.addEventListener("click", () => toggleSelesai(tugasItem.id, state));

    li.appendChild(span);

    li.addEventListener("dblclick", () => {
        const tugasBaru = prompt("Masukkan nama baru tugas:", tugasItem.nama);
        if (tugasBaru !== null && validasiInput(tugasBaru)) {
            editTugas(tugasItem.id, tugasBaru, state);
        }
    });
    
    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.style.marginLeft = "10px";
    tombolHapus.addEventListener("click", (e) => {
        e.stopPropagation();
        hapusTugas(tugasItem.id, state);
    });

    li.appendChild(tombolHapus);
    list.appendChild(li);
  });

  aktifkanDragDrop(state);
}

function aktifkanDragDrop(state) {
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

        const draggedIndex = state.daftarTugas.findIndex(t => t.id === draggedId);
        const targetIndex = state.daftarTugas.findIndex(t => t.id === targetId);

        if (draggedIndex > -1 && targetIndex > -1) {
            const [movedItem] = state.daftarTugas.splice(draggedIndex, 1);
            state.daftarTugas.splice(targetIndex, 0, movedItem);
            
            simpanKeStorage(state.daftarTugas);
            renderTugas("semua", document.getElementById("pencarian-tugas")?.value || "", state);
        }
    });
}