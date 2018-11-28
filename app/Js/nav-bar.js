
let viewposition = $(window).scrollTop();
const header = document.querySelector("nav")
let hero_height;

setTimeout(function(){  
  hero_height = ($('.background-image').height());
  console.log(hero_height);
 }, 300);


const addClassOnScroll = function(){
  header.classList.add("scrolled");};
const removeClassOnScroll = function() {
  header.classList.remove("scrolled");
  header.classList.add("scrolledback");
};
  

window.addEventListener('scroll', function () {
  viewposition = $(window).scrollTop();
  if (viewposition >= hero_height) {
    addClassOnScroll()
  }
  else { 
    removeClassOnScroll() }
    console.log(viewposition);
})

setTimeout(function() {
  console.log(hero_height);
}, 3000);

  