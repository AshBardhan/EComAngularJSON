module.exports = function (grunt) {
  grunt.initConfig({
    concat: {
      js: {
        src: ['public/js/myAppCtrl.js'],
        dest: 'public/js/combo.js'
      },
      css: {
        src: ['public/css/style.css'],
        dest: 'public/css/combo.css'
      }
    },
    uglify: {
      js: {
        src: ['public/js/combo.js'],
        dest: 'public/js/combo.min.js'
      }
    },
    cssmin: {
      css: {
        src: ['public/css/combo.css'],
        dest: 'public/css/combo.min.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
}