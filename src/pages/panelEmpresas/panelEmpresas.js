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
    var uid = sesion.uid;
    var nombreEmpresa = sesion.empresa[uid].nombreEmpresa;
    $('#nombreEmpresa').append("<h3>" + nombreEmpresa + "</h3>");
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
        var contraseña = childData.contraseña;
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
    var uid = (sesion.uid);

    firebase.database().ref('/Empresas/' + uid + "/planes/").once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
       
        var childData = childSnapshot.val();
        var fechaPlan = childData.fechaPlan;
        var montoPlan = childData.montoPlan;
        var nombrePlan = childData.nombrePlan;
        //console.log(nombrePlan);
        $('#tarjetaBeneficio').append("<div>mordisco</div>");
        
      });
     
    });
   
  });
  
} beneficionRegistrados()