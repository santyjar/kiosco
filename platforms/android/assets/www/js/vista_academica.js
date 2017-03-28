main.service('vistaAcademicaSeleccionar',['$resource',function($resource){
	//return $resource('https://mifaecc.edu.ar/apk/kiosco_php/ajax/alumno_seleccionar.php',{},{
		return $resource('http://192.168.3.96/kiosco_php/ajax/alumno_seleccionar_vistaacademica.php',{},{
			query:{
				method: 'GET',
				isArray:true
			}
		});
	}]);

//datos de vista academica
main.service('dataVA',function(){
	return {
		vistaAcademica: {
			alumno:'',
			carrera:''
		},

		getVistaAcademica: function(){
			return this.alumno;
		},

		setVistaAcademica: function(unaVistaAcademica){
			this.vistaAcademica = unaVistaAcademica;
		}
	}
});

main.component('vistaAcademica',{
	templateUrl:'template/vista-academica.template.html',
	
	controller:
	['$routeParams','dataVA','vistaAcademicaSeleccionar','$scope','$sce','loading',
	function($routeParams,dataVA,vistaAcademicaSeleccionar,$scope,$sce,loading){
		self = this;

		loading.setIsLoading(true);

		var resp = vistaAcademicaSeleccionar.get({dni:$routeParams.dni,carrera:$routeParams.carrera},function(){
			console.log(resp);
			if(resp.resp == true){
				resp.vistaAcademica.alumno.dni *= 1;
				self.vistaAcademica = resp.vistaAcademica;
				dataVA.setVistaAcademica(self.vistaAcademica);
			}else{
				text = "";
				for(i in resp){
					text+=resp[i];
				}
				console.log(text);
			}
			loading.setIsLoading(false);
		});
		
		$scope.getClassXEstado = function(materia){
			//Se especifica en NOTAS como se usaron los estados
			
			//Ver de poner puedecursar mas abajo porque aca puede traer problemas 
			if(!self.puedeCursar(materia)){
				return "no-puede-cursar";
			}

			var ids = {
				0:"no-cursa",
				3:"no-cursa",
				6:"no-cursa",
				8:"no-cursa",
				10:"no-cursa",
				12:"no-cursa",
				13:"no-cursa",
				14:"no-cursa",
				1:"cursando",
				2:"cursando",
				4:"cursada-ap",
				5:"cursada-ap",
				7:"aprovada",
				9:"aprovada",
				11:"aprovada"
			};

			return (typeof ids[materia.estado.id]!=undefined?ids[materia.estado.id]:"puede-cursar");
			
		}

		this.cursadaAprobada = function(estado){
			if(estado.id*1 == 4 || estado.id*1 == 5){
				return true;
			}else{
				return false;
			}
		}

		this.materiaAprobada = function(estado){
			if(estado.id*1 == 7 || estado.id*1 == 9 || estado.id*1 == 11){
				return true;
			}else{
				return false;
			}
		}

		this.comprobarCorrelativas = function(materia){
			/*if(typeof materia.correlativas == "object"){
				for(matCor in materia.correlativas){
					if(typeof matCor.estado == "object"){
						if(self.materiaAprobada)
					}
				}
			}*/
		}

		this.correlativasDependientes = function(materia){
			//Devuelve las materias que son correlativas de materia
			mates = self.vistaAcademica.carrera.materias;
			matesSelect = [];
			for(var i in mates){
				if(typeof mates[i].correlativas == "object"){
					for(var j in mates[i].correlativas){
						if(mates[i].correlativas[j].id == materia.id){
							matesSelect.push(mates[i]);
							break;
						}
					}
				}
			}
			return matesSelect;
		}

		this.buscarMateria = function(materia){
			mates = self.vistaAcademica.carrera.materias
			for(var i in mates){
				var buscada = false;
				if(materia.id == mates[i].id){
					buscada = mates[i];
					break;
				}
			}

			return buscada;
		}

		this.puedeCursar = function(materia){

			//var corr = self.comprobarCorrelativas();
			var corr = true;

			if(materia.anio==2){
				var segundo = self.puedeCursar2do();

				return (segundo && corr);	
			}else if(materia.anio == 3){
				var tersero = self.puedeCursar3ro();
				return (tersero && corr);	
			}else{
				return corr;
			}
			
		}

		this.puedeCursar2do = function(){
			//comprueba que alla aprobado 50% de primero

			matAprobadas = 0;
			matTotal = 0;
			mates = self.vistaAcademica.carrera.materias;
			for(var i in mates){
				if(mates[i].anio == 1){
					matTotal++;
					if(self.materiaAprobada(mates[i].estado)){
						matAprobadas++;
					}
				}
			}
			
			return ((matAprobadas/matTotal)>=0.5?true:false);
		}

		this.puedeCursar3ro = function(){
			//comprueba 50% de segundo y 100% de primero o adeuda 1 de primero y 100% segundo

			matAprobadas1 = 0;
			matTotal1 = 0;

			matAprobadas2 = 0;
			matTotal2 = 0;
			mates = self.vistaAcademica.carrera.materias;
			for(var i in mates){
				if(mates[i].anio == 1){
					matTotal1++;
					if(self.materiaAprobada(mates[i].estado)){
						matAprobadas1++;
					}
				}else if(mates[i].anio == 2){
					matTotal2++;
					if(self.materiaAprobada(mates[i].estado)){
						matAprobadas2++;
					}
				}
			}

			primero = ((matAprobadas1/matTotal1)==1);
			segundo = ((matAprobadas2/matTotal2)>=0.5);	

			if(primero && segundo){
				return true
			}else{
				primero = ((matTotal1-matAprobadas1)<=1);
				segundo = ((matTotal2-matAprobadas2)==0);
				return (primero && segundo);
			}
		}

		$scope.mostrarDescripcionMateria = function(materia){
			//Verifico lo que puede cursar una materia
			$("#modalTitle").html("");
			$("#modalBody").html("");
			var cursar = self.puedeCursar(materia);
			$("#modalTitle").html(materia.nombre);
			var modalBody = "";
			var encavesado = false;
			if(materia.anio==2){
				if(!self.puedeCursar2do()){
					encavesado = true;
					modalBody +="<h4>Necesita para cursar y rendir final:1</h4><ul>";
					modalBody +="<li class='no-puede-cursar'>Nesesitas haber aprobado 50% de las materias de 1° Año.</li>";
				}

			}else if(materia.anio==3){
				if(!self.puedeCursar3ro()){
					encavesado = true;
					modalBody +="<h4>Necesita para cursar y rendir final:2</h4><ul>";
					modalBody +="<li class='no-puede-cursar'>Nesesitas haber aprobado 50% de las materias de 2° Año y el 100% de las materias de 1° Año o haber aprobado el 100% de 2° Año y deber una materia de 1° Año.</li>";
				}
			}

			if(typeof materia.correlativas == "object"){
				if(materia.correlativas.length > 0){
					modalBody +=(!encavesado?"<h4>Necesita para cursar y rendir final:3</h4><ul>":"");
					for(var i in materia.correlativas){
						var clase = $scope.getClassXEstado(materia.correlativas[i]);
						modalBody += "<li class='"+clase+"'>"+materia.correlativas[i].nombre+(typeof materia.correlativas[i].estado.descripcion!="undefined"?" - "+materia.correlativas[i].estado.descripcion:"")+"</li>";
					}

					modalBody += "</ul>";
				}else if(encavesado){
					modalBody+="</ul>";
				}
			}else if(encavesado){
				modalBody+="</ul>";
			}

			var dependientes = self.correlativasDependientes(materia);

			if(dependientes.length>0){
				modalBody += "<h4>Te permite cursar y rendir final:</h4><ul>";
				for(var j=0;j<dependientes.length;j++){
					var clase = $scope.getClassXEstado(dependientes[j]);
					modalBody += "<li class='"+clase+"'>"+dependientes[j].nombre+(typeof dependientes[j].estado.descripcion!="undefined"?" - "+dependientes[j].estado.descripcion:"")+"</li>";
				}

				modalBody += "</ul>";
			}

			if(modalBody==""){
				modalBody = "<h5 class='text-center'>No hay información para mostrar</h5>";
			}

			$("#modalBody").html(modalBody);
			$('#modal-materia-detalles').modal('show');
		}

	}]
});