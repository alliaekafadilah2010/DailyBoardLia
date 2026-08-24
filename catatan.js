import { simpanCatatanKeStorage } from "./storage.js";

export function setupCatatan(dataPenyimpanan, validasiInput) {
    const tomolSimpanCatatan = document.getElementById("btn-simpan-catatan");
    const areaText = document.getElementById("textarea-catatan");

    if (tomolSimpanCatatan) {
        tomolSimpanCatatan.addEventListener("click", () => {
            if (areaText.value.trim() === "") return;
            tambahCatatan(areaText.value, dataPenyimpanan);
            areaText.value = "";
        });
    }

    renderCatatan(dataPenyimpanan, validasiInput);
}

function tambahCatatan(isi, dataPenyimpanan) {
    dataPenyimpanan.daftarCatatan.push({ id: Date.now(), isi, tanggal: new Date().toLocaleDateString() });
    simpanCatatanKeStorage(dataPenyimpanan.daftarCatatan);
    renderCatatan(dataPenyimpanan);
}

export function hapusCatatan(id, dataPenyimpanan) {
    dataPenyimpanan.daftarCatatan = dataPenyimpanan.daftarCatatan.filter((c) => c.id !== id);
    simpanCatatanKeStorage(dataPenyimpanan.daftarCatatan);
    renderCatatan(dataPenyimpanan);
}

export function editCatatan(id, isiBaru, dataPenyimpanan) {
    dataPenyimpanan.daftarCatatan = dataPenyimpanan.daftarCatatan.map((c) =>
        c.id === id ? { ...c, isi: isiBaru } : c
    );
    simpanCatatanKeStorage(dataPenyimpanan.daftarCatatan);
    renderCatatan(dataPenyimpanan);
}

export function renderCatatan(dataPenyimpanan, validasiInput) {
    const container = document.getElementById("daftar-catatan");
    if (!container) return;
    container.innerHTML = "";

    dataPenyimpanan.daftarCatatan.forEach((itemCatatan) => {
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
                editCatatan(itemCatatan.id, catatanBaru, dataPenyimpanan);
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
            hapusCatatan(itemCatatan.id, dataPenyimpanan);
        });

        div.appendChild(p);
        div.appendChild(small);
        div.appendChild(tombolHapusCatatan);
        container.appendChild(div);
    });
}