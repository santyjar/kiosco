main.service('alumnoSeleccionar',['$resource',function($resource){
	//return $resource('https://mifaecc.edu.ar/apk/kiosco_php/ajax/alumno_seleccionar.php',{},{
		return $resource('http://192.168.3.96/kiosco_php/ajax/alumno_seleccionar.php',{},{
			query:{
				method: 'GET',
				isArray:true
			}
		});
	}]);

main.component('alumno',{
	templateUrl:'template/alumno.template.html',
	controller: ['$scope','data','alumnoSeleccionar','$routeParams',function($scope,data,alumnoSeleccionar,$routeParams){
		var self = this;
		var ambito = $scope;


		this.alumno = data.getAlumno();

		this.getAlumno = function(){
		}
		
		var resp = alumnoSeleccionar.get({dni:$routeParams.dni},function(){
			console.log(resp);
			if(resp.resp == true){
				resp.alumno.dni *= 1;
				self.alumno = resp.alumno;
				data.setAlumno(self.alumno);
				ambito.dataShow = true;
			}else{
				ambito.dataShow = false;
			}
		});	
		
	}]
});