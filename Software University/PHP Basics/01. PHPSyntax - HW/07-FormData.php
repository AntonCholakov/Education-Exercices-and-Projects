<!DOCTYPE html>
<html>
<head>
	<title>07. Form Data</title>
	<style>
		input[type="text"] {
			display: block;
			margin: 12px 8px;
			padding: 4px;
		}
	</style>
</head>
<body>
	<form action="07-FormData.php" method="GET">
		<input type="text" name="name" placeholder="Name" />
		<input type="text" name="age" placeholder="Age" />
		<input type="radio" name="gender" id="male" value="male" /><label for="male"> Male</label>
    	<input type="radio" name="gender" id="female" value="female" /><label for="female"> Female</label>
    	<input type="submit" value="Submit" />
	</form>
	
	<p>
		<?php 
			if (isset($_GET['name']) && isset($_GET['age']) && isset($_GET['gender'])) {
				echo "My name is {$_GET['name']}. I am {$_GET['age']} years old. I am {$_GET['gender']}.";
			} else {
				echo "You missed to give some info.";
			}
		?>
	</p>
	
</body>
</html>


