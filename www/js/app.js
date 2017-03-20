'use strict';

angular.module('kioscoApp',['ngRoute','main']);


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

//Modulo main

angular.module('main',['alumno']);

angular
.module('main')
.component('main',{
	templateUrl:'template/main.template.html',

	controller:['$http',function mainController($http){
		var self = this;
		self.dni = '';

		self.getAlumno = function(){
			$http({
				url:'http://localhost/kiosco_php/ajax/alumno_seleccionar.php',
				method: 'GET',
				params:{alumno: {dni:self.dni}}
			}).then(function(response) {
				if(response.data.resp == true){
					self.alumno.data = response.data
				}else{

				}
				console.log(alumno);
			});
		}
	}]
});

//Modulo alumno
angular.module('alumno',['ngResource']);

angular
.module('alumno')
.component('alumno',{
	templateUrl:'template/alumnoData.template.html',
	controller:function alumnoController(){
		this.data = {
			matricula:false,
			dni:false,
			nombre:false,
			apellido:false,
			carrera:false,
			asistencia:false,
			cursada:false,
			parciales:false,
			tps:false
		}
	}
});