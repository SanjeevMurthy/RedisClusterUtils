var express=require('express');
var app=express();

var env = process.env.NODE_ENV= process.env.NODE_ENV || 'local';

var config=require('./config/config.js')[env];

require('./config/express-config.js')(app,config);
require('./config/routes-config.js')(app,config);


var Redis=require('ioredis');

var Command = require('./node_modules/ioredis/lib/command');
var redis=new Redis(6379,'127.0.0.1');

var dbClean=require('./redis-business/dbClean');

dbClean.resetNodeStat(redis,(err,result)=>{
	console.log("Result : "+result);
});

/*var infoCommand = new Command('config',['resetstat'],{});
 
redis.sendCommand(infoCommand).then((result)=>{
	console.log("Command Execution result  : "+result);
});*/


/*function reset(node){
	var command=new Command('config',['resetstat'],{});
		node.sendCommand(command).then((result)=>{
			console.log("resetNodeStat : ",result);
		});
	}


reset(redis);
*/

app.listen(config.port,function(){
	console.log("RedisCluster App runnin on port :",config.port);
});
