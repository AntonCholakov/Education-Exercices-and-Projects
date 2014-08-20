<!DOCTYPE html>
<html>
<head>
	<title>03. Calculate Interest</title>
</head>
<body>

	<form action="" method="POST">
		<label for="amount">Enter amount </label>
		<input type="text" id="amount" name="amount" />
		<br>
		<input type="radio" name="currency" id="usd" value="usd" /><label for="usd"> USD</label>
    	<input type="radio" name="currency" id="eur" value="eur" /><label for="eur"> EUR</label>
    	<input type="radio" name="currency" id="bgn" value="bgn" /><label for="bgn"> BGN</label>
    	<br>
		<label for="interest">Compound Interest Amount </label>
		<input type="text" id="interest" name="interest" />
		<br>
		<select name="period-months">
	        <option value="6">6 Months</option>
	        <option value="12">1 Year</option>
	        <option value="24">2 Years</option>
	        <option value="60">5 Years</option>
	    </select>
	    <input type="submit" name="submit" value="Calculate">
		
	</form>
	
	<?php 
	if ($_POST && isset($_POST['submit'])) {
		$amount = $_POST['amount'];
		$currency = $_POST['currency'];
		$interest = $_POST['interest'];
		$periodInMonths = $_POST['period-months'];
		
		$value = $amount * pow(1 + ($interest / 100) / 12, 12 * ($periodInMonths / 12));
		
		echo "<p>" . formatCurrency($value, $currency) . "</p>";
		
	}
	
	function formatCurrency($amount, $currency) {
		$roundedAmount = round($amount, 2);
		switch ($currency) {
			case "usd":
				return "$ " . $roundedAmount;
			case "eur":
				return "И " . $roundedAmount;
			case "bgn":
				return $roundedAmount . " ыт.";
			default:
				return $roundedAmount;
		}
	}
	
	?>
	
</body>
</html>