$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets    
});


$(function(){

  wow = new WOW(
  {
    mobile: false
  });
  wow.init();

  // ------- JQUERY PARALLAX ---- //
  function initParallax() {
    $('#home').parallax("100%", 0.1);
    $('#gallery').parallax("100%", 0.3);
    $('#menu').parallax("100%", 0.2);
    $('#team').parallax("100%", 0.3);
    $('#contact').parallax("100%", 0.1);
  }
  initParallax();

  // HIDE MOBILE MENU AFTER CLIKING ON A LINK
  $('.navbar-collapse a.smoothScroll, .switch-locale a').click(function(){
    $(".navbar-collapse").collapse('hide');
  });

  // NIVO LIGHTBOX
  $('#gallery a').nivoLightbox({
    effect: 'fadeScale',
  });

  // Language selector

  var engImgLink = "images/gb.png";
  var fraImgLink = "images/fr.png";

  var imgBtnSel = $('#imgBtnSel');
  var imgBtnEng = $('#imgBtnEng');
  var imgBtnFra = $('#imgBtnFra');

  var imgNavSel = $('#imgNavSel');
  var imgNavEng = $('#imgNavEng');
  var imgNavFra = $('#imgNavFra');

  var spanNavSel = $('#lanNavSel');
  var spanBtnSel = $('#lanBtnSel');

  imgBtnSel.attr("src", engImgLink);
  imgBtnEng.attr("src", engImgLink);
  imgBtnFra.attr("src", fraImgLink);

  imgNavSel.attr("src", engImgLink);
  imgNavEng.attr("src", engImgLink);
  imgNavFra.attr("src", fraImgLink);

  $( ".language" ).on( "click", function( event ) {
    var currentId = $(this).attr('id');

    if (currentId == "navEng") {
      imgNavSel.attr("src", engImgLink);
      spanNavSel.text("ENG");
    } else if (currentId == "navFra") {
      imgNavSel.attr("src", fraImgLink);
      spanNavSel.text("FRA");
    }

    if (currentId == "btnEng") {
      imgBtnSel.attr("src", engImgLink);
      spanBtnSel.text("ENG");
    } else if (currentId == "btnFra") {
      imgBtnSel.attr("src", fraImgLink);
      spanBtnSel.text("FRA");
    }

  });

  // I18N
  $.i18n({
    locale: 'en'
  });

  $.i18n().load({
    'en': './js/i18n/en.json',
    'fr': './js/i18n/fr.json'
  }).done(function() {
    $('.switch-locale').on('click', 'a', function(e) {
      e.preventDefault();
      $.i18n().locale = $(this).data('locale');
      $('body').i18n();
    });
    $('body').i18n();
  });


});

