function compareChars(arrOne, arrTwo) {
    var arrOneLength = arrOne.length,
        arrTwoLength = arrTwo.length,
        areArraysEqual = true;

    // Compare the lengths
    if (arrOneLength == arrTwoLength) {
        for (var i = 0; i < arrOneLength; i++) {
            if (arrOne[i] !== arrTwo[i]) {
                areArraysEqual = false; //arrays are not equals
                break;
            }
        }
    } else {
        // different lengths - arrays are not equals
        areArraysEqual = false;
    }

    // exchanging true/false values with string representation
    if (areArraysEqual == true) {
        return "Equal";
    }
    else {
        return "Not Equal";
    }
    
}

jsConsole.writeLine(compareChars(['1', 'f', '1', 's', 'g', 'j', 'f', 'u', 's', 'q'], ['1', 'f', '1', 's', 'g', 'j', 'f', 'u', 's', 'q']));
jsConsole.writeLine(compareChars(['3', '5', 'g', 'd'], ['5', '3', 'g', 'd']));
jsConsole.writeLine(compareChars(['q', 'g', 'q', 'h', 'a', 'k', 'u', '8', '}', 'q', '.', 'h', '|', ';'], ['6', 'f', 'w', 'q', ':', '”', 'd', '}', ']', 's', 'r']));