/*
 * grunt-contrib-mtc
 * https://github.com/mailzwj/grunt-contrib-mtc
 *
 * Copyright (c) 2013 MrZheng
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks
	grunt.registerMultiTask('mtc', 'Checkout @media to a new file.', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			punctuation: '.',
			separator: '',
			prefix: 'w'
		});

		// console.log(this.files);

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			// Concat specified files.
			var src = f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if(!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function(filepath) {
				// Read file source.
				var sResult = "";
				var sFile = grunt.file.read(filepath);
				var edges = [];
				var rMedia = /(@media[^\{]*)\{((.|\n|\r)*?\})[\n\s\r\t]*\}/ig;
				var rEdge = /(min|max)-width\s*\:\s*(\d+)[a-z]+/ig;
				var prev = /((^|,|\n|\r)\s*([\.#]?\w[\w\-\s_\.#]*))([{,])/ig;
				var aMedias = sFile.match(rMedia);
				// console.log(rMedia.test("@media screen and (max-width: 1220px) {}}"));
				// console.log(aMedias);
				if(aMedias){
					// console.log(aMedias);
					aMedias.forEach(function(s, i){
						aMedias[i] = s.replace(rMedia, function(){
							var argo = arguments;
							var size = 1600;
							var cls = argo[2] ? argo[2] + "\n" : "";
							// grunt.log.writeln(argo[1]);
							if(argo[1] && argo[1].match(rEdge)){
								size = RegExp.$2;
								edges.push(size);
								cls = cls.replace(prev, "\n." + options.prefix + size + " $3 $4");
								return cls;
							}else{
								return "";
							}
						});
					});
					sResult = aMedias.join("");
				}

				// console.log(aMedias.length);
				/*sFile = sFile.replace(rMedia, function(){
					var argo = arguments;
					argo[2] = argo[2] ? argo[2] + "}\n" : "";
					if(argo[1].match(rEdge)) {
						var size = RegExp.$2;
						edges.push(size);
						// console.log(argo[2], "--------------");
						argo[2] = argo[2].replace(prev, function(){
							console.log(RegExp.$2, "\n---\n", arguments[0], "\n+++");
							return ".w" + size + " " + arguments[0];
						});
					}
					sResult += argo[2];
					return argo[2];
				});*/
				return sResult;
			}).join(grunt.util.normalizelf(options.separator));

			// Handle options.
			// src += options.punctuation;

			// Write the destination file.
			grunt.file.write(f.dest, src);

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});

};