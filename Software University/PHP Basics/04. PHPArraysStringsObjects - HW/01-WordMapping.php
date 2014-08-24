<!DOCTYPE html>
<html>
<head>
	<title>01. Word Mapping</title>
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
		<textarea name="text"></textarea>
		<input type="submit" name="submit" value="Count Words" />
	</form>

	<?php 
	if ($_POST && isset($_POST['submit'])):
		$input = strtolower($_POST['text']);
		$words = preg_split('/\W+/', $input, -1, PREG_SPLIT_NO_EMPTY);
		
		$wordMap = array();
		foreach ($words as $word) {
			if (isset($wordMap[$word])) {
				$wordMap[$word]++;
			} else {
				$wordMap[$word] = 1;
			}
		}
	?>
	
	<table>
		<?php 
		foreach ($wordMap as $word => $count):
		?>
			<tr>
				<td><?= $word ?></td>
				<td><?= $count ?></td>
			</tr>
		<?php 
		endforeach;
		?>
	</table>
	
	<?php 
	endif;
	?>
	
</body>
</html>