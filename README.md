# ЛР 2. Calculator. JavaScript

**Давыдов Кирилл Игоревич, ИУ5-44Б**

## Цель работы
Реализация логики калькулятора на JavaScript: ввод, операции, вычисление выражения, обработка ошибок.

## Тема
Калькулятор в стиле сайта музея Ю. А. Гагарина.

## Сайт для вдохновения
[Музей Ю. А. Гагарина](https://museumgagarin.ru/)

## Дополнительные задания

1. Цвет вывода результата должен определяться самим результатом в 16-ричной системе.
2. Исправить ошибку с ведущими нулями (`0000`, `00001`), чтобы такие записи не приводили к некорректным вычислениям.

## Как реализовано

### 1) Перевод результата в hex-цвет
После вычисления берется целая часть результата, ограничивается диапазоном `0x000000..0xFFFFFF`, затем вывод окрашивается в цвет `#RRGGBB`:

```js
function toHexColorCode(value) {
  const normalizedValue = Number(value.toFixed(12));
  const colorNumber = Math.abs(Math.trunc(normalizedValue)) % 0x1000000;
  return colorNumber.toString(16).toUpperCase().padStart(6, "0");
}

const hexResult = toHexColorCode(result);
outputElement.style.color = "#" + hexResult;
```

### 2) Проверка ведущих нулей
Перед `eval`-вычислением добавлена проверка на числа вида `0...`:

```js
function hasLeadingZeroNumbers(value) {
  return /(^|[+\-*/(])-?0\d+/.test(value);
}

if (hasLeadingZeroNumbers(expressionWithoutSpaces)) {
  showError();
  return;
}
```

### 3) Ограничение ввода нулей в числе
При вводе цифр блокируется накопление лишних нулей в начале целой части:

```js
if (isIntegerPart && (currentNumberPart === "0" || currentNumberPart === "-0")) {
  if (digit === "0") {
    return;
  }
  expression = expression.slice(0, -1) + digit;
}
```

## Запуск
Откройте `calculator.html` в браузере.
