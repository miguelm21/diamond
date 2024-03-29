import $ from 'jquery';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/scss/main.scss';
import * as firebase from 'firebase';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import * as AOS from 'aos/dist/aos.js';
import swal from 'sweetalert';


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

    $('#show-register2').hide();
    $('#show-register3').hide();
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

  $('#home-fix').click(function () {
    $('#show-button').show();
    $('#show-register1').hide();
    $('#show-register2').hide();
    $('#show-register3').hide();
  });


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
    $('#reportes').hide();
    $('#configuracion').hide();

    $('#registro-platos').show();
  });
  $('#add-chef').click(function () {
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion2').hide();
    $('#registro-platos').hide();
    $('#register-promocion').hide();
    $('#reportes').hide();
    $('#configuracion').hide();

    $('#register-chef').show();
  });
  $('#add-promocion').click(function () {
    $('#chef2').hide();
    $('#platos2').hide();
    $('#promocion2').hide();
    $('#registro-platos').hide();
    $('#reportes').hide();
    $('#configuracion').hide();
    $('#register-chef').hide();
    $('#register-promocion').show();
  });

  $('#activepanel1').click(function () {
    $('#activepanel2').removeClass('active');
    $('#activepanel3').removeClass('active');
    $(this).addClass('active');

    $('#promocion2').hide();
    $('#reportes').hide();
    $('#configuracion').hide();

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
    $('#reportes').hide();
    $('#configuracion').hide();

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
    $('#reportes').hide();
    $('#configuracion').hide();

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
function restartLoading() {
  $("#status").show();
  $("#preloader").show();
}

function hideLoading() {
  $("#status").fadeOut();
  $("#preloader").delay(1000).fadeOut("slow");
  $('.modal-backdrop').remove();
}
function enviarCorreo(correoEmpleado, nombreEmpleado) {
  $(document).ready(function () {
    emailjs.send('bluediamont', 'template_K6VOnQ26', { 'from_name': correoEmpleado, 'to_name': nombreEmpleado })
  });
}

firebase.initializeApp(firebaseConfig);

/*
function registroempleados() {
  $(document).ready(function () {
    $('#registrarEmpleados').click(function (e) {
      e.preventDefault();

      var datos = $('#RegistrarEmpleados').serializeArray();
      var nombre = datos[0].value; if (!nombre) { $('#pnombre').html('Campo Obligatorio'); } else { $('#pnombre').html(''); }
      var apellido = datos[1].value; if (!apellido) { $('#papellido').html('Campo Obligatorio'); } else { $('#papellido').html(''); }
      var fechaNacimiento = datos[2].value; if (!fechaNacimiento) { $('#pfechaNacimiento').html('Campo Obligatorio'); } else { $('#pfechaNacimiento').html(''); }
      var correo = datos[3].value; if (!correo) { $('#pcorreo').html('Campo Obligatorio'); } else { $('#pcorreo').html(''); }
      var cargo = datos[4].value; if (!cargo) { $('#pcargo').html('Campo Obligatorio'); } else { $('#pcargo').html(''); }
      var Inactivo = datos[5].value; if (!Inactivo) { $('#pInactivo').html('Campo Obligatorio'); } else { $('#pInactivo').html(''); }
      var planBeneficio = datos[6].value; if (!'#pInactivo') { $('#pplanBeneficio').html('Campo Obligatorio'); } else { $('#pplanBeneficio').html(''); }
      var contraseña = datos[7].value; if (!contraseña) { $('#pcontraseña').html('Campo Obligatorio'); } else { $('#pcontraseña').html(''); }

      var sesionjson = sessionStorage.getItem("data");
      var json = JSON.parse(sesionjson);
      if (datos && nombre && apellido && fechaNacimiento && correo && cargo && Inactivo && planBeneficio && contraseña) {

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
              hideLoading();
              swal("algo paso!", "error!", "error")
            } else {
              hideLoading();
              enviarCorreo(correo, nombre);
              swal("Registro Exitoso!", "Empleado registrado!", "success");
              $("#RegistrarEmpleados")[0].reset();
            }
          })
        }, function (error) {
          hideLoading(); swal("Error", error.message, "error")
        });
      } else {
        hideLoading();
        swal("Error!", "Debe completar los campos Faltantes", "error");
      }
    })

  });
} registroempleados();*/

function recuperarNOmbreEmpresa() {
  $(document).ready(function () {
    var sesionjson = sessionStorage.getItem("data");

    var sesion = JSON.parse(sesionjson);
    //console.log(sesion);

    var nombreEmpresa = sesion.empresa.nombreEmpresa;
    var rutaImagen = sesion.empresa.rutaImagen;
    var storageRef = firebase.storage().ref();
    var mountainsRef = storageRef.child("");

    if (!rutaImagen) {
      $('#fotoEmpresa').append("<img src='https://firebasestorage.googleapis.com/v0/b/bluediamont-75e04.appspot.com/o/imagen%2Fempresas.png?alt=media&token=b66894a9-8a79-46f1-9660-227e7591e3e7'></span>");

    } else { $('#fotoEmpresa').append("<img src=" + rutaImagen + "</span>"); }
    // mountainsRef.child(rutaImagen).getDownloadURL().then(function (url) {
    // console.log(nombreEmpresa);
    //  $('#fotoEmpresa').append("<img src=" + rutaImagen + "</span>");
    $('#nombreEmpresa').append("<span>" + nombreEmpresa + "</span>");

    //})
  });
} recuperarNOmbreEmpresa()

function CrearPlanes() {
  $(document).ready(function () {
    $('#registrarBeneficio').click(function (e) {
      e.preventDefault();

      var datos = $('#registroBeneficio').serializeArray();
      var nombrePlan = datos[0].value; if (!nombrePlan) { $('#pnombrePlan').html('Campo Obligatorio'); } else { $('#pnombrePlan').html(''); }
      var montoPlan = datos[1].value; if (!montoPlan) { $('#pmontoPlan').html('Campo Obligatorio'); } else { $('#pmontoPlan').html(''); }
      // var fechaPlan = datos[2].value; if (!fechaPlan) { $('#pFechaPlan').html('Campo Obligatorio'); } else { $('#pFechaPlan').html(''); }
      var sesionjson = sessionStorage.getItem("data");
      var sesion = JSON.parse(sesionjson);
      var uid = (sesion.uid);

      if (nombrePlan && montoPlan /*&& fechaPlan*/) {

        firebase.database().ref('Empresas/' + uid + '/planes/').push().update({
          "nombrePlan": nombrePlan,
          "montoPlan": montoPlan,
          //  "fechaPlan": fechaPlan

        }, function (error) {
          if (error) {
            hideLoading();
            swal("Algo paso!", "error!", "error")
          } else {
            hideLoading();
            $(".registroBeneficio")[0].reset();
            swal("Registro Exitoso!", "Beneficio registrado!", "success");


          }
        })
      }
    });

  });
} CrearPlanes()

function empleadosRegistrados() {
  $('body').ready(function () {
    var sesion = JSON.parse(sessionStorage.getItem('data'));
    var uid = (sesion.uid);
    firebase.database().ref('/users/').orderByChild('empresa').equalTo(uid).on('value', function (snapshot) {
      //console.log(snapshot.val());
      var tablita;
      snapshot.forEach(function (childSnapshot) {
        // var key = childSnapshot.key();       
        var childData = childSnapshot.val();
        var key = childSnapshot.key;

        var Inactivo = childData.Inactivo;
        var apellido = childData.apellido;
        var cargo = childData.cargo;
        var correo = childData.correo;
        var empresa = childData.empresa;
        var fechaNacimiento = childData.fechaNacimiento;
        var nombre = childData.nombre;
        var planBeneficio = childData.planBeneficio;

        tablita = tablita + "<tr><td>" + nombre + "</td><td>" + apellido + "</td><td>" + correo + "</td><td>" + Inactivo + "</td><td>" +
          planBeneficio +
          " <button class='cambiarPlan btn btn-change' id='cambiarPlan' type='submit' value='" + key + "'  ><i class='fas fa-exchange-alt'></i></button> </td><td>" + cargo + "</td></tr>"

        $('#tablaEmpleados').html(tablita);
      });

      $('.cambiarPlan').click(function () {
        var usuario = $(this).val();


        firebase.database().ref('users/').orderByKey().equalTo(usuario).on('value', function (snapshot) {
          //   console.log(snapshot.val());
          var s = ''
          snapshot.forEach(function (data) {
            //  console.log(data.val());
            var nombre = data.val().nombre;
            var apellido = data.val().apellido;
            var nombreCOmpleto = nombre + "  " + apellido
            //.orderByKey().equalTo(usuario).///esto para filtrar
            firebase.database().ref('Empresas/' + uid + "/planes/").on('value', function (snapshot) {
              snapshot.forEach(function (data) {
                var nombrePlan = data.val().nombrePlan;
                var montoPlan = data.val().montoPlan;



                s = s + ("   <option value='" + nombrePlan + " " + "€  " + montoPlan + "'>" + nombrePlan + " " + "€  " + montoPlan + "</option>");
                //console.log(s);

                $('#cambiarPlan2').html("<div class='modal fade show' id='modal-editar-beneficio' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-modal='true' style='padding-right: 17px; display: block;'>    <div class='modal-dialog modal-base modal-sm' role='document'>" +
                  "<div class='modal-content'>        <div class='modal-header'>          <h5 class='modal-title' id='exampleModalLabel'>Cambiar Plan</h5>" +

                  "</button>        </div>        <div class='modal-body'>          <div class='row register-form'>            <div class='col-md-12 col-12'>" +
                  "<div class='form-group'>           <label  class='form-control' placeholder='Nombres' > " + nombreCOmpleto + "  </label>            </div>" +
                  "</div>            <div class='col-md-12 col-12'> <div class='form-group'> <select class='form-control exampleFormControlSelect12' id='exampleFormControlSelect12' > <option value='0' selected disable>Seleccionar Plan</option>    " + s + " </select>" +
                  "</div>            </div>          </div>        </div>        <div class='modal-footer'>          <button type='button' id='cerrarEsto' class='btn edit cerrarEsto' data-dismiss='modal'>salir</button>" +
                  "<button id='" + usuario + "' type='button' class='btn primary cambiarPlanEmpleado' data-dismiss='modal'>Editar</button>        </div>      </div>    </div>  </div>");


              });

            })
          });
        });
      });
    });

  });
} empleadosRegistrados()

function beneficionRegistrados() {
  $('body').ready(function () {
    var sesion = JSON.parse(sessionStorage.getItem('data'));
    firebase.database().ref('/Empresas/' + sesion.uid + "/planes/").on('value', function (snapshot) {
      var beneficio1 = '';
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        // var fechaPlan = childData.fechaPlan;

        var montoPlan = childData.montoPlan;
        var nombrePlan = childData.nombrePlan;
        var tarjeta = ("<div class='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3'>" +
          "<div class='box-card yellow'>" +
          "<!--<div class='dropdown'>" +
          "<button class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton'" +
          "data-toggle='dropdown' aria-haspopup='false' aria-expanded='false'>" +
          "<i class='fas fa-ellipsis-v'></i>" +
          "</button>" +
          "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>" +
          "<a class='dropdown-item' href='#' data-toggle='modal'" +
          "data-target='#modal-editar-beneficio'>Editar</a>" +
          "<a class='dropdown-item' href='#' data-toggle='modal' data-target='#modal-eliminar'>Eliminar</a>" +
          "</div>" +
          "</div>-->" +
          "<div class='info-card'>" +
          "<h5 class='name'> " + nombrePlan + "</h5>" +
          "<p class='price'> € " + montoPlan + "</p>" +
          // "<span class='date'>" + fechaPlan + "</span>" +
          "</div>" +
          "</div>" +
          "</div>");


        beneficio1 = tarjeta + beneficio1;

        $('#tarjetaBeneficio').html(beneficio1);

      });
    });
  });
} beneficionRegistrados()

