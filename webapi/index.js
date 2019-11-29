//framework
const express = require('express'),
    bodyParser = require('body-parser');
const app = express()
const cors = require('cors');
const fileupload = require('express-fileupload');

app.use(cors());
app.use(fileupload());
app.use(bodyParser.json({limit:'200mb'}));
app.use(bodyParser.urlencoded({
	limit:'200mb',
	extended: true
}));

require('dotenv').config();

connectDB = ({
	user: process.env.DB_USER,
	pass: process.env.DB_PASS,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	name: process.env.DB_NAME
});
//pgpromise
var pgp = require('pg-promise')();
const CONNECT_DB = 'postgres://' + connectDB.user + ':' + connectDB.pass + '@' + connectDB.host + ':' + connectDB.port + '/' + connectDB.name; 
var dbPromise = pgp(CONNECT_DB); 
//error constants and variables
const QueryResultError = pgp.errors.QueryResultError
const qrec = pgp.errors.queryResultErrorCode


//function
function getAllForms(){
	return new Promise((resolve,reject) =>{
	dbPromise.any('SELECT * FROM Form')
		.then(data => {
			resolve(data)
				})
		.catch(err => {
			reject(err)
			})
	})
}

function getFormByID(id_form){
	return new Promise((resolve,reject) =>{
	dbPromise.one('SELECT * FROM Form WHERE id_form = ${1}', {'1':id_form})
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
	})
}

function getPayment(){
	return new Promise((resolve,reject) =>{
	dbPromise.any('SELECT * FROM Payment')
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
	})
}
function getPaymentByID(id_form){
	return new Promise((resolve,reject) =>{
	dbPromise.one('SELECT * FROM Payment WHERE id_form = ${1}', {'1':id_form})
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
	})
}
function getBio(){
	return new Promise((resolve,reject) =>{
	dbPromise.any('SELECT * FROM Biodata')
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
	})
}

function getBioByID(e_pin){
	return new Promise((resolve,reject) =>{
	dbPromise.one('SELECT * FROM Biodata WHERE e_pin = ${1}', {'1':e_pin})
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
	})
}

function getBerkas(){
	return new Promise((resolve,reject) =>{
	dbPromise.any('SELECT * FROM Berkas')
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
	})
}

function getBerkasByID(id_biodata){
	return new Promise((resolve, reject) => {
	dbPromise.one('SELECT * FROM Berkas WHERE id_biodata = ${1}', {'1':id_biodata})
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
	})
}

