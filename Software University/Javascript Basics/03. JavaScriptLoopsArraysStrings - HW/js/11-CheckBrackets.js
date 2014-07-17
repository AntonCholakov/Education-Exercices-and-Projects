function checkBrackets(str) {
    var brackets = 0;

    for (var ch in str) {
        if (str[ch] == '(') {
            brackets++;
        }
        else if (str[ch] == ')') {
            brackets--;
        }

        if (brackets < 0) {
            break;
        }
    }

    if (brackets == 0) {
       return "correct";
    }
    else {
        return "incorrect";
    }
}

jsConsole.writeLine(checkBrackets('( ( a + b ) / 5 – d )'));
jsConsole.writeLine(checkBrackets(') ( a + b ) )'));
jsConsole.writeLine(checkBrackets('( b * ( c + d *2 / ( 2 + ( 12 – c / ( a + 3 ) ) ) )'));