
window.addEventListener('load', function() {
    const el = $('#app');

    // Compile Handlebar Templates
    const errorTemplate = Handlebars.compile($('#error-template').html());
    const homeTemplate = Handlebars.compile($('#home-template').html());
    const toursTemplate = Handlebars.compile($('#tours-template').html());

    // Instantiate api handler
    const api = axios.create({
        baseURL: 'http://localhost:3000/api',
        timeout: 5000,
    });

    const router = new Router({
        mode: 'history',
        page404: function(path){
            const html = errorTemplate({
                title: 'Error 404 - Page NOT Found!',
                message: `The path '/${path}' does not exist on this site`,
            });
            el.html(html);
        },
    });

    const showError = function(error) {
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
        }
        catch (error) {
            console.log(error.response);
          }
      });
    
      router.navigateTo(window.location.pathname);

    // Nav-bar navigation

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
        const path = href.substr(href.lastIndexOf('/'));
        router.navigateTo(path);
      });

});


// Tours-table content sorting 

$('#app').on('click', 'i', (event) => {
    
    const target = $(event.target);
    sortingArrowsActions(target);
    tableContent.tableGenerator(tableContent.dataSet);

}); 

$("#app").on('click', ':checkbox', () => {

    const filteredData = checkboxState();
    tableContent.tableGenerator(filteredData);

});
