var g_id_tipo_gestion="";

function agregar_tipo_gestion(){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;
var fecha_registro = document.getElementById("txt_fecha_registro").value;


var raw = JSON.stringify({
  "nombre_tipo_gestion": nombre_tipo_gestion,
  "fecha_registro": fecha_registro
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://frontend170.com:3000/api/tipo_gestion/", requestOptions)
  .then(response => {
    if(response.status == 200){
      alert("Tipo gestión ingresado correctamente ");
    }else{
      alert("Error al ingresar los datos");
    }
    window.location.replace("lista_tipos_gestiones.html")
})
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
function obtener_tipos_gestiones(){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com:3000/api/tipo_gestion", requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completarFila)
  )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function completarFila (element, index, arr){
  arr[index] = document.querySelector('#tbl_tipo_gestion tbody').innerHTML +=
  `<tr>
      <td>${element.id_tipo_gestion}</td>
      <td>${element.nombre_tipo_gestion}</td>
      <td>${element.fecha_registro}</td>
      <td> 
      <a href='eliminar_tipo_gestion.html?id=${element.id_tipo_gestion}'> <img src='../img/eliminar.png'> </a> 
      <a href='actualizar_tipo_gestion.html?id=${element.id_tipo_gestion}'><img src='../img/actualizar-flecha.png'> </a>
      </td>
  </tr>`
};
function obtenerIDTipoGestion(){
  //Obtenemos la URL de la página actual
  var queryString = window.location.search;
  //Buscamos los parámetros en la URL actual
  var urlParams = new URLSearchParams(queryString);
  //Extraemos el id del Cliente
  var p_id_tipo_gestion = urlParams.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;

  //Invocamos función para consultar y desplegar los datos del cliente
  obtenerDatosTipoGestion(p_id_tipo_gestion);
}
function obtenerIDTipoGestionActualizar(){
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var p_id_tipo_gestion = urlParams.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;
  obtenerDatosTipoGestionActualizar(p_id_tipo_gestion);
}
function obtenerDatosTipoGestion(p_id_tipo_gestion){
  //incorpore aquí las instrucciones para obtener los datos del cliente
  //y mostrarlos en la página


  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com:3000/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(mostrar_datos_tipo_gestion)
  )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
function obtenerDatosTipoGestionActualizar(p_id_tipo_gestion){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com:3000/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(mostrar_datos_tipo_gestion_actualizar)
  )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
function mostrar_datos_tipo_gestion_actualizar(element, index, arr){
//Declaramos variables locales con datos del cliente a actualizar
var nombre_tipo_gestion = element.nombre_tipo_gestion;


//Completamos los input del formulario
document.getElementById("txt_nombre_tipo_gestion").value = nombre_tipo_gestion;


}
function mostrar_datos_tipo_gestion(element, index, arr){
  arr[index] = document.querySelector('#cnt_datos_tipo_gestion').innerHTML +=
  `<h3> ¿Desea eliminar a este tipo de gestion? </h3>
  <div class="alert alert-warning" role="alert"> <b>${element.nombre_tipo_gestion}</b> </div>
  `
}

function eliminar_tipo_gestion(){
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com:3000/api/tipo_gestion/"+g_id_tipo_gestion, requestOptions)
  .then(response => {
    if(response.status == 200){
      alert("Tipo gestión eliminado correctamente");
    }else{
      alert("Error al ingresar los datos");
    }
    window.location.replace("lista_tipos_gestiones.html")
  })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function actualizarTipoGestion(){
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;

var raw = JSON.stringify({
  "nombre_tipo_gestion": nombre_tipo_gestion
  
});

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://frontend170.com:3000/api/tipo_gestion/"+g_id_tipo_gestion, requestOptions)
  .then(response => {
    if(response.status == 200){
      alert("Tipo gestión actualizado correctamente");
    }else{
      alert("Error al ingresar los datos");
    }
    window.location.replace("lista_tipos_gestiones.html")
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}