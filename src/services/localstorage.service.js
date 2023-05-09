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
  let currentUser = get("token")?.email;
  let filterObject = newObject?.filter((data) => data.user === currentUser);
  return filterObject;
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
  localStorage.setItem("expense-data", JSON.stringify(updatedData));
  alert("Data has been updated!");
};

export let add = (key, object) => {
  !localStorage.getItem(key) && localStorage.setItem(key, JSON.stringify([]));
  const dataFromLS = JSON.parse(localStorage.getItem(key));
  dataFromLS.push(object);
  localStorage.setItem(key, JSON.stringify(dataFromLS));
};

export let get = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export let deleteFromLS = (id) => {
  let allData = loadDataFromLocal();
  let refreshedData = allData.filter(data => data.id !== id);
  localStorage.setItem("expense-data", JSON.stringify(refreshedData));
}
