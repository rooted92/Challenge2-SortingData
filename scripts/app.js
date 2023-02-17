// Pedro Castaneda
// 02-16-2023
// Doing stuff with data - For this project we are to be able to populate a table with data and have pagination to be able to sort that data.

// Suedo Code
// Be able to get data
// Be able to populate table
// Be able sort data
// See if you can sort by selecting one of the table row th elements
// Have a button that will invoke a function to sort by

// Imports
import { GetData, MakeRow, PopulateOnClick, DisplayResults } from "./functions.js";

// Global Variables
let data = await GetData();
let sortIdBigToSmall, sortIdSmallToBig, sortAgeBigToSmall, sortAgeSmallToBig, sortHeightTallToShort, sortHeightShortToTall;
let sortFirstNameAsc, sortFirstNameDesc, sortLastNameAsc, sortLastNameDesc, sortEmailAsc, sortEmailDesc;
let sortId, sortAge, sortHeight, sortFirstName, sortLastName, sortEmail;
let index = 1;
let limit = 0;
console.log(data);
console.log(data.People[0].FirstName);

// Elements
let injectRows = document.querySelector('#injectRows');
let sortByID = document.querySelector('#sortByID');
let sortByFirstName = document.getElementById('sortByFirstName');
let sortByLastName = document.getElementById('sortByLastName');
let sortByEmail = document.getElementById('sortByEmail');
let sortByHeight = document.querySelector('#sortByHeight');
let sortByAge = document.getElementById('sortByAge');
let resetBtn = document.querySelector('#resetBtn');
let results = document.querySelector('#results');
let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');

// Functions
const PopulateTable = (data) => {
    data.People.map(person => {
        MakeRow(person.Id, person.FirstName, person.LastName, person.Email, person.Height, person.Age, injectRows);
    });
}
PopulateTable(data);// Populates table with data when page loads

// Event Listeners

// Resets data in table to default
resetBtn.addEventListener('click', function () {
    injectRows.innerHTML = '';
    PopulateTable(data);
});

// Changes number of results displayed
results.addEventListener('change', function () {
    console.log(results.value);
    let pages = DisplayResults(results.value, data.People);
    injectRows.innerHTML = '';
    //                 array pagination buttons for pagination in bootstrap
    // pages.map(array => array.map(person => MakeRow(person.Id, person.FirstName, person.LastName, person.Email, person.Height, person.Age, injectRows)));
    pages[0].map(person => MakeRow(person.Id, person.FirstName, person.LastName, person.Email, person.Height, person.Age, injectRows));

});

// Shows next page
nextBtn.addEventListener('click', function () {
    console.log(results.value);
    let pages = DisplayResults(results.value, data.People);
    switch (parseInt(results.value)) {
        case 10:
            limit = 10;
            break;
        case 20:
            limit = 5;
            break;
        case 30:
            limit = 4;
            break;
        case 40:
            limit = 3;
            break;
        case 50:
            limit = 2;
            break;
        default:
            break;
    }
    injectRows.innerHTML = '';
    pages[index].map(person => MakeRow(person.Id, person.FirstName, person.LastName, person.Email, person.Height, person.Age, injectRows));
    index++;
    if (index < 0) {
        index = 0;
    } else if (index > limit) {
        index = limit;
    }
    console.log(index);
});

// Shows previous page
prevBtn.addEventListener('click', function () {
    console.log(results.value);
    // let index = 0;
    // let limit = 0;
    let pages = DisplayResults(results.value, data.People);
    switch (parseInt(results.value)) {
        case 10:
            limit = 10;
            break;
        case 20:
            limit = 5;
            break;
        case 30:
            limit = 4;
            break;
        case 40:
            limit = 3;
            break;
        case 50:
            limit = 2;
            break;
        default:
            break;
    }
    injectRows.innerHTML = '';
    pages[index].map(person => MakeRow(person.Id, person.FirstName, person.LastName, person.Email, person.Height, person.Age, injectRows));
    index--;
    if (index < 0) {
        index = 0;
    } else if (index > limit) {
        index = limit;
    }
    console.log(index);
});

// sorts by ID
sortId = true;
sortByID.addEventListener('click', function () {
    sortIdBigToSmall = data.People.slice().sort((a, b) => b.Id - a.Id);// descending
    sortIdSmallToBig = data.People.slice().sort((a, b) => a.Id - b.Id);// ascending
    injectRows.innerHTML = '';
    sortId ? PopulateOnClick(sortIdBigToSmall) : PopulateOnClick(sortIdSmallToBig);
    sortId = !sortId;
});

// sorts by Age
sortAge = true;
sortByAge.addEventListener('click', function () {
    sortAgeBigToSmall = data.People.slice().sort((a, b) => b.Age - a.Age);
    sortAgeSmallToBig = data.People.slice().sort((a, b) => a.Age - b.Age);
    injectRows.innerHTML = '';
    sortAge ? PopulateOnClick(sortAgeBigToSmall) : PopulateOnClick(sortAgeSmallToBig);
    sortAge = !sortAge;
});

// sorts by Height
sortHeight = true;
sortByHeight.addEventListener('click', function () {
    sortHeightTallToShort = data.People.slice().sort((a, b) => {
        let bHeight = parseInt(b.Height.split(' ')[0]);
        let aHeight = parseInt(a.Height.split(' ')[0]);
        return bHeight - aHeight;
    });
    sortHeightShortToTall = data.People.slice().sort((a, b) => {
        let aHeight = parseInt(a.Height.split(' ')[0]);
        let bHeight = parseInt(b.Height.split(' ')[0]);
        return aHeight - bHeight;
    })
    injectRows.innerHTML = '';
    sortHeight ? PopulateOnClick(sortHeightTallToShort) : PopulateOnClick(sortHeightShortToTall);
    sortHeight = !sortHeight;
})

// sorts by first name
sortFirstName = true;
sortByFirstName.addEventListener('click', function () {
    sortFirstNameAsc = data.People.slice().sort((a, b) => {
        return a.FirstName.localeCompare(b.FirstName);
    });
    sortFirstNameDesc = data.People.slice().sort((a, b) => {
        return b.FirstName.localeCompare(a.FirstName);
    });
    injectRows.innerHTML = '';
    sortFirstName ? PopulateOnClick(sortFirstNameAsc) : PopulateOnClick(sortFirstNameDesc);
    sortFirstName = !sortFirstName;
});

// sorts by last name
sortLastName = true;
sortByLastName.addEventListener('click', function () {
    sortLastNameAsc = data.People.slice().sort((a, b) => {
        return a.LastName.localeCompare(b.LastName);
    });
    sortLastNameDesc = data.People.slice().sort((a, b) => {
        return b.LastName.localeCompare(a.LastName);
    });
    injectRows.innerHTML = '';
    sortLastName ? PopulateOnClick(sortLastNameAsc) : PopulateOnClick(sortLastNameDesc);
    sortLastName = !sortLastName;
});

// sorts by email
sortEmail = true;
sortByEmail.addEventListener('click', function () {
    sortEmailAsc = data.People.slice().sort((a, b) => {
        return a.Email.localeCompare(b.Email);
    })
    sortEmailDesc = data.People.slice().sort((a, b) => {
        return b.Email.localeCompare(a.Email);
    })
    injectRows.innerHTML = '';
    sortEmail ? PopulateOnClick(sortEmailAsc) : PopulateOnClick(sortEmailDesc);
    sortEmail = !sortEmail;
});
