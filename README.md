# proxy-service
A service to proxy requests

The service is used to make request on behalf of users.

It is also having a client ID based restriction on number of request made by each user. Currently it is restricted to 50 requests/minute


Steps to install and run on local environment:-

  1.Pre-requisite:-
    
      a. Npm and node js should be installed.
      
      b. Redis client should be running on default port
      
  2.run npm install
  
  3.run node app.js, server will start on 3000 port.
  
  Sample get request:-
  https://api-rate-limiter-atdiv.run-us-west1.goorm.io/?url=https://postman-echo.com/get&clientID=u35435
