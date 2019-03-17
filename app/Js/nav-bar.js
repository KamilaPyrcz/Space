/// Rendering right Navbar style depending on window position

setTimeout(function () {
  navBarController();   
}, 200); /// waiting for accurate navbar position


window.addEventListener('scroll', function () {
  navBarController();
});





 const header = document.querySelector("nav");

 const navBarController = function() {

  let viewposition = $(window).scrollTop();
  let hero_height = ($('.hero').height());
  let hero_contentArea = ($('.hero__content-area').height());
  let nav_height = ($('.navbar').height());
 
  
 switch (true) {

  case (viewposition >= ((hero_height/2) - hero_contentArea) && viewposition <= ((hero_height/2) + nav_height)):
        classesOnMidHero();
      break;

  case (viewposition >= hero_height - nav_height):
        classOnHeroExit();
      break;

  default:
        classesOnDefault();
}
 };

const classesOnMidHero = function() {
  header.classList.add("js-scrolled__navfade");
};

const classOnHeroExit = function() {
  header.classList.add("js-scrolled--outofhero");
  header.classList.remove("js-scrolled__navfade");
};

const classesOnDefault = function() {
  header.classList.add("js-scrolled--backwards");
  header.classList.remove("js-scrolled--outofhero");
  header.classList.remove("js-scrolled__navfade");
}; 