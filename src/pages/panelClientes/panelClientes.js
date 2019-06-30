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
  })

  /* Panel admin empresas */

  $('#registro1').click(function () {
    $('#show-button').hide();
    $('#show-register1').show();
  })

  $('#registro2').click(function () {
    $('#show-button').hide();
    $('#show-register2').show();
  })


});

function backbutton() {
  $('#show-register1').hide();
  $('#show-register2').hide();
  $('#show-button').show();
}
firebase.initializeApp(firebaseConfig);

function platosRegistradosClientes() {
  $('body').ready(function () {
    var sesion = JSON.parse(sessionStorage.getItem('data'));

    firebase.database().ref('Platos/').once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        childSnapshot.forEach(function (e) {
          var platos = e.val();
          console.log(platos);
          var PrecioPlato = platos.PrecioPlato;
          var TamañoPLato = platos.TamañoPLato;
          var cantidadPlato = platos.cantidadPlato;
          var descripcionPlato = platos.descripcionPlato;
          var nombrePlato = platos.nombrePlato;
          var porcionPlato = platos.porcionPlato;
          var tiempoMaximo = platos.tiempoMaximo;
          var tiempoMinimo = platos.tiempoMinimo;
          var tipoPLato = platos.tipoPLato;

          var tarjeta = $(" <div class='col-12 col-sm-6 col-md-6 col-lg-4'>" +
            "<div class='card card--big'>" +
            "<div class='card__image'>" +
            "<img src='image/platos/plato3.jpg' class='img-fluid w-100' alt=''>" +
            "</div>" +
            "<h2 class='card__title'>"+ nombrePlato +"</h2>" +
            "<p class='card__text'>"+ descripcionPlato+"</p>" +
            "<div class='card__action-bar d-flex justify-content-between'>" +
            "<button class='card__button'>Detalles</button>" +
            "<button class='card__button'>Comprar</button>" +
            "</div>" +
            "</div>" +
            "</div>");

          $('#tarjetaPlatoCliente').append(tarjeta);

        });
      });
    });
  });
} platosRegistradosClientes()