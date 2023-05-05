export let addIfDoesntExists = async () => {
  if (!localStorage.getItem("expense-data")) {
    localStorage.setItem("expense-data", JSON.stringify([]));
  }
};

export let addObjectToLocalStorage = async (data) => {
  let gettingExistingData = localStorage.getItem("expense-data");
  let newObject = JSON.parse(gettingExistingData);
  newObject.unshift(data);
  localStorage.setItem("expense-data", JSON.stringify(newObject));
  alert("New Item has been added successfully");
};

export let loadDataFromLocal = () => {
  let newObject = JSON.parse(localStorage.getItem("expense-data"));
  return newObject;
};

export let getDataFromLocal = (id) => {
  let allData = loadDataFromLocal();
  let dataOfId = allData.find((data) => data.id === parseInt(id));
  return dataOfId;
};

export let editDataIntoLocal = (id, newObj) => {
  let allData = loadDataFromLocal();
  // eslint-disable-next-line
  let updatedData = allData.map((data) => (data.id == id ? newObj : data));
  console.log(updatedData);
  localStorage.setItem("expense-data", JSON.stringify(updatedData));
  alert("Data has been updated!");
};

export let add = (key, object) => {
  !localStorage.getItem(key) && localStorage.setItem(key, JSON.stringify([]));
  const dataFromLS = JSON.parse(localStorage.getItem(key));
  dataFromLS.push(object);
  localStorage.setItem(key, JSON.stringify(dataFromLS));
  console.log("Added successfully");
};

export let get = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
