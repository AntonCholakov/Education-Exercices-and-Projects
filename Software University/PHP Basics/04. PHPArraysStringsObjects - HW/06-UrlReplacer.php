<!DOCTYPE html>
<html>
<head>
	<title>06. URL Replacer</title>
</head>
<body>

	<form action="" method="POST">
		<label for="text">Text:</label>
		<textarea id="text" name="text"></textarea><br>
		<input type="submit" name="submit" />
	</form>
	
	
	<?php
	
	//<a href="http://softuni.bg">
	//[URL=http://softuni.bg]
	
	if ($_POST && isset($_POST['submit'])) {
		$text = ($_POST['text']);
		$text = str_replace('</a>', '[/URL]', $text);
		$text = preg_replace('/<a href="(.*?)">/', '[URL=\1]', $text);
		echo "<p>" . htmlentities($text) . '</p>';
	}
	?>
</html>