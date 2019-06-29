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
      var empresa = (sesion.uid);

      firebase.auth().createUserWithEmailAndPassword(correo, contraseña).then(function (resultado) {

        var uid = resultado.user.uid;
        firebase.database().ref('users/' + empresa + "/" + uid + "/").set({

          "nombre": nombre,
          "apellido": apellido,
          "fechaNacimiento": fechaNacimiento,
          "correo": correo,
          "cargo": cargo,
          "Inactivo": Inactivo,
          "planBeneficio": planBeneficio,
          "contraseña": contraseña,
          "empresa": json.uid,
          "uidempleado": uid

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

    var nombreEmpresa = sesion.empresa.nombreEmpresa;
    $('#nombreEmpresa').append("<span>" + nombreEmpresa + "</span>");
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

    firebase.database().ref('/users/' + uid).once('value').then(function (snapshot) {
      //var datosCantidad = snapshot.numChildren();

      snapshot.forEach(function (childSnapshot) {
        // var key = childSnapshot.key;        
        var childData = childSnapshot.val();
        // console.log(childData);
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
      var datos = $('#editarEmpresa').serializeArray();
      //  console.log(datos);
      var img = $('#conLogoEmpresa').val();


      //////////////////////////////////////////// prueba de imagen   
      
      function printFile(file) {
        var reader = new FileReader();
        reader.onload = function(evt) {
          console.log(evt.target.result);
        };
        reader.readAsText(file,'file');
      }printFile(img)

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

      firebase.database().ref('Empresas/' + uid).update({
        "nombreEmpresa": conNombreEmpresa,
        "correo": conCorreo,
        "pais": conpais,
        "direccion": conDireccion,
        "poblacion": conpoblacion,
        "telefono": conTelefono,
        "codigoPostal": conpostal,
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
  });
} configuracionEmpresa()


