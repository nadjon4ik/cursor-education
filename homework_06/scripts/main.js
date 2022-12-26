// 'use strict';
// import {
//   getRandomArray,
//   getModa,
//   getAverage,
//   getMedian,
//   filterEvenNumbers,
//   getDividedByFive,
//   countPositiveNumber,
//   replaceBadWords,
//   dividedByThree,
//   getIntegerFromArray,
// } from './functions.js';
// //output
// const list = [
//   {
//     content: 'Функція №1 (Генерування масиву випадкових цілих чисел).',
//     funcName: 'GetRandomArray',
//     action: getRandomArray,
//     validation: ['integer', 'integer', 'integer'],
//     placeholder: ['len', 'min', 'max'],
//     'type of output': '[]',
//   },
//   {
//     content: 'Функція №2 (Функція №2 (Визначення моди масиву).',
//     funcName: 'GetModa',
//     action: getModa,
//     validation: ['number'],
//     placeholder: ['1,2,3,6'],
//     'type of output': 'number',
//   },
//   {
//     content: 'Функція №3 (Середнє арифметичне всіх чисел).',
//     funcName: 'GetAverage',
//     action: getAverage,
//     validation: ['number'],
//     placeholder: ['1,2,3,6'],
//     'type of output': 'number',
//   },
//   {
//     content: 'Функція №4(Обчислнння медіани всіх чисел).',
//     funcName: 'GetMedian',
//     action: getMedian,
//     validation: ['number'],
//     placeholder: ['1,2,3,6'],
//     'type of output': 'number',
//   },
//   {
//     content: 'Функція №5(Фільтрація парних чисел).',
//     funcName: 'FilterEvenNumbers',
//     action: filterEvenNumbers,
//     validation: ['number'],
//     placeholder: ['1,2,3,6'],
//     'type of output': '[]',
//   },
//   {
//     content: 'Функція №6(Виводить числа, що діляться на 5 ).',
//     funcName: 'GetDividedByFive',
//     action: getDividedByFive,
//     validation: ['number'],
//     placeholder: ['1,2,3,6'],
//     'type of output': '[]',
//   },
//   {
//     content: 'Функція №7(Виводить кількість позитивних чисел).',
//     funcName: 'СountPositiveNumber',
//     action: countPositiveNumber,
//     validation: ['number'],
//     placeholder: ['1,2,3,6'],
//     'type of output': 'number',
//   },
//   {
//     content: 'Функція №8(Цензура)',
//     funcName: 'ReplaceBadWords',
//     action: replaceBadWords,
//     validation: ['string'],
//     placeholder: ['Are you fucking kidding?'],
//     'type of output': 'string',
//   },
//   {
//     content: 'Функція №9(Розбиття слова на 3-ох значні склади).',
//     funcName: 'DividedByThree',
//     action: dividedByThree,
//     placeholder: ['word'],
//     validation: ['string'],
//     'type of output': '[]',
//   },
// ];
// const wrapper = document.querySelector('.wrapper');

// function showPopup(content, x, y) {
//   const exist = document.querySelector('.popup');
//   if (!exist) {
//     const d = document.createElement('div');
//     d.classList.add('popup');
//     d.innerHTML = content;
//     if (typeof x !== 'undefined' && typeof y !== 'undefined') {
//       d.style.display = 'absolute';
//       d.style.left = x + 'px';
//       d.style.top = y + 'px';
//     }
//     document.body.appendChild(d);
//     setTimeout(() => {
//       document.body.removeChild(d);
//     }, 1000);
//   }
// }

// function createElement(item) {
//   const template = document
//     .getElementById('item-template')
//     .content.cloneNode(true);

//   const title = template.querySelector('.content');
//   title.textContent = item.content;

//   const funcName = template.querySelector('.func_name');
//   funcName.textContent = item.funcName;
//   const dyn = template.querySelector('.dynamic');

//   const icon = template.querySelector('.st-icon');
//   icon.dataset.code = encodeURIComponent(item.action.toString());

//   icon.addEventListener('click', function () {
//     const code = decodeURIComponent(this.dataset.code);
//     const codeInfo = document.querySelector('.info-code');
//     codeInfo.textContent = code;
//   });

//   for (let i = 0; i < item.action.length; ++i) {
//     const template = document
//       .getElementById('text-input')
//       .content.cloneNode(true);
//     const inp = template.querySelector('input');
//     inp.setAttribute('placeholder', `${item.placeholder[i]}`);
//     dyn.appendChild(template);
//   }

//   const submit = template.querySelector('[type=submit]');
//   const output = template.querySelector('.st-output');

//   submit.addEventListener('click', (e) => {
//     e.preventDefault();
//     const inputs = [...dyn.querySelectorAll('input')];

//     const values = inputs.map((input, i) => {
//       switch (item.validation[i]) {
//         case 'integer': {
//           if (!/^[0-9]|\,$/.test(input.value)) {
//             showPopup(
//               `Invalid integer`,
//               input.offsetLeft,
//               input.offsetTop + input.offsetHeight
//             );
//           }
//           return parseInt(input.value, 10);
//         }
//         case 'string': {
//           if (!/([a-zA-Zа-яА-ЯіІ]|\?)/gi.test(input.value)) {
//             showPopup(
//               `Invalid string`,
//               input.offsetLeft,
//               input.offsetTop + input.offsetHeight
//             );
//           }
//           return input.value;
//         }
//         case 'number': {
//           if (!/^[+-]|[0-9]|\,$/.test(input.value)) {
//             showPopup(
//               `invalid number`,
//               input.offsetLeft,
//               input.offsetTop + input.offsetHeight
//             );
//           }
//           return input.value.split(',').map((el) => Number(el));
//         }
//         default:
//           return input.value;
//       }
//     });
//     const result = item.action(...values);

