<!DOCTYPE html>
<html>
<head>
	<title>02. Car Randomizer</title>
	<style>
		table {
  			border-collapse: collapse;
		}
		
		table thead tr td {
			background: #445566!important;
			color: #fff;
		}
		
		table td {
		    border: solid 1px #cecece;
		    padding: 12px;
		}
		
		table td:first-child {
		    font-style: italic;
		    background: #9056df;
		    color: #fff;
		}
	</style>
</head>
<body>

	<form action="" method="GET">
		<label for="cars">Enter cars </label>
		<input type="text" id="cars" name="cars" />
		<input type="submit" name="submit" value="Show result" />
	</form>

	<?php 
	function generateRandomColor() {
		$colors = array("Red", "Yellow", "Blue", "Black", "White");
		return $colors[rand(0, count($colors) - 1)];
	}
	
	function generateRandomQuantity() {
		return rand(1, 5);
	}
	
	if($_GET && isset($_GET['submit'])):
		$input = $_GET['cars'];
		$cars = explode(", ", $input);	
	?>
	
	<table>
	
		<thead>
			<tr>
				<td>Car</td>
				<td>Color</td>
				<td>Count</td>
			</tr>
		</thead>
		
		<tbody>
			<?php 
			foreach($cars as $car):
			?>
			<tr>
				<td><?= $car ?></td>
				<td><?= generateRandomColor() ?></td>
				<td><?= generateRandomQuantity() ?></td>
			</tr>
			<?php 
			endforeach;
			?>
		</tbody>
		
	</table>
	<?php 
	endif;
	?>
</body>
</html>