
 $('#app').on( 'keypress', '.js-email',  function(e) {
    if(e.which == 13) {
        event.preventDefault();
        validate();
    }
});

$('#app').on('click', '.js-validate', function() {
    validate();
 });
 
//  $('#app').on('focus', '.js-email', function(){
   
//     $(".js-result").text("");
//   });

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validate() {
    var $invalidResult = $('.js-result');
    var $validResult = $('.js-contact__form--subthanks');
    var email = $(".js-email").val();

    $invalidResult.text("");
    $('.js-result').removeClass('js-email--invalid');
  
    if (validateEmail(email)) {
      $validResult.addClass('js-email--valid');
      $('.contact__form').addClass('contact__form--hide');
    } else {
      $invalidResult.text('Please enter a valid email address.');
      $invalidResult.addClass('js-email--invalid');
    }
    return false;
  }
  