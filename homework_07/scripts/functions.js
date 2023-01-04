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
    taxes: this.tax,
    profit: randomSalary - this.tax * randomSalary,
  };
}
