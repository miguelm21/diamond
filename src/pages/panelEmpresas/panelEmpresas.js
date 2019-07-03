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
    $('#show-register3').hide();
  });

  $('#registro2').click(function () {
    $('#show-button').hide();
    $('#show-register2').show();
    $('#show-register3').hide();
  });
  $('#registro3').click(function () {
    $('#show-button').hide();
    $('#show-register2').hide();
    $('#show-register3').show();
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



});
function backbutton() {
  $('#show-register1').hide();
  $('#show-register2').hide();
  $('#show-button').show();
}
//*************************codigo vitico */

firebase.initializeApp(firebaseConfig);

function registroempleados() {
  $(document).ready(function () {
    $('#registrarEmpleados').click(function (e) {
      e.preventDefault();
      var datos = $('#RegistrarEmpleados').serializeArray();

      var nombre = datos[0].value;
      var apellido = datos[1].value;
      var fechaNacimiento = datos[2].value;
      var correo = datos[3].value;
      var cargo = datos[4].value;
      var Inactivo = datos[5].value;
      var planBeneficio = datos[6].value;
      var contraseña = datos[7].value;
      var sesionjson = sessionStorage.getItem("data");
      var json = JSON.parse(sesionjson);
      //console.log(json.uid);
      var sesion = JSON.parse(sessionStorage.getItem('data'));
      //var empresa = (sesion.uid);

      firebase.auth().createUserWithEmailAndPassword(correo, contraseña).then(function (resultado) {

        var uid = resultado.user.uid;
        firebase.database().ref('users/' + uid + "/").set({

          "nombre": nombre,
          "apellido": apellido,
          "fechaNacimiento": fechaNacimiento,
          "correo": correo,
          "cargo": cargo,
          "Inactivo": Inactivo,
          "planBeneficio": planBeneficio,
          "contraseña": contraseña,
          "empresa": json.uid,
          "uidempleado": uid,
          "cuentas": {
            "cuanta1": 0,
            "cuenta2": 0,
            "cuentaTotal": 0
          }

        }, function (error) {
          if (error) {
            alert('Hay un error en sus datos verifique e intentelo de nuevo...')
          } else {
            alert('Registro completado con exito!')
          }


        })

      });
    });
  });
} registroempleados();

function recuperarNOmbreEmpresa() {
  $(document).ready(function () {
    var sesionjson = sessionStorage.getItem("data");

    var sesion = JSON.parse(sesionjson);
    // console.log(sesion);

    var nombreEmpresa = sesion.empresa.nombreEmpresa;
    var rutaImagen = sesion.empresa.rutaImagen;
    var storageRef = firebase.storage().ref();
    var mountainsRef = storageRef.child("");
    mountainsRef.child(rutaImagen).getDownloadURL().then(function (url) {
      // console.log(url);
      $('#fotoEmpresa').append("'<img src='" + url + "'</span>'");
      $('#nombreEmpresa').append("<span>" + nombreEmpresa + "</span>");
    })
  });
} recuperarNOmbreEmpresa()

function CrearPlanes() {
  $(document).ready(function () {
    $('#registrarBeneficio').click(function (e) {
      e.preventDefault();
      var datos = $('#registroBeneficio').serializeArray();
      var nombrePlan = datos[0].value;
      var montoPlan = datos[1].value;
      var fechaPlan = datos[2].value;
      var sesionjson = sessionStorage.getItem("data");
      var sesion = JSON.parse(sesionjson);
      var uid = (sesion.uid);

      firebase.database().ref('Empresas/' + uid + '/planes/').push().update({
        "nombrePlan": nombrePlan,
        "montoPlan": montoPlan,
        "fechaPlan": fechaPlan

      }, function (error) {
        if (error) {
          alert('Hay un error en sus datos verifique e intentelo de nuevo...')
        } else {
          alert('Registro completado con exito!')
        }
      })
    });
  });
} CrearPlanes()

function empleadosRegistrados() {
  $('body').ready(function () {
    var sesion = JSON.parse(sessionStorage.getItem('data'));
    var uid = (sesion.uid);


    firebase.database().ref('/users/').orderByChild('empresa').equalTo(uid).once('value').then(function (snapshot) {
      //console.log(snapshot.val());
      snapshot.forEach(function (childSnapshot) {
        // var key = childSnapshot.key;        
        var childData = childSnapshot.val();
        //  console.log(childData);
        var Inactivo = childData.Inactivo;
        var apellido = childData.apellido;
        var cargo = childData.cargo;
        var correo = childData.correo;
        var empresa = childData.empresa;
        var fechaNacimiento = childData.fechaNacimiento;
        var nombre = childData.nombre;
        var planBeneficio = childData.planBeneficio;

        $('#tablaEmpleados').append("<tr><td>" + nombre + "</td><td>" + apellido + "</td><td>" + correo + "</td><td>" + Inactivo + "</td><td>" + planBeneficio + "</td><td>" + cargo + "</td></tr>");

      });
    });
  });
} empleadosRegistrados()

