import {
  getMyTaxes,
  getMiddleTaxes,
  getTotalTaxes,
  getMySalary,
} from "./functions.js";

("use strict");
// alert("Press F12");

const ukraine = {
  tax: 0.195,
  middleSalary: 1789,
  vacancies: 11476,
};

const latvia = {
  tax: 0.25,
  middleSalary: 1586,
  vacancies: 3921,
};

const litva = {
  tax: 0.15,
  middleSalary: 1509,
  vacancies: 1114,
};

const salary = parseInt(prompt("Please, enter salary", 1000));
const ukrTaxes = getMyTaxes.call(ukraine, salary);
const latTaxes = getMyTaxes.call(latvia, salary);
const litTaxes = getMyTaxes.call(litva, salary);

console.group("Calculation salary by countries");
console.log(
  `%c getMyTaxes.call(Ukraine, ${salary}) - %c${ukrTaxes}`,
  "font-style: italic",
  "font-weight: bold"
);
console.log(
  `%c getMyTaxes.call(Latvia, ${salary}) - %c${latTaxes}`,
  "font-style: italic",
  "font-weight: bold"
);
console.log(
  `%c getMyTaxes.call(Litva, ${salary}) - %c${litTaxes}`,
  "font-style: italic",
  "font-weight: bold"
);
console.groupEnd();

const ukrMiddlTaxes = getMiddleTaxes.call(ukraine);
const latMiddlTaxes = getMiddleTaxes.call(latvia);
const litMiddlTaxes = getMiddleTaxes.call(litva);

console.group("Calculation middle salary by countries");
console.log(
  `%c getMyTaxes.call(Ukraine) - %c${ukrMiddlTaxes}`,
  "font-style: italic",
  "font-weight: bold"
);
console.log(
  `%c getMyTaxes.call(Latvia) - %c${latMiddlTaxes}`,
  "font-style: italic",
  "font-weight: bold"
);
console.log(
  `%c getMyTaxes.call(Litva) - %c${litMiddlTaxes}`,
  "font-style: italic",
  "font-weight: bold"
);
console.groupEnd();

const ukrTotalTaxes = getTotalTaxes.call(ukraine);
const latTotalTaxes = getTotalTaxes.call(latvia);
const litTotalTaxes = getTotalTaxes.call(litva);

console.group("Calculation total taxes by countries");
console.log(
  `%c getMyTaxes.call(Ukraine) - %c${ukrTotalTaxes}`,
  "font-style: italic",
  "font-weight: bold"
);
console.log(
  `%c getMyTaxes.call(Latvia) - %c${latTotalTaxes}`,
  "font-style: italic",
  "font-weight: bold"
);
console.log(
  `%c getMyTaxes.call(Litva) - %c${litTotalTaxes}`,
  "font-style: italic",
  "font-weight: bold"
);
console.groupEnd();

console.group("Calculation total taxes by countries");
(function repeat() {
  const mySalaryInUkr = JSON.stringify(getMySalary.call(ukraine));
  setTimeout(function () {
    console.log(
      `%c getMyTaxes.call(Ukraine) - %c${mySalaryInUkr}`,
      "font-style: italic",
      "font-weight: bold"
    );
    repeat();
  }, 5000);
})();

(function repeat() {
  const mySalaryInLat = JSON.stringify(getMySalary.call(latvia));
  setTimeout(function () {
    console.log(
      `%c getMyTaxes.call(Latvia) - %c${mySalaryInLat}`,
      "font-style: italic",
      "font-weight: bold"
    );
    repeat();
  }, 5000);
})();

(function repeat() {
  const mySalaryInLit = JSON.stringify(getMySalary.call(litva));
  setTimeout(function () {
    console.log(
      `%c getMyTaxes.call(Litva) - %c${mySalaryInLit}`,
      "font-style: italic",
      "font-weight: bold",
      "\n\n"
    );
    repeat();
  }, 5000);
})();

console.groupEnd();
