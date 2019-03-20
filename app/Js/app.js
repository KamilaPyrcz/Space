
window.addEventListener('load', function () {
    const el = $('#app');

//// Compile Handlebar Templates
    const errorTemplate = Handlebars.compile($('#error-template').html());
    const homeTemplate = Handlebars.compile($('#home-template').html());
    const toursTemplate = Handlebars.compile($('#tours-template').html());
    const contactTemplate = Handlebars.compile($('#contact-template').html());


//// Instantiate api handler

    const api = axios.create({
        baseURL: '/api',
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



//// Navigation elements

$(document).on('click','.js-navigation-btn', (event) => {

    // Block browser page load
    event.preventDefault();
  
    const target = $(event.target);
  
    // Navigate to clicked url
    const href = target.attr('href');
  
    if (href) {
        const path = href.substr(href.lastIndexOf('/'));
        router.navigateTo(path);
    }
  
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

