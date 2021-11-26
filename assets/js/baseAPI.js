$(function() {
  $.ajaxPrefilter(function(options) {
    //这个函数会拦截ajax函数并获得其中的属性
    //因为登录和注册的根路径相同，所以我可以利用这个函数拦截ajax，
    //然后拼接url，这样就可以不用每次都填写根路径了
    // console.log(options);
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    
    //统一为需要权限的请求添加请求头headers
    //只有带有/my/路径的请求是需要权限的
    if(options.url.indexOf('/my/') !== -1){
      options.headers = {
        Authorization: localStorage.getItem('token')||''
      }
    }

    //统一挂载complete 回调函数
    options.complete = function(reg) {
      // console.log(reg);
      //当用户没有登录时，清除token并跳转到登录页面
      if(reg.responseJSON.status === 1 && reg.responseJSON.message === '身份认证失败！') {
        localStorage.removeItem('token')
        location.href = '/login.html'
      }
    }
  })
})