<?php 

$listanumeros = $_REQUEST['data1'];

$max = 0;
$num_aleatorio = 0;
$contador=0;

$max = sizeof($listanumeros);
if($max > 0){
	do{
		$num_aleatorio = rand(0,90);
		for($i = 0; $i < $max; $i++){
			if($num_aleatorio == $listanumeros[$i])
				$contador++;
		}
		
	}while($contador == 1);
}

echo $num_aleatorio;
?>