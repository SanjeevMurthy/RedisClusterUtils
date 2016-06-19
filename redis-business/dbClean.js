var Command = require('../node_modules/ioredis/lib/command');

module.exports={
	flushNode:function(node,callback){
			node.flushall(function(err,result){
			(err)?callback(err,null):callback(null,result);
		});
	},
	flushCluster:function(cluster,callback){
		var responseArray=[];

		var ready = Promise.resolve(null);
		var masters=cluster.nodes('master');
		  masters.forEach(function (master) {
		    ready = ready.then(function () {
		      return master.flushall(function(err,result){
				return result;	
			});
		    }).then(function (value) {
		      responseArray.push(value);
		      console.log("Response Array :"+responseArray);
		    });
		  });

  		return ready.then(function () { return responseArray; });

		/*return new Promise(function(resolve,reject){
			var masters=cluster.nodes('master');

			masters.forEach(function(node){
				node.flushall(function(err,result){
					if(result!==undefined){
						responseArray.push({"node":node.options.key,"role":node.options.role,"result":result});
						console.log("Response Array :"+responseArray);
					}
				});				
			}).then(function(){
				resolve(responseArray);
			});*//*
			if(responseArray!==null){
				resolve(responseArray);
			}else{
				reject("Operation Failed");
			}*/
		//});
		
		/*cluster.nodes('master').map((node)=>{
			node.flushall((err,result)=>{
				console.log("Node :"+node.options.key);
				console.log("Flush reslut : "+result);
				responseArray.push({"node":node.options.key,"role":node.options.role,"result":result});
				console.log("Response Array :"+JSON.stringify(responseArray));				
			});

		});
		callback(null,responseArray);*/
		/*(responseArray===null || responseArray===undefined)?
			callback({"message":"Operation Failed"},null):callback(null,responseArray);*/
	},
	resetNodeStat:function(node,callback){
		node.sendCommand(resetStatCommand()).then((result)=>{
			callback(null,result);
		});
	},
	resetClusterStat:function(cluster,callback){
		var command=resetStatCommand();
		var responseArray=[];
		cluster.nodes('all').map((node)=>{
			node.sendCommand(command).then((result)=>{
				responseArray.push({"node":node.options.key,"result":result});
				console.log("Response Array :"+JSON.stringify(responseArray));
			});
		});
		(responseArray===null || responseArray===undefined)?
			callback({"message":"Operation Failed"},null):callback(null,responseArray);
	}
}


function resetStatCommand(){	
	return new Command('config',['resetstat'],{});
}
