import firebase from 'firebase';

const configFireBase = {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "..."
};

firebase.initializeApp(configFireBase);

let ref = firebase.database().ref();

ref.on('value', (snapshot) => {
    const db = snapshot.val();
    
    console.log(db);
}, (error) => {
    console.log('Error: ' + error.code);
});
