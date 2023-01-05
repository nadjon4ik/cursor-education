("use strict");
alert("Press F12");
import {
  getMyTaxes,
  getMiddleTaxes,
  getTotalTaxes,
  getMySalary,
  showOutput,
  createArray,
} from "./functions.js";
function main() {
  let salary = Number(prompt("Please, enter salary", 1000));

  while (salary < 0 || Number.isNaN(salary)) {
    const conf = confirm("Do you enter valid salary?");
    if (!conf)
      return console.warn(
        "Please, reload page and try again. Enter valid value!"
      );
    salary = parseInt(prompt("Please, enter valid salary"), 10);
  }

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

  const ukrTaxes = getMyTaxes.call(ukraine, salary);
  const latTaxes = getMyTaxes.call(latvia, salary);
  const litTaxes = getMyTaxes.call(litva, salary);
  const arrayTaxes = createArray(ukrTaxes, latTaxes, litTaxes);

  console.group("Calculation salary by countries");
  showOutput(arrayTaxes, salary);
  console.groupEnd();

  const ukrMiddlTaxes = getMiddleTaxes.call(ukraine);
  const latMiddlTaxes = getMiddleTaxes.call(latvia);
  const litMiddlTaxes = getMiddleTaxes.call(litva);
  const arrayMiddleTaxes = createArray(
    ukrMiddlTaxes,
    latMiddlTaxes,
    litMiddlTaxes
  );

  console.group("Calculation middle salary by countries");
  showOutput(arrayMiddleTaxes);
  console.groupEnd();

  const ukrTotalTaxes = getTotalTaxes.call(ukraine);
  const latTotalTaxes = getTotalTaxes.call(latvia);
  const litTotalTaxes = getTotalTaxes.call(litva);
  const arrayTotalTaxes = createArray(
    ukrTotalTaxes,
    latTotalTaxes,
    litTotalTaxes
  );

  console.group("Calculation total taxes by countries");
  showOutput(arrayTotalTaxes);
  console.groupEnd();

  console.group("Calculation total taxes by countries");
  (function repeat() {
    const mySalaryInUkr = JSON.stringify(getMySalary.call(ukraine));
    const mySalaryInLat = JSON.stringify(getMySalary.call(latvia));
    const mySalaryInLit = JSON.stringify(getMySalary.call(litva));
    const arraymySalary = createArray(
      mySalaryInUkr,
      mySalaryInLat,
      mySalaryInLit
    );
    setTimeout(function () {
      showOutput(arraymySalary);
      repeat();
    }, 10000);
  })();
  console.groupEnd();
}
main();
