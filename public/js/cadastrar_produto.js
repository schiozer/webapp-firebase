
var nameInput = document.getElementById('nameInput');
var priceInput = document.getElementById('priceInput');

var saveButton = document.getElementById('saveButton');
var cancelButton = document.getElementById('cancelButton');

saveButton.addEventListener('click', function() {

    createProduto(nameInput.value, priceInput.value);
    //cleanFields();
});

cancelButton.addEventListener('click', function() {

    document.location.href='produtos.html';
});


// se fosse criar o evento com JQuery
/*
$('#saveButton').on('click', function(){

});
*/

function createProduto (name, price) {
    
    var data = {
        name: name,
        price: price
    }

    firebase.database().ref().child('product').push(data).then(
        
        function(result){
            
            alert('Product created');
            document.location.href='produtos.html';
        
        }, function (err){
            
            alert('Error: ' + err);
            document.location.href='produtos.html';
        }
    );
}

function cleanFields() {

    nameInput.value = '';
    priceInput.value = '';

    nameInput.focus();
}
