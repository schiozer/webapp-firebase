
// toda vez que o product sofrer uma alteração, dispara esse evento
firebase.database().ref('/product').once('value').then(function(snapshot) {

    listProducts(snapshot);

});

function listProducts(snapshot) {

    var tbody = document.getElementById('tbody');

    snapshot.forEach( function(item) {

        var row = document.createElement('tr');
        row.className = 'table-secondary';

        var cellId = document.createElement('td');
        var cellIdText = document.createTextNode(item.key);
        cellId.appendChild(cellIdText);
        row.appendChild(cellId);

        var cellName = document.createElement('td');
        var cellNameText = document.createTextNode(item.val().name);
        cellName.appendChild(cellNameText);
        row.appendChild(cellName);

        var cellCategory = document.createElement('td');
        var cellCategoryText = document.createTextNode(item.val().category);
        cellCategory.appendChild(cellCategoryText);
        row.appendChild(cellCategory);

        var cellPrice = document.createElement('td');
        var cellPriceText = document.createTextNode(item.val().price);
        cellPrice.appendChild(cellPriceText);
        row.appendChild(cellPrice);
        
        if (item.val().imageUrl != null) {

            var image = document.createElement('img');
            image.src = item.val().imageUrl;
            image.className = 'produtos-small';
    
            var cellImageUrl = document.createElement('td');
            cellImageUrl.appendChild(image);
            row.appendChild(cellImageUrl);
    
        } else {

            var cellImageUrl = document.createElement('td');
            var cellImageUrlText = document.createTextNode('<no image>');
            cellImageUrl.appendChild(cellImageUrlText);
            row.appendChild(cellImageUrl);

        }
        
        var btnComprar = document.createElement('button');
        var btnText = document.createTextNode('Comprar');
        btnComprar.appendChild(btnText);
        btnComprar.className = 'btn btn-sm btn-primary';
        btnComprar.id = 'Comprar_' + item.key;
        btnComprar.addEventListener("click", function() { btnComprar_onclick(this) } );

        var btnView = document.createElement('button');
        var btnViewText = document.createTextNode('View');
        btnView.appendChild(btnViewText);
        btnView.className = 'btn btn-sm btn-primary';
        btnView.id = 'View_' + item.key;
        btnView.addEventListener("click", function() { btnView_onlick(this) } );

        var cellAcao = document.createElement('td');
        cellAcao.className = 'mytd';
        cellAcao.appendChild(btnComprar);
        cellAcao.appendChild(btnView);
        row.appendChild(cellAcao);

        tbody.appendChild(row);
    
    });

}

function btnView_onlick(me) {
    alert(me.id);
}

function btnComprar_onclick(me) {
    alert(me.id);
}