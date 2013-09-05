/*
 * Copyright (c) 2013, Liferay Inc. All rights reserved.
 * Code licensed under the BSD License:
 * https://github.com/liferay/alloy-ui/blob/master/LICENSE.md
 *
 * @author Zeno Rocha <zeno.rocha@liferay.com>
 * @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
 */

// -- Config -------------------------------------------------------------------
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dist: {
                options: {
                    sassDir: 'lib',
                    cssDir: ''
                }
            }
        },

        copy: {
            dist: {
                files: [
                    {
                        src: 'bootstrap.css',
                        dest: 'bootstrap-<%= pkg["version"] %>.css'
                    },
                    {
                        src: 'responsive.css',
                        dest: 'bootstrap-responsive-<%= pkg["version"] %>.css'
                    }
                ]
            }
        },

        clean: {
            build: [
                'bootstrap-<%= pkg["version"] %>.css', 'bootstrap-<%= pkg["version"] %>.min.css',
                'bootstrap-responsive-<%= pkg["version"] %>.css', 'bootstrap-responsive-<%= pkg["version"] %>.min.css'
            ],
            dist: [
                'bootstrap.css', 'responsive.css',
            ]
        },

        cssmin: {
            dist: {
                files: {
                    'bootstrap-<%= pkg["version"] %>.min.css': ['bootstrap-<%= pkg["version"] %>.css'],
                    'bootstrap-responsive-<%= pkg["version"] %>.min.css': ['bootstrap-responsive-<%= pkg["version"] %>.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('build', ['clean:build', 'compass', 'copy', 'clean:dist', 'cssmin']);
};