function configuracionEmpresa() {
  $(document).ready(function () {
    var sesionjson = sessionStorage.getItem("data");
    var sesion = JSON.parse(sesionjson);
    var uid = sesion.uid;
    var NIF = sesion.empresa.NIF;
    var codigoPostal = sesion.empresa.codigoPostal;
    var correo = sesion.empresa.correo;
    var direccion = sesion.empresa.direccion;
    var nombreEmpresa = sesion.empresa.nombreEmpresa;
    var pais = sesion.empresa.pais;
    var poblacion = sesion.empresa.poblacion;
    var telefono = sesion.empresa.telefono;
    var CedulaRepresentante = sesion.empresa.representante.CedulaRepresentante;
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
    $('#conCedulaRepresentante').val(CedulaRepresentante);
    $('#conTelRepresentante').val(TelRepresentante);
    $('#conCorreoRepresentante').val(CorreoRepresentante);

    $('#guardarEmpresa').click(function (e) {
      e.preventDefault();

      //////////////////////imagen         
      var fotoval = document.getElementById('conLogoEmpresa');
      //console.log(fotoval.files[0]);      
      var foto = new FileReader();
      foto.onload = function (e) {
        var file = (e.target.result);

        var storageRef = firebase.storage().ref();
        var mountainsRef = storageRef.child('imagen/' + uid + fotoval.files[0].name);
        var imagen = file.substring(23);

        mountainsRef.putString(imagen, 'base64').then(function (snapshot) {
          var rutaGuardaImagen = snapshot.metadata.fullPath;

          var storageRef = firebase.storage().ref();
          var mountainsRef = storageRef.child("");
          mountainsRef.child(rutaGuardaImagen).getDownloadURL().then(function (url) {
            //////////////prueba de imagen
            var datos = $('#editarEmpresa').serializeArray();
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
            var rutaGuardaImagen = url;
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
                hideLoading();
                swal("Error", error.message, "error")
              } else {
                hideLoading();
                swal("Modificado con exito", " has modificado esta empresa", "success")
              }
            });
          }, function (error) { hideLoading(); alert(error) });
        }, function (params) {
          alert(error.message)

        })
      }, foto.readAsDataURL(fotoval.files[0]);
    });
  });
} configuracionEmpresa()

