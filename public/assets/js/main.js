/*función para que el usuario subir una imagen propia en su perfil, fuera del document.ready*/
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
  $('.carousel.carousel-slider').carousel({dist: 0}); //inicialización de carrusel de materialize

    //pantalla dos
	required = function(fields) {
        var valid = true;
        fields.each(function () { // iterate all
            var $this = $(this);
            if (($this.is(':checkbox') && !$this.is(":checked")) || // checkbox
            (($this.is(':text')) && !$this.val())) { // radio
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
  
    /* FIN PANTALLA TRES*/

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

    validateRealTimeTres = function () {
        var fields = $("form :input:not(:hidden)"); // select required
        fields.on('keyup change keypress blur', function () {
            var codigo = $("#phone").val();
            var codigoValidate = (/^[0-9]{9}$/).test(codigo);
            console.log(codigo)
            if (required(fields) && codigoValidate) {
                {console.log("holi")} // action if all valid

            } else {
                {$(".btn-continuar").addClass("disabled")} // action if not valid
            }
        });
    }

    validateRealTimeTres();
});


