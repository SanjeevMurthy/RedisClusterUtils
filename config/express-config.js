var express=require('express'),
	bodyParser=require('body-parser'),
	cookieparser=require('cookie-parser'),
	session=require('express-session');

module.exports=(app,config)=>{
	app.use(cookieparser());
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());	
}