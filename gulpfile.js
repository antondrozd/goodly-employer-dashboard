const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const imagemin = require('gulp-imagemin')
const server = require('browser-sync').create()
const del = require('del')

function style() {
  return gulp
    .src('src/scss/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      postcss([
        autoprefixer({
          browsers: ['last 2 versions']
        })
      ])
    )
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream())
}

function views() {
  return gulp
    .src('src/pug/pages/**/*.pug')
    .pipe(plumber())
    .pipe(
      pug({
        basedir: './src/pug',
        pretty: true
      })
    )
    .pipe(gulp.dest('build'))
    .pipe(server.stream())
}

function images() {
  return gulp
    .src('src/img/**/*.{png,jpg,gif}')
    .pipe(plumber())
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.jpegtran({ progressive: true })
      ])
    )
    .pipe(gulp.dest('build/img'))
}

function clean() {
  return del('build')
}

function copy() {
  return gulp
    .src(['src/fonts/**/*.{woff,woff2,ttf}', 'src/js/**'], {
      base: 'src'
    })
    .pipe(gulp.dest('build'))
}

function build(done) {
  gulp.series(clean, copy, images, views, style, seriesDone => {
    seriesDone()
    done()
  })()
}

gulp.task('style', style)
gulp.task('views', views)
gulp.task('images', images)
gulp.task('clean', clean)
gulp.task('copy', copy)
gulp.task('build', build)

gulp.task('serve', () => {
  server.init({
    server: {
      baseDir: 'build',
      serveStaticOptions: {
        extensions: ['html']
      }
    },
    notify: false,
    open: false,
    cors: true,
    ui: false
  })

  gulp.watch('src/scss/**/*.scss', style)
  gulp.watch('src/pug/**/*.pug', views)
})
