export {
  getSubjects,
  outputGetStudentInfo,
  getStudentsName,
  getBestStudent,
  calculateWordLetters,
  getAverageMark,
  getStudentInfo,
  getAverage,
};
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
  const marks = Object.values(item.subjects);
  const marksArr = [];
  marks.map((arr) => {
    marksArr.push(...arr);
  });
  return getAverage(marksArr);
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
  const { name, course, averageMark, ...rest } = student;
  return parseObjectInArr({ course, name, averageMark });
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
