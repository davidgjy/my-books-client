BBC.FAV = {
    start: function () {
        var that = this;
        that.init();
        that.loadFavorites();
    },
    init: function () {
        $('#navFavorite').addClass('active');
        $('#hdnSelectShelfItem').val(ShelfInfo.Favorite);
    },
    loadFavorites: function () {
        var that = this;
        var req = {
            "userId": $('#hdnUserId').val()
        };
        $('body').loading();
        $.ajax({
            url: '/api/favorite',
            type: 'POST',
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.code == ConstCode.SUCCESS) {
                    var favUpList = data.data.favVolumes1;
                    var favDownList = data.data.favVolumes2;
                    if (!favUpList && !favDownList) {
                        that.toggleFavContent(false);
                    } else {
                        that.toggleFavContent(true);

                        $('#favUpRow').html('');
                        $('#favDownRow').html('');
                        $('#favUpRowSrc').tmpl(favUpList).appendTo('#favUpRow');
                        $('#favDownRowSrc').tmpl(favDownList).appendTo('#favDownRow');
                    }
                } else {
                    that.toggleFavContent(false);
                }

                $('body').unloading();
            }
        });
    },
    toggleFavContent: function (hasContent) {
        if (hasContent) {
            $('#infoNoFavorites').hide();
            $('#contentFav').show();
        } else {
            $('#infoNoFavorites').show();
            $('#contentFav').hide();
        }
    }
};



