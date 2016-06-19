var redisCluster=require('../controllers/redis-cluster-controller');

module.exports=function(app){

	app.get('/',(req,res)=>{
		res.status(200).json("Welcome to RedisCluster API !!");
	});

	app.get('/getvalue/:key',(req,res)=>{
		console.log("Request for Key :",req.params.key);
		redisCluster.getValueBykey(req.params.key,(err,result)=>{
			(err)?error(err,res):success(result,res);
		});
	});

	app.post('/setvalue',(req,res)=>{
		var key=req.body.key;
		var value=req.body.value;
		console.log("Post Body : {"+key+":"+value+"}");		
		redisCluster.setValueByKey(key,value,(err,result)=>{
			(err)?error(err,res):success(result,res);
		});
	});

	app.get('/flushcluster',(req,res)=>{
		redisCluster.flushCluster((err,result)=>{
			(err)?error(err,res):success(result,res);
		});
	});

	app.get('/resetclusterstat',(req,res)=>{
		redisCluster.resetClusterStat((err,result)=>{
			(err)?error(err,res):success(result,res);
		});
	});
}



	function error(err,res){
		res.status(404);
		res.json(err.message).end();
	}

	function success(result,res){
		res.status(200);
		res.json(result);
	}