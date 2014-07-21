function replaceATag(str) {
    var field = document.getElementById('field');
    field.innerHTML = str; //putting input as html - auto removing tags etc.
    var result = field.innerText.replace(/\s/g, '');

    return result;
}

jsConsole.writeLine(replaceATag('<p>Hello</p><a href="http://w3c.org">W3C</a>'));