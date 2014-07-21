function findMostFreqWord(str) {
    var strToLower = str.toLowerCase();
    var words = strToLower.match(/\b\w+\b/g); // array
    var results = []; //storing results
    var maxTimes = 0;

    for (var i in words) {
        var word = words[i];
        if (results[word] === undefined) {
            results[word] = { word: word, times: 1 };
        }
        else {
            results[word].times++;
        }

        if (results[word].times > maxTimes) {
            maxTimes = results[word].times;
        }
    }

    var bestWords = [];

    for (var i in results) {
        if (results[i].times === maxTimes) {
            bestWords.push(results[i]);
        }
    }

    // alphabetical order http://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
    bestWords.sort(
        function (lhs, rhs) {
            return lhs.word.localeCompare(rhs.word);
        }
    );

    for (var w in bestWords) {
        jsConsole.writeLine(bestWords[w].word + " -> " + bestWords[w].times + " times");
    }
	jsConsole.writeLine();
}

findMostFreqWord('in the middle of the night');
findMostFreqWord('Welcome to SoftUni. Welcome to Java. Welcome everyone.');
findMostFreqWord('Hello my friend, hello my darling. Come on, come here. Welcome, welcome darling.');