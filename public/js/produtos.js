
var nameInput = document.getElementById('nameInput');
var priceInput = document.getElementById('priceInput');

var addButton = document.getElementById('addButton');


addButton.addEventListener('click', function() {

    createProduto(nameInput.value, priceInput.value);
});

// se fosse criar o evento com JQuery
/*
$('#addButton').on('click', function(){

});
*/

function createProduto (name, price) {
    
    var data = {
        name: name,
        price: price
    }

    firebase.database().ref().child('produtos').push(data);
}



// toda vez que o users sofrer uma alteração, dispara esse evento
firebase.database().ref('produtos').on('value', function(snapshot) {

    var tbody = document.getElementById('tbody');

    snapshot.forEach( function(item) {

        var row = document.createElement('tr');
        row.className = 'table-secondary';

        var cell1 = document.createElement('td');
        var cell1Text = document.createTextNode(item.val().name);
        cell1.appendChild(cell1Text);
        row.appendChild(cell1);

        var cell2 = document.createElement('td');
        var cell2Text = document.createTextNode(item.val().price);
        cell2.appendChild(cell2Text);
        row.appendChild(cell2);
        
        
        var btnComprar = document.createElement('button');
        var btnText = document.createTextNode('Comprar');
        btnComprar.appendChild(btnText);
        btnComprar.className = 'btn btn-sm btn-primary';
        btnComprar.id = item.key;
        //row.appendChild(btnComprar);

        var cell3 = document.createElement('td');
        cell3.className = 'mytd';
        cell3.appendChild(btnComprar);
        row.appendChild(cell3);



        tbody.appendChild(row);
    
    });

/*
    <tr class="table-secondary">
      <th scope="row">Secondary</th>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
*/


});

