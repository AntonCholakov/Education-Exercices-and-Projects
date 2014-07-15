function soothsayer(years, lang, city, car) {
    var randomYear = years[Math.floor(Math.random() * years.length)];
    var randomLang = lang[Math.floor(Math.random() * lang.length)];
    var randomCity = city[Math.floor(Math.random() * city.length)];
    var randomCar = car[Math.floor(Math.random() * car.length)];

    return "You will work " + randomYear + " years on " + randomLang +
        ".\nYou will live in " + randomCity + " and drive " + randomCar;
}

console.log(soothsayer([3, 5, 2, 7, 9], ["Java", "Python", "C#", "JavaScript", "Ruby"],
    ["Silicon Valley", "London", "Las Vegas", "Paris", "Sofia"], ["BMW", "Audi", "Lada", "Skoda", "Opel"]));