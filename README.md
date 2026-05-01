# ЛР 3. Простое веб-приложение. Верстка

**Давыдов Кирилл Игоревич, ИУ5-44Б**

## Цель работы
Практика структуры фронтенд-приложения на JS: список карточек, страница подробнее, навигация между страницами.

## Тема
Мини-каталог выставок музея Ю. А. Гагарина.

## Сайт для вдохновения
[Музей Ю. А. Гагарина](https://museumgagarin.ru/)

## Дополнительные задания

1. Показывать карточки по 2 штуки.
2. Сделать навигацию по точкам: 1 точка — первые 2 карточки, 2 точка — следующие 2.

## Как реализовано

### 1) Деление списка на страницы по 2 карточки
В `MainPage` добавлены параметры пагинации:

```js
this.cardsPerPage = 2;
this.currentPage = 0;
```

Формирование текущей страницы:

```js
getCurrentPageExhibitions() {
  const startIndex = this.currentPage * this.cardsPerPage;
  return exhibitions.slice(startIndex, startIndex + this.cardsPerPage);
}
```

### 2) Пагинация точками
Рендер точек и обработка клика по каждой точке:

```js
for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
  const isActive = pageIndex === this.currentPage;
  this.paginationRoot.insertAdjacentHTML(
    "beforeend",
    `<button class="dot-pagination-button ${isActive ? "active" : ""}" data-page="${pageIndex}"></button>`
  );
}

buttonElement.addEventListener("click", () => {
  this.setCurrentPage(Number(buttonElement.dataset.page));
});
```

### 3) Стили точек

```css
.dot-pagination {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.dot-pagination-button.active {
  background: rgb(84, 177, 255);
}
```

## Запуск
```bash
npm install
npm start
```

Если `npm start` не настроен в вашей среде, откройте `index.html` через Live Server.
