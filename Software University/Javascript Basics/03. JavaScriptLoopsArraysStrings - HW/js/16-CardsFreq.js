function findCardFrequency(inputString) {

    function getUniqueElements(arr) {
        var uniqueElements = [];

        for (var i in arr) {
            if (uniqueElements.indexOf(arr[i]) === -1) { // if elements doesn't exist, add it to the array
                uniqueElements.push(arr[i]);
            }
        }

        return uniqueElements;
    }

    var cards = inputString.split(/[♣♦♥♠ ]+/);
    var frequencies = [];

    cards.pop(); //removing last element

    //calculate frequence of cards
    for (var i in cards) {
        if (cards[i] in frequencies) {
            frequencies[cards[i]]++; // if exist, frequencies is + 1
        } else {
            frequencies[cards[i]] = 1; // if not exist, create new instance equals to 1
        }
    }

    var output = ''; //storing the output string
    var cardsLength = cards.length;

    cards = getUniqueElements(cards);
    // now we have all unique cards and their frequency
    for (i in cards) {
        var percent = (frequencies[cards[i]] / cardsLength * 100).toFixed(2); // calculate percent for each element
        output += cards[i] + ' -> ' + percent + '%<br>'; // in the browser console <br> should be /n !!
    }

    return output;
}

jsConsole.writeLine(findCardFrequency('8♥ 2♣ 4♦ 10♦ J♥ A♠ K♦ 10♥ K♠ K♦'));
jsConsole.writeLine(findCardFrequency('J♥ 2♣ 2♦ 2♥ 2♦ 2♠ 2♦ J♥ 2♠'));
jsConsole.writeLine(findCardFrequency('10♣ 10♥'));