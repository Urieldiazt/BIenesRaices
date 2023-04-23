const {src, dest, watch, parallel} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//images
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

function versionWebp(done){
    const options = {
        quality: 50
    }
    src('src/img/**/*.{jpg,png}')
        .pipe(webp(options))
        .pipe(dest('build/img'))
    done();
}

function versionAvif(done){
    const options = {
        quality: 50
    }
    src('src/img/**/*.{jpg,png}')
        .pipe(avif(options))
        .pipe(dest('build/img'))
    done();
}

function versionImagemin(done){
    const options = {
        optimizationLevel:3
    }
    src('src/img/**/*.{jpg,png}')
        .pipe(cache(imagemin(options)))
        .pipe(dest('build/img'))
    done();
}


function css(done){
    src('src/sass/**/*.scss') //Identifica los archivos 
        .pipe(plumber())
        .pipe(sass())   //compila archivos a ejecutar
        .pipe(dest('build/css')) // almacena en disco duro
    done();
}

function javaScript(done){
    src('src/js/**/*.js')
        .pipe(dest('build/js'))
    done();
}

function dev(done){
    watch('src/sass/**/*.scss', css)
    watch('src/js/app.js', javaScript)
    done();
}


exports.css = css;
exports.javaScript = javaScript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.versionImagemin = versionImagemin;
exports.dev = parallel(versionWebp, versionAvif, versionImagemin,javaScript, dev);