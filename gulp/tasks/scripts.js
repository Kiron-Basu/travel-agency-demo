var gulp = require('gulp'),
    webpack = require('webpack');

gulp.task('scripts',['modernizr'] ,function(callback) { //modernizr inserted as dependency so it fires before bundling. Needed to save in a module folder js fire to trigger gulp watch rebindling - tried for ages with script files and didn't work!
    webpack(require('../../webpack.config.js'),
    function(err, stats) {
        if(err) {
            console.log(err.toString());
        }
            console.log(stats.toString());
            callback();
    });
});

