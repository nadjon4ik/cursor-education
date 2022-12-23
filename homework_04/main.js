"use strict";

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

function strToArray(value) {
  return value
    .split(",")
    .map((item) => {
      return item.trim();
    })
    .filter((str) => str !== "");
}

function capitalizationСonversion(arr = []) {
  return arr.map((item) => {
    return item[0].toUpperCase() + item.slice(1).toLowerCase();
  });
}

const input = document.querySelector(".input");
const sudentsField = document.getElementById("students");
const themesInput = document.getElementById("tasks");
const labelThem = document.querySelector(".numb-them");
const div = document.querySelector("#themes");
const btnSetThemes = document.querySelector("#setThemes");
const fieldset = document.querySelector(".marks");
const wrapper = document.querySelector(".wrap");
const refresh = document.querySelector(".st-refresh");
const marks = [];
const submit = document.querySelector(".btn-submit");
const table = document.querySelector("table");
const tbody = document.querySelector("tbody");

// validation;
sudentsField.addEventListener("keydown", preventKeys(/[^a-zа-яі,\s]/i));
themesInput.addEventListener("keydown", preventKeys(/[^a-zа-яі,\s]/i));

function preventKeys(pattern) {
  return function (e) {
    if (pattern.test(e.key) && e.keyCode !== 8) {
      e.preventDefault();
      showPopup(
        "Invalid character",
        this.offsetLeft,
        this.offsetTop + this.offsetHeight
      );
    }
  };
}

function showPopup(content, x, y) {
  const exist = document.querySelector(".popup");
  if (!exist) {
    const d = document.createElement("div");
    d.classList.add("popup");
    d.innerHTML = content;
    if (typeof x !== "undefined" && typeof y !== "undefined") {
      d.style.display = "absolute";
      d.style.left = x + "px";
      d.style.top = y + "px";
    }
    document.body.appendChild(d);
    setTimeout(() => {
      document.body.removeChild(d);
    }, 1000);
  }
}
sudentsField.addEventListener("input", () => {
  const numPears = Math.ceil(strToArray(sudentsField.value).length / 2);
  labelThem.innerHTML = numPears;
});

refresh.addEventListener("click", () => {
  hide([fieldset, table], "hidden");
  btnSetThemes.removeAttribute("disabled", "");

  wrapper.innerHTML = "";
});

function createInputElement(arr, thema) {
  const template = document
    .querySelector("#template-result")
    .content.cloneNode(true);

  template
    .querySelector("input")
    .addEventListener("keypress", preventKeys(/[^1-5]/i));
  const names = template.querySelector(".names");
  const theme = template.querySelector(".theme");
  names.textContent = arr.join(" - ");
  theme.textContent = thema;
  return template;
}

function createTable(num, name, thema, mark) {
  const template = document.querySelector("#results");
  const clone = template.content.cloneNode(true);
  let td = clone.querySelectorAll("td");
  td[0].textContent = num;
  td[1].textContent = name;
  td[2].textContent = thema;
  td[3].textContent = mark;
  return tbody.appendChild(clone);
}

btnSetThemes.addEventListener("click", (e) => {
  e.preventDefault();
  const students = capitalizationСonversion(strToArray(sudentsField.value));

  const pairs = getPairs(
    shuffle(getBoys(students)),
    shuffle(getGirls(students))
  );

  const themes = shuffle(
    capitalizationСonversion(strToArray(themesInput.value))
  );

  if (students.length == 0) {
    showPopup(
      "Fill this field!",
      sudentsField.offsetLeft,
      sudentsField.offsetTop + sudentsField.offsetHeight
    );
    return;
  }

  const numPears = Math.ceil(strToArray(sudentsField.value).length / 2);

  if (themes.length == 0) {
    showPopup(
      "Fill this field!",
      themesInput.offsetLeft,
      themesInput.offsetTop + themesInput.offsetHeight
    );
    return;
  } else if (themes.length < numPears) {
    showPopup(
      "Not enought inputs themes!",
      themesInput.offsetLeft,
      themesInput.offsetTop + themesInput.offsetHeight
    );
    return;
  }

  show([fieldset], "hidden");

  wrapper.innerHTML = "";

  for (let i = 0; i < pairs.length; i++) {
    wrapper.appendChild(createInputElement(pairs[i], themes[i]));
  }

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    btnSetThemes.setAttribute("disabled", "");

    const inputs = [...wrapper.querySelectorAll("input")];

    const marks = inputs.map((input) => {
      if (isNaN(input.value) || input.value == "") {
        showPopup(
          "Input value",
          input.offsetLeft,
          input.offsetTop + input.offsetHeight
        );
        throw new Error("Invalid input");
      } else {
        show([table]);
        return parseInt(input.value, 10);
      }
    });

    const data = setDataStructure(pairs, themes, shuffle(marks));

    let i = 1;
    tbody.innerHTML = "";
    for (let row of data) {
      const [name, theme, mark, res] = row;
      for (let ind of res) {
        console.log(res);
        createTable(i++, ind[0], theme, ind[1]);
      }
    }
  });
});

function show(arr = []) {
  removeClass(arr, "hidden");
}

function hide(arr = []) {
  addClass(arr, "hidden");
}

function addClass(arr, className) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].classList.add(className);
  }
}

function removeClass(arr, className) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].classList.remove(className);
  }
}

const btnIcon = document.querySelector(".st-icon");
const btnInfo = document.querySelector(".st-info");

btnIcon.addEventListener("click", function () {
  const content = `${setDataStructure} \n ${isFemale} \n ${getGirls}\n ${getBoys}\n ${setRandomRangeMark}\n ${shuffle}\n ${pick}\n ${zip}\n ${zip_pair}\n ${bigger}\n ${smaller}\n ${getPairs}`;
  return (code = showInfo(content));
});

btnInfo.addEventListener("click", function () {
  const content = `  Веб-сторінка призначенна для розділу студентів на пари (хлопець + дівчина). \n  Якщо повторно натиснути кнопку "Задати" можна випадковим чином утворювати пари з випадковими темами. \n  За допомогою кнопки "вивести" можна генерувати випадкові оцінки кожному студенту в табличці.`;
  return (code = showInfo(content));
});

function showInfo(info) {
  const code = decodeURIComponent(info);
  const codeInfo = document.querySelector(".info-code");
  return (codeInfo.textContent = code);
}

const btnShowModal = document.querySelectorAll(".show-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

for (let i = 0; i < btnShowModal.length; i++) {
  btnShowModal[i].addEventListener("click", openModal);
}

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
