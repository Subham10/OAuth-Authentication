 --------Login With Facebook Using Node.js------

Very first thing you going to need is AppID and AppSecret from Facebook App. Please go to "https://developers.facebook.com/" and create your app.

Creating a new app:
        
                1.From navbar click My Apps --->Add a new app. 

                2.A popup menu will come.Choose 'WWW' as platform when it ask.

                3.Choose a name for your app.Don't choose facebook trademark name like
                   "Facebook","fb","facebook" etc.

                4.From 'Catagories' choose "Apps for Pages" and click on 'Create App id' button.

                5.Now from My Apps you can see the newly created app and after clicking on it you can pic your app id and app secret.

 --------Login With GitHub Using Node.js------

Very first thing you going to need is AppID and AppSecret from GitHub App. Please go to "https://github.com/settings/applications" and create your app.

Creating a new app:
                 
            1.In 'Developer applications' block click on 'Register new application'.

            2.Fill in the values for Name, Description, Website and Callback URL (it doesn’t matter what it is, as long as it starts with http://).  The callback value can be anything, but if it’s empty, the GitHub app will be locked into the OOB mode, which will prevent us from testing the OAuth Sign-in later (you’ll see Desktop applications only support the OAuth_callback value 'oob' error).
                For this example...we'll use 'http://ipaddress:port' as website and 
                'http://ipaddress:port/auth/github/callback' as callback URL.

            3.After fill up the boxes click on "Register application" and you'll get your app id and app secret.


 --------Login With Google Using Node.js------

Very first thing you going to need is AppID and AppSecret from Google App. Please go to "https://console.developers.google.com/project" and create your app.

Creating a new app:
             1.First create a new project for your app.Click on 'Create Project' button and create a project.

             2.Click on your newly created project.On the left side of the screen choose 'APIs' form 'APIs & auth'.Choose 'Google+ API' and make it on.

             3.Click on consent screen and fill up the form.

             4.Click on Credentials-->Create new Client id.Choose "Web Application" and  fill up the form.Don't use bare ipaddress like '127.0.0.1'.Google will throw 'device name and id not found error'.Use 'localhost' or any domain name and you'll get your appid and app secret.
                  In the example we use 'http://localhost:8082' and 'http://localhost:8082/auth/google/callback' subsequently



--------Login With LinkedIn Using Node.js------

Very first thing you going to need is AppID and AppSecret from GitHub App. Please go to "https://www.linkedin.com/secure/developer" and create your app.

Creating a new app:

           1.Click on 'Add New Application'.

           2.Fill up the details. In 'default scope' select ' r_basicprofile' and 'OAuth 2.0 Redirect URLs' put 'http://ipaddress:8082/auth/linkedin/callback' and left rest of the url blank.

           3.Click "Add Application" to get your app id and secret.




--------Login With Twitter Using Node.js------

Creating a new app:
       1.Click on 'Create New App'.

       2.Fill in the values for Name, Description, Website and Callback URL (it doesn’t matter what it is, as long as it starts with http://).  The callback value can be anything, but if it’s empty, the Twitter app will be locked into the OOB mode, which will prevent us from testing the OAuth Sign-in later (you’ll see Desktop applications only support the OAuth_callback value 'oob' error).
         For this example...we'll use 'http://ipaddress:port' as website and 
         'http://ipaddress:port/auth/twitter/callback' as callback URL.

       3.Once the app is created, go to the Permission tab, and change the permission to Read, Write and Access direct messages. This will result in a new value for the Access level field of the API Keys tab. From the same tab, click the button Create my access token. After generation is finished, the results will be in the Your access token section .
