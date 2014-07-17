function findPalindromes(str) {
    var strToLower = str.toLowerCase();

    var words = strToLower.split(/\W+/);
    var result = [];

    for (var i = 0; i < words.length; i++) {
        if (words[i] == words[i].split('').reverse().join('')) {
            result.push(words[i]);
        }
    }
    return result.join(', ');
}

jsConsole.writeLine(findPalindromes('There is a man, his name was Bob.'));