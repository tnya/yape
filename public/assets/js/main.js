$(document).ready(function(){

    //inicio pantalla dos
	required = function(fields) {
        var valid = true;
        fields.each(function () { // iterate all
            var $this = $(this);
            if (($this.is(':checkbox') && !$this.is(":checked")) || // checkbox
            (($this.is(':text')) && !$this.val()) || (($this.is(':password')) && !$this.val())) {
                valid = false;
            }
        });
        return valid;
    }

    validateRealTime = function () {
        var fields = $("form :input:not(:hidden)"); // select required
        fields.on('keyup change keypress blur', function () {
            var cell = $("#phone").val();
            
            var cellValidate = (/^[0-9]{9}$/).test(cell);
            console.log(cell)
            if (required(fields) && cellValidate) {
                {$(".btn-continuar").removeClass("disabled")} // action if all valid

            } else {
                {$(".btn-continuar").addClass("disabled")} // action if not valid
            }
        });
    }

    validateRealTime();

    //Valida numero de telefono y guarda en localStorage
    $(".btn-continuar").click(function(){
        $(".btn-continuar").attr('href', 'dos-b.html');
        var cell = $("#phone").val();
        localStorage.setItem("phone", cell);
    })

    var telefono = localStorage.getItem("phone");
    console.log(telefono);
    $('#espacio_fono').append('<h5>'+telefono+'</h5>');

    $.ajax({
        url: '/api/registerNumber',
        type: 'POST',
        data: {'terms': 'true',
        'phone': telefono
       },
    })
    .done(function(res) {
        console.log(res);
        console.log("success1");
    })
    .done(function(){
        //window.open('dos-b.html','_self',false);
    })
    .fail(function() {
        console.log("error1");
    })
    .always(function() {
        console.log("complete");
    });

    //Crear Codigo
    $.ajax({
        url: '/api/resendCode',
        type: 'POST',
        data: {'phone': telefono},
    })
    .done(function(res) {
        console.log(res);
        console.log(res.data);
        var code = res.data;
        localStorage.setItem("code", code);
        var codigoStorage = localStorage.getItem("code");
         $('#espacio_codigo').append('<h5>'+codigoStorage+'</h5>');
        console.log("success2");
    })
    .fail(function() {
        console.log("error2");
    })

    .always(function() {
        console.log("complete");
    });
    //Fin pantalla dos

    //inicio pantalla cuatro
    validateRealTimeDos = function () {
        var fields = $("form :input:not(:hidden)"); // select required
        fields.on('keyup change keypress blur', function () {
            if (required(fields)) {
                {$(".btn-crear").removeClass("disabled")} // action if all valid

            } else {
                {$(".btn-crear").addClass("disabled")} // action if not valid
            }
        });
    }

    validateRealTimeDos();

    $(".btn-crear").click(function(){
        localStorage.setItem("name", $('#name').val());
        localStorage.setItem("email", $('#email').val());
        localStorage.setItem("password", $('#pass').val());
        $(".btn-crear").attr('href', 'cinco.html');
    })

    var nombre = localStorage.getItem("name");
    var correo = localStorage.getItem("email");
    var contrasena = localStorage.getItem("password");

    //Impimimos los datos en profile.html
    $('#name-profile-data').html(nombre);
    $('#email-profile-data').html(nombre);
    $('#card-profile-data').html(nombre);

    //API para registrar al usuario
    $.ajax({
        url: '/api/createUser',
        type: 'POST',
        data: {'phone': telefono,
        'name': nombre,
        'email': correo,
        'password': contrasena
        },
    })
    .done(function(res) {
        console.log(res);
        console.log("success3");
    })
    .fail(function() {
        console.log("error3");
    })

    .always(function() {
        console.log("complete");
    });
    //fin pantalla cuatro


    /* PANTALLA 2.5: BOTON COPIAR */
    function copyToClipboard(element) {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val($(element).text()).select();
      document.execCommand("copy");
      $temp.remove();
    }
    //fin boton copiar

})
