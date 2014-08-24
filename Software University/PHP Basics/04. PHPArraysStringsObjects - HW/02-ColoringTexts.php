<!DOCTYPE html>
<html>
<head>
	<title>02. Coloring Texts</title>
	<style>
	.red {
		color: red;
	}
	.blue {
		color: blue;
	}
	</style>
</head>
<body>
	
	<form action="" method="POST">
	<textarea name="text"></textarea>
	<input type="submit" name="submit" value="Color Text" />
	</form>
	
	<?php
	if ($_POST && isset($_POST['submit'])) {
		$text = $_POST['text'];
		
		for ($ch = 0; $ch < strlen($text); $ch++) {
			$asciiValue = ord($text[$ch]);
			if ($asciiValue % 2 == 0) {
				echo '<span class="red">' . $text[$ch] . ' </span>';
			} else {
				echo '<span class="blue">' . $text[$ch] . ' </span>';
			}
		}
	}
	?>
</body>
</html>