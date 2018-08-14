BBC.LOGIN = {
    start: function () {
        var that = this;
        that.onLogin();
    },
    onLogin: function () {
        var that = this;
        $('#btnLogin').click(function () {
            that.loginSystem();
        });
    },
    loginSystem: function () {
        var that = this;
        var url = "/api/login";
        var userName = $('#txtUserName').val();
        var password = $('#txtPassword').val();
        var req = { "userName": userName, "password": password };

        $('body').loading();
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(req),
            success: function (data) {
                $('body').unloading();
                var loginData = data.data;
                switch (loginData.status) {
                    case LoginStatus.SUCC:
                        window.sessionStorage.setItem(BBC_USER_ID, loginData.userId);
                        window.sessionStorage.setItem(BBC_NICK_NAME, loginData.nickName);
                        location.href = '/Home/Index';
                        break;
                    case LoginStatus.NO_USER:
                        alert('No user by this name!');
                        //$('#loginTip').html('No user by this name!');
                        break;
                    case LoginStatus.WRONG_PASS:
                        alert('Your password is wrong!');
                        //$('#loginTip').html('Your password is wrong!');
                        break;
                    default:
                        alert('Unknown Exception!');
                        //$('#loginTip').html('Unknown Exception!');
                        break;
                }
            }
        });
    }
};