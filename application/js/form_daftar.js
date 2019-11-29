const inputFormDaftar = async() => {
	var id_form = localStorage.getItem('id_form') 
	const data = await JSON.stringify({
		nama:document.getElementById("first-name").value,
		tempat_lahir:document.getElementById("tempat-lahir").value,
		nisn:document.getElementById("nisn").value,
		npsn:document.getElementById("npsn").value,
		email:document.getElementById("email").value,
		sekolah_asal:document.getElementById("sekolah").value,
		alamat:document.getElementById("alamat").value,
		nama_ayah:document.getElementById("nama-ayah").value,
		pekerjaan_ayah:document.getElementById("job-ayah").value,
		nama_ibu:document.getElementById("nama-ibu").value,
		pekerjaan_ibu:document.getElementById("job-ibu").value,
		pendidikan_terakhir:document.getElementById("edu").value,
		nilai_terakhir:document.getElementById("nilai").value,
		strata_tujuan:document.getElementById("strata").value,
		fakultas_tujuan_1:document.getElementById("fak1").value,
		program_studi_fakultas_1:document.getElementById("prodi1").value,
		fakultas_tujuan_2:document.getElementById("fak2").value,
		program_studi_fakultas_2:document.getElementById("prodi2").value,
		fakultas_tujuan_3:document.getElementById("fak3").value,
		program_studi_fakultas_3:document.getElementById("prodi3").value,
		tanggal_lahir:parseInt(document.getElementById("tanggal-lahir").value)	
	});
	console.log(data);
	const response = await fetch('http://178.128.104.74/penjualanformulirpendaftaranpesertapmb/form/'+id_form,{
		method:'PUT',
		headers:{
			'Content-Type':'application/json'
		},
		body: data
	})
	const json = await response.json();
	console.log(json);
}

 