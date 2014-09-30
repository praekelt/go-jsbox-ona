module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        jshint: {
            options: {jshintrc: '.jshintrc'},
            all: [
                'Gruntfile.js',
                'src/**/*.js',
                'tests/**/*.js'
            ]
        },

        watch: {
            src: {
                files: [
                    'src/**/*.js',
                    'tests/**/*.js'
                ],
                tasks: ['default'],
                options: {atBegin: true}
            }
        },

        mochaTest: {
            test: {
                src: ['tests/**/*.js'],
                options: {reporter: 'spec'}
            }
        }
    });

    grunt.registerTask('test', [
        'jshint',
        'mochaTest'
    ]);

    grunt.registerTask('default', [
        'test'
    ]);
};
