/*轮播图*/
var slider =
  Swipe(document.getElementById('slider'), { // 最大盒子的id
    auto: 3000,// 3秒 自动切换
    continuous: true,
    callback: function(pos) {  // 返回值  pos 是返回当前的索引值

        //console.log(pos);
        for(var i=0;i<=circle.length-1;i++)// 遍历数组
        {
            circle[i].className="";  //  其余的所有li 清除 current类
            circle[pos].className="current";// 只留下当前的这个li添加current
        }
    }
  });
var circle = document.getElementById('circle').getElementsByTagName('li');//获取li 的数组

/*
$(function() {
    $(".searc").children('input').focus(function(event) {
       
        $(this).val("");    
    });
    $(".searc").children("input").blur(function(event) {
        $(this).val("尾品汇")
    });
});
*/

/*top回到顶部*/
/*
$(function() {
    $(".olad .right").click(function(event) {
        $("body,html").animate({scrollTop:0}, 100);
    });

});
*/


