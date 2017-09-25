module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		sass: {
			options: {
				sourceMap: false
			},
			dist: {
				files: {
					'css/style.css': 'css/style.scss',
					'css/dot-matrix-lib.css': 'css/dot-matrix-lib.scss'
				}
			}
		},
		shell: {
			serve: {
				command: 'serve'
			},
			serve_prod: {
				command: 'serve -p 80'
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.css', '!*.min.css'],
					dest: 'css',
					ext: '.min.css'
				}]
			}
		},
		uglify: {
			my_target: {
				files: {
					'js/dot-matrix-lib.min.js': ['js/dot-matrix-lib.js']
				}
			}
		},
		watch: {
			sass: {
				files: ['**/*.scss'],
				tasks: ['sass']
			},
			cssmin: {
				files: ['**/*.css'],
				tasks: ['cssmin']
			},
			uglify: {
				files: ['js/dot-matrix-lib.js'],
				tasks: ['uglify']
			}
		},
		concurrent: {
			serve: ['shell:serve', 'watch:sass', 'watch:cssmin', 'watch:uglify']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('serve', [
		'sass',
		'cssmin',
		'uglify',
		'concurrent:serve'
	]);
};
