var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point){
  return connect.static(path.resolve(point));
};

module.exports = function(grunt){
  grunt.initConfig({
    pkg:grunt.file.readJSON('package.json'),
    mocha: {
      all: ['test/**/*.html'],
      options: {
        reporter: 'Nyan',
        run: true
      }
    },
    sass: {
      dist: {
        files: {
          'app/assets/styles/main.css': 'app/assets/styles/sass/main.scss'
        }
      }
    },
    coffee: {
      app: {
        files: [
          {
            expand: true,
            cwd: 'app/assets/js/coffee',
            src: ['**/*.coffee'],
            dest: 'app/assets/js',
            ext: '.js'
          }
        ]
      }
    },
    regarde: {
      livereload: {
        files: ['app/**/*.html', 'app/**/*.css', 'app/**/*.js'],
        tasks: ['livereload']
      },
      compile: {
        files: ['**/*.coffee'],
        tasks: ['coffee']
      },
      sass: {
        files: ['**/*.scss'],
        tasks: ['sass']
      },
      test: {
        files: ['test/spec/*.js'],
        tasks: ['mocha', 'livereload']
      }
    },
    connect: {
      livereload: {
        options: {
          base: 'app/',
          hostname: 'localhost',
          port: 9000,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)];
          }
        }
      },
      test: {
        options: {
          hostname: 'localhost',
          port: 9005,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)];
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('default', ['coffee', 'livereload-start', 'connect', 'regarde', 'mocha', 'sass']);
};