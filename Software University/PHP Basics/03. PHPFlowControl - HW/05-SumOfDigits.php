<!DOCTYPE html>
<html>
<head>
	<title>05. Sum of Digits</title>
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

	<form action="" method="POST">
		<label for="nums">Enter string: </label>
		<input type="text" id="nums" name="nums" />
		<input type="submit" name="submit" value="Submit" />
	</form>

	<?php
	if($_POST && isset($_POST['submit'])):
		$input = $_POST['nums'];
		$nums = explode(", ", $input);
	?>
	
	<table>
		<tbody>
			<?php 
			foreach($nums as $num):
			?>
			<tr>
				<td><?= $num ?></td>
				<td><?= getSumOfDigits($num) ?></td>
			</tr>
			<?php 
			endforeach;
			?>
		</tbody>
	</table>
	<?php 
	endif;
	
	function getSumOfDigits($num) {
		if(is_numeric($num)) {
			return array_sum(str_split($num));
		} else {
			return "I cannot sum that";
		}
	}
	?>
</body>
</html>