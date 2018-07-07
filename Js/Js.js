
let viewposition = window.scrollY;
const header = document.querySelector("nav")
const hero_height = document.querySelector(".hero").offsetHeight;
const addClassOnScroll = () => header.classList.add("scrolled");
const removeClassOnScroll = () => header.classList.remove("scrolled");

window.addEventListener('scroll', function () {
  viewposition = window.scrollY;
  if (viewposition >= hero_height) {
    addClassOnScroll()
  }
  else { 
    removeClassOnScroll() }
    console.log(viewposition);
})