var date = new Date();
var hour = date.getHours();
var minutes = date.getMinutes();

if (minutes < 10) {
    minutes = "0" + minutes;
}

console.log(hour + ":" + minutes);