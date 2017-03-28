main.service('cursadaActualSeleccionar',['$resource',function($resource){
	//return $resource('https://mifaecc.edu.ar/apk/kiosco_php/ajax/alumno_seleccionar.php',{},{
		return $resource('http://192.168.3.96/kiosco_php/ajax/alumno_seleccionar_cursadaactual_hs.php',{},{
			query:{
				method: 'GET',
				isArray:true
			}
		});
	}]);

//datos de cursadaActual
main.service('dataAlumnoCA',function(){
	return {
		cursadaActual: {
			alumno:'',
			carrera:''
		},

		getCursadaActual: function(){
			return this.alumno.cursadaActual;
		},

		setCursadaActual: function(unaCursadaActual){
			this.alumno.cursadaActual = unaCursadaActual;
		},

		getAlumno: function(){
			return this.alumno;
		},

		setAlumno: function(unAlumno){
			this.alumno = unAlumno;
		}
	}
});

main.filter('horario',function(){
	return function(dia,horarios){
		for(h in horarios){
			if(dia == horarios[h].dia){
				return horarios[h].descripcion;
			}
		}
	}
});

main.component('cursadaActual',{
	templateUrl:'template/cursada-actual.template.html',
	
	controller:['$routeParams','$scope','dataAlumnoCA','cursadaActualSeleccionar',function($routeParams,$scope,dataAlumnoCA,cursadaActualSeleccionar){
		self = this;

		var resp = cursadaActualSeleccionar.get({dni:$routeParams.dni,carrera:$routeParams.carrera},function(){
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