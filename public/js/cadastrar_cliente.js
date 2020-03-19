
var nameInput = document.getElementById('nameInput');
var emailInput = document.getElementById('emailInput');
var countryInput = document.getElementById('countryInput');
var ageInput = document.getElementById('ageInput');
var mobileInput = document.getElementById('mobileInput');
var devideIdInput = document.getElementById('devideIdInput');

var saveButton = document.getElementById('saveButton');
var cancelButton = document.getElementById('cancelButton');


saveButton.addEventListener('click', function() {

    createCustomer(
        nameInput.value,
        emailInput.value,
        countryInput.value,
        ageInput.value,
        mobileInput.value,
        devideIdInput.value
    );

});

cancelButton.addEventListener('click', function() {

    document.location.href='cliente.html';
});

// se fosse criar o evento com JQuery
/*
$('#saveButton').on('click', function(){

});
*/

function createCustomer (name, email, country, age, mobile, decideId) {
    
    var data = {
        name: name,
        email: email,
        country: country,
        age: age,
        mobile: mobile,
        decideId: decideId,
    }

    firebase.database().ref().child('customer').push(data).then(
        
        function(result){
            
            alert('Customer created');
            document.location.href='cliente.html';
        
        }, function (err){
            
            alert('Error: ' + err);
            document.location.href='cliente.html';
        }
    );
}


function cleanFields() {

    nameInput.value = '';
    emailInput.value = '';
    countryInput.value = '';
    ageInput.value = '';
    mobileInput.value = '';
    devideIdInput.value = '';

    nameInput.focus();
}
