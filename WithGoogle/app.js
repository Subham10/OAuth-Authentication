var http = require('http');
var qs = require('querystring');
var utility=require('./utility');
var request=require('superagent');
var clientID = 'YOUR_CLIENT_ID';
var clientSecret = 'YOUR_CLIENT_ID';
var redirect_uri= 'http://localhost:8082/auth/google/callback'
http.createServer(function (req, res) {
    var code;
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
         return;
    }
    if(req.url!=="/"){
        var url_parts = require('url').parse(req.url, true);
        var query = url_parts.query;
        code=query.code;
    }
    var p = req.url.split('/');
    pLen = p.length;
    var loginURL='https://accounts.google.com/o/oauth2/auth';
    var authURL=utility.getAuthorizedUrl(loginURL,{
                  client_id:clientID,
                  redirect_uri: redirect_uri,
                  scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
                  state: 'example return string',
                  response_type:'code'
    });
/** 
* Creating an anchor with authURL as href and sending as response
*/
    var body = '<a href="' + authURL + '"> Get Code </a>';
    if (pLen === 2 && p[1] === '') {
        res.writeHead(200, {
        'Content-Length': body.length,
        'Content-Type': 'text/html' });
        res.end(body);
    } else if (pLen === 5 && p[1].indexOf('auth') === 0) {
    
        var url='https://www.googleapis.com/oauth2/v3/token?client_id='+clientID+'&redirect_uri='+redirect_uri+'&client_secret='+clientSecret+'&code='+code+'&grant_type=authorization_code';
        
        request
        .post(url)
        .end(function(err, result) {
           if(err)
               console.log(err);
            else{
                var userURL='https://www.googleapis.com/oauth2/v3/userinfo?access_token='+ JSON.parse(result.text).access_token;
                request.get(userURL, function(err, result){
                    if (err) throw err;
                    console.log(result.text);
                    res.end(result.text);
                });
            }
        });

    } else {
        console.log("Unhandled URL");
        res.end("Unhandled URL");
    }
}).listen(8082);