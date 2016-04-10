(function() {
    'use strict';
    angular
        .module('authApp')
        .controller('profileController',function profileController ($http, store) {

            var vm = this;
            vm.getMessage = getMessage; //public message
            vm.getSecretMessage = getSecretMessage; //secret message

            vm.message; //messages that comming from Endpoint

            vm.profile = store.get('profile'); //this will get me the access of user profile pic, nickname and more

            function getMessage() {
                $http.get('http://localhost:3001/api/public', {
                    skipAuthorization: true
                }).then(function(response) {
                    vm.message = response.data.message;
                }); //I dont need to jwt to this public endpoint
            }

            function getSecretMessage () {
                $http.get('http://localhost:3001/api/private').then(function(response) {
                    vm.message = response.data.message;
                });
            }

        });
})();
