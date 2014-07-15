function houseTreeCompare(a, b) {
    var houseArea = (a * a) + (a * 2 / 3 * a) / 2;
    var treeArea = (b * 1 / 3 * b) + (Math.PI * Math.pow((2 / 3 * b), 2));
    if (houseArea > treeArea) {
        return "house/" + houseArea.toFixed(2);
    }
    else {
        return "tree/" + treeArea.toFixed(2);
    }
}

console.log(houseTreeCompare(3, 2));
console.log(houseTreeCompare(3, 3));
console.log(houseTreeCompare(4, 5));