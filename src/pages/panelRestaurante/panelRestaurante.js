/* AIzaSyCYLRFBUVI8ZWSxUaupg70nZ9aGHbVXemY   api mapa*/
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
import { log } from 'util';

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
    $('#promocion22').hide();
    $('#register-chef').hide();
    $('#historial-compras').hide();
    $('#register-promocion').hide();
    $('#box-transacciones').hide();
    $('#box-retirar').hide();
    $('#box-config').hide();
    $('#registro-platos').show();
    $('#activepanel1').addClass('active');
    $('#activepanel3').removeClass('active');
    $('#show-historial').removeClass('active');
    $('#show-transacciones').removeClass('active');
    $('#show-config').removeClass('active');
    $('#show-recibir').removeClass('active');
  });
  $('#add-chef').click(function () {
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion22').hide();
    $('#registro-platos').hide();
    $('#historial-compras').hide();
    $('#register-promocion').hide();
    $('#box-transacciones').hide();
    $('#box-config').hide();
    $('#box-retirar').hide();
    $('#register-chef').show();
    $('#activepanel1').removeClass('active');
    $('#show-config').removeClass('active');
    $('#activepanel3').addClass('active');
    $('#show-historial').removeClass('active');
  });
  $('#add-promocion').click(function () {
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion22').hide();
    $('#registro-platos').hide();
    $('#register-chef').hide();
    $('#historial-compras').hide();
    $('#box-transacciones').hide();
    $('#box-config').hide();
    $('#box-retirar').hide();
    $('#register-promocion').show();
    $('#activepanel1').removeClass('active');
    $('#activepanel3').addClass('active');
    $('#show-config').removeClass('active');
    $('#show-historial').removeClass('active');
  });
  $('#show-historial').click(function () {
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion22').hide();
    $('#registro-platos').hide();
    $('#register-chef').hide();
    $('#register-promocion').hide();
    $('#box-transacciones').hide();
    $('#box-config').hide();
    $('#box-retirar').hide();
    $('#historial-compras').show();
    $('#activepanel1').removeClass('active');
    $('#activepanel3').removeClass('active');
    $('#show-config').removeClass('active');
    $('#show-historial').addClass('active');
  });


  $('#activepanel1').click(function () {
    $('#activepanel2').removeClass('active');
    $('#activepanel3').removeClass('active');
    $('#show-historial').removeClass('active');
    $('#show-transacciones').removeClass('active');
    $('#show-retirar').removeClass('active');
    $('#show-config').removeClass('active');
    $(this).addClass('active');

    $('#promocion22').hide();
    $('#chef2').hide();
    $('#platos2').show();
    /* registro platos */
    $('#registro-platos').hide();
    $('#register-promocion').hide();
    $('#register-chef').hide();
    $('#historial-compras').hide();
    $('#box-transacciones').hide();
    $('#box-retirar').hide();
    $('#box-config').hide();
  });
  $('#activepanel2').click(function () {
    $('#activepanel1').removeClass('active');
    $('#activepanel3').removeClass('active');
    $('#show-historial').removeClass('active');
    $('#show-config').removeClass('active');
    $(this).addClass('active');
    $('#promocion22').hide();
    $('#platos2').hide();
    $('#chef2').show();
    /* registro platos */
    $('#registro-platos').hide();
    $('#register-chef').hide();
    $('#historial-compras').hide();
    $('#register-promocion').hide();
    $('#box-transacciones').hide();
    $('#box-retirar').hide();
    $('#box-config').hide();
  });
  $('#activepanel3').click(function () {
    $('#activepanel1').removeClass('active');
    $('#activepanel2').removeClass('active');
    $('#show-historial').removeClass('active');
    $('#show-transacciones').removeClass('active');
    $('#show-retirar').removeClass('active');
    $('#show-config').removeClass('active');
    $(this).addClass('active');
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion22').show();
    /* registro platos */
    $('#registro-platos').hide();
    $('#register-chef').hide();
    $('#historial-compras').hide();
    $('#register-promocion').hide();
    $('#box-transacciones').hide();
    $('#box-retirar').hide();
    $('#box-config').hide();
  });
  $('#show-historial').click(function () {
    $('#activepanel1').removeClass('active');
    $('#activepanel3').removeClass('active');
    $('#show-transacciones').removeClass('active');
    $('#show-retirar').removeClass('active');
    $('#show-config').removeClass('active');
    $(this).addClass('active');
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion22').hide();
    /* registro platos */
    $('#registro-platos').hide();
    $('#register-chef').hide();
    $('#register-promocion').hide();
    $('#box-transacciones').hide();
    $('#box-retirar').hide();
    $('#box-config').hide();
  });
  $('#show-transacciones').click(function () {
    $('#activepanel1').removeClass('active');
    $('#activepanel3').removeClass('active');
    $('#show-retirar').removeClass('active');
    $('#show-historial').removeClass('active');
    $('#show-config').removeClass('active');
    $(this).addClass('active');
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion22').hide();
    /* registro platos */
    $('#registro-platos').hide();
    $('#register-chef').hide();
    $('#register-promocion').hide();
    $('#box-retirar').hide();
    $('#historial-compras').hide();
    $('#box-config').hide();
    $('#box-transacciones').show();
  });
  $('#show-retirar').click(function () {
    $('#activepanel1').removeClass('active');
    $('#activepanel3').removeClass('active');
    $('#show-historial').removeClass('active');
    $('#show-transacciones').removeClass('active');
    $('#show-config').removeClass('active');
    $(this).addClass('active');
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion22').hide();
    /* registro platos */
    $('#registro-platos').hide();
    $('#register-chef').hide();
    $('#register-promocion').hide();
    $('#box-transacciones').hide();
    $('#historial-compras').hide();
    $('#box-config').hide();
    $('#box-retirar').show();
  });
  $('#show-config').click(function () {
    $('#activepanel1').removeClass('active');
    $('#activepanel3').removeClass('active');
    $('#show-historial').removeClass('active');
    $('#show-transacciones').removeClass('active');
    $('#show-retirar').removeClass('active');
    $(this).addClass('active');
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion22').hide();
    /* registro platos */
    $('#registro-platos').hide();
    $('#register-chef').hide();
    $('#register-promocion').hide();
    $('#box-transacciones').hide();
    $('#historial-compras').hide();
    $('#box-retirar').hide();
    $('#box-config').show();
  });
  function backbutton() {
    $('#show-register1').hide();
    $('#show-register2').hide();
    $('#show-button').show();
  }

  /* Open modal checkbox */

  $('#checkbox').click(function () {
    if ($(this).is(':checked')) {
      $('#modal-eliminar1').modal('show');
    } else {
      $('#modal-eliminar1').modal('hide');
    }
  });

});

