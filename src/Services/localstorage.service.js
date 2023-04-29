export let addIfDoesntExists = async() => {
    if(!localStorage.getItem("expense-data")){
        localStorage.setItem("expense-data", JSON.stringify([]));
    }
}

export let addObjectToLocalStorage = async(data) => {
    let gettingExistingData = localStorage.getItem("expense-data");
    let newObject = JSON.parse(gettingExistingData);
    newObject.unshift(data)
    localStorage.setItem("expense-data", JSON.stringify(newObject));
    alert("New Item has been added successfully")
}

export let loadDataFromLocal = () => {
    let newObject = JSON.parse(localStorage.getItem("expense-data"));
    return newObject;
}

export let getDataFromLocal = (id) => {
    console.log(id);
    let allData = loadDataFromLocal();
    console.log(allData);
    // let dataOfId = allData.find(data => data.id = id);
    let dataOfId = allData.find(data => data.id === parseInt(id));
    return dataOfId
}