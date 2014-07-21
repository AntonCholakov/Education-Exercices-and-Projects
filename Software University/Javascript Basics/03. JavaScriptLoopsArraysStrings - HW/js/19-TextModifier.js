function fixCasing(str) {

    function mixcase(str) {
        var strAsArray = [];

        for (var i in str) {
            if (Math.floor((Math.random() * 2) + 1) == 1) { //get random number - 1 or 2
                strAsArray.push(str[i].toLowerCase());
            } else {
                strAsArray.push(str[i].toUpperCase());
            }
        }

        return strAsArray.join('');
    }

    function changeText(match) {

        var regx = /<(\w+)>([\W\w]+)<\/\w+>/g;
        var content = regx.exec(match);
        /*
        content[0] => whole thing
        content[1] => type of modifying
        content[2] => to be modified
        */

        switch (content[1]) {
            case 'lowcase':
                content[2] = content[2].toLowerCase();
                break;
            case 'upcase':
                content[2] = content[2].toUpperCase();
                break;
            case 'mixcase':
                content[2] = mixcase(content[2]);
                break;
        }

        return content[2];
    }

    str = str.replace(/<\w+>([^<>]+)<\/\w+>/g, changeText);

    return str;
}

jsConsole.writeLine(fixCasing("We are <mixcase>living</mixcase> in a <upcase>yellow submarine</upcase>. We <mixcase>don't</mixcase> have <lowcase>ANYTHING</lowcase> else."));