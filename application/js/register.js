const register = async() => {
	const data = await JSON.stringify({
		username:document.getElementById("username").value,
		password:document.getElementById("password").value
	});
	
	console.log(data);
	const response = await fetch('http://178.128.104.74/penjualanformulirpendaftaranpesertapmb/register',{
		method:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		body: data
	})
	const json = await response.json();
	console.log(json);
	 let urlPart = window.location.href.split('/');
window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/login.html';
		console.log(window.location);
}

