import $ from 'jquery';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/scss/main.scss';
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
  $('#show-registro-cliente').click(function () {
    $('#register-login').hide();
    $('#registro-cliente').show();
  });

  $('#backlogin2').click(function () {
    $('#register-login').hide();
    $('#registro-registro').show();
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

  
  $('#registro2').click(function () {
    $('#show-button').hide();
    $('#show-register').hide();
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
} restartLoading()
function hideLoading() {
  $("#status").fadeOut();
  $("#preloader").delay(1000).fadeOut("slow");
  $('.modal-backdrop').remove();
}

firebase.initializeApp(firebaseConfig);

function registroEmpresa() {
  $(document).ready(function () {


    $('#registrarEmpresa').click(function (e) {
      //$("#formRegistrar").validate();
      e.preventDefault();

      var datos = $('#formRegistrar').serializeArray();
      var nombreEmpresa = datos[0].value;
      var correo = datos[1].value;
      var pais = datos[2].value;
      var direccion = datos[3].value;
      var poblacion = datos[4].value;
      var telefono = datos[5].value;
      var codigoPostal = datos[6].value;
      var NIF = datos[7].value;
      var identificacion = datos[8].value;
      var contraseña = datos[9].value;
      var contraseña2 = datos[10].value;
      console.log(datos);

      if (!nombreEmpresa) { $('#pnombreEmpresa').html('Campo oligatorio'); } else { $('#pnombreEmpresa').html('') };
      if (!correo) { $('#pcorreo').html('Campo oligatorio'); } else { $('#pcorreo').html('') };
      if (!pais) { $('#pPais').html('Campo oligatorio'); } else { $('#pPais').html('') };
      if (!direccion) { $('#pdireccion').html('Campo oligatorio'); } else { $('#pdireccion').html('') };
      if (!poblacion) { $('#ppoblacion').html('Campo oligatorio'); } else { $('#ppoblacion').html('') };
      if (!telefono) { $('#ptelefono').html('Campo oligatorio'); } else { $('#ptelefono').html('') };
      if (!codigoPostal) { $('#pcodigopostal').html('Campo oligatorio'); } else { $('#pnombreEmpcodigopostalpresa').html('') };
      if (!identificacion) { $('#pidentificacion').html('Campo oligatorio'); } else { $('#pidentificacion').html('') };
      if (!contraseña) { $('#pcontraseña').html('Campo oligatorio'); } else { $('#pcontraseña').html('') };
      if (!contraseña2) { $('#pcontraseña2').html('Campo oligatorio'); } else { $('#pcontraseña2').html('') };

      if (nombreEmpresa && correo && pais && direccion && poblacion && telefono && codigoPostal && identificacion && contraseña && contraseña2) {

        if (contraseña === contraseña2) {
          restartLoading();
          firebase.auth().createUserWithEmailAndPassword(correo, contraseña).then(function (resultado) {
            var uid = resultado.user.uid;
            firebase.database().ref('Empresas/' + uid).set({

              "nombreEmpresa": nombreEmpresa,
              "correo": correo,
              "pais": pais,
              "direccion": direccion,
              "poblacion": poblacion,
              "identificacion": identificacion,
              "telefono": telefono,
              "codigoPostal": codigoPostal,
              "NIF": NIF,
              "contraseña": contraseña,
              "uid": uid,
              "representante": {
                "NombreRepresentante": '',
                "CedulaRepresentante": '',
                "TelRepresentante": '',
                "CorreoRepresentante": ''
              },
              "cuentas": {
                "cuanta1": 0,
                "cuenta2": 0,
                "cuentaTotal": 0
              }
            }, function (error) {
              if (error) {
                alert('Hay un error en sus datos verifique e intentelo de nuevo...')
              } else {
                hideLoading()
                swal("Registro Exitoso!", "Empresa registrado!", "success");
                $("#formRegistrar")[0].reset();
                $('#first').tab('show');
                backbutton();
              }
            })
          }, function (error) {
            console.log();
            hideLoading();
            swal("Error!", error.message, "error")
          
          });
        } else {
          hideLoading();
          swal("Error", "Las contraseñas no son igules", "error")
        }
      }
    });
  })
} registroEmpresa();

function registroRestaurante() {
  $(document).ready(function () {
    $('#registrarRestaurante').click(function (e) {
      // $("#regristroRestaurante").validate();
      e.preventDefault();
      var datos = $('#regristroRestaurante').serializeArray();
      // console.log(datos);
      var nombreRestaurante = datos[0].value; if (!nombreRestaurante) { $('#pnombreRestaurante').html('Campo oligatorio'); } else { $('#pnombreRestaurante').html('') };
      var NIF = datos[1].value; // if (!idRestauran) {$('#pcorreo').html('Campo oligatorio');}else {$('#pcorreo').html('')};
      var idRestauran = datos[2].value; if (!idRestauran) { $('#pidRestaurante').html('Campo oligatorio'); } else { $('#pPais').html('') };
      var correo = datos[3].value; if (!correo) { $('.pcorreo').html('Campo oligatorio'); } else { $('.pcorreo').html('') };
      var telefono = datos[4].value; if (!telefono) { $('.ptelefono').html('Campo oligatorio'); } else { $('.ptelefono').html('') };
      var direccion = datos[5].value; if (!direccion) { $('.pdireccion').html('Campo oligatorio'); } else { $('.pdireccion').html('') };
      var codigoPosta = datos[6].value; if (!codigoPosta) { $('.pcodigoPostal').html('Campo oligatorio'); } else { $('.pcodigoPostal').html('') };
      var pais = datos[7].value; if (!pais) { $('.ppais').html('Campo oligatorio'); } else { $('.ppais').html('') };
      var poblacion = datos[8].value; if (!poblacion) { $('.ppoblacion').html('Campo oligatorio'); } else { $('.ppoblacion').html('') };
      var contraseña = datos[9].value; if (!contraseña) { $('#pcontraseña').html('Campo oligatorio'); } else { $('#pcontraseña').html('') };
      var confirmarContraseña = datos[10].value; if (!confirmarContraseña) { $('#pconfirmarContraseña').html('Campo oligatorio'); } else { $('#pconfirmarContraseña').html('') };
      var fotoval = document.getElementById('imagenRestaurante'); if (!fotoval) { $('#pimagenRestaurante').html('Campo oligatorio'); } else { $('#pimagenRestaurante').html('') };
      if (nombreRestaurante && NIF && idRestauran && correo && telefono && direccion && codigoPosta && pais && poblacion && contraseña && confirmarContraseña) {
        if (contraseña === confirmarContraseña) {
          restartLoading();
          firebase.auth().createUserWithEmailAndPassword(correo, contraseña).then(function (resultado) {
            var uid = resultado.user.uid;
            //////////////////////////////////////////////////////           
            var foto = new FileReader();
            foto.onload = function (e) {
              var file = (e.target.result);
              //  console.log(file);
              var storageRef = firebase.storage().ref();
              var mountainsRef = storageRef.child('imagen/restaurante/' + uid + fotoval.files[0].name);
              var imagen = file.substring(23);
              mountainsRef.putString(imagen, 'base64').then(function (snapshot) {
                var rutaGuardaImagen = snapshot.metadata.fullPath;
                var storageRef = firebase.storage().ref();
                var mountainsRef = storageRef.child("");
                mountainsRef.child(rutaGuardaImagen).getDownloadURL().then(function (url) {
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
                    "rutaImagenRestaurante": url,
                    "cuentas": {
                      "cuanta1": 0,
                      "cuenta2": 0,
                      "cuentaTotal": 0,
                    }
                  }, function (error) {
                    if (error) {
                      alert('Hay un error en sus datos verifique e intentelo de nuevo...')
                    } else {
                      hideLoading()
                      swal("Registro Exitoso!", "Restaurante registrado!", "success");
                      $("#regristroRestaurante")[0].reset();
                      backbutton()
                    }
                  })
                })
              })
            }, foto.readAsDataURL(fotoval.files[0]);
          }, function (error) {
            hideLoading()
            swal("Error", error.message, "error");
          })
        } else {
          hideLoading()
          swal("Error", "Contraseña no son iguales", "error")
        }
      }
    });
  })
} registroRestaurante();

function iniciarSesionEMpresa() {
  $(document).ready(function () {
    $('#iniciarSesionEmpresa').click(function (e) {
      e.preventDefault();
      restartLoading()
      var datos = $('#sesionEmpresa').serializeArray();
      var correo = datos[0].value;
      var contraseña = datos[1].value;
      var datoss = localStorage.getItem('tokenBlue');


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
              "tokenBLue": datoss
            }

            sessionStorage.setItem("data", JSON.stringify(datas));
            var sesionjson = sessionStorage.getItem("data");
            var sesion = JSON.parse(sesionjson);
            if (sesion === '' | sesion === 'null') {
              alert('no ha iniciado sesion')
              // hideLoading()
            } else {
              // alert("has iniciado sesion");


              firebase.database().ref('Empresas/' + uid).update({
                "tokenBLue": datoss

              })
              hideLoading()
              swal("Bienvenido!", correo, "success").then((value) => {
                location.href = "panelEmpresas.html"
              });
            }
          });
        })
      }).catch(function (error) {
        //  console.log(  error.message);
        hideLoading()
        swal("Oh no!", error.message, "error");
      });

    });


  });

} iniciarSesionEMpresa()

