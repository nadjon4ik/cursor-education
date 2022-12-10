const n = checkNumber(parseInt(prompt('Введіть,будь-ласка, N'), 10), 'N');
const m = checkNumber(parseInt(prompt('Введіть,будь-ласка, M'), 10), 'M');
const evenSwitch = confirm('Пропускати парні числа?');

function checkNumber(num, name) {
  while (isNaN(num) || num < 1) {
    alert('Будь-ласка,введіть дійсне число');
    num = parseInt(prompt(`Введіть,будь-ласка, ${name}`));
  }
  return num;
}
function sumRange(from, to) {
  let sum = 0;
  for (let i = from; i <= to; i++) {
    if (evenSwitch == true && i % 2 == 0) {
      continue;
    }
    sum += i;
  }
  return sum;
}

console.log(sumRange(n, m));