function beneficionRegistrados() {
  $('body').ready(function () {
    var sesion = JSON.parse(sessionStorage.getItem('data'));
    firebase.database().ref('/Empresas/' + sesion.uid + "/planes/").once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        var fechaPlan = childData.fechaPlan;
        var montoPlan = childData.montoPlan;
        var nombrePlan = childData.nombrePlan;
        var tarjeta = $("<div class='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3'>" +
          "<div class='box-card yellow'>" +
          "<div class='dropdown'>" +
          "<button class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton'" +
          "data-toggle='dropdown' aria-haspopup='false' aria-expanded='false'>" +
          "<i class='fas fa-ellipsis-v'></i>" +
          "</button>" +
          "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>" +
          "<a class='dropdown-item' href='#' data-toggle='modal'" +
          "data-target='#modal-editar-beneficio'>Editar</a>" +
          "<a class='dropdown-item' href='#' data-toggle='modal' data-target='#modal-eliminar'>Eliminar</a>" +
          "</div>" +
          "</div>" +
          "<div class='info-card'>" +
          "<h5 class='name'> " + nombrePlan + "</h5>" +
          "<p class='price'> € " + montoPlan + "</p>" +
          "<span class='date'>" + fechaPlan + "</span>" +
          "</div>" +
          "</div>" +
          "</div>");

        $('#tarjetaBeneficio').append(tarjeta);

      });
    });
  });
} beneficionRegistrados()

function configuracionEmpresa() {
  $(document).ready(function () {
    var sesionjson = sessionStorage.getItem("data");

    var sesion = JSON.parse(sesionjson);
    //console.log(sesion.empresa);
    var uid = sesion.uid;
    var NIF = sesion.empresa.NIF;
    var codigoPostal = sesion.empresa.codigoPostal;
    var correo = sesion.empresa.correo;
    var direccion = sesion.empresa.direccion;
    var nombreEmpresa = sesion.empresa.nombreEmpresa;
    var pais = sesion.empresa.pais;
    var poblacion = sesion.empresa.poblacion;
    var telefono = sesion.empresa.telefono;
    // var CedulaRepresentante = sesion.empresa.representante.CedulaRepresentante;
    var CorreoRepresentante = sesion.empresa.representante.CorreoRepresentante;
    var NombreRepresentante = sesion.empresa.representante.NombreRepresentante;
    var TelRepresentante = sesion.empresa.representante.TelRepresentante;
    $('#conNombreEmpresa').val(nombreEmpresa);
    $('#conpostal').val(codigoPostal);
    $('#conDireccion').val(direccion);
    $('#conTelefono').val(telefono);
    $('#conCorreo').val(correo);
    $('#conIdCompañia').val(NIF);
    $('#conpais').val(pais);
    $('#conpoblacion').val(poblacion);
    $('#conNombreRepresentante').val(NombreRepresentante);
    //$('#conCedulaRepresentante').val(CedulaRepresentante);
    $('#conTelRepresentante').val(TelRepresentante);
    $('#conCorreoRepresentante').val(CorreoRepresentante);
    $('#guardarEmpresa').click(function (e) {
      e.preventDefault();

      var datos = $('#editarEmpresa').serializeArray();

      //////////////////////imagen         
      var fotoval = document.getElementById('conLogoEmpresa');
      var foto = new FileReader();
      foto.onload = function (e) {
        var file = (e.target.result);
        var storageRef = firebase.storage().ref();
        var mountainsRef = storageRef.child('imagen/' + uid + fotoval.files[0].name);
        var imagen = file.substring(22);
        // console.log(imagen);

        mountainsRef.putString(imagen, 'base64').then(function (snapshot) {
          var rutaGuardaImagen = snapshot.metadata.fullPath;
          console.log(rutaGuardaImagen);

          //////////////prueba de imagen
          var conNombreEmpresa = datos[0].value;
          var conIdCompañia = datos[1].value;
          var conCorreo = datos[2].value;
          var conTelefono = datos[3].value;
          var conDireccion = datos[4].value;
          var conpostal = datos[5].value;
          var conpais = datos[6].value;
          var conpoblacion = datos[7].value;
          var conNombreRepresentante = datos[8].value;
          var conCedulaRepresentante = datos[9].value;
          var conTelRepresentante = datos[10].value;
          var conCorreoRepresentante = datos[11].value;
          var rutaGuardaImagen = rutaGuardaImagen;
          firebase.database().ref('Empresas/' + uid).update({
            "nombreEmpresa": conNombreEmpresa,
            "correo": conCorreo,
            "pais": conpais,
            "direccion": conDireccion,
            "poblacion": conpoblacion,
            "telefono": conTelefono,
            "codigoPostal": conpostal,
            "rutaImagen": rutaGuardaImagen,
            "representante": {
              "NombreRepresentante": conNombreRepresentante,
              "CedulaRepresentante": conCedulaRepresentante,
              "TelRepresentante": conTelRepresentante,
              "CorreoRepresentante": conCorreoRepresentante
            }

          }, function (error) {
            if (error) {
              alert('Hay un error en sus datos verifique e intentelo de nuevo...')
            } else {
              alert('Registro completado con exito!')
            }
          });
        });
      }
      foto.readAsDataURL(fotoval.files[0]);
    });
  });
} configuracionEmpresa()

