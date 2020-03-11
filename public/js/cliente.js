
var usersList = document.getElementById('usersList');
var nameInput = document.getElementById('nameInput');
///$('#nameInput'); // usando JQuery
var ageInput = document.getElementById('ageInput');
var addButton = document.getElementById('addButton');


addButton.addEventListener('click', function() {

    createUser(nameInput.value, ageInput.value);
});

// se fosse criar o evento com JQuery
/*
$('#addButton').on('click', function(){

});
*/

function createUser (name, age) {
    
    var data = {
        name: name,
        age: age
    }

    firebase.database().ref().child('users').push(data);
}



// toda vez que o users sofrer uma alteração, dispara esse evento
firebase.database().ref('users').on('value', function(snapshot) {

    usersList.innerHTML = '';

    snapshot.forEach( function(item) {
        
        var li = document.createElement('li');
        
        li.appendChild(document.createTextNode(item.val().name + ': ' + item.val().age));

        usersList.appendChild(li);
    });

});

