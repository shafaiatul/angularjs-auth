##Planning
* Sign up for Auth0
* Simple AngularJS FrontEnd
* Simple NodeJS Backend with Express
* Send the JWT as an authorization header

###jwt interceptor provider:
It makes use of Angular http interceptor, an http interceptor in Angular basically a request to be intercepted and transformed before they go out. Like wise when response come back they can intercepted and transformed as well. The transformation I want to make in this case -
I want to add this jwt as 'authorization header' before the request goes out. This way I can have jwt authorization header attached to all the requests.
I configured that in app.js file.
* After getting the token from the local storage I need to push this interceptor into the array of http interceptor that comes from Angular
$httpProvider.interceptors.push('jwtInterceptor'); //this is actually the angular-jwt not the jwtInterceptorProvider


![screenshot 2016-04-10 17 19 33](https://cloud.githubusercontent.com/assets/6425561/14413200/8b8f84ca-ff40-11e5-8b54-66d08d97f72e.png)
![screenshot 2016-04-10 17 16 25](https://cloud.githubusercontent.com/assets/6425561/14413199/8b8f5572-ff40-11e5-8206-8768a0d7f02c.png)
![screenshot 2016-04-10 17 18 49](https://cloud.githubusercontent.com/assets/6425561/14413201/8b909658-ff40-11e5-9949-d72e5c71205e.png)
