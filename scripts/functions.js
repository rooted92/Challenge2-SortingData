
//Functions

// Gets data from local json file
const GetData = async () => {
    const response = await fetch('../data/data.json');
    const data = await response.json();
    return data;
}

// Creates table row elements for each person
const MakeRow = (id, firstName, lastName, email, height, age, inject) => {
    let thRow = document.createElement('th');
    thRow.scope = 'row';
    thRow.textContent = id;
    let tdFName = document.createElement('td');
    tdFName.textContent = firstName;
    let tdLName = document.createElement('td');
    tdLName.textContent = lastName;
    let tdEmail = document.createElement('td');
    tdEmail.textContent = email;
    let tdHeight = document.createElement('td');
    tdHeight.textContent = height;
    let tdAge = document.createElement('td');
    tdAge.textContent = age;

    let tr = document.createElement('tr');
    tr.append(thRow, tdFName, tdLName, tdEmail, tdHeight, tdAge);
    inject.append(tr);
}

// Displays results based on user selection
const DisplayResults = (resultValue, array) => {
    let parseValue = parseInt(resultValue);// parse string value to int
    let numberOfPages = Math.ceil(array.length / parseValue);// get even amount of pages
    console.log('Even number pages no fraction: ' + numberOfPages);
    let pages = [];
    for (let i = 0; i < array.length; i += parseValue) {
        let page = [];
        if (array.length < numberOfPages) {
            page = array.slice();
            pages.push(page);
        }
        else {
            page = array.slice(i, i + parseValue);
            pages.push(page);
        }
    }
    console.log("Pages outside of for loop:");
    console.log(pages);
    return pages;
}

// Populates table base on button that was clicked
const PopulateOnClick = (array) => {
    array.map(person => MakeRow(person.Id, person.FirstName, person.LastName, person.Email, person.Height, person.Age, injectRows));
}

export { GetData, MakeRow, PopulateOnClick, DisplayResults };