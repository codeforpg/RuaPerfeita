(function () {
	'use strict'

	angular
		.module('app', ['ngRoute'])
		.config(routeConfig)

	routeConfig.$inject = ['$routeProvider', '$locationProvider'];

	function routeConfig($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		$routeProvider
			.when('/',{
				templateUrl: 'html/home.html'
			})

			.otherwise({ redirectTo: '/' });
	}

})()