function reverseWordsInString(str) {
    var words = str.split(" ");
    var backwayWords = [];
    
    for (var word in words) {
        var backway = words[word].split("").reverse().join(""); //split string into array, reverse it and then join it again
        backwayWords.push(backway);
    }

    return backwayWords.join(" ");

}

console.log(reverseWordsInString("Hello, how are you."));
console.log(reverseWordsInString("Life is pretty good, isn’t it?"));