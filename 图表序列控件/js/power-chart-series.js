/// reference to angular.js
/// reference to jquery-1.11.1.js

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
	
	var dateServies = [
		{'label':'年','value':'year'},
		{'label':'月','value':'month'}
	]
	
	var seriecItemObject = {
		field:"",
		displayName:"",
		selectedValue:"",
		operate:"Equal"
	};


	angular.module('power-form', [])
		.controller('chartseriesController',
			['$scope', '$element',
				function ($scope, $element) {
					$scope.seriesItems = [];
					$scope.fields = [];
					$scope.init = function () {
						
						var source = [{
							"field": "CreateTime",
							"type": "datetime",
							"label": "创建时间",
							"options": [2015, 2014, 2013]
						},
							{
								"field": "ThemeCategory",
								"type": "int",
								"label": "体裁",
								"options": {
									"1": "函",
									"2": "公文",
									"3": "公告",
									"4": "通知"
								}
							}
						];
						
						$scope.source = source;
						$.each(source, function (i, n) {
							$scope.fields.push({ "label": n.label, "value": n.field });
						});

						appendEmptyItem();
						
						$element.closest('form').on('submit',function(){
							$element.find('input:hidden').val(JSON.stringify($scope.seriesItems));
							
						});

					};
					
					$scope.add = appendEmptyItem;
					$scope.remove = function(id){
						$scope.seriesItems.splice(id,1);
					}
					
					function appendEmptyItem(){
						$scope.seriesItems.push($.extend({},seriecItemObject));
					}
				}]).controller('chartseriesItemController',
					['$scope', '$element',
						function ($scope, $element) {
							$scope.fieldType="int";
							$scope.isMonth = false;
							$scope.dateServies = dateServies;
							
							function setDatetimeOptions(array){
								if ($scope.model.operate=='month') {
									$scope.options = getOptionsByArray([1,2,3,4,5,6,7,8,9,10,11,12]);
								}else{
									$scope.options=getOptionsByArray(array);
								}
							}
							
							$scope.selectfield = function () {
								var field = getFieldItem($scope.$parent.source, $scope.model.field);
								$scope.field = field;
								$scope.fieldType = field.type;															
								if ($.isArray(field.options)) {
									if ($scope.fieldType == 'datetime') {
										setDatetimeOptions(field.options);
									}
									$scope.options = getOptionsByArray(field.options);
								}else{
									$scope.options = getOptionsByObject(field.options);
								}
							};
							
							
							
							$scope.changeOperate = function(){
								setDatetimeOptions($scope.field.options);
							};
							
							$scope.itemInit=function(id,seriesItem){
								$scope.id = id;
								$scope.model = seriesItem;
							};
							
							$scope.remove= function(){
								$scope.$parent.remove($scope.id);
							};
							
							$scope.options=[];
						//	$scope	field="";
						$scope.changeSelectedValue = function(){
							setDisyplayName();
						};
							
							function setDisyplayName(){
								var arr = [];
							//	arr.push($scope.field.label,":");
								arr.push(getlabelFromArray($scope.options,$scope.model.selectedValue))
								if ($scope.field.type=='datetime') {
									arr.push(getlabelFromArray(dateServies,$scope.model.operate));
									
								}
								
								$scope.model.displayName = arr.join('');
								
							}
							
							function checkMonth(){
								if ($scope.field.type == 'datetime' && $scope.model.operate=='month') {
									$scope.isMonth = true;
								}else{
									$scope.isMonth = false;
								}
							}
							
							function getOptionsByArray(array){
								var arr = [];
								$.each(array,function(i,n){
									arr.push({"label":n,"value":n});
								});
								
								return arr;
							}
							
							function getOptionsByObject(obj){
								var array = [];
								for (var key in obj) {
									if (obj.hasOwnProperty(key)) {
										var value = obj[key];
										array.push({"label":value,"value":key});
									}
								}
								
								return array;
							}
							
							function getlabelFromArray(array,value){
								var result = getItemByKey(array,"value",value);
								if (result) {
									return result.label;
								}
								
								return "";
							}
						}]);


})()