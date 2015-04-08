

var TASK = {
    name: 'zip',
    description: 'Build and watch for any changes'
};

// -- Dependencies -------------------------------------------------------------
var async = require('async');
var command = require('command');

// -- Globals ------------------------------------------------------------------
var ROOT = process.cwd();

// -- Task ---------------------------------------------------------------------
module.exports = function(grunt) {
    grunt.registerMultiTask(TASK.name, TASK.description, function() {
        var done = this.async();
        var target = this.target;
        var sha;

        async.series([
                function(mainCallback) {
                    exports._getCurrentGitHashCommit(function(val) {
                        sha = val;
                        mainCallback();
                    });
                },
                function(mainCallback) {
                    exports._setZipComment(mainCallback, target, sha);
                }
            ],
            function(err) {
                if (err) {
                    done(false);
                }
                else {
                    done();
                }
            }
        );
    });

    exports._getCurrentGitHashCommit = function(mainCallback) {
        command.open(ROOT)
            .exec('git', ['rev-parse', 'HEAD'])
            .then(function() {
                mainCallback(this.lastOutput.stdout);
            });
    };

    exports._setZipComment = function(mainCallback, target, sha) {
        var comment = 'SHA: ' + sha + ' on ' + new Date();
        var name = grunt.config([TASK.name, target, 'name']);

        grunt.config(['compress', 'options', 'comment'], comment);
        grunt.config(['compress', 'options', 'archive'], name);
        grunt.task.run('compress');

        mainCallback();
    };
};