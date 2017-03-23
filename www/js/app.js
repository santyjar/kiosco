'use strict';

angular.module('kioscoApp',['ngRoute','main']);

//Modulo kiosco y rutas
angular
.module('kioscoApp')
.config(['$locationProvider','$routeProvider',
	function config($locationProvider,$routeProvider){
		$routeProvider
		.when('/',{
			template: '<main></main>'
		});
	}
	]);



//Modulo main
//Trabajar con servicios para conseguir el alumno
var main = angular.module('main',['ngResource']);

main.component('main',{
	templateUrl:'template/main.template.html',
	controller:function mainController(){}
});

main.service('data',function(){

	
	return {
		alumno: {
			matricula:'',
			dni:'',
			nombre:'',
			apellido:'',
			carrera:'',
			asistencia:'',
			cursada:'',
			parciales:'',
			tps:'',
		},

		getAlumnoHttp: function(){
			var self = this;
			$http({
				url:'http://localhost/kiosco_php/ajax/alumno_seleccionar.php',
				method: 'GET',
				params:{alumno: {dni:self.alumno.dni}}
			
			}).then(function(response){

				if(response.data.resp == true){
					//self.alumno = response.data.alumno;
					self.setAlumno(response.data.alumno);
					console.log(self.alumno);
				}else{

					console.log('Nook');
				}
			});
		},

		getAlumno: function(){
			return this.alumno;
		},

		setAlumno: function(unAlumno){
			this.alumno = unAlumno;
		}
	}
});

main.service('alumnoHttp',['$resource',function($resource){
	return $resource('http://localhost/kiosco_php/ajax/alumno_seleccionar.php?alumno=:alumno',{},{
		query: {
			method: 'GET',
			params: {alumno: {dni:self.alumno.dni}},
			isArray: true
		}
	});
}]);

main.component('dni',{
	templateUrl:'template/dni.template.html',
	controller: ['$http','data',function($http,data){

		this.alumno = data.getAlumno();

		this.getAlumnoHttp = function(){

			//Peticion al servidor por el alumno

			var self = this;
			$http({
				url:'http://localhost/kiosco_php/ajax/alumno_seleccionar.php',
				method: 'GET',
				params:{alumno: {dni:self.alumno.dni}}
			
			}).then(function(response){

				if(response.data.resp == true){
					//self.alumno = response.data.alumno;
					self.alumno = response.data.alumno;
					self.alumno.dni *= 1;
					console.log(self.alumno);
				}else{

					console.log('Nook');
				}
			});
		}

	}]
});

main.component('alumno',{
	templateUrl:'template/alumno.template.html',
	controller: ['data',function(data){
		this.alumno = data.getAlumno();
	}]
});

