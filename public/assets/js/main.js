
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

    $(".btn-continuar").click(function(){
        $(".btn-continuar").attr('href', 'dos-b.html');
    })
    //fin pantalla dos


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
        $(".btn-crear").attr('href', 'cinco.html');
    })

    //fin pantalla cuatro
})


