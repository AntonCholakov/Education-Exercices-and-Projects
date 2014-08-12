/*
Note that this solution works with CLICK event
*/

function printMouseCoordinates(ev) {
    document.body.innerHTML += 'X: ' + ev.pageX + '; Y: ' + ev.pageY + '; Time: ' + new Date() + '</br>';
}

document.addEventListener('click', printMouseCoordinates, false);