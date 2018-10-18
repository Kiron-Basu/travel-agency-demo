var gulp =      require('gulp'),
    imagemin =  require('gulp-imagemin'),
    del =       require('del'),
    useMin =    require('gulp-usemin'),
    rev =       require('gulp-rev'),
    cssNano =   require('gulp-cssnano'),
    uglify =    require('gulp-uglify'),
    browserSync  = require('browser-sync').create(); 

    

gulp.task('deleteDistFolder', ['icons'], function() { //changed 'Dist' to 'Docs' as neccesary for upload to github-pages (dist is a conventional name however)
    return del('./docs');
})

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
    var pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!.app/assets/styles/**',
        '!.app/assets/scripts/**',
        '!app/temp',
        '!app/temp/**'
    ]
     return gulp.src(pathsToCopy)
         .pipe(gulp.dest('./docs'))
 });

gulp.task('optimiseImages',['deleteDistFolder'], function() { //important to get the newest version of icons hence dependency
return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
    }))
        .pipe(gulp.dest("./docs/assets/images"));
})

gulp.task('useMinTrigger', ['deleteDistFolder'], function() {
    gulp.start('useMin');
});

gulp.task('useMin',['styles', 'scripts'], function() { //same with syles and scripts
    return gulp.src('./app/index.html')
        .pipe(useMin({
            css: [function() {return rev()}, function() {return cssNano()}],
            js: [function() {return rev()}, function() {return uglify()}]

        }))
            .pipe(gulp.dest('./docs'));
});

gulp.task('previewDist', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    }) 
})

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimiseImages', 'useMinTrigger']);