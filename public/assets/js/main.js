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