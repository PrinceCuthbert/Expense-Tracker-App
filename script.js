const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transaction

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: Number(amount.value),
    };

    // console.log(transaction);
    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

// Generate random ID
// Generate random ID

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// addTransaction();

// Add transactions to DOM list

function addTransactionDOM(transactions) {
  // Get sign
  const sign = transactions.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // Add class based on value

  item.classList.add(transactions.amount < 0 ? "minus" : "plus");
  item.innerHTML = `${transactions.text} <span> ${sign}${Math.abs(
    transactions.amount
  )}</span> <button class="delete-btn" onclick="removeTranscation(${
    transactions.id
  })">x</button>`;

  list.appendChild(item);
}

// Update the balance, income and expense

function updateValues() {
  const amounts = transactions.map((transactions) => transactions.amount);

  // console.log(amounts);

  const total = amounts.reduce((acc, amount) => (acc += amount), 0).toFixed(2);

  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, amount) => (acc += amount), 0)
    .toFixed(2);

  const expense = Math.abs(
    amounts
      .filter((amount) => amount < 0)
      .reduce((acc, amount) => (acc += amount), 0)
  ).toFixed(2);

  balance.innerHTML = `$${total}`;
  money_plus.innerHTML = `$${income}`;
  money_minus.innerHTML = `$${expense}`;

  // console.log(amounts);
  // console.log(total);
  // console.log(income);
  // console.log(expense);
}

function removeTranscation(id) {
  transactions = transactions.filter((transactions) => transactions.id !== id);
  updateLocalStorage();
  init();
}

// updatelocal storage transactions
// updatelocal storage transactions

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Init app
// Init app
// Init app

function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);

  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
