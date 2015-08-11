var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');

var src = 'index.js';

gulp.task('build', function () {
  return gulp.src(src)
    .pipe(babel())
    .pipe(rename('json-xhr-promise.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);
