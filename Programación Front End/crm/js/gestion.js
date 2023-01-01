var  g_id_gestion ="";

function agregar_gestion(){
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var id_usuario = document.getElementById("id_usuario").value;
var id_cliente = document.getElementById("id_cliente").value;
var id_tipo_gestion = document.getElementById("id_tipo_gestion").value;
var id_resultado = document.getElementById("id_resultado").value;
var comentarios = document.getElementById("comentarios").value;
var fecha_registro = document.getElementById("fecha_registro").value;

var raw = JSON.stringify({
"id_usuario": id_usuario,
"id_cliente": id_cliente,
"id_tipo_gestion": id_tipo_gestion,
"id_resultado": id_resultado,
"comentarios": comentarios,
"fecha_registro": fecha_registro
});

var requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
redirect: 'follow'
};
console.log(requestOptions)
fetch("http://frontend170.com:3000/api/gestion/", requestOptions)
.then(response => {
  console.log(response)
  if(response.status == 200){
    alert("Gestión ingresado correctamente ");
  }else{
    alert("Error al ingresar los datos");
  }
  window.location.replace("lista_gestiones.html")
})
.then(result => console.log(result))
.catch(error => console.log('error', error));
} 

//LISTA DE GESTIONES
function obtener_gestion(){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com:3000/api/gestion", requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completarFila)
  )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function completarFila (element, index, arr){
  arr[index] = document.querySelector('#tbl_gestion tbody').innerHTML +=
  `<tr>
      <td>${element.id_gestion}</td>
      <td>${element.id_usuario}</td>
      <td>${element.id_cliente}</td>
      <td>${element.id_tipo_gestion}</td>
      <td>${element.id_resultado}</td>
      <td>${element.comentarios}</td>
      <td>${element.fecha_registro}</td>
      <td>
      <a href='eliminar_gestion.html?id=${element.id_gestion}'> <img src='../img/eliminar.png'> </a> 
      <a href='actualizar_gestion.html?id=${element.id_gestion}'><img src='../img/actualizar-flecha.png'> </a>
      </td>
  </tr>`
};

function obtenerIDgestion(){
  //obtenemos la url dw la pagina actual
  var queryString = window.location.search;
  //buscamos los paramentros de la url actual
  var urlParams = new URLSearchParams(queryString)
  //extraemos el id del cliente
  var p_id_gestion = urlParams.get("id");
  g_id_gestion = p_id_gestion;

  obtenerDatosGestion(p_id_gestion)

}
function obtenerDatosGestion(p_id_gestion){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com:3000/api/gestion/"+ p_id_gestion, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completar_Datos)
  )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


function completar_Datos (element, index, arr){
    arr[index] = document.querySelector('#cnt_datos_gestion').innerHTML +=
    `<h3> ¿Desea eliminar a esta gestion? </h3>
    <div class="alert alert-warning" role="alert"> <b>${element.id_gestion} ${element.id_cliente}</b> </div>
    `
}

function eliminar_gestion(){
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com:3000/api/gestion/"+g_id_gestion, requestOptions)
  .then(response => {
    if(response.status == 200){
      alert("Gestión eliminado correctamente");
    }else{
      alert("Error al ingresar los datos");
    }
    window.location.replace("lista_gestiones.html")
  })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function obtenerIDGestionActualizar(){
  //obtenemos la url dw la pagina actual
  var queryString = window.location.search;
  //buscamos los paramentros de la url actual
  var urlParams = new URLSearchParams(queryString)
  //extraemos el id del cliente
  var p_id_gestion = urlParams.get("id")
  g_id_gestion = p_id_gestion;
 
  obtenerDatosGestionActualizar(p_id_gestion)
}
function obtenerDatosGestionActualizar(p_id_gestion){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com:3000/api/gestion/"+p_id_gestion, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completar_Datos_Actualizar)
  )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


}
function completar_Datos_Actualizar(element){

var comentarios = element.comentarios;

document.getElementById("comentarios").value = comentarios;


}
function actualizarGestion(){
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var comentarios = document.getElementById("comentarios").value;

var raw = JSON.stringify({
  "comentarios": comentarios
  
});

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://frontend170.com:3000/api/gestion/"+g_id_gestion, requestOptions)
  .then(response => {
    if(response.status == 200){
      alert("Gestión actualizado correctamente");
    }else{
      alert("Error al ingresar los datos");
    }
    window.location.replace("lista_gestiones.html")
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}


//onload windows carga todo antes en los selectores para su uso antes de todo
var espacio = " "; //espacio entre nombres y apellidos

window.onload = function() {
   
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

fetch("http://frontend170.com:3000/api/usuario", requestOptions)
  .then((response) => response.json())
  
    .then(result => 
      
      result.forEach( function(valor, indice, array) {
        var select = document.getElementById("id_usuario");
        var option1 = document.createElement("option");
          option1.setAttribute("value", valor.id_usuario);
          var option1Texto = document.createTextNode(valor.nombres.concat(espacio).concat(valor.apellidos));
          option1.appendChild(option1Texto);

          select.appendChild(option1);
        
          document.getElementById("selectusuario").appendChild(select);
        
      })
      )
    .catch(error => console.log('error', error));

    

//clientes
fetch("http://frontend170.com:3000/api/cliente", requestOptions)
  .then((response) => response.json())
  
    .then(result => 
      
      result.forEach( function(valor, indice, array) {
        var select = document.getElementById("id_cliente");
        var option1 = document.createElement("option");
          option1.setAttribute("value", valor.id_cliente);
          var option1Texto = document.createTextNode(valor.nombres.concat(espacio).concat(valor.apellidos));
          option1.appendChild(option1Texto);

          select.appendChild(option1);
        
          document.getElementById("selectcliente").appendChild(select);
        
      })
      )
    .catch(error => console.log('error', error));
//tipo gestion
fetch("http://frontend170.com:3000/api/tipo_gestion", requestOptions)
  .then((response) => response.json())
  
    .then(result => 
      
      result.forEach( function(valor, indice, array) {
        var select = document.getElementById("id_tipo_gestion");
        var option1 = document.createElement("option");
          option1.setAttribute("value", valor.id_tipo_gestion);
          var n = new Date(valor.fecha_registro);
            var y = n.getFullYear();
            var m = n.getMonth() + 1;
            var d = n.getDate();
          
          var Fecha = " -- " + m + "/" + d + "/" + y;
          var option1Texto = document.createTextNode(valor.nombre_tipo_gestion.concat(Fecha));
          option1.appendChild(option1Texto);

          select.appendChild(option1);
        
          document.getElementById("selecttipogestion").appendChild(select);
        
      })
      )
    .catch(error => console.log('error', error));
 //tipo resultado
fetch("http://frontend170.com:3000/api/resultado", requestOptions)
  .then((response) => response.json())
  
    .then(result => 
      
      result.forEach( function(valor, indice, array) {
        var select = document.getElementById("id_resultado");
        var option1 = document.createElement("option");
          option1.setAttribute("value", valor.id_resultado);
          var n = new Date(valor.fecha_registro);
            var y = n.getFullYear();
            var m = n.getMonth() + 1;
            var d = n.getDate();
          
          var Fecha = " -- " + m + "/" + d + "/" + y;
          var option1Texto = document.createTextNode(valor.nombre_resultado.concat(Fecha));
          option1.appendChild(option1Texto);

          select.appendChild(option1);
        
          document.getElementById("selectresultado").appendChild(select);
        
      })
      )
    .catch(error => console.log('error', error));

}