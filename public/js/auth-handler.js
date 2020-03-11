

firebase.auth().onAuthStateChanged(function(user){

    if (!user) {
        window.location.replace('index.html');
    }
});