/*
 * grunt-directory-layout
 * https://github.com/ApoorvSaxena/grunt-directory-layout
 *
 * Copyright (c) 2016 Apoorv Saxena
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('directory_layout', 'Verify/Generate directory layout', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      ignore: []
    });

    var files = this.files;
    // Iterate over all specified file groups.
    files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(path) {
        // Warn on and remove invalid source files (if nonull was set).
        if (options.action === 'generate' && !grunt.file.isDir(path)) {
          grunt.log.warn('Source directory: "' + path + '" not found.');
          return false;
        }
        else if(options.action === 'verify' && !grunt.file.exists(path)) {
          grunt.log.warn('Source file: "' + path + '" not found.');
          return false;
        }
        else {
          return true;
        }
      });

      switch(options.action) {
        case 'generate':
          generate(src, f.dest, options);
          break;
        case 'verify':
        /* falls through */
        default:
          verify(src, f.dest, options);
          break;
      }
    });
  });

  function verify(files, root, options) {
    var DirectoryLayout = require('directory-layout');
    var layoutFile = files.pop();
    var done = grunt.task.current.async();

    DirectoryLayout
      .verify(layoutFile, {
        root: root
      })
      .then(function() {
        grunt.log.writeln('\n' + layoutFile + ' verified the layout of ' + root + ' directory.');
        done();
      })
      .catch(function(failures) {
        grunt.log.writeln('\nFailures found at: ');
        for (var i = 0; i < failures.length; i++) {
          grunt.log.writeln("- " + failures[i]);
        }
        done();
      });
  }

  function generate(files, output, options) {
    var DirectoryLayout = require('directory-layout');
    var done = grunt.task.current.async();
    var root = files.pop();

    DirectoryLayout
      .generate(root, {
        output: output,
        ignore: options.ignore
      })
      .then(function() {
        grunt.log.writeln('\nDirectory layout for "' + root + '" created at "' + output + '".');
        done();
      })
      .catch(function() {
        grunt.log.writeln('\nAborting, error encountered');
        done();
      });
  }

};
