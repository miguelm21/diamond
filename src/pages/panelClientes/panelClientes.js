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
  /* Panel clientes */

  /* show and hide aside */
  $('#platos-show').click(function () {
    $('#div-platos').show();
    $('#historial_cliente').hide();
  });

  $('#historial-show').click(function () {
    $('#div-platos').hide();
    $('#historial_cliente').show();
  });


});




function backbutton() {
  $('#show-register1').hide();
  $('#show-register2').hide();
  $('#show-button').show();
}
firebase.initializeApp(firebaseConfig);

function restauranteRegistradosClientes() {
  $('body').ready(function () {
    var sesion = JSON.parse(sessionStorage.getItem('data'));

    firebase.database().ref('Restaurante/').once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        childSnapshot.forEach(function (e) {
          var restaurante = e.val();
          //   console.log(restaurante);

          var NIF = restaurante.NIF;
          var codigoPosta = restaurante.codigoPosta;
          var correo = restaurante.correo;
          var cuentas = restaurante.cuentas;
          var direccion = restaurante.direccion;
          var idRestauran = restaurante.idRestauran;
          var nombreRestaurante = restaurante.nombreRestaurante;
          var pais = restaurante.pais;
          var poblacion = restaurante.poblacion;
          var telefono = restaurante.telefono;
          var rutaImagenRestaurante = restaurante.rutaImagenRestaurante;
          //console.log(NIF);
          //busca imagen///////////////
          var storageRef = firebase.storage().ref();
          var mountainsRef = storageRef.child("");
          //console.log('qqqqqqqqqqqqqqqqq');
          // console.log(rutaGuardaImagen);
          mountainsRef.child(rutaImagenRestaurante).getDownloadURL().then(function (url) {
            console.log(url);
          
            var tarjeta = $(" <div class='col-12 col-sm-6 col-md-6 col-lg-4'>" +
              "<div class='card card--big'>" +
              "<div class='card__image'>" +
              "<img src='"+url+"' class='img-fluid w-100' alt=''>" +
              "</div>" +
              "<h2 class='card__title'>" + nombreRestaurante + "</h2>" +
              "<p class='card__text'>" + pais + "</p>" +
              "<div class='card__action-bar d-flex justify-content-between'>" +
              "<button class='card__button' data-toggle='modal' data-target='#modal-detalles-plato' value='"+pais+"'>Detalles</button>" +
              "<button class='card__button' data-toggle='modal' data-target='#modal-pago'>Comprar</button>" +
              "</div>" +
              "</div>" +
              "</div>");

            $('#tarjetaPlatoCliente').append(tarjeta);

            ///mpdal
              $('#modalRestauranteDetalle').append("<div class='modal fade' id='modal-detalles-plato' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel'aria-hidden='true'>"+
              "  <div class='modal-dialog modal-base' role='document'>"+
              "    <div class='modal-content'>"+
              "      <div class='modal-header'>"+
              "        <h5 class='modal-title' id='exampleModalLabel'>Detalles</h5>"+
              "        <button type='button' class='close' data-dismiss='modal' aria-label='Close'>"+
              "          <span aria-hidden='true'>&times;</span>"+
              "        </button>"+
              "      </div>"+
              "      <div class='modal-body'>"+
              "        <div class='show-details'>"+
              "          <div class='row'>"+
              "            <div class='col-sm-12 col-12'>"+
              "              <div class='detail-img'>"+
              "                  <img src='/src/assets/image/platos/plato1.jpg' >"+
              "              </div>"+
              "            </div>"+
              "            <div class='col-sm-6 col-12'>"+
              "              <div class='form-group'>"+
              "                <label >Nombre Restaurante</label>"+
              "                <p>" + nombreRestaurante + "</p>"+
              "              </div>"+
              "            </div>"+
              "            <div class='col-sm-6 col-12'>"+
              "              <div class='form-group'>"+
              "                <label>Restaurante</label>"+
              "                <p>Toro gordo</p>"+
              "              </div>"+
              "            </div>"+
              "            <div class='col-sm-12 col-12'>"+
              "              <div class='form-group'>"+
              "                <label>Descripción</label>"+
              "                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum dicta accusantium aperiam cum atque quasi deserunt quo enim fugit. Voluptatibus doloribus delectus velit possimus beatae, accusamus similique tenetur quia nesciunt?</p>"+
              "              </div>"+
              "            </div>"+
              "            <div class='col-sm-6 col-12'>"+
              "              <div class='form-group'>"+
              "                <label>Tamaño</label>"+
              "                <p>Personal</p>"+
              "              </div>"+
              "            </div>"+
              "            <div class='col-sm-6 col-12'>"+
              "              <div class='form-group'>"+
              "                <label>Cantidad</label>"+
              "                <p>500 g</p>"+
              "              </div>"+
              "            </div>"+
              "            <div class='col-sm-6 col-12'>"+
              "              <div class='form-group'>"+
              "                <label>Porcion</label>"+
              "                <p>2</p>"+
              "              </div>"+
              "            </div>"+
              "            <div class='col-sm-6 col-12'>"+
              "              <div class='form-group'>"+
              "                <label>Tiempo de preparación</label>"+
              "                <p>30 min</p>"+
              "              </div>"+
              "            </div>"+
              "          </div>"+
              "        </div>"+
              "      </div>"+
              "      <div class='modal-footer'>"+
              "        <button type='button' class='btn edit' data-dismiss='modal'>Salir</button>"+
              "      </div>"+
              "    </div>"+
              "  </div>"+
              "</div>");

          })
        });
      });
    });
  });
} restauranteRegistradosClientes()

