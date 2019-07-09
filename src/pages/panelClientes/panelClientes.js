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
//import swal from 'sweetalert';

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
function restartLoading() {
  $("#status").show();
  $("#preloader").show();
}restartLoading()

function hideLoading() {
  $("#status").fadeOut();
  $("#preloader").delay(1000).fadeOut("slow");
  $('.modal-backdrop').remove();
}

firebase.initializeApp(firebaseConfig);

function restauranteRegistradosClientes() {
  $('body').ready(function () {

    firebase.database().ref('Restaurante/').once('value').then(function (snapshot) {

      snapshot.forEach(function (e) {
        var restaurante = e.val();
        //  console.log(e.key);
        var keyRestaurante = e.key;
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

        //buscar imagen restaurante
        var storageRef = firebase.storage().ref();
        var mountainsRef = storageRef.child("");
        mountainsRef.child(rutaImagenRestaurante).getDownloadURL().then(function (url) {

          var tarjeta = $(" <div class='col-12 col-sm-6 col-md-6 col-lg-4'>" +
            "<div class='card card--big'>" +
            "<div class='card__image'>" +
            "<img src='" + url + "' class='img-fluid w-100' alt=''>" +
            "</div>" +
            "<h2 class='card__title'>" + nombreRestaurante + "</h2>" +
            "<p class='card__text'>" + pais + "</p>" +
            "<div class='card__action-bar d-flex justify-content-between'>" +
            "<button class='card__button hh' id='" + keyRestaurante + "'>Detalles</button>" +
            "<button class='card__button' data-toggle='modal' data-target='#modal-pago'>Comprar</button>" +
            "</div>" +
            "</div>" +
            "</div>");

          $('#tarjetaPlatoCliente').append(tarjeta);

          /*  */

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
         
        var g = saldoEmpresa.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
      document.getElementById('saldoCliente').innerHTML = "" + g;
        
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

        // console.log(sumaSaldo);

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
    $('#nombreEmpresa').append("<span>" + sesion.users.correo + "</span>");
  });
} nombreCliente()

function detalleRestauranteCliente() {

  $(document.body).on('click', '.hh', (e) => {
    var uidRestaurante = e.currentTarget.id;
    firebase.database().ref('Restaurante/' + uidRestaurante + '/').once('value').then(function (snapshot) {
      var restaurante = snapshot.val();
      //   console.log(restaurante);
      var NIF = restaurante.NIF;
      var codigoPosta = restaurante.codigoPosta;
      var correo = restaurante.correo;
      var direccion = restaurante.direccion;
      var idRestauran = restaurante.idRestauran;
      var nombreRestaurante = restaurante.nombreRestaurante;
      var pais = restaurante.pais;
      var poblacion = restaurante.poblacion;
      var rutaImagenRestaurante = restaurante.rutaImagenRestaurante;
      var telefono = restaurante.telefono;


      $('#resName').text(nombreRestaurante);
      $('#direccionRestaurante').text(direccion);
      $('#direccionTelefono').text(telefono);
      $('#direccionPais').text(pais);
      $('#direccionCorreo').text(correo);

      firebase.database().ref('Platos/' + uidRestaurante + '/').once('value').then(function (snapshot) {
        snapshot.forEach(function (plato) {
          var platos = (plato.val());
          var keyPlato = plato.key;
          // console.log(keyPlato);

          var PrecioPlato = platos.PrecioPlato;
          var TamañoPLato = platos.TamañoPLato;
          var cantidadPlato = platos.cantidadPlato;
          var descripcionPlato = platos.descripcionPlato;
          var nombrePlato = platos.nombrePlato;
          var porcionPlato = platos.porcionPlato;
          var rutaGuardaImagen = platos.rutaGuardaImagen;
          var tiempoMaximo = platos.tiempoMaximo;
          var tiempoMinimo = platos.tiempoMinimo;
          var tipoPLato = platos.tipoPLato;

          var storageRef = firebase.storage().ref();
          var mountainsRef = storageRef.child("");
          mountainsRef.child(rutaGuardaImagen).getDownloadURL().then(function (url) {
            $('#tablaPlatos').append("<tr><td>" + nombrePlato + "</td><td>" + descripcionPlato + "</td><td> €" + PrecioPlato + "</td><td>" + tipoPLato + "</td><td>" +
              porcionPlato + "</td><td> <img class='img-fluid' src='" + url + "' > </td><td> " +
              " <button class='btn buy comprarPlatoboton' id='" + keyPlato + "' type='submit' value='" + uidRestaurante + "'  data-toggle='modal' data-target='#modal-comprar'><i class='fas fa-shopping-cart'></i></button> </td></tr>");

          });
        }); $('#modal-detalles-plato').modal('show');
      });




    })
  });

} detalleRestauranteCliente()

function comprarLista() {
  $(document.body).on('click', '.comprarPlatoboton', (e) => {
    var keyPlatos = e.currentTarget.id;
    var restaurante = e.currentTarget.value;

    firebase.database().ref('Platos/' + restaurante + '/' + keyPlatos + '/').once('value').then(function (snapshot) {
      var platoComprado = (snapshot.val());
      var descripcionPlato = platoComprado.descripcionPlato;
      var nombrePlato = platoComprado.nombrePlato;
      var PrecioPlato = platoComprado.PrecioPlato;
      $('.nombrePlato').html("<h4>" + nombrePlato + "</h4> <p class='description'>" + descripcionPlato + "</p><p> € " + PrecioPlato + "</p>");
      $('#botonComprar').html("<button type='button' id=" + keyPlatos + " class='btn primary comprarYa' value=" + restaurante + " >Aceptar y Comprar</button>");
    })
  })
} comprarLista()

function comprar() {
  $(document).ready(function () {       
    $(document.body).on('click', '.comprarYa', function (e) {    
      restartLoading(); 
      var data = sessionStorage.getItem('data');
      var sesion = JSON.parse(data);
      //console.log(sesion.users.nombre);
      var keyPlatos = e.currentTarget.id;
      var restaurante = e.currentTarget.value;
      //console.log(keyPlatos, restaurante);
      firebase.database().ref('Platos/' + restaurante + '/' + keyPlatos + '/').once('value').then(function (snapshot) {
        var platoComprado = (snapshot.val());
        var descripcionPlato = platoComprado.descripcionPlato;
        var nombrePlato = platoComprado.nombrePlato;
        var PrecioPlato = platoComprado.PrecioPlato;
        firebase.database().ref('users/' + sesion.uid + "/cuentas").once('value').then(function (snapshot) {
          var snap = snapshot.val();
          // console.log(snap.cuentaTotal);
          var saldoCuenta1 = snap.cuanta1;
          var saldoCuenta2 = snap.cuenta2;
          var saldoTotal = parseFloat(saldoCuenta1) + parseFloat(saldoCuenta2);
          console.log('saldo' + saldoCuenta1);
          console.log('precio' + PrecioPlato);

          if (saldoTotal < PrecioPlato) {
            
            swal({
              title: "Sin Saldo?",
              text: "Aprovecha y recarga tu saldo!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then(() => {
              $('#modal-pago').modal('show');
            })

          } else if (saldoCuenta1 <= PrecioPlato) {
            
            var resta1 = parseFloat(saldoCuenta1) - parseFloat(PrecioPlato);
            var positivo = -1 * parseFloat(resta1);
            var resta2 = parseFloat(saldoCuenta2) - parseFloat(positivo);
         //   console.log('resultado1' + resta1);
           // console.log('resultado2' + resta2);

            firebase.database().ref('users/' + sesion.uid + "/cuentas").update({
              "cuanta1": 0,
              "cuenta2": resta2,
            })
            firebase.database().ref('transaccion/').push().update({
              "usuario": sesion,
              "restaurante": restaurante,
              "plato": platoComprado,
              "fecha": firebase.database.ServerValue.TIMESTAMP
            });
         
            swal("Good job!", "You clicked the button!", "success", {
              button: "Aww yiss!",
            });
          } else {
          
            var resta1 = parseFloat(saldoCuenta1) - parseFloat(PrecioPlato);
            firebase.database().ref('users/' + sesion.uid + "/cuentas").update({
              "cuanta1": resta1

            })
            firebase.database().ref('transaccion/').push().update({
              "usuario": sesion,
              "restaurante": restaurante,
              "plato": platoComprado,
              "fecha": firebase.database.ServerValue.TIMESTAMP
            });
            hideLoading();
            swal("Good job!", "You clicked the button!", "success", {
              button: "Aww yiss!",
            });
          }
        })
      })
    });
  });
} comprar()

function historialCliente() {
  $(document).ready(function () {
    hideLoading();
    var data = sessionStorage.getItem('data');
    var sesion = JSON.parse(data);
    //console.log(sesion.uid);

    firebase.database().ref('/transaccion/').orderByChild('/usuario/uid/').equalTo(sesion.uid).once('value').then(function (snapshot) {
      //console.log(snapshot.val());
      snapshot.forEach(element => {
        var datosCompras = (element.val());
        //   console.log(datosCompras);

        var restaurante = datosCompras.restaurante;
        var plato = datosCompras.plato.nombrePlato;
        var PrecioPlato = datosCompras.plato.PrecioPlato;
        var fecha = datosCompras.fecha;
        var date = new Date(fecha);
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var hours = date.getHours();
        var day = date.getDate();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var convdataTime = day + '-' +  month + '-' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        // Day
        var dia = date.getDate();
        console.log(convdataTime);

        firebase.database().ref('Restaurante/').orderByKey().equalTo(restaurante).once('value').then(function (snapshot) {
          // console.log(snapshot.val());
          snapshot.forEach(element => {
            var datos = element.val();
            var restaurante = datos.nombreRestaurante;
            //   console.log(restaurante);

            $('#historialClientePlatos').append("  <tr><td>" + restaurante + "</td> <td>" + plato + "</td> <td>" + PrecioPlato + "</td> <td>€ " + PrecioPlato + "</td> <td>" + convdataTime + "</td> </tr>");
          });
        })
      });
    })
  });
} historialCliente()


