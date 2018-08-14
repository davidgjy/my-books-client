$(function () {
    /* 旋转菜单 */
    var $key = true;
    $(".dang").click(function (event) {
        if ($key == true) {
            $(this).addClass('dhover');
            $(".yin").fadeIn(1000);
            $key = false;
            setTimeout(function () {
                $(".dang").removeClass('dhover')
            }, 1000)

        }
        else {
            $(this).addClass('dhover');
            $(".yin").fadeOut(1000);
            $key = true;
            setTimeout(function () {
                $(".dang").removeClass('dhover')
            }, 1000);
        }
    });
});

