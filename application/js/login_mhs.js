const getLogin = async() => {
	const data = await JSON.stringify({
		username:document.getElementById("username").value,
		password:document.getElementById("password").value,
	});
	console.log(data);
	const response = await fetch('http://178.128.104.74/penjualanformulirpendaftaranpesertapmb/login',{
	//const response = await fetch('http://0.0.0.0:3000/login',{
		method:'POST',
		headers:{
			'accept':'application/json',
			'Content-Type':'application/json'
		},
		body:data
	})
	const json = await response.json();
	console.log(json);
	if (json.hasOwnProperty('id_form')) {
		localStorage.setItem('id_form',json.id_form)
		console.log(localStorage.getItem('id_form'));
		 let urlPart = window.location.href.split('/');
window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/home.html';
		console.log(window.location);
	}
	else {
		alert("Incorrect username or password");
	}
};