function consultaSaldoCliente() {
  $(document).ready(function () {
    var data = sessionStorage.getItem('data');
    var sesion = JSON.parse(data);
    firebase.database().ref('users/' + sesion.uid + "/cuentas/").on('value', function (snapshot) {
      var snap = snapshot.val();
      var cuenta1 = snap.cuanta1;
      var cuenta2 = snap.cuenta2;
      //console.log(snap);
      //console.log(cuenta2);

      var saldoEmpresa = parseFloat(cuenta1) + parseFloat(cuenta2);

      document.getElementById('saldoCliente').innerHTML = "€ " + saldoEmpresa;

    })
  });
} consultaSaldoCliente()

function RecargarSaldoEMpresa() {
  $(document).ready(function () {
    $('#recargarSaldoCliente').click(function (e) {
      e.preventDefault();
      var data = sessionStorage.getItem('data');
      var sesion = JSON.parse(data);
      var uid = sesion.uid;
      firebase.database().ref('users/' + uid + "/cuentas").once('value').then(function (snapshot) {
        var snap = snapshot.val();
        console.log(snap.cuentaTotal);
        var saldoCuenta1 = snap.cuanta1;
        //  console.log(saldoCuenta1);


        var form = $('#recargaSaldoCliente').serializeArray();
        //  console.log(form);
        var tarjetaCredito = form[0].value;
        var nombreTitular = form[1].value;
        var NumeroTarjeta = form[2].value;
        var fechaExp = form[3].value;
        var codigoSeguridad = form[4].value;
        var montoRecargar = form[5].value;
        var sumaSaldo = parseFloat(montoRecargar) + parseFloat(saldoCuenta1);

        console.log(sumaSaldo);

        firebase.database().ref('users/' + uid + "/cuentas").update({
          "cuanta1": sumaSaldo

        })
        firebase.database().ref('/Recargas/users').push().set({
          "tarjetaCredito": tarjetaCredito,
          "nombreTitular": nombreTitular,
          "NumeroTarjeta": NumeroTarjeta,
          "fechaExp": fechaExp,
          "codigoSeguridad": codigoSeguridad,
          "montoRecargar": montoRecargar,
          "saldoDespuesRecarga": sumaSaldo,
          "uidempresa": uid
        }, function (error) {
          if (error) {
            alert('Hay un error en sus datos verifique e intentelo de nuevo...')
          } else {
            alert('Recarga realizada con exito!');
          }
        });
      });
    })
  })

} RecargarSaldoEMpresa()

function nombreCliente() {  
  $(document).ready(function () {
    var data = sessionStorage.getItem('data');
    var sesion = JSON.parse(data)
    $('#nombreEmpresa').append("<span>"+ sesion.users.correo+"</span>");
  });
}nombreCliente()