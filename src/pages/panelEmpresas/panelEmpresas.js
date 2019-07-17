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
function restartLoading() {
  $("#status").show();
  $("#preloader").show();
} restartLoading()

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

function registroempleados() {
  $(document).ready(function () {
    $('#registrarEmpleados').click(function (e) {    
        e.preventDefault();        
    
      var datos = $('#RegistrarEmpleados').serializeArray();
      var nombre = datos[0].value;  if(!nombre) { $('#pnombre').html('Campo Obligatorio'); }else{$('#pnombre').html('');}
      var apellido = datos[1].value; if(!apellido){ $('#papellido').html('Campo Obligatorio'); }else{$('#papellido').html('');}
      var fechaNacimiento = datos[2].value;  if(!fechaNacimiento){ $('#pfechaNacimiento').html('Campo Obligatorio'); }else{$('#pfechaNacimiento').html('');}
      var correo = datos[3].value; if(!correo){ $('#pcorreo').html('Campo Obligatorio'); }else{$('#pcorreo').html('');}
      var cargo = datos[4].value; if(!cargo){ $('#pcargo').html('Campo Obligatorio'); }else{$('#pcargo').html('');}
      var Inactivo = datos[5].value; if(!Inactivo){ $('#pInactivo').html('Campo Obligatorio'); }else{$('#pInactivo').html('');}
      var planBeneficio = datos[6].value; if(!'#pInactivo'){ $('#pplanBeneficio').html('Campo Obligatorio'); }else{$('#pplanBeneficio').html('');}
      var contraseña = datos[7].value; if(!contraseña){ $('#pcontraseña').html('Campo Obligatorio'); }else{$('#pcontraseña').html('');}

      var sesionjson = sessionStorage.getItem("data");
      var json = JSON.parse(sesionjson);
if(datos &&  nombre &&  apellido &&  fechaNacimiento &&  correo &&  cargo &&  Inactivo &&  planBeneficio &&  contraseña) {  
  restartLoading();
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
          //  $("#RegistrarEmpleados")[0].reset();
          }
        })
      });
    } else{swal("Error!", "Debe completar los campos Faltantes", "error");
  }
})
  
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
      var nombrePlan = datos[0].value; if(!nombrePlan) { $('#pnombrePlan').html('Campo Obligatorio'); }else{$('#pnombrePlan').html('');}
      var montoPlan = datos[1].value; if(!montoPlan) { $('#pmontoPlan').html('Campo Obligatorio'); }else{$('#pmontoPlan').html('');}
      var fechaPlan = datos[2].value; if(!fechaPlan) { $('#pFechaPlan').html('Campo Obligatorio'); }else{$('#pFechaPlan').html('');}
      var sesionjson = sessionStorage.getItem("data");
      var sesion = JSON.parse(sesionjson);
      var uid = (sesion.uid);

      if (nombrePlan &&  montoPlan && fechaPlan) {     
   restartLoading();
     firebase.database().ref('Empresas/' + uid + '/planes/').push().update({
        "nombrePlan": nombrePlan,
        "montoPlan": montoPlan,
        "fechaPlan": fechaPlan

      }, function (error) {
        if (error) {        
          hideLoading();
          swal("Algo paso!", "error!", "error")
        } else {
       hideLoading();
          swal("Registro Exitoso!", "Beneficio registrado!", "success")
          $("#registroBeneficio")[0].reset();
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
    firebase.database().ref('/users/').orderByChild('empresa').equalTo(uid).once('value').then(function (snapshot) {
      //console.log(snapshot.val());
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


        $('#tablaEmpleados').append("<tr><td>" + nombre + "</td><td>" + apellido + "</td><td>" + correo + "</td><td>" + Inactivo + "</td><td>" +
          planBeneficio +
          " <button class='cambiarPlan' id='cambiarPlan' type='submit' value='" + key + "'  >Cambiar</button> </td><td>" + cargo + "</td></tr>");
      });

      $('.cambiarPlan').click(function () {
        var usuario = $(this).val();
        // console.log(usuario);

        firebase.database().ref('users/').orderByKey().equalTo(usuario).once('value').then(function (snapshot) {
          //   console.log(snapshot.val());
          snapshot.forEach(function (data) {
            //  console.log(data.val());
            var nombre = data.val().nombre;
            var apellido = data.val().apellido;
            var nombreCOmpleto = nombre + "  " + apellido
            //.orderByKey().equalTo(usuario).///esto para filtrar
            firebase.database().ref('Empresas/' + uid + "/planes/").once('value').then(function (snapshot) {
              snapshot.forEach(function (data) {
                var nombrePlan = data.val().nombrePlan;
                var montoPlan = data.val().montoPlan;
                // console.log(montoPlan);
                var s = ("<option>" + nombrePlan + " " + "€  " + montoPlan + "</option>");
                console.log(s);


                $('#cambiarPlan2').append("<div class='modal fade show' id='modal-editar-beneficio' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-modal='true' style='padding-right: 17px; display: block;'>    <div class='modal-dialog modal-base modal-sm' role='document'>" +
                  "<div class='modal-content'>        <div class='modal-header'>          <h5 class='modal-title' id='exampleModalLabel'>Cambiar Plan</h5>" +
                  "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>            <span aria-hidden='true'>×</span>" +
                  "</button>        </div>        <div class='modal-body'>          <div class='row register-form'>            <div class='col-md-12 col-12'>" +
                  "<div class='form-group'>           <label  class='form-control' placeholder='Nombres' > " + nombreCOmpleto + "  </label>            </div>" +
                  "</div>            <div class='col-md-12 col-12'> <div class='form-group'> <select class='form-control' id='exampleFormControlSelect12' >" + s + " </select>" +
                  "</div>            </div>          </div>        </div>        <div class='modal-footer'>          <button type='button' class='btn edit' data-dismiss='modal'>salir</button>" +
                  "<button type='button' class='btn primary' data-dismiss='modal'>Editar</button>        </div>      </div>    </div>  </div>");

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
        var tarjetaCredito = form[0].value;  if(!tarjetaCredito) { $('#ptarjetaCredito').html('Campo Obligatorio'); }else{$('#ptarjetaCredito').html('');}
        var nombreTitular = form[1].value;  if(!nombreTitular) { $('#pnombreTitular').html('Campo Obligatorio'); }else{$('#pnombreTitular').html('');}
        var NumeroTarjeta = form[2].value;  if(!NumeroTarjeta) { $('#pNumeroTarjeta').html('Campo Obligatorio'); }else{$('#pNumeroTarjeta').html('');}
        var fechaExp = form[3].value;        if(!fechaExp) { $('#pfechaExp').html('Campo Obligatorio'); }else{$('#pfechaExp').html('');}
        var codigoSeguridad = form[4].value;  if(!codigoSeguridad) { $('#pcodigoSeguridad').html('Campo Obligatorio'); }else{$('#pcodigoSeguridad').html('');}
        var montoRecargar = form[5].value;    if(!montoRecargar) { $('#pmontoRecargar').html('Campo Obligatorio'); }else{$('#pmontoRecargar').html('');}
        var sumaSaldo = parseFloat(montoRecargar) + parseFloat(saldoCuenta1);
      //  alert(montoRecargar);
if(tarjetaCredito &&  nombreTitular &&  NumeroTarjeta &&  fechaExp &&  codigoSeguridad &&  montoRecargar &&  sumaSaldo){
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
    firebase.database().ref('/users/').orderByChild('empresa').equalTo(uid).once('value').then(function (snapshot) {
      // console.log(snapshot.val());
      snapshot.forEach(function (param) {
        var datos = (param.val());
        var Nombre = datos.nombre;
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
          "<td>" + Nombre + "</td>" +
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
        // console.log(Nombre);
      });
    });
  });
} tablaReporteEmpresa();

function recargarSaldoClientes() {
  $(document).ready(function () {
    $('.recargarSaldoCliente').on('click', function (e) {
      e.preventDefault();
      restartLoading();

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
            var cuenta1Empresa = empresa.cuentas.cuenta1;
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
                firebase.database().ref('users/' + uidEmpleado + "/cuentas/").update({
                  "cuanta1": parseFloat(saldos[1])
                });
                firebase.database().ref('Empresas/' + sesion.uid + "/cuentas/").update({
                  "cuenta1": saldoQuedaEmpresa,
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
              swal({
                title: "El saldo ya fue recargado",
                text: "El saldo ya fue recargado si el error pesiste llame al Soporte 0800",
                icon: "error",

              })
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
        var cuenta1 = empresa.cuentas.cuenta1;
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
              "cuenta1": sumaRegresarEmpresa
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
          console.log(snap);
          localStorage.setItem('tokenBlue', snap)
          messaging.onMessage(function (payload) {
        //    console.log('Message received. ', payload);

          });
        });

      } else {
        console.log('Unable to get permission to notify.');
      }
    });
    console.log('notificaciones');
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
}
hideLoading()