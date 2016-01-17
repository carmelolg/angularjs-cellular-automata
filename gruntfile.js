module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    conf: grunt.file.readJSON('configuration.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: [

              'app/bower_components/jquery/dist/jquery.js',
              'app/bower_components/bootstrap/dist/js/bootstrap.js',
              'app/bower_components/angular/angular.js',
              'app/bower_components/angular-route/angular-route.js',
              'app/bower_components/angular-loader/angular-loader.js',
              'app/bower_components/angular-sanitize/angular-sanitize.js',
              'app/js/*.js'
         ],
        dest: 'build/<%= pkg.name %>.<%= pkg.version %>.min.js'
      }
    },

    html2js: {
      /**
       * These are the templates from `src/app`.
       */
      app: {
    	  options: {
          base: 'app/'
        },
        src: [ 'app/partials/*.html' ],
        dest: 'build/templates-app.js'
      }
    },
    concat: {
    	build: {
    		src: ['build/<%= pkg.name %>.<%= pkg.version %>.min.js','build/templates-app.js'],
    		dest: 'build/<%= pkg.name %>.<%= pkg.version %>.js'
    	},
    	css: {
    		src:['app/css/*.css', 'app/bower_components/bootstrap/dist/css/bootstrap.css'],
    		dest: 'build/<%= pkg.name %>.<%= pkg.version %>.css'
    	}
    },

    clean: {
      stylesheets: {
        src: [ 'build/*.css', '!build/<%= pkg.name %>.<%= pkg.version %>.css' ]
      },
      scripts: {
        src: [ 'build/**/*.js', '!build/<%= pkg.name %>.<%= pkg.version %>.js' ]
      },
    },

    copy: {
      main: {
        src: 'app/index.html',
        dest: 'build/index.html',
         options: {
          process: function (contents, srcpath) {
            return grunt.template.process( contents, {
              data: {
                name: grunt.config( 'pkg.name' ),
                version: grunt.config( 'pkg.version' )
              }
            })
          }
        }
      },
    },
    devcode : {
      options :
      {
        html: true,        // html files parsing?
        js: false,          // javascript files parsing?
        css: false,         // css files parsing?
        clean: false,       // removes devcode comments even if code was not removed
        block: {
            open: 'devcode', // with this string we open a block of code
            close: 'endcode' // with this string we close a block of code
        }
      },

      production: {
        options: {
            source: 'build/',
            dest: 'build/',
            env: 'production'
        }
      }
    },
    s3: {
      options: {
        accessKeyId: "<%= conf.aws.accessKeyId %>",
        secretAccessKey: "<%= conf.aws.secretAccessKey %>",
        cache: false,
        access: "public-read",
        region: "<%= conf.aws.region %>",
        bucket: "<%= conf.aws.bucket %>"
      },
      build: {
        cwd: "build/",
        src: "**"
      }
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-devcode');
  grunt.loadNpmTasks('grunt-aws');

  // Default task(s).
  grunt.registerTask('default', [ 'clean', 'uglify' ,'html2js', 'concat','copy', 'devcode:production']);

};
