 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyAkuRtDNxVsav5VVXsKjUUjA6VJbviT3Qg",
    authDomain: "sesion-65452.firebaseapp.com",
    projectId: "sesion-65452",
    storageBucket: "sesion-65452.appspot.com",
    messagingSenderId: "1001889377049",
    appId: "1:1001889377049:web:b482e68e887ef15144b388"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
observador();

  function registrar(){
      console.log("click en registrar");
     
     var email = document.getElementById('email').value;
     var password = document.getElementById('password').value;

     firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in
      // ...
      verificar();
      console.log("usuario registrado.........");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      console.log(errorCode);
      console.log(errorMessage);
    });
  }

  function verificar(){
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      // Email sent.
      console.log("email enviado");
    }).catch(function(error) {
      // An error happened.
      console.log("error al mandar email");
    });
  }

  function observador(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        var email = user.email;

        console.log("Login de idUsuario: ", uid, ", email: ", email);
        // ...
      } else {
        // User is signed out
        // ...
        console.log("Usuario sin iniciar sesion");
      }
    });
  }

  function ingresar(){
    console.log("click en ingresar");

    var email = document.getElementById('emailI').value;
    var password = document.getElementById('passwordI').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed in
    // ...
    console.log("el usuario inicio sesion");
    mostrar();
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      window.location.href = "";

  });
  }

  function cerrar(){
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      window.location.reload();
      console.log("sesion cerrada");
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }


  function mostrar(){
    var mostrar = document.getElementById('mostrar');
    mostrar.innerHTML = `
    <br/>
    <button class="btn btn-danger" onclick="cerrar()">cerrar sesion</button>`
  }

  