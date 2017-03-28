/*main.service('localStorage',function(){
	this.data = function(){
		if(typeof localStorage.data=="undefined"){
			localStorage.data = [];
		}
		
		return 	localStorage.data;
	}

	this.timeLoad = function(){
		if(typeof localStorage.timeLoad=="undefined"){
			localStorage.timeLoad = [];
		}
		
		return 	localStorage.timeLoad;
	}


	this.set = function(value,data){
		if(typeof localStorage.data == "undefined"){
			localStorage.data = [];
			localStorage.timeLoad = [];
		}

		localStorage.timeLoad[value] = Date.now();
		localStorage.data[value] = data;
	}

});*/