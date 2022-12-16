// functions
function getMaxDigit(maxValue) {
  const arr = String(maxValue)
    .split('')
    .map((item) => parseInt(item, 10));
  return Math.max(...arr);
}

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
  return Math.floor(value - value * (19.5 / 100));
}

function getRandomNumber(n, m) {
  return Math.floor(Math.random() * (m - n) + n) + 1;
}

function countLetter(lett, word) {
  const regExp = new RegExp(`${lett}`, 'gi');
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
    return 'Error';
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
function getRandomPassword(len) {
  let s = '';
  if (len == '') {
    len = 8;
  }
  for (let i = 0; i < len; ++i) {
    s += Math.floor(Math.random() * 10);
  }
  return s;
}

function deleteLetters(lett, word) {
  const regExp = new RegExp(`${lett}`, 'ig');
  return word.replace(regExp, '');
}

function isPalyndrom(str) {
  const newStr = str.replace(/\s/g, '').toLowerCase();
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
  let newStr = str.replace(/\s/g, '').toLowerCase();
  for (let i = 0; i < newStr.length; i++) {
    if (matchChar(newStr, newStr[i])) {
      newStr = remChar(newStr, newStr[i]);
      --i;
    }
  }
  return newStr;

  function remChar(str, ch) {
    return str.replaceAll(ch, '');
  }

  function matchChar(str, ch) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      str[i] === ch ? ++count : count;
    }
    return count > 1 ? true : false;
  }
}

//end
//output
const list = [
  {
    content: 'Функція №1 (Вивід найбільшої цифри з числа).',
    funcName: 'GetMaxDigit',
    action: getMaxDigit,
    args: [[1236]],
    validation: ['number'],
  },
  {
    content: 'Функція №2 (Функція №2 (Піднесення числа до степеня).',
    funcName: 'CalcPow',
    action: calcPow,
    args: [[2], [2]],
    validation: ['number', 'number'],
  },
  {
    content: 'Функція №3 (Форматування імені користувача).',
    funcName: 'FormatFirstLetterName',
    action: formatFirstLetterName,
    args: [['вЛАД']],
    validation: ['string'],
  },
  {
    content: 'Функція №4(Обчислнння заробітньої плати).',
    funcName: 'SalaryIncludTax',
    action: salaryIncludTax,
    args: [[1000]],
    validation: ['number'],
  },
  {
    content: 'Функція №5(Генерування випадкового цілого числа).',
    funcName: 'GetRandomNumber',
    action: getRandomNumber,
    args: [[1], [10]],
    validation: ['number', 'number'],
  },
  {
    content: 'Функція №6(Розрахунок повторів букви у слові).',
    funcName: 'CountLetter',
    action: countLetter,
    args: [['а'], ['Асталавіста']],
    validation: ['string', 'string'],
  },
  {
    content: 'Функція №7(Конвертація долару в гривні та навпаки).',
    funcName: 'ConvertCurrency',
    action: convertCurrency,
    args: [['100$'], [25]],
    validation: ['string', 'number'],
  },
  {
    content:
      'Функція №8(Генерування випадкового паролю із заданою довжиною користувачем)',
    funcName: 'GetRandomPassword',
    action: getRandomPassword,
    args: [[8]],
    validation: ['no-validation'],
  },
  {
    content: 'Функція №9(Видалення задачної букви із речення).',
    funcName: 'DeleteLetters',
    action: deleteLetters,
    args: [['a'], ['blablablabla']],
    validation: ['string', 'string'],
  },
  {
    content: 'Функція №10(Паліндром?).',
    funcName: 'IsPalyndrom',
    action: isPalyndrom,
    args: [['я несу гусеня']],
    validation: ['string'],
  },
  {
    content: 'Функція №11(Видалення букв, що повторюються).',
    funcName: 'DeleteDuplicateLetter',
    action: deleteDuplicateLetter,
    args: [['Бісківіт був дуже ніжним']],
    validation: ['string'],
  },
];
const wrapper = document.querySelector('.wrapper');

function createElement(item) {
  const template = document
    .getElementById('item-template')
    .content.cloneNode(true);

  const title = template.querySelector('.content');
  title.textContent = item.content;

  const funcName = template.querySelector('.func_name');
  funcName.textContent = item.funcName;
  const dyn = template.querySelector('.dynamic');

  const icon = template.querySelector('.st-icon');
  icon.dataset.code = encodeURIComponent(item.action.toString());
  icon.addEventListener('click', function () {
    const code = decodeURIComponent(this.dataset.code);
    const codeInfo = document.querySelector('.info-code');
    codeInfo.textContent = code;
  });

  for (let i = 0; i < item.action.length; ++i) {
    const inp = document.getElementById('text-input').content.cloneNode(true);
    const inpEl = inp.querySelector('.text-input');
    inpEl.value = item.args[i];
    dyn.appendChild(inp);
  }

  const submit = template.querySelector('[type=submit]');
  const output = template.querySelector('.st-output');
  const error = template.querySelector('.error');

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    error.innerHTML = '';
    const inputs = [...dyn.querySelectorAll('input')];

    const values = inputs.map((input, i) => {
      switch (item.validation[i]) {
        case 'number': {
          if (!/^[+-]?[0-9]+$/.test(input.value)) {
            error.innerHTML += `invalid integer "${input.value}" for argument ${i}<br>`;
            return input.value;
          }
          return parseInt(input.value, 10);
        }
        case 'float': {
          if (!/^[+-]?([0-9]*[.])?[0-9]+$/.test(input.value)) {
            error.innerHTML += `invalid float "${input.value}" for argument ${i}<br>`;
            return input.value;
          }
          return parseFloat(input.value);
        }
        default:
          return input.value;
      }
    });

    if (error.textContent.length === 0) {
      const result = item.action(...values);
      output.textContent = String(result);
    } else {
      output.textContent = '';
    }
  });

  return template;
}

for (let item of list) {
  wrapper.appendChild(createElement(item));
}

const btnShowModal = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = function () {
  // codeContext.textContent = this.dataset.code;
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

for (let i = 0; i < btnShowModal.length; i++) {
  btnShowModal[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