// check image button

/*$(document.body).on ('change','#conLogoEmpresa',function name(params) {
  $('#validate-image4').addClass('d-block');
  $('#text-file4').html('Imagen agregada con exito');
})*/

function seleccionPlanEmpresa() {
  $(document).ready(function () {
    var data = sessionStorage.getItem('data');
    var sesion = JSON.parse(data);
    var uid = sesion.uid;
    // console.log(uid);
    ////filtrar .orderByChild('empresa').equalTo(uid).
    firebase.database().ref('Empresas/' + uid + "/planes").on('value',function (snapshot) {
      // console.log(snapshot.val());
      var plann ='';
      snapshot.forEach(function (planes) {
        var plan = planes.val();
        var montoPlan = plan.montoPlan;
        var nombrePlan = plan.nombrePlan;
        plann = plann +"<option>" + nombrePlan + " " + "€  " + montoPlan + "</option>";
        $('#exampleFormControlSelect1').html(plann);
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
      var cuenta1 = snap.cuanta1;
      var cuenta2 = snap.cuenta2;
      var saldoEmpresa = parseFloat(cuenta1) + parseFloat(cuenta2);
      var saldoEmpresaFormato = saldoEmpresa.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
      document.getElementById('saldoEmpresa').innerHTML = saldoEmpresaFormato;

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
        var saldoCuenta1 = snap.cuanta1;
        // alert(saldoCuenta1);
        var form = $('#recargaSaldoEmpresa').serializeArray();
        //console.log(form);
        var tarjetaCredito = form[0].value; if (!tarjetaCredito) { $('#ptarjetaCredito').html('Campo Obligatorio'); } else { $('#ptarjetaCredito').html(''); }
        var nombreTitular = form[1].value; if (!nombreTitular) { $('#pnombreTitular').html('Campo Obligatorio'); } else { $('#pnombreTitular').html(''); }
        var NumeroTarjeta = form[2].value; if (!NumeroTarjeta) { $('#pNumeroTarjeta').html('Campo Obligatorio'); } else { $('#pNumeroTarjeta').html(''); }
        var fechaExp = form[3].value; if (!fechaExp) { $('#pfechaExp').html('Campo Obligatorio'); } else { $('#pfechaExp').html(''); }
        var codigoSeguridad = form[4].value; if (!codigoSeguridad) { $('#pcodigoSeguridad').html('Campo Obligatorio'); } else { $('#pcodigoSeguridad').html(''); }
        var montoRecargar = form[5].value; if (!montoRecargar) { $('#pmontoRecargar').html('Campo Obligatorio'); } else { $('#pmontoRecargar').html(''); }
        var sumaSaldo = parseFloat(montoRecargar) + parseFloat(saldoCuenta1);
        //  alert(montoRecargar);
        if (tarjetaCredito && nombreTitular && NumeroTarjeta && fechaExp && codigoSeguridad && montoRecargar && sumaSaldo) {

          firebase.database().ref('Empresas/' + uid + "/cuentas").update({
            "cuanta1": sumaSaldo

          }, function (error) {
            if (error) {
              alert('Hay un error en sus datos verifique e intentelo de nuevo...')
            } else {
              hideLoading()
              swal("Recarga!", "Recarga exitosa!", "success")
            }
          });

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
              hideLoading()
              swal("Recarga!", "Recarga exitosa!", "success")
              $("#recargaSaldoEmpresa ")[0].reset();
            }
          });
        }
      });
    })
  })

} RecargarSaldoEMpresa()

