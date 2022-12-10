const n = inputNumber('N');
const m = inputNumber('M');
const skipEven = confirm('Пропускати парні числа?');

function inputNumber(name) {
  return checkNumber(showInputPrompt(name), name);
}

function showInputPrompt(name) {
  return parseInt(prompt(`Введіть,будь-ласка, ${name}`), 10);
}

function checkNumber(num, name) {
  while (isNaN(num) || num < 1) {
    alert('Будь-ласка,введіть дійсне число');
    num = showInputPrompt(name);
  }
  return num;
}

function sumRange(from, to) {
  let sum = 0;
  for (let i = from; i <= to; i++) {
    if (!skipEven || i % 2 !== 0) {
      sum += i;
    }
  }
  return sum;
}

console.log(sumRange(n, m));
