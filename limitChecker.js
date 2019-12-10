const redis = require('redis');
const redisClient = redis.createClient({
	
});
const moment = require('moment');

module.exports = (req,res,next)=>{
	redisClient.exists(req.headers.user , (err,reply)=>{
		console.log('inside redisClient ... ' + req.headers.user + 'reply :: ' + reply);
		if(err){
			console.log('redis not working.....');
			system.exit(0);
		}
		
		if(reply === 1){
			redisClient.get(req.headers.user  , (err,reply)=>{
				if(err){
					console.log('error while getting user details');
				}
				let data = JSON.parse(reply);
				let currentTime = moment().unix();
				let difference = (currentTime - data.startTime)/60;
				if(difference >= 1){
					let body = {
						'count' : 1,
						'startTime' : moment().unix()
					}
					redisClient.set(req.headers.user , JSON.stringify(body));
					next();
				}
				
				if(difference <1){
					if(data.count >3){
						return res.json({"error" :1 , "message" :  "Limit exhausted"});				 
					}
				    data.count++;
					redisClient.set(req.headers.user,JSON.stringify(data));
					next();
				}
			});
			
		}else {
		  // add new user
		  let body = {
			'count': 1,
			'startTime': moment().unix()
		  }
		  redisClient.set(req.headers.user,JSON.stringify(body));
		  // allow request
		  next()
        }
	});
}