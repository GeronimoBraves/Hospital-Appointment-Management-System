var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hospital_appointment',{
	useNewUrlParser:true,
	useUnifiedTopology: true
});
var db=mongoose.connection;
db.on('error',()=>console.log("Error in connecting to database"))
db.once('open',()=>console.log("Connected to Database"))
// db.on('error', console.log.bind(console, "connection error"));
// db.once('open', function(callback){
// 	console.log("connection succeeded");
// })

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', (req,res)=>{
	var fname = req.body.fname;
	var lname = req.body.lname;
	var dob = req.body.dob;
	var address = req.body.address;
	var email = req.body.email;
	var phone = req.body.phone;
	var ophone = req.body.ophone;
	var gender = req.body.gender;
	var bld = req.body.bld;
	var extra = req.body.extra;
	var lastap = req.body.lastap;

	var data = {
		"patient_fname": fname,
		"patient_lname": lname,
		"email":email,
		"address":address,
		"phone":phone,
		"other_phone":ophone,
		"patient_gender":gender,
		"date_of_birth":dob,
        "blood_group":bld,
		"extra_details":extra,
		"last_appointment":lastap
	}
	db.collection('client_details').insertOne(data,(err, collection)=>{
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('blog.html');
})
app.post('/contact', (req,res)=>{
	var conname = req.body.conname;
	var conemail =req.body.conemail;
	var conaddress = req.body.conaddress;
	var conphone =req.body.conphone;
	var conophone =req.body.conophone;
	var conquery =req.body.conquery;

	var data = {
		"patient_name": conname,
		"email":conemail,
		"address":conaddress,
		"phone":conphone,
		"other-phone":conophone,
		"query":conquery
	}
	db.collection('contact').insertOne(data,(err, collection)=>{
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('services.html');
})
app.post('/care', (req,res)=>{
	var cname = req.body.cname;
	var cemail =req.body.cemail;
	var caddress = req.body.caddress;
	var cphone =req.body.cphone;
	var cophone =req.body.cophone;
	var cservice =req.body.cserivce;
	var cquery =req.body.cquery;

	var data = {
		"patient_name": cname,
		"email":cemail,
		"address":caddress,
		"phone":cphone,
		"other-phone":cophone,
		"service_request":cservice,
		"query":cquery
	}
db.collection('careAtHome').insertOne(data,(err, collection)=>{
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('blog.html');
})
app.post('/app_form', (req,res)=>{
	var doctor = req.body.doctor;
	var appt_dates = req.body.appt_dates;

	var data = {
		"doctor":doctor,
		"appointment_slots": appt_dates
	}
	db.collection('appointment').insertOne(data,(err, collection)=>{
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
	// db.collection('appointment').insertOne(app,(err, collection)=>{
	// 	if (err) throw err;
	// 	console.log("Record inserted Successfully");
			
	// });
		
	return res.redirect('appointment.html');
})
// app.get('/',function(req,res){
// res.set({
// 	'Access-control-Allow-Origin': '*'
// 	});
// return res.redirect('appointment.html');
// }).listen(3000)


app.get("/",(req,res)=> {
	res.set({
		"Allow-access-Allow-Origin": '*'
	})
	return res.redirect('appointment.html');
}).listen(3000);

console.log("server listening at port 3000");
