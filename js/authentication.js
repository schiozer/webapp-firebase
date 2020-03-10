
/* Buttons */
var authEmailPassButton = document.getElementById('authEmailPassButton');
var createUserButton = document.getElementById('createUserButton');
var authGitHubButton = document.getElementById('authGitHubButton');
var authFacebookButton = document.getElementById('authFacebookButton');
var authTwitterButton = document.getElementById('authTwitterButton');
var authGoogleButton = document.getElementById('authGoogleButton');
var authAnonymouslyButton = document.getElementById('authAnonymouslyButton');
var logOutButton = document.getElementById('logOutButton');

/* Inputs */
var emailInput = document.getElementById('emailInput');
var passwdInput = document.getElementById('passwdInput');

/* Displays */
var displayName = document.getElementById('displayName');


createUserButton.addEventListener('click', function(){

    firebase
        .auth()
        .createUserWithEmailAndPassword(emailInput.value, passwdInput.value)
        .then(function() {

            alert('Bem Vindo ' + emailInput.value);
        })
        .catch(function(error){

            console.error(error.code);
            console.error(error.message);
            alert('User creation failed, check console errors');
        });
});

authEmailPassButton.addEventListener('click', function(){

    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwdInput.value)
        .then(function(result) {
            console.log(result);
            displayName.innerHTML = 'Bem vindo ' +  emailInput.value;
            alert('Authenticated! ' + emailInput.value);
        })
        .catch(function(error){

            console.error(error.code);
            console.error(error.message);
            alert('User authentication failed, check console errors');
        });
});

authAnonymouslyButton.addEventListener('click', function(){

    firebase
        .auth()
        .signInAnonymously()
        .then(function(result) {
            console.log(result);
            displayName.innerText = 'Bem vindo Anônimo';
            alert('Authenticated Anonymously');
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
    
    
authGitHubButton.addEventListener('click', function(){

    var provider = new firebase.auth.GithubAuthProvider();
    signIn(provider);
});

authFacebookButton.addEventListener('click', function(){

    var provider = new firebase.auth.FacebookAuthProvider();
    signIn(provider);
});

authGoogleButton.addEventListener('click', function(){

    var provider = new firebase.auth.GoogleAuthProvider();
    signIn(provider);
});

authTwitterButton.addEventListener('click', function(){

    var provider = new firebase.auth.TwitterAuthProvider();
    signIn(provider);
});

function signIn(provider) {

    firebase.auth()
        .signInWithPopup(provider)
        .then(function(result){

            console.log(result);
            var token = result.credential.accessToken;
            displayName.innerText = 'Welcome ' + result.user.displayName;
        }).catch(function(error) {

            console.log(error);
            alert('Authentication failed');
        });
}
    