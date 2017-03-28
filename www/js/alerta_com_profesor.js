//MatComProf = profesor en una materia por comision

main.service('alertaSeleccionarMatComProf',['$resource',function($resource){
	//return $resource('https://mifaecc.edu.ar/apk/kiosco_php/ajax/alumno_seleccionar.php',{},{
		return $resource('http://192.168.3.96/kiosco_php/ajax/siga/comisionMateria_seleccionar_alerta_profesores2.php',{},{
			query:{
				method: 'GET',
				isArray:true
			}
		});
	}]);


main.component('alertaMatComProfesor',{
	templateUrl:'template/alerta-mat-com-profesor.template.html',
	controller: ['$scope','alertaMatComProf','alertaSeleccionarMatComProf',function($scope,alertaMatComProf,alertaSeleccionarMatComProf){
		var self = this;
		var ambito = $scope;

		this.alumnos = alertaMatComProf.getMatComProf();

		this.getMatComProf = function(){

		}
		
		var resp = alertaSeleccionarMatComProf.get({},function(){
			console.log(resp);
			if(resp.resp == true){
				self.matComProf = resp.matComProf;
				alertaMatComProf.setMatComProf(self.matComProf);
			}
		});
	}]
});

main.service('alertaMatComProf',function(){
	return {
		matComProf: {},

		getMatComProf: function(){
			return this.matComProf;
		},

		setMatComProf: function(unaMatComProf){
			this.matComProf = unaMatComProf;
		}
	}
});