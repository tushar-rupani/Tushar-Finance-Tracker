export let addIfDoesntExists = async() => {
    if(!localStorage.getItem("expense-data")){
        localStorage.setItem("expense-data", JSON.stringify([]));
    }
}

export let addObjectToLocalStorage = async(data) => {
    let gettingExistingData = localStorage.getItem("expense-data");
    let newObject = JSON.parse(gettingExistingData);
    newObject.push(data)
    localStorage.setItem("expense-data", JSON.stringify(newObject));
    alert("New Item has been added successfully")
}

export let loadDataFromLocal = () => {
    let newObject = JSON.parse(localStorage.getItem("expense-data"));
    return newObject;

}