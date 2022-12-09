const priceOfSuger = 15.678;
const priceOfSalt = 123.965;
const priceOfPotato = 90.2345;
const amount = Number(prompt('Введіть суму оплати:', 500));
const discountFixed = (Math.random() * 90).toFixed(2);
const discount = Math.floor(discountFixed);
const price = Number(
  prompt('Введіть, будь-ласка, ціну на товар для вичислення прибутку:', 260.66)
);

const inputDiscount = Number(
  prompt('Введіть знижку на товар для обчислення прибутку:')
);
console.log(
  `Максимальна ціна: ${Math.max(priceOfSuger, priceOfSalt, priceOfPotato)} грн.`
);
console.log(
  `Мінімальна ціна: ${Math.min(priceOfSuger, priceOfSalt, priceOfPotato)} грн. `
);

const sum = priceOfSuger + priceOfSalt + priceOfPotato;
console.log(`Вартість всіх товарів: ${sum} грн.`);

const sumWithoutCoins =
  Math.floor(priceOfSuger) +
  Math.floor(priceOfSalt) +
  Math.floor(priceOfPotato);
console.log(`Вартість всіх товарів без копійок: ${sumWithoutCoins} грн.`);

console.log(
  `Сума товару в сотнях: ${
    Math.floor(sum) % 100 >= 50
      ? Math.floor(sum) - (Math.floor(sum) % 100) + 100
      : Math.floor(sum) - (Math.floor(sum) % 100)
  }`
);
console.log(
  `Сума всіх товарів парна? ${sumWithoutCoins % 2 == 0 ? true : false}`
);
console.log(
  `Ви заплатили - ${amount}. Ваша решта складає: ${amount - sum} грн.`
);
console.log(
  `Середнє значення цін: ${(
    (priceOfSuger + priceOfSalt + priceOfPotato) /
    3
  ).toFixed(2)} грн.`
);
console.log(
  `Сума до оплати враховуючи знижку ${discount}% складає ${(
    sum -
    sum * (discount / 100)
  ).toFixed(2)} грн.`
);
console.log(
  `Знижка на товар складає ${inputDiscount}%. Ціна на товару - ${price}. Прибуток за товар - ${Math.round(
    price / 2 - price * (inputDiscount / 100)
  )} грн.`
);
