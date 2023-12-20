const addExpenseButton = document.getElementById("add-expense-button");

const descriptionInput = document.getElementById("description");
const valueInput = document.getElementById("value");
const selectInput = document.getElementById("type");
const TotalBudget = document.getElementById("TotalBudget");

const incomeList = document.getElementById("income-list");
const expenseList = document.getElementById("expense-list");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
let inc, exp, budget;
function formatMoney(value) {
  return Math.abs(Number(value)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}

function calculateIncome() {
  let sum = 0;
  for (let item of incomeList.children) {
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    // console.log(parseFloat(valueString));
    sum += parseFloat(valueString);
  }
  inc = sum;
  totalIncome.innerHTML = formatMoney(sum);
}
calculateIncome();

/**
 * Task 1: Calculate total expense
 */
function calculateExpense() {
  let sum = 0;

  for (let item of expenseList.children) {
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");
    sum += parseFloat(valueString);
  }
  exp = sum;
  totalExpense.innerHTML = formatMoney(sum);
}
calculateExpense();
/**
 * Task 2: Calculate the budget
 */

function calculateBudget() {
  let income = totalIncome.innerHTML.replace(/,/g, "");
  let expense = totalExpense.innerHTML.replace(/,/g, "");
  budget = income - (expense);
  TotalBudget.innerHTML = formatMoney(budget);
}
calculateBudget();
/**
 * Task 3: Delete Entry
 */
function deleteEntry(listItem) {
  listItem.parentNode.removeChild(listItem);
  let p = listItem.children[1].children[0].innerHTML.replace(/,/g, "");
  let p1 = p[0];
  p = parseFloat(p);
  // let budg=TotalBudget.innerHTML.replace(/,/g, "");
  let income = totalIncome.innerHTML.replace(/,/g, "");
  let expense = totalExpense.innerHTML.replace(/,/g, "");
  if (p1 === "+") {
    totalIncome.innerHTML = formatMoney(parseFloat(income) - parseFloat(p));
  }
  if (p1 === "-") {
    totalExpense.innerHTML = formatMoney(parseFloat(expense) + parseFloat(p));
    console.log("object ", parseFloat(expense) + parseFloat(p));
  }
  calculateBudget();
}

function addEntry() {
  const type = selectInput.value;
  const description = descriptionInput.value;
  const value = valueInput.value;
  // data validation
  const errors = [];
  if (description.length === 0) {
    errors.push("Please enter the description");
  }
  if (value.length === 0) {
    errors.push("Please enter the value");
  }
  if (errors.length > 0) {
    alert(errors);
    return;
  }
  // insert entry
  const list = type === "income" ? incomeList : expenseList;
  const sign = type === "income" ? "+" : "-";
  const colorClass = type === "income" ? "text-green-600" : "text-red-600";
  console.log("object", inc, exp + parseFloat(value));
  if (budget == 0 && type === 'expense') alert("not have enough money");
  else {
    const newEntryHtml = `
    <li class="py-2.5">
      <div class="group flex justify-between gap-2 text-sm">
        <span>${description}</span>
        <div>
          <span class="${colorClass}">${sign}${formatMoney(value)}</span>
          <span onclick="deleteEntry(this.parentNode.parentNode)"
            class=" ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
          >
            Delete
          </span>
        </div>
      </div>
    </li>
    `;
    list.innerHTML += newEntryHtml;

  }
  // update total income value
  calculateIncome();
  calculateExpense();
  calculateBudget();
}

addExpenseButton.addEventListener("click", addEntry);