//*************************codigo vitico */
function restartLoading() {
  $("#status").show();
  $("#preloader").show();
}

function hideLoading() {
  $("#status").fadeOut();
  $("#preloader").delay(1000).fadeOut("slow");
  $('.modal-backdrop').remove();
}

firebase.initializeApp(firebaseConfig);

$(document.body).on('change', '#imagenPlato', function name(params) {
  $('#validate-image').addClass('d-block');
  // $('#imagenPlatos').html('Imagen agregada con exito');
})
$(document.body).on('change', '#imagenPromo', function name(params) {
  $('#validate-image2').addClass('d-block');
  // $('#imagenPromos').html('Imagen agregada con exito');
})
$(document.body).on('change', '#file', function name(params) {
  $('#validate-image3').addClass('d-block');
  // $('#files').html('Imagen agregada con exito');
})




function registroPlato() {
  $(document).ready(function () {
    $('#registrarPlato').click(function (e) {
      e.preventDefault();
      var sesion = JSON.parse(sessionStorage.getItem('data'));
      var restaurante = (sesion.uid);

      var datos = $('#registroPlato').serializeArray();
      var nombrePlato = datos[0].value; if (!nombrePlato) { $('#pnombrePlato').html('Campo obligatorio'); } else { $('#pnombrePlato').html('') }
      var descripcionPlato = datos[1].value; if (!descripcionPlato) { $('#pdescripcionPlato').html('Campo obligatorio'); } else { $('#pdescripcionPlato').html('') }
      var PrecioPlato = datos[2].value; if (!PrecioPlato) { $('#pPrecioPlato').html('Campo obligatorio'); } else { $('#pPrecioPlato').html('') }
      var TamañoPLato = datos[3].value; if (!TamañoPLato) { $('#pTamañoPLato').html('Campo obligatorio'); } else { $('#pTamañoPLato').html('') }
      var cantidadPlato = datos[4].value; if (!cantidadPlato) { $('#pcantidadPlato').html('Campo obligatorio'); } else { $('#pcantidadPlato').html('') }
      var porcionPlato = datos[5].value; if (!porcionPlato) { $('#pporcionPlato').html('Campo obligatorio'); } else { $('#pporcionPlato').html('') }
      var tipoPLato = datos[6].value; if (!tipoPLato) { $('#ptipoPLato').html('Campo obligatorio'); } else { $('#ptipoPLato').html('') }
      var tiempoMinimo = datos[7].value; if (!tiempoMinimo) { $('#ptiempoMinimo').html('Campo obligatorio'); } else { $('#ptiempoMinimo').html('') }
      var tiempoMaximo = datos[8].value; if (!tiempoMaximo) { $('#ptiempoMaximo').html('Campo obligatorio'); } else { $('#ptiempoMaximo').html('') }
      // console.log(tipoPLato);
      if (tipoPLato == 'Tipo Plato') { swal("Error", "Tipo plato esta vacio seleccione una opcion", "error") } else {

        if (nombrePlato && descripcionPlato && PrecioPlato && TamañoPLato && cantidadPlato && porcionPlato && tipoPLato && tiempoMinimo && tiempoMaximo) {

          var fotoval = document.getElementById('imagenPlato');
          var foto = new FileReader();
          foto.onload = function (e) {
            var file = (e.target.result);
            // console.log(file);

            var storageRef = firebase.storage().ref();
            var mountainsRef = storageRef.child('imagen/plato' + restaurante + fotoval.files[0].name);
            var imagen = file.substring(23);

            mountainsRef.putString(imagen, 'base64').then(function (snapshot) {
              var rutaGuardaImagen = snapshot.metadata.fullPath;

              var storageRef = firebase.storage().ref();
              var mountainsRef = storageRef.child("");
              mountainsRef.child(rutaGuardaImagen).getDownloadURL().then(function (url) {


                firebase.database().ref('Platos/').push().set({

                  "nombrePlato": nombrePlato,
                  "descripcionPlato": descripcionPlato,
                  "PrecioPlato": PrecioPlato,
                  "TamañoPLato": TamañoPLato,
                  "cantidadPlato": cantidadPlato,
                  "porcionPlato": porcionPlato,
                  "tipoPLato": tipoPLato,
                  "tiempoMinimo": tiempoMinimo,
                  "tiempoMaximo": tiempoMaximo,
                  "rutaGuardaImagen": url,
                  "restaurante": restaurante
                }, function (error) {
                  if (error) {
                    hideLoading()
                    swal("error!", "error!", "error")
                  } else {
                    hideLoading()
                    swal("Registro Exitoso!", "Registrado!", "success")
                    $("#registroPlato")[0].reset();
                  }
                });
              })
            })
          }, foto.readAsDataURL(fotoval.files[0]);
        } else {
          hideLoading(); swal("Error", "Campo Vacios", " Error")
        }
      }
    });
  });

} registroPlato();

