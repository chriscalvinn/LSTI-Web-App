//input biodata
const submitBiodata = async() => {
	var e_pin = localStorage.getItem('e_pin');
	const data = await JSON.stringify({
		e_pin:parseInt(e_pin),
		nama:document.getElementById("first-name").value,
		nomor_hp:document.getElementById("no-hp").value,
		nomor_hp_ortu:document.getElementById("hp-ortu").value,
		identitas:document.getElementById("no-id").value,
		alamat:document.getElementById("alamat").value,
		ijazah:document.getElementById("no-ijazah").value,
		laporan_nilai:document.getElementById("nilai").value,	
	})
	console.log(data);
	const response = await fetch('http://178.128.104.74/penjualanformulirpendaftaranpesertapmb/biodata',{
		method:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		body: data
	})
	const json = await response.json();
	console.log(json);
	localStorage.setItem('id_biodata',json.id_biodata);
	console.log(localStorage.getItem('id_biodata'))
}
//input berkas
function getBase64(file,cb){
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(){
		console.log(reader.result);
		cb(reader.result);
	};
	reader.oneerror = function (error) {
		console.log('Error: ', error);
	}
}

function submitFile(data){
	$.ajax({
		url:'http://178.128.104.74/penjualanformulirpendaftaranpesertapmb/berkas',
		type: 'POST',
		contentType:'application/json',
		data:JSON.stringify(data),
		dataType:'json',
		success: function(data){
			console.log(data);
			console.log("success");
		},
		error: function(xhr,status,error){
			console.log("error");
			console.log(error);
		}
	});
}

document.getElementById('submitberkas').addEventListener('click', function(){
	console.log("submitting...")
	var id_biodata = parseInt(localStorage.getItem('id_biodata'));
	var file1 = document.getElementById('foto').files;
	var file2 = document.getElementById('akta').files;
	var file3 = document.getElementById('bukti-lulus').files;
	var file4 = document.getElementById('surat-buta-warna').files;
	var data = {id_biodata:id_biodata};
	console.log(file4.length);
	if ((file1.length > 0) && (file2.length >0) && (file3.length >0) && (file4.length >0) ){
		getBase64(file1[0],function(result){
			data.pas_foto = result;
			console.log(data);
		})
		getBase64(file2[0],function(result){
			data.akta_kelahiran  = result;
			console.log(data);
		})
		getBase64(file3[0],function(result){
			data.bukti_kelulusan  = result;
			console.log(data);
		})
		getBase64(file4[0],function(result){
			data.surat_bebas_buta_warna  = result;
			console.log(data);
			submitFile(data);
		})
	}
	else {
		submitFile(data);
	}
})

