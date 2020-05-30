var hubChat = $.connection.chatHub;

function addMessageToList(response, esLocal) {
    if (esLocal) {
        response.username = "Yo";
        response.avatar = localStorage.getItem('avatar');
        response.message = $(".emojionearea-editor").html();
        $(".emojionearea-editor").html('');
    } else {
        $('#chatAudio')[0].play();
    }
    $('#chat-messages').append('<div class= "media text-muted pt-3">\
                    <img src="/Content/avatars/' + response.avatar + '.png" alt="' + response.username + '" class="mr-2 rounded" style="width: 32px; height: 32px;"/>\
                    <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">\
                        <strong class="d-block text-gray-dark">' + response.username + '</strong>\
                        ' + response.message + '\
                    </p>\
                </div>');
    var sh = $('#chat-messages')[0].scrollHeight;
    $("#chat-messages").animate({ scrollTop: sh }, 3000);
}

function inicializarChat() {
    if (localStorage.getItem('logeado')) {
        webApp.showIdentificador('btnSalir');
        webApp.showIdentificador('chatToolBar');
        var usuarioLogeado = localStorage.getItem('username')
        $("#txtMensaje").attr("placeholder", usuarioLogeado + " escribe un mensaje...");
    } else {
        toastr.warning("Su sesi&oacute;n caduc&oacute; o no se inici&oacute;", 'Sesi&oacute;n', {
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-bottom-right',
            showMethod: 'slideDown',
            hideMethod: 'slideUp'
        });
        setTimeout(function () {
            window.location.href = baseUrl;
        }, 4000);
    }
    $("#participantes").text('Chat ' + localStorage.getItem('roomNombre'));
}

function enviarMensaje(mensaje) {
    if (mensaje != null && mensaje.trim().length > 0) {
        var guid = localStorage.getItem('guid');
        hubChat.server.send(guid, mensaje);
        addMessageToList({}, true);
    }
}

jQuery(document).ready(function () {

    inicializarChat();    

    $("#txtMensaje").emojioneArea({
        pickerPosition: "top",
        filtersPosition: "bottom",
        tones: false,
        autocomplete: true,
        inline: true,
        hidePickerOnBlur: true
    });

    hubChat.client.connected = function (connectionId) {
        localStorage.setItem('connectionId', connectionId);
    }

    hubChat.client.disconnected = function (response) {
        $("#participantes").text('Chat ' + localStorage.getItem('roomNombre') + " (" + response.count + ")");
        addMessageToList(response, false);
    }

    hubChat.client.logged = function (response) {
        $("#participantes").text('Chat ' + localStorage.getItem('roomNombre') + " (" + response.count + ")");
        addMessageToList(response, false);
    }

    hubChat.client.logging = function (cantidad) {
        $("#participantes").text('Chat ' + localStorage.getItem('roomNombre') + " (" + cantidad + ")");
    }

    hubChat.client.loggouted = function (response) {
        $("#participantes").text('Chat ' + localStorage.getItem('roomNombre') + " (" + response.count + ")");
        addMessageToList(response, false);
    }

    hubChat.client.sended = function (response) {
        addMessageToList(response, false);
    }

    $.connection.hub.start().done(function () {
        var guid = localStorage.getItem('guid');
        var usuario = localStorage.getItem('username');
        var sexo = localStorage.getItem('sexo');
        var connectionId = localStorage.getItem('connectionId');
        var roomId = localStorage.getItem('roomId');
        hubChat.server.afterConnected(guid, usuario, sexo, connectionId, roomId);
    });

    setTimeout(function () {
        $(".emojionearea-editor").on('keyup', function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                enviarMensaje($(this).html());
            }
        });
    }, 1000);

    $("#btnSalir").click(function () {
        webApp.showConfirmDialog(function () {
            var guid = localStorage.getItem('guid');
            hubChat.server.afterClosed(guid);
            webApp.cleanStorage();
            window.location.href = baseUrl;
        }, '&#191;Est&aacute; seguro de salir?');
    });
});