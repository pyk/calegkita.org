/**
  Gulpfile

  TODO:
  [ ] grouping all variable and task based
      on what they do.
 */

// gulp
var gulp = require("gulp");
var gutil = require("gulp-util");
var log = gutil.log;
var colors = gutil.colors;

// layout
gulp.task("layout", function() {
  gulp.src("./src/index.html")
    .pipe(gulp.dest("./build/"))
})

// views
gulp.task("views", function() {
  gulp.src("./src/assets/views/*.html")
    .pipe(gulp.dest("./build/assets/views/"))
})

// images
gulp.task("images", function () {
  gulp.src("./src/assets/images/*.*")
    .pipe(gulp.dest("./build/assets/images/"))
})
/*
  LESS

  TODO:
  [x] saat file main.less di rubah aku ingin mengcompilenya
      menjadi main.css
  [x] saat file di directory components di rubah,
      aku ingin mengupdate hasilnya di main.css dengan
      mengcompile main.less bukan file tersebut yang di compile
  [ ] saat ada file baru di folder `src/assets/css` aku pengen
      menampilkan file apa yang baru ditambahkan lewat terminal
  [ ] ketika ada `less` component yang aku hapus, maka aku pengen
      menghandle error dari plugin `gulp-less` agar server
      tidak ikut error.
      ini salah satu automasi jika lupa menghapus @import.
      apakah bisa? coba aja...
 */
var less = require('gulp-less');
var csso = require('gulp-csso');

var lessSrc = [
  "./src/assets/css/*.less",
  "./src/assets/css/components/*.less"
];

gulp.task('less', function () {
  gulp.src("./src/assets/css/main.less")
    .pipe(less())
    .pipe(csso())
    .pipe(gulp.dest('./build/assets/css'));
});

/**
  Copy all library dependencies

  TODO:
  [x] copy angularjs.min di libs folder ke build/assets/libs
 */
var ngLibs = [
  "./src/libs/angular/angular.min.js",
  "./src/libs/angular-route/angular-route.min.js",
  "./src/libs/angular-loading-bar/build/loading-bar.min.js"
  ]
gulp.task("angularlibs", function () {
  gulp.src(ngLibs)
    .pipe(gulp.dest("./build/assets/libs/"));
});

/*
  Javascript

  TODO:
  [x] concatenate semua file js di src/app/*
      menjadi build/assets/js/app.js
 */
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task("app", function () {
  gulp.src(["./src/app/app.js", "./src/app/route.js","src/app/*/*.js"])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(concat("app.js"))
    .pipe(gulp.dest("./build/assets/js"))
})

/*
  Watching all files

  TODO:

 */
gulp.task("watch", function () {
  gulp.watch("./src/*.html", ["layout"]);
  gulp.watch("./src/assets/views/*.html", ["views"]);
  // watch less files, and compile main.less
  gulp.watch(lessSrc, ["less"]);
  gulp.watch(["./src/app/*.js", "src/app/*/*.js"], ["app"]);
});

/*
  BUILD

 */
var tasks = ["layout", "views", "images", "less", "app", "angularlibs"]
gulp.task("build", tasks, function() {})
/*
  Server

  TODO:

 */
var connect = require("connect");
var open = require("open");
var http = require("http");
var HOST = "localhost";
var PORT = 4000;

var deps = ["watch", "angularlibs"]
gulp.task('server',deps, function(callback) {

  // set connect middleware
  var app = connect()
    .use(connect.logger('dev'))
    .use(connect.static(__dirname + '/build'));

  var server = http.createServer(app).listen(PORT, HOST);

  server.on('error', function(error) {
    log(colors.underline(colors.red('ERROR'))+' Unable to start server!');
      callback(error);
  });

  server.on('listening', function() {
    var address = server.address();
    var host = HOST;
    var url = 'http://' + host + ':' + address.port + '/index.html';

    log('Started at '+colors.magenta(url));
    if(gutil.env.open) {
      log('Opening URL in browser');
      open(url);
    } else {
      log(colors.gray('(Run with --open to automatically open URL on startup)'));
    };
    });
});
