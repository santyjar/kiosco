main.service('loading',function(){
	
	that = this;

	this.isLoading = false;

	this.getIsLoading = function(){
		return that.isLoading;
	}

	this.setIsLoading = function(isLoading){
		that.isLoading = isLoading;
	}
});

main.controller('loading',['$scope','$rootScope','loading',function($scope,$rootScope,loading){
	este = this;
	scope = $scope;
	$scope.loading = loading.getIsLoading;
}]);