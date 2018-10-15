var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var gulpRename = require('gulp-rename');
var del = require('del');
var svg2png = require('gulp-svg2png');

var config = {
    shape: {
        spacing: {
            padding: 1
        } 
    },
    mode :{
        css: {
            variables: {
                replaceSvgWithPng: function() {
                    return function(sprite, render) { 
                        return render(sprite).split('.svg').join('.png'); //looks in render below to find sprite part the splits .svg out - no-svg class is added by modernizr in the case of not having svg support - we then leverage this by coding a filter here
                    
                    }
                }
            },
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/tasks/sprite.css'
                }
            }
        }
    }
}

gulp.task('beginClean', function() {
    return del(['./app/temp/sprite', './app/assets/images/sprites']);
})

gulp.task('createSprite',['beginClean'], function() {
    return gulp.src('./app/assets/images/icons/**/*.svg')
     .pipe(svgSprite(config))   
        .pipe(gulp.dest('./app/temp/sprite/'));
})

gulp.task('createPngCopy', ['createSprite'], function() { //makes sure createSprite has finishes before png creation
    return gulp.src('./app/temp/sprite/css/*.svg')
        .pipe(svg2png())
            .pipe(gulp.dest('./app/temp/sprite/css/'));
})

gulp.task('copySpriteGraphic', ['createPngCopy'],function() {
    return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
        .pipe(gulp.dest('./app/assets/images/sprites'));
})

gulp.task('copySpriteCss',['createSprite'], function() {
    return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(gulpRename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
})

gulp.task('endClean',['copySpriteGraphic', 'copySpriteCss'], function() {
return del(['./app/temp/sprite']);
})
gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCss']);