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

function submitBayar( data ) {
    $.ajax({
        url: 'http://178.128.104.74/penjualanformulirpendaftaranpesertapmb/payment',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(data){
            console.log("success");
            //self.location = "http://localhost:4007/";
        },
        error: function(xhr,status,error){
            console.log("error");
            console.log(error);
        }
    });
}

document.getElementById('submit').addEventListener('click', function(){
	console.log("submitting...")
	var files = document.getElementById('bukti-bayar').files;
	var imag32;
	var id_form = localStorage.getItem('id_form');
	console.log(id_form);
	var status_pembayaran = 'Pending';
	console.log(status_pembayaran);
	var data = {id_form:id_form,status_pembayaran:status_pembayaran};
	if (files.length > 0){
		getBase64(files[0], function(result){
			data.bukti_pembayaran = result;
			console.log(data.bukti_pembayaran);
			submitBayar(data);
			console.log(data);
		})
	}
	else {
		submitBayar(data);
	}
})

const getEPin = async() => {
	var id_form = await localStorage.getItem('id_form');
	console.log(id_form);
	const response = await fetch('http://178.128.104.74/penjualanformulirpendaftaranpesertapmb/payment/'+id_form,{
		method:'GET',
		headers:{
			'accept':'application/json'
		},
	})
	const json = await response.json(); 
	console.log(json);
	localStorage.setItem('e_pin',json.e_pin);
	var epin = await localStorage.getItem('e_pin');
	console.log(json.e_pin);
	document.getElementById('result').value = json.e_pin;
}
