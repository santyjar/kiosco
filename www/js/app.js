angular.module('kioscoApp',['ngRoute']);


//Modulo kiosco y rutas
angular
	.module('kioscoApp')
	.config(['$locationProvider','$routeProvider',
		function config($locationProvider,$routeProvider){
			$routeProvider.
			when('/',{
				template: '<main></main>'
			});
		}
	]);

angular
	.module('kioscoApp')
	.component('main',{
		templateUrl:'template/main.template.html',
		controller:function mainController(){
			this.dni = '';
		}
	});