
/**
 * Created by ada on 2018/2/2.
 */
'use strict'

/*    步骤：less->css->autoprefixer
      自动：watch less to auto above flow

      npm install -g  grunt-cli
      npm install --save-dev grunt
      npm install --save-dev grunt-postcss grunt-contrib-less grunt-contrib-watch grunt-contrib-csslint

      Gruntfile.js必须和node_modules在一个目录，以便读取对应的package，
      进入Gruntfile.js所在目录，直接执行grunt
      */
module.exports = function(grunt){
  //auto load all needed plugin
  //require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  let packageJSONPath='./package.json'
  //autoprefix
  grunt.loadNpmTasks('grunt-postcss');
  //less to css
  grunt.loadNpmTasks('grunt-contrib-less');
  //watch file change
  grunt.loadNpmTasks('grunt-contrib-watch');
  //check if css synax correct
  grunt.loadNpmTasks('grunt-contrib-csslint');

  grunt.initConfig({
    pkg:grunt.file.readJSON(packageJSONPath),
    origLessPath:'./static/css/',
    //3rd下的文件不用转
    origCssPath:'./static/css/',
    watch:{
      less2autoprefix:{
        files:[
          '<%=origLessPath%>/*.less'
          // {
          // expand:true,     // Enable dynamic expansion.
          // cwd:'<%=origCssPath%>',      // Src matches are relative to this path.
          //src:['<%=origCssPath%>/**/*.less'], // Actual pattern(s) to match.
          // dest:'<%=origCssPath%>',   // Destination path prefix.
          ////ext: '.min.js',   // Dest filepaths will have this extension.
          ////extDot: 'first'   // Extensions in filenames begin after the first dot
          // },
        ],
        tasks: ['less:main','postcss:main'],
      }
    },
    //use grunt-contrubite-less since plugin post-less in developing
    //不能转换*，所以用less-middleware代替
    less:{
      options:{
        // paths:['./public/stylesheets/private/'],//无需，直接在files中指定路径+文件名即可
        // rootPath:'./public/stylesheets/private/',//无需，直接在files中指定路径+文件名即可
        compress:false,
        strictImports:true,
        strictMath:false, //设成false，以便对px/color等可以进行运算
        strictUnits:false,//enable 3*5px=15px
        syncImport:true,
      },
      main:{
        //////files can set multiple src-target
        files:[
          {
            expand:true,
            cwd:'<%=origLessPath%>',
            // src 基于 cwd
            src:'./*.less',
            // dest 基于GruntFile.js
            dest:'<%=origLessPath%>',
            ext:'.css',
            extDot:'first',

          },
        ],
      },
    },
    //autoprefixr
    postcss:{
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      main:{

        files:[
          {
            expand:true,
            // cwd:'<%=origCssPath%>',//不能使用cwd，否则及时运行了task，也不会添加对应的prefix？
            src:'<%=origCssPath%>/*.css',
          }
        ],
      },
    },
    //check if css valid(no use since not print line number)
    csslint:{
      options:{
        quite:true,//only show waring
        'box-model':2,
      },
      main:{
        files:[
          {
            expand:true,
            cwd:'<%=origCssPath%>',
            //src:'./public/stylesheets/admin.css',
            src:'./*.css',
          }
        ],
      },
    },
  });

  grunt.registerTask('default', ['less:main','postcss:main']);
}
