module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            style: {
                options: {
                    paths: ['./public/less']
                },
                files: {
                    './public/dist/css/style.css': './public/less/style.less'
                }
            }
        },
        watch: { // start here
            css: {
                files: ['./public/less/*.less'],
                tasks: ['newer:less:style', 'cssmin'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['./public/js/*.js'],
                tasks: ['concat:js', 'uglify:js'],
                options: {
                    livereload: true
                }
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: ['./public/js/*.js'],
                dest: './public/dist/js/script.js'
            }
        },
        uglify: {
            options: {
                banner: '/* Created by Versover */\n'
            },
            js: {
                files: {
                    './public/dist/js/script.min.js': ['./public/dist/js/script.js']
                }
            }

        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: './public/dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: './public/dist/css',
                    ext: '.min.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-newer');
};