//----------------------------------------------------------------------------------------------------------------------
// ChrisCase.io Gruntfile.
//----------------------------------------------------------------------------------------------------------------------

module.exports = function(grunt)
{
    // Project configuration.
    grunt.initConfig({
        project: {
            less: ['client/less/theme.less', 'client/pages/**/*.less', 'client/components/**/*.less']
        },
        less: {
            min: {
                options: {
                    paths: ['node_modules/bootstrap/less'],
                    compress: true
                },
                files: {
                    'client/css/chriscaseio.min.css': ['<%= project.less %>']
                }
            }
        },
        watch: {
            less: {
                files: ['client/**/*.less'],
                tasks: ['less', 'autoprefixer'],
                options: {
                    atBegin: true
                }
            }
        },
        autoprefixer: {
            main: {
                options: {
                    browsers: ['last 2 versions', 'ie 8', 'ie 9'],
                    map: true
                },
                src: 'client/css/chriscaseio.min.css',
                dest: 'client/css/chriscaseio.min.css'
            }
        }
    });

    // Grunt Tasks.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Setup the build task.
    grunt.registerTask('build', ['less', 'autoprefixer']);
}; // module.exports

// ---------------------------------------------------------------------------------------------------------------------