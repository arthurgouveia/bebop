/* global module:true */
module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    dirs: {
      js: 'assets/js',
      css: 'assets/css',
      img: 'assets/img',
      sass: 'assets/sass',
      vendor: 'assets/js/vendor'
    },

    pkg: grunt.file.readJSON( 'package.json' ),

    clean: {
      dist: 'dist',
      sprite: [
        'dist/<%= dirs.img %>/sprite/hd',
        'dist/<%= dirs.img %>/sprite/standard'
      ],
      release: [
        'dist/<%= dirs.sass %>',
        'dist/<%= dirs.js %>/main.js',
        'dist/<%= dirs.js %>/plugins.js'
      ]
    },

    concat: {
      dist: {
        src: [
          'src/<%= dirs.js %>/plugins.js',
          /* add here any plugins you have added via bower that are not to be included directly on the DOM */
          'src/<%= dirs.js %>/main.js'
        ],
        dest: 'src/<%= dirs.js %>/scripts.js'
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      target: {
        files: {
          'dist/<%= dirs.js %>/scripts.js': ['dist/<%= dirs.js %>/scripts.js']
        }
      }
    },

    compass: {
      dev: {
        options: {
          sassDir: 'src/<%= dirs.sass %>',
          cssDir: 'src/<%= dirs.css %>',
          imagesDir: 'src/<%= dirs.img %>',
          relativeAssets: true,
          outputStyle: 'expanded'
        }
      },
      dist: {
        options: {
          sassDir: 'dist/<%= dirs.sass %>',
          cssDir: 'dist/<%= dirs.css %>',
          imagesDir: 'dist/<%= dirs.img %>',
          relativeAssets: true,
          environment: 'production',
          outputStyle: 'compressed',
          force: true
        }
      }
    },

    csscomb: {
      dev: {
        files: {
          'src/<%= dirs.css %>/main.css': ['src/<%= dirs.css %>/main.css'],
          'src/<%= dirs.css %>/main-ie.css': ['src/<%= dirs.css %>/main-ie.css']
        }
      },
      dist: {
        files: {
          'dist/<%= dirs.css %>/main.css': ['dist/<%= dirs.css %>/main.css'],
          'dist/<%= dirs.css %>/main-ie.css': ['dist/<%= dirs.css %>/main-ie.css']
        }
      }
    },

    scsslint: {
      files: [
        'src/<%= dirs.sass %>/partials/**/*',
        'src/<%= dirs.sass %>/*.scss'
      ],
      options: {
        config: '.scss-lint.yml'
      }
    },

    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: 'src/<%= dirs.sass %>/**/*',
        tasks: [
          'compass:dev',
          'csscomb:dev',
          'scsslint'
        ]
      },
      js: {
        files: [
          'src/<%= dirs.js %>/plugins.js',
          'src/<%= dirs.js %>/main.js',
        ],
        tasks: [
          'concat',
          'jshint',
        ]
      },
      html: {
        files: [
          'src/*.html',
          'src/*/*.html'
        ]
      }
    },

    jshint: {
      options: {
        'bitwise': true,
        'eqeqeq': true,
        'eqnull': true,
        'immed': true,
        'newcap': true,
        'esnext': true,
        'latedef': true,
        'noarg': true,
        'node': true,
        'undef': true,
        'browser': true,
        'trailing': true,
        'jquery': true,
        'curly': true,
        globals: {
          jQuery: true,
          console: true,
          alert: true
        }
      },
      beforeconcat: [
        'src/<%= dirs.js %>/plugins.js',
        'src/<%= dirs.js %>/main.js',
      ],
      afterconcat: ['src/<%= dirs.js %>/scripts.js']
    },

    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**'],
            dest: 'dist/'
          }
        ]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/<%= dirs.img %>',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/<%= dirs.img %>'
        }]
      }
    },

    // imageoptim: {
    //   options: {
    //     quitAfter: true
    //   },
    //   png: {
    //     options: {
    //       jpegMini: false,
    //       imageAlpha: true
    //     },
    //     src: ['dist/<%= dirs.img %>/**/*.png']
    //   },
    //   jpg: {
    //     options: {
    //       jpegMini: true,
    //       imageAlpha: false
    //     },
    //     src: ['dist/<%= dirs.img %>/**/*.jpg']
    //   }
    // },

    connect: {
      server: {
        options: {
          port: 9000,
          hostname: 'localhost',
          livereload: true,
          base: 'src',
          open: true
        }
      }
    }

  });

  grunt.registerTask('default', ['connect', 'watch']);

  grunt.registerTask('build', [
    'clean:dist',
    'copy',
    'compass:dist',
    'csscomb:dist',
    'clean:sprite',
    'imagemin',
    // 'imageoptim',
    'concat',
    'uglify',
    'clean:release'
  ]);

};