"use strict";

import {
  getMyTaxes,
  getMiddleTaxes,
  getTotalTaxes,
  getMySalary,
} from "./functions.js";

const ukraine = {
  tax: 0.195,
  middleSalary: 1789,
  vacancies: 11476,
};

const latvia = {
  tax: 0.25,
  middleSalary: 1586,
  vacancies: 3921,
};

const litva = {
  tax: 0.15,
  middleSalary: 1509,
  vacancies: 1114,
};

const obj = {
  ukraine,
  latvia,
  litva,
};

let mySalaryInterval;

function intervalOutput(callable) {
  if (mySalaryInterval) {
    clearInterval(mySalaryInterval);
  }
  mySalaryInterval = setInterval(callable, 10000);
}

const list = [
  {
    content:
      "Функція №1 (Рахує податки які ви заплатите як IT-спеціаліст в якійсь з країн).",
    funcName: "GetMyTaxes",
    action: getMyTaxes,
    placeholder: ["salary"],
    validation: ["number"],
    info: getMyTaxes,
    args: 1,
  },
  {
    content:
      "Функція №2 (Рахує скільки усередньому податків платять IT-спеціалісти у кожній країні).",
    funcName: "GetMiddleTaxes",
    action: getMiddleTaxes,
    placeholder: ["country"],
    validation: ["string"],
    info: getMiddleTaxes,
  },
  {
    content:
      "Функція №3 (Рахує, скільки всього податків платять IT-спеціалісти у кожній країні).",
    funcName: "GetTotalTaxes",
    action: getTotalTaxes,
    placeholder: ["country"],
    validation: ["string"],
    info: getTotalTaxes,
  },
  {
    content:
      "Функція №4 (Виводить об'єкт виду: {salary: number, taxes: number, profit: number } кожні 10 секунд. Розраховується взалежності від вибраної країни).",
    funcName: "GetMySalary",
    action: getMySalary,
    placeholder: ["country"],
    validation: ["string"],
    info: getMySalary,
  },
];

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

const wrapper = document.querySelector(".wrapper");

function getBound(itemValue, action) {
  return action.bind(obj[itemValue]);
}

function createElement(item) {
  const template = document
    .getElementById("item-template")
    .content.cloneNode(true);
  const title = template.querySelector(".content");
  title.textContent = item.content;

  const funcName = template.querySelector(".func_name");
  funcName.textContent = item.funcName;
  const dyn = template.querySelector(".dynamic");

  const array = ["ukraine", "latvia", "litva"];
  const selectList = document.createElement("select");
  selectList.className = "mySelect";
  dyn.appendChild(selectList);

  for (let i = 0; i < array.length; i++) {
    const option = document.createElement("option");
    option.value = array[i];
    option.text = array[i];
    selectList.appendChild(option);
  }

  const icon = template.querySelector(".st-icon");
  icon.dataset.code = encodeURIComponent(item.info.toString());

  icon.addEventListener("click", function () {
    const code = decodeURIComponent(this.dataset.code);
    const codeInfo = document.querySelector(".info-code");
    codeInfo.textContent = code;
  });

  for (let i = 0; i < item.args; ++i) {
    const template = document
      .getElementById("text-input")
      .content.cloneNode(true);
    const inp = template.querySelector("input");
    inp.setAttribute("placeholder", `${item.placeholder[i]}`);
    dyn.appendChild(template);
  }

  const submit = template.querySelector("[type=submit]");
  const output = template.querySelector(".st-output");

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const inputs = [...dyn.querySelectorAll("input")];

    const values = inputs.map((input, i) => {
      switch (item.validation[i]) {
        case "string": {
          if (/[a-zA-z]]/g.test(input.value)) {
            showPopup(
              `Enter value from object`,
              input.offsetLeft,
              input.offsetTop + input.offsetHeight
            );
            return;
          }
          try {
            return input.value;
          } catch (error) {
            showPopup(
              `Invalid value!`,
              input.offsetLeft,
              input.offsetTop + input.offsetHeight
            );
          }
        }
        case "number": {
          if (!/[0-9]/g.test(input.value)) {
            showPopup(
              `Please, enter value as in a placeholder's`,
              input.offsetLeft,
              input.offsetTop + input.offsetHeight
            );
            return parseInt(input.value, 10);
          }
          try {
            return input.value;
          } catch (error) {
            showPopup(
              `Invalid value!`,
              input.offsetLeft,
              input.offsetTop + input.offsetHeight
            );
          }
        }
        default:
          return input.value;
      }
    });

    const select = dyn.querySelector(".mySelect");
    if (!item.originalFn) {
      item.originalFn = item.action;
    }
    item.action = getBound(select.value, item.originalFn);
    const result = item.action.apply(null, values);

    if (item.funcName === "GetMySalary") {
      intervalOutput(() => {
        const result = item.action.apply(null, values);
        output.classList.remove("hidden");
        output.innerHTML = JSON.stringify(result, null, 4);
      });
    }

    try {
      output.classList.remove("hidden");
      if (typeof result === "string") {
        output.innerHTML = result;
      } else {
        output.innerHTML = JSON.stringify(result, null, 4);
      }
    } catch (error) {
      inputs.map((input) => {
        showPopup(
          `Invalid value!`,
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
