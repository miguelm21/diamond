import $ from 'jquery';
import jQuery from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/scss/main.scss';
import * as firebase from 'firebase';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import * as AOS from 'aos/dist/aos.js';
import swal from 'sweetalert';
import Chart from 'chart.js';

// toggle class scroll 
$(window).scroll(function () {
  // Init AOS 
  AOS.init();
});

$(document).ready(function () {
  /* Carousel */

  $('#carousel-associates').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 6
      }
    }
  })

  /* Tooltips */
  $('[data-toggle="tooltip"]').tooltip()

  $('#expand').click(function () {
    $('.sidebar').toggleClass('width');
    $('.body-panel').toggleClass('width-panel');
    $('#arrow').toggleClass('rotate-arrow');
    $('.sidebar-nav ul li a span').toggleClass('text-hide1')
  })
  $("nav li a").click(function () {
    $("nav li").removeClass("active");
    $(this).parent().addClass("active");
    $("nav li a").removeClass("active");
  });

  /*show and hide REGISTRO */

  $('#show-register').click(function () {
    $('#login-empresa').hide();
    $('#register-form').show();
  });

  $('#backlogin').click(function () {
    $('#register-form').hide();
    $('#login-empresa').show();
  })

  $('#show-register2').click(function () {
    $('#login-empresa2').hide();
    $('#register-form2').show();
  });

  $('#backlogin2').click(function () {
    $('#register-form2').hide();
    $('#login-empresa2').show();
  });

  /* Panel admin empresas */

  $('#registro1').click(function () {
    $('#show-button').hide();
    $('#show-register1').show();
  });

  $('#registro2').click(function () {
    $('#show-button').hide();
    $('#show-register2').show();
  });

  /* Formularios restaurantes */

  $('#platos2').show();
  /* panel restaurante */
  $('#add-plate').click(function () {
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion2').hide();
    $('#register-chef').hide();
    $('#register-promocion').hide();
    $('#registro-platos').show();
  });
  $('#add-chef').click(function () {
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion2').hide();
    $('#registro-platos').hide();
    $('#register-promocion').hide();
    $('#register-chef').show();
  });
  $('#add-promocion').click(function () {
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion2').hide();
    $('#registro-platos').hide();
    $('#register-chef').hide();
    $('#register-promocion').show();
  });

  $('#activepanel1').click(function () {
    $('#activepanel2').removeClass('active');
    $('#activepanel3').removeClass('active');
    $(this).addClass('active');

    $('#promocion2').hide();
    $('#chef2').hide();
    $('#platos2').show();
    /* registro platos */
    $('#registro-platos').hide();
    $('#register-promocion').hide();
    $('#register-chef').hide();
  });
  $('#activepanel2').click(function () {
    $('#activepanel1').removeClass('active');
    $('#activepanel3').removeClass('active');
    $(this).addClass('active');
    $('#promocion2').hide();
    $('#platos2').hide();
    $('#chef2').show();
    /* registro platos */
    $('#registro-platos').hide();
    $('#register-chef').hide();
    $('#register-promocion').hide();
  });
  $('#activepanel3').click(function () {
    $('#activepanel1').removeClass('active');
    $('#activepanel2').removeClass('active');
    $(this).addClass('active');
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion2').show();
    /* registro platos */
    $('#registro-platos').hide();
    $('#register-chef').hide();
    $('#register-promocion').hide();
  });


  /* Formularios restaurantes */

  $('#platos2').show();
  /* panel restaurante */
  $('#add-plate').click(function () {
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion2').hide();
    $('#register-chef').hide();
    $('#register-promocion').hide();
    $('#registro-platos').show();
  });
  $('#add-chef').click(function () {
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion2').hide();
    $('#registro-platos').hide();
    $('#register-promocion').hide();
    $('#register-chef').show();
  });
  $('#add-promocion').click(function () {
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion2').hide();
    $('#registro-platos').hide();
    $('#register-chef').hide();
    $('#register-promocion').show();
  });

  $('#activepanel1').click(function () {
    $('#activepanel2').removeClass('active');
    $('#activepanel3').removeClass('active');
    $(this).addClass('active');

    $('#promocion2').hide();
    $('#chef2').hide();
    $('#platos2').show();
    /* registro platos */
    $('#registro-platos').hide();
    $('#register-promocion').hide();
    $('#register-chef').hide();
  });
  $('#activepanel2').click(function () {
    $('#activepanel1').removeClass('active');
    $('#activepanel3').removeClass('active');
    $(this).addClass('active');
    $('#promocion2').hide();
    $('#platos2').hide();
    $('#chef2').show();
    /* registro platos */
    $('#registro-platos').hide();
    $('#register-chef').hide();
    $('#register-promocion').hide();
  });
  $('#activepanel3').click(function () {
    $('#activepanel1').removeClass('active');
    $('#activepanel2').removeClass('active');
    $(this).addClass('active');
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion2').show();
    /* registro platos */
    $('#registro-platos').hide();
    $('#register-chef').hide();
    $('#register-promocion').hide();
  });

  function backbutton() {
    $('#show-register1').hide();
    $('#show-register2').hide();
    $('#show-button').show();
  }

});

