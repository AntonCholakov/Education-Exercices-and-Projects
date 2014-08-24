<!DOCTYPE html>
<html>
<head>
	<title>04. Text Filter</title>
</head>
<body>
	
	<form action="" method="POST">
		<label for="text">Text:</label>
		<textarea id="text" name="text"></textarea><br>
		<label for="banned">Ban-list</label>
		<input type="text" id="banned" name="banned" /><br>
		<input type="submit" name="submit" />
	</form>
	
	<?php
	if ($_POST && isset($_POST['submit'])) {
		$text = $_POST['text'];
		$banlist = preg_split("/[\s,]+/", $_POST['banned']);
		$words = preg_split("/\W+/", $text);
		
		foreach ($banlist as $banWord) {
			$regex = "/". $banWord . "/";
			$length = mb_strlen($banWord);
			$text = preg_replace($regex, str_repeat("*", $length), $text);
		}
		
		echo "<p>$text</p>";
	}
	?>
</body>
</html>