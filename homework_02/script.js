main();

async function main() {
  try {
    let n = await setInputValues('N, де n - число,що задає початок діапазону');
    let m = await setInputValues(`M, де m - число, що вказує на кінець діапазону. Якщо m<n, то результат додавання буде в межах m-n!`);
    const skipEven = confirm('Пропускати парні числа?');
    const sum = sumRange(n, m, skipEven);
    alert(`Результатом складання чисел від ${Math.min(m, n)} до ${Math.max(m, n)} є ${sum}`);
  } catch (e) {
    if (e) {
      console.error(e);
    }
  }
}


function setInputValues(message) {
  let n = showInputPrompt(message);
  if (n == null) {
    alert('Обчислити додавання неможливо!');
    return Promise.reject();
  }
  return n;
}

function showInputPrompt(name) {
  const userInput = parseInt(prompt(`Введіть,будь-ласка ${name}`), 10);
  if (isNaN(userInput)) {
    return confirmCancelInput(name);
  }
  return repeatInput(userInput, name);
}

function confirmCancelInput(name) {
  const skipConfirm = confirm('Ви дійсно хочете скасувати введення числа?');
  if (!skipConfirm) {
    return showInputPrompt(name);
  }
  return null;
}

function repeatInput(num, name) {
  while (num < 1) {
    alert('Будь-ласка,введіть дійсне число');
    num = showInputPrompt(name);
  }
  return num;
}

function sumRange(from, to, skipEven) {
  let sum = 0;
  for (let i = Math.min(from, to); i <= Math.max(from, to); i++) {
    if (!skipEven || i % 2 !== 0) {
      sum += i;
    }
  }
  return sum;
}
