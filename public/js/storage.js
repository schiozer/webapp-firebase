
var uploader = document.getElementById('uploader');
var filebutton = document.getElementById('filebutton');

filebutton.addEventListener('change', function(e) {

    // obter o arquivo
    var file = e.target.files[0];

    // Referenciar o storage
    var storageRef = firebase.storage().ref('arquivos/' + file.name);

    //Enviar o arquivo
    var task = storageRef.put(file);

    //Atualizar o progress bar
    task.on('state_changed', 
        function progress(snapshot) {
            
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            uploader.value = percentage;
        },
        function error(err) {
            console.log(err);
        },
        function complete(){
            alert('Envio Completo!');
        }
    );

});