function tablaReporteEmpresa() {////usar cuando ya se generen las compras
  $(document).ready(function () {
    var data = sessionStorage.getItem('data');
    var sesion = JSON.parse(data); var uid = sesion.uid;
    firebase.database().ref('transaccion/').once('value').then(function (snapshot) {

      snapshot.forEach(function (param) {
        var datos = (param.val());

        var nombreCliente = datos.usuario.users.nombre;
        var precioPlato = datos.plato.PrecioPlato;
        var nombrePlato = datos.plato.nombrePlato;
        var planBeneficio = datos.usuario.users.planBeneficio;
        var fecha = darFecha(datos.fecha);


        var tabla = ("<div class='table-responsive'>" +
          "<table class='table'>" +
          "<thead class='thead-blue'>" +
          "<tr>" +
          "<th scope='col'>Nombre Completo</th>" +
          "<th scope='col'>Plato</th>" +
          "<th scope='col'>Fecha</th>" +

          "<th scope='col'>Beneficio</th>" +
          "<th scope='col'>Monto consumido</th>" +
          "</tr>" +
          "</thead>" +
          "<tbody id=''>" +
          "<tr>" +
          "<td>" + nombreCliente + "</td>" +
          "<td>" + nombrePlato + "</td>" +
          "<td>" + fecha + "</td>" +
          "<td>" + planBeneficio + "</td>" +
          "<td>" + precioPlato + "</td>" +
          "</tr>" +
          "</th>" +
          "</tr>" +
          "</tfoot>" +
          "</table>" +
          "</div>")
        $('#tablaReporteEmpresa').append(tabla);
        // console.log(Nombre);
      });
    });
  });
} tablaReporteEmpresa();

