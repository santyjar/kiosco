main.service('alumnoSeleccionarInasistencia',['$resource',function($resource){
	return $resource('http://192.168.3.96/kiosco_php/ajax/alumno_seleccionar_inasistencia.php');
}]);

main.component('asistencia',{
	templateUrl:'template/asistencia.template.html',
	controller:['$routeParams','data','alumnoSeleccionarInasistencia','$scope','$rootScope','loading',function($routeParams,data,alumnoSeleccionarInasistencia,$scope,$rootScope,loading){
		
		loading.setIsLoading(true);

		self = this;
		var scope = $scope;
		var resp = alumnoSeleccionarInasistencia.get({dni:$routeParams.dni,carrera:$routeParams.carrera},function(){
			console.log(resp);
			if(resp.resp == true){
				resp.alumno.dni *= 1;
				self.alumno = resp.alumno;

				data.setAlumno(self.alumno);			
			}else{

			}

			loading.setIsLoading(false);
		});
	}]
});