function iniciarSesionRestaurante() {
  $(document).ready(function () {
    $('#iniciarSesionRestaurante').click(function (e) {
      e.preventDefault();
      restartLoading()
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
              hideLoading();
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
        hideLoading()
        swal("Oh no!", error.message, "error");
      })

    });


  });

} iniciarSesionRestaurante()

function iniciarSesioncliente() {
  $(document).ready(function () {
    $('#iniciarcliente').click(function (e) {
      e.preventDefault();
      restartLoading();
      var datos = $('#sesionCliente').serializeArray();
      var correo = datos[0].value;
      var contraseña = datos[1].value;
      // console.log(datos);
      var datoss = localStorage.getItem('tokenBlue');
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
              hideLoading();
              firebase.database().ref('users/' + uid).update({
                "tokenBLue": datoss
              })
              swal("Bienvenido!", correo, "success").then((value) => {
                location.href = "panelClientes.html"
              })
              //location.href = "panelClientes.html"
            }

          });



        }).catch(function (error) {
          hideLoading()

          swal("ups!!", error.message, "error").then((value) => {
            location.href = "panelClientes.html"
          })
        });

      }).catch(function (error) {
        // console.log(  error.message);
        swal("Oh no!", error.message, "error");


      });

    });


  });

} iniciarSesioncliente();
hideLoading();