function recargarSaldoClientes() {
  $(document).ready(function () {
    $('.recargarSaldoCliente').on('click', function (e) {
      e.preventDefault();


      var data = sessionStorage.getItem('data');
      var sesion = JSON.parse(data);
      firebase.database().ref('users/').orderByChild('empresa').equalTo(sesion.uid).once('value').then(function (snapshot) {
        var t = 0;
        snapshot.forEach(element => {
          var datos = element.val();
          var saldoCliente = (datos.cuentas.cuanta1);
          var uidEmpleado = datos.uidempleado;
          var montoCargarEmpleado = datos.planBeneficio;
          var saldos = montoCargarEmpleado.split('€');
          t = t + parseFloat(saldos[1].trim());
          // console.log(t);
          firebase.database().ref('/Empresas/' + sesion.uid + "/").once('value').then(function (snapshot) {

            var empresa = (snapshot.val());
            var cuenta1Empresa = empresa.cuentas.cuanta1;
            var cuenta2Empresa = empresa.cuentas.cuenta2;
            var saldototalEmpresa = parseFloat(cuenta1Empresa) + cuenta2Empresa
            var saldoQuedaEmpresa = cuenta1Empresa - t;

            if (saldoCliente <= 0) {

              if (saldototalEmpresa < t) {
                hideLoading();
                swal({
                  title: "Sin Saldo!",
                  text: "Deber Ir a recargar tu saldo",
                  icon: "warning",
                  dangerMode: true,
                })
              } else {
                enviarNotificacion(empresa.tokenBLue)
                firebase.database().ref('users/' + uidEmpleado + "/cuentas/").update({
                  "cuanta1": parseFloat(saldos[1])
                });
                firebase.database().ref('Empresas/' + sesion.uid + "/cuentas/").update({
                  "cuanta1": saldoQuedaEmpresa,
                });
                var ko = enviarNotificacion(datos.tokenBLue);
                console.log('saliooooooooooooooo');
                console.log(ko);


                hideLoading();
                swal({
                  title: "Saldo Recargado",
                  text: "Sus usuarios ya tien el saldo disponible",
                  icon: "success",

                })
              }
            } else {
              hideLoading();
              swal("Error",
                "No se puede recargar dos veces el saldo, en este momento el cliente ya tiene saldo activo",
                "error",

              )
            }
          })
        });
      })
    });
  });
} recargarSaldoClientes()

