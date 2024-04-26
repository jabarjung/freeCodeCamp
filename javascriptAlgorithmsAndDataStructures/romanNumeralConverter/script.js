const numberInput = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const output = document.getElementById("output");

const clearDisplay = () => {
  if (output.firstChild) {
    output.removeChild(output.firstChild);
  }
};

const displayError = (errorMessage) => {
  clearDisplay();
  let pElement = document.createElement("p");
  pElement.innerHTML = errorMessage;
  output.appendChild(pElement);
  output.style.display = "flex";
  numberInput.value = "";
};

const computeOutput = (inputInteger) => {
  let romanNumeral = "";
  const romanNumerals = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" },
  ];
  for (let i = 0; i < romanNumerals.length; i++) {
    while (inputInteger >= romanNumerals[i].value) {
      romanNumeral += romanNumerals[i].numeral;
      inputInteger -= romanNumerals[i].value;
    }
  }
  return romanNumeral;
};

const displayOutput = (inputInteger) => {
  clearDisplay();
  let pElement = document.createElement("p");
  pElement.innerHTML = computeOutput(inputInteger);
  output.appendChild(pElement);
  output.style.display = "flex";
  numberInput.value = "";
};

const convert = () => {
  const inputInteger = parseInt(numberInput.value);
  if (!numberInput.value || isNaN(inputInteger)) {
    displayError("Please enter a valid number.");
    return;
  }
  if (inputInteger <= 0) {
    displayError("Please enter a number greater than or equal to 1.");
    return;
  }
  if (inputInteger >= 4000) {
    displayError("Please enter a number less than or equal to 3999.");
    return;
  }
  displayOutput(inputInteger);
};

convertButton.addEventListener("click", convert);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    convert();
  }
});
