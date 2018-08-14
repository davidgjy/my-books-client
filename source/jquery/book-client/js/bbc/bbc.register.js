BBC.REGISTER = {
    start: function () {
        var that = this;
        that.onRegister();
    },
    onRegister: function () {
        var that = this;
        $('#btnRegister').click(function () {
            that.registerUser();
        });
    },
    registerUser: function () {
        var that = this;
        var url = "/api/register";
        var req = {
            "userName": $('#txtRegUserName').val(),
            "password": $('#txtRegPassword').val(),
            "confirmPassword": $('#txtRegConfirmPassword').val(),
            "nickName": $('#txtRegNickName').val(),
            "mobile": $('#txtRegMobile').val(),
            "email": $('#txtRegEmail').val()
        };

        $('body').loading();
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(req),
            success: function (data) {
                $('body').unloading();
                var regData = data.data;
                switch (regData.status) {
                    case RegisterStatus.SUCC:
                        window.sessionStorage.setItem(BBC_USER_ID, regData.userId);
                        window.sessionStorage.setItem(BBC_NICK_NAME, regData.nickName);
                        location.href = '/Home/Index';
                        break;
                    case RegisterStatus.USER_EXISTS:
                        alert('User already exists!');
                        break;
                    default:
                        alert('Unknown Exception!');
                        break;
                }
            }
        });
    }
};