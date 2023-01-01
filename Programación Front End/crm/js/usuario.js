var g_id_usuario="";

function agregar_usuario(){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var id_usuario = document.getElementById("txt_id_usuario").value;
var dv = document.getElementById("txt_dv").value;
var nombres = document.getElementById("txt_nombres").value;
var apellidos = document.getElementById("txt_apellidos").value;
var email = document.getElementById("txt_email").value;
var celular = document.getElementById("txt_celular").value;
var username = document.getElementById("txt_username").value;
var password = document.getElementById("txt_password").value;
var fecha_registro = document.getElementById("txt_fecha_registro").value;


var raw = JSON.stringify({
  "id_usuario": id_usuario,
  "dv": dv,
  "nombres": nombres,
  "apellidos": apellidos,
  "email": email,
  "celular": celular,
  "username": username,
  "password": password,
  "fecha_registro": fecha_registro
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
console.log(agregar_usuario)
fetch("http://frontend170.com:3000/api/usuario", requestOptions)
  .then(response => {
    if(response.status == 200){
      alert("Usuario ingresado correctamente");
    }else{
      alert("Error al ingresar los datos");
    }
    window.location.replace("lista_usuarios.html")
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

function obtener_usuarios(){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com:3000/api/usuario", requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completarFila)
  )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function completarFila (element, index, arr){
  arr[index] = document.querySelector('#tbl_usuarios tbody').innerHTML +=
  `<tr>
      <td>${element.id_usuario}
      <td>${element.dv}</td>
      <td>${element.nombres}</td>
      <td>${element.apellidos}</td>
      <td>${element.email}</td>
      <td>${element.celular}</td>
      <td>${element.username}</td>
      <td>${element.password}</td>
      <td>${element.fecha_registro}</td>
      <td> <a href='eliminar_usuario.html?id=${element.id_usuario}'> <img src='../img/eliminar.png'> </a> 
      <a href='actualizar_usuario.html?id=${element.id_usuario}'> <img src="../img/actualizar-flecha.png"></a>
      </td>

  </tr>`
};
function obtenerIDUsuario(){
  //Obtenemos la url de la pagina actual
  var queryString = window.location.search;
  //Buscamos los parametros de la url actual
  var urlParams = new URLSearchParams(queryString);
  //Extraemos el id del cliente
  var p_id_usuario = urlParams.get('id');
  g_id_usuario = p_id_usuario
  
   //Invocamos función para consultar y desplegar los datos del cliente
   obtenerDatosUsuario(p_id_usuario);

  }
  function obtenerIDUsuarioActualizar(){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var p_id_usuario = urlParams.get('id');
    g_id_usuario = p_id_usuario
    obtenerDatosUsuarioActualizar(p_id_usuario);
  }
function obtenerDatosUsuario(p_id_usuario){
    //incorpore aquí las instrucciones para obtener los datos del cliente
    //y mostrarlos en la página
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://frontend170.com:3000/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(mostrar_datos_usuario)
    )
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  
}
function obtenerDatosUsuarioActualizar(p_id_usuario){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://frontend170.com:3000/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(mostrar_datos_usuario_actualizar)
    )
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

function mostrar_datos_usuario_actualizar(element, index, arr){
    //Declaramos variables locales con datos del cliente a actualizar
    var nombres = element.nombres;
    var apellidos= element.apellidos;
    var email = element.email;
    var celular = element.celular;
    var password =element.password;
    
    //Completamos los input del formulario
    document.getElementById("txt_nombres").value = nombres;
    document.getElementById("txt_apellidos").value = apellidos;
    document.getElementById("txt_email").value = email;
    document.getElementById("txt_celular").value = celular;
    document.getElementById("txt_password").value = password;
}


function mostrar_datos_usuario(element, index, arr){
  arr[index] = document.querySelector('#cnt_datos_usuario').innerHTML +=
    `<h3> ¿Desea eliminar a este Usuario? </h3>
    <div class="alert alert-warning" role="alert"> <b>${element.nombres} ${element.apellidos}</b> </div>
  `
}
function eliminar_usuario(){
      var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch("http://frontend170.com:3000/api/usuario/"+g_id_usuario, requestOptions)
      .then(response => {
        if(response.status == 200){
          alert("Usuario eliminado correctamente");
        }else{
          alert("Error al ingresar los datos");
        }
        window.location.replace("lista_usuarios.html")
      })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function actualizarUsuario(){
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var nombres = document.getElementById("txt_nombres").value;
var apellidos = document.getElementById("txt_apellidos").value;
var email = document.getElementById("txt_email").value;
var celular = document.getElementById("txt_celular").value;
var password = document.getElementById("txt_password").value;


var raw = JSON.stringify({
"nombres": nombres,
"apellidos": apellidos,
"email": email,
"celular": celular,
"password": password
});

var requestOptions = {
method: 'PATCH',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch("http://frontend170.com:3000/api/usuario/"+g_id_usuario, requestOptions)
.then(response => {
  if(response.status == 200){
    alert("Usuario actualizado correctamente");
  }else{
    alert("Error al ingresar los datos");
  }
  window.location.replace("lista_usuarios.html")
})
.then(result => console.log(result))
.catch(error => console.log('error', error));
}