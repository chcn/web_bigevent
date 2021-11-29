$(function () {
  //获得用户信息
  getUserInfo()

  //实现推出登录功能
  $('#quit-btn').on('click', function () {
    //利用layui调出提示框
    layer.confirm('确定推出登录？', { icon: 3, title: '提示' }, function (index) {
      //当用户点确定就会触发这个回调函数
      //清除localStorage中的token
      localStorage.removeItem('token')
      //跳转登录
      location.href = '/login.html'
      //关闭询问框
      layer.close(index);
    });
  })
})

//获得用户信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token')||''
    // },
    success: function (reg) {
      // console.log(reg);
      if (reg.status !== 0) return layer.msg('获取用户信息失败')
      renderAvatar(reg.data)
    }
  })
}

//渲染用户名和头像
function renderAvatar(user) {
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

  //渲染头像
  var imgAva = $('.layui-nav-img')
  var strAva = $('.user-avatar')
  if (user.user_pic) {
    //如果有图片头像,就显示图片头像，隐藏文字头像
    strAva.hide()
    imgAva.prop('src', user.user_pic).show()
  } else {
    // 没有图片头像，就渲染文字头像，隐藏图片头像，文字头像用昵称第一个字母
    imgAva.hide()
    strAva.html(name[0].toUpperCase()).show()
  }
}

