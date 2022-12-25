// functions
function getMaxDigit(maxValue) {
  const arr = String(maxValue)
    .split('')
    .map((item) => parseInt(item, 10));
  return Math.max(...arr);
}

function isNaNArr(arr) {
  return arr.some((elem) => isNaN(elem));
}

function calcPow(num, pow) {
  if (pow < 0) {
    return '';
  }
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
  return Math.floor(Math.random() * (m - n + 1) + n);
}

function countLetter(lett, word) {
  lett = lett.toLowerCase();
  word = word.toLowerCase();
  let count = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] == lett) {
      count++;
    }
  }
  return count;
}

// конвертація валюти
function convertCurrency(value, exch) {
  if (isUAH(value)) {
    return `${(parseInt(value, 10) / exch).toFixed(2)}$`;
  } else if (isUSD(value)) {
    return `${(parseInt(value, 10) * exch).toFixed(2)}грн.`;
  }

  if (!checkCurrency(value)) {
    return 'Enter correct valute!';
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
// в мене створення інпутів звлежить від довжини параметрів функції, тому я не можу прописати len=8, я вже тестила
function getRandomPassword(len) {
  let str = '';
  for (let i = 0; i < len; ++i) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
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
    placeholder: ['1236'],
    validation: ['number'],
  },
  {
    content: 'Функція №2 (Функція №2 (Піднесення числа до степеня).',
    funcName: 'CalcPow',
    action: calcPow,
    placeholder: ['2', '2'],
    validation: ['number', 'number'],
  },
  {
    content: 'Функція №3 (Форматування імені користувача).',
    funcName: 'FormatFirstLetterName',
    action: formatFirstLetterName,
    placeholder: ['вЛАД'],
    validation: ['string'],
  },
  {
    content: 'Функція №4(Обчислнння заробітньої плати).',
    funcName: 'SalaryIncludTax',
    action: salaryIncludTax,
    placeholder: ['1000'],
    validation: ['number'],
  },
  {
    content: 'Функція №5(Генерування випадкового цілого числа).',
    funcName: 'GetRandomNumber',
    action: getRandomNumber,
    placeholder: ['1', '10'],
    validation: ['number', 'number'],
  },
  {
    content: 'Функція №6(Розрахунок повторів букви у слові).',
    funcName: 'CountLetter',
    action: countLetter,
    placeholder: ['а', 'Асталавіста'],
    validation: ['string', 'string'],
  },
  {
    content: 'Функція №7(Конвертація долару в гривні та навпаки).',
    funcName: 'ConvertCurrency',
    action: convertCurrency,
    placeholder: ['2500uAh', 25],
    validation: ['no-validation', 'number'],
  },
  {
    content:
      'Функція №8(Генерування випадкового паролю із заданою довжиною користувачем)',
    funcName: 'GetRandomPassword',
    action: getRandomPassword,
    placeholder: ['8'],
    validation: ['number'],
  },
  {
    content: 'Функція №9(Видалення задачної букви із речення).',
    funcName: 'DeleteLetters',
    action: deleteLetters,
    placeholder: ['a', 'blablablabla'],
    validation: ['string', 'string'],
  },
  {
    content: 'Функція №10(Паліндром?).',
    funcName: 'IsPalyndrom',
    action: isPalyndrom,
    placeholder: ['я несу гусеня'],
    validation: ['string'],
  },
  {
    content: 'Функція №11(Видалення букв, що повторюються).',
    funcName: 'DeleteDuplicateLetter',
    action: deleteDuplicateLetter,
    placeholder: ['Бісківіт був дуже ніжним'],
    validation: ['string'],
  },
];
const wrapper = document.querySelector('.wrapper');

function showPopup(content, x, y) {
  const exist = document.querySelector('.popup');
  if (!exist) {
    const d = document.createElement('div');
    d.classList.add('popup');
    d.innerHTML = content;
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
      d.style.display = 'absolute';
      d.style.left = x + 'px';
      d.style.top = y + 'px';
    }
    document.body.appendChild(d);
    setTimeout(() => {
      document.body.removeChild(d);
    }, 1000);
  }
}

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
    const template = document
      .getElementById('text-input')
      .content.cloneNode(true);
    const inp = template.querySelector('.text-input');
    inp.setAttribute('placeholder', `${item.placeholder[i]}`);
    dyn.appendChild(inp);
  }

  const submit = template.querySelector('[type=submit]');
  const output = template.querySelector('.st-output');

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const inputs = [...dyn.querySelectorAll('input')];
    const values = inputs.map((input, i) => {
      switch (item.validation[i]) {
        case 'number': {
          if (!/^[0-9]+$/.test(input.value)) {
            showPopup(
              `Invalid number`,
              input.offsetLeft,
              input.offsetTop + input.offsetHeight
            );
          }
          return parseInt(input.value, 10);
        }
        case 'string': {
          if (!/^([a-zA-zuah\s]|[а-яА-я]|\$)/gi.test(input.value)) {
            showPopup(
              `Invalid string`,
              input.offsetLeft,
              input.offsetTop + input.offsetHeight
            );
          }
          return input.value;
        }
        default: {
          return input.value;
        }
      }
    });

    const result = item.action(...values);
    output.textContent = String(result);

    return inputs.map((el) => {
      if (
        el.value == '' ||
        (isNaN(el.value) && item.validation == 'number') ||
        (Number(el.value) && item.validation == 'string')
      )
        return (output.textContent = '');
    });
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
