<!DOCTYPE html>
<html>
<head>
	<title>03. Show Annual Expenses</title>
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
		<label for="years">Enter number of years: </label>
		<input type="text" id="years" name="years" />
		<input type="submit" name="submit" value="Show costs" />
	</form>

	<?php	
	if($_GET && isset($_GET['submit'])):
		$years = $_GET['years'];
	?>
	
	<table>
	
		<thead>
			<tr>
				<td>Year</td>
				<td>January</td>
				<td>February</td>
				<td>March</td>
				<td>April</td>
				<td>May</td>
				<td>June</td>
				<td>July</td>
				<td>August</td>
				<td>September</td>
				<td>October</td>
				<td>November</td>
				<td>December</td>
				<td>Total:</td>
			</tr>
		</thead>
		
		<tbody>
			<?php 
			for($year = 2014; $year >= 2014 - $years; $year--):
				$total = 0;
			?>
			<tr>
				<td><?= $year ?></td>
				<?php 
				for($month = 1; $month <= 12; $month++):
				?>
					<td>
						<?php 
							$cost = rand(0, 999);
							echo $cost;
							$total += $cost
						?>
					</td>
				<?php
				endfor;
				?>
					<td>
					<?= $total ?>
					</td>
			</tr>			
			<?php 
			endfor;
			?>
		</tbody>
		
	</table>
	<?php 
	endif;
	?>
</body>
</html>