//*************************codigo vitico */

firebase.initializeApp(firebaseConfig);

function registroempleados() {
  $(document).ready(function () {
    $('#registrarPlato').click(function (e) {
      e.preventDefault();
      var datos = $('#registroPlato').serializeArray();
      //console.log(datos);

      var nombrePlato = datos[0].value;
      var descripcionPlato = datos[1].value;
      var PrecioPlato = datos[2].value;
      var TamañoPLato = datos[3].value;
      var cantidadPlato = datos[4].value;
      var porcionPlato = datos[5].value;
      var tipoPLato = datos[6].value;
      var tiempoMinimo = datos[7].value;
      var tiempoMaximo = datos[8].value;
      console.log(nombrePlato);

      var sesion = JSON.parse(sessionStorage.getItem('data'));
      var restaurante = (sesion.uid);
      console.log(restaurante);

      firebase.database().ref('Platos/' + restaurante + "/").push().set({

        "nombrePlato": nombrePlato,
        "descripcionPlato": descripcionPlato,
        "PrecioPlato": PrecioPlato,
        "TamañoPLato": TamañoPLato,
        "cantidadPlato": cantidadPlato,
        "porcionPlato": porcionPlato,
        "tipoPLato": tipoPLato,
        "tiempoMinimo": tiempoMinimo,
        "tiempoMaximo": tiempoMaximo,

      }, function (error) {
        if (error) {
          alert('Hay un error en sus datos verifique e intentelo de nuevo...')
        } else {
          alert('Registro completado con exito!')
        }




      });
    });
  });
} registroempleados();

