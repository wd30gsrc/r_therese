// gulpプラグインを読み込みます
const { src, dest, watch, parallel, series} = require("gulp");
const sass = require("gulp-sass");
const webserver = require("gulp-webserver");


function compileSass(){
  return src('src/sass/*.scss')
  .pipe(
    sass({
      outputStyle: "expanded"
    })
  )
  .pipe(dest('dest/css'))
}

function webServer(){
  return src('dest/')
  .pipe(webserver({
    host: 'localhost',
    port: 8000,
    livereload: true,
    open: true
  }))
}

/**
 * Sassファイルを監視し、変更があったらSassを変換します
 */
function watchSassFiles(){
  watch("src/sass/*.scss", compileSass);
}

// npx gulpというコマンドを実行した時、watchSassFilesが実行されるようにします
exports.default = series(watchSassFiles, webServer);