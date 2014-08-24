<!DOCTYPE html>
<html>
<head>
	<title>05. Sentence extractor</title>
</head>
<body>

	<form action="" method="POST">
		<label for="text">Text:</label>
		<textarea id="text" name="text"></textarea><br>
		<label for="word">Word: </label>
		<input type="text" id="word" name="word" /><br>
		<input type="submit" name="submit" />
	</form>
	
	<?php
	if ($_POST && isset($_POST['submit'])) {
		$text = $_POST['text'];
		$word = $_POST['word'];
		
		$sentences = preg_split('/(?<=[.?!])\s+/', $text, 0, PREG_SPLIT_NO_EMPTY);
		
		foreach ($sentences as $sentence) {
			$sentencePattern = '/\s+' . $word . '\s+.*[!?.]+$/';
			if(preg_match($sentencePattern, $sentence)) {
				echo "$sentence<br>";
			}
		}
	}
	?>
</html>