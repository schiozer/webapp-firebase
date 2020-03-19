
var customerList = document.getElementById('customerList');

firebase.database().ref('/customer').once('value').then(function(snapshot) {

    listCustomer(snapshot);

});

/*
firebase.database().ref('/customer').on('value', function(snapshot) {

    listCustomer(snapshot);
});

firebase.database().ref('/customer').on('child_added', function(snapshot) {

    addRow(snapshot);
});
*/


// toda vez que o users sofrer uma alteração, dispara esse evento
function listCustomer(snapshot) {

    var tbody = document.getElementById('tbody');

    snapshot.forEach(function(item) {

        addRow(item);
    
    });

}

function addRow(item) {

    var row = document.createElement('tr');
    row.className = 'table-secondary';

    var cell1 = document.createElement('td');
    var cell1Text = document.createTextNode(item.val().name);
    cell1.appendChild(cell1Text);
    row.appendChild(cell1);

    var cell2 = document.createElement('td');
    var cell2Text = document.createTextNode(item.val().email);
    cell2.appendChild(cell2Text);
    row.appendChild(cell2);
    
    var cell3 = document.createElement('td');
    var cell3Text = document.createTextNode(item.val().country);
    cell3.appendChild(cell3Text);
    row.appendChild(cell3);

    var cell4 = document.createElement('td');
    var cell4Text = document.createTextNode(item.val().age);
    cell4.appendChild(cell4Text);
    row.appendChild(cell4);

    var cell5 = document.createElement('td');
    var cell5Text = document.createTextNode(item.val().contactId);
    cell5.appendChild(cell5Text);
    row.appendChild(cell5);

    tbody.appendChild(row);
}