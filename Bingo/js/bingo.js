/****************************** 
Autor: Félix Lozano Domínguez
Fecha creación:      16/01/2017
Última modificación: 16/01/2017
Versión: 0.01
*******************************/
var numero_jugadores, numero_valor;
window.load = function(){
	numero_jugadores = window.opener.jugadores;
	numero_valor = window.opener.valor;
}

//==========================//
// - FUNCION GENERA TABLA	//
//==========================//
/**
 * Funcion que se encarga de generar la tabla del carton de bingo
 * @returns No devuelve resultado
 */
function genera_tabla() {
	
	var elemento_zonadibujo = document.getElementById("cartonbingo"); //Asignamos el elemento "cartonbingo" a una variable 
	var elemento_tabla = document.createElement("table"); //Creamos un elemento "table"
	table = elemento_tabla.createCaption(); //Creamos un Caption en la tabla
	table.innerHTML = "<b>Haga CLICK en cualquier celda para marcar los numeros indicados</b>";
	var tabla_body = document.createElement("tbody"); //Creamos un elemento para el cuerpo de la tabla
	tabla_body.setAttribute("id", "tbody");
	var numero_cell =0; 
	for(var i = 0; i < 3; i++){
		var fila = document.createElement("tr"); //creamos la fila 
		fila.setAttribute("id", "tr"+i); //añadimos el atributo "id"
		for(var j = 0; j < 9; j++){
			var celda = document.createElement("td"); //creamos la celda
			celda.setAttribute("id", "cell"+i+""+j); //añadimos el atributo "id"
			celda.setAttribute("class", "boton_blanco"); //añadimos el atributo "class"
			celda.style.width = "10px";	//añadimos el estilo ancho 10px
			celda.style.height = "10px"; //añadimos el estilo altura 10px
			fila.appendChild(celda); //añadimos el hijo de fila(celda)
			numero_cell++;
		}
		tabla_body.appendChild(fila); //añadimos el hijo del cuerpo de la tabla(fila)
	}
	
	elemento_tabla.appendChild(tabla_body); //añadimos el hijo de la tabla(tabla_body)
	elemento_zonadibujo.appendChild(elemento_tabla); //Añadimos el hijo del elemento(elemento_tabla)
	elemento_tabla.setAttribute("border", "2"); //añadimos el atributo del borde de la tabla
}

//function genera_tabla 

/**
 * 
 */
