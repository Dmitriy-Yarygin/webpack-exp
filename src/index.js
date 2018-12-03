import _ from "lodash";

import unicorn from "./images/unicorn.jpg";

import "./scss/main.scss";
import "./css/main.css";

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
    parent.appendChild(makeDiv(descr, value));
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
    let total = this.totalIncome + this.totalExpenses;
    document.getElementById("totalBalance").innerText = total.toFixed(2);
    let percentage =
      ((this.totalExpenses / this.totalIncome) * 100).toFixed(0) + "%";
    document.getElementById("totalIncomePercentage").innerHTML = percentage;
  }
  percentageRefresh() {
    let valueElements = document.querySelectorAll(
      ".balance-half.expenses .record-value"
    );
    let percentageElements = document.querySelectorAll(
      ".balance-half.expenses .record-percentage"
    );
    for (let i = 0; i < valueElements.length; i++) {
      let value = +valueElements[i].innerText;
      let percentageSpan = percentageElements[i];
      percentageSpan.innerText =
        ((value / this.totalIncome) * 100).toFixed(0) + "%";
    }
  }
}
function makeDiv(descr, value) {
  let newDiv = document.createElement("div");
  newDiv.className = "record";
  newDiv.innerHTML = `<span class="record-text">${descr}</span>    
                      <span class="record-value">${value}</span>
                      <span class="record-percentage">0%</span>`;
  return newDiv;
}

let myBudget = new Budget("Trainee`s budget");
myBudget.render();

document.getElementById("btnSaveIncome").addEventListener("click", addNewRec);
document.getElementById("btnSaveExpense").addEventListener("click", addNewRec);
function addNewRec(event) {
  let descr = document.getElementById("newRecDescr").value;
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
