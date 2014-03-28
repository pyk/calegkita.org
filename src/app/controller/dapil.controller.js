app.controller("DapilCtrl", 
  ["$scope", "$http",
  function ($s,$h) {
  $s.statusContent = true;
  $s.semuaDapil = [];
  $s.getDapil = function () {
    var key = "40381f1d8123102fd74d85aef44d70d5";
    var url = "http://api.pemiluapi.org/candidate/api/dapil";
    $h.get(url, {params: {apiKey: key, callback: "JSON_CALLBACK"}})
      .success(function (data,status, header, config) {
        $s.semuaDapil = data.data.results.dapil;
        if ($s.semuaDapil) {
          $s.statusContent = false;
        }
      })
      .error(function (data,status,header,config) {
        var loadingStatus = document.getElementsByClassName("loading-status")[0];
        loadingStatus.textContent = "Tidak bisa mengambil data dari server, periksa koneksi internet anda.";
      });
  };
  $s.getDapil();
  
}]);
