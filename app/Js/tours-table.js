
var tableContent = {
    dataSet: {},

    propertyGenerator: function (obj) {
        return '<div class="property">' + obj + '</div>';
    },

    tableGenerator: function (tabledata) { 
        $('.trip').remove();
        
        tabledata.forEach(function(obj){
            $('.each-trip').append('<div class="trip">' +
            tableContent.propertyGenerator(obj.destination) +
            tableContent.propertyGenerator(obj.data) +
            tableContent.propertyGenerator(obj.type) +
            tableContent.propertyGenerator(obj.price) +
            '</div>');
        });  
    }

};

function sortingArrowsActions(target){

    var tableData = tableContent.dataSet;
    var itemsToSort = target.attr('id');
    switch (true) {

        case (target.hasClass('fa-sort-amount-down') && target.hasClass('sort-on')):
            target.removeClass('fa-sort-amount-down sort-on');
            target.addClass('fa-sort-amount-up sort-on');

            tableContent.dataSet = tableData.sort(idSorting[itemsToSort]).reverse();
            break;

        case (target.hasClass('fa-sort-amount-up') && target.hasClass('sort-on')):
            target.removeClass('fa-sort-amount-up sort-on');
            target.addClass('fa-sort-amount-down sort-on');

            tableContent.dataSet = tableData.sort(idSorting[itemsToSort]);
            break;

        case (target.hasClass('fa-sort-amount-down')):
            $( "i" ).removeClass( "sort-on" ) 
            target.removeClass('fa-sort-amount-down');
            target.addClass('fa-sort-amount-down sort-on');

            tableContent.dataSet = tableData.sort(idSorting[itemsToSort]);
            break;
            
        case (target.hasClass('fa-sort-amount-up')):	
            $( "i" ).removeClass( "sort-on" ) 
            target.removeClass('fa-sort-amount-down');
            target.addClass('fa-sort-amount-up sort-on');

            tableContent.dataSet = tableData.sort(idSorting[itemsToSort]).reverse();
            break;

        default:
        console.log(tableData);
    }

};


var idSorting = {

    destination: function(a, b) {
        var textA = a.destination.toUpperCase();
        var textB = b.destination.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    },
    data: function(a, b) {
      var Aarr = a.data.split(' ').reverse().join(' ');
      var Barr = b.data.split(' ').reverse().join(' ');
      
      return new Date(Aarr) - new Date(Barr);
    },
    type: function(a, b) {
        var textA = a.type.toUpperCase();
        var textB = b.type.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    },
    price: function(a, b) {
        var textA = a.price.toUpperCase();
        var textB = b.price.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    },

};

function checkboxState() {
    var filteringResult = [];
    var conditions = [];
        $('.each-filter label  input:checkbox').each(function() {
            if (this.checked) {
                const targetId = $(this).closest('fieldset').attr('id');
                const targetValue = $(this).attr('value');
                conditions.push(conditionsListMaking(targetId, targetValue));
                conditions = [].concat.apply([], conditions);     
            }
        });
    filteringResult.push(filteringTableData(tableContent.dataSet, conditions));

    

    var filteringResult = [].concat.apply([], filteringResult);
    return filteringResult;
};

// function filteringByCheckbox(elem, parentId, dataArr) {
//     var filteringResult = [];
//     var boxx = elem;
//     if (boxx.checked) {
//         const targetId = parentId
//         const targetValue = $(boxx).attr('value');
//         const conditions = conditionsListMaking(targetId, targetValue);
//         filteringResult.push(filteringTableData(dataArr, conditions));
//         return filteringResult;
//     }
// };

function filteringTableData(dataSet, conditions) {
    var filtredDataSet = [];
    for (var i = 0, len = dataSet.length; i < len; i++) {
        if (checkConditions(dataSet[i], conditions)) {
            filtredDataSet.push(dataSet[i]);
        }
    }
    return filtredDataSet;
};

function checkConditions(el, condlist){  
    var result = false;
    condlist.forEach(function(c){
        if(c(el)){
            result = true;
        }
    });
    return result;
};
function conditionsListMaking(id, value) {
    var filteringConditions = [];
    filteringConditions.push(giveConditionF(id, value));
    return filteringConditions;
};

function giveConditionF(id, value){
    return function(el) {
        return el[id] === value;
    }
};


