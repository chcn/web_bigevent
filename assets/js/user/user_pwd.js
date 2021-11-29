$(function() {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能有空格'],
    samepwd: function(value) {
      if(value === $('.layui-form [name=oldPwd]').val()) {
        return '新密码不能与原密码相同'
      }
    },
    repwd: function(value) {
      if(value !== $('.layui-form [name=newPwd]').val()) {
        return '两次密码不一致'
      }
    }
  })

  $('#updatePwd').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function(reg) {
        // console.log(reg);
        if(reg.status !== 0) {
          return layer.msg(reg.message)
        }
        layer.msg(reg.message)
        $('#btnReset').click()
      }
    })
  })
})