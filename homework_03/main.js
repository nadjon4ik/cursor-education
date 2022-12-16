// functions
function getMaxDigit(maxValue) {
  const arr = String(maxValue)
    .split("")
    .map((item) => parseInt(item, 10));
  return Math.max(...arr);
}
console.log(maxValue.value);

function calcPow(num, pow) {
  let result = 1;
  for (let i = 0; i < pow; i++) {
    result *= num;
  }
  return result;
}

function formatFirstLetterName(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function salaryIncludTax(value) {
  return (value - value * (19.5 / 100)).toFixed(2);
}

function getRandomNumber(n, m) {
  return Math.floor(Math.random() * (m - n) + n) + 1;
}

function countLetter(lett, word) {
  const regExp = new RegExp(`${lett}`, "gi");
  return word.match(regExp).length;
}

// конвертація валюти
function convertCurrency(value, exch) {
  if (isUAH(value)) {
    return `${(parseInt(value, 10) / exch).toFixed(2)}$`;
  } else if (isUSD(value)) {
    return `${(parseInt(value, 10) * exch).toFixed(2)}грн.`;
  }

  if (!checkCurrency(value)) {
    return "Error";
  }

  function checkCurrency(value) {
    if (!isUAH(value) && !isUSD(value)) {
      return false;
    }
    return true;
  }

  function isUAH(val) {
    return /uah/gi.test(val);
  }

  function isUSD(val) {
    return /\$/.test(val);
  }
}

//генерація випадкового паролю
// len - довжина паролю, що задається користувачем
function getRandomPassword(len = 8) {
  let s = "";
  for (let i = 0; i < len; ++i) {
    s += Math.floor(Math.random() * 10);
  }
  return s;
}

function deleteLetters(lett, word) {
  const regExp = new RegExp(`${lett}`, "ig");
  return word.replace(regExp, "");
}

function isPalyndrom(str) {
  const newStr = str.replace(/\s/g, "").toLowerCase();
  for (let i = 0; i < Math.floor(newStr.length / 2); i++) {
    if (newStr[i] === newStr[newStr.length - 1 - i]) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

function deleteDuplicateLetter(str) {
  let newStr = str.replace(/\s/g, "").toLowerCase();
  for (let i = 0; i < newStr.length; i++) {
    if (matchChar(newStr, newStr[i])) {
      newStr = remChar(newStr, newStr[i]);
      --i;
    }
  }
  return newStr;
}

function remChar(str, ch) {
  return str.replaceAll(ch, "");
}

function matchChar(str, ch) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    str[i] === ch ? ++count : count;
  }
  return count > 1 ? true : false;
}
//end
//output
const list = [
  {
    content: "Функція №1 (Вивід найбільшої цифри з числа).",
    funcName: "GetMaxDigit",
    action: getMaxDigit,
    args: [[]],
    dataType: "number",
  },
  {
    content: "Функція №2 (Функція №2 (Піднесення числа до степеня).",
    funcName: "CalcPow",
    action: calcPow,
    args: [[], []],
    dataType: "number",
  },
  {
    content: "Функція №3 (Форматування імені користувача).",
    funcName: "FormatFirstLetterName",
    action: formatFirstLetterName,
    args: [[]],
    dataType: "string",
  },
  {
    content: "Функція №4(Обчислнння заробітньої плати).",
    funcName: "SalaryIncludTax",
    action: salaryIncludTax,
    args: [[]],
    dataType: "number",
  },
  {
    content: "Функція №5(Генерування випадкового цілого числа).",
    funcName: "GetRandomNumber",
    action: getRandomNumber,
    args: [[], []],
    dataType: "number",
  },
  {
    content: "Функція №6(Розрахунок повторів букви у слові).",
    funcName: "CountLetter",
    action: countLetter,
    args: [[], []],
    dataType: "string",
  },
  {
    content: "Функція №7(Конвертація долару в гривні та навпаки).",
    funcName: "ConvertCurrency",
    action: convertCurrency,
    args: [[], []],
    dataType: "string",
  },
  {
    content:
      "Функція №8(Генерування випадкового паролю із заданою довжиною користувачем)",
    funcName: "GetRandomPassword",
    action: getRandomPassword,
    args: [[]],
    dataType: "number",
  },
  {
    content: "Функція №9(Видалення задачної букви із речення).",
    funcName: "DeleteLetters",
    action: deleteLetters,
    args: [[], []],
    dataType: "string",
  },
  {
    content: "Функція №10(Паліндром?).",
    funcName: "IsPolyndrom",
    action: isPolyndrom,
    args: [[]],
    dataType: "string",
  },
  {
    content: "Функція №11(Видалення букв, що повторюються).",
    funcName: "GetMaxDigit",
    action: DeleteDuplicateLetter,
    args: [[]],
    dataType: "string",
  },
];
const btnCalcDigit = document
  .querySelector("#btnCalcDigit")
  .addEventListener("click", () => {
    const maxValue = document.querySelector("#maxValue");
    const output = document.querySelector(".output_1");
    const result = getMaxDigit(maxValue.value);
    return (output.textContent = result);
  });

const btnPow = document
  .querySelector("#btnPow")
  .addEventListener("click", () => {
    const value = document.querySelector("#value");
    const pow = document.querySelector("#pow");
    const output = document.querySelector(".output_2");
    const result = calcPow(value.value, pow.value);
    return (output.textContent = result);
  });

const btnFormat = document
  .querySelector("#btnFormat")
  .addEventListener("click", () => {
    const name = document.querySelector("#name");
    const output = document.querySelector(".output_3");
    const result = formatFirstLetterName(name.value);
    return (output.textContent = result);
  });

const btnSalary = document
  .querySelector("#btnSalary")
  .addEventListener("click", () => {
    const money = document.querySelector("#money");
    const output = document.querySelector(".output_4");
    const result = salaryIncludTax(money.value);
    return (output.textContent = result);
  });

const btnRandom = document
  .querySelector("#btnRandom")
  .addEventListener("click", () => {
    const from = document.querySelector("#from");
    const to = document.querySelector("#to");
    const output = document.querySelector(".output_5");
    const result = getRandomNumber(from.value, to.value);
    console.log(result);
    return (output.textContent = result);
  });

const btnReapet = document
  .querySelector("#btnReapet")
  .addEventListener("click", () => {
    const ch = document.querySelector("#ch");
    const word = document.querySelector("#word");
    const output = document.querySelector(".output_6");
    const result = countLetter(ch.value, word.value);
    console.log(result);
    return (output.textContent = result);
  });

const btnExchange = document
  .querySelector("#btnExchange")
  .addEventListener("click", () => {
    const cash = document.querySelector("#cash");
    const exch = document.querySelector("#exch");
    const output = document.querySelector(".output_7");
    const result = convertCurrency(cash.value, exch.value);
    console.log(result);
    return (output.textContent = result);
  });

const btnRandomPassword = document
  .querySelector("#btnRandomPassword")
  .addEventListener("click", () => {
    const user = document.querySelector("#userNumber");
    const output = document.querySelector(".output_8");
    const result = convertCurrency(user.value);
    console.log(result);
    return (output.textContent = result);
  });

const codeContext = document.querySelector(".info-code");

value = "Бісківіт був дуже ніжним";

const btnShowModal = document.querySelectorAll(".show-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const openModal = function () {
  codeContext.textContent = this.dataset.code;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

for (let i = 0; i < btnShowModal.length; i++) {
  btnShowModal[i].addEventListener("click", openModal);
}

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
