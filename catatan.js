import { simpanCatatanKeStorage } from "./storage.js";

export function setupCatatan(state, validasiInput) {
    const btnSimpanCatatan = document.getElementById("btn-simpan-catatan");
    const textArea = document.getElementById("textarea-catatan");

    if (btnSimpanCatatan) {
        btnSimpanCatatan.addEventListener("click", () => {
            if (textArea.value.trim() === "") return;
            tambahCatatan(textArea.value, state);
            textArea.value = "";
        });
    }

    renderCatatan(state, validasiInput);
}

function tambahCatatan(isi, state) {
    state.daftarCatatan.push({ id: Date.now(), isi, tanggal: new Date().toLocaleDateString() });
    simpanCatatanKeStorage(state.daftarCatatan);
    renderCatatan(state);
}

export function hapusCatatan(id, state) {
    state.daftarCatatan = state.daftarCatatan.filter((c) => c.id !== id);
    simpanCatatanKeStorage(state.daftarCatatan);
    renderCatatan(state);
}

export function editCatatan(id, isiBaru, state) {
    state.daftarCatatan = state.daftarCatatan.map((c) =>
        c.id === id ? { ...c, isi: isiBaru } : c
    );
    simpanCatatanKeStorage(state.daftarCatatan);
    renderCatatan(state);
}

export function renderCatatan(state, validasiInput) {
    const container = document.getElementById("daftar-catatan");
    if (!container) return;
    container.innerHTML = "";

    state.daftarCatatan.forEach((itemCatatan) => {
        const div = document.createElement("div");
        div.style.margin = "10px 0";
        div.style.padding = "5px";
        div.style.border = "1px solid #ccc";
        div.style.borderRadius = "5px";

        const p = document.createElement("p");
        p.style.margin = "0 0 5px 0";
        p.textContent = itemCatatan.isi;
        p.style.cursor = "pointer";

        p.addEventListener("dblclick", () => {
            const catatanBaru = prompt("Masukkan isi catatan baru:", itemCatatan.isi);
            if (catatanBaru !== null && validasiInput(catatanBaru)) {
                editCatatan(itemCatatan.id, catatanBaru, state);
            }
        });

        const small = document.createElement("small");
        small.style.color = "gray";
        small.textContent = itemCatatan.tanggal;
        small.style.display = "block";
        small.style.marginBottom = "5px";

        const tombolHapusCatatan = document.createElement("button");
        tombolHapusCatatan.textContent = "Hapus Catatan";
        tombolHapusCatatan.style.marginLeft = "10px";
        tombolHapusCatatan.style.backgroundColor = "lightcoral";
        
        tombolHapusCatatan.addEventListener("click", () => {
            hapusCatatan(itemCatatan.id, state);
        });

        div.appendChild(p);
        div.appendChild(small);
        div.appendChild(tombolHapusCatatan);
        container.appendChild(div);
    });
}