function platosRegistrados() {
  $('body').ready(function () {
    var sesion = JSON.parse(sessionStorage.getItem('data'));
    firebase.database().ref('/Platos/').orderByChild('restaurante').equalTo(sesion.uid).on('value', function (snapshot) {
      var tarjeta = '';
      snapshot.forEach(function (childSnapshot) {

        var childData = childSnapshot.val();
        //console.log(childData);
        var PrecioPlato = childData.PrecioPlato;
        var TamañoPLato = childData.TamañoPLato;
        var cantidadPlato = childData.cantidadPlato;
        var descripcionPlato = childData.descripcionPlato;
        var nombrePlato = childData.nombrePlato;
        var porcionPlato = childData.porcionPlato;
        var tiempoMaximo = childData.tiempoMaximo;
        var tiempoMinimo = childData.tiempoMinimo;
        var tipoPLato = childData.tipoPLato;
        var rutaGuardaImagen = childData.rutaGuardaImagen;

        tarjeta = "<div class=' col-xl-3 col-md-4 col-sm-6 col-12' >" +
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
          "<img class='card-img-top' src='" + rutaGuardaImagen + "' alt='Card image'>" +
          "<div class='card-body'>" +
          "<h4 class='card-title'>" + nombrePlato + "</h4>" +
          "<p class='card-text'>" + descripcionPlato + "</p>" +
          "</div>" +
          "<div class='tag'>" +
          "<a href='#'>" + tipoPLato + "</a>" +
          "</div>" +
          "</div>" +
          "</div>" + tarjeta;

        $('#tarjetaPlato').html(tarjeta);

      });
    });
  });
} platosRegistrados()

