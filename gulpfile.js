
var gulp = require('gulp');
var concat = require ('gulp-concat');
var uglify = require ('gulp-uglify');
var sass = require ('gulp-sass');
var minifyCSS = require ('gulp-minify-css');

// 1era tarea: "Script" concatena archivos js
gulp.task('script', function(){
	gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/materialize-css/dist/js/materialize.js', 'public/assets/js/main.js'])
	.pipe(concat('script.js'))//guardados en script.js
	.pipe(gulp.dest('public/assets/js'));//en la carpeta "dist"
});

// 2da tarea: "Style" concatena y minifica main.css
gulp.task('style', function(){
	gulp.src(['node_modules/materialize-css/dist/css/materialize.css', 'public/assets/sass/main.scss'])
	.pipe(sass().on('error', sass.logError))
	.pipe(minifyCSS())
	.pipe(concat('style.min.css'))//lo convierte en style.min.css
	.pipe(gulp.dest('public/assets/css/'));
});

// Watch SASS
gulp.task('watch', function(){
	gulp.watch('assets/sass/*.scss',['style']);
});

// Tareas que se ejecutan al correr el comando "gulp" en la terminal
gulp.task('default', ['script', 'style', 'watch']);