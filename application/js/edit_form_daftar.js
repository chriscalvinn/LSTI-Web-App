const getFormDaftar = async() => {
	var id_form = await localStorage.getItem('id_form');
	console.log(id_form)
	const response = await fetch('http://178.128.104.74/penjualanformulirpendaftaranpesertapmb/form/'+id_form,{
		method:'GET',
		headers:{
			'accept':'application/json'
		},
	})
	const json = await response.json();
	console.log(json);
	document.getElementById("first-name").value = json.nama;
	console.log(json.tempat_lahir);
	document.getElementById("tempat-lahir").value = json.tempat_lahir;
	document.getElementById("nisn").value = json.nisn;
	document.getElementById("npsn").value = json.npsn;
	document.getElementById("email").value = json.email;
	document.getElementById("sekolah").value = json.sekolah_asal;
	document.getElementById("alamat").value = json.alamat;
	document.getElementById("nama-ayah").value = json.nama_ayah;
	document.getElementById("job-ayah").value = json.pekerjaan_ayah;
	document.getElementById("nama-ibu").value = json.nama_ibu;
	document.getElementById("job-ibu").value = json.pekerjaan_ibu;
	document.getElementById("edu").value = json.pendidikan_terakhir;
	document.getElementById("nilai").value = json.nilai_terakhir;
	document.getElementById("strata").value = json.strata_tujuan;
	document.getElementById("fak1").value = json.fakultas_tujuan_1;
	document.getElementById("prodi1").value = json.program_studi_fakultas_1;
	document.getElementById("fak2").value = json.fakultas_tujuan_2;
	document.getElementById("prodi2").value = json.program_studi_fakultas_2;
	document.getElementById("fak3").value = json.fakultas_tujuan_3;
	document.getElementById("prodi3").value = json.program_studi_fakultas_3;
	document.getElementById("tanggal-lahir").value = json.tanggal_lahir;	
};

const updateFormDaftar = async() => {
	var id_form = await localStorage.getItem('id_form');
	console.log(id_form)
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

};