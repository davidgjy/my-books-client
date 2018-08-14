BBC.FULL = {
    start: function (seriesId, volumeId, comicId) {
        var that = this;
        that.init();
        that.loadComicList(seriesId, volumeId, comicId);
        that.enterFullScreen();
        that.onNextPage();
        that.onPreviousPage();
    },
    init: function () {
        var that = this;
        that.enterFullScreen();
    },
    firstTimeNotify: function () {
        $('#note').html('向左滑动: 下一页  向右滑动: 上一页  点击漫画: 显示向导');
        $('#note').fadeIn();
        setTimeout(function () {
            $('#note').fadeOut();
            $('#note').html('');
        }, 3000);
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
                    if ($.trim($('#comicVolumes').html()) == '') {
                        $('#comicVolumesSrc').tmpl(data.data.volumes).appendTo('#comicVolumes');
                    }

                    var comics = data.data.comics;
                    $('#comicList').html('');
                    $('#comicRowSrc').tmpl(comics).appendTo('#comicList');
                    $('#fullComic-1').show();
                    $('#hdnPageCount').val(comics.length);
                    that.firstTimeNotify();
                    that.onShowNav(seriesId, volumeId);
                } else {
                    //that.noComicNotify();
                }

                $('body').unloading();
            }
        });
    },
    requestFullScreen: function () {
        var de = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
    },
    exitFullScreen: function () {
        var de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    },
    enterFullScreen: function () {
        var that = this;
        document.body.addEventListener('click', function () {
            if ($('#hdnFullScreen').val() == "0") {
                that.requestFullScreen();
                $('#hdnFullScreen').val("1");
            } else {
                that.exitFullScreen();
                $("#hdnFullScreen").val("0");
            }
            
        }, false);
    },
    showNextPage: function () {
        var that = this;
        var curPageNo = parseInt($('#hdnCurPage').val());
        var pageCount = parseInt($('#hdnPageCount').val());
        $('#fullComic-' + curPageNo).fadeOut();
        curPageNo++;
        if (curPageNo > pageCount) {
            curPageNo = pageCount;
            that.notifyLastPage();
        }
        $('#hdnCurPage').val(curPageNo);
        $('#fullComic-' + curPageNo).fadeIn();
    },
    showPreviousPage: function () {
        var that = this;
        var curPageNo = parseInt($('#hdnCurPage').val());
        $('#fullComic-' + curPageNo).fadeOut();
        curPageNo--;
        if (curPageNo <= 0) {
            curPageNo = 1;
            that.notifyFirstPage();
        }
        $('#hdnCurPage').val(curPageNo);
        $('#fullComic-' + curPageNo).fadeIn();
    },
    onNextPage: function () {
        var that = this;
        $("body").on("swipeleft", function () {
            that.showNextPage();
        });
    },
    onPreviousPage: function () {
        var that = this;
        $("body").on("swiperight", function () {
            that.showPreviousPage();
        });
    },
    onShowNav: function (seriesId, volumeId) {
        var that = this;
        $('.full-comic').on("tap", function () {
            that.showNavigation(seriesId, volumeId);
        });
    },
    notifyLastPage: function () {
        $('#note').html('已经到达最后一页');
        $('#note').fadeIn();
        setTimeout(function () {
            $('#note').fadeOut();
            $('#note').html('');
        }, 3000);
    },
    notifyFirstPage: function () {
        $('#note').html('已经到达第一页');
        $('#note').fadeIn();
        setTimeout(function () {
            $('#note').fadeOut();
            $('#note').html('');
        }, 3000);
    },
    showNavigation: function (seriesId, volumeId) {
        var that = this;
        if ($("#comicNav").is(":hidden")) {
            //alert('show nav');
            $('#comicNav').fadeIn();
            //$('#hdnShowNav').val("1");
            that.onReturn();
            that.onShowChapters(seriesId, volumeId);
        } else {
            //alert('hide nav');
            //$('#comicNav').fadeOut();
            that.clearAllNav();
            //$("#hdnShowNav").val("0");
        }
    },
    onReturn: function () {
        $('#btnNavReturn').click(function () {
            location.href = '/SeriesPage/SeriesList';
        });
    },
    onShowChapters: function (seriesId, volumeId) {
        var that = this;
        $('#btnNavChapters').click(function () {
            if ($("#comicVolumes").is(":hidden")) {
                $('#comicVolumes').fadeIn();
                that.setVolumeHighlight(volumeId);
                that.onVolumeSelect(seriesId, volumeId);
            }
        });
    },
    onVolumeSelect: function (seriesId, volumeId) {
        var that = this;
        $('#comicVolumes a').click(function () {
            $('#comicVolumes a').removeClass('active');
            $(this).addClass('active');
            var volId = $(this).attr('id');
            that.loadComicList(seriesId, volId, 0);
            that.clearAllNav();
        });
    },
    setVolumeHighlight: function (volumeId) {
        $('#comicVolumes a').each(function () {
            if ($(this).attr('id') == volumeId) {
                $(this).addClass('active');
            }
        });
    },
    clearAllNav: function () {
        $('#comicNav').fadeOut();
        $('#comicVolumes').fadeOut();
        //$("#hdnShowNav").val("0");
    }
};