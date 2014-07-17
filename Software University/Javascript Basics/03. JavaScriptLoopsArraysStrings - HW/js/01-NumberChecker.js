function numberChecker(n) {

    /* One under question .. */
    var nums = [];
    for (var i = 1; i <= n; i++) {
        if ((i % 4 == 0) || (i % 5 == 0)) {
            continue;
        }
        nums.push(i);
    }
    jsConsole.writeLine(nums.join(','));

    /*
    If we assume that 'the same time' means i % 20 not i % 5 || i % 4

    var nums = [];
    for (var i = 1; i <= n; i++) {
        if (i % 20 == 0) {
            continue;
        }
        nums.push(i);
    }
    jsConsole.writeLine(nums.join(','));
    */

}

numberChecker(20);
numberChecker(1);
numberChecker(13);