(function () {
		
	function getFieldItem(source, fieldName) {
		return getItemByKey(source,"field",fieldName);
	}
	
	function getItemByKey(source,key,value){
		var arr = $.grep(source, function (n, i) {

			return (n[key] == value);
		});

		return arr[0];
	}
	

	angular.module("power-form",[]).controller("limitsController",function($scope,$element){
		$scope.limits = [];
		
		$scope.init = function(data){
			
		}
		
	});

})()