BBC.NAV = {
    start: function () {
        var that = this;
        that.setLoginInfo();
        that.goLogin();
        that.goRegister();
    },
    goLogin: function () {
        var url = '/LoginPage/Login';
        $('#btnGoLogin').click(function () {
            location.href = url;
        });
    },
    goRegister: function () {
        var url = '/RegisterPage/SignUp';
        $('#btnGoRegister').click(function () {
            location.href = url;
        });
    },
    setLoginInfo: function () {
        if (window.sessionStorage.getItem(BBC_USER_ID)) {
            $('#hdnUserId').val(window.sessionStorage.getItem(BBC_USER_ID));
            $('#myNickName').html(window.sessionStorage.getItem(BBC_NICK_NAME));
            //$('#welcomeInfo').html(BBC_WELCOME_INFO);
        }      
    }
};

