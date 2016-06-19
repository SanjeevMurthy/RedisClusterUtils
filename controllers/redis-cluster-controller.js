var cluster=require('../redis-business/cluster').connect();
var dbClean=require('../redis-business/dbClean');
var Promise = require('promise');

var masters = cluster.nodes('master');
/*masters.map(function(node){
	var array=Object.getOwnPropertyNames(node).filter(function(p){
		 return typeof node[p] === 'function';
	});
	console.log(Object.getOwnPropertyNames(node));
});*/

module.exports={
	getValueBykey:(key,callback) => {
		cluster.get(key,(err,result)=>{
			if(result === undefined || result ===null){
				result="No values found";
			}
			(err)?callback(err,null):callback(null,result);
		});
	},
	setValueByKey:(key,value,callback) => {
		cluster.set(key,value,function(err,result){
			if(result !== undefined || result !==null){
				result="Successfully saved to Cluster";
			}
			(err)?callback(err,null):callback(null,result);
		});
	},
	flushCluster:(callback)=>{
		/*dbClean.flushCluster(cluster,(err,result)=>{
			console.log("flushCluster result : "+result);
			(err)?callback(err,null):callback(null,result);
		});*/
		dbClean.flushCluster(cluster).then(function(result){
			console.log("Promise resolved !!"+result);
			callback(null,result);
		}).catch(function(reason){
			callback(reason,null);
		});
	},
	resetClusterStat:(callback)=>{
		dbClean.resetClusterStat(cluster,(err,result)=>{
			console.log("resetClusterStat result : "+result+"!!!");
			(err)?callback(err,null):callback(null,result);
		})
	}
}