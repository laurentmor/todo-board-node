var gulp=require('gulp');
var replace = require('gulp-replace');

gulp.task('prepare-for-prod',function () {
  return gulp.src("package.json")
      .pipe(replace("node-dev","node"))
      .pipe(gulp.dest("."))
      .pipe(gulp.src("config/config.json")
          .pipe(replace("localhost","HOST")));
});

/**
 *
 */
gulp.task('prepare-for-dev',function () {
  return gulp.src("package.json")
      .pipe(replace("node","node-dev"))
      .pipe(gulp.dest("."))
      .pipe(gulp.src("config/config.json")
      .pipe(replace("HOST","localhost")))
      .pipe(gulp.dest("config"));
});
