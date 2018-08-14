BBC.MARK = {
    start: function () {
        var that = this;
        that.init();
    },
    init: function () {
        $('#navBookMark').addClass('active');
        $('#hdnSelectShelfItem').val(ShelfInfo.Favorite);
    },
};