//     item['type of output'] == 'number' || item['type of output'] == 'string'
//       ? (output.textContent = `${String(result)}`)
//       : (output.textContent = `[${String(result)}]`);
//     inputs.map((input) => {
//       if (
//         input.value == '' ||
//         (/^[0-9]/gi.test(input.value) && item.validation == 'string') ||
//         (/^([a-zA-Z]|[а-яА-ЯіІ]|\?)/gi && item.validation == 'number') ||
//         (/^([a-zA-Z]|[а-яА-ЯіІ]|\?)/gi && item.validation == 'integer') ||
//         (input.value = '' && item.validation == 'integer')
//       ) {
//         output.textContent = '';
//       }
//     });
//   });

//   return template;
// }

// for (let item of list) {
//   wrapper.appendChild(createElement(item));
// }

// const btnShowModal = document.querySelectorAll('.show-modal');
// const modal = document.querySelector('.modal');
// const overlay = document.querySelector('.overlay');
// const btnCloseModal = document.querySelector('.close-modal');

// const closeModal = function () {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// };

// const openModal = function () {
//   // codeContext.textContent = this.dataset.code;
//   modal.classList.remove('hidden');
//   overlay.classList.remove('hidden');
// };

// for (let i = 0; i < btnShowModal.length; i++) {
//   btnShowModal[i].addEventListener('click', openModal);
// }

// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//     closeModal();
//   }
// });
const students = [
  {
    name: 'Tanya',
    course: 3,
    subjects: {
      math: [4, 4, 3, 4],
      algorithms: [3, 3, 3, 4, 4, 4],
      data_science: [5, 5, 3, 4],
    },
  },
  {
    name: 'Victor',
    course: 4,
    subjects: {
      physics: [5, 5, 5, 3],
      economics: [2, 3, 3, 3, 3, 5],
      geometry: [5, 5, 2, 3, 5],
    },
  },
  {
    name: 'Anton',
    course: 2,
    subjects: {
      statistics: [4, 5, 5, 5, 5, 3, 4, 3, 4, 5],
      english: [5, 3],
      cosmology: [5, 5, 5, 5],
    },
  },
];

// Створіть функцію getSubjects(students[0] --> ["Math", "Algorithms", "Data science"]
// - яка повертає список предметів для конкретного студента. Зверніть увагу –
// назву предмету необхідно повертати з великої літери, а _ – замінити на пробіл
// Створіть функцію getAverageMark(students[0]) --> 3.79 – яка поверне середню
// оцінку по усім предметам для переданого студента НЕ МАСИВА СТУДЕНТІВ.
// Оцінку округліть до 2ого знаку. Можна використовувати функції, написані у
// попередніх домашніх завданнях :)
// Створіть функцію getStudentInfo(students[0]) --> { "course": 3, "name": "Tanya",
// "averageMark": 3.79} – яка повертає інформацію загального виду по переданому
// студенту (вам знадобиться функція з попереднього завдання). ПОвинна бути
// виведена інформація: курс, ім'я, середня оцінка.
// Ствроіть функцію getStudentsNames(students) --> ["Anton", "Tanya, "Victor"] – яка
// повертає імена студентів у алфавітному порядку.
// Створіть функцію getBestStudent(students) --> "Anton" – яка повертає кращого
// студента зі списку по показнику середньої оцінки.
// Cтворіть функцію calculateWordLetters("тест") --> { "т": 2, "е": 1, "с": 1 } – яка
// повертає обє'кт, в якому ключі це букви у слові, а значення – кількість їх
// повторень.

function getSubjects(item) {
  const subjects = Object.keys(item.subjects);
  return subjects.map((el) => {
    return firstLetterUpCase(el).replace('_', ' ');
  });
}

function firstLetterUpCase(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function getAverageMark(item) {
  const marks = Object.values(item.subjects);
  return getAverage(marks.map((arr) => parseFloat(getAverage(arr), 10)));
}

function getAverage(arr) {
  arr = [...arr];
  return (
    arr.reduce((acc, el) => {
      return acc + el;
    }) / arr.length
  ).toFixed(2);
}

function getStudentInfo(student) {
  student.averageMark = getAverageMark(student);
  const { subjects, ...rest } = student;
  return rest;
}
function getStudentsName(students) {
  const names = students.map((el) => {
    const { name, ...rest } = el;
    return name;
  });
  return names.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
}

console.log(getStudentsName(students));

function getBestStudent(student) {
  const resultsOfStudents = student.map((el) => {
    const info = getStudentInfo(el);
    const { course, ...rest } = info;
    return rest;
  });
  const res = resultsOfStudents.reduce(
    (result, item) => {
      if (item.averageMark > result.maxAgv) {
        result.maxAgv = item.averageMark;
        result.name = item.name;
      }
      return result;
    },
    { name: '', maxAgv: 0 }
  );

  return res.name;
}
console.log(getBestStudent(students));
