function replaceATag(str) {
    var re = /<a([\w\W]*)>([\w\W]*)<\/a>/gi;

    return str.replace(re, '[URL $1]$2[/URL]');
}

console.log(replaceATag('<ul> <li>  <a href=http://softuni.bg>SoftUni</a> </li></ul>'));