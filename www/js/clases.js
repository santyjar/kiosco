//RenderView es el objeto que contiene todas las templates y con el cual se va a manejar
//La idea es que se cargue en un div con una id el html que se pida y se tenga 

function RenderBlock(container,variables=false,html=false){
	this.container = container;
	this.variables = variables;
	this.html = html;

	this.render = function(html){
		container.html(html);
	}
}

function RenderViwe(){
	this.containersAhora: ,
	this.blockSiguiente = {};
	this.blockAntes = {};
	this.header = new RenderBlock($("#header"));
}
