function getRandomArray(len, min, max) {
  return new Array(len)
    .fill(0)
    .map((el) => Math.floor(Math.random() * (max - min) + min));
}

function getModa(arr) {
  const integer = getIntegerFromArray(arr);
  const mode = {};
  let max = 0;
  let count = 0;

  for (let item of integer) {
    if (mode.hasOwnProperty(item)) {
      ++mode[item];
    } else {
      mode[item] = 1;
    }

    if (mode[item] > count) {
      max = item;
      count = mode[item];
    }
  }
  return max;
}

function getAverage(arr) {
  const integer = getIntegerFromArray(arr);
  return (
    integer.reduce((acc, item) => {
      return acc + item;
    }, 0) / integer.length
  ).toFixed(1);
}

function getMedian(arr) {
  const integer = getIntegerFromArray(arr);
  const sorted = integer.sort((a, b) => a - b);
  if (sorted.length % 2 != 0) {
    return sorted[Math.floor(sorted.length / 2)];
  }
  return (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
}

function getIntegerFromArray(arr = []) {
  return arr.filter((el) => Number.isInteger(el));
}

function filterEvenNumbers(arr) {
  const integer = getIntegerFromArray(arr);
  return integer.filter((el) => el % 2 !== 0);
}

function countPositiveNumber(arr) {
  return arr.filter((el) => el > 0).length;
}

function getDividedByFive(arr) {
  return arr.filter((el) => el % 5 == 0);
}

function replaceBadWords(str) {
  const strArr = str.split(' ');
  const badWord = /(shit|fuck)/gi;
  const res = strArr.map((item) => {
    if (badWord.test(item)) {
      item = item.replace(badWord, '****');
    }
    return item;
  });
  return res.join(' ');
}

function dividedByThree(word) {
  const newWord = word.trim().toLowerCase();
  const res = [];
  for (let i = 0; i < newWord.length; i += 3) {
    res.push(newWord.substring(i, i + 3));
  }
  return res;
}
// //output
const list = [
  {
    content: 'Функція №1 (Генерування масиву випадкових цілих чисел).',
    funcName: 'GetRandomArray',
    action: getRandomArray,
    validation: ['integer', 'integer', 'integer'],
    placeholder: '1,2,3,6',
    'type of output': '[]',
  },
  {
    content: 'Функція №2 (Функція №2 (Визначення моди масиву).',
    funcName: 'GetModa',
    action: getModa,
    validation: ['number'],
    placeholder: '1,2,3,6',
    'type of output': 'number',
  },
  {
    content: 'Функція №3 (Середнє арифметичне всіх чисел).',
    funcName: 'GetAverage',
    action: getAverage,
    validation: ['number'],
    placeholder: '1,2,3,6',
    'type of output': 'number',
  },
  {
    content: 'Функція №4(Обчислнння медіани всіх чисел).',
    funcName: 'GetMedian',
    action: getMedian,
    validation: ['number'],
    placeholder: '1,2,3,6',
    'type of output': 'number',
  },
  {
    content: 'Функція №5(Фільтрація парних чисел).',
    funcName: 'FilterEvenNumbers',
    action: filterEvenNumbers,
    validation: ['number'],
    placeholder: '1,2,3,6',
    'type of output': '[]',
  },
  {
    content: 'Функція №6(Виводить числа, що діляться на 5 ).',
    funcName: 'GetDividedByFive',
    action: getDividedByFive,
    validation: ['number'],
    placeholder: '1,2,3,6',
    'type of output': '[]',
  },
  {
    content: 'Функція №7(Виводить кількість позитивних чисел).',
    funcName: 'СountPositiveNumber',
    action: countPositiveNumber,
    validation: ['number'],
    placeholder: '1,2,3,6',
    'type of output': 'number',
  },
  {
    content: 'Функція №8(Цензура)',
    funcName: 'ReplaceBadWords',
    action: replaceBadWords,
    validation: ['string'],
    placeholder: 'Are you fucking kidding?',
    'type of output': 'string',
  },
  {
    content: 'Функція №9(Розбиття слова на 3-ох значні склади).',
    funcName: 'DividedByThree',
    action: dividedByThree,
    placeholder: 'word',
    validation: ['string'],
    'type of output': '[]',
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
    const inp = template.querySelector('input');
    inp.setAttribute('placeholder', `${item.placeholder}`);
    dyn.appendChild(template);
  }

  const submit = template.querySelector('[type=submit]');
  const output = template.querySelector('.st-output');

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const inputs = [...dyn.querySelectorAll('input')];

    const values = inputs.map((input, i) => {
      switch (item.validation[i]) {
        case 'integer': {
          if (!/^[0-9]|\,$/.test(input.value)) {
            showPopup(
              `Invalid integer`,
              input.offsetLeft,
              input.offsetTop + input.offsetHeight
            );
          }
          return parseInt(input.value, 10);
        }
        case 'string': {
          if (/[0-9]$/.test(input.value)) {
            showPopup(
              `Invalid string`,
              input.offsetLeft,
              input.offsetTop + input.offsetHeight
            );
          }
          return input.value;
        }
        case 'number': {
          if (!/^[+-]|[0-9]|\,$/.test(input.value)) {
            showPopup(
              `invalid number`,
              input.offsetLeft,
              input.offsetTop + input.offsetHeight
            );
            return input.value;
          }
          return input.value.split(',').map((el) => Number(el));
        }
        default:
          return input.value;
      }
    });
    const result = item.action(...values);

    item['type of output'] == 'number' || item['type of output'] == 'string'
      ? (output.textContent = `${String(result)}`)
      : (output.textContent = `[${String(result)}]`);
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
