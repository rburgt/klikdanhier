var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var through2 = require('through2');
var browserify = require('browserify');


gulp.task('build',[
    'build:webroot',
    'build:asset'
]);


gulp.task('build:webroot', function(){
    return gulp.src('./src/webroot/**/*')
        .pipe(gulp.dest('./build'));
});


gulp.task('build:asset', [
    'build:asset:javascript',
    'build:asset:scss'
]);


gulp.task('build:asset:javascript', function(){
    return gulp.src('./src/asset/javascript/scriptdanhier.js')
        .pipe(through2.obj(function (file, enc, next){
            browserify(file.path)
                .bundle(function(err, res){
                    file.contents = res;
                    next(null, file);
                });
        }))
        .pipe(gulp.dest( './build/asset/javascript' ))
});


gulp.task('build:asset:scss', function(){
    return $.rubySass('./src/asset/scss/styledanhier.scss')
        .pipe(gulp.dest('./build/asset/css'));
});
