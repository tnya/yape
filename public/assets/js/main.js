/* INICIO PANTALLA TRES*/
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
        }
	},1000);
}

// Start
c();

// Loop
setInterval(function(){
	c();
},21000);
/* FIN PANTALLA TRES*/

console.log(localStorage.getItem(code))

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