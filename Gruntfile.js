module.exports = function(grunt) {

    grunt.initConfig({

        //  __   __   __   ___ 
        // /  ` /  \ |__) |__  
        // \__, \__/ |  \ |___ 

        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                src: ['_dist/*']
            }
        },
        watch: {
            options: {
                // livereload: true
            },
            css: {
                files: ['_src/less/**/*.less'],
                // tasks: ['less', 'uncss', 'cssmin']
                tasks: ['styles']
            },
        },
        //  __  ___           ___  __  
        // /__`  |  \ / |    |__  /__` 
        // .__/  |   |  |___ |___ .__/ 
        less: {
            main: {
                options: {
                    sourceMap: false,
                    sourceMapFileInline: false,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    '_src/css/codeflow.css': '_src/less/codeflow.less'
                }
            },
            external: {
                options: {
                    sourceMap: false,
                    sourceMapFileInline: false,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    '_src/css/external.css': '_src/less/external.less'
                }
            }
        },
        postcss: {
            options: {
                // map: {
                //     inline: false, // save all sourcemaps as separate files...
                //     // annotation: 'dist/css/maps/' // ...to the specified directory
                //     prev: '_src/css/',
                // },
                processors: [
                    // require('pixrem')(), // add fallbacks for rem units

                    require('rucksack-css'),
                    // add vendor prefixes
                    require('autoprefixer')({
                        browsers: ['last 6 versions']
                    }),
                    // disable comments
                    require('postcss-discard-comments'),
                    require('postcss-zindex'),

                    // //merge same rules
                    // require('postcss-merge-rules'),
                    // //sort


                    // require('css-declaration-sorter')({
                    //     order: 'smacss'
                    // }),

                    //join media querries
                    require('css-mqpacker'),

                    require('postcss-unique-selectors'),
                    require('postcss-discard-unused'),
                    require('postcss-discard-empty'),
                    require('postcss-discard-duplicates'),

                    // need config in future
                    // require("stylelint")(),

                    require('cssnano')({
                        discardUnused: {fontFace: false}
                    }),

                ],
            },
            main: {
                src: '_src/css/codeflow.css',
                dest: '_dist/css/antares.css'
            },
            framework: {
                src: '_src/css/antares_framework.css',
                dest: '_dist/css/antares_framework.css'
            },
            login: {
                src: '_src/css/login.css',
                dest: '_dist/css/login.css'
            },
            bower_assets: {
                src: '_src/css/bower_assets.css',
                dest: '_dist/css/bower_assets.css'
            },
            external: {
                src: '_src/css/external.css',
                dest: '_dist/css/external.css'
            }
        },


    });


    //
    // MAIN
    //

    grunt.registerTask('default', [], function() {
        grunt.task.run('styles-clean');
    });

    grunt.registerTask('watch', [], function() {
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.task.run('watch');
    });

    // STYLES
    grunt.registerTask('styles', [], function() {
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-postcss');
        grunt.task.run('less:main', 'less:external', 'postcss:main', 'postcss:external');
    });

    // STYLES with dist clean
    grunt.registerTask('styles-clean', [], function() {
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-postcss');
        grunt.task.run('clean', 'less:main', 'less:external', 'postcss:main', 'postcss:external');
    });

};
