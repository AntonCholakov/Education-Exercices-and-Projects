function calcCircleArea(r) {
    var area = Math.PI * r * r;
    return area;
}

document.getElementById("firstArea").innerHTML = calcCircleArea(7);
document.getElementById("secondArea").innerHTML = calcCircleArea(1.5);
document.getElementById("thirdArea").innerHTML = calcCircleArea(20);