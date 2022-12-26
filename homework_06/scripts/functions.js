export {
  getRandomArray,
  getModa,
  getAverage,
  getMedian,
  filterEvenNumbers,
  countPositiveNumber,
  getDividedByFive,
  replaceBadWords,
  dividedByThree,
  getIntegerFromArray,
};
function getRandomArray(len, min, max) {
  if (isNaN(len)) {
    return;
  }
  return new Array(len)
    .fill(0)
    .map((el) => Math.floor(Math.random() * (max - min) + min));
}

function getModa(arr) {
  // function getIntegerFromArray(arr = []) {
  //   return arr.filter((el) => Number.isInteger(el));
  // }
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
