<?php
$month = date("F"); // full name of the current Month
$year = date("Y"); // full representation of the current Year - 4 digit
$totalDays = date("t"); // total days in the month

for($i = 1; $i <= $totalDays; $i++) {
	$date = strtotime("$i $month $year");
	if(date("l", $date) == "Sunday") { // where l is the full text representation of the day
		echo "<p>" . date("jS F, Y", $date) . "</p>";
	}
}