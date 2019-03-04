
window.addEventListener('load', function () {
    const el = $('#app');

//// Compile Handlebar Templates
    const errorTemplate = Handlebars.compile($('#error-template').html());
    const homeTemplate = Handlebars.compile($('#home-template').html());
    const toursTemplate = Handlebars.compile($('#tours-template').html());
    const contactTemplate = Handlebars.compile($('#contact-template').html());


//// Instantiate api handler
    const api = axios.create({
        baseURL: 'http://localhost:3000/api',
        timeout: 5000,
    });

    const router = new Router({
        mode: 'history',
        page404: function (path) {
            const html = errorTemplate({
                title: 'Error 404 - Page NOT Found!',
                message: `The path '/${path}' does not exist on this site`, 
            });
            el.html(html);
        },
    });

    const showError = function (error) {
        const { title, message } = error.response.data;
        const html = errorTemplate({ title, message });
        el.html(html);
    };

    router.add('/', () => {
        let html = homeTemplate();
        el.html(html);
    });


    router.add('/tours', async () => {
        let html = toursTemplate();
        el.html(html);
        try {
            const response = await api.get('/tours');
            tableContent.dataSet = response.data;
            tableContent.tableGenerator(tableContent.dataSet);
            tableContent.filteredData = tableContent.dataSet;
        }
        catch (error) {
            console.log(error.response);
        }
    });

    router.add('/contact', async () => {
        let html = contactTemplate();
        el.html(html);
     
    });


    router.navigateTo(window.location.pathname);




//// Nav-bar navigation

    setTimeout(function () {
        navBarController(); /// rendering wright Navbar style depending on window position
    }, 200);

    $('a').on('click', (event) => {

        // Block browser page load
        event.preventDefault();

        const target = $(event.target);
        // // Highlight Active Menu on Click
        // 
        // $('.item').removeClass('active');
        // target.addClass('active');

        // Navigate to clicked url
        const href = target.attr('href');

        if (href) {
            const path = href.substr(href.lastIndexOf('/'));
            router.navigateTo(path);
        }

    });

    

    
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



});




//// Reloads page when orientation changes 

window.onorientationchange = function () {
    var orientation = window.orientation;
    switch (orientation) {
        case 0:
        case 90:
        case -90: window.location.reload();
            break;
    }
};

//// Tours-table content sorting 

$('#app').on('click', 'i', (event) => {

    const target = $(event.target);
    sortingArrowsActions(target);
    tableContent.tableGenerator(tableContent.filteredData);

});

$("#app").on('click', ':checkbox', () => {

    try {
        tableContent.filteredData = checkboxFilter();
        tableContent.tableGenerator(tableContent.filteredData);
    }
    catch (error) {
        $('.trip').remove();
        $('.each-trip').append('<div class="trip">' + error + '</div>');
    }

});
