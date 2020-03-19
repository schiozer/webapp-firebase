
// toda vez que o product sofrer uma alteração, dispara esse evento
firebase.database().ref('/product').once('value').then(function(snapshot) {

    listProducts(snapshot);

});

function listProducts(snapshot) {

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

}

