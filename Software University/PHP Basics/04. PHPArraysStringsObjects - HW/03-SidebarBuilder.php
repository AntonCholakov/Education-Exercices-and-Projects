<!DOCTYPE html>
<html>
<head>
	<title>03. Sidebar Builder</title>
	<style>
		article {
			border: 1px solid $070707;
			border-radius: 12px;
			width: 210px;
			background: #445566;
			color: #cdcdcd;
			padding: 14px;
			margin: 8px;
		}
		h2 {
			border-bottom: 1px solid #111;
		}
		ul {
			list-style: none;
		}
		
	</style>
</head>
<body>
	
	<form action="" method="POST">
	<label for="categories">Categories: </label>
	<input type="text" id="categories" name="categories" /><br>
	<label for="tags">Tags: </label>
	<input type="text" id="tags" name="tags" /><br>
	<label for="months">Months: </label>
	<input type="text" id="months" name="months" /><br>
	<input type="submit" name="submit" value="Generate" />
	</form>
	
	<?php
	if ($_POST && isset($_POST['submit'])) {
		$categories = preg_split("/[\s,]+/", $_POST['categories']);
		$tags = preg_split("/[\s,]+/", $_POST['tags']);
		$months = preg_split("/[\s,]+/", $_POST['months']);

		
		function generateSidebar($title, $elements) {
			echo "<article>";
			echo "<h2>$title</h2>";
			echo "<ul>";
			foreach ($elements as $element) {
				echo "<li>" . $element . "</li>";
			}
			echo "</ul></article>";
		}		

		generateSidebar("Categories", $categories);
		generateSidebar("Tags", $tags);
		generateSidebar("Months", $months);
	}
	?>
</body>
</html>