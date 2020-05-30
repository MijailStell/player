var urlHome = baseServicioUrl + 'Home/';

$(document).ready(function () {
    localStorage.removeItem('connectionId');
    localStorage.removeItem('roomId');
    getAllRoom();

    if (localStorage.getItem('logeado')) {
        webApp.showIdentificador('btnSalir');
    } else {
        webApp.hideIdentificador('btnSalir');
    }

    $('body').on('click', '.joinButton', function () {
        var guidRoom = $(this).children('.guid-room')[0].innerText;
        var nombreRoom = $(this).children('.nombre-room')[0].innerText;
        localStorage.setItem('roomId', guidRoom);
        localStorage.setItem('roomNombre', nombreRoom);
        if (localStorage.getItem('logeado')) {
            window.location.href = baseUrl + 'ChatRoom/Index/' + localStorage.getItem('roomId');
        } else {
            $("#userForm").modal('show');
        }        
    });

    $("#btnLogin").click(function () {
        accederAChat();
    });

    $("#btnSalir").click(function () {
        webApp.showConfirmDialog(function () {
            webApp.cleanStorage();
            webApp.hideIdentificador('btnSalir');
        }, '¿Está seguro de salir?');
    });
});

function getAllRoom() {

    webApp.Ajax({
        url: urlHome + 'GetAllRoom'
    }, function (response) {
        if (response.Success) {
            if (response.Warning) {
                toastr.warning(response.message, 'Alerta');
            } else {
                var template = '';
                $.each(response.Data, function (index, item) {
                    template += '<div class="col-sm-3 col-md-3">';
                    template += '<svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#117a8b"></rect><text x="50%" y="50%" fill="#fff" dy=".3em">' + item.Nombre + '</text></svg>';
                    template += '<p>' + item.Descripcion + '</p>';
                    template += '<p><a class="btn btn-info joinButton" href="#" role="button">';
                    template += ('<span class="guid-room d-none">' + item.Guid + '</span>');
                    template += ('<span class="nombre-room d-none">' + item.Nombre + '</span>');
                    template += 'Unirse »</a></p>';
                    template += '</div>';
                });

                $("#chatRoomList").html(template);
                toastr.success("Todo OK", '', {
                    closeButton: true,
                    progressBar: true,
                    positionClass: 'toast-bottom-right',
                    showMethod: 'slideDown',
                    hideMethod: 'slideUp'
                });
            }
        } else {
            toastr.error(response.message, 'Error');
        }
    }, function (response) {
        toastr.error(response, 'Error');
    }, function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error("Status: " + textStatus + "<br/>Error: " + errorThrown, 'Error');
    });
}

function accederAChat() {
    $("#userForm").modal('hide');
    var usuario = "Anonimo";
    var sexo = $("#sexo").val();

    if ($("#username").val().length > 0) {
        usuario = $("#username").val();
    }

    localStorage.setItem('logeado', true);
    localStorage.setItem('guid', webApp.guid());
    localStorage.setItem('username', usuario);
    localStorage.setItem('sexo', parseInt(sexo));
    localStorage.setItem('avatar', 'avatar' + sexo);
    window.location.href = baseUrl + 'ChatRoom/Index/' + localStorage.getItem('roomId');
}