"use strict";

const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');

/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del(["build"], cb);
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", ["tslint"], () => {
    let tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write(".", {
            sourceRoot: '/src'
        }))
        .pipe(gulp.dest("build"));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", () => {
    return gulp.src(["src/**/*", "!**/*.ts"])
        .pipe(gulp.dest("build"));
});

gulp.task("font-awesome", () => {
    return gulp.src(["font-awesome/css/**","font-awesome/fonts/**"], {
            cwd: "node_modules/**"
        })
        .pipe(gulp.dest("build/assets"));
});

// gulp.task("bootstrap", () => {
//     return gulp.src(["fonts/**"], {
//             cwd: "node_modules/bootstrap/dist"
//         })
//         .pipe(gulp.dest("build/assets/bootstrap/fonts"));
// });

gulp.task("primeng", () => {
    return gulp.src(["resources/themes/home/**",
            "resources/primeng.min.css"
        ], {
            cwd: "node_modules/primeng"
        })
        .pipe(gulp.dest("build/assets/primeng"));
});
/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**/*.js',
            'zone.js/dist/**',
            '@angular/**/bundles/**',
            // 'ng2-bootstrap/bundles/**',
            // 'ng2-select/**/*.js',
            'moment/min/moment-with-locales.js',
            'ng-sidebar/lib/*.js',
            'primeng/**/*.js'
        ], {
            cwd: "node_modules/**"
        }) /* Glob required here. */
        .pipe(gulp.dest("build/lib"));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function() {
    gulp.watch(["src/**/*.ts"], ['compile']).on('change', function(e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(["src/**/*.html", "src/**/*.css"], ['resources']).on('change', function(e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});

/**
 * Build the project.
 */
gulp.task("build", ['compile', 'resources', 'font-awesome', 'primeng', 'libs'], () => {
    console.log("Building the project ...");
});
