const form = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const balanceDisplay = document.getElementById("balance");
const incomeDisplay = document.getElementById("income-amount");
const expenseDisplay = document.getElementById("expense-amount");
const transactionList = document.getElementById("transaction-list");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Generate unique ID for each transaction
function generateID() {
  return Math.floor(Math.random() * 1000000);
}

function saveToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction(e) {
  e.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = +amountInput.value;
  const type = typeInput.value;

  if (!description || !amount || !type) {
    alert("Please fill in all fields!");
    return;
  }

  const transaction = {
    id: generateID(),
    description,
    amount: type === "expense" ? -Math.abs(amount) : Math.abs(amount),
    type,
  };

  transactions.push(transaction);
  saveToLocalStorage();
  updateDOM();
  form.reset();
}

function updateDOM() {
  transactionList.innerHTML = "";

  if (transactions.length === 0) {
    transactionList.innerHTML = `
      <li style="text-align: center; padding: 1rem; color: #F7EFE5; font-weight: 500;">
        No transactions available
      </li>`;
  } else {
    transactions.forEach((txn) => {
      const li = document.createElement("li");
      li.classList.add("transaction", txn.type);

      li.innerHTML = `
        <span>${txn.description}</span>
        <span>
          ₹${Math.abs(txn.amount).toFixed(2)}
          <button class="delete-btn" onclick="removeTransaction(${txn.id})">×</button>
        </span>
      `;

      transactionList.appendChild(li);
    });
  }

  updateSummary();
}

function updateSummary() {
  const amounts = transactions.map((txn) => txn.amount);

  const total = amounts.reduce((acc, amt) => acc + amt, 0).toFixed(2);
  const income = amounts
    .filter((amt) => amt > 0)
    .reduce((acc, amt) => acc + amt, 0)
    .toFixed(2);
  const expenses = amounts
    .filter((amt) => amt < 0)
    .reduce((acc, amt) => acc + amt, 0)
    .toFixed(2);

  balanceDisplay.innerText = `₹${isNaN(total) ? "0.00" : total}`;
  incomeDisplay.innerText = `₹${isNaN(income) ? "0.00" : income}`;
  expenseDisplay.innerText = `₹${isNaN(expenses) ? "0.00" : Math.abs(expenses).toFixed(2)}`;
}

function removeTransaction(id) {
  transactions = transactions.filter((txn) => txn.id !== id);
  saveToLocalStorage();
  updateDOM();
}

updateDOM();

form.addEventListener("submit", addTransaction);
