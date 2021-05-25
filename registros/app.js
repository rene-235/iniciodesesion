// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAR0XcKvWvTvgcn_oyQ946yCU-9TbYpKu8",
    authDomain: "adminbd-79219.firebaseapp.com",
    projectId: "adminbd-79219",
  });
  
  var db = firebase.firestore();
//codigo para gregar datos reg a mi conexion
  function agregar(){
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var Nacimiento = document.getElementById('Nacimiento').value;
    var Curp = document.getElementById('Curp').value;
    var Domicilio = document.getElementById('Domicilio').value;
    var Municipio = document.getElementById('Municipio').value;
    

   console.log(nombre, apellido, Nacimiento, Curp, Domicilio, Municipio);
   db.collection("users").add({
      nom: nombre,
      ape: apellido,
      Nac: Nacimiento,
      Cur: Curp,
      Dom: Domicilio,
      Mun: Municipio

  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById('nombre').value= '';
      document.getElementById('apellido').value= '';
      document.getElementById('Nacimiento').value= '';

      document.getElementById('Curp').value= '';
      document.getElementById('Domicilio').value= '';
      document.getElementById('Municipio').value= '';

  })

  .catch((error) => {
      console.error("Error adding document: ", error);
  });
  }
 //codigo para leer o mostrar  registros de mi coleccion
 //leer el id de la tabla 
 var tabla = document.getElementById('tabla');

        db.collection("users").onSnapshot((querySnapshot) => {
        tabla.innerHTML = '';//limpiar mi tabla 
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().apellido}`);
        tabla.innerHTML += `
<tr> 
<th scope="row">${doc.id}</th>
<td>${doc.data().nom}</td>
<td>${doc.data().ape}</td>
<td>${doc.data().Nac}</td>
<td>${doc.data().Cur}</td>
<td>${doc.data().Dom}</td>
<td>${doc.data().Mun}</td>
<td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
<td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nom}','${doc.data().ape}','${doc.data().Nac}','${doc.data().Cur}','${doc.data().Dom}','${doc.data().Mun}')">Editar</button></td>


</tr>
`
    });
});

//BORRRA DATOS
function eliminar(id){
    db.collection("users").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

//EDITAR DOCUMENTO
function editar(id, nombre, apellido,  Nacimiento, Curp, Domicilio, Municipio){
    console.log(id);
    var nombre = document.getElementById('nombre').value = nombre;
    var apellido = document.getElementById('apellido').value = apellido;
    var Nacimiento = document.getElementById('Nacimiento').value = Nacimiento;
    var Curp = document.getElementById('Curp').value = Curp;
    var Domicilio = document.getElementById('Domicilio').value = Domicilio;
    var Municipio = document.getElementById('Municipio').value = Municipio;
    var boton = document.getElementById('boton');
    boton.innerHTML= 'Editar';
    
    boton.onclick = function(){
        var washingtonRef = db.collection("users").doc(id);
        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var Nacimiento = document.getElementById('Nacimiento').value;
        var Curp = document.getElementById('Curp').value;
        var Domicilio = document.getElementById('Domicilio').value;
        var Municipio = document.getElementById('Municipio').value;

        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
             nom: nombre,
             ape: apellido,
             Nac: Nacimiento,
             Cur: Curp,
             Dom: Domicilio,
             Mun: Municipio
        })
        .then(() => {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Agregar';
            window.location.reload();
         })
        .catch((error) => {
        // The document probably doesn't exist.
              console.error("Error updating document: ", error);
       });
    }
}