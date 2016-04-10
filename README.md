###Planning
* Sign up for Auth0
* Simple AngularJS FrontEnd
* Simple NodeJS Backend with Express
* Send the JWT as an authorization header

#jwt interceptor provider:
It makes use of Angular http interceptor, an http interceptor in Angular basically a request to be intercepted and transformed before they go out. Like wise when response come back they can intercepted and transformed as well. The transformation I want to make in this case -
I want to add this jwt as 'authorization header' before the request goes out. This way I can have jwt authorization header attached to all the requests.
I configured that in app.js file.
* After getting the token from the local storage I need to push this interceptor into the array of http interceptor that comes from Angular
$httpProvider.interceptors.push('jwtInterceptor'); //this is actually the angular-jwt not the jwtInterceptorProvider