function seleccionPlanEmpresa() {
  $(document).ready(function () {
    var data = sessionStorage.getItem('data');
    var sesion = JSON.parse(data);
    var uid = sesion.uid;
    // console.log(uid);
    ////filtrar .orderByChild('empresa').equalTo(uid).
    firebase.database().ref('Empresas/' + uid + "/planes").once('value').then(function (snapshot) {
      // console.log(snapshot.val());
      snapshot.forEach(function (planes) {
        var plan = planes.val();
        var montoPlan = plan.montoPlan;
        var nombrePlan = plan.nombrePlan;
        //     console.log(nombrePlan);
        $('#exampleFormControlSelect1').append("<option>" + nombrePlan + " " + "€  " + montoPlan + "</option>");
      });
    });
  });
} seleccionPlanEmpresa()

function consultaSaldoEmpresa() {
  $(document).ready(function () {
    var data = sessionStorage.getItem('data');
    var sesion = JSON.parse(data);
    firebase.database().ref('/Empresas/' + sesion.uid + "/cuentas").on('value', function (snapshot) {
      var snap = snapshot.val();
      var cuenta1 = snap.cuenta1;
      var cuenta2 = snap.cuenta2;
      var saldoEmpresa = parseFloat(cuenta1) + parseFloat(cuenta2);

      document.getElementById('saldoEmpresa').innerHTML = "€ " + saldoEmpresa;

    })
  });
} consultaSaldoEmpresa()

function RecargarSaldoEMpresa() {
  $(document).ready(function () {
    $('#recargarSaldoEmpresa').click(function (e) {
      e.preventDefault();
      var data = sessionStorage.getItem('data');
      var sesion = JSON.parse(data);
      var uid = sesion.uid;
      firebase.database().ref('/Empresas/' + uid + "/cuentas").once('value').then(function (snapshot) {
        var snap = snapshot.val();
        //console.log(snap.cuentaTotal);
        var saldoCuenta1 = snap.cuenta1;
        //  console.log(saldoCuenta1);


        var form = $('#recargaSaldoEmpresa').serializeArray();
        console.log(form);
        var tarjetaCredito = form[0].value;
        var nombreTitular = form[1].value;
        var NumeroTarjeta = form[2].value;
        var fechaExp = form[3].value;
        var codigoSeguridad = form[4].value;
        var montoRecargar = form[5].value;
        var sumaSaldo = parseFloat(montoRecargar) + parseFloat(saldoCuenta1);
        //  console.log(sumaSaldo);

        firebase.database().ref('Empresas/' + uid + "/cuentas").update({
          "cuenta1": sumaSaldo

        })
        firebase.database().ref('/Recargas/empresas').push().set({
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

function tablaReporteEmpresa() {
  $(document).ready(function () {
    var data = sessionStorage.getItem('data');
    var sesion = JSON.parse(data); var uid = sesion.uid;
    firebase.database().ref('/users/').orderByChild('empresa').equalTo(uid).once('value').then(function (snapshot) {
      console.log(snapshot.val());
      snapshot.forEach(function (param) {
        var datos = (param.val());
        var Nombre= datos.nombre;        
 //console.log(Nombre);
 
        var tabla = ("<div class='table-responsive'>" +
          "<table class='table'>" +
          "<thead class='thead-blue'>" +
          "<tr>" +
          "<th scope='col'>Nombre Completo</th>" +
          "<th scope='col'>Plato</th>" +
          "<th scope='col'>Fecha</th>" +
          "<th scope='col'>Tipo</th>" +
          "<th scope='col'>Beneficio</th>" +
          "<th scope='col'>Monto consumido</th>" +
          "</tr>" +
          "</thead>" +
          "<tbody id=''>" +
          "<tr>" +
          "<td>"+Nombre+"</td>" +
          "<td>Arepa con diablitos</td>" +
          "<td>22/07/2019</td>" +
          "<td>" +
          "<select name='' id='' class='form-control'>" +
          "<option value=''>Beneficio 1</option>" +
          "<option value=''>Beneficio 2</option>" +
          "</select>" +
          "</td>" +
          "<td>10 €</td>" +
          "<td>15 €</td>" +
          "</tr>" +
          "</th>" +
          "</tr>" +
          "</tfoot>" +
          "</table>" +
          "</div>")
        $('#tablaReporteEmpresa').append(tabla);
        console.log(Nombre);
      });
    });
  });
} tablaReporteEmpresa();