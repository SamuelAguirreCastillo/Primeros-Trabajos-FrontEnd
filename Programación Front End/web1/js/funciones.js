function calcularPesoIdeal(){
    // Obtenemos la Edad
    var edad = document.getElementById("txt_edad").value;
    // Calcular Peso Ideal
    var peso_ideal = edad * 2 + 8;
    // Desplegamos el Resultado
    var contenedor_resultado = document.getElementById("cnt_resultado");
    contenedor_resultado.innerHTML = "<b>Peso Ideal : <b>" + peso_ideal;
    //Invocamos el calculo del estado peso
    calcularEstadoPeso(peso_ideal);
}
function calcularEstadoPeso(peso_ideal){
    //Obtenemos el peso actual
    var peso_actual = document.getElementById("txt_peso_actual").value;

    //Comparamos para determinar el estado de peso
    var estadoPeso=""
    var imagen=""

    if(peso_actual == peso_ideal){
        estadoPeso = "Peso Ideal";
        imagen="peso_ideal_512x512.png";
    }else{
        if(peso_actual > peso_ideal){
            estadoPeso = "Sobre Peso";
            imagen="gordo_512x512.png";
        }else{
            estadoPeso = "Bajo Peso";
            imagen="flaco_512x512.png";
        }
    }
    //Desplegamos el estado de peso
    var contenedor_estado_peso = document.getElementById("cnt_estado_peso");
    contenedor_estado_peso.innerHTML ="<b> Estado de Peso es : <b>" + estadoPeso;

    //Desplegamos una imagen segun el estado
    var contenedor_imagen = document.getElementById("cnt_imagen_estado");
    contenedor_imagen.innerHTML = "<img src=img/"+imagen+">";
}
