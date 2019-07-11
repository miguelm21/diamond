import $ from 'jquery';
import jQuery from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/scss/main.scss';
import * as firebase from 'firebase';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import * as AOS from 'aos/dist/aos.js';
import swal from 'sweetalert';
import Chart from 'chart.js';
import { async } from 'q';
import { stringify } from 'querystring';

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

function registroEmpresa() {
  $(document).ready(function () {
  
    $('#registrarEmpresa').click(function (e) {
      e.preventDefault();
      var datos = $('#formRegistrar').serializeArray();
      var nombreEmpresa = datos[0].value;
      var correo = datos[1].value;
      var pais = datos[2].value;
      var direccion = datos[3].value;
      var poblacion = datos[4].value;
      var direccion = datos[5].value;
      var telefono = datos[6].value;
      var codigoPostal = datos[7].value;
      var NIF = datos[8].value;
      var contraseña = datos[9].value;

      firebase.auth().createUserWithEmailAndPassword(correo, contraseña).then(function (resultado) {

        var uid = resultado.user.uid;
        var res = firebase.database().ref('Empresas/' + uid).set({

          "nombreEmpresa": nombreEmpresa,
          "correo": correo,
          "pais": pais,
          "direccion": direccion,
          "poblacion": poblacion,
          "direccion": direccion,
          "telefono": telefono,
          "codigoPostal": codigoPostal,
          "NIF": NIF,
          "contraseña": contraseña,
          "uid": uid,
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
  })
} registroEmpresa();

function registroRestaurante() {
  $(document).ready(function () {
    $('#registrarRestaurante').click(function (e) {
      e.preventDefault();
      var datos = $('#regristroRestaurante').serializeArray();
      console.log(datos);

      var nombreRestaurante = datos[0].value;
      var NIF = datos[1].value;
      var idRestauran = datos[2].value;
      var correo = datos[3].value;
      var telefono = datos[4].value;
      var direccion = datos[5].value;
      var codigoPosta = datos[6].value;
      var pais = datos[7].value;
      var poblacion = datos[8].value;
      var contraseña = datos[9].value;
      var confirmarContraseña = datos[10].value;
      console.log(contraseña);
      console.log(datos[3].value);

      firebase.auth().createUserWithEmailAndPassword(correo, contraseña).then(function (resultado) {

        var uid = resultado.user.uid;

        //////////////////////////////////////////////////////
        var fotoval = document.getElementById('imagenRestaurante');
        var foto = new FileReader();
        foto.onload = function (e) {
          var file = (e.target.result);
          console.log(file);

          var storageRef = firebase.storage().ref();
          var mountainsRef = storageRef.child('imagen/restaurante/' + uid + fotoval.files[0].name);
          var imagen = file.substring(23);
          mountainsRef.putString(imagen, 'base64').then(function (snapshot) {
            var rutaGuardaImagen = snapshot.metadata.fullPath;
          
            /////////////////////////////////////////////////////

            firebase.database().ref('Restaurante/' + uid).set({

              "nombreRestaurante": nombreRestaurante,
              "NIF": NIF,
              "idRestauran": idRestauran,
              "correo": correo,
              "telefono": telefono,
              "direccion": direccion,
              "codigoPosta": codigoPosta,
              "pais": pais,
              "poblacion": poblacion,
              "contraseña": contraseña,
              "confirmarContraseña": confirmarContraseña,
              "rutaImagenRestaurante":rutaGuardaImagen,
              "cuentas": {
                "cuanta1": 0,
                "cuenta2": 0,
                "cuentaTotal": 0,    

              }


            }, function (error) {
              if (error) {
                alert('Hay un error en sus datos verifique e intentelo de nuevo...')
              } else {
                alert('Registro completado con exito!')
              }
            })
          })


        }, foto.readAsDataURL(fotoval.files[0]);
      })
    });
  })
} registroRestaurante();

function iniciarSesionEMpresa() {
  $(document).ready(function () {
    $('#iniciarSesionEmpresa').click(function (e) {
      e.preventDefault();
      var datos = $('#sesionEmpresa').serializeArray();
      var correo = datos[0].value;
      var contraseña = datos[1].value;

      firebase.auth().signInWithEmailAndPassword(correo, contraseña).then(function (data) {
        var uid = data.user.uid;
        var correo = data.user.email;

        /*recuperar datos de la empresa para el inicio de sesion */
        firebase.database().ref('Empresas/').orderByKey().equalTo(uid).once('value').then(function (snapshot) {
          //var datosEmpresa = snapshot.val();
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            //console.log(childData);
            var datas = {
              "uid": uid,
              "correo": correo,
              "empresa": childData,
            }
            sessionStorage.setItem("data", JSON.stringify(datas));
            var sesionjson = sessionStorage.getItem("data");
            var sesion = JSON.parse(sesionjson);
            if (sesion === '' | sesion === 'null') {
              alert('no ha iniciado sesion')
            } else {
             // alert("has iniciado sesion");
              swal("Bienvenido!", correo, "success").then((value) => {
                location.href = "panelEmpresas.html"
              });
              // console.log(sesion);
             //setTimeout( ,6000)
            }

          });



        })

      }).catch(function (error) {
      //  console.log(  error.message);
        swal("Oh no!", error.message, "error");});

    });


  });

} iniciarSesionEMpresa()

function iniciarSesionRestaurante() {
  $(document).ready(function () {
    $('#iniciarSesionRestaurante').click(function (e) {
    
      e.preventDefault();
      var datos = $('#sesionRestaurante').serializeArray();
      var correo = datos[0].value;
      var contraseña = datos[1].value;
     // console.log(datos);

      firebase.auth().signInWithEmailAndPassword(correo, contraseña).then(function (data) {
        var uid = data.user.uid;
        var correo = data.user.email;
       // console.log(uid);

        /*recuperar datos de la empresa para el inicio de sesion */
        firebase.database().ref('Restaurante/').orderByKey().equalTo(uid).once('value').then(function (snapshot) {
          //var datosEmpresa = snapshot.val();
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
           // console.log(childData);
            var datas = {
              "uid": uid,
              "correo": correo,
              "restaurante": childData,
            }
            sessionStorage.setItem("data", JSON.stringify(datas));
            var sesionjson = sessionStorage.getItem("data");
            var sesion = JSON.parse(sesionjson);
           // console.log(sesion);

            if (sesion === '' | sesion === 'null') {
              alert('no ha iniciado sesion')
            } else {
              swal("Bienvenido!", correo, "success").then((value) => {
                location.href = "panelRestaurante.html"
              });
              }

          });



        }) /* .catch(function(error) {
        
         var errorCode = error.code;
         var errorMessage = error.message;
         console.log(errorCode,errorMessage)
       });*/

      }).catch(function (error) {
     //  console.log(  error.message);
        swal("Oh no!", error.message, "error");})

    });


  });

} iniciarSesionRestaurante()

function iniciarSesioncliente() {
  $(document).ready(function () {
    $('#iniciarcliente').click(function (e) {
      e.preventDefault();
      var datos = $('#sesionCliente').serializeArray();
      var correo = datos[0].value;
      var contraseña = datos[1].value;
     // console.log(datos);

      firebase.auth().signInWithEmailAndPassword(correo, contraseña).then(function (data) {
        var uid = data.user.uid;
        var correo = data.user.email;
       // console.log(uid);

        /*recuperar datos de la empresa para el inicio de sesion */
        firebase.database().ref('users/').orderByKey().equalTo(uid).once('value').then(function (snapshot) {
          //var datosEmpresa = snapshot.val();
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            console.log(childData);
            var datas = {
              "uid": uid,
              "correo": correo,
              "users": childData,
            }
            sessionStorage.setItem("data", JSON.stringify(datas));
            var sesionjson = sessionStorage.getItem("data");
            var sesion = JSON.parse(sesionjson);
          //  console.log(sesion);

            if (sesion === '' | sesion === 'null') {
              alert('no ha iniciado sesion')
            } else {
              swal("Bienvenido!", correo, "success").then((value) => {
                location.href = "panelClientes.html"})
              //location.href = "panelClientes.html"
            }

          });



        })  .catch(function(error) {
        
         var errorCode = error.code;
         var errorMessage = error.message;
         swal("ups!!", error.message, "error").then((value) => {
          location.href = "panelClientes.html"})
       });

      }).catch(function (error) {
       // console.log(  error.message);
        swal("Oh no!", error.message, "error");
        
      
       });

    });


  });

} iniciarSesioncliente()

