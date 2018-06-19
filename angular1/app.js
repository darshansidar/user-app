app = angular.module("myApp",["ngRoute"]);
app.config(function($routeProvider){

$routeProvider
.when("/about",{
       templateUrl:"about.html",
       controller:"londonCtrl"
})
.when("/",{
       templateUrl:"home.html"
})
.when("/contact",{
       templateUrl:"contact.html"
})
.when("/about2",{
       templateUrl:"about2.html",
       controller:"parisCtrl"
});
});

app.controller("londonCtrl", function ($scope,$http) {
	$http.get("https://jsonplaceholder.typicode.com/users")
	.then(function(response){
		$scope.users = response.data;
	  // $scope.msg = "I love London";	
	});
    
});
app.controller("parisCtrl", function ($scope) {
    $scope.msg = "I love Paris";
});
