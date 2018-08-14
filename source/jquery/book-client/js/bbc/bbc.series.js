BBC.SERIES = {
    start: function () {
        var that = this;
        that.loadSeriesList();
    },
    loadSeriesList: function () {
        var that = this;
        var url = '/api/series/';
        $('body').loading();
        $.ajax({
            url: url,
            type: 'GET',
            //data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //alert(JSON.stringify(data));
                var seriesList = data.data;
                $('#seriesList').html('');
                $('#seriesRowSrc').tmpl(seriesList).appendTo('#seriesList');
                that.onToggleFavorite();
                // paging of content
                /*
                $('#pagingChanContent').html('');
                if (gpi.previousPage < gpi.currentPage && gpi.previousPage > 0) {
                    $('#pagingChanContent').append('<li><a id="previousPage" href="#">' + gpi.previousPage + '</a>');
                    $('#previousPage').click(function () {
                        that.loadContentTemplate(channelId, gpi.previousPage, 5);
                    });
                }
                $('#pagingChanContent').append('<li class="active"><a href="#">' + gpi.currentPage + '</a>');
                if (gpi.nextPage <= gpi.totalPages && gpi.nextPage > gpi.currentPage) {
                    $('#pagingChanContent').append('<li><a id="nextPage" href="#">' + gpi.nextPage + '</a>');
                    $('#nextPage').click(function () {
                        that.loadContentTemplate(channelId, gpi.nextPage, 5);
                    });
                }
                */

                $('body').unloading();
            }
        });
    },
    onToggleFavorite: function () {
        $('.favorite-btn').click(function () {
            if ($(this).hasClass('no-fav')) {
                $(this).removeClass('no-fav').addClass('add-fav');
            } else {
                $(this).removeClass('add-fav').addClass('no-fav');
            }           
        });
    }
};