//Post
function registerPendaftar(data){
	return new Promise((resolve,reject) =>{
        dbPromise.none('INSERT INTO form(username,password) VALUES ($1,$2)', [data.username,data.password])
                .then(() =>{
                    console.log('Record successfully inserted');
                    resolve('Record successfully inserted')
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
    })
}
function registerAdmin(data){
	return new Promise((resolve,reject) =>{
        dbPromise.none('INSERT INTO login_admin() VALUES ($1,$2)', [data.username,data.password])
                .then(() =>{
                    console.log('Record successfully inserted');
                    resolve('Record successfully inserted')
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
    })
}
function submitForm(data){
    return new Promise((resolve,reject) =>{
        dbPromise.one('INSERT INTO form(nama,tempat_lahir,nisn,npsn,email,sekolah_asal,alamat,nama_ayah,pekerjaan_ayah,nama_ibu,pekerjaan_ibu,pendidikan_terakhir,nilai_terakhir,strata_tujuan,fakultas_tujuan_1,program_studi_fakultas_1,fakultas_tujuan_2,program_studi_fakultas_2,fakultas_tujuan_3,program_studi_fakultas_3,tanggal_lahir) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21) RETURNING id_form', [data.nama,data.tempat_lahir,data.nisn,data.npsn,data.email,data.sekolah_asal, data.alamat,data.nama_ayah,data.pekerjaan_ayah,data.nama_ibu,data.pekerjaan_ibu,data.pendidikan_terakhir,data.nilai_terakhir,data.strata_tujuan,data.fakultas_tujuan_1,data.program_studi_fakultas_1,data.fakultas_tujuan_2,data.program_studi_fakultas_2,data.fakultas_tujuan_3,data.program_studi_fakultas_3,data.tanggal_lahir])
                .then(result =>{
                    console.log('Record successfully inserted');
                    resolve(result)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
    })
}

function postPayment(data){
	return new Promise((resolve,reject) =>{
        dbPromise.one('INSERT INTO payment(id_form,status_pembayaran,bukti_pembayaran) VALUES ($1,$2,$3) RETURNING e_pin', [data.id_form,data.status_pembayaran,data.bukti_pembayaran])
                .then(result =>{
                    console.log('Record successfully inserted');
                    resolve(result)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
    })
}

function postBio(data){
	return new Promise((resolve,reject) =>{
        dbPromise.one('INSERT INTO biodata(e_pin,nama,nomor_hp,nomor_hp_ortu,identitas,alamat,ijazah,laporan_nilai) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id_biodata', [data.e_pin,data.nama,data.nomor_hp,data.nomor_hp_ortu,data.identitas,data.alamat,data.ijazah,data.laporan_nilai])
                .then(result =>{
                    console.log('Record successfully inserted');
                    resolve(result)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
    })
}

function postBerkas(data){
	return new Promise((resolve,reject) =>{
        dbPromise.none('INSERT INTO berkas(id_biodata,pas_foto,akta_kelahiran,bukti_kelulusan,surat_bebas_buta_warna) VALUES ($1,$2,$3,$4,$5)', [data.id_biodata,data.pas_foto,data.akta_kelahiran,data.bukti_kelulusan,data.surat_bebas_buta_warna])
                .then(() =>{
                    console.log('Record successfully inserted');
                    resolve('Record successfully inserted')
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
    })
}

//Delete
function deleteFormByID(id_form){
	return new Promise((resolve,reject) =>{
	dbPromise.none('DELETE FROM berkas where id_biodata = (select id_biodata from biodata where e_pin = (Select e_pin from payment where id_form = ${1}));\
		DELETE FROM biodata where e_pin = (Select e_pin from payment where id_form = ${1});\
		DELETE FROM Payment WHERE id_form = ${1};\
		DELETE FROM Form WHERE id_form = ${1}', {'1':id_form})
				.then(() => {
					console.log('Record successfully deleted');
                    resolve('Record successfully deleted')
				})
				.catch(error => {
					console.log(error)
                    reject(error)
				})
	})
}

//Put
function updatePaymentByID(id_form, data){
	return new Promise((resolve,reject) =>{
		dbPromise.none('UPDATE payment SET status_pembayaran = $1, bukti_pembayaran = $2\
					WHERE id_form = $3', [data.status_pembayaran, data.bukti_pembayaran, id_form])
				.then(() => {
					console.log('Record successfully updated');
                    resolve('Record successfully updated')
				})
				.catch(err => {
					console.log(err)
					reject(err)
				})
	})
}

function updateFormByID(id_form,data){
	return new Promise((resolve,reject) =>{
		dbPromise.none('UPDATE form SET nama = $1,tempat_lahir = $2,nisn = $3,npsn = $4,email = $5,sekolah_asal = $6,alamat = $7,nama_ayah = $8 ,pekerjaan_ayah = $9,nama_ibu = $10 ,pekerjaan_ibu = $11,pendidikan_terakhir = $12 ,nilai_terakhir = $13,strata_tujuan = $14,fakultas_tujuan_1 = $15,program_studi_fakultas_1 = $16,fakultas_tujuan_2 = $17,program_studi_fakultas_2 = $18,fakultas_tujuan_3 = $19,program_studi_fakultas_3 = $20,tanggal_lahir = $21 WHERE id_form = $22', [data.nama,data.tempat_lahir,data.nisn,data.npsn,data.email,data.sekolah_asal, data.alamat,data.nama_ayah,data.pekerjaan_ayah,data.nama_ibu,data.pekerjaan_ibu,data.pendidikan_terakhir,data.nilai_terakhir,data.strata_tujuan,data.fakultas_tujuan_1,data.program_studi_fakultas_1,data.fakultas_tujuan_2,data.program_studi_fakultas_2,data.fakultas_tujuan_3,data.program_studi_fakultas_3,data.tanggal_lahir,id_form])
				.then(() => {
					console.log('Record successfully updated');
                    resolve('Record successfully updated')
				})
				.catch(err => {
					console.log(err)
					reject(err)
				})
	})
}

function updateBiodataByPin(e_pin, data){
	return new Promise((resolve,reject) =>{
		dbPromise.none('UPDATE biodata SET nama = $1, nomor_hp = $2, nomor_hp_ortu = $3, identitas = $4, alamat = $5, ijazah = $6, laporan_nilai = $7\
					WHERE e_pin = $8', [data.nama, data.nomor_hp, data.nomor_hp_ortu, data.identitas, data.alamat, data.ijazah, data.laporan_nilai,e_pin])
				.then(() => {
					console.log('Record successfully updated');
                    resolve('Record successfully updated')
				})
				.catch(err => {
					console.log(err)
					reject(err)
				})
	})
}

function login(data){
	return new Promise((resolve,reject) =>{
	dbPromise.one('SELECT id_form FROM form where username = $1 AND password = $2',[data.username,data.password])
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
	})
}

function login_admin(data){
	return new Promise((resolve,reject) =>{
	dbPromise.one('SELECT * FROM login_admin where username = $1 AND password = $2',[data.username,data.password])
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
	})
}
//endpoint
app.post('/login',function (req,res){
	login(req.body).then(result =>{
		console.log(result)
		res.json(result)
	})
	.catch(err => {
		console.log(err)
		res.json({"response-code":404,"message":"not found"})
	})
});

app.post('/login/admin',function (req,res){
	login_admin(req.body).then(result =>{
		console.log(result)
		res.json(result)
	})
	.catch(err => {
		console.log(err)
		res.json({"response-code":404,"message":"not found"})
	})
});

// get login
//get all forms
app.get('/form',function (req, res) {
	getAllForms().then(result =>{
		console.log(result)
		res.json(result)
	})
	.catch(err => {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	})
});

//get forms by id
app.get('/form/:id_form',function(req,res) {
	getFormByID(req.params.id_form).then(result =>{
		console.log(result)
		res.json(result)
	})
	.catch(err => {
		console.log(err)
		if (err instanceof QueryResultError){
			if (err.code == qrec.noData){
				res.json({"response-code":404,"message":"Record ID not found"})
			}
			else {
				res.json({"response-code":500,"message":"Internal server error"})
			}
		}
		else {
			res.json({"response-code":500,"message":"Internal server error"})
		}
	})
});

//get all payment
app.get('/payment',function(req,res) {
	getPayment().then(result =>{
		console.log(result)
		res.json(result)
	})
	.catch(err => {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	})
});

//get payment by id
app.get('/payment/:id_form',function(req,res) {
	getPaymentByID(req.params.id_form).then(result =>{
		console.log(result)
		res.json(result)
	})
	.catch(err => {
		console.log(err)
		if (err instanceof QueryResultError){
			if (err.code == qrec.noData){
				res.json({"response-code":404,"message":"Record ID not found"})
			}
			else {
				res.json({"response-code":500,"message":"Internal server error"})
			}
		}
		else {
			res.json({"response-code":500,"message":"Internal server error"})
		}
	})
});

//get all biodata
app.get('/biodata',function(req,res) {
	getBio().then(result =>{
		console.log(result)
		res.json(result)
	})
	.catch(err => {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	})
});

//get biodata by id
app.get('/biodata/:e_pin',function(req,res) {
	getBioByID(req.params.e_pin).then(result =>{
		console.log(result)
		res.json(result)
	})
	.catch(err => {
		console.log(err)
		if (err instanceof QueryResultError){
			if (err.code == qrec.noData){
				res.json({"response-code":404,"message":"Record ID not found"})
			}
			else {
				res.json({"response-code":500,"message":"Internal server error"})
			}
		}
		else {
			res.json({"response-code":500,"message":"Internal server error"})
		}
	})
});

app.get('/berkas',function(req,res) {
	getBerkas().then(result =>{
		console.log(result)
		res.json(result)
	})
	.catch(err => {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	})
});

app.get('/berkas/:id_biodata', function(req,res){
	getBerkasByID(req.params.id_biodata).then(result =>{
		console.log(result)
		res.json(result)
	})
	.catch(err => {
		console.log(err)
		if (err instanceof QueryResultError){
			if (err.code == qrec.noData){
				res.json({"response-code":404,"message":"Record ID not found"})
			}
			else {
				res.json({"response-code":500,"message":"Internal server error"})
			}
		}
		else {
			res.json({"response-code":500,"message":"Internal server error"})
		}
	})
});

//post form
app.post('/form',function(req,res){
    submitForm(req.body).then(result =>{
        console.log(result)
        res.json(result)
    })
    .catch(err => {
        console.log(err)
        res.json({"response-code":500,"message":"Internal server error"})
    })
})

app.post('/payment', function(req,res){
	postPayment(req.body).then(result =>{
		console.log(result)
		res.json(result)
	})
	.catch(err =>{
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	})
});

app.post('/biodata', function(req,res){
	postBio(req.body).then(result =>{
		console.log(result)
		res.json(result)
	})
	.catch(err =>{
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	})
});

app.post('/berkas', function(req,res){
	postBerkas(req.body).then(result =>{
		console.log(result)
		res.json({"response-code":200,"message":"Record successfully inserted"})
	})
	.catch(err =>{
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	})
});

app.post('/register', function(req,res){
	registerPendaftar(req.body).then(result =>{
		console.log(result)
		res.json({"response-code":200,"message":"Record successfully inserted"})
	})
	.catch(err =>{
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	})
});

//delete form by id
app.delete('/form/:id_form',function(req,res){
	deleteFormByID(req.params.id_form).then(result =>{
		console.log(result)
		res.json({"response-code":200,"message":"Record successfully deleted"})
	})
	.catch(err => {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	})
});

//update payment by id
app.put('/payment/:id_form',function(req,res){
	updatePaymentByID(req.params.id_form,req.body).then(result =>{
        console.log(result)
        res.json({"response-code":200,"message":"Record successfully updated"})
    })
    .catch(err => {
    	console.log(err)
        res.json({"response-code":500,"message":"Internal server error"})
    })
});

app.put('/form/:id_form',function(req,res){
	updateFormByID(req.params.id_form,req.body).then(result =>{
        console.log(result)
        res.json({"response-code":200,"message":"Record successfully updated"})
    })
    .catch(err => {
    	console.log(err)
        res.json({"response-code":500,"message":"Internal server error"})
    })
});

app.put('/biodata/:e_pin',function(req,res){
	updateBiodataByPin(req.params.e_pin,req.body).then(result =>{
        console.log(result)
        res.json({"response-code":200,"message":"Record successfully updated"})
    })
    .catch(err => {
    	console.log(err)
        res.json({"response-code":500,"message":"Internal server error"})
    })
});

//post file
app.post('/biodata/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/',function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

//run server
app.listen(3000,function () {
	console.log("Maid cafe serving at port 3000")
    console.log('Ctrl+C to Terminate Process')
});
