const changeLocalStorage = (columnsFrom) => {
  localStorage.setItem("stateLocal", JSON.stringify(columnsFrom));
};

export default changeLocalStorage;