function recuperarSaldodeClientes() {
  $(document).ready(function () {
    $('.quitarSaldo').click(function (e) {
      e.preventDefault();

      var data = sessionStorage.getItem('data');
      var sesion = JSON.parse(data);
      firebase.database().ref('Empresas/' + sesion.uid + "/").once('value').then(function (snapshot) {
        var empresa = snapshot.val();
        var cuenta1 = empresa.cuentas.cuanta1;
        //    console.log(cuenta1);

        firebase.database().ref('users/').orderByChild('empresa').equalTo(sesion.uid).once('value').then(function (snapshot) {
          var suma = 0;
          snapshot.forEach(element => {
            var datos = element.val();
            var uidEmpleado = datos.uidempleado;
            var cuentasUsuario = datos.cuentas.cuanta1;
            suma = suma + cuentasUsuario;
            var sumaRegresarEmpresa = suma + cuenta1;
            console.log(sumaRegresarEmpresa);


            firebase.database().ref('Empresas/' + sesion.uid + "/cuentas/").update({
              "cuanta1": sumaRegresarEmpresa
            });
            firebase.database().ref('users/' + uidEmpleado + "/cuentas/").update({
              "cuanta1": 0
            });
            swal({
              title: "Saldo no utilizado Recuperado",
              text: "Sus empleados no cuentan con saldo.",
              icon: "success",

            })
          });
        })
      })
    });
  });
} recuperarSaldodeClientes()

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
        // console.log('Notification permission granted.');
        //console.log("kkk");

        messaging.getToken().then(function (snap) {
          //  console.log(snap);
          localStorage.setItem('tokenBlue', snap)
          messaging.onMessage(function (payload) {
            //    console.log('Message received. ', payload);

          });
        });

      } else {
        // console.log('Unable to get permission to notify.');
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
        return (response);
      },
    });
  });
} hideLoading()

