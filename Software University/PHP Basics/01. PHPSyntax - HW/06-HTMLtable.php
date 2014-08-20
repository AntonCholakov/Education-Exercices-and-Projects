<!DOCTYPE html>
<html>
<head>
	<title>06. HTML Table</title>
	<style>
			table {
  				border-collapse: collapse;
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
			
			table td:last-child {
			    text-align: right;
			}
		</style>
</head>
<body>
	<?php
		$name = "Gosho";
		$phoneNumber = "0882-321-423";
		$age = 24;
		$address = "Hadji Dimitar";
	?>

	<table>
		<tr>
			<td>Name</td>
			<td><?= $name ?></td>
		</tr>
		<tr>
			<td>Phone Number</td>
			<td><?= $phoneNumber ?></td>
		</tr>
		<tr>
			<td>Age</td>
			<td><?= $age ?></td>
		</tr>
		<tr>
			<td>Address</td>
			<td><?= $address ?></td>
		</tr>
	</table>
</body>
</html>

