function findYoungestPerson(people) {
    var lowestAge = Number.MAX_VALUE;
    var youngestPerson = "";

    for (var i = 0; i < people.length; i++) {
        var currentAge = people[i].age;
        if (currentAge < lowestAge) {
            lowestAge = currentAge;
            youngestPerson = people[i];
        }
    }

    return "The youngest youngest person is " + youngestPerson.firstname + " " + youngestPerson.lastname;

}

console.log(findYoungestPerson([{
    firstname: 'George',
    lastname: 'Kolev',
    age: 32
}, {
    firstname: 'Bay',
    lastname: 'Ivan',
    age: 81
}, {
    firstname: 'Baba',
    lastname: 'Ginka',
    age: 40
}]));