<!DOCTYPE html>
<html>
<head>
	<title>05. CV Generator</title>
	<style>
		table {
  			border-collapse: collapse;
		}
		
		table thead tr td {
			background: #445566!important;
			color: #fff;
		}
		
		table td {
		    border: solid 1px #cecece;
		    padding: 12px;
		}
		
		table td:first-child {
		    font-style: italic;
		    background: #9056df;
		    color: #fff;
		}
	</style>
</head>
<body>

	<form action="" method="POST">
		<fieldset>
		    <legend>Personal information</legend>
		    <input type="text" name="fname" placeholder="First Name" /><br>
		    <input type="text" name="lname" placeholder="Last Name" /><br>
		    <input type="text" name="email" placeholder="Email" /><br>
		    <input type="text" name="phone" placeholder="Phone Number" /><br>
		    <label for="female">Female </label><input type="radio" name="gender" id="female" value="Female" />
		    <label for="male">Male </label><input type="radio" name="gender" id="male" value="Male" /><br>
		    <label for="b-date">Birth Date</label><br>
		    <input type="date" name="b-date" id="b-date" /><br>
		    <label for="nationality">Nationality</label>
		    <select name="nationality" id="nationality">
		    	<option value="Bulgarian">Bulgarian</option>
		    	<option value="Bulgarian">Chinese</option>
		    	<option value="Bulgarian">Mongolian</option>
		    </select>
  		</fieldset>
  		<fieldset>
		    <legend>Last Work Position</legend>
		    <label for="company-name">Company Name </label>
		    <input type="text" id="company-name" name="company-name" /><br>
		    <label for="from-date">From </label>
		    <input type="date" name="from-date" id="from-date" /><br>
		    <label for="to-date">To </label>
		    <input type="date" name="to-date" id="to-date" /><br>
  		</fieldset>
  		<fieldset>
		    <legend>Computer Skills</legend>
		    <label for="pc-languages">Programming Languages</label><br/>
	        <input type="text" name="pc-lang[]" id="pc-languages"/>
	        <select name="pc-level[]">
	            <option value="Beginner">Beginner</option>
	            <option value="Programmer">Programmer</option>
	            <option value="Ninja">Ninja</option>
	        </select><br/>
	        <div id="pclang-box">
	            <!--            Here will appear the new fields-->
	        </div>
	        <button type="button" onclick="removePcLanguage('pc-lang'+nextIdPcLang)">Remove Language</button>
	        <button type="button" onclick="addPcLanguage()">Add Language</button>
  		</fieldset>
  		<fieldset>Other Skills <br/>
	        <label for="languages">Languages</label><br/>
	        <input type="text" name="lang[]" id="languages"/>
	        <select name="compr-level[]">Comprehension
	            <option selected>-Comprehension-</option>
	            <option value="Beginner">Beginner</option>
	            <option value="Intermediate">Intermediate</option>
	            <option value="Advanced">Advanced</option>
	        </select>
	        <select name="read-level[]">
	            <option selected>-Reading-</option>
	            <option value="Beginner">Beginner</option>
	            <option value="Intermediate">Intermediate</option>
	            <option value="Advanced">Advanced</option>
	        </select>
	        <select name="write-level[]">
	            <option selected>-Writing-</option>
	            <option value="Beginner">Beginner</option>
	            <option value="Intermediate">Intermediate</option>
	            <option value="Advanced">Advanced</option>
	        </select><br/>
	        <div id="lang-box">
	            <!--            Here will appear the new fields-->
	        </div>
	        <button type="button" onclick="removeLanguage('lang' + nextIdLang)">Remove Language</button>
	        <button type="button" onclick="addLanguage()">Add Language</button>
	        <br/>
	        <span>Driver License</span><br/>
	        <label for="b">B</label>
	        <input type="checkbox" name="driver-category[]" value="B" id="b"/>
	        <label for="a">A</label>
	        <input type="checkbox" name="driver-category[]" value="A" id="a"/>
	        <label for="c">C</label>
	        <input type="checkbox" name="driver-category[]" value="C" id="c"/>
	    </fieldset>
	    <input type="submit" name="submit" value="Generate CV" />
	</form>
	
	<!-- Scripts for adding/removing fields -->
	<script>
	var nextIdPcLang = 0;
	var nextIdLang = 0;
	function addPcLanguage() {
	    nextIdPcLang++;
	    var pcDiv = document.createElement('div');
	    pcDiv.setAttribute('id', 'pc-lang' + nextIdPcLang);
	    pcDiv.innerHTML = '<input type="text" name="pc-lang[]"/>' + ' <select name="pc-level[]">' + '<option value="Beginner">Beginner</option>' + '<option value="Programmer">Programmer</option>' + '<option value="Ninja">Ninja</option>' + '</select>'
	    document.getElementById('pclang-box').appendChild(pcDiv);

	}

	function removePcLanguage(id) {
	    nextIdPcLang--;
	    var pcDiv = document.getElementById(id);
	    document.getElementById('pclang-box').removeChild(pcDiv);
	}

	function addLanguage() {
	    nextIdLang++;
	    var langDiv = document.createElement('div');
	    langDiv.setAttribute('id', 'lang' + nextIdLang);
	    langDiv.innerHTML = '<input type="text" name="lang[]"/>' + ' <select name="compr-level[]">' + '<option>-Comprehension-</option>' + '<option value="Beginner">Beginner</option>' + '<option value="Intermediate">Intermediate</option>' + '<option value="Advanced">Advanced</option>' + '</select>' + ' <select name="read-level[]">' + '<option>-Reading-</option>' + '<option value="Beginner">Beginner</option>' + '<option value="Intermediate">Intermediate</option>' + '<option value="Advanced">Advanced</option>' + '</select>' + ' <select name="write-level[]">' + '<option>-Writing-</option>' + '<option value="Beginner">Beginner</option>' + '<option value="Intermediate">Intermediate</option>' + '<option value="Advanced">Advanced</option>' + '</select>';
	    document.getElementById('lang-box').appendChild(langDiv);
	}

	function removeLanguage(id) {
	    nextIdLang--;
	    var langDiv = document.getElementById(id);
	    document.getElementById('lang-box').removeChild(langDiv);
	}
	</script>
	
	<!-- PHP Logic -->
	<?php 
	if($_POST && isset($_POST['submit'])) {

		$error = false;

		//patterns
		$namesPattern = '/^[A-za-z ]{2,20}$/';
		$emailPattern = '/^[^@]+@[^@]+\.[^@]+$/';
		$companyPattern = '/^[A-Za-z0-9 ]{2,20}$/';
		$phonePattern = '/^(\+{0,}[\d- ]+)$/';
		
		
		$fname = $_POST['fname'];
		
		if (!preg_match($namesPattern, $fname)) {
			echo "<div class=\"error\">Invalid first name.</div>";
			$error = true;
		}
		
		$lname = $_POST['lname'];
		
		if (!preg_match($namesPattern,$lname)) {
			echo "<div class=\"error\">Invalid last name.</div>";
			$error = true;
		}
		
		$email = $_POST['email'];
		
		if(!preg_match($emailPattern, $email)){
			echo "<div class=\"error\">Invalid email: {$_POST["email"]}.</div>";
			$error = true;
		}
		
		$phone = $_POST['phone'];
		
		if(!preg_match($phonePattern, $phone)){
			echo "<div class=\"error\">Invalid phone: {$_POST["phoneNumber"]}.</div>";
			$error = true;
		}
		
		$gender = $_POST['gender'];
		$bdate = $_POST['b-date'];
		$nationality = $_POST['nationality'];
		
		$companyName = $_POST['company-name'];
		
		if(!preg_match($companyPattern, $companyName)){
			echo "<div class=\"error\">Invalid company name.</div>";
			$error = true;
		}
		
		$fromDate = $_POST['from-date'];
		$toDate = $_POST['to-date'];
		
		$pcLang = $_POST['pc-lang'];
		$pcLevel = $_POST['pc-level'];
		
		$lang = $_POST['lang'];
		
		foreach ($lang as $language) {
			if (!preg_match($namesPattern, $language)) {
				echo "<div class=\"error\">Invalid language: $language.</div>";
				$error = true;
				break;
			}
		}
		
		$comprLevel = $_POST['compr-level'];
		$readLevel = $_POST['read-level'];
		$writeLevel = $_POST['write-level'];
		
		$driverLicense = $_POST['driver-category'];
		
		if(!$error) {
		
    ?>
	
	
	
	<!-- Result -->
	
	<table>
	    <thead>
	    	<tr>
	        	<td colspan="2">Personal Information</td>
	        </tr>
	    </thead>
	    <tbody>
		    <tr>
		        <td>First Name</td>
		        <td><?= $fname ?></td>
		    </tr>
		    <tr>
		        <td>Last Name</td>
		        <td><?= $lname ?></td>
		    </tr>
		    <tr>
		        <td>Email</td>
		        <td><?= $email ?></td>
		    </tr>
		    <tr>
		        <td>Phone Number</td>
		        <td><?= $phone ?></td>
		    </tr>
		    <tr>
		        <td>Gender</td>
		        <td><?= $gender ?></td>
		    </tr>
		    <tr>
		        <td>Birth Date</td>
		        <td><?= $bdate ?></td>
		    </tr>
		    <tr>
		        <td>Nationality</td>
		        <td><?= $nationality ?></td>
		    </tr>
	    </tbody>
	</table>
	<table>
	    <thead>
	    	<tr>
	       		<td colspan="2">Last Work Position</td>
	    	</tr>
	    </thead>
	    <tbody>
		    <tr>
		        <td>Company Name</td>
		        <td><?= $companyName ?></td>
		    </tr>
		    <tr>
		        <td>From</td>
		        <td><?= $fromDate ?></td>
		    </tr>
		    <tr>
		        <td>To</td>
		        <td><?= $toDate ?></td>
		    </tr>
	    </tbody>
	</table>
	<table>
	    <thead>
		    <tr>
		        <td colspan="3">Computer Skills</td>
		    </tr>
	    </thead>
	    <tbody>
		    <tr>
		        <td>Programming Languages</td>
		        <td>
		            <table>
		                <tbody>
		                <tr>
		                    <td>Language</td>
		                    <td>Skill Level</td>
		                    <?php
		                    $length = count($pcLang);
		                    for ($i = 0; $i < $length; $i++) {
		                        echo '<tr></tr>';
		                        echo "<td>$pcLang[$i]</td>";
		                        for ($j = $i; $j < $length; $j++) {
		                            echo "<td>$pcLevel[$j]</td>";
		                            break;
		                        }
		                    }
		                    ?>
		                </tr>
		                </tbody>
		            </table>
		        </td>
		    </tr>
	    </tbody>
	</table>
	<table>
	    <thead>
		    <tr>
		        <td colspan="5">Other Skills</td>
		    </tr>
	    </thead>
	    <tbody>
		    <tr>
		        <td>Languages</td>
		        <td>
		            <table>
		                <tbody>
		                <tr>
		                    <td>Language</td>
		                    <td>Comprehension</td>
		                    <td>Reading</td>
		                    <td>Writing</td>
		                    <?php
		                    $length2 = count($lang);
		
		                    for ($i = 0; $i < $length2; $i++) {
		                        echo '<tr></tr>';
		                        echo "<td>$lang[$i]</td>";
		                        for ($j = $i; $j < $length2; $j++) {
		                            echo "<td>$comprLevel[$j]</td>";
		                            for ($k = $j; $k < $length2; $k++) {
		                                echo"<td>$readLevel[$k]</td>";
		                                for ($p = $k; $p < $length2; $p++) {
		                                    echo "<td>$writeLevel[$p]</td>";
		                                    break;
		                                }
		                                break;
		                            }
		                            break;
		                        }
		                    }
		                    ?>
		                </tr>
		
		                </tbody>
		            </table>
		        </td>
		    </tr>
		    <tr>
		        <td>Driver's License</td>
		        <td><?= implode(', ', $driverLicense); ?></td>
		    </tr>
	    </tbody>
	</table>
	<?php 
		} //$erorr check end if
	} // main if end
	?>
</body>
</html>