(function() {
    'use strict';

    angular
        .module('authApp', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router'])
        .config(function($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider) {

            authProvider.init({
                domain: 'shafaiatul.auth0.com',
                clientID: 'yyHwCjUyKxjqi58SeXHJaVb6eHVNqwp9'
            });

            //reguest for token
            jwtInterceptorProvider.tokenGetter = function(store) { //return the JWT from local storage
                return store.get('id_token'); //return that token and give it to the jwtInterceptorProvider to attach with the authorization header of the request
            };

            $urlRouterProvider.otherwise('/home');

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'components/home/home.tpl.html'
                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'components/profile/profile.tpl.html',
                    controller: 'profileController as user'
                });

                //if the token expires and the user get 401 status I will send the user to the home page removing the profile and token
                function redirect ($q, $injector, auth, store, $location) {
                    return {
                        responseError: function (rejection){
                            if(rejection.status === 401) {
                                auth.signout();
                                store.remove('profile');
                                store.remove('id_token');
                                $location.path('/home');
                            }
                            //this function will return a rejection from 'q'
                            return $q.reject(rejection);
                        }
                    };
                }
                //to let the Angular know about this http interceptor (401 status), lets create a quick factory using $provide service
                $provide.factory('redirect', redirect);
                $httpProvider.interceptors.push('redirect');

                $httpProvider.interceptors.push('jwtInterceptor');
        })
        .run(function($rootScope, auth, store, jwtHelper, $location) {
            $rootScope.$on('$locationChangeStart', function() {
                var token = store.get('id_token');
                if(token) {
                    if(!jwtHelper.isTokenExpired(token)) {
                        if(!auth.isAuthenticated) {
                            auth.authenticate(store.get('profile'), token);
                        }
                    }
                } else {
                    $location.path('/home');
                }
            });
        });
})();
