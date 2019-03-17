
//// Opens and manages register/sign modal 

$('.js-user-modal').on('click', (event) => {
    const target = event.target;
    const label = target.getAttribute('data-modal-label');
    const modal = $('.user-modal');
    const modalcontent = $('.user-modal__container');
    const close = $('.fa-times');
    const signInView = $('#signin-p');
    const registerView = $('#register-p');

    close.on('click', () => modal.removeClass('js-user-modal--visible'));  
    modal.on('click', () =>  modal.removeClass('js-user-modal--visible'));
    signInView.on('click', () => modalViewChanger("signin"));
    registerView.on('click', () => modalViewChanger("register"));
    modalcontent.on('click', (e) => e.stopPropagation());

    showUserModal(label);

});





const usermodal = $(".user-modal");
const register_view = $(".user-modal__register");
const signIn_view = $(".user-modal__signin");


function showUserModal (label) {
    modalViewChanger(label);
    usermodal.addClass("js-user-modal--visible");
}


function modalViewChanger (label) {
    if (label == "register") {
        register_view.addClass("user-modal__register--visible");
        signIn_view.removeClass("user-modal__signin--visible");
    }
    else {
        signIn_view.addClass("user-modal__signin--visible");
        register_view.removeClass("user-modal__register--visible");
    }

}


function hideUserModal () {
    console.log("hide usermodal");
    usermodal.removeClass("js-user-modal--visible");
    
}
