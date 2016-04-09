(function() {
    'use strict';
    angular
        .module('authApp')
        .controller('profileController',function profileController ($http) {

            var vm = this;

            vm.message = 'hello';
        });
})();
