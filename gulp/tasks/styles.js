var gulp         = require('gulp'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    simpleVars   = require('postcss-simple-vars'),
    nested       = require('postcss-nested'),
    CSSImport    = require('postcss-import'),
    hexrgba      = require('postcss-hexrgba'),
    mixins       = require('postcss-mixins');

gulp.task('styles', function() {
    return gulp.src('./app/assets/styles/styles.css')
       .pipe(postcss([CSSImport, mixins, nested, simpleVars, hexrgba, autoprefixer])) 
       .on('error', function(errorInfo){
        console.log(errorInfo.toString())    
        this.emit('end');   //ends without gulp watch crashing?    
        })
        .pipe(gulp.dest('./app/temp/styles'))
            
});