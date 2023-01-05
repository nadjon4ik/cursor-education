export function getMyTaxes(salary) {
  return this.tax * salary;
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
    taxes: this.tax * randomSalary,
    profit: randomSalary - this.tax * randomSalary,
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
