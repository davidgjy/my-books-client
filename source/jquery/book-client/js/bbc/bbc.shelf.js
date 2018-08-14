BBC.SHELF = {
    start: function () {
        var that = this;
        that.init();
    },
    init: function () {
        var that = this;
        var userId = $('#hdnUserId').val();
        if (userId && userId != '') {
            that.loadShelfInfo(ShelfInfo.Favorite);
        } else {
            //alert('您还没有登录!');
            that.loadLoginInfo();
        }
    },
    loadShelfInfo: function (shelfId) {
        var url = '/BookShelfPage/ShowInfo/' + shelfId;
        $('#bookShelfInfo').load(url);
    },
    loadLoginInfo: function () {
        var url = '/LoginPage/NotLogined';
        $('#bookShelfInfo').load(url);
    }
};



