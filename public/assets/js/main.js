function uploadPic(){
         $('#image-user').attr('src', localStorage.fileImage); //muestra la imagen guardada

       function readURL(input) { 
        if (input.files[0] != undefined) {  
              var reader = new FileReader(); // funcion predefinida de javascript,
              reader.onload = function (e) { 
                localStorage.fileImage =  e.target.result; 
                $('#image-user').attr('src', localStorage.fileImage);
              }
              reader.readAsDataURL(input.files[0]); 
          }
          else{
            $('#image-user').attr('src', 'img/icons/profile_pic.png');
          }
      }

      $("#imgInp").change(function(){ // cuando el input cambie llama a la funcion readUrl
        readURL(this); 
      });
  }uploadPic()

$(document).ready(function(){
  $('.slider').slider(); //inicialización de carrusel de materialize

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
    $('#espacio_fono').append('<h5>'+telefono+'</h5>');

    $.ajax({
        url: '/api/registerNumber',
        type: 'POST',
        data: {'terms': 'true',
        'phone': telefono
       }
    })
    .done(function(res) {
        console.log("success1");
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
              
              

  /* PANTALLA 2.5: BOTON COPIAR */
  function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
  }
  //fin boton copiar



  
  //Funcion cuenta regresiva de pantalla 3
    function c(){
        var n=$('.c').attr('id');
        var c=n;
        $('.c').text(c);
        setInterval(function(){
            c--;
          if(c>=0){
            $('.c').text(c);
          }
          if(c==0){
            $('.c').text(n);
            window.open('tresymedio.html','_self',false);
          }
        },1000);
    }
    c();
    // Loop
    setInterval(function(){
    c();
    },21000);
  //FIN Funcion cuenta regresiva de pantalla 3
  
    validateRealTimeTres = function () {
        var fields = $("form :input:not(:hidden)"); // select required
        fields.on('keyup change keypress blur', function () {
            var codigo = $("#my-code").val();
            var codigoValidate = (/^[0-9]$/).test(codigo);
            console.log(codigo)
            if (required(fields) && codigoValidate==codigoStorage) {
                window.open('cuatro.html','_self',false); // action if all valid
            } else {
                window.open('tresymedio.html','_self',false); // action if not valid
            }
        });
    }
    validateRealTimeTres();


    /* FIN PANTALLA TRES*/

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
        }
    })
    .done(function(res) {
        console.log("success3");
    })
    .fail(function() {
        console.log("error3");
    })
    .always(function() {
        console.log("complete");
    });
    //fin pantalla cuatro

    //inicio pantalla seis
    validateRealTimeSeis = function () {
        var fields = $("form :input:not(:hidden)"); // select required
        fields.on('keyup change keypress blur', function () {
            var cardNumber = $("#card_number").val();
            var cardNumberValidate = (/^[0-9]{16}$/).test(cardNumber);
            var mesN = $("#mes").val();
            var mesNValidate = (/^[0-9]{2}$/).test(mesN);
            var yearN = $("#year").val();
            var yearNValidate = (/^[0-9]{2}$/).test(yearN);
            if (required(fields) && cardNumberValidate && mesNValidate && yearNValidate) {
                {$(".btn-tarjeta").removeClass("disabled")} // action if all valid
            } else {
                {$(".btn-tarjeta").addClass("disabled")} // action if not valid
            }
        });
    }
    validateRealTimeSeis();

    $(".btn-tarjeta").click(function(){
        $(".btn-tarjeta").attr('href', 'seismedio.html');
        localStorage.setItem("card",$("#card_number").val());
        localStorage.setItem("month",$("#mes").val());
        localStorage.setItem("year",$("#year").val());
    })

    validateRealTimeSeisMedio = function () {
        var fields = $("form :input:not(:hidden)"); // select required
        fields.on('keyup change keypress blur', function () {
            var pass = $("#passw").val();
            var passValidate = (/^[0-9]{4}$/).test(pass);
            localStorage.setItem("pass",pass);
            if (required(fields) && passValidate) {
                {$(".btn-registrar").removeClass("disabled")} // action if all valid
            } else {
                {$(".btn-registrar").addClass("disabled")} // action if not valid
            }
        });
    }
    validateRealTimeSeisMedio();

    $(".btn-registrar").click(function(){
        $(".btn-registrar").attr('href', 'profile.html');
    });

    var tarjetaNumber = localStorage.getItem("card");
    var monthNumber = localStorage.getItem("month");
    var yearNumber = localStorage.getItem("year");
    var passNumber = localStorage.getItem("pass");

    $.ajax({
        url: '/api/registerCard',
        type: 'POST',
        data: {'userId': telefono,
        'cardNumber': tarjetaNumber,
        'cardMonth': monthNumber,
        'cardYear': yearNumber,
        'cardPassword': passNumber
        }
    })
    .done(function(res) {
        console.log("success4");
    })
    .fail(function() {
        console.log("error4");
    })
    .always(function() {
        console.log("complete");
    });
});

/* PANTALLA 2.5: BOTON COPIAR */
  function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
  }
  //fin boton copiar