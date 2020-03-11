
/* Buttons */
var authEmailPassButton = document.getElementById('authEmailPassButton');
var logOutButton = document.getElementById('logOutButton');

/* Inputs */
var emailInput = document.getElementById('emailInput');
var passwdInput = document.getElementById('passwdInput');

/* Displays */
var displayName = document.getElementById('displayName');


authEmailPassButton.addEventListener('click', function(){

    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwdInput.value)
        .then(function(result) {

            displayName.innerHTML = 'Bem vindo ' +  emailInput.value;
            window.location.replace('main.html');

        })
        .catch(function(error){

            console.error(error.code);
            console.error(error.message);
            alert('User authentication failed, check console errors');
        });
});

logOutButton.addEventListener('click', function(){

    firebase
        .auth()
        .signOut()
        .then(function() {

            displayName.innerText = 'Not Authenticated';
            alert('SignOut succeed! ' + emailInput.value);
        })
        .catch(function(error){

            console.error(error.code);
            console.error(error.message);
        });
});