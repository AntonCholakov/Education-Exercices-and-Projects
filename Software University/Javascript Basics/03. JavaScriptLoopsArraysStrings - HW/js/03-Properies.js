function displayProperties() {
    var properties = [];
    for (var prop in window) {
        properties.push(prop);
    }

    properties.sort();

    jsConsole.write(properties.join('<br>'));

    //NOTE: If you are using the normal console - <br> must be replaces by /n as a separator
    
}

displayProperties();