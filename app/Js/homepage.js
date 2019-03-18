$('#app').on('click', '.js-validate', function() {
    validate();
 });
 

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validate() {
    var $result = $(".js-result");
    var email = $(".js-email").val();
    $result.text("");
  
    if (validateEmail(email)) {
      $result.text(email + "Thanks for Subscribing!");
      $result.css("color", "green");
    } else {
      $result.text(email + "Please enter a valid email address.");
      $result.addClass("js-email--invalid");
      
    }
    return false;
  }
  