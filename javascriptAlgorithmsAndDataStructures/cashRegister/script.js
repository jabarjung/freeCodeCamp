let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const changeDue = document.getElementById("change-due");
const cash = document.getElementById("cash");
const purchaseButton = document.getElementById("purchase-btn");
const totalPrice = document.getElementById("price");
const cidValues = document.querySelectorAll("#cid span");

totalPrice.innerHTML = `Total: $${price}`;

const changeInDrawer = cid => {
  cidValues.forEach((cidValue, index) => {
    cidValue.textContent = cid[index][1];
});
};

const cashInDrawerAndChangeDue = (change, statusMessage) => {
  const moneyInDrawer = cid.slice().reverse();
  const currencyUnits = ["100", "20", "10", "5", "1", "0.25", "0.1", "0.05", "0.01"];
  const changeDueInCoinsAndBills = new Array(9).fill(0);
  currencyUnits.forEach((currencyUnit, index) => {
    let numberOfBillsPerCurrencyUnit = Math.ceil(moneyInDrawer[index][1] / Number(currencyUnit));
    while (numberOfBillsPerCurrencyUnit !== 0 && change !== 0) {
      if (change >= Number(currencyUnit)) {
        change = parseFloat((change - Number(currencyUnit)).toFixed(2));
        moneyInDrawer[index][1] = parseFloat((moneyInDrawer[index][1] - Number(currencyUnit)).toFixed(2));
        console.log(moneyInDrawer[index][1]);
        changeDueInCoinsAndBills[index]++;
      }
      numberOfBillsPerCurrencyUnit--;
    }
  });
  changeDueInCoinsAndBills.forEach((change, index) => {
    if (change > 0) {
      statusMessage += ` ${moneyInDrawer[index][0]}: $${(Number(currencyUnits[index])*change).toFixed(2)}`;
    }
  });
  cid = moneyInDrawer.reverse();
  return statusMessage;
};

const cannotReturnExactChange = change => {
  const moneyInDrawer = cid.slice().reverse();
  const currencyUnits = ["100", "20", "10", "5", "1", "0.25", "0.1", "0.05", "0.01"];
  currencyUnits.forEach((currencyUnit, index) => {
    let numberOfBillsPerCurrencyUnit = Math.ceil(moneyInDrawer[index][1] / Number(currencyUnit));
    while (numberOfBillsPerCurrencyUnit !== 0 && change !== 0) {
      if (change >= Number(currencyUnit)) {
        change = parseFloat((change - Number(currencyUnit)).toFixed(2));
      }
      numberOfBillsPerCurrencyUnit--;
    }
  });
  if (change === 0) {
    return false;
  } else {
    return true;
  }
};

const calculateChange = () => {
  const change = parseFloat((Number(cash.value) - price).toFixed(2));
  let statusMessage = "";
  const cashInDrawer = cid.reduce((sum, value) => {
    return parseFloat((sum + value[1]).toFixed(2)); 
  }, 0);
  if (cashInDrawer < change || cannotReturnExactChange(change)) {
    changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
  }
  if (cashInDrawer === change) {
    statusMessage = "Status: CLOSED" + cashInDrawerAndChangeDue(change, statusMessage);
    changeDue.innerHTML = statusMessage;
  }
  if (cashInDrawer > change && !cannotReturnExactChange(change)) {
    statusMessage = "Status: OPEN" + cashInDrawerAndChangeDue(change, statusMessage);
    changeDue.innerHTML = statusMessage;
  }
  changeInDrawer(cid);
  cash.value = "";
  return;
};

const calculate = () => {
  if (!cash.value) {
    alert("Please provide cash.");
    return;
  }
  if (Number(cash.value) < price) {
    alert("Customer does not have enough money to purchase the item.");
    cash.value = "";
    return;
  }
  if (Number(cash.value) === price) {
    changeDue.innerHTML = "No change due - customer paid with exact cash.";
    cash.value = "";
    return;
  }
  if (Number(cash.value) > price) {
    calculateChange();
  }
};
changeInDrawer(cid);
purchaseButton.addEventListener("click", calculate);