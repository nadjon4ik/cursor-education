const priceOfSuger = 15.678;
const priceOfSalt = 123.965;
const priceOfPotato = 90.2345;
const arr = [priceOfSuger, priceOfSalt, priceOfPotato];
const sum = priceOfSuger + priceOfSalt + priceOfPotato;
const sumWithoutCoins =
  Math.floor(priceOfSuger) +
  Math.floor(priceOfSalt) +
  Math.floor(priceOfPotato);

const discount = Math.floor(Math.random() * 90) + 1;

const amount = Number(prompt('Введіть суму оплати:', 500));

const price = Number(
  prompt('Введіть, будь-ласка, ціну на товар для вичислення прибутку:', 260.66)
);
const inputDiscount = Number(
  prompt('Введіть знижку на товар для обчислення прибутку:', 10)
);

confirm('Запустіть консоль (F12)');

const evenSum = sumWithoutCoins % 2 == 0;

console.log(`Максимальна ціна: ${Math.max(...arr)} грн.
Мінімальна ціна: ${Math.min(...arr)} грн.
Вартість всіх товарів: ${sum} грн.
Вартість всіх товарів без копійок: ${sumWithoutCoins} грн.
Сума товару в сотнях: ${
  Math.floor(sum) % 100 >= 50
    ? Math.floor(sum) - (Math.floor(sum) % 100) + 100
    : Math.floor(sum) - (Math.floor(sum) % 100)
}
Сума всіх товарів парна? ${evenSum ? evenSum : evenSum}
Ви заплатили - ${amount}. Ваша решта складає: ${amount - sum} грн.
Середнє значення цін: ${(sum / 3).toFixed(2)} грн.
Сума до оплати враховуючи знижку ${discount}% складає ${(
  sum -
  sum * (discount / 100)
).toFixed(2)} грн.
Знижка на товар складає ${inputDiscount}%. Ціна товару - ${price}. Прибуток за товар - ${Math.round(
  price / 2 - price * (inputDiscount / 100)
)} грн.
`);
