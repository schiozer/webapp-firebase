
/* Buttons */
var authEmailPassButton = document.getElementById('authEmailPassButton');

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

            window.location.replace('main.html');

        })
        .catch(function(error){

            console.error(error.code);
            console.error(error.message);
            alert('User authentication failed, check console errors');
        });
});

$(document).ready(function(){
    $('#passwdInput').keypress(function(e){
      if(e.keyCode==13)
        $('#authEmailPassButton').click();
    });
});