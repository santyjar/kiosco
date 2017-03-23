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
var main = angular.module('main',[]);

main.component('main',{
	templateUrl:'template/main.template.html',
	controller:function mainController(){}
});

main.service('data',function(){
	return {
		alumno:{
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

		getAlumno: function(){
			return this.alumno;
		},

		setAlumno: function(unAlumno){
			this.alumno = unAlumno;
		}
	}
});

main.component('dni',{
	templateUrl:'template/dni.template.html',
	controller: ['data',function(data){
		self = this;

		this.alumno = data.getAlumno();
/*
		this.getAlumno = function(){
			return data.getAlumno();
		}

		this.setAlumno = function(){
			console.log(self);
			data.setAlumno(self.alumno);
		}*/
	}]
});

main.component('alumno',{
	templateUrl:'template/alumno.template.html',
	controller: ['data',function(data){
		self = this;
		this.alumno = data.getAlumno();
/*
		this.getAlumno = function(){
			return data.getAlumno();
		}

		this.setAlumno = function(){
			console.log(self);
			data.setAlumno(self.alumno);
		}*/
	}]
});

