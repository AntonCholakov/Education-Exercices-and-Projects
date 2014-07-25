function FindNthDigit(arr) {
    var n = arr[0];
    var number = arr[1].toString().replace('.', '').replace('-', '');

    if (number.length < n) {
        return "The number doesn't have " + n + " digits";
    }

    n = Number(n);

    for (var i = 0; i < n - 1; i++) {
        number = Math.floor(number / 10);
    }

    return number % 10;
}

console.log(FindNthDigit([1, 6]));
console.log(FindNthDigit([2, -55]));
console.log(FindNthDigit([6, 923456]));
console.log(FindNthDigit([3, 1451.78]));
console.log(FindNthDigit([6, 888.88]));