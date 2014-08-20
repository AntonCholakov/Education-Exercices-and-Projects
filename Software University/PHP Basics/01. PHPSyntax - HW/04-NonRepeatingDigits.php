<?php
$n = 247;
$results = array();

for ($i = 102; $i <= $n; $i++) {
	
	if($i > 999) {
		break;
	}
	
	//convert the number to a string
	$currentNumAsStr = (string)$i;
	
	if(($currentNumAsStr[0] !== $currentNumAsStr[1]) && ($currentNumAsStr[1] !== $currentNumAsStr[2]) && 
		($currentNumAsStr[0] !== $currentNumAsStr[2])) {
		array_push($results, $i);
	}
	
}

if (count($results) == 0) {
	echo "no";
} else {
	echo implode(', ', $results);
}