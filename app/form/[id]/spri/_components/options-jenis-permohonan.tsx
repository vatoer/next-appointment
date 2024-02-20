const OptionsJenisPermohonan = () => {
  return (
    <>
      <option value="0">Pilih Jenis Permohonan</option>
      <option value="A1">Pembuatan Paspor Baru 48 Halaman</option>
      <option value="A2">Pembuatan Paspor Baru 24 Halaman</option>
      <option value="A3">Pembuatan SPLP</option>
      <option value="B1">Pergantian Paspor karena habis masa berlaku</option>
      <option value="B2">Pergantian Paspor karena penuh</option>
      <option value="B3">Pergantian Paspor karena hilang</option>
      <option value="B4">Pergantian Paspor karena rusak</option>
      <option value="C1">Perubahan Nama</option>
      <option value="C2">Perubahan Alamat</option>
      <option value="C3">Perubahan Lain</option>
    </>
  );
};

export default OptionsJenisPermohonan;
