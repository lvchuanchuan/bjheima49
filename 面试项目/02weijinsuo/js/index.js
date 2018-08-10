// 1.0 判断设备的宽度，根据宽度加载图片
function render() {
  // a. 根据不同的设备加载不同的图片
  var getTurnImg = function () {
    // 1.0 判断设备的宽度：
    //    移动设备显示移动图片，其它设备显示pc图片 768px
    // 得到当前设备的宽度
    var width = $(window).width();
    // 得到所有的轮播图容器
    var imgList = $(".wjs_banner .item");
    // console.log(imgList)
    var html;
    // 判断
    if (width <= 768) {
      // 移动设备显示移动图片
      imgList.each(function () {
        // 得到移动端图片的路径
        var url = $(this).attr('data-m-img');
        html = '<a class="m_img hidden-sm hidden-md hidden-lg" href="#"><img src="' + url + '" alt=""></a>'
        $(this).html(html);
      })
    } else {
      imgList.each(function () {
        // 得到pc端图片的路径
        var url = $(this).attr('data-pc-img');
        html = '<a class="pc_img hidden-xs" href="#" style="background-image:url(' + url + ')"></a>'
        $(this).html(html);
      })
    }
  }
  getTurnImg();
  // 当改变设备的宽度时，也要重新加载
  $(window).on('resize', function(){
    //重新加载
    getTurnImg();
  })

  // b. 封装左滑右滑的手势
  // 封装
  // 将来只有发生了移动大于50px,我们才判断左滑右滑
  // 设置起点x坐标
  var startX = 0;
  // 设置移动点x坐标
  var moveX = 0;
  // 得到两点之间的距离
  var distance = 0;
  // 得到轮播图对象
  var turnObj = $(".carousel");
  $(".wjs_banner").on('touchstart', function(e){
    startX = e.originalEvent.targetTouches[0].clientX;
  })
  $(".wjs_banner").on('touchmove', function(e){
    moveX = e.originalEvent.targetTouches[0].clientX;
    distance = moveX - startX;
  })
  $(".wjs_banner").on('touchend', function(){
    
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        // 得到轮播图对象，并且调用切换方法
        turnObj.carousel('prev');
      } else {
        turnObj.carousel('next');
      }
    }
  })
  
}

// 3.0 将pro区域中所有头部中导航的li标签的宽度得到，并且设置给ul
function setProUlWidth(){
  // 得到ul标签
  var ul = $(".wjs_pro .nav-tabs");
  // 得到ul中所有的子元素li
  var lis = ul.children("li");
  // 得到所有li标签的宽度之和
  var width = 0;
  lis.each(function(){
    width += $(this).width();
  });
  console.log(width)
  // 将width设置给ul
  ul.width(width + 5);
  // 找到ul的父元素
  ul.parent().css('overflow','hidden');

  // 设置可以滑动
  new IScroll('#slide', {
    scrollX: true, // 可以在x轴方向上滑动
    scrollY: false
  });
}

// $(function(){
//    // 1.0 判断设备的宽度，根据宽度加载图片
//    render();
//    // 2.0 设置轮播图的时间
//    var a = $('#carousel-example-generic');
//    a.carousel({
//      interval: 1000
//    })
//    // 3.0 
//    setProUlWidth();
//    $('[data-toggle="tooltip"]').tooltip()
// })

window.onload = function () {
   // 1.0 判断设备的宽度，根据宽度加载图片
   render();
   // 2.0 设置轮播图的时间
   var a = $('#carousel-example-generic');
   a.carousel({
     interval: 1000
   })
   // 3.0 
   setProUlWidth();
   $('[data-toggle="tooltip"]').tooltip()
}
// window.onload 与 $(function(){})
// window.onload：执行时机是所有的dom元素和js加载完成以后再执行
// $(function(){}) 当文档对象创建好以后就执行

// 将来如果我们使用了轮播图，并且给轮播图设置了data-ride="carousel"，轮播图会自己开启
// 如果调用轮播图carousel方法，方法内也会开启轮播图
//  如果在window.onload中执行carousel，那其实轮播图已经开启了，所以这个设置没用
//  如果在$(function())设置，将来$(function())中的代码会先执行， 