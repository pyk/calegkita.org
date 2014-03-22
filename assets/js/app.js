var app = angular.module("caleg", ['ngRoute', 'chieffancypants.loadingBar']);
app.config(["$routeProvider",
  function($route) {
    $route
      .when("/", {
        templateUrl: "assets/views/home.html",
        controller: "HomeCtrl" 
      })
      .when("/beranda", {
        templateUrl: "assets/views/home.html",
        controller: "HomeCtrl" 
      })
      .when("/tentang", {
        templateUrl: "assets/views/tentang.html",
        controller: "TentangCtrl"
      })
      .when("/dapil", {
        templateUrl: "assets/views/dapil.html",
        controller: "DapilCtrl"
      })
      .when("/dapil/:id", {
        templateUrl: "assets/views/daftar-caleg.html",
        controller: "DaftarCalegCtrl"
      })
      .otherwise({
        redirectTo: "/"
      });
}]);
app.controller("DapilCtrl", ["$scope", "$http", function($s,$h) {
  $s.getDapil = function () {
    var key = "40381f1d8123102fd74d85aef44d70d5";
    var url = "http://api.pemiluapi.org/candidate/api/dapil";
    $h.get(url, {params: {apiKey: key, callback: "JSON_CALLBACK"}})
      .success(function(data,status, header, config){
        $s.semuaDapil = data.data.results.dapil;
      })
      .error(function(data,status,header,config) {
        
      });
  };

  $s.getDapil();
}]);

var cuk = "as";