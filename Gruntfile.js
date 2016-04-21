/*
 * grunt-directory-layout
 * https://github.com/ApoorvSaxena/grunt-directory-layout
 *
 * Copyright (c) 2016 Apoorv Saxena
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp/*']
    },

    // Configuration to be run (and then tested).
    directory_layout: {
      default_options_generate: {
        options: {
          action: 'generate'
        },
        files: {
          'tmp/default_options': 'test/'
        }
      },
      custom_options_generate: {
        options: {
          action: 'generate',
          ignore: [
            '123'
          ]
        },
        files: {
          'tmp/custom_options': 'test/'
        }
      },

      default_options_verify: {
        options: {
          action: 'verify'
        },
        files: {
          'test/': 'test/expected/default_options'
        }
      },
      custom_options_verify: {
        options: {
          action: 'verify'
        },
        files: {
          'test/': 'test/expected/custom_options'
        }
      }

    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'directory_layout', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
