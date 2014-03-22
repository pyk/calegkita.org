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