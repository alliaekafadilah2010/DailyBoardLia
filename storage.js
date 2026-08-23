export function simpanKeStorage(daftarTugas) {
    localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
}

export function simpanCatatanKeStorage(daftarCatatan) {
    localStorage.setItem("daftarCatatan", JSON.stringify(daftarCatatan));
}

export function muatDariStorage() {
    const dataTugasStorage = localStorage.getItem("daftarTugas");
    let daftarTugas = [];
    let nextId = 1;

    if (dataTugasStorage) {
        daftarTugas = JSON.parse(dataTugasStorage);
        if (daftarTugas.length > 0) {
            nextId = Math.max(...daftarTugas.map(t => t.id)) + 1;
        }
    }

    const dataCatatanStorage = localStorage.getItem("daftarCatatan");
    let daftarCatatan = [];
    if (dataCatatanStorage) {
        daftarCatatan = JSON.parse(dataCatatanStorage);
    }

    return { daftarTugas, nextId, daftarCatatan };
}