function generarContraseña() {

  $('#generarContraseña').on('click', function () {
    var i;
    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
    var contraseña = "";
    for (i = 0; i < 8; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    $('.contraseñaEmpleado').val(contraseña);

  });
} generarContraseña()

function cambiarPlanEmpleado() {

  $(document).ready(function () {
    var plan = NaN;
    $(document.body).on('change', '.exampleFormControlSelect12', function (e) {

      plan = (e.currentTarget.value);
      if (!plan) { swal("Campo Vacio", "Debe seleccionar el nuevo plan", "error") };
    });
    $(document.body).on('click', '.cambiarPlanEmpleado', function (e) {
      var usuarioUid = (e.currentTarget.id);

      if (plan) {


        firebase.database().ref('users/' + usuarioUid).update({
          "planBeneficio": plan
        })

        swal("Modificar Plan", "El Plan a sido modificado", "success");

        $('#cambiarPlan2').html('');
      }
    })

  });
} cambiarPlanEmpleado()

function ojitosSesionRestaurante() {
  $(document).ready(function () {
    $('#show_password3').on('mouseover', function () {
      $('#password3').get(0).type = 'text';
      $('#show_password3').on('mouseout', function () {
        $('#password3').get(0).type = 'password';
      });
    });
  })
} ojitosSesionRestaurante()

function cerrarModalFeo() {
  $(document.body).on('click', '.cerrarEsto', function () {
    $('#cambiarPlan2').html('');
  });
} cerrarModalFeo()

function tranferenciaBancaria() {
  $(document).ready(function () {
    $(document.body).on('click', '#tranfereciaActiva', function () {
      var sesion = sessionStorage.getItem('data');
      var sesionjson = JSON.parse(sesion);
      var datitos = $('#transferenciBanco').serializeArray();
      var nombreBanco = datitos[0].value
      var NumeroTranferecia = datitos[1].value
      var Numeromonto = datitos[2].value
      if (!nombreBanco) {
        swal("error", "campo Nombre Banco vacio", "error")
      } else if (!NumeroTranferecia) {
        swal("error", "campo Nmero Transferencia vacio", "error")
      } else if (!Numeromonto) {
        swal("error", "campo monto vacio", "error")
      } else {
        firebase.database().ref('/Empresas/' + sesionjson.uid + '/cuentas/').once('value').then(function (snapshot) {

          var saldoActual = parseFloat(Numeromonto) + parseFloat(snapshot.val().cuanta1)

          console.log(saldoActual);

          firebase.database().ref('/Empresas/' + sesionjson.uid + '/cuentas/').update({
            "cuanta1": saldoActual
          })

          firebase.database().ref('Tranferencias/empresa/' + sesionjson.uid + "/").push({
            "monto": Numeromonto,
            "nombreEmpresa": sesionjson.empresa.nombreEmpresa,
            "fecha": firebase.database.ServerValue.TIMESTAMP,
            "uidEmpresa": sesionjson.uid,

          })
          swal("Recarga exitosa", "La transferencia fue realizada con con Exito y abonada, si presenta al gun problema con ella sera notificadopor nuestro departamento de administracion", "success")
        })
      }
    });
  });
} tranferenciaBancaria();
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

function buscarEmpleados() {
  $(document).ready(function () {
    $('#buscarUsuario').click(function (e) {
      var buscar = document.getElementById('buscarCorreo').value;
      if (!buscar) {
        swal("Campo Vacio")
      } else {

        firebase.database().ref("/users/").orderByChild('correo').equalTo(buscar).once('value').then(e => {
          e.forEach(element => {
            console.log(element.val());
            
            $('#nombre').val(element.val().nombre);
            $('#apellido').val(element.val().apellido);
            $('#correo').val(element.val().correo);
            $('#fechaNacimiento').val(element.val().fechaNacimiento);
            $('#registrarEmpleados').val(element.val().uidempleado);
            document.getElementById('registrarEmpleados').disabled=false;
          });
        });
      }
    });
  });
} buscarEmpleados()

function afiliarEmpleados() {
  $(document).ready(function () {
var datos = sessionStorage.getItem('data');
var sesion= JSON.parse(datos);
    $('#registrarEmpleados').click(function (e) { 
    var cargo=  document.getElementById('cargo').value; 
    var plan= document.getElementById('exampleFormControlSelect1').value;
    var uidEmpleado= document.getElementById('registrarEmpleados').value;
    //console.log(uidEmpleado);
if (cargo && plan && uidEmpleado) {  

    firebase.database().ref("users/"+uidEmpleado+"/").update({
        "cargo":cargo,
        "planBeneficio":plan,    
        "empresa":    sesion.uid,
      });      
      swal( "Empleado agregado con exito");
      $('#nombre').val('');
            $('#apellido').val('');
            $('#correo').val('');
            $('#fechaNacimiento').val('');
            $('#registrarEmpleados').val('');
            $('#cargo').val('');
            $('#buscarCorreo').val('');
    }else {swal("existen campos vacios")}
    });
  });
}afiliarEmpleados()