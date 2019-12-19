var glup = require("gulp");
// gulp中插件的应用 下载插件----取到插件---应用插件
var htmlClean = require("gulp-htmlclean");
// 压缩图片
var imageMin = require("gulp-imagemin");
// 压缩js文件
var uglify = require("gulp-uglify");
// 去掉js中的调试语句
var debug  = require("gulp-strip-debug");
// 将less 转换成css
var less = require("gulp-less")
// 压缩css
var cssClean = require("gulp-clean-css")
// css3添加前缀 postcss 和autoprofixer需要这两个插件
var postCss = require("gulp-postcss")
var autoprefixer = require("autoprefixer")
// 开启本地服务器代理
var connect = require("gulp-connect")


var folder = {
    src:"src/",
    dist:"dist/"
}
// 判断当前变量
var devMod = process.env.NODE_ENV == "development";
// export NODE_ENV=development   设置当前环境变量为生产环境
console.log(devMod)
glup.task("html",function(){
   var page = glup.src(folder.src + "html/*")
        .pipe(connect.reload());
        if(!devMod){
            page.pipe(htmlClean())
        }       
        page.pipe(glup.dest(folder.dist + "html/"))

})
glup.task("imgs",function(){
    glup.src(folder.src + "imgs/*")
        .pipe(imageMin())
        .pipe(glup.dest(folder.dist + "imgs/"))

})
glup.task("js",function(){
    var page = glup.src(folder.src + "js/*")
        .pipe(connect.reload())
        if(!devMod){
            page.pipe(debug())
            page.pipe(uglify())
        }  
                
        page.pipe(glup.dest(folder.dist + "js/"))

})
glup.task("css",function(){
    var page = glup.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]));
        if(!devMod){
            page.pipe(cssClean())
        }          
        page.pipe(glup.dest(folder.dist + "css/"))

})
// 开启服务器
glup.task("server",function(){
    connect.server({
        port:"8888",
        livereload:true
    })

})
// 监听页面变化，自动刷新,执行下面的任务
glup.task("watch",function(){
    glup.watch(folder.src + "html/*",["html"]);
    glup.watch(folder.src + "css/*",["css"]);
    glup.watch(folder.src + "js/*",["js"]);
})

glup.task("default",["html","css","imgs","js","server","watch"]);

//less-->自动添加css3前缀---》压缩---》css文件

// gulp.src()
// gulp.dest()
// gulp.tast()
// gulp.watch()
