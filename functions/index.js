'use strict'
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

// Marketing Cloud Fuel SDK
const ET_Client = require('sfmc-fuelsdk-node');

const {clientId, clientSecret, stack, origin, authOrigin, soapOrigin, authOptions} = require('./variables');

admin.initializeApp(functions.config().firebase);


exports.adicionarMensagem = functions.https.onRequest( (req, res) => {

    const original = req.query.texto;

    admin.database().ref('/msg').push({original: original}).then(snapshot => {
      res.redirect(303, snapshot.ref);
    });

});

exports.transformarUppercase = functions.database.ref('/msg/{pushId}/original').onWrite((change, context) => {

    // Exit when the data is deleted.
    if (!change.after.exists()) {
      return null;
    }
    // Grab the current value of what was written to the Realtime Database.
    const original = change.after.val();

    console.log('Uppercasing', context.params.pushId, original);
    
    const valorNovo = original.toUpperCase();

    return change.after.ref.child('modificado').set(valorNovo);
    //return change.after.ref.parent.child('modificado').set(valorNovo);

});


/*
https://github.com/salesforce-marketingcloud/FuelSDK-Node
 */
exports.consultaDataExtension = functions.https.onRequest( (req, res) => {
  
    // busca usuário no Marketing Cloud    
    

    const dataExtensionName = 'FirebaseMC';
    const dataExtensionRowKey = 'Email';
    const dataExtensionKeyValue = 'schiozer@yahoo.com.br';

    const client = new ET_Client(clientId, clientSecret, stack, {origin, authOrigin, soapOrigin, authOptions});

    const props = ['ContactId']

    const filter = {
        leftOperand: dataExtensionRowKey,
        operator: 'equals',
        rightOperand: dataExtensionKeyValue
    };

    client.dataExtensionRow({props, Name: dataExtensionName, filter}).get((err, response) => {

        if (err) {

          res.status = 500;
          res.send(err);

        } else {

          res.status = 200;
          res.send(response);
      
        }
    })

});


exports.customerOnWrite = functions.database.ref('/customer/{pushId}').onWrite((change, context) => {

    // Exit when the data is deleted.
    if (!change.after.exists()) {
      return 0;
    }

    console.log('Searching contactId for email: ' + change.after._data.email);

    const dataExtensionName = 'FirebaseMC';
    const dataExtensionRowKey = 'Email';
    const dataExtensionKeyValue = change.after._data.email;

    const client = new ET_Client(clientId, clientSecret, stack, {origin, authOrigin, soapOrigin, authOptions});

    const props = ['ContactId']

    const filter = {
        leftOperand: dataExtensionRowKey,
        operator: 'equals',
        rightOperand: dataExtensionKeyValue
    };

    client.dataExtensionRow({props, Name: dataExtensionName, filter}).get((err, response) => {

        if (err) {

          console.log('Error searching contact id for email: [' + change.after._data.email + '] Error: ' + err);
          return 0;

        } else {

          const ContactId = response.body.Results[0].Properties.Property.Value;

          console.log('Found ContactId: ' +  ContactId);

          return change.after.ref.child('contactId').set(ContactId);
        }
    });

    return change;

});