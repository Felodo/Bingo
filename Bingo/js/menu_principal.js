/****************************** 
Autor: Félix Lozano Domínguez
Fecha creación:      14/10/2016
Última modificación: 14/10/2016
Versión: 0.01
******************************/
var jugadores, valor;

$(function(){
    var $select = $(".nvalor");
    for (i=1;i<=20;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
});

/*$(document).ready(function(){
	$("#n_jugadores").on('input',function(e){
     alert('Comprobando')
    });
});*/

/*=========================*
 * Función OP_NUEVO
 *=========================*/
/**
 * Funcion que se encarga si el valor es numerico o no
 * @param valor - valor numerico o no
 * @returns booleano 
 */
function IsNumeric(valor) 
{ 
	var log=valor.length; 	//longitud del valor
	var sw="S"; 			//valor si
	for (x=0; x<log; x++) 	//
	{ 
		v1=valor.substr(x,1); //ascamos un caracter o digito
		v2 = parseInt(v1); 		//asignamos mediante funcion numerica entera
		
		//Compruebo si hay un caracter no numerico
		if (isNaN(v2)) { 
			sw= "N";	//valor no
		} 
	} 
	//Compruebo si es un valor numérico 
	if (sw=="S") {
		return true;
	} else {
		return false; 
	} 
} 

function Comprobar_numeros(numero)
{
	if (IsNumeric(numero)){
		if ((numero >= 5) && (numero <= 20))
			return numero;  
		else{
			numero="";
			alert("El valor " + numero + " no es un número entre 5 y 20");
		}
	}
	else{
		numero="";
		alert("El valor " + numero + " no es un número");
	}
	return (numero);
}

function Comprobar_valor(numero)
{
	if (IsNumeric(numero)){
		if ((numero >= 1) && (numero <= 5))
			return numero;  
		else{
			numero="";
			alert("El valor " + numero + " no es un número entre 5 y 20");
		}
	}
	else{
		numero="";
		alert("El valor " + numero + " no es un número");
	}
}

/*function PasarNjugadores(numero) 
{
 top.frames['right'].document.yourform.msg.value = str;
}*/



$(document).ready(function(){
	$("#btn_enviar").click(function(){
			if (($("#n_jugadores").val() >= 5) && ($("#n_jugadores").val() <= 20)){
				 jugadores = $("#n_jugadores").val();
				 valor = $("#n_valor").val();
				 window.open("../html/bingo.html", "Marco2", "status=no,toolbar=no");
			}else{
				alert("Los valores no son correctos");
			}
	});
	
	
	
	function IsNumeric(valor) 
	{ 
		var log=valor.length; 	//longitud del valor
		var sw="S"; 			//valor si
		for (x=0; x<log; x++) 	//
		{ 
			v1=valor.substr(x,1); //ascamos un caracter o digito
			v2 = parseInt(v1); 		//asignamos mediante funcion numerica entera
			
			//Compruebo si hay un caracter no numerico
			if (isNaN(v2)) { 
				sw= "N";	//valor no
			} 
		} 
		//Compruebo si es un valor numérico 
		if (sw=="S") {
			return true;
		} else {
			return false; 
		} 
	} 
});

