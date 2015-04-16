var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
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
                .transform('folderify')
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

gulp.task('build:live', ['preview'], function(){
   gulp.watch('./src/asset/javascript/**/*', ['build:asset:javascript']);
   gulp.watch('./src/asset/scss/**/*', ['build:asset:scss']);
   gulp.watch('./src/webroot/**/*', ['build:webroot']);
});


gulp.task('preview', ['build'], function(){
    browserSync({
        server: {
            baseDir: 'build'
        },
        notify: false,
        tunnel: false,
        startPath: '/'
    });

    // when build folder changes content, reload browser
    // has a timeout of 60 ms preventing a reload overflow
    gulp.watch(['./build/**/*'], (function(){
        var cb;
        return function(){
            clearTimeout(cb);
            cb = setTimeout(function(){
                reload();
            }, 60);
        };
    })());
});


gulp.task('deploy', ['build'], function(){
    return gulp.src('./build/**/*')
        .pipe($.ghPages());
});
