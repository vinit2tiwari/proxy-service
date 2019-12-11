const url = require('url');
const redis = require('redis');
const redisClient = redis.createClient({
	
});
const moment = require('moment');

module.exports = (req,res,next)=>{
    let queryData = url.parse(req.url, true).query;
	let clientID = queryData.clientID;
	redisClient.exists(clientID , (err,reply)=>{
		console.log('inside redisClient ... ' + clientID+ 'reply :: ' + reply);
		if(err){
			console.log('redis not working.....');
			res.status(500).send('Please contact administrator');
		}
		
		if(reply === 1){
			redisClient.get(clientID  , (err,reply)=>{
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
					redisClient.set(clientID , JSON.stringify(body));
					next();
				}
				
				if(difference <1){
					if(data.count >50){
						return res.json({"error" :1 , "message" :  "Limit exhausted"});				 
					}
				    data.count++;
					redisClient.set(clientID,JSON.stringify(data));
					next();
				}
			});
			
		}else {
		  // add new user
		  let body = {
			'count': 1,
			'startTime': moment().unix()
		  }
		  redisClient.set(clientID,JSON.stringify(body));
		  // allow request
		  next()
        }
	});
}
