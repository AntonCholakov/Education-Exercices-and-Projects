<!DOCTYPE html>
<html>
<head>
	<title>04. Tags Counter</title>
</head>
<body>
	
	<form action="" method="POST">
		<label for="tags">Enter HTML tags:</label><br>
		<input type="text" name="tags" id="tags" />
		<input type="submit" name="submit" value="Submit" />
	</form>
	<?php 
	session_start();
	$tags = array("!doctype", "a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big",
			"blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "command",
			"datalist", "dd", "del", "details", "dfn", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption",
			"figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header",
			"hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link",
			"map", "mark", "menu", "meta", "meter", "nav", "noframes", "noscript", "object", "ol", "optgroup", "option", "p",
			"param", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source",
			"span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th",
			"time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr");
	if($_POST && isset($_POST['submit'])) {
		$tag = strtolower(htmlentities($_POST['tags']));
		if(in_array($tag, $tags)){
			if(isset($_SESSION['counter'])){
				$_SESSION['counter']++;
			} else {
				$_SESSION['counter'] = 1;
			}
			echo "<p>Valid HTML Tag!</p>";
			echo "<p>Score: " . $_SESSION['counter'] . "</p>";
		} else {
			echo "<p>Invalid HTML Tag!<br>";
			echo "<p>Score still: " . $_SESSION['counter'] . "</p>";
		}
	}
	?>
</body>
</html>