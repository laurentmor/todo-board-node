var gulp=require('gulp');
var jeditor = require("gulp-json-editor");
gulp.task('prepare-for-prod',function (calback) {
   gulp.src("./package.json")
       .pipe(jeditor({
           "scripts":{
               "start":"node ./bin/www"
           }
       }))
       .pipe(gulp.dest("."));
   calback();
});

gulp.task('prepare-for-dev',function (calback) {
   gulp.src("./package.json")
       .pipe(jeditor({

           "scripts":{
               "start":"node-dev ./bin/www"
           }
       }))
       .pipe(gulp.dest("."));
   calback();
});

