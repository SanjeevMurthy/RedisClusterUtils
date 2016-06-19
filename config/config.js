var path=require('path');
var rootPath = path.normalize(__dirname+'/../');

module.exports={
	dev :{
		rootPath:rootPath,
		port:process.env.PORT || 5050,
		clusterNodes:[
			{port:3001,host: '172.28.150.71'},
			{port: 3002,host: '172.28.150.71'},
			{port: 3003,host: '172.28.150.71'},
			{port: 3004,host: '172.28.150.71'},
			{port: 3005,host: '172.28.150.71'},
			{port: 3006,host: '172.28.150.71'}
		]
	},
	prod : {
		rootPath:rootPath,
		port:process.env.PORT || 80,
		clusterNodes:[
			{port:3001,host: '172.28.150.7'},
			{port: 3002,host: '172.28.150.7'},
			{port: 3003,host: '172.28.150.7'},
			{port: 3004,host: '172.28.150.7'},
			{port: 3005,host: '172.28.150.7'},
			{port: 3006,host: '172.28.150.7'}
		]

	},
	local :{
		rootPath:rootPath,
		port:process.env.PORT || 4040,
		clusterNodes:[
			{port:3001,host: '127.0.0.1'},
			{port: 3002,host: '127.0.0.1'},
			{port: 3003,host: '127.0.0.1'},
			{port: 3004,host: '127.0.0.1'},
			{port: 3005,host: '127.0.0.1'},
			{port: 3006,host: '127.0.0.1'}
		]
	}
}