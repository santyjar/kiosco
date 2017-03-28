main.service('alertaSeleccionar',['$resource',function($resource){
	//return $resource('https://mifaecc.edu.ar/apk/kiosco_php/ajax/alumno_seleccionar.php',{},{
		return $resource('http://192.168.3.96/kiosco_php/ajax/alumno_seleccionar_alerta.php');
	}]);

main.service('alertaAlumnoSeleccionar',['$resource',function($resource){
	//return $resource('https://mifaecc.edu.ar/apk/kiosco_php/ajax/alumno_seleccionar.php',{},{
		return $resource('http://192.168.3.96/kiosco_php/ajax/alumno_seleccionar_datos.php',{},{
			query:{
				method: 'GET',
				isArray:true
			}
		});
	}]);

main.component('alertaDesaprobados',{
	templateUrl:'template/alerta-desaprobados.template.html',
	controller: ['$scope','alertaAlumnos','alertaSeleccionar','alertaAlumnoSeleccionar',function($scope,alertaAlumnos,alertaSeleccionar,alertaAlumnoSeleccionar){
		var self = this;
		var ambito = $scope;

		this.alumnos = alertaAlumnos.getAlumnos();

		this.getAlerta = function(){

		}
		
		var resp = alertaSeleccionar.get({},function(){
			console.log(resp);
			if(resp.resp == true){
				self.alumnos = resp.alumno;
				alertaAlumnos.setAlumnos(self.alumnos);
			}
		});
		//}


		$scope.mostrarDescripcionAlumno = function(alumno){
			$("#modalTitle").html("");
			$("#modalBody").html("");
			var resp = alertaAlumnoSeleccionar.get({dni:alumno.dni},function(){
				console.log(resp);
				if(resp.resp == true){
					alumno = resp.alumno;

					var modalTitle = alumno.matricula+" - "+alumno.nombre+" "+alumno.apellido;
					var modalBody = "<div class='row'><div class='col-sm-8'>";

					for(var i = 0; i<alumno.cursadaActual.length;i++){
						cursada = alumno.cursadaActual[i];
						modalBody += "<h4>"+cursada.carrera.nombre+"</h4>";

						for(var j=0; j<cursada.carrera.materias.length; j++){
							materia = cursada.carrera.materias[j];
							
							modalBody += "<table class='table table-condensed'><tr><th colspan='2'>"+materia.nombre+"</th></tr>";
							asist = contarAsistencias(materia,cursada.asistencias);
							modalBody += "<tr><td>Inasistencia</td><td>"+asist.inasist+" / "+asist.asist+"</td></tr>";
							for(var k=0; k<materia.calificaciones.length; k++){
								calificacion = materia.calificaciones[k];
								modalBody += "<tr><td>"+calificacion.descEvaluacion+"</td><td>"+calificacion.descNota+"</td></tr>";
							}

						}
						modalBody += "</table>";
					}

					modalBody +="</div><div class='col-sm-4'><div class=''><h3 class='text-center'>Saldo: $"+alumno.saldo.saldo+"</h3></div></div></div>";
					if(modalBody==""){
						modalBody = "<h5 class='text-center'>No hay información para mostrar</h5>";
					}

					$("#modalTitle").html(modalTitle);
					$("#modalBody").html(modalBody);
				}

				$('#modal-alumno-detalles').modal('show');
			});

		}


	}]
});

main.service('alertaAlumnos',function(){
	return {
		alumnos: {},

		getAlumnos: function(){
			return this.alumnos;
		},

		setAlumnos: function(unAlumno){
			this.alumnos = unAlumno;
		}
	}
});


function contarAsistencias(materia,asistencias){
	cantAsist = 0;
	cantInasist = 0;
	var i,j;

				console.log(asistencias);
	for(i in asistencias){
		if(materia.id == asistencias[i].materia.id){
	
			for(j in asistencias[i].clases ){
				if(asistencias[i].clases[j].estado==2){
					cantInasist++;
				}
				cantAsist++;
			}
		}
	}
	return {asist:cantAsist,inasist:cantInasist};
}