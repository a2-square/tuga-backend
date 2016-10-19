var gulp = require('gulp'),
    exec = require('child_process').exec,
    chalk = require('chalk'),
    nodemon = require('gulp-nodemon');
gulp.task('watch-server', function() {
    nodemon({
            script: 'server.js',
        })
        .on('restart', function() {
            console.log(chalk.bgBlue('Tuga-Backend Server Restarted!'));
        })
})

gulp.task('default', ['watch-server'], function() {
    exec("whoami", function(error, result) {
        console.log(chalk.bgGreen('Welcome to') + chalk.bold.bgGreen(' **Tuga-Backend**') + chalk.bold.green(' - SERVER'));
        console.log(chalk.bgBlue('Have a great day!') + ' ' + chalk.bold.yellow(result.toUpperCase()));
});
});
