// gulpプラグインの読み込み
var gulp = require('gulp');
var notify = require("gulp-notify"); // エラー時の通知
var plumber = require('gulp-plumber'); // エラーでもファイル監視(watch)を続ける
var sass = require("gulp-sass"); //SassをCSSに
var autoprefixer = require("gulp-autoprefixer"); //Sassにベンダープレフィックスをつける
var uglify = require('gulp-uglify'); //JSの圧縮
var plumber = require("gulp-plumber"); //エラーハンドリング
var pug = require('gulp-pug');

//scssにベンダープレフィックスをつけて圧縮してコンパイル
gulp.task('scss', function() {
    gulp.src('src/sass/*.scss')
        .pipe(plumber())
        .pipe(autoprefixer({ // ベンダープレフィックスの付与
            browsers: ['last 2 version', 'ie >= 10','iOS >= 11', 'Android >= 4.4'], // (ベンダープレフィックスを付与する)対応ブラウザの指定
            cascade: false // 整形しない
        }))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('dest/css')); // cssディレクトリに書き出す
});

//jsを圧縮
gulp.task('js', function() {
    //実行するファイル
    gulp.src('src/js/*.js')
        //pipeでつなぐ
        .pipe(plumber())//エラーハンドリング
        .pipe(uglify())// 圧縮
        .pipe(gulp.dest('dest/js/min'));//圧縮したファイルを出力
});

//Pug
gulp.task('pug', () => {
    return gulp.src('src/pug/*.pug')
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dest'));
});



// 自動監視化
gulp.task('watch', function(){
    gulp.watch('src/scss/*.scss', ['scss']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/pug/*.pug', ['pug']);
});

gulp.task('default', ['watch']);