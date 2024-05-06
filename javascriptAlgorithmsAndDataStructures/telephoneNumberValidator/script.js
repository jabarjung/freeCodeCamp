const userInput = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const results = document.getElementById("results-div");

const clear = () => {
  if (results.innerHTML) {
    results.innerHTML = "";
  }
};

const isValid = (input) => {
  const regex = /^[1]?[\s]*(\(\d{3}\)|\d{3})[-]?[\s]*\d{3}[\s]*[-]?[\s]*\d{4}$/;
  // this one also works: /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/
  return regex.test(input);
};

const check = () => {
  if (!userInput.value) {
    alert("Please provide a phone number.");
    return;
  }
  let result;
  if (isValid(userInput.value)) {
    result = `Valid US number: ${userInput.value}`;
  } else {
    result = `Invalid US number: ${userInput.value}`;
  }
  let pElement = document.createElement("p");
  pElement.innerHTML = result;
  results.appendChild(pElement);
  userInput.value = "";
};

checkButton.addEventListener("click", check);
clearButton.addEventListener("click", clear);
