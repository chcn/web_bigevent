$(function() {
  $('#link_reg').on('click', function() {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  $('#link_login').on('click', function() {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 从layui获取form对象
  var form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能有空格'],
    repwd: function(value) {
      var rep = $('.reg-box [name=password]').val()
      if(rep !== value) {
        return '两次密码不一致'
      }
    }
  })

  //注册功能
  $('#reg-form').on('submit', function(e) {
    //阻止form表单默认提交
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#reg-form [name=username]').val(),
        password: $('#reg-form [name=password]').val()
      },
      success: function(reg) {
        var layer = layui.layer
        if(reg.status !== 0){
          return layer.msg(reg.message)
        }
        layer.msg(reg.message)
        //跳转登录
        $('#link_login').click()
      }
    })
  })

  //登录功能
  $('#login-form').on('submit', function(e) {
    e.preventDefault()
    console.log($(this).serialize());
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data:$(this).serialize(),
      success: function(reg) {
        var layer = layui.layer
        if(reg.status !== 0){
          return layer.msg(reg.message)
        }
        layer.msg(reg.message)

        localStorage.setItem('token', reg.token)
        location.href = '../index.html'
      }
    })
  })
})