$('.carousel.carousel-slider').carousel({dist: 0}); //inicialización de carrusel de materialize

/*función para que el usuario subir una imagen propia en su perfil*/
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
