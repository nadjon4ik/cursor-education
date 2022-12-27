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
} from './common.js';
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
    content: 'Функція №2 (Піднесення числа до степеня).',
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
          if (!/^[-0-9]+$/.test(input.value)) {
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
        (/^[0-9]/gi.test(el.value) && item.validation == 'string') ||
        (/^([a-zA-zuah\s]|[а-яА-я]|\$)/gi && el.validation == 'number') ||
        (el.value == '' && item.validation == 'string') ||
        (isNaN(el.value) && item.validation == 'number') ||
        (el.value == 'number' && item.validation == 'string')
      ) {
        console.log(typeof el.value);
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
