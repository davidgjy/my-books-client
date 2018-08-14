BBC.COMIC = {
    start: function (seriesId, volumeId, comicId) {
        var that = this;
        that.loadComicList(seriesId, volumeId, comicId);
    },
    setVolumeHighlight: function (volumeId) {
        $('#seriesVolumes a').each(function () {
            if ($(this).attr('id') == volumeId) {
                $(this).addClass('active');
            }
        });
    },
    loadComicList: function (seriesId, volumeId, comicId) {
        var that = this;
        var req = {
            "seriesId": seriesId,
            "volumeId": volumeId
        };
        $('body').loading();
        $.ajax({
            url: '/api/comic',
            type: 'POST',
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.code == ConstCode.SUCCESS) {
                    $('#hdnSeriesVolumeId').val(data.data.vsId);
                    $('#seriesTop').html('');
                    $('#seriesSrc').tmpl(data.data.series).appendTo('#seriesTop');
                    
                    if ($.trim($('#seriesVolumes').html()) == '') {
                        $('#seriesVolumesSrc').tmpl(data.data.volumes).appendTo('#seriesVolumes');
                    }
                    that.setVolumeHighlight(volumeId);
                    that.onVolumeSelect(seriesId, volumeId);

                    var comics = data.data.comics;
                    $('#comicList').html('');
                    $('#comicRowSrc').tmpl(comics).appendTo('#comicList');

                    that.onToggleMark();

                    if (comicId != 0) {
                        setTimeout(function () {
                            that.goToMark(comicId);
                        }, 500);
                    }
                } else {
                    that.noComicNotify();
                }

                $('body').unloading();
            }
        });
    },
    onVolumeSelect: function (seriesId, volumeId) {
        var that = this;
        $('#seriesVolumes a').click(function () {
            $('#seriesVolumes a').removeClass('active');
            $(this).addClass('active');
            var volId = $(this).attr('id');
            that.loadComicList(seriesId, volId, 0);
        });
    },
    noComicNotify: function () {
        $('#comicList').html('没有漫画!');
    },
    onToggleMark: function () {
        $('.toggle-mark').click(function () {
            var comicId = $(this).attr('id').split('-')[1];
            if ($(this).html() == '加书签') {
                $('#mark-' + comicId).show();
                $(this).html('删除书签');
            } else {
                $('#mark-' + comicId).hide();
                $(this).html('加书签');
            }
        });
    },
    goToMark: function (comicId) {
        // test on mark
        var t = $('#comicPic-' + comicId).offset().top;
        $(window).scrollTop(t);
    }
};
