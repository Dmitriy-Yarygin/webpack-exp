import "./scss/main.scss";
import "./css/main.css";

function makeDiv(descr, value) {
  return `<div class="record">
            <span class="record-text">${descr}</span>    
            <span class="record-value">${value}</span>
            <span class="record-percentage"></span>
          </div>`;
}

class Budget {
  constructor(name) {
    this.name = name;
    this.totalIncome = 0;
    this.totalExpenses = 0;
    this.budget = [
      ["salary", 500],
      ["gift", -50],
      ["food", -200],
      ["transport", -100]
    ];
  }

  addRec(descr, value) {
    let parent = document.querySelector(".balance-half.expenses");
    if (value > 0) {
      parent = document.querySelector(".balance-half.income");
      this.totalIncome += value;
    } else {
      this.totalExpenses += value;
    }
    this.budget.push([descr, value]);
    parent.insertAdjacentHTML("beforeend", makeDiv(descr, value));
  }

  render() {
    this.budget.forEach(([descr, value]) => {
      this.addRec(descr, value);
    });
    this.budgetHeadRefresh();
    this.percentageRefresh();
  }

  budgetHeadRefresh() {
    document.getElementById("totalIncome").innerText = this.totalIncome.toFixed(
      2
    );
    document.getElementById(
      "totalExpenses"
    ).innerText = this.totalExpenses.toFixed(2);
    const total = this.totalIncome + this.totalExpenses;
    document.getElementById("totalBalance").innerText = total.toFixed(2);
    const percentage = ((this.totalExpenses / this.totalIncome) * 100).toFixed(
      0
    );
    document.getElementById(
      "totalIncomePercentage"
    ).innerHTML = `${percentage}%`;
  }

  percentageRefresh() {
    const valueElements = document.querySelectorAll(
      ".balance-half.expenses .record-value"
    );
    const percentageElements = document.querySelectorAll(
      ".balance-half.expenses .record-percentage"
    );
    for (let i = 0; i < valueElements.length; i += 1) {
      const value = +valueElements[i].innerText;
      const percentageSpan = percentageElements[i];
      percentageSpan.innerText = `${((value / this.totalIncome) * 100).toFixed(
        0
      )}%`;
    }
  }
}

const myBudget = new Budget("Trainee`s budget");
myBudget.render();

document.getElementById("btnSaveIncome").addEventListener("click", addNewRec);
document.getElementById("btnSaveExpense").addEventListener("click", addNewRec);

function addNewRec(event) {
  const descr = document.getElementById("newRecDescr").value;
  let value = +document.getElementById("newRecValue").value;
  if (descr === "" || value === "") {
    alert("Enter description and value");
    return;
  }
  if (event.target.id === "btnSaveExpense") {
    value = -value;
  }
  myBudget.addRec(descr, value);
  myBudget.budgetHeadRefresh();
  myBudget.percentageRefresh();
}
