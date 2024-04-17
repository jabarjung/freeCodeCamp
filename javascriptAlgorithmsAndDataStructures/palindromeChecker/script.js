const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const result = document.getElementById("result");

const isPalindrome = () => {
  let alphanumericString = textInput.value
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
  for (let i = 0; i < alphanumericString.length / 2; i++) {
    if (
      alphanumericString[i] !==
      alphanumericString[alphanumericString.length - 1 - i]
    ) {
      return false;
    }
  }
  return true;
};

const check = () => {
  if (!textInput.value) {
    alert("Please input a value");
    return;
  }

  if (isPalindrome()) {
    var resultText = `<strong>${textInput.value}</strong> is a palindrome.`;
  } else {
    var resultText = `<strong>${textInput.value}</strong> is not a palindrome.`;
  }

  if (result.firstChild) {
    result.removeChild(result.firstChild);
  }

  textInput.value = "";
  let pElement = document.createElement("p");
  pElement.innerHTML = resultText;
  result.appendChild(pElement);
  result.classList.remove("hide");
};

checkButton.addEventListener("click", check);
