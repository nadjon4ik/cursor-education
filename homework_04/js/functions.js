export {
  setDataStructure,
  isFemale,
  getGirls,
  getBoys,
  setRandomRangeMark,
  shuffle,
  pick,
  zip,
  zip_pair,
  bigger,
  smaller,
  getPairs,
  capitalizationСonversion,
};
function setDataStructure(names, themes, mark) {
  const arr = [...names];
  const data = [];
  for (let i = 0; i < arr.length; i++) {
    data.push([
      arr[i],
      `"${themes[i]}"`,
      mark[i],
      arr[i].length < 2
        ? [[arr[i][0], setRandomRangeMark(mark[i])]]
        : [
            [arr[i][0], setRandomRangeMark(mark[i])],
            [arr[i][1], setRandomRangeMark(mark[i])],
          ],
    ]);
  }
  return data;
}

function isFemale(name) {
  return /(?:Естер|Есфір|Рут|Рут|Юдит|Юдиф)|я$|а$/gi.test(name);
}

function getGirls(arr) {
  return arr.filter((name) => isFemale(name));
}

function getBoys(arr) {
  return arr.filter((name) => !isFemale(name));
}

function setRandomRangeMark(mark) {
  return Math.floor(Math.random() * (1 + mark - (mark - 1))) + mark - 1;
}

function shuffle(arr) {
  arr = [...arr];
  let result = [];
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    result.push(pick(arr));
  }
  return result;
}

function pick(arr) {
  const index = Math.floor(Math.random() * arr.length);
  const [res] = arr.splice(index, 1);
  return res;
}

function zip(a, b) {
  const res = [];
  const len = a.length;
  if (!Array.isArray(a) && !Array.isArray(b)) {
    res.push(a, b);
  } else {
    for (let i = 0; i < len; ++i) {
      res.push([a[i], b[i]]);
    }
  }
  return res;
}

function zip_pair(arr) {
  const res = [];
  for (let i = 0; i < arr.length; i += 2) {
    const s = [];
    if (arr[i]) {
      s.push(arr[i]);
    }
    if (arr[i + 1]) {
      s.push(arr[i + 1]);
    }
    res.push(s);
  }
  return res;
}

function bigger(arr1, arr2) {
  if (arr1.length > arr2.length) {
    return arr1;
  }
  return arr2;
}

function smaller(arr1, arr2) {
  if (arr1.length > arr2.length) {
    return arr2;
  }
  return arr1;
}
function getPairs(arr1, arr2) {
  const max = bigger(arr1, arr2);
  const min = smaller(arr1, arr2);
  const matched_arr = max.slice(0, min.length);
  const pairs = zip(min, matched_arr);
  return pairs.concat(zip_pair(max.slice(min.length)));
}

function capitalizationСonversion(arr = []) {
  return arr.map((item) => {
    return item[0].toUpperCase() + item.slice(1).toLowerCase();
  });
}
