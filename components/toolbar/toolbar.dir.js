(function() {
    'use strict';

    angular
        .module('authApp')
        .directive('toolBar', toolbar);

        function toolbar() {
            return {
                templateUrl: 'components/toolbar/toolbar.tpl.html',
                controller: toolbarController,
                controllerAs: 'toolbar'
            };
        }

        function toolbarController (auth, store, $location) {

            var vm = this;
            vm.login = login;
            vm.logout = logout;
            vm.auth = auth; //hold few properties this will tell me whether the user is logged in or not. this will be used
            //for showing and hiding things in the template.

            function login() {
                //calling the auth0 signin method
                //profile is going to come back from auth0 and its going to be JSON object which contains the user profile detail
                //name, email and avatar url
                //token is the JWT user web token when user sign in
                //Then will set these item in local storage
                auth.signin({}, function(profile, token) {
                    //when we have successful login I wanna set to local storage
                    store.set('profile', profile);
                    store.set('id_token', token);
                    //if these are successful I want the user to redirect to the home page
                    $location.path('/home');
                }, function (error) {
                    console.log(error);
                });
            }

            function logout() {
                //all about removing those tokens from the local storage
                store.remove('profile');
                store.remove('id_token');
                //auth0 gives a signout method which basically clears the state from autho service and tells whether the user is authenticated to false
                auth.signout();
                $location.path('/home');

            }
        }
})();
