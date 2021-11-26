$(function() {
  // 这个函数会拦截ajax函数并获得其中的属性
  //因为登录和注册的根路径相同，所以我可以利用这个函数拦截ajax，
  //然后拼接url，这样就可以不用每次都填写根路径了
  $.ajaxPrefilter(function(options) {
    console.log(options);
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  })
})