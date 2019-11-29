const getBiodata = async() => {
	var e_pin = await localStorage.getItem('e_pin');
	console.log(e_pin);
	const response = await fetch('http://178.128.104.74/penjualanformulirpendaftaranpesertapmb/biodata/'+e_pin,{
		method:'GET',
		headers:{
			'accept':'application/json'
		},
	})
	const json = await response.json();
	console.log(json);
	document.getElementById("first-name").value = json.nama,
	document.getElementById("no-hp").value = json.nomor_hp,
	document.getElementById("hp-ortu").value = json.nomor_hp_ortu,
	document.getElementById("no-id").value = json.identitas,
	document.getElementById("alamat").value = json.alamat,
	document.getElementById("no-ijazah").value = json.ijazah,
	document.getElementById("nilai").value = json.laporan_nilai
};

const updateBiodata = async() => {
	var e_pin = await localStorage.getItem('e_pin');
	console.log(e_pin);
	const data = await JSON.stringify({
		nama:document.getElementById("first-name").value,
		nomor_hp:document.getElementById("no-hp").value,
		nomor_hp_ortu:document.getElementById("hp-ortu").value,
		identitas:document.getElementById("no-id").value,
		alamat:document.getElementById("alamat").value,
		ijazah:document.getElementById("no-ijazah").value,
		laporan_nilai:document.getElementById("nilai").value
	})
	console.log(data);
	const response = await fetch('http://178.128.104.74/penjualanformulirpendaftaranpesertapmb/biodata/'+e_pin,{
		method:'PUT',
		headers:{
			'Content-Type':'application/json'
		},
		body: data
	})
	const json = await response.json();
	console.log(json);
}