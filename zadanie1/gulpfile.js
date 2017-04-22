var gulp = require("gulp"),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	plumber = require("gulp-plumber"),  //błędy
	browserSync = require("browser-sync"),
	del = require("del"),  //usuwanie zawartosci katalogu
	useref = require("gulp-useref"),  //łaczenie skryptów
	uglify = require("gulp-uglify"),  //minifikator
	gulpif = require("gulp-if"),      // if jesli
	imagemin = require("gulp-imagemin"),  
	runSequence = require("run-sequence"),  //do sekwencyjnego wczytywania zadan
	ftp = require("vinyl-ftp"),
	gutil = require("gulp-util");  //własne komunikaty



gulp.task("css", function() {
	gutil.log(gutil.colors.yellow("Wiadomość"))
	return gulp.src("node_modules/bootstrap/scss/bootstrap.scss")
		.pipe(plumber())
		.pipe(sass.sync())
		.pipe(autoprefixer({
			browsers: ["last 5 version", "IE 9"]
		}))
		.pipe(gulp.dest("src/css/"))
		.pipe(browserSync.stream())
});


gulp.task("server", function() {
	browserSync.init({
		server: "src/"
	});
});


gulp.task("watch", function() {
	gulp.watch("node_modules/bootstrap/scss/**/*.scss", ["css"]);
	gulp.watch(["src/*html", "src/**/*js"], browserSync.reload);
});


gulp.task("clean", function() {
	return del("dist/");
});


gulp.task("html", function() {
	gulp.src("src/*html")
		.pipe(useref())
		.pipe( gulpif("*.js", uglify() ) )
		.pipe(gulp.dest("dist/"));
});


gulp.task("images", function() {
	return gulp.src("src/images/*", {
		base: "src/"
	})
		.pipe(imagemin())
		.pipe(gulp.dest("dist/"));
});


gulp.task("copy", function() {
	return gulp.src(["src/uploads/*"], {
		base: "src"
	})
	.pipe(gulp.dest("dist/"));
});


gulp.task("ftp", function() {
	var conn = ftp.create({
		host: "adres",
		user: "nazwa",
		password: "pw"
	});
	return gulp.src("dist/**/*") 
		.pipe(conn.dest("public_html/"));
});


gulp.task("build", function(cb) {
	runSequence("clean", "html", "images", "copy", cb);
});


gulp.task("build:server", ["build"], function() {
	browserSync.init({
		server: "dist/"
	});
});

gulp.task("default", ["css", "server", "watch"]);


