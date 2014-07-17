function findMaxSeq(nums) {
    var currentSequence = 1,
        longestSequence = 1,
        maxSeqNum = nums[0]; // the maximal sequence first start with the first number

    for (var i = 1; i < nums.length; i++) {
        if(nums[i-1] == nums[i]) {
            currentSequence++;
            if (currentSequence > longestSequence) {
                longestSequence = currentSequence; // change max lenght to the temporary lenght
                maxSeqNum = nums[i]; // set the number of the longest temp sequence
            }
        }
        else {
            currentSequence = 1; //if two elements are not equals, temporary counter = 1
        }
    }

    // create arr with the results
    var result = [];
    for (var i = 0; i < longestSequence; i++) {
        result.push(maxSeqNum);
    }

    // result
    jsConsole.write("[");
    jsConsole.write(result.join(', '));
    jsConsole.writeLine("]");

}

findMaxSeq([2, 1, 1, 2, 3, 3, 2, 2, 2, 1]);
findMaxSeq(['happy']);
findMaxSeq([2, 'qwe', 'qwe', 3, 3, '3']);