function notificaciones() {
  $(document).ready(function () {

    const messaging = firebase.messaging();
    messaging.usePublicVapidKey("BNH9hyxKC5faMqmfutsoi2bmVm8jm3guerqNkbW0DisLS48Rd9ebtBilFQYZzfaxCaoxlISBT7aQ2gf08WHn3jU");
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        messaging.getToken().then(function (snap) {
          localStorage.setItem('tokenBlue', snap)
          messaging.onMessage(function (payload) {
            console.log('Message received. ', payload);
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
        console.log(response);
      },
    });
  });
}

function ojitosSesionEmpresa() {
  $(document).ready(function () {    
 $('#show_password').on('mouseover',function () {   
       $('#password').get(0).type='text';
       $('#show_password').on('mouseout', function () { 
        $('#password').get(0).type='password';
      });
  });
  })
}ojitosSesionEmpresa()

function ojitosSesionRestaurante() {
  $(document).ready(function () {    
 $('#show_password3').on('mouseover',function () {   
       $('#password3').get(0).type='text';
       $('#show_password3').on('mouseout', function () { 
        $('#password3').get(0).type='password';
      });
  });
  })
}ojitosSesionRestaurante()
function ojitosSesionEmpleado() {
  $(document).ready(function () {    
 $('#show_password2').on('mouseover',function () {   
       $('#password2').get(0).type='text';
       $('#show_password2').on('mouseout', function () { 
        $('#password2').get(0).type='password';
      });
  });
  })
}ojitosSesionEmpleado()

function ojitosRegistroEmpresa() {
  $(document).ready(function () {    
 $('#show_password7').on('mouseover',function () {   
       $('#password7').get(0).type='text';
       $('#show_password7').on('mouseout', function () { 
        $('#password7').get(0).type='password';
      });
  });
  })
}ojitosRegistroEmpresa()

function ojitosRegistroEmpresa2() {
  $(document).ready(function () {    
 $('#show_password4').on('mouseover',function () {   
       $('#password4').get(0).type='text';
       $('#show_password4').on('mouseout', function () { 
        $('#password4').get(0).type='password';
      });
  });
  })
}ojitosRegistroEmpresa2()

function ojitosRegistroRestaurante() {
  $(document).ready(function () {    
 $('#show_password5').on('mouseover',function () {   
       $('#password5').get(0).type='text';
       $('#show_password5').on('mouseout', function () { 
        $('#password5').get(0).type='password';
      });
  });
  })
}ojitosRegistroRestaurante()

function ojitosRegistroRestaurante2() {
  $(document).ready(function () {    
 $('#show_password6').on('mouseover',function () {   
       $('#password6').get(0).type='text';
       $('#show_password6').on('mouseout', function () { 
        $('#password6').get(0).type='password';
      });
  });
  })
}ojitosRegistroRestaurante2()

function registroempleados() {
  $(document).ready(function () {
    $('#registrarEmpleados').click(function (e) {
      e.preventDefault();

      var datos = $('#RegistrarEmpleados').serializeArray();
      console.log(datos);
      
      var nombre = datos[0].value; if (!nombre) { $('#pnombre').html('Campo Obligatorio'); } else { $('#pnombre').html(''); }
      var apellido = datos[1].value; if (!apellido) { $('#papellido').html('Campo Obligatorio'); } else { $('#papellido').html(''); }
      var fechaNacimiento = datos[2].value; if (!fechaNacimiento) { $('#pfechaNacimiento').html('Campo Obligatorio'); } else { $('#pfechaNacimiento').html(''); }
      var correo = datos[3].value; if (!correo) { $('#pcorreo').html('Campo Obligatorio'); } else { $('#pcorreo').html(''); }
      //var cargo = datos[4].value; if (!cargo) { $('#pcargo').html('Campo Obligatorio'); } else { $('#pcargo').html(''); }
      //var Inactivo = datos[5].value; if (!Inactivo) { $('#pInactivo').html('Campo Obligatorio'); } else { $('#pInactivo').html(''); }
     // var planBeneficio = datos[6].value; if (!'#pInactivo') { $('#pplanBeneficio').html('Campo Obligatorio'); } else { $('#pplanBeneficio').html(''); }
      var contraseña = datos[4].value; if (!contraseña) { $('#pcontraseña').html('Campo Obligatorio'); } else { $('#pcontraseña').html(''); }
     
      if (datos && nombre && apellido && fechaNacimiento && correo && contraseña) {
        restartLoading();
        firebase.auth().createUserWithEmailAndPassword(correo, contraseña).then(function (resultado) {

          var uid = resultado.user.uid;
          firebase.database().ref('users/' + uid + "/").set({

            "nombre": nombre,
            "apellido": apellido,
            "fechaNacimiento": fechaNacimiento,
            "correo": correo,
              "cargo": '',
            "Inactivo": '',
            "planBeneficio": '',
            "contraseña": contraseña,            
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
              //enviarCorreo(correo, nombre);
              swal("Registro Exitoso!", "Empleado registrado!", "success");
              $("#RegistrarEmpleados")[0].reset();
            }
          })
        },function (error) {
          hideLoading();swal("Error",error.message,"error")  });
      } else {hideLoading();
        swal("Error!", "Debe completar los campos Faltantes", "error");
      }
    })

  });
} registroempleados();

function ojitosRegistroCliente() {
  $(document).ready(function () {    
 $('#show-passwordclie').on('mouseover',function () {   
       $('#passwordclie').get(0).type='text';
       $('#show-passwordclie').on('mouseout', function () { 
        $('#passwordclie').get(0).type='password';
      });
  });
  })
}ojitosRegistroCliente()