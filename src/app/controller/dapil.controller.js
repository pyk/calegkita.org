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
