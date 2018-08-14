BBC.HOME = {
    start: function () {
        var that = this;
        that.loadCarouselList();
        that.loadClassicList();
    },
    loadCarouselList: function () {
        var that = this;
        var url = '/api/carousel/';
        $('#homeCarousel').loading();
        $.ajax({
            url: url,
            type: 'GET',
            //data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var carouselList = data.data;
                $('#homeCarousel').html('');
                $('#carouselRowSrc').tmpl(carouselList).appendTo('#homeCarousel');
                $('#homeCarousel').unloading();

                startCarousel();
            }
        });
    },
    loadClassicList: function () {
        var that = this;
        var url = '/api/classic/';
        $('#classicList').loading();
        $.ajax({
            url: url,
            type: 'GET',
            //data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var classicList = data.data;
                $('#classicList').html('');
                $('#classicRowSrc').tmpl(classicList).appendTo('#classicList');

                $('#classicList').unloading();
            }
        });
    }
};