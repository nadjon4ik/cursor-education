// functions
import {
  getMaxDigit,
  calcPow,
  formatFirstLetterName,
  salaryIncludTax,
  getRandomNumber,
  countLetter,
  convertCurrency,
  getRandomPassword,
  deleteLetters,
  isPalyndrom,
  deleteDuplicateLetter,
  transformToNumber,
  transformStringWithoutNumbers,
} from './common.js';
//end
//output
const list = [
  {
    content: 'Функція №1 (Вивід найбільшої цифри з числа).',
    funcName: 'GetMaxDigit',
    action: getMaxDigit,
    placeholder: ['1236'],
    args: 1,
    info: `${getMaxDigit} \n ${transformToNumber}`,
  },
  {
    content: 'Функція №2 (Піднесення числа до степеня).',
    funcName: 'CalcPow',
    action: calcPow,
    placeholder: ['2', '2'],
    args: 2,
    info: calcPow,
  },
  {
    content: 'Функція №3 (Форматування імені користувача).',
    funcName: 'FormatFirstLetterName',
    action: formatFirstLetterName,
    placeholder: ['вЛАД'],
    args: 1,
    info: `${formatFirstLetterName} \n ${transformStringWithoutNumbers}`,
  },
  {
    content: 'Функція №4(Обчислнння заробітньої плати).',
    funcName: 'SalaryIncludTax',
    action: salaryIncludTax,
    placeholder: ['1000'],
    args: 1,
    info: `${salaryIncludTax} \n ${transformToNumber}`,
  },
  {
    content: 'Функція №5(Генерування випадкового цілого числа).',
    funcName: 'GetRandomNumber',
    action: getRandomNumber,
    placeholder: ['1', '10'],
    args: 2,
    info: `${getRandomNumber} \n ${transformToNumber}`,
  },
  {
    content: 'Функція №6(Розрахунок повторів букви у слові).',
    funcName: 'CountLetter',
    action: countLetter,
    placeholder: ['а', 'Асталавіста'],
    args: 2,
    info: countLetter,
  },
  {
    content: 'Функція №7(Конвертація долару в гривні та навпаки).',
    funcName: 'ConvertCurrency',
    action: convertCurrency,
    placeholder: ['2500uAh', 25],
    args: 2,
    info: convertCurrency,
  },
  {
    content:
      'Функція №8(Генерування випадкового паролю із заданою довжиною користувачем)',
    funcName: 'GetRandomPassword',
    action: getRandomPassword,
    placeholder: ['8'],
    args: 1,
    info: getRandomPassword,
  },
  {
    content: 'Функція №9(Видалення задачної букви із речення).',
    funcName: 'DeleteLetters',
    action: deleteLetters,
    placeholder: ['a', 'blablablabla'],
    args: 2,
    info: deleteLetters,
  },
  {
    content: 'Функція №10(Паліндром?).',
    funcName: 'IsPalyndrom',
    action: isPalyndrom,
    placeholder: ['я несу гусеня'],
    args: 1,
    info: isPalyndrom,
  },
  {
    content: 'Функція №11(Видалення букв, що повторюються).',
    funcName: 'DeleteDuplicateLetter',
    action: deleteDuplicateLetter,
    placeholder: ['Бісківіт був дуже ніжним'],
    args: 1,
    info: deleteDuplicateLetter,
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
    }, 2000);
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
  icon.dataset.code = item.info;
  icon.addEventListener('click', function () {
    const code = decodeURIComponent(this.dataset.code);
    const codeInfo = document.querySelector('.info-code');
    codeInfo.textContent = code;
  });

  for (let i = 0; i < item.args; ++i) {
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
    const values = inputs.map((input) => {
      return input.value;
    });

    const result = item.action(...values);
    output.textContent = String(result);

    return inputs.map((el) => {
      if (el.value == '') {
        showPopup(
          `Empty input, please, enter value!`,
          el.offsetLeft,
          el.offsetTop + el.offsetHeight
        );
        return (output.textContent = '');
      }
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
