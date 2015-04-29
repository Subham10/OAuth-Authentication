var http = require('http');
var qs = require('querystring');
var utility=require('./utility');
var request=require('superagent');
var oauth = require('oauth');
var http = require('http'),
    session = require('sesh').magicSession();

var _twitterConsumerKey = 'YOUR_TWITTER_CONSUMER_KEY';
var _twitterConsumerSecret = 'YOUR_TWITTER_CONSUMER_SECRET';
var redirect_uri= 'http://ipaddress:8082/auth/twitter/callback';

http.createServer(function (req, res) {
    var p = req.url.split('/');
    pLen = p.length;
    if (req.url === '/favicon.ico') {
        res.end();
         return;
    }
  
    var consumer = new oauth.OAuth(
    "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token", 
    _twitterConsumerKey, _twitterConsumerSecret, "1.0A", redirect_uri, "HMAC-SHA1");
    
    if (pLen === 2 && p[1] === '') {
        consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
           if (error) {
               res.end("Error getting OAuth request token : " + error);
           } else {  
               var loginURL='https://twitter.com/oauth/authenticate';
               var authURL=utility.getAuthorizedUrl(loginURL,{
                      oauth_token:oauthToken
               });
               req.session.data.oauthToken=oauthToken;
               req.session.data.oauthTokenSecret=oauthTokenSecret;
              //html page to display
               var body = '<a href="' + authURL + '"> Get Code </a>';
                  res.writeHead(200, {
                  'Content-Length': body.length,
                  'Content-Type': 'text/html' });
                  res.end(body);

           }
        });
    }
    if (pLen === 4 && p[1].indexOf('auth') === 0) {
                var url_parts = require('url').parse(req.url, true);
                var query = url_parts.query;
                var oauth_verifier=query.oauth_verifier;
                consumer.getOAuthAccessToken(req.session.data.oauthToken, req.session.data.oauthTokenSecret,oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
                    if (error) {
                       console.log(error);
                    } else {
                        console.log('results:'+JSON.stringify(results));
                        res.end("welcome "+results.screen_name)
                         
                    }
                });
           } 
}).listen(8082);
