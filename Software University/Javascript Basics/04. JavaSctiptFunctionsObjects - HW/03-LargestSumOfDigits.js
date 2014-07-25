function findLargestBySumOfDigits(nums) {
    if (nums.length < 1) {
        return undefined;
    }
    
    var maxSum = 0;

    for (var i = 0; i < nums.length; i++) {
        if (nums[i] !== parseInt(nums[i])) {
            return undefined;
        }

        var currentSum = 0;
        var currentNum = Math.abs(nums[i]).toString();

        for (var j = 0; j < currentNum.length; j++) {
            currentSum += Number(currentNum[j]);
        }

        if (currentSum > maxSum) {
            maxSum = currentSum;
            var maxNum = nums[i];
        }
    }

    return maxNum;
}

console.log(findLargestBySumOfDigits([5, 10, 15, 111]));
console.log(findLargestBySumOfDigits([33, 44, -99, 0, 20]));
console.log(findLargestBySumOfDigits(['hello']));
console.log(findLargestBySumOfDigits([5, 3.3]));