/*
 * grunt-contrib-mtc
 * https://github.com/mailzwj/grunt-contrib-mtc
 *
 * Copyright (c) 2013 MrZheng
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
      tests: ['build', 'tmp']
    },

    // Configuration to be run (and then tested).
    mtc: {
      default_options: {
        options: {
        },
        files: {
          'build/home-ie.css': ['test/home.css', 'test/demo.css']
        }
      }/*,
      custom_options: {
        options: {
          separator: ': ',
          punctuation: ' !!!'
        },
        files: {
          'tmp/custom_options.txt': ['test/fixtures/testing', 'test/fixtures/123']
        }
      },*/
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'mtc'/*, 'nodeunit'*/]);

  // By default, lint and run all tests.
  grunt.registerTask('default', [/*'jshint', */'test']);

};
