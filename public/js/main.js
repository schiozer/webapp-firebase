

var logOutButton = document.getElementById('logOutButton');





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