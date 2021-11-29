$(function () {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    nickname: function (value) {
      if (value.length > 6)
        return '昵称应该在1~6个字符'
    }
  })

  initUserInfo()

  //初始化表单信息
  function initUserInfo() {
    $.ajax({
      method: "GET",
      url: '/my/userinfo',
      success: function (reg) {
        // console.log(reg);
        form.val('formUserInfo', reg.data)
      }
    })
  }

  //实现表单重置功能
  $('#btn-reset').on('click', function(e) {
    //阻止表单的默认重置功能
    e.preventDefault()

    initUserInfo()
  })

  //实现修改功能
  $('#reviseUserInfo').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function(reg) {
        // console.log(reg);
        if(reg.status !== 0) {
          return layer.msg(reg.message)
        }
        layer.msg(reg.message)
        //重新渲染主页的昵称和头像
        window.parent.getUserInfo()
      }
    })
  }) 
})

