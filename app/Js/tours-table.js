
var tableContent = {
    dataSet: {},
    filteredData: {},

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

    var tableData = tableContent.filteredData;
    var itemsToSort = target.attr('id');
    switch (true) {

        case (target.hasClass('fa-sort-amount-down') && target.hasClass('sort-on')):
            target.removeClass('fa-sort-amount-down sort-on');
            target.addClass('fa-sort-amount-up sort-on');

            tableContent.filteredData = tableData.sort(idSorting[itemsToSort]).reverse();
            break;

        case (target.hasClass('fa-sort-amount-up') && target.hasClass('sort-on')):
            target.removeClass('fa-sort-amount-up sort-on');
            target.addClass('fa-sort-amount-down sort-on');

            tableContent.filteredData = tableData.sort(idSorting[itemsToSort]);
            break;

        case (target.hasClass('fa-sort-amount-down')):
            $( "i" ).removeClass( "sort-on" ) 
            target.removeClass('fa-sort-amount-down');
            target.addClass('fa-sort-amount-down sort-on');

            tableContent.filteredData = tableData.sort(idSorting[itemsToSort]);
            break;
            
        case (target.hasClass('fa-sort-amount-up')):	
            $( "i" ).removeClass( "sort-on" ) 
            target.removeClass('fa-sort-amount-down');
            target.addClass('fa-sort-amount-up sort-on');

            tableContent.filteredData = tableData.sort(idSorting[itemsToSort]).reverse();
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


// function checkboxState() {
//     var defaultData = tableContent.dataSet;
//     var filteredDataOne = [];
//     var filteredDataTwo = [];
//     var secondFiltrationData = [];

//     $('#destination label  input:checkbox').each(function () {
//         if (this.checked) {
//             var y = this;
//             filteredDataOne.push(filteringByCheckbox(y, "destination", tableContent.dataSet));
//         }
//     });

//     filteredDataOne = [].concat.apply([], filteredDataOne);
//     filteredDataOne = [].concat.apply([], filteredDataOne);

//     if (filteredDataOne.length < 1) {
//         secondFiltrationData = tableContent.dataSet;
//     }
//     else {
//         secondFiltrationData = filteredDataOne;
//     }

//     $('#type label  input:checkbox').each(function () {
//         if (this.checked) {
//             var y = this;
//             filteredDataTwo.push(filteringByCheckbox(y, "type", secondFiltrationData));
//         }
//     });

//     filteredDataTwo = [].concat.apply([], filteredDataTwo)
//     filteredDataTwo = [].concat.apply([], filteredDataTwo);

//     if (filteredDataTwo.length < 1) {
//         filteredDataTwo = filteredDataOne;
//     }

//     if (filteredDataTwo.length < 1) {
//         filteredDataTwo = defaultData;
//     }

//     return filteredDataTwo;
// };



function checkboxFilter() {
    var filteredDataOne = [];
    var filteredDataTwo = [];
    var secondFiltrationData = [];

    filteredDataOne = checkboxState('#destination label  input:checkbox', "destination", tableContent.dataSet);

    if (filteredDataOne.length < 1) {
        secondFiltrationData = tableContent.dataSet;
    }
    else {
        secondFiltrationData = filteredDataOne;
    }

    filteredDataTwo = checkboxState('#type label  input:checkbox', "type", secondFiltrationData);


    if (filteredDataTwo.length < 1) {
        filteredDataTwo = secondFiltrationData;
    }

    return filteredDataTwo;
};


function checkboxState(a, parentId, dataSet) {
    var conditions = [];
    $(a).each(function () {
        if (this.checked) {
            const targetValue = $(this).attr('value');
            conditions.push(giveConditionF(parentId, targetValue));
        }
    });
    var DataArr = filteringTableData(dataSet, conditions);

    if (conditions.length > 0 && DataArr.length < 1) {
        throw "no such item";
    }
    return DataArr;
}



// function filteringByCheckbox(elem, parentId) {
//         const targetValue = $(elem).attr('value');
//         conditions.push(giveConditionF(parentId, targetValue));
// };

// function filteringByCheckbox(elem, parentId, dataArr) {
//     var filteringResult = [];
//     var boxx = elem;

//         const targetId = parentId
//         const targetValue = $(boxx).attr('value');
//         const conditions = conditionsListMaking(targetId, targetValue);
//         filteringResult.push(filteringTableData(dataArr, conditions));

//     return filteringResult;
// };

function filteringTableData(dataSet, conditions) {
    var filteredDataSet = [];
    for (var i = 0, len = dataSet.length; i < len; i++) {
        if (checkConditions(dataSet[i], conditions)) {
            filteredDataSet.push(dataSet[i]);
        }
    }
    return filteredDataSet;
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
// function conditionsListMaking(id, value) {
//     var filteringConditions = [];
//     filteringConditions.push(giveConditionF(id, value));
//     return filteringConditions;
// };

function giveConditionF(id, value){
    return function(el) {
        return el[id] === value;
    }
};

