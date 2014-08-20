<!DOCTYPE html>
<html>
<head>
	<title>01. Print Tags</title>
</head>
<body>
	<p>Enter tags:</p>
	<form action="" method="POST">
		<input type="text" name="tags" />
		<input type="submit" name="submit" value="Submit" />
	</form>
	
	<p>
	<?php 
	if($_POST && isset($_POST['submit'])) {
		$input = $_POST['tags'];
		$tags = explode(", ", $input);
		
		for ($i = 0; $i < count($tags); $i++) {
			echo '<p>' . $i . ' : ' . $tags[$i] . '</p>';
		}
		
	}
	?>
	</p>
</body>
</html>