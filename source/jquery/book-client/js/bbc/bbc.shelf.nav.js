BBC.SHELF_NAV = {
    start: function () {
        var that = this;
        that.onSelectNav();
    },
    onSelectNav: function () {
        var that = this;
        $('#navFavorite').click(function () {
            $('#navBookMark').removeClass('active');
            $('#navFavorite').addClass('active');
            $('#hdnSelectShelfItem').val(ShelfInfo.Favorite);
            that.loadShelfInfo(ShelfInfo.Favorite);
        });
        $('#navBookMark').click(function () {
            $('#navFavorite').removeClass('active');
            $('#navBookMark').addClass('active');
            $('#hdnSelectShelfItem').val(ShelfInfo.BookMark);
            that.loadShelfInfo(ShelfInfo.BookMark);
        });
    },
    loadShelfInfo: function (shelfId) {
        var url = '/BookShelfPage/ShowInfo/' + shelfId;
        $('#bookShelfInfo').load(url);
    }
};