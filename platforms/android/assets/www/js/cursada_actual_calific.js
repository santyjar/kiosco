main.service('cursadaActualCalificSeleccionar',['$resource',function($resource){
	//return $resource('https://mifaecc.edu.ar/apk/kiosco_php/ajax/alumno_seleccionar.php',{},{
		return $resource('http://192.168.3.96/kiosco_php/ajax/alumno_seleccionar_cursadaactual_calific.php',{},{
			query:{
				method: 'GET',
				isArray:true
			}
		});
	}]);

main.component('cursadaActualCalific',{
	templateUrl:'template/cursada-actual-calific.template.html',
	
	controller:['$routeParams','$scope','dataAlumnoCA','cursadaActualCalificSeleccionar',function($routeParams,$scope,dataAlumnoCA,cursadaActualCalificSeleccionar){
		self = this;
		var resp = cursadaActualCalificSeleccionar.get({dni:$routeParams.dni,carrera:$routeParams.carrera},function(){
			console.log(resp);
			if(resp.resp == true){
				console.log(resp);
				resp.alumno.dni *= 1;
				self.alumno = resp.alumno;
				dataAlumnoCA.setAlumno(self.alumno);
			}else{
			}
		});
	}]
});