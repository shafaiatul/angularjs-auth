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
