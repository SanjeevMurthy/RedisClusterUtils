var Redis=require('ioredis');
var config=require('../config/config')['local'];
var redis = {
  cluster: null
}

module.exports={
	connect:() => {
		if(redis.cluster){
			console.log("Already connected !!");
			return redis.cluster;
		}else{
			redis.cluster=new Redis.Cluster(config.clusterNodes,{"enableReadyCheck":true});			
			console.log("redis Cluster Status :"+redis.cluster.status);
			redis.cluster.on('error',function(){
				console.log('Error !!!');
			})
			return redis.cluster;
		}				
	}
}