function registropromociones() {
  $(document).ready(function () {
    $('#registrarPromo').click(function (e) {

      e.preventDefault();

      var sesion = JSON.parse(sessionStorage.getItem('data'));
      var restaurante = (sesion.uid);
      //  console.log(restaurante);

      var datos = $('#registroPromo').serializeArray();
      // console.log(datos);
      var nombrePromo = datos[0].value;
      var DescripcionPromo = datos[1].value;
      var PrecioPromo = datos[2].value;
      var tamañoPromo = datos[3].value;
      var cantidadPromo = datos[4].value;
      var procionPromo = datos[5].value;
      var tiempoMin = datos[6].value;
      var tiempoMax = datos[7].value;
      console.log(nombrePromo);

      //////////////////////imagen         
      var fotoval = document.getElementById('imagenPromo');
      var foto = new FileReader();
      foto.onload = function (e) {
        var file = (e.target.result);
        var storageRef = firebase.storage().ref();
        var mountainsRef = storageRef.child('imagen/' + restaurante + fotoval.files[0].name);
        var imagen = file.substring(23);
        mountainsRef.putString(imagen, 'base64').then(function (snapshot) {
          var rutaGuardaImagen = snapshot.metadata.fullPath;
          console.log(rutaGuardaImagen);
          var storageRef = firebase.storage().ref();
          var mountainsRef = storageRef.child("");
          mountainsRef.child(rutaGuardaImagen).getDownloadURL().then(function (url) {
            firebase.database().ref('Promo/').push().set({

              "nombrePromo": nombrePromo,
              "DescripcionPromo": DescripcionPromo,
              "PrecioPromo": PrecioPromo,
              "tamañoPromo": tamañoPromo,
              "cantidadPromo": cantidadPromo,
              "procionPromo": procionPromo,
              "tiempoMin": tiempoMin,
              "tiempoMax": tiempoMax,
              "rutaGuardaImagen": url,
              "restaurante": restaurante

            }, function (error) {
              if (error) {
                hideLoading()
                swal("Registro error!", "error!", "error")
              } else {
                hideLoading()
                swal("Registro Exitoso!", " registrado!", "success")
              }

            });



          })
        });
      }
      foto.readAsDataURL(fotoval.files[0]);
      //////////////imagen//////////////////////////////

    });
  });
} registropromociones();

function promoRegistrados() {
  $('body').ready(function () {
    var sesion = JSON.parse(sessionStorage.getItem('data'));

    firebase.database().ref('/Promo/').orderByChild('restaurante').equalTo(sesion.uid).on('value', function (snapshot) {
      var tarjeta = '';
      snapshot.forEach(function (childSnapshot) {

        var childData = childSnapshot.val();
        // console.log(childData);

        var DescripcionPromo = childData.DescripcionPromo;
        var PrecioPromo = childData.PrecioPromo;
        var cantidadPromo = childData.cantidadPromo;
        var nombrePromo = childData.nombrePromo;
        var procionPromo = childData.procionPromo;
        var tamañoPromo = childData.tamañoPromo;
        var tiempoMax = childData.tiempoMax;
        var tiempoMin = childData.tiempoMin;
        var rutaGuardaImagen = childData.rutaGuardaImagen;

        tarjeta = tarjeta + ("<div class=' col-xl-3 col-md-4 col-sm-6 col-12' >" +
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
          "<img  src='" + rutaGuardaImagen + "' class='card-img-top'  alt='Card image'>" +
          "<div class='card-body'>" +
          "<h4 class='card-title'>" + nombrePromo + "</h4>" +
          "<p class='card-text'>" + DescripcionPromo + "</p>" +
          "</div>" +
          "<div class='tag'>" +
          "<a href='#'> €" + PrecioPromo + "</a>" +
          "</div>" +
          "</div>" +
          "</div>");

        $('#promocion2').html(tarjeta);

      });
    });
  });
} promoRegistrados()

function nombreRestaurante() {
  $(document).ready(function () {
    var data = sessionStorage.getItem('data');
    var sesion = JSON.parse(data);
    //  console.log(sesion);

    var nombreRestaurante = sesion.restaurante.nombreRestaurante;
    $('#restaurateCara').html("<img src='" + sesion.restaurante.rutaImagenRestaurante + "' ></img>");
    $('#nombreRestaurante').append("<span>" + nombreRestaurante + "</span>");
  });
} nombreRestaurante()
hideLoading();

function cerrarsesion() {
  $(document).ready(function () {
    $(document.body).on('click', '.cerrarsesion', function () {
      sessionStorage.removeItem("data");
      location.href = 'index.html'
      //alert("cerrado");
    });
  });
} cerrarsesion()

