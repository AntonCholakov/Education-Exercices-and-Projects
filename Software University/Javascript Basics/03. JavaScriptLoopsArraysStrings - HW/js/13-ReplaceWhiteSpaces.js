function replaceSpaces(str) {
    var re = new RegExp(" ", 'g'); //create a regex to match
    return result = str.replace(re, "");
}

jsConsole.writeLine(replaceSpaces('But you were living in another world tryin to get your message through'));