'use strict';

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

function getSubjects(item) {
  const subjects = Object.keys(item.subjects);
  return subjects
    .map((el) => {
      return firstLetterUpCase(el).replace('_', ' ');
    })
    .join(', ');
}

function firstLetterUpCase(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function getAverageMark(item) {
  // function getAverage(arr) {
  //   arr = [...arr];
  //   return (
  //     arr.reduce((acc, el) => {
  //       return acc + el;
  //     }) / arr.length
  //   ).toFixed(2);
  // }
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

//Ця функція для виведення результату на сторінку. По суті, функція працює лише return rest, але на виводі буде об'єкт, нічого кращо я не придумала))
function parseObjectInArr(obj) {
  const res = [];
  Object.entries(obj).map((el) => {
    console.log();
    res.push(`"${el[0]}": ${el[1]}`);
  });
  return res;
}

function getStudentInfo(student) {
  student.averageMark = getAverageMark(student);
  const { subjects, ...rest } = student;
  return rest;
}

function outputGetStudentInfo(student) {
  student.averageMark = getAverageMark(student);
  const { subjects, ...rest } = student;
  return parseObjectInArr(rest);
}

function getStudentsName(students) {
  const names = students.map((el) => {
    const { name, ...rest } = el;
    return name;
  });
  return names
    .sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    })
    .join(', ');
}

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

function calculateWordLetters(word) {
  const str = word.toLowerCase().replaceAll(/\s/gi, '');
  const res = {};
  for (let ch of str) {
    if (res.hasOwnProperty(ch)) {
      ++res[ch];
    } else {
      res[ch] = 1;
    }
  }
  return parseObjectInArr(res); //можна обійтись просто return res, але для виводу функції треба запарсити в масив
}

const list = [
  {
    content: 'Функція №1 (Повертає список предметів для конкретного студента).',
    funcName: 'GetSubjects',
    action: getSubjects,
    placeholder: ['studets[0] ([1] чи [2])'],
    validation: ['expression'],
    info: getSubjects,
  },
  {
    content: 'Функція №2 (Виводить середню оцінку студента по всіх предметах).',
    funcName: 'GetAverageMark',
    action: getAverageMark,
    placeholder: ['studets[0] ([1] чи [2])'],
    validation: ['expression'],
    info: getAverageMark,
  },
  {
    content:
      "Функція №3 (Повертає інформацію загального вигляду ([курс, ім'я, середня оцінка]) ).",
    funcName: 'GetStudentInfo',
    action: outputGetStudentInfo,
    placeholder: ['studets[0] ([1] чи [2])'],
    validation: ['expression'],
    info: getStudentInfo,
  },
  {
    content: 'Функція №4 (Повертає імена студентів в алфавітному порядку).',
    funcName: 'GetStudentsName',
    action: getStudentsName,
    placeholder: ['students'],
    validation: ['expression'],
    info: getStudentsName,
  },
  {
    content:
      'Функція №5 (Повертає кращого студента зі списку по показнику середньої оцінки).',
    funcName: 'GetBestStudent',
    action: getBestStudent,
    placeholder: ['students'],
    validation: ['expression'],
    info: getBestStudent,
  },
  {
    content:
      "Функція №6 (Повертає обє'кт, в якому ключь - букви у слові, а значення – кількість їх повторень).",
    funcName: 'CalculateWordLetters',
    action: calculateWordLetters,
    placeholder: ['word'],
    validation: ['string'],
    info: calculateWordLetters,
  },
];

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
  icon.dataset.code = encodeURIComponent(item.info.toString());

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
    inp.setAttribute('placeholder', `${item.placeholder[i]}`);
    dyn.appendChild(template);
  }

  const submit = template.querySelector('[type=submit]');
  const output = template.querySelector('.st-output');

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const inputs = [...dyn.querySelectorAll('input')];

    const values = inputs.map((input, i) => {
      switch (item.validation[i]) {
        case 'expression':
          if (!/[students]\[[0-2]\] |[students]/g.test(input.value)) {
            showPopup(
              `Please, enter velue as in a placeholder's`,
              input.offsetLeft,
              input.offsetTop + input.offsetHeight
            );
            return;
          }
          try {
            const result = new Function('students', `return ${input.value}`);
            return result(students);
          } catch (error) {
            showPopup(
              `${error}`,
              input.offsetLeft,
              input.offsetTop + input.offsetHeight
            );
          }

        case 'string': {
          if (!/([a-zA-Zа-яА-ЯіІ])/gi.test(input.value)) {
            showPopup(
              `Invalid string`,
              input.offsetLeft,
              input.offsetTop + input.offsetHeight
            );
            return output.classList.add('hidden');
          }
          return input.value;
        }
        default:
          return input.value;
      }
    });
    try {
      const result = item.action(...values);
      output.classList.remove('hidden');
      output.innerHTML = result;
    } catch (error) {
      inputs.map((input) => {
        showPopup(
          `${error}`,
          input.offsetLeft,
          input.offsetTop + input.offsetHeight
        );
      });
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
