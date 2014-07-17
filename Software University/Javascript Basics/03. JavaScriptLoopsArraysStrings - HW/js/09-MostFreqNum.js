function findMostFreqNum(arr) {
    // Sort the array
    var sorted = [];

    for (var i = 0; i < arr.length - 1; i++) {
        var min = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        if (min != i) {
            var temp = 0;
            temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }

    for (var i = 0; i < arr.length; i++) {
        sorted.push(arr[i]);
    }

    // find the most frequent

    var currentSequence = 1,
    longestSequence = 1,
    mostFrequentNum = sorted[0];

    for (var i = 0; i < sorted.length - 1; i++) {
        if (sorted[i] == sorted[i + 1]) {
            currentSequence++;
            if (longestSequence <= currentSequence) {
                longestSequence = currentSequence;
                mostFrequentNum = sorted[i];
            }
        }
        else {
            currentSequence = 1;
        }
    }

    jsConsole.writeLine(mostFrequentNum + " (" + longestSequence + "times)")
}

findMostFreqNum([4, 1, 1, 4, 2, 3, 4, 4, 1, 2, 4, 9, 3]);
findMostFreqNum([2, 1, 1, 5, 7, 1, 2, 5, 7, 3, 87, 2, 12, 634, 123, 51, 1]);
findMostFreqNum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);