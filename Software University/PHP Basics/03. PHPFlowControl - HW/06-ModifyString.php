<!DOCTYPE html>
<html>
<head>
	<title>06. Modify String</title>
</head>
<body>
	
	<form action="" method="GET">
		<input type="text" name="string" />
		<input type="radio" name="modifier" id="checkPalindrome" value="checkPalindrome" />
		<label for="checkPalindrome">Check Palindrome</label>
		<input type="radio" name="modifier" id="reverseString" value="reverseString" />
		<label for="reverseString">Reverse String</label>
		<input type="radio" name="modifier" id="spliter" value="spliter" />
		<label for="spliter">Split</label>
		<input type="radio" name="modifier" id="hashString" value="hashString" />
		<label for="hashString">Hash String</label>
		<input type="radio" name="modifier" id="shuffleString" value="shuffleString" />
		<label for="shuffleString">Shuffle String</label>
		<input type="submit" name="submit" value="Submit" />
	</form>
	
	<?php 
	if ($_GET && isset($_GET['submit'])) {
		$modifier = $_GET['modifier'];
		$string = $_GET['string'];
		switch ($modifier) {
			case "checkPalindrome": 
				echo $string . checkPalindrome($string);
				break;
			case "reverseString":
				echo reverseString($string);
				break;
			case "spliter":
				echo spliter($string);
				break;
			case "hashString":
				echo hashString($string);
				break;
			case "shuffleString":
				echo shuffleString($string);
				break;
		}
	}
	
	function checkPalindrome($str) {
		$str = strtolower($str);
		$reversed = strrev($str);
		
		if ($str == $reversed) {
			return " is a palindrom";
		} else {
			return " is not a palindrom";
		}
		
	}
	function reverseString($str) {
		return strrev($str);
	}
	function spliter($str) {
		$str = trim($str);
		$arr = str_split($str);
		return implode(" ", $arr);
	}
	function hashString($str) {
		$crypted = crypt($str);
		return $crypted;
	}
	function shuffleString($str) {
		$arr = str_split($str);
		shuffle($arr);
		return implode("", $arr);
	}
	?>
	
</body>
</html>