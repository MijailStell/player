/*
 *  Document   : webApp.js
 *  Description: Custom scripts and plugin initializations
 */

var webApp = function () {
	
    var _popupEspera = "popupEspera";
    var _popupMensaje = "popupMensaje";
    var _popupConfirmacion = "popupConfirmacion";
    var _popupReConfirmacion = "popupReConfirmacion";
    var _popupEliminacionMensaje = "popupEliminar";
    var _mensajeEspera = "";
    var _tituloPopupMensaje = "";
    var _tituloPopupComfirmacion = "";
    var _tituloEliminacionPopupMensaje = "";
    var _mensajePopupConfirmacion = "";
    var _mensajePopupEliminacionConfirmacion = "";
    var _btnCancelar = "";
    var _btnAceptar = "";
    var _formatoFecha = "";

    var createMessageDialog = function () {
        var dialogMessage = '<div id="' + _popupMensaje + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
        dialogMessage += '<div class="modal-dialog" role="document">';
        dialogMessage += '<div class="modal-content">';
        dialogMessage += '<div class="modal-header">';
        dialogMessage += '<h5 class="modal-title"></h5>';
        dialogMessage += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
        dialogMessage += '<span aria-hidden="true">&times;</span>';
        dialogMessage += '</button>';
        dialogMessage += '</div>';
        dialogMessage += '<div class="modal-body">';
        dialogMessage += '</div>';
        dialogMessage += '<div class="modal-footer">';
        dialogMessage += '<button type="button" class="btn btn-secondary btn-cancelar" data-dismiss="modal">Cerrar</button>';
        dialogMessage += '</div>';
        dialogMessage += '</div>';
        dialogMessage += '</div>';
        dialogMessage += '</div>';

        $("body").append(dialogMessage);
    };

    var createConfirmDialog = function () {
        var dialogMessage = '<div id="' + _popupConfirmacion + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
        dialogMessage += '<div class="modal-dialog" role="document">';
        dialogMessage += '<div class="modal-content">';
        dialogMessage += '<div class="modal-header">';
        dialogMessage += ('<h5 class="modal-title">' + _tituloPopupComfirmacion + '</h5>');
        dialogMessage += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
        dialogMessage += '<span aria-hidden="true">&times;</span>';
        dialogMessage += '</button>';
        dialogMessage += '</div>';
        dialogMessage += '<div class="modal-body">';
        dialogMessage += '</div>';
        dialogMessage += '<div class="modal-footer">';
        dialogMessage += '<button type="button" class="btn btn-secondary btn-cancelar" data-dismiss="modal">Cancelar</button>';
        dialogMessage += '<button type="button" class="btn btn-info btn-aceptar" data-dismiss="modal">Aceptar</button>';
        dialogMessage += '</div>';
        dialogMessage += '</div>';
        dialogMessage += '</div>';
        dialogMessage += '</div>';

        $("body").append(dialogMessage);
    };

    var createReConfirmDialog = function () {
        var dialogConfirm = "<div id='" + _popupReConfirmacion + "' tabindex='-1' role='dialog' aria-hidden='true' class='modal fade' data-backdrop='static' style='z-index:100000;'>";
        dialogConfirm += "<div class='modal-dialog'>";
        dialogConfirm += "<div class='modal-content'>";
        dialogConfirm += "<div class='modal-header'><h4 class='modal-title'>" + _tituloPopupComfirmacion + "</h4></div>";
        dialogConfirm += "<div class='modal-body paddingTop15'><p></p></div>";
        dialogConfirm += "<div class='modal-footer' style='margin-top: 0px; margin-bottom: 0px;'>";
        dialogConfirm += "<button class='btn btn-primary' data-dismiss='modal'><i class='fa fa-remove'></i> " + _btnCancelar + "</button> ";
        dialogConfirm += "<button class='btn btn-success' data-dismiss='modal'><i class='fa fa-thumbs-o-up'></i> " + _btnAceptar + "</button>";
        dialogConfirm += "</div>";
        dialogConfirm += "</div>";
        dialogConfirm += "</div>";

        $("body").append(dialogConfirm);
    };

    var createMessageDeleteDialog = function () {

        var dialogMessage = "<div id='" + _popupEliminacionMensaje + "' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='lblTituloConfirmarEliminar' aria-hidden='true' class='modal fade' data-backdrop='static' style='z-index:100000;'>";
        dialogMessage += "<div class='modal-dialog'>";
        dialogMessage += "<div class='modal-content'>";
        dialogMessage += "<div class='modal-header'>";
        dialogMessage += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
        dialogMessage += "<h4 id='lblTituloConfirmarEliminar' class='modal-title'>" + _tituloEliminacionPopupMensaje + "</h4>";
        dialogMessage += "</div>";
        dialogMessage += "<div class='modal-body paddingTop15'><p></p></div>";
        dialogMessage += "<div class='modal-footer' style='margin-top: 0px; margin-bottom: 0px;'>";
        dialogMessage += "<button class='btn btn-primary' data-dismiss='modal'><i class='fa fa-remove'></i> " + _btnCancelar + "</button> ";
        dialogMessage += "<button class='btn btn-success' data-dismiss='modal'><i class='fa fa-thumbs-o-up'></i> " + _btnAceptar + "</button>";
        dialogMessage += "</div>";
        dialogMessage += "</div>";
        dialogMessage += "</div>";

        $("body").append(dialogMessage);
    };         
    
    var getDataForm = function (form) {
        var that = $(form);
        var url = that.attr('action');
        var type = that.attr('method');
        var data = {};

        var namex = "";
        that.find('[name]').each(function (index, value) {
            var that = $(this);
            var name = that.attr('name');
            var value = that.val();

            if (that.attr('type') === 'radio') {
                if (that.is(':checked')) {
                    data[name] = value;
                }
            } else if (that.attr('type') === 'checkbox') {
                if (that.is(':checked') && namex != name) {
                    data[name] = value;
                    namex = name;
                } else if (namex == name) {
                    namex = "";
                } 
            }
            else if (namex == name && that.attr('type') === 'hidden') {
                namex = "";
            }
            else {
                data[name] = value;
            }
        });

        var obj = {
            url: url,
            type: type,
            data: data
        };

        return obj;
    };    
    
    var formValidBootstrap = function () {
        //$('form').validateBootstrap(true);
    }; 
    
    var createLoading = function () {
        $("body").append('<div id="' + _popupEspera + '" tabindex="-1" role="dialog" aria-hidden="true" class="modal fade" data-backdrop="static" style="z-index:100000;"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><h4 class="text-center"> ' + _mensajeEspera + '</h4></div></div></div></div>');
    };	
	
    var exportarExcel = function (urlExportar) {
        webApp.showLoading();

        var iframe_ = document.createElement("iframe");
        iframe_.style.display = "none";
        iframe_.setAttribute("src", urlExportar);
        iframe_.frameBorder = 0;

        if (navigator.userAgent.indexOf("MSIE") > -1 && !window.opera) {
            // Si es Internet Explorer
            iframe_.onreadystatechange = function () {
                switch (this.readyState) {
                    case "loading":
                        webApp.showLoading();
                        break;
                    case "complete":
                    case "interactive":
                    case "uninitialized":
                        webApp.hideLoading();
                        getCookie("DescargaCompleta");
                        break;
                    default:
                        webApp.hideLoading();
                        delCookie("DescargaCompleta");
                        break;
                }
            };
        } else {
            // Si es Firefox o Chrome
            document.body.appendChild(iframe_);

            var _timer = setInterval(function () {
                var success = getCookie("DescargaCompleta");
                if (success === "1") {
                    clearInterval(_timer);
                    webApp.hideLoading();
                    delCookie("DescargaCompleta");
                }
            }, 1000);
            return;
        }
        document.body.appendChild(iframe_);
    };

    var disableAllFormElements = function (formId) {
        $('#' + formId).find('input, textarea, button, select').attr('disabled', 'disabled');
    };

    var mayuscula = function (e, elemento) {
        elemento.value = elemento.value.toUpperCase();
    };

    var inicializarFileUpload = function(id) {
        var itemTemplate = '<div id="'+id+'_SWFUpload_0_0" class="uploadify-queue-item">\
            <span class="ace-file-name" ><i class=" ace-icon fa fa-upload"></i> Sin Archivo ...</span>\
            <div class="uploadify-progress">\
                <div class="uploadify-progress-bar"><!--Progress Bar--></div>\
            </div>\
        </div>';
        $('#'+id+'-queue').html('');
        $('#'+id+'-queue').append(itemTemplate);         
    }

    var sumaFecha = function (d, fecha) {
        var Fecha = new Date();
        var sFecha = fecha || (Fecha.getDate() + "-" + (Fecha.getMonth() + 1) + "-" + Fecha.getFullYear());
        var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
        var aFecha = sFecha.split(sep);
        var fecha = aFecha[2] + '/' + aFecha[1] + '/' + aFecha[0];
        fecha = new Date(fecha);
        fecha.setDate(fecha.getDate() + parseInt(d));
        var anno = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;
        var dia = fecha.getDate();
        mes = (mes < 10) ? ("0" + mes) : mes;
        dia = (dia < 10) ? ("0" + dia) : dia;
        var fechaFinal = anno + sep + mes + sep + dia;
        return (fechaFinal);
    };

    var number_format = function (number, decimals, dec_point, thousands_sep) {
        // *     example 1: number_format(1234.56);
        // *     returns 1: '1,235'
        // *     example 2: number_format(1234.56, 2, ',', ' ');
        // *     returns 2: '1 234,56'
        // *     example 3: number_format(1234.5678, 2, '.', '');
        // *     returns 3: '1234.57'
        // *     example 4: number_format(67, 2, ',', '.');
        // *     returns 4: '67,00'
        // *     example 5: number_format(1000);
        // *     returns 5: '1,000'
        // *     example 6: number_format(67.311, 2);
        // *     returns 6: '67.31'
        // *     example 7: number_format(1000.55, 1);
        // *     returns 7: '1,000.6'
        // *     example 8: number_format(67000, 5, ',', '.');
        // *     returns 8: '67.000,00000'
        // *     example 9: number_format(0.9, 0);
        // *     returns 9: '1'
        // *    example 10: number_format('1.20', 2);
        // *    returns 10: '1.20'
        // *    example 11: number_format('1.20', 4);
        // *    returns 11: '1.2000'
        // *    example 12: number_format('1.2000', 3);
        // *    returns 12: '1.200'
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            toFixedFix = function (n, prec) {
                // Fix for IE parseFloat(0.55).toFixed(0) = 0;
                var k = Math.pow(10, prec);
                return Math.round(n * k) / k;
            },
            s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    };	

    var validarDecimal = function(evt) {
        var keyPressed = (evt.which) ? evt.which : event.keyCode
        return !((keyPressed !=13) && (keyPressed != 46) && (keyPressed < 48 || keyPressed > 57));
    };

    var validarNumero = function(evt) {
        var keyPressed = (evt.which) ? evt.which : event.keyCode
        return !((keyPressed !=13) && (keyPressed < 48 || keyPressed > 57));
    };

    var validarLetrasEspacio = function(identificadores) {
        $.each(identificadores, function (index, item) {
            $('#'+item).validCampoFranz(' abcdefghijklmnñopqrstuvwxyzáéíóú_');
        });        
    };

    var validarAlfanumerico = function(identificadores) {
        $.each(identificadores, function (index, item) {
            $('#'+item).validCampoFranz(' abcdefghijklmnñopqrstuvwxyzáéíóú1234567890_');
        });        
    };

    var validarAlfanumericoGuion = function (identificadores) {
        $.each(identificadores, function (index, item) {
            $('#' + item).validCampoFranz(' abcdefghijklmnñopqrstuvwxyzáéíóú1234567890_-');
        });
    };

    var validarNumerico = function(identificadores) {
        $.each(identificadores, function (index, item) {
            $('#'+item).validCampoFranz('1234567890');
        });        
    };

    var validarCantidadAmarillaMax = function (identificadores,cantidad) {
        return (identificadores > cantidad) ? true : false;
    };

    var validarBisiesto = function (anio) {
        return ((anio % 4 == 0 && anio % 100 != 0) || anio % 400 == 0) ? true : false;
    };

    return {
        init: function (parametros) {
            if (parametros) {
                _mensajeEspera = parametros.mensajeEspera;
                _tituloPopupMensaje = parametros.tituloPopupMensaje;
                _tituloPopupComfirmacion = parametros.tituloPopupComfirmacion;
                _tituloEliminacionPopupMensaje = parametros.tituloEliminacionPopupMensaje;
                _mensajePopupConfirmacion = parametros.mensajePopupConfirmacion;
                _mensajePopupEliminacionConfirmacion = parametros.mensajePopupEliminacionConfirmacion
                _btnCancelar = parametros.btnCancelar;
                _btnAceptar = parametros.btnAceptar;
                _formatoFecha = parametros.formatoFecha;
            }
            formValidBootstrap();
            createLoading();
            createMessageDialog();
            createConfirmDialog();
            createReConfirmDialog();
            createMessageDeleteDialog();
        },
        getDataForm: getDataForm,
        hideIdentificador: function (identificador) {
            $("#" + identificador).removeClass('d-none');
            $("#" + identificador).addClass('d-none');
        },
        showIdentificador: function (identificador) {
            $("#" + identificador).removeClass('d-none');
        },
        hideLoading: function () {
            $('#' + _popupEspera).modal("hide");
        },
        showLoading: function () {
            $('#' + _popupEspera).modal("show");
        },
        hideMessageDialog: function () {
            $('#' + _popupMensaje).modal('hide');
        },
        showMessageDialog: function (title, message, fnCancelar, styleClass) {
            if (title != null) {
                $('#' + _popupMensaje + ' .modal-title').html(title);
            } else {
                $('#' + _popupMensaje + ' .modal-title').html(_tituloPopupMensaje);
            }

            if (styleClass != undefined && styleClass != null) {
                $('#' + _popupMensaje + ' .modal-dialog').attr('class', 'modal-dialog ' + styleClass);
            } else {
                $('#' + _popupMensaje + ' .modal-dialog').attr('class', 'modal-dialog');
            }

            $('#' + _popupMensaje + ' .modal-body').html(message);
            $('#' + _popupMensaje).modal('show');

            if ($.isFunction(fnCancelar)) {
                $('#' + _popupMensaje + ' .btn-cancelar').off('click');
                $('#' + _popupMensaje + ' .btn-cancelar').on('click', fnCancelar);
            }
        },
        showConfirmDialog: function (fnAceptar, message, fnCancelar) {
        	
            var popup = $('#' + _popupConfirmacion);
            popup.modal('show');
            var btnAceptar = $(popup).find('.btn-aceptar');
            var btnCancelar = $(popup).find('.btn-cancelar');

            btnAceptar.off('click');
            if ($.isFunction(fnAceptar)) {
                btnAceptar.on('click', function () { fnAceptar(); })
            }

            btnCancelar.off('click');
            if ($.isFunction(fnCancelar)) {
                btnCancelar.on('click', function () { fnCancelar(); })
            }

            if (message != null && message != '') {
                $('#' + _popupConfirmacion + ' .modal-body').html(message);
            } else {
                $('#' + _popupConfirmacion + ' .modal-body').html(_mensajePopupConfirmacion);
            }            
        },
        showReConfirmDialog: function (fnSuccess, message, fnCancel) {
            var popup = $('#' + _popupReConfirmacion);
            var btnSuccess = $(popup).find('.btn-success');
            var btnCancel = $(popup).find('.btn-primary');

            btnSuccess.off('click');
            if ($.isFunction(fnSuccess)) {
                btnSuccess.on('click', function () { fnSuccess(); })
            }

            btnCancel.off('click');
            if ($.isFunction(fnCancel)) {
                btnCancel.on('click', function () { fnCancel(); })
            }

            if (message != null && message != '') {
                $('#' + _popupReConfirmacion + ' .modal-body p').html(message);
            } else {
                $('#' + _popupReConfirmacion + ' .modal-body p').html(_mensajePopupConfirmacion);
            }

            popup.modal('show');
        },
        showConfirmResumeDialog: function (fnSuccess, message, fnCancel) {
            
            var popup = $('#' + _popupConfirmacion);
            popup.modal('show');
            var btnSuccess = $(popup).find('.btn-success');
            var btnCancel = $(popup).find('.btn-primary');

            btnSuccess.off('click');
            if ($.isFunction(fnSuccess)) {
                btnSuccess.on('click', function () { fnSuccess(); })
            }

            btnCancel.off('click');
            if ($.isFunction(fnCancel)) {
                btnCancel.on('click', function () { fnCancel(); })
            }

            if (message != null && message != '') {
                $('#' + _popupConfirmacion + ' .modal-body p').html(message);
            } else {
                $('#' + _popupConfirmacion + ' .modal-body p').text(_mensajePopupConfirmacion);
            }
            
        },
        showDeleteConfirmDialog: function (fnSuccess, message, fnCancel) {
            var popup = $('#' + _popupEliminacionMensaje);
            var btnSuccess = $(popup).find('.btn-success');
            var btnCancel = $(popup).find('.btn-primary');

            btnSuccess.off('click');
            if ($.isFunction(fnSuccess)) {
                btnSuccess.on('click', function () { fnSuccess(); })
            }

            btnCancel.off('click');
            if ($.isFunction(fnCancel)) {
                btnCancel.on('click', function () { fnCancel(); })
            }

            if (message != null && message != '') {
                $('#' + _popupEliminacionMensaje + ' .modal-body p').text(message);
            } else {
                $('#' + _popupEliminacionMensaje + ' .modal-body p').text(_mensajePopupEliminacionConfirmacion);
            }

            popup.modal('show');
        },             
        formatResponse: function (respuesta, contenedor) {
            var estado = "";
            if (respuesta.Success) {
                if (!respuesta.Warning) {
                    estado = "alert-success";
                }
            } else {
                estado = "alert-danger";
            }
            $("#" + contenedor).append("<div class='alert " + estado + "'>" + respuesta.Message + "</div>");
        },
        clearResponse: function (contenedor) {
            $("#" + contenedor).html('');
        },
        clearForm: function (form) {

            $(".form-group").removeClass('has-error');
            $(".help-block").remove(); 
            $('#' + form).find('[name]').each(function (index, value) {
                var that = $(this);
                var name = that.attr('name');
                var value = that.val();               

                if (that.attr('type') === 'radio') {
                    if (that.is(':checked')) {
                        that.attr('checked', false)
                    }
                } else if (that.attr('type') === 'checkbox') {
                    if (that.is(':checked')) {
                        that.attr('checked', false)
                    }
                } else {
                    that.val('');
                }
            });
        },
        Ajax: function (opciones, successCallback, failureCallback, errorCallback, beforeSendCallback) {

            if (opciones.url == null)
                opciones.url = "";

            if (opciones.cache == null)
                opciones.cache = false;            

            if (opciones.parametros == null)
                opciones.parametros = {};

            if (opciones.async == null)
                opciones.async = true;

            if (opciones.datatype == null)
                opciones.datatype = "json";

            if (opciones.contentType == null)
                opciones.contentType = "application/json; charset=utf-8";

            if (opciones.type == null)
                opciones.type = "POST";

            if (beforeSendCallback == null) {
                beforeSendCallback = function (a,b) { };
            }

            $.ajax({
                type: opciones.type,
                url: opciones.url,
                cache: opciones.cache,
                //contentType: opciones.contentType,
                //dataType: opciones.datatype,
                async: opciones.async,
                //data: opciones.datatype == "json" ? JSON.stringify(opciones.parametros) : opciones.parametros,
                data: opciones.parametros,
                beforeSend: function (a,b) {
                    beforeSendCallback(a,b);
                },
                success: function (response) {
                    if (successCallback != null && typeof (successCallback) == "function")
                        successCallback(response);
                },
                failure: function (msg) {
                    if (failureCallback != null && typeof (failureCallback) == "function")
                        failureCallback(msg);
                },
                error: function (xhr, status, error) {
                    if (errorCallback != null && typeof (errorCallback) == "function")
                        errorCallback(xhr);
                }
            });
        },
        ExportarExcel: function (url) {
            
            exportarExcel(url);
        },
        InicializarValidacion: function (formName, rules, messages, ignore) {
            if (ignore == null) ignore = ".ignore";

            $('#'+formName).validate({
                errorElement: 'div',
                errorClass: 'help-block',
                focusInvalid: false,
                ignore: ignore,
                rules: rules,
                messages: messages,

                highlight: function (e) {
                    $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
                },

                success: function (e) {
                    $(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
                    $(e).remove();
                },

                errorPlacement: function (error, element) {
                    if (element.is('input[type=checkbox]') || element.is('input[type=radio]')) {
                        var controls = element.closest('div[class*="col-"]');
                        if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                        else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
                    }
                    else if (element.is('.select2')) {
                        error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
                    }
                    else if (element.is('.chosen-select')) {
                        error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
                    }
                    else error.insertAfter(element.parent());
                },

                submitHandler: function (form) {
                },
                invalidHandler: function (form) {
                }
            });
        },
        guid: function() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
        },
        setTitleMenu: function (titleMenu) {
            $(".titleMenu").html('<span class="oi oi-video"></span><strong>&nbsp;&nbsp;' + titleMenu + '</strong>');
        },
        cleanStorage: function () {
            localStorage.removeItem('guid');
            localStorage.removeItem('username');
            localStorage.removeItem('sexo');
            localStorage.removeItem('avatar');
            localStorage.removeItem('logeado');
            localStorage.removeItem('roomId');
            localStorage.removeItem('roomNombre');            
            localStorage.removeItem('connectionId');
        },
        disableAllFormElements: disableAllFormElements,
        mayuscula: mayuscula,
        sumaFecha: sumaFecha,
        inicializarFileUpload: inicializarFileUpload,
        number_format: number_format,
        validarDecimal: validarDecimal,
        validarNumero: validarNumero,
        validarLetrasEspacio: validarLetrasEspacio,
        validarAlfanumerico: validarAlfanumerico,
        validarAlfanumericoGuion: validarAlfanumericoGuion,
        validarNumerico: validarNumerico,
        validarBisiesto: validarBisiesto
    }
}();

function getCookie(name) {
    var pairs = document.cookie.split("; "),
        count = pairs.length,
        parts;
    while (count--) {
        parts = pairs[count].split("=");
        if (parts[0] === name)
            return parts[1];
    }
    return false;
}

function delCookie(name) {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    document.cookie = name + "=" + '=;expires=' + date + "; path=/";
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}