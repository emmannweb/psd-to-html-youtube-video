

//require npm modules

var gulp          = require('gulp');
var less          = require('gulp-less');
var sourcemaps    = require('gulp-sourcemaps');
var LessAutoprefix = require('less-plugin-autoprefix');
var watch         = require('gulp-watch');
var browserSync   = require('browser-sync').create();

// compile less to css
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

gulp.task('less', function () {
 return gulp.src('../css/style.less')
   .pipe(sourcemaps.init())
   .pipe(less({
    plugins: [autoprefix]
	}))
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('../css'))
   .pipe(browserSync.stream());

});

//server
gulp.task('serve', function(){
    browserSync.init({
        proxy   : "http://localhost/psdtohtml"
    });
});

// trigger the reload on call
function reload(done) {
	browserSync.reload();
	done();
}

// Start the live reload server and watch files for change
gulp.task( 'watch', function() {
  gulp.watch( '../css/**/*.less', gulp.series('less', reload) );
  // gulp.watch( '../themefiles/js/**/*.js', gulp.series('less', reload) );
  //gulp.watch('../assets/js/main.js').on('change', browserSync.reload);
  gulp.watch('../**/*.html').on('change', browserSync.reload);

});

// default task
gulp.task('default', gulp.parallel('serve', 'watch'));
