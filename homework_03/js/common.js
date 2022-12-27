export function getMaxDigit(maxValue) {
  maxValue = transformToNumber(String(maxValue));
  const arr = maxValue.split('').map((item) => parseInt(item, 10));
  return Math.max(...arr);
}

export function transformToNumber(str) {
  const regExp = /[^\d+$]/g;
  return str.replaceAll(regExp, '');
}

export function transformStringWithoutNumbers(str) {
  const regExp = /[^\w+$]/g;
  return str.replaceAll(regExp, '');
}
export function calcPow(num, pow) {
  if (pow < 0) {
    return 0;
  }
  let result = 1;
  for (let i = 0; i < pow; i++) {
    result *= num;
  }
  return result;
}

export function formatFirstLetterName(str) {
  str = transformStringWithoutNumbers(str);
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function salaryIncludTax(value) {
  value = transformToNumber(value);
  return Math.floor(value - value * (19.5 / 100));
}

export function getRandomNumber(min, max) {
  min = transformToNumber(min);
  max = transformToNumber(max);
  return Math.round(Math.random() * (max - min + 1) + min);
}

export function countLetter(lett, word) {
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
export function convertCurrency(value, exch) {
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
export function getRandomPassword(len = 8) {
  let str = '';
  for (let i = 0; i < len; ++i) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}

export function deleteLetters(lett, word) {
  const regExp = new RegExp(`${lett}`, 'ig');
  return word.replace(regExp, '');
}

export function isPalyndrom(str) {
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

export function deleteDuplicateLetter(str) {
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
