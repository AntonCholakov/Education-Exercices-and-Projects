<!DOCTYPE html>
<html>
<head>
	<title>02. Most Frequent Tag</title>
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
		$result = array_count_values($tags);
	
		$max = array_search(max($result), $result);
		arsort($result);
		foreach ($result as $key => $value) {
			echo "$key : $value times <br>";
		}
		
		echo "<p>Most Frequent Tag is: $max </p>";
	
	}
	?>
	</p>
</body>
</html>