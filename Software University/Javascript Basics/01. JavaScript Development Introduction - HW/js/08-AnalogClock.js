var hoursClockHand = document.getElementById('hours'),
    minutesClockHand = document.getElementById('minutes'),
    secondsClockHand = document.getElementById('seconds'),
    degreesPerTick = 360 / 60,
    degreesPerHour = 360 / 12,
    degreesPerHalfHour = degreesPerHour / 2;

setInterval(function () {
    var now = new Date(),
        hours = now.getHours(),
        minutes = now.getMinutes(),
        seconds = now.getSeconds();

    if (hours > 12) {
        hours = hours - 12;
    }

    if (minutes > 30) {
        setRotation(hoursClockHand, hours * degreesPerHour + degreesPerHalfHour);
    } else {
        setRotation(hoursClockHand, hours * degreesPerHour);
    }

    setRotation(minutesClockHand, minutes * degreesPerTick);
    setRotation(secondsClockHand, seconds * degreesPerTick);
}, 1000);

function setRotation(element, degrees) {
    element.style.webkitTransform = 'rotate(' + degrees + 'deg)';
    element.style.MozTransform = 'rotate(' + degrees + 'deg)';
    element.style.msTransform = 'rotate(' + degrees + 'deg)';
    element.style.OTransform = 'rotate(' + degrees + 'deg)';
    element.style.transform = 'rotate(' + degrees + 'deg)';
}