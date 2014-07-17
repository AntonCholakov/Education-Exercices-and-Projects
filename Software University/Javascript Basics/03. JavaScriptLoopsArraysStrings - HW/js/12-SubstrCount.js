function countSubstringOccur(arg) {
    var substr = arg[0];
    var str = arg[1];
    strToLower = str.toLowerCase();

    var re = new RegExp(substr, 'g'); //create a regex to match
    var count = strToLower.match(re);

    return count.length;
}

jsConsole.writeLine(countSubstringOccur(["in", "We are living in a yellow submarine. We don't have anything else. Inside the submarine is very tight. So we are drinking all the day. We will move out of it in 5 days."]));
jsConsole.writeLine(countSubstringOccur(["your", "No one heard a single word you said. They should have seen it in your eyes. What was going around your head."]));
jsConsole.writeLine(countSubstringOccur(["but", "But you were living in another world tryin' to get your message through."]));
