//読み込むパスと出力するパスを指定
const srcRootPath = "dist/";
const srcPath = {
  html: {
    src: srcRootPath + "",
    dist: srcRootPath + "",
  },
  styles: {
    src: srcRootPath + "_assets/css/",
    dist: srcRootPath + "assets/css/",
    map: srcRootPath + "assets/css/map",
  },
  scripts: {
    src: srcRootPath + "_assets/js/",
    dist: srcRootPath + "assets/js/",
    map: srcRootPath + "assets/js/map",
  },
  images: {
    src: srcRootPath + "_assets/images/",
    dist: srcRootPath + "assets/images/",
  },
};
//コピーするだけ
const extrasPath = [
  srcRootPath + "_assets/**/*",
  "!" + srcPath.styles.src + "**/*",
  "!" + srcPath.images.src + "**/*",
  "!" + srcPath.scripts.src + "**/*",
  "!" + srcRootPath + "_assets/**/_notes/*",
];

//ローカルのパス
const setting = require("./setting.json");
const rootPath = setting.rootPath;

const gulp = require("gulp");
const cssnano = require("cssnano");
const cssDeclarationSorter = require("css-declaration-sorter");
const autoprefixer = require("autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const postcssEasingGradients = require("postcss-easing-gradients");
const mqpacker = require("css-mqpacker");
const sassGlob = require("gulp-sass-glob");
const gulpif = require("gulp-if");
const browserSync = require("browser-sync");
const plumber = require("gulp-plumber");
const newer = require("gulp-newer");
const mozjpeg = require("imagemin-mozjpeg");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const del = require("del");
const terser = require("gulp-terser");
const replace = require("gulp-replace");

const html = () => {
  return (
    gulp
      .src([srcPath.html.src + "**/*.html", "!" + srcPath.html.src + "**/_*.html"])
      .pipe(gulpif(browserSync.active === true, browserSync.stream()))
  );
};

const scss = () => {
  return gulp
    .src(srcPath.styles.src + "**/*.scss", { sourcemaps: true })
    .pipe(sassGlob())
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(
      replace(
        '../../images/',
        '../images/'
      )
    )
    .pipe(
      postcss([
        autoprefixer({ grid: true }),
        postcssEasingGradients(),
        mqpacker(),
        cssnano({ autoprefixer: false }),
        cssDeclarationSorter({ order: "smacss" }),
      ])
    )
    .pipe(gulp.dest(srcPath.styles.dist, { sourcemaps: "/map" }))
    .pipe(gulpif(browserSync.active === true, browserSync.stream()));
};

const img = () => {
  return gulp
    .src(srcPath.images.src + "**/*.{png,apng,jpg,gif,svg,ico}")
    .pipe(
      plumber({
        errorHandler: (err) => {
          console.log(err);
          this.emit("end");
        },
      })
    )
    .pipe(newer(srcPath.images.dist))
    .pipe(
      imagemin([
        pngquant({
          quality: [0.6, 0.7],
          speed: 1,
          floyd: 0,
        }),
        mozjpeg({
          quality: 75,
          progressive: true,
        }),
        imagemin.svgo({
          removeXMLNS: true,
          removeDimensions: true,
          plugins: [
            {
              removeAttrs: {
                attrs: "data.*",
              },
            },
            {
              removeUnknownsAndDefaults: false,
            },
            {
              removeViewBox: false,
            },
          ],
        }),
        imagemin.gifsicle({
          optimizationLevel: 3,
        }),
      ])
    )
    .pipe(gulp.dest(srcPath.images.dist));
};

const cleanImg = () =>
  del(srcPath.images.dist + "**/*.{png,apng,jpg,gif,svg,webp,ico}");

const js = () => {
  return gulp
    .src(srcPath.scripts.src + "**/*.js", { sourcemaps: true })
    .pipe(
      plumber({
        errorHandler: (err) => {
          console.log(err);
          this.emit("end");
        },
      })
    )
    .pipe(terser())
    .pipe(gulp.dest(srcPath.scripts.dist, { sourcemaps: "map" }))
    .pipe(gulpif(browserSync.active === true, browserSync.stream()));
};

const extras = () => {
  return gulp
    .src(extrasPath, { dot: true })
    .pipe(gulp.dest(srcRootPath + "assets/"));
};

const browserSyncFunc = () => {
  browserSync({
    //browser: 'google chrome',
    proxy: rootPath,
    notify: false,
    open: "local",
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false,
    },
  });
};

const watch = () => {
  gulp.watch(srcPath.html.src + "**/*.html", html);
  gulp.watch(srcPath.styles.src + "**/*.scss", scss);
  gulp.watch(srcPath.images.src + "**/*", img);
  gulp.watch(srcPath.scripts.src + "**/*.js", js);
  gulp.watch(
    [
      srcRootPath + "_assets/**/*",
      "!" + srcPath.styles.src,
      "!" + srcPath.images.src,
      "!" + srcPath.scripts.src,
    ],
    extras
  );
};

exports.default = gulp.parallel(watch, browserSyncFunc);
exports.build = gulp.series(scss, cleanImg, img, js, extras);
