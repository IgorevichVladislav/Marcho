const { src, dest, watch, parallel, series } = require("gulp"); // плагины по умолчанию, которые доступны в gulp
// src - плагин, который ищет исходный файл, который будет обрабатываться для каких-либо задач.
// dest - плагин, для указания целевой директории, в которую будут сохраняться результаты обработки файлов.
// watch - плагин, используется для отслеживания изменений файлов и автоматического выполнения задач при обнаружении изменений.
// parallel - позволяет запускать несколько задач одновременно в параллельном режиме
// series - метод, позволяет последовательно выполнять задачи

const scss         = require("gulp-sass")(require("sass"));
// в переменную scss вкладываем плагины gulp-sass и sacc. Они хранятся в папке node_modules
const concat       = require("gulp-concat"); // плагин для объеденения файлов
const uglify       = require("gulp-uglify-es").default; // плагин для минификации (сжатия) JavaScript-файлов.
const browserSync  = require("browser-sync").create();
// возможность создания локального сервера разработки и синхронизации браузера, автоматическое обновление браузера
const autoprefixer = require ("gulp-autoprefixer"); // обеспечить совместимость с различными браузерами
const clean        = require ("gulp-clean"); //удаляет неиспользуемый CSS код
const avif         = require ("gulp-avif"); //позволяет создавать изображения в формате AVIF
const webp         = require ("gulp-webp"); //позволяет создавать изображения в формате webp
const imagemin     = require ("gulp-imagemin"); // уменьшение размера изображения
const newer        = require ("gulp-newer"); //позволяет заново не перезаписывать уже ранее измененные файлы
const fonter       = require ("gulp-fonter"); // кодировщик шрифтов
const ttf2woff2    = require ("gulp-ttf2woff2");
const svgSprite    = require ("gulp-svg-sprite");
const include      = require ("gulp-include"); //  позволяет включать содержимое одного файла в другой файл 

function pages() {
  return src("app/pages/*.html")
  .pipe(include({
    includePaths: 'app/components' //забераем файлы из папки components
  }))
  .pipe(dest("app"))
  .pipe(browserSync.stream()); // прописываем для обновления страницы
}

function fonts() {
  return src("app/fonts/src/*.*")
  .pipe(fonter({
    formats: ['woff', 'ttf']
  }))
  .pipe(src("app/fonts/*.ttf"))
  .pipe(ttf2woff2())
  .pipe(dest("app/fonts"))
}

function scripts() {
  return src(
    ["node_modules/jquery/dist/jquery.js",
    "node_modules/swiper/swiper-bundle.js", //подключаем swiper плагин
    "node_modules/slick-carousel/slick/slick.js", //подключаем slick плагин
    "node_modules/fancybox/dist/js/jquery.fancybox.js", //подключаем fancybox плагин
    "node_modules/rateyo/src/jquery.rateyo.js", //подключаем rateyo плагин
    "app/js/main.js"])
    //'app/js/*.js',
    //'!app/js/main.min.js' - использовать все js файлы, кроме main.min.js
    .pipe(concat("main.min.js")) // создаем файл с именем main.min.js
    .pipe(uglify()) // используем плагин для сжатия
    .pipe(dest("app/js"))
    .pipe(browserSync.stream()); // прописываем для обновления страницы
}

function styles() {
  return src("app/scss/style.scss") // ищем и возвращаем файл style.scss в app
    .pipe(autoprefixer({overrideBrowserslist: ["last 10 version"], grid: true})) // совместимость на 10 версий
    .pipe(concat("style.min.css")) // создает файл style.min.css
    .pipe(scss({ outputStyle: "compressed" })) //работает файл scc {outputStyle: 'compressed'} - минификация файла
    .pipe(dest("app/css")) // выкидывает готовый css файл в папку
    .pipe(browserSync.stream()); // прописываем для обновления страницы
  // Метод .pipe() позволяет направлять поток данных из одного Gulp-плагина в другой
}

function images() {
    return src("app/images/src/**/*.*", "!app/images/src/*.svg")
    .pipe(newer("app/images/dist")) // проверяет изображения в конечной папке, чтобы повторно не сжимать
    .pipe(avif({quality: 80})) // метод преобразования в avif и качество изображение от 0 до 100

    .pipe(src("app/images/src/**/*.*")) // для webp не нужно указывать исключение svg
    .pipe(newer("app/images/dist")) // проверяет изображения в конечной папке, чтобы повторно не сжимать
    .pipe(webp()) // указывается метод преобразования в другое изображение

    .pipe(src("app/images/src/**/*.*"))
    .pipe(newer("app/images/dist")) // проверяет изображения в конечной папке, чтобы повторно не сжимать
    .pipe(imagemin([imagemin.gifsicle({interlaced: true}), // указывается метод преобразования в другое изображение
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}]})
        ]))

    .pipe(dest("app/images/dist"))
}

function sprite() {
    return src("app/images/dist/*.svg")
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: "../sprite.svg",
                example: true
            }
        }
    }))
    .pipe(dest("app/images/dist"))
}

function watching() {
        browserSync.init({
          server: {
            baseDir: "app/",
          }
        });
  watch(["app/scss/**/*.scss"], styles); // когда произойдут изменения, запускается функция styles
  watch(["app/images/src/"], images); // когда произойдут изменения, запускается функция images
  watch(["app/js/**/*.js", '!app/js/main.min.js'], scripts); // когда произойдут изменения, запускается функция scripts
  watch(["app/components/*", 'app/pages/*'], pages); // когда произойдут изменения, запускается функция pages
  watch(["app/*.html"]).on("change", browserSync.reload); // отслеживание изменений всех файлов HTML в корневой папке
}

function cleanDist() { // удаляет файлы в dist перед переносом обновлений функции build
    return src("dist")
    .pipe(clean()) // удаление файлов перед обновлением
}

function building() {
    return src([
        "app/css/style.min.css", // забираем файлы для переноса в папку dist
        "app/js/main.min.js",
        "app/images/dist/*.*",
        "!app/images/dist/*.svg",
        "app/images/dist/sprite.svg",
        "app/fonts/*.*",
        "app/**/*.html"
    ], {base: 'app'})// сохраняем базовую структуру вложенностей папки app при переносе
    .pipe(dest("dist")) // непосредственно сам перенос в папку dist
}

exports.styles = styles; //включаем работу функции styles, чтобы работала в консоли
exports.scripts = scripts; //включаем работу функции scripts, чтобы работала в консоли
exports.images = images;
exports.building = building;
exports.fonts = fonts;
exports.pages = pages;
exports.sprite = sprite;
exports.watching = watching;

exports.build = series (cleanDist, building); // удаление файлов в dist, а после их обновление
exports.default = parallel(styles, scripts, pages, watching);
// выполнение поставленных задач в gulp вызов в консоли