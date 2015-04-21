module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      build: {
        options: { separator: '\n\n' },
        src: [ 'src/_intro.js', 'src/render.js', 'src/settings.js', 'src/tree.js', 'src/options.js', 'src/build.js', 'src/_outro.js' ],
        dest: 'dist/OptionSelectors.js'  
      },

      prod: {
        options: { separator: '\n\n' },
        src: [ 'src/_intro.js', 'src/render.js', 'src/settings.js', 'src/tree.js', 'src/options.js', 'src/build.js', 'src/_outro.js' ],
        dest: 'prod/OptionSelectors.js'
      }
    },

    uglify:{
      min: {
        options: {
          mangle: { except: ['jQuery'] },
          maxLineLen: 100,
          beautify: {
            width: 50,
            beautify: true
          }
        },
        files: { 
          'prod/OptionSelectors.mid.js': 'prod/OptionSelectors.js',
        }
      },
      super_min: {
        options: {
          mangle: { except: ['jQuery'] },
          maxLineLen: 100,
          beautify: {
            width: 80,
            beautify: false
          }
        },
        files: { 
          'prod/OptionSelectors.min.js': 'prod/OptionSelectors.js',
        }
      }
    },

    watch: {
      test: {
        files: ['src/**'],
        tasks: ['concat:build'],
        options: {
          spawn: false,
        }
      },
    }
  });

  /* load */
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');

  /* TASKS */
  grunt.registerTask('default', ['watch:test']);

  grant.registerTask('fast', ['concat:prod']);
  grunt.registerTask('build', ['concat:prod', 'uglify:min']);
  grunt.registerTask('super_min', ['concat:prod', 'uglify:super_min']);
};