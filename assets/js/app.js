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
app.controller("DaftarCalegCtrl",
  ["$scope", "$routeParams", "$http", "cfpLoadingBar", "$timeout",
  function ($s,$rp,$h, cfpLoadingBar, $timeout) {
    $s.daftarCaleg = [];
    $s.dapil = {};
    $s.provinsi = {};
    $s.statusContent = true;

    var url = "http://api.pemiluapi.org/candidate/api/caleg";
    $h.get(url, {params: {
      apiKey: "40381f1d8123102fd74d85aef44d70d5",
      dapil: $rp.id
        }})
      .success(function (data) {
        $s.daftarCaleg = data.data.results.caleg;
        $s.dapil = $s.daftarCaleg[0].dapil
        $s.provinsi = $s.daftarCaleg[0].provinsi
        if ($s.dapil) {
          $s.statusContent = false;
        }
      });
    
    // $s.start = function() {
    //   cfpLoadingBar.start();
    // };

    // $s.complete = function () {
    //   cfpLoadingBar.complete();
    // };

    
    // $s.start();
    // $timeout(function() {
    //   $s.complete();
    //   $s.statusContent = false;
    // }, 1250);
}]);
app.controller("DapilCtrl", 
  ["$scope", "$http", "cfpLoadingBar", "$timeout",
  function ($s,$h, cfpLoadingBar, $timeout) {
  $s.statusContent = true;
  $s.semuaDapil = [];
  $s.getDapil = function () {
    var key = "40381f1d8123102fd74d85aef44d70d5";
    var url = "http://api.pemiluapi.org/candidate/api/dapil";
    $h.get(url, {params: {apiKey: key, callback: "JSON_CALLBACK"}})
      .success(function(data,status, header, config){
        $s.semuaDapil = data.data.results.dapil;
        if ($s.semuaDapil) {
          $s.statusContent = false;
        }
      })
      .error(function(data,status,header,config) {
        
      });
  };
  $s.getDapil();
  
}]);

var cuk = "as";