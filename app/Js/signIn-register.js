
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
