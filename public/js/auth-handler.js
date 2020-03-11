var displayName = document.getElementById('displayName');

firebase.auth().onAuthStateChanged(function(user){
    
    if (user) {

        displayName.innerHTML = 'Usuário Logado ' +  user.email;
        
    } else {
        window.location.replace('index.html');
    }
});
