var g_id_resultado="";

function agregar_resultado(){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var nombre_resultado = document.getElementById("txt_nombre_resultado").value;
  var fecha_registro = document.getElementById("txt_fecha_registro").value;
  
  var raw = JSON.stringify({
    "nombre_resultado": nombre_resultado,
    "fecha_registro": fecha_registro
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com:3000/api/resultado", requestOptions)
  .then(response => {
    if(response.status == 200){
      alert("Resultado agregado correctamente");
    }else{
      alert("Error al ingresar los datos");
    }
    window.location.replace("lista_resultados.html")
})
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function obtener_resultados(){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com:3000/api/resultado", requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completarFila)
  )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function completarFila (element, index, arr){
  arr[index] = document.querySelector('#tbl_resultados tbody').innerHTML +=
  `<tr>
      <td>${element.id_resultado}</td>
      <td>${element.nombre_resultado}</td>
      <td>${element.fecha_registro}</td>
      <td> 
      <a href='eliminar_resultado.html?id=${element.id_resultado}'> <img src='../img/eliminar.png'> </a> 
      <a href='actualizar_resultado.html?id=${element.id_resultado}'><img src='../img/actualizar-flecha.png'> </a>
      </td>
  </tr>`
};
function obtenerIDResultado(){
  //Obtenemos la URL de la página actual
  var queryString = window.location.search;
  //Buscamos los parámetros en la URL actual
  var urlParams = new URLSearchParams(queryString);
  //Extraemos el id del Cliente
  var p_id_resultado = urlParams.get('id');
  g_id_resultado = p_id_resultado;

  //Invocamos función para consultar y desplegar los datos del cliente
  obtenerDatosResultados(p_id_resultado);
}
function obtenerIDResultadoActualizar(){
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var p_id_resultado = urlParams.get('id');
  g_id_resultado = p_id_resultado;
  obtenerDatosResultadoActualizar(p_id_resultado);
}
function obtenerDatosResultados(p_id_resultado){
  //incorpore aquí las instrucciones para obtener los datos del cliente
  //y mostrarlos en la página


  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com:3000/api/resultado/"+p_id_resultado, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(mostrar_datos_resultado)
  )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
function obtenerDatosResultadoActualizar(p_id_resultado){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com:3000/api/resultado/"+p_id_resultado, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(mostrar_datos_resultado_actualizar)
  )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
function mostrar_datos_resultado_actualizar(element, index, arr){
//Declaramos variables locales con datos del cliente a actualizar
var nombre_resultado = element.nombre_resultado;


//Completamos los input del formulario
document.getElementById("txt_nombre_resultado").value = nombre_resultado;


}
function mostrar_datos_resultado(element, index, arr){
  arr[index] = document.querySelector('#cnt_datos_resultado').innerHTML +=
  `<h3> ¿Desea eliminar este resultado? </h3>
  <div class="alert alert-warning" role="alert"> <b>${element.nombre_resultado}</b> </div>
  `
}

function eliminar_resultado(){
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com:3000/api/resultado/"+g_id_resultado, requestOptions)
  .then(response => {
    if(response.status == 200){
      alert("Resultado eliminado correctamente");
    }else{
      alert("Error al ingresar los datos");
    }
    window.location.replace("lista_resultados.html")
  })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function actualizarResultado(){
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var nombre_resultado = document.getElementById("txt_nombre_resultado").value;

var raw = JSON.stringify({
  "nombre_resultado": nombre_resultado
  
});

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://frontend170.com:3000/api/resultado/"+g_id_resultado, requestOptions)
  .then(response => {
    if(response.status == 200){
      alert("Resultado actualizado correctamente");
    }else{
      alert("Error al ingresar los datos");
    }
    window.location.replace("lista_resultados.html")
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}