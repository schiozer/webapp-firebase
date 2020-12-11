
var nameInput = document.getElementById('nameInput');
var priceInput = document.getElementById('priceInput');
var categoryInput = document.getElementById('categoryInput');
var urlInput = document.getElementById('urlInput');

var saveButton = document.getElementById('saveButton');
var cancelButton = document.getElementById('cancelButton');

saveButton.addEventListener('click', function() {

    createProduto(nameInput.value, priceInput.value, categoryInput.value, urlInput.value);
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

function createProduto (name, price, category, imageUrl) {
    
    var data = {
        name: name,
        price: price,
        category: category,
        imageUrl: imageUrl
    }

    firebase.database().ref().child('product').push(data).then(
        
        function(result){
            
            //alert('Product created');
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
    categoryInput.value = '';
    urlInput.value = '';

    nameInput.focus();
}
