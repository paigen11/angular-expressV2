var searchApp = angular.module('searchApp', []);
searchApp.controller('searchController', function($scope, $http){
	$scope.test= "I am sane";

	$http({
		method: "GET",
		//go make a get request to localhost3000/getStudents
		//express will be waiting
		url: 'http://localhost:3000/getStudents'
	}).then(
		//when the request is done, call success or failure
		function successCallback(response){
			//if successful set studentArray = json we got back
			$scope.studentArray = response.data;
		}, function failureCallback(response){
			$scope.result = 'Error!';
			console.log("Could not get students...");
		}
	)

	//someone clicked on the submit button...
	$scope.addStudent = function(){
		console.log($scope.newStudent);
		//make an http post request to localhost3000/addStudent
		//express happens to be listening there
		$http.post('http://localhost:3000/addStudent', { 
			//pass it an object with two properties
			//these properties correspond to req.body.xxx
			name: $scope.newStudent,
			gender: "unknown"
		}).then(function successCallback(response){
			//as soon as ajax is back, run the following code
			//if successful...
			console.log(response.data);
			if(response.data.message == 'added'){
				$scope.studentArray.push(response.data);
			}	
		}, function errorCallback(response){
			//if unsuccessful...
			console.log("Error!");
			console.log(response.data);
		});
		console.log("test");
	}

	$scope.removeStudent = function(index, student){
		$scope.studentArray.splice(index, 1);
		$http({
			method: 'post',
			url: 'http://localhost:3000/removeStudent?student=' + student.name
		});
	}
});