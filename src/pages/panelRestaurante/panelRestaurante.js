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
$(window).scroll(function() {
    // Init AOS 
    AOS.init();
});

$( document ).ready(function() {

/* Carousel */

$('#carousel-associates').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:false,
  responsive:{
    0:{
        items:1
    },
    600:{
        items:3
    },
    1000:{
        items:6
    }
  }
})
  
  /* Tooltips */
  $('.dropdown').click(function(){
    alert('qloq');
  });
  

  $('[data-toggle="tooltip"]').tooltip()

$('#expand').click(function(){
	$('.sidebar').toggleClass('width');
	$('.body-panel').toggleClass('width-panel');
	$('#arrow').toggleClass('rotate-arrow');
  $('.sidebar-nav ul li a span').toggleClass('text-hide1')
})
$("nav li a").click(function(){
    $("nav li").removeClass("active");
    $(this).parent().addClass("active");
    $("nav li a").removeClass("active");
});

 /*show and hide REGISTRO */

 $('#show-register').click(function(){
  $('#login-empresa').hide();
  $('#register-form').show();
 });

$('#backlogin').click(function(){
  $('#register-form').hide();
  $('#login-empresa').show();
})

 $('#show-register2').click(function(){
  $('#login-empresa2').hide();
  $('#register-form2').show();
 });

$('#backlogin2').click(function(){
  $('#register-form2').hide();
  $('#login-empresa2').show();
})

/* Panel admin empresas */ 

$('#registro1').click(function(){
  $('#show-button').hide();
  $('#show-register1').show();
})

$('#registro2').click(function(){
  $('#show-button').hide();
  $('#show-register2').show();
})


});

/* Formularios restaurantes */

$('#platos2').show();
/* panel restaurante */
$('#add-plate').click(function(){
  $('#chef2').hide();
  $('#platos2').hide();
  $('#promocion2').hide();
  $('#register-chef').hide();
  $('#register-promocion').hide();
  $('#registro-platos').show();
});
$('#add-chef').click(function(){
  $('#chef2').hide();
  $('#platos2').hide();
  $('#promocion2').hide();
  $('#registro-platos').hide();
  $('#register-promocion').hide();
  $('#register-chef').show();
});
$('#add-promocion').click(function(){
  $('#chef2').hide();
  $('#platos2').hide();
  $('#promocion2').hide();
  $('#registro-platos').hide();
  $('#register-chef').hide();
  $('#register-promocion').show();
});

$('#activepanel1').click(function(){
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
$('#activepanel2').click(function(){
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
$('#activepanel3').click(function(){
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

function backbutton() {
$('#show-register1').hide();
$('#show-register2').hide();
$('#show-button').show();
}