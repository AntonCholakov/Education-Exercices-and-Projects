function findMinMax(nums) {
    var min = Math.min.apply(null, nums);
    var max = Math.max.apply(null, nums);
    return {
        'Min': min,
        'Max': max
    };
}

jsConsole.writeLine("Min -> " + findMinMax([1, 2, 1, 15, 20, 5, 7, 31]).Min);
jsConsole.writeLine("Max -> " + findMinMax([1, 2, 1, 15, 20, 5, 7, 31]).Max);
jsConsole.writeLine("Min -> " + findMinMax([2, 2, 2, 2, 2]).Min);
jsConsole.writeLine("Max -> " + findMinMax([2, 2, 2, 2, 2]).Max);
jsConsole.writeLine("Min -> " + findMinMax([500, 1, -23, 0, -300, 28, 35, 12]).Min);
jsConsole.writeLine("Max -> " + findMinMax([500, 1, -23, 0, -300, 28, 35, 12]).Max);