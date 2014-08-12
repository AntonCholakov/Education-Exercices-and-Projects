var input = document.getElementById('txt');

function check() {
	var content = input.value;
	var regex = /\D/g;
	if (regex.test(content)) {
		showError();
		input.value = content.replace(regex, '');
	}
}
function changeBackgroundColor(color) {
	input.style.backgroundColor = color;
}
function showError() {
	changeBackgroundColor('#F00');
	setTimeout(function(){
		changeBackgroundColor('#FFF');
	}, 200);
}

input.addEventListener('input', check, false);


