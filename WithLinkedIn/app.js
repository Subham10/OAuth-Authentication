var http = require('http');
var qs = require('querystring');
var utility=require('./utility');
var request=require('superagent');
var clientID = 'YOUR_CLIENT_ID';
var clientSecret = 'YOUR_CLIENT_SECRET';
var redirect_uri= 'http://127.0.0.1:8082/auth/linkedin/callback'
http.createServer(function (req, res) {
    var p = req.url.split('/');
    pLen = p.length;
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
        return;
    }
    var loginURL='https://linkedin.com/uas/oauth2/authorization';
    var authURL=utility.getAuthorizedUrl(loginURL,{
                  client_id:clientID,
                  redirect_uri: redirect_uri,
                  scope: 'r_fullprofile',
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
    } else if (pLen === 4 && p[1].indexOf('auth') === 0) {
        var qsObj = {};
        qsObj = qs.parse(p[3].split('?')[1]);
        var url='https://linkedin.com/uas/oauth2/accessToken?client_id='+clientID+'&redirect_uri='+redirect_uri+'&client_secret='+clientSecret+'&code='+qsObj.code+'&grant_type=authorization_code';
        request
        .post(url)
        .end(function(err, result) {
            console.log("Access Token:"+JSON.parse(result.text).access_token);
           /* 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,industry)?....' used for particular search.*/
            var userURL='https://api.linkedin.com/v1/people/~?oauth2_access_token='+JSON.parse(result.text).access_token;
            request.get(userURL, function(err, result){
                if (err) {
                    console.log(err);
                    throw err;
                }
                console.log(result.text);
                res.end(result.text);
            });
        });

    } else {
        // Unhandled url
        console.log("Unhandled URL");
        res.end("Unhandled URL");
    }
}).listen(8082);