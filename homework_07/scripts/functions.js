export function getMyTaxes(salary) {
  return (this.tax * salary).toFixed(2);
}

export function getMiddleTaxes(country) {
  return this.tax * this.middleSalary;
}

export function getTotalTaxes(country) {
  return this.tax * this.middleSalary * this.vacancies;
}

export function getMySalary(country) {
  const randomSalary = Math.floor(Math.random() * (2000 - 1500) + 1500);
  return {
    salary: randomSalary,
    taxes: (this.tax * randomSalary).toFixed(2),
    profit: (randomSalary - this.tax * randomSalary).toFixed(2),
  };
}

export function showOutput(arr, salary) {
  if (salary) {
    return arr.map((el) => {
      return console.log(
        `%c getMyTaxes.call(${el[0]}, ${salary}) - %c${el[1]}`,
        "font-style: italic",
        "font-weight: bold"
      );
    });
  }
  return arr.map((el) => {
    return console.log(
      `%c getMyTaxes.call(${el[0]}) - %c${el[1]}`,
      "font-style: italic",
      "font-weight: bold"
    );
  });
}

export function createArray(ukr, lat, lit) {
  return [
    ["Ukraine", `${ukr}`],
    ["Latvia", `${lat}`],
    ["Litva", `${lit}`],
  ];
}

export function isNumber(num) {
  while (num < 0 || Number.isNaN(num)) {
    const conf = confirm("Do you enter valid salary?");
    if (!conf) break;
    num = setSalary();
  }
  return num;
}

function setSalary() {
  return parseInt(prompt("Please, enter valid salary"), 10);
}