function platosRegistrados() {
  $('body').ready(function () {
    var sesion = JSON.parse(sessionStorage.getItem('data'));
    firebase.database().ref('/Platos/' + sesion.uid).once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {

        var childData = childSnapshot.val();
        //  console.log(childData);
        var PrecioPlato = childData.PrecioPlato;
        var TamañoPLato = childData.TamañoPLato;
        var cantidadPlato = childData.cantidadPlato;
        var descripcionPlato = childData.descripcionPlato;
        var nombrePlato = childData.nombrePlato;
        var porcionPlato = childData.porcionPlato;
        var tiempoMaximo = childData.tiempoMaximo;
        var tiempoMinimo = childData.tiempoMinimo;
        var tipoPLato = childData.tipoPLato;
        // console.log(PrecioPlato);


        var tarjeta = $("<div class=' col-xl-3 col-md-4 col-sm-6 col-12' >" +
          "<div class='card'>" +
          "<div class='dropdown'>" +
          "<button class='btn dropdown-toggle' type='button' id='dropdownMenuButton1' data-toggle='dropdown' aria-haspopup='false' aria-expanded='false'>" +
          "<i class='fas fa-ellipsis-v'></i>" +
          "</button>" +
          "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton1'>" +
          "<a class='dropdown-item' href='#' data-toggle='modal' data-target='#modal-editar-beneficio'>Editar</a>" +
          "<a class='dropdown-item' href='#' data-toggle='modal' data-target='#modal-eliminar'>Eliminar</a>" +
          "</div>" +
          "</div>" +
          "<img class='card-img-top' src='/src/assets/image/platos/plato1.jpg' alt='Card image'>" +
          "<div class='card-body'>" +
          "<h4 class='card-title'>" + nombrePlato + "</h4>" +
          "<p class='card-text'>" + descripcionPlato + "</p>" +
          "</div>" +
          "<div class='tag'>" +
          "<a href='#'>" + tipoPLato + "</a>" +
          "</div>" +
          "</div>" +
          "</div>");

        $('#tarjetaPlato').append(tarjeta);

      });
    });
  });
} platosRegistrados()
/*
function registropromociones() {
  $(document).ready(function () {
    $('#registrarPromo').click(function (e) {
      e.preventDefault();
      var datos = $('#registroPromo').serializeArray();
      //console.log(datos);
      var nombrePromo = datos[0].value;
      var DescripcionPromo = datos[1].value;
      var PrecioPromo = datos[2].value;
      var tamañoPromo = datos[3].value;
      var cantidadPromo = datos[4].value;
      var procionPromo = datos[5].value;
      var tiempoMin = datos[6].value;
      var tiempoMax = datos[7].value;
      //console.log(nombrePromo);

      var sesion = JSON.parse(sessionStorage.getItem('data'));
      var restaurante = (sesion.uid);
      console.log(restaurante);

      firebase.database().ref('Promo/' + restaurante + "/").push().set({

        "nombrePromo": nombrePromo,
        "DescripcionPromo": DescripcionPromo,
        "PrecioPromo": PrecioPromo,
        "tamañoPromo": tamañoPromo,
        "cantidadPromo": cantidadPromo,
        "procionPromo": procionPromo,
        "tiempoMin": tiempoMin,
        "tiempoMax": tiempoMax

      }, function (error) {
        if (error) {
          alert('Hay un error en sus datos verifique e intentelo de nuevo...')
        } else {
          alert('Registro completado con exito!')
        }
      });
    });
  });
} registropromociones();**/

function promoRegistrados() {
  $('body').ready(function () {
    var sesion = JSON.parse(sessionStorage.getItem('data'));
    firebase.database().ref('/Promo/' + sesion.uid).once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {

        var childData = childSnapshot.val();
        //console.log(childData);

        var DescripcionPromo = childData.DescripcionPromo;
        var PrecioPromo = childData.PrecioPromo;
        var cantidadPromo = childData.cantidadPromo;
        var nombrePromo = childData.nombrePromo;
        var procionPromo = childData.procionPromo;
        var tamañoPromo = childData.tamañoPromo;
        var tiempoMax = childData.tiempoMax;
        var tiempoMin = childData.tiempoMin;


        var tarjeta = $("<div class=' col-xl-3 col-md-4 col-sm-6 col-12' >" +
          "<div class='card'>" +
          "<div class='dropdown'>" +
          "<button class='btn dropdown-toggle' type='button' id='dropdownMenuButton1' data-toggle='dropdown' aria-haspopup='false' aria-expanded='false'>" +
          "<i class='fas fa-ellipsis-v'></i>" +
          "</button>" +
          "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton1'>" +
          "<a class='dropdown-item' href='#' data-toggle='modal' data-target='#modal-editar-beneficio'>Editar</a>" +
          "<a class='dropdown-item' href='#' data-toggle='modal' data-target='#modal-eliminar'>Eliminar</a>" +
          "</div>" +
          "</div>" +
          "<img class='card-img-top' src='/src/assets/image/platos/plato1.jpg' alt='Card image'>" +
          "<div class='card-body'>" +
          "<h4 class='card-title'>" + nombrePromo + "</h4>" +
          "<p class='card-text'>" + DescripcionPromo + "</p>" +
          "</div>" +
          "<div class='tag'>" +
          "<a href='#'> €" + PrecioPromo + "</a>" +
          "</div>" +
          "</div>" +
          "</div>");

        $('#promocion2').append(tarjeta);

      });
    });
  });
} promoRegistrados()

function readFile(input) {

    var reader = new FileReader();
    reader.onload = function (e) {
      console.log(e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  
}

var fileUpload = document.getElementById('file-upload');
fileUpload.onchange = function (e) {
  readFile(e.srcElement);
}
