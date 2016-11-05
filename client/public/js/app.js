(function () {
	'use strict'

	angular
		.module('app', ['ngRoute', 'uiGmapgoogle-maps'])
		.config(routeConfig)

	routeConfig.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];

	function routeConfig($routeProvider, $locationProvider, $httpProvider) {
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];

		$routeProvider
			.when('/',{
				templateUrl: 'html/home.html',
				controller: 'HomeController',
				controllerAs: 'hc'
			})

			.otherwise({ redirectTo: '/' });
	}

})()