$(document).ready(function(){
	//================//
	//	VARIABLES     //
	//================//
	
	//Tiempo
	var tiempo1 = 10;
	var tiempo2 = 10;
	
	//Variables recibidas desde menu_principal.
	numero_jugadores = window.opener.jugadores; //Numero de jugadores, incluido tu
	numero_valor = window.opener.valor; //Numero de valor
	
	//lista de numeros del cartón de bingo (Tu cartón)[9][3]
	var array_listacarton = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
	
	var numero_oponentes = parseInt(numero_jugadores) - 1; //Total de oponentes
	var lista_jugadores = new Array(numero_oponentes); //array de la lista de jugadores
	var numeros_bingo = 15; //Total de números de un carton
	var numeros = 90; //Un bingo 90 es de 0 a 90
	
	//lista de numeros del cartón de bingo (oponentes)
	var listacarton = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

	//Contador de Bingo
	var count = 0; // Tu contador
	var oponentes = parseInt(numero_jugadores) - 1; //oponentes
	$("#numero_player").html(numero_jugadores+" ("+oponentes+" oponentes)");
	var contador_bingo = new Array(oponentes); //Condador de los oponentes
	
	//Asignamos el valor 0 al contador de aciertos del contrario
	for(var d = 0; d < oponentes; d++){
		contador_bingo[d] = 0; //Contador contrario
		//$("#user"+d).html(contador_bingo[d]);
	}
	
	//Array de ganadores
	var pos_ganadores = new Array();
	
	//Lista de numeros 
	var listaBingo = new Array();
	//Lista de numeros posibles
	var listanumero = new Array();
	
	for(var d = 1; d <= 90; d++)
		listanumero.push(d);
	
	var usados = new Array();
	var array_pos = new Array();

	var usados_p = new Array();
	var arrayPos_usados = new Array();
	
	var numero_usuarios;
	
	generarArray();
	GenerarArray_opositores();
	ordena_array();
	llenar_celdas();
	vaciar_celdas();
	
	//=======================//
	// - FUNCIÓN REPETIDO	 //
	//=======================//
	/**
	 * Función que comprueba si se ha repetido un numero del array del cartón de bingo
	 * @param num
	 * @returns repe devuelve booleano (true or false)
	 */
	function repetido(num){ //Recibe un número
		var repe = false; //booleano que asigna falso
		for (i=0; i < usados.length; i++) { //Lista de numeros usados
			if (num == usados[i]) { //Comprueba si existe ese numero
					repe = true; //Si hay
			}
		}
		return repe; //devuelva el resultado
	}
	
	//=======================//
	// - FUNCIÓN ALEATORIO	 //
	//=======================//
	/**
	 * Función que elige un número aleatorio ÚNICO para el array del cartón de bingo
	 * @param min es el número minimo
	 * @param max es el número maximo
	 * @returns num devuelve el numero aleatorio
	 */
	function aleatorio(min, max) //Recibe el minimo y el maximo 
	{
		do{
				var num = Math.floor(Math.random()*(max-min+1))+min; //se elige un numero aleatorio entre el minimo y el maximo
				var repe = repetido(num); //se comprueba si esta repetido
		}while(repe != false); //Si es distinto de falso (verdadero) se vuelva a realizar la operacion
		usados.push(num); // se añade al array de numeros usados
		return num;	 //devuelve el numero aleatorio
		
	}
	
	//===========================//
	// - FUNCIÓN GENERARaRRAY	 //
	//===========================//
	/**
	 * Función que asigna en cada celda del carton un número aleatorio 
	 */
	function generarArray() {
		for(var j = 0; j < 9; j++){
		
			for(var i = 0; i < 3; i++){
			
				var repe = false;
				if(j == 0){
					 //$('#IMG').
					array_listacarton[j][i] = aleatorio(1,9);
				}else if(j == 1){
					array_listacarton[j][i] = aleatorio(10,19);
				}else if(j == 2){
					array_listacarton[j][i] = aleatorio(20,29);
				}else if(j == 3){
					array_listacarton[j][i] = aleatorio(30,39);
				}else if(j == 4){
					array_listacarton[j][i] = aleatorio(40,49);
				}else if(j == 5){
					array_listacarton[j][i] = aleatorio(50,59);
				}else if(j == 6){
					array_listacarton[j][i] = aleatorio(60,69);
				}else if(j == 7){
					array_listacarton[j][i] = aleatorio(70,79);
				}else if(j == 8){
					array_listacarton[j][i] = aleatorio(80,90);
				}
			}
		}
	}
	
	//===========================//
	// - FUNCIÓN ORDENA ARRAY	 //
	//===========================//
	/**
	 * Función que ordena las columnas del cartón
	 */
	function ordena_array() {
		array_listacarton.sort(function (a, b){
		    return (b.value - a.value);
		})
	}
	
	//===========================//
	// - FUNCIÓN LLENAR CELDAS	 //
	//===========================//
	/**
	 * Función que llena las celdas de la tabla
	 */
	function llenar_celdas(){
		for(var j = 0; j < 9; j++){ 
			for(var i = 0; i < 3; i++){
			
				$("#cell"+i+""+j).html(array_listacarton[j][i]); //asigna el valor del array en el html
			}
		}
	}
	
	//===========================//
	// - FUNCIÓN VACIAR CELDAS	 //
	//===========================//
	/**
	 * Función que vacia las celdas de la tabla
	 */
	function vaciar_celdas(){
		var pos1, pos2, pos3, pos4; //posiciones vacias
		for(var i = 0; i < 3; i++){
			
			//Asignamos las posiciones que vamos a vaciar
			pos1 = Math.floor(Math.random()*(8-0+1))+0; 
			pos2 = Math.floor(Math.random()*(8-0+1))+0;
			pos3 = Math.floor(Math.random()*(8-0+1))+0;
			pos4 = Math.floor(Math.random()*(8-0+1))+0;
			
			//Comprobamos que no se repeiten las posiciones
			while(pos1 == pos2 || pos1 == pos3 || pos1 == pos4){
				pos1 = Math.floor(Math.random()*(8-0+1))+0;
			}
			
			//Comprobamos que no se repeiten las posiciones
			while(pos1 == pos2 || pos2 == pos3 || pos2 == pos4){
				pos2 = Math.floor(Math.random()*(8-0+1))+0;
			}
			
			//Comprobamos que no se repeiten las posiciones
			while(pos1 == pos3 || pos3 == pos2 || pos3 == pos4){
				pos3 = Math.floor(Math.random()*(8-0+1))+0;
			}
			
			//Comprobamos que no se repeiten las posiciones
			while(pos1 == pos4 || pos4 == pos3 || pos2 == pos4){
				pos4 = Math.floor(Math.random()*(8-0+1))+0;
			}
			
			for(var j = 0; j < 9; j++){
				if(pos1 == j){
					array_listacarton[j][i] = "vacio";
					$("#cell"+i+""+j).css('background-image', 'url(../img/bingo.png)');
					$("#cell"+i+""+j).html("vacio");
				}
				if(pos2 == j){
					array_listacarton[j][i] = "vacio";
					$("#cell"+i+""+j).css('background-image', 'url(../img/bingo.png)');
					$("#cell"+i+""+j).html("vacio");
				}
				if(pos3 == j){
					array_listacarton[j][i] = "vacio";
					$("#cell"+i+""+j).css('background-image', 'url(../img/bingo.png)');
					$("#cell"+i+""+j).html("vacio");
				}
				if(pos4 == j){
					array_listacarton[j][i] = "vacio";
					$("#cell"+i+""+j).css('background-image', 'url(../img/bingo.png)');
					$("#cell"+i+""+j).html("vacio");
				}
			}
		}
	}
	
	
	//=======================================//
	// - FUNCIÓN GENERAR ARRAY OPOSITORES	 //
	//=======================================//
	/**
	 * Función que genera el array de los rivales
	 */
	function GenerarArray_opositores(){
		for(var i = 0; i < lista_jugadores.length; i++){
			var listacarton = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			for(var j = 0; j < 15; j++){
				listacarton[j] = Math.floor(Math.random()*(90-1+1))+1;
			}
			lista_jugadores[i] = listacarton;
		}
	}
	
	//=======================================//
	// - FUNCIÓN GENERAR ARRAY OPOSITORES	 //
	//=======================================//
	/**
	 * Función que comprueba si ha salido bingo en los jugadores
	 */
	function Bingo_opositores(valor){
		//var num_ganadores = 0; //numero de 
		
		for(var i = 0; i < lista_jugadores.length; i++){
			for(var j = 0; j < 15; j++){
				//
				if(lista_jugadores[i][j] == valor){
					contador_bingo[i]++; //contador de aciertos
					
					//$("#user"+i).html(contador_bingo[i]);
					if(contador_bingo[i] == 15){
						
						//var num_player = i + 1;
						
						pos_ganadores.push(i); //añadimos jugador ganador
						
						/*alert("Ha ganado el jugador "+num_player+" \n\n " +
								"El premio son "+numero_valor*numero_jugadores+" euros");*/
						
						clearInterval(refreshIntervalId); //paramos el intervalo
						clearInterval(refreshIntervalId2); //paramos el intervalo
						
						//break;
					}
				}
			}
		}
		
		//Comprobamos si es un unico ganador
		if(pos_ganadores.length == 1){ 
			var num_player = pos_ganadores[0] + 1; //Nombramos el jugador
			
			//Mostramos el mensaje
			alert("Ha ganado el jugador "+num_player+" \n\n " +
					"El premio son "+numero_valor*numero_jugadores+" euros");
			clearInterval(refreshIntervalId); //paramos el intervalo
		}else if(pos_ganadores.length > 1){ //Comprobamos si hay mas de un ganador
			for(var j = 0; j < pos_ganadores.length; j++){
				var num_player = pos_ganadores[j] + 1; //Nombramos el jugador
				
				//Mostramos el mensaje; se reparte los beneficios
				alert("Ha ganado el jugador "+num_player+" \n\n " +
						"El premio son "+numero_valor*numero_jugadores/pos_ganadores.length+" euros");
			}
			clearInterval(refreshIntervalId); //paramos el intervalo
		}
	}
	
	//Bola
	$('#nbombo').html("Vamos");
    //var pe = new PeriodicalExecuter(seleccionbombo, 1); // Llamar la función cada segundo
    var valor; //valor de numero que ha salido
    var contador = 0; //contador de 1 a 90
    var contador_1 =0;
    
    //Variable que refresca los cambios por un determinado tiempo
    var refreshIntervalId =setInterval(function(){ 
    	var cont_error =0, cont=0; //contador de errores 
    	var pos; //posicion
    	
    	//Proceso de ajax
    	$.ajax({
    			
    	        data:  {"data1":listanumero}, //variable que almacena todas los numeros de 1 a 90
    	        method: "POST", //usamos POST
    	        url:   '../php/bombo.php', //llamamos el fichero bombo.php
    	        success:  function (data) {
    	        	//valor = data;
    	        	$('#nbombo').html(data); //devuelve data el valor y lo asigna como html
    	        	valor = $('#nbombo').html(); //asigna el valor de nbombo
    	        	listaBingo.push(valor); //añade el valor en listabingo
    	        	
    	        	for(var d =0; d < listanumero.length; d++){
    	        		if(listanumero[d] == valor){
    	        			pos = d;
    	        		}
    	        	}
    	        	
    	        	listanumero.slice(pos, 1);	//es eliminado el valor en la lista de numeros
    	         	
    	       	 	Bingo_opositores(valor); //Comprobamos si se ha acertado
    	        	
    	        	
    	        }
    	});
    	contador++;	//se suma 1 al contador hasta 90
    	if (contador>=90){
        		clearInterval(refreshIntervalId);	//Se para el proceso

    	}	
    }, tiempo1);
    
    var refreshIntervalId2 =setInterval(function(){ 
    	
    	$("#td"+contador_1).html(valor);
    	contador_1++;
    	if(contador_1 == 9)
    		contador_1 = 0;
    	if (contador>=90){
    		clearInterval(refreshIntervalId2);	
    	}
    }, tiempo2);

    //Funcion que se activa con un clic en el boton de bingo y se compreba si se ha acertado
	$('#btnbingo').click(function(){
		for(var a =0; a < listaBingo.length; a++){
			for(var i = 0; i < 3; i++){
				for(var j = 0; j < 9; j++){
					if(array_listacarton[j][i] == listaBingo[a])
						count++ //Contador de aciertos
					//alert("("+a+")"+listaBingo[a]+" -> "+array_listacarton[j][i]);
				}
			}
		}
		//Comprueba si se ha acertado todos los numeros
		if(count >= 15){
			alert("Felicidades Campeon \n\n " +
					"El premio es "+numero_valor*numero_jugadores+" euros");
			clearInterval(refreshIntervalId); //Se para el proceso
			clearInterval(refreshIntervalId2);	
		}
		else
			alert("Incorrecto, sigue jugando \n\nAciertos: "+count);
	});
	$('td').click(function(){
		var toggle = this.style;
		toggle.backgroundColor = toggle.backgroundColor? "":"#333";
		toggle.color = toggle.color? "":"#fff";
	});
	
});