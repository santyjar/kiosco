'use strict';

angular.module('kioscoApp',['ngRoute','main','ngAnimate','angular.filter']);

//Modulo kiosco y rutas
angular
.module('kioscoApp')
.config(['$locationProvider','$routeProvider',
	function config($locationProvider,$routeProvider){
		$routeProvider
		.when('/',{
			template: '<dni></dni>'
		}).when('/alumno/:dni',{
			template: '<alumno></alumno>'
		}).when('/asistencia/:dni/:carrera',{
			template: '<asistencia></asistencia>'
		}).when('/vista-academica/:dni/:carrera',{
			template: '<vista-academica></vista-academica>'
		}).when('/cursada-actual/:dni/:carrera',{
			template: '<cursada-actual></cursada-actual>'
		}).when('/cursada-actual-calific/:dni/:carrera',{
			template: '<cursada-actual-calific></cursada-actual-calific>'
		}).when('/alerta-desaprobados',{
			template: '<alerta-desaprobados></alerta-desaprobados>'
		}).when('/alerta-mat-com-profesor',{
			template: '<alerta-mat-com-profesor></alerta-mat-com-profesor>'
		}).otherwise({ 
			redirectTo: '/' 
		});
	}
	]);

//Modulo main
var main = angular.module('main',['ngResource','angular.filter']);

main.service('data',function(){
	return {
		alumno: {
			matricula:'',
			dni:'',
			nombre:'',
			apellido:'',
			carreras:'',
			cursadaActual:'',
			parciales:'',
			tps:''
		},

		getAlumno: function(){
			return this.alumno;
		},

		setAlumno: function(unAlumno){
			this.alumno = unAlumno;
		}
	}
});
