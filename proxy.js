var http = require('http');
var url = require('url');
var request = require('request');

module.exports = (req,res,next)=>{
    let queryData = url.parse(req.url, true).query;
	let URL = queryData.url;
	let clientID = queryData.clientID;
	let headers = JSON.stringify(req.headers);
	let reqMethod = req.method;
	
	var options = {
		url : queryData.url,
		method : reqMethod,
		headers : req.headers,
		body : req.body,
		json : true,
		rejectUnauthorized: false
	};
	
	console.log(JSON.stringify(options));
    if (queryData.url) {		
		var http_request = request(options, function (error, response, html) {
			if(error){
				console.log('error occured while posting data :: ' + error);
				res.status(500).send(error);
				next();
			}
			console.log('response from server :: ' + JSON.stringify(response));
			if (response.statusCode == 200) {
				console.log('success');
				next();
			}
    	}).pipe(res);
		
		http_request.setTimeout(5000,  ()=>{
			console.log('request timed out..');
			res.status(504).send('It is taking more time than expected,Try again after some time');
			next();
		});
    }
    else {
        res.end("no url found");
    }

}