function notificaciones() {
  $(document).ready(function () {

    const messaging = firebase.messaging();
    messaging.usePublicVapidKey("BNH9hyxKC5faMqmfutsoi2bmVm8jm3guerqNkbW0DisLS48Rd9ebtBilFQYZzfaxCaoxlISBT7aQ2gf08WHn3jU");
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        console.log("kkk");

        messaging.getToken().then(function (snap) {
          console.log(snap);
          localStorage.setItem('tokenBlue', snap)
          messaging.onMessage(function (payload) {
            console.log('Message received. ', payload);

          });
        });

      } else {
        //  console.log('Unable to get permission to notify.');
      }
    });
    //console.log('notificaciones');
  });
} notificaciones()

function enviarNotificacion(token) {
  $(document).ready(function () {
    ////////////////////////////////////////////////////////
    var msg = {
      "to": token,
      "collapse_key": "type_a",
      "data": {
        "body": "Sending Notification Body From Data",
        "title": "Notification Title from Data",
        "key_1": "Value for key_1",
        "key_2": "Value for key_2"
      }
    }
    $.ajax({
      type: 'POST',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAAUsOwWoo:APA91bFKBqlAGM9eVVJ6WcQoQ6WUqQCXCAFexnSjn0gge-BT-IBVukT9lIluT05nl9QWM51uiZlsbmauq9o7ihYo8D1WtLHWXz4EEoDS_qMbsPtCjc_rDmNTNBhODNeiNpie8HWBs2lZ'
      },
      data: JSON.stringify(msg),
      success: function (response) {
        //  console.log(response);
      },
    });
  });
}

function saldoRestaurante() {
  $(document).ready(function () {
    var data = JSON.parse(sessionStorage.getItem('data'));
    var sesion = data.uid;
    firebase.database().ref('Restaurante/' + sesion).on('value', function (snapshot) {
      var snap = snapshot.val();
      // console.log(snap.cuentas.cuanta1);
      $('#balanceRestaurante').html(snap.cuentas.cuanta1.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }));
    })
  });
} saldoRestaurante();

function consultaTrasacciones() {
  $(document).ready(function () {
    var sesion = sessionStorage.getItem('data');
    var data = JSON.parse(sesion);
    //console.log('zzzzzzzzzz',data.uid);


    firebase.database().ref("Tranferencias/restaurantes/").orderByChild('uidRestaurante').equalTo(data.uid).once('value').then(function (snapshot) {

      //console.log(snapshot.val());
      snapshot.forEach(snap => {
        var snap = (snap.val());
        //  console.log(snap.fecha);

        var fecha = darFecha(snap.fecha);
        // console.log('fecha',fecha);

        $('#tablitaa').append("<tr> <td>" + snap.dataUsuario.correo + "</td> <td>" + snap.dataUsuario.nombre + " " + snap.dataUsuario.apellido + "</td> <td>" + snap.monto + "</td> <td>" + fecha + " </td>  </tr>");
      });

    });
  });
} consultaTrasacciones();

function darFecha(fecha) {

  var date = new Date(fecha);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var hours = date.getHours();
  var day = date.getDate();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var convdataTime = day + '-' + month + '-' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return convdataTime;

}

function transaccionRestaurante() {
  $(document).ready(function () {

    var sesion = sessionStorage.getItem('data');
    var datos = JSON.parse(sesion);
    firebase.database().ref('transaccion').orderByChild('restaurante').equalTo(datos.uid).on('value',a => {

      a.forEach(e => {
        var trans = (e.val());
        var key = e.key;
        console.log(key);
        console.log(trans.estatus);
        var boton = ( "<button  class='btn' ><i id='"+key+"' class='fas fa-check atendido'></i></button>")
        if (trans.estatus == 1) {
       
        $('#tablitaTrasaccion').append("<tr> <td>" + trans.usuario.correo + "</td> <td>" + trans.usuario.users.nombre+" "+trans.usuario.users.apellido +  "</td> <td>" + trans.plato.PrecioPlato + "</td> <td>" + trans.plato.nombrePlato +
         " </td>  <td>" + boton+ " </td>  </tr>");
            }
        else{
          $('#tablitAtendidos').append("<tr> <td>" + trans.usuario.correo + "</td> <td>" + trans.usuario.users.nombre+" "+trans.usuario.users.apellido +  "</td> <td>" + trans.plato.PrecioPlato + "</td> <td>" + trans.plato.nombrePlato +
         " </td>  <td>" + boton+ " </td>  </tr>");

        }
      });
    })
  });
} transaccionRestaurante();

function atenderPedido() {
  $(document).ready(function () {
    $(document.body).on('click','.atendido', function (e) {
      var trans =(e.currentTarget.id);
      firebase.database().ref('transaccion/'+trans+"/").update({
        "estatus":2
      });
      swal("Pedido","Pedido Atendido","success")

    });
  });
}atenderPedido()