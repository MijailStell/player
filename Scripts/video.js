var videoHub = $.connection.videoHub;

jQuery(document).ready(function () {    

    localStorage.removeItem('esLocal');
    videojs.players.myVideo.responsive(true);
    videojs.players.myVideo.fluid(true);
    videojs.players.myVideo.aspectRatio('16:9');
    videojs.players.myVideo.fill(true);

    videoHub.client.played = function (url, time) {
        localStorage.setItem('esLocal', false);
        var player = videojs.players.myVideo;
        if (!localStorage.getItem('urlVideo') || (localStorage.getItem('urlVideo') != url)) {
            localStorage.setItem('urlVideo', url);
            player.poster('');            
            player.src({ src: url, type: 'video/youtube' });            
        }
        player.currentTime(time);
        player.play();
    };

    videoHub.client.paused = function () {
        localStorage.setItem('esLocal', false);
        var player = videojs.players.myVideo;
        player.pause();
    };

    $.connection.hub.start().done(function () {
        var roomId = localStorage.getItem('roomId');
        videoHub.server.afterConnected(roomId);
    });

    videojs.players.myVideo.ready(function () {
        var player = this;

        player.on('ended', function () {
        });

        player.on('pause', function () {
            var roomId = localStorage.getItem('roomId');
            if (localStorage.getItem('esLocal') == null) {
                videoHub.server.pause(roomId);
            } else if (localStorage.getItem('esLocal') === 'true') {
                videoHub.server.pause(roomId);
            }
            localStorage.setItem('esLocal', 'true');           
        });

        player.on('play', function () {
            var roomId = localStorage.getItem('roomId');
            if (localStorage.getItem('esLocal') == null) {
                videoHub.server.play(this.currentSrc(), this.currentTime(), roomId);
            } else if (localStorage.getItem('esLocal') === 'true') {
                videoHub.server.play(this.currentSrc(), this.currentTime(), roomId);
            }
            localStorage.setItem('esLocal', 'true');
        });
    });

    $("#palabraYoutube").on('keyup', function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#btnViewSearch").trigger("click");
        }
    });    

    $("#btnViewSearch").on("click", function () {
        var palabra = $("#palabraYoutube").val();
        if (palabra.length <= 0) {
            webApp.showMessageDialog('Palabra buscada en Youtube', 'Ingresar un palabra en la caja de texto');
        } else {
            var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + palabra + '&maxResults=12&key=AIzaSyB0J1JTXdjXA6e8BE2oeFMh2fy8yo_4YxI';

            webApp.Ajax({
                url: url,
                type: 'GET'
            }, function (response) {
                var template = '';
                $.each(response.items, function (index, item) {
                    index++;
                    if (index % 3 == 1) {
                        template += '<div class="row">';
                    }

                    var tipoBoton = 'info';
                    var videoId = item.id.videoId;
                    if (item.id.videoId == undefined) {
                        tipoBoton = 'secondary';
                        videoId = '';
                    }

                    template += '<div class="col-sm-4 col-md-4">\
                            <div class="card shadow-sm">\
                                <iframe id="iframe" style="width:100%;height:100%" src="//www.youtube.com/embed/' + item.id.videoId + '" data-autoplay-src="//www.youtube.com/embed/' + item.id.videoId + '?autoplay=1"></iframe>\
                            </div>\
                            <div class="card-body pt-1">\
                                <p class="card-text mb-1">' + item.snippet.title + '</p>\
                                <div class="d-flex justify-content-between align-items-center">\
                                    <div class="btn-group">\
                                        <button type="button" class="btn btn-sm btn-outline-' + tipoBoton + ' selectedButton">Elegir</button>\
                                    </div>\
                                    <small class="text-muted">' + videoId + '</small>\
                                </div>\
                            </div>\
                        </div>';

                    if (index % 3 == 0) {
                        template += '</div>';
                    }
                });

                webApp.showMessageDialog('Videos Encontrados en Youtube', template, null, 'mw-100 w-75');
            }, function (response) {
                toastr.error(response, 'Error');
            }, function (XMLHttpRequest, textStatus, errorThrown) {
                toastr.error("Status: " + textStatus + "<br/>Error: " + errorThrown, 'Error');
            });
        }
    });

    $('body').on('click', '.selectedButton', function () {
        var eleccion = $(this).parent().parent().children()[1].innerText;
        if (eleccion.length > 0) {
            webApp.hideMessageDialog();
            var url = 'https://www.youtube.com/watch?v=' + eleccion;

            localStorage.setItem('esLocal', true);
            var player = videojs.players.myVideo;
            player.poster('');
            player.src({ src: url, type: 'video/youtube' });
            player.play();
        }
    });
    
});