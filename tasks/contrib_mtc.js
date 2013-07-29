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

		//RegExps
		var rMedia = /(@media[^\{]*)\{((.|\n|\r)*?\})[\n\s\r\t]*\}/ig;
		var rEdge = /(min|max)-width\s*\:\s*(\d+)[a-z]+/ig;
		var prev = /((^|,|\n|\r)\s*([\.#]?\w[\w\-\s_\.#]*))([{,])/ig;
		var trim = /^\s+|\s+$/g;
		var row = /(\})[\s\n\r]+/g;
		var rFileName = /(^|\/)(.+)$/g;
		var rClose = /(([\n\r]+)\s+)(?=\})/g;
		var separator = "";

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			var src = f.src.filter(function(filepath) {
				if(!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function(filepath) {
				var sResult = "";
				var sFile = grunt.file.read(filepath);
				var edges = [];
				var aMedias = sFile.match(rMedia);
				if(aMedias){
					aMedias.forEach(function(s, i){
						aMedias[i] = s.replace(rMedia, function(){
							var argo = arguments;
							var size = 1600;
							var cls = argo[2] ? argo[2] + "\n" : "";
							if(argo[1] && argo[1].match(rEdge)){
								size = RegExp.$2;
								edges.push(size);
								cls = cls.replace(prev, "\n." + options.prefix + size + " $3$4");
								return cls;
							}else{
								return "";
							}
						});
					});
					sResult = aMedias.join("");
				}

				return "/* source from: " + filepath + " */" + sResult;
			}).join(grunt.util.normalizelf(separator));

			src = src.replace(trim, "").replace(row, "$1\n\n");
			if(rClose.test(src)){
				src = src.replace(new RegExp(RegExp.$1, "g"), RegExp.$2);
			}

			// Write the destination file.
			grunt.file.write(f.dest, src);

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created. ').ok();
		});
	});
};
