'use strict';

angular.module('kioscoApp',['ngRoute','main','dni','alumno']);

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
//Trabajar con servicios para conseguir el alumno
angular.module('main',['dni','alumno']);

angular
.module('main')
.component('main',{
	templateUrl:'template/main.template.html',

	controller:function mainController($http){}
});




//Modulo alumno
angular.module('dni',['alumno']);

angular
.module('dni')
.component('dni',{
	templateUrl:'template/dni.template.html',
	controller:['factAlumno',
	function dniController(factAlumno){
		this.dni = false;
		this.alumno = false;
		
		this.getAlumno = function(){
			this.alumno = factAlumno.getAlumno(this.dni);
		}

		this.setAlumno = function(prop,dato){
			factAlumno.set(prop,dato);
		}

		this.getAlumno();
	}]
});


//Modulo alumno
angular.module('alumno',['ngResource']);

angular
.module('alumno')
.component('alumno',{
	templateUrl:'template/alumno.template.html',
	controller:function alumnoController(){
		
	}
});

//Factory para obtener un alumno

angular.module('alumno')
.factory('factAlumno',['$http',function($http){
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


	return {
		getAlumno: function(dni){
			console.log(this.data;
		},
		set: function(prop,dato){
			//this.data[prop] = dato;
			console.log(this);
		}

		/*function(dni){
			$http({
				url:'http://localhost/kiosco_php/ajax/alumno_seleccionar.php',
				method: 'GET',
				params:{alumno: {dni:self.dni}}
			}).then(function(response) {
				if(response.data.resp == true){
					self.alumno.data = response.data
				}else{

				}
			});
			return self.alumno;
		}*/
	}
}]);
