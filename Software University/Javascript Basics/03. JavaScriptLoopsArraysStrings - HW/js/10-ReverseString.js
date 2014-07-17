function reverseString(str) {
    var backway = str.split("").reverse().join(""); //split string into array, reverse it and then join it again
    return backway;
}

jsConsole.writeLine(reverseString('sample'));
jsConsole.writeLine(reverseString('softUni'));
jsConsole.writeLine(reverseString('java script'));