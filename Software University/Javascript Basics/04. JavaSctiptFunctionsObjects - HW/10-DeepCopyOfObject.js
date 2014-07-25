function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function compareObjects(obj, objCopy) {
    var result = obj == objCopy;
    return "a == b --> " + result;
}

var a = {
    name: 'Pesho',
    age: 21
};
var b = clone(a); // a deep copy 
console.log(compareObjects(a, b));

var a = {
    name: 'Pesho',
    age: 21
};
var b = a; // not a deep copy
console.log(compareObjects(a, b));