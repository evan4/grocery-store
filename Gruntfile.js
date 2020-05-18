module.exports = function(grunt) {
  grunt.file.defaultEncoding = 'utf8';
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: {
          'assets/js/main.js': 'assets/js/es6/main.js'
        }
      }
    },
    uglify: {
      options: {
        sourceMap: true
      },
      build: {
        src: 'assets/js/es6/main.js',
        dest: 'web/js/main.min.js'
      }
    },
    watch: {
      scripts: {
          files: ['assets/js/*.js'],
          tasks: ['babel', 'uglify'],
          options: {
              spawn: false,
          },
      }
    }
  });
   // Load the plugin
   grunt.loadNpmTasks('grunt-babel');
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['babel', 'uglify']);

};