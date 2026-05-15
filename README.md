# ЛР 5. AJAX-запросы к API

**Давыдов Кирилл Игоревич, ИУ5-44Б**

## Содержание

- [Цель работы](#цель-работы)
- [Тема](#тема)
- [Сайт для вдохновения](#сайт-для-вдохновения)
- [Дополнительные задания](#дополнительные-задания)
- [Как реализовано](#как-реализовано)
- [Запуск](#запуск)
- [План](#план)
- [Задание](#задание)

## Цель работы
Реализация клиентской части, которая получает данные с API через `XMLHttpRequest` и выводит карточки в интерфейс пользователя.

## Тема
Эпоха географических открытий.

## Сайт для вдохновения
[Русское географическое общество](https://www.rgo.ru/)

## Дополнительные задания

1. Добавить фильтрацию карточек по названию через query-параметр `title`.
2. Добавить клиентский лимит отображаемых карточек.
3. Показывать состояния загрузки, успешного ответа, пустого результата и ошибки сервера.

## Как реализовано

### 1) Обертка над XMLHttpRequest
В `modules/ajax.js` создан класс для GET-запросов и обработки JSON-ответа:

```js
get(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      this.handleResponse(xhr, callback);
    }
  };
}
```

### 2) URL с фильтром по названию
В `modules/stockUrls.js` адрес API собирается через `URL` и `searchParams`:

```js
getStocks(title) {
  const url = new URL("/stocks", this.baseUrl);

  if (title) {
    url.searchParams.set("title", title);
  }

  return url.toString();
}
```

### 3) Загрузка и вывод карточек
На странице каталога выполняется запрос к серверу ЛР 4, после чего данные сохраняются и отрисовываются:

```js
fetchData() {
  this.renderState("Загрузка данных с сервера...", "info");

  const requestUrl = stockUrls.getStocks(this.searchValue.trim());

  ajax.get(requestUrl, (data, status) => {
    if (status >= 200 && status < 300 && Array.isArray(data)) {
      this.items = data;
      this.currentPage = 0;
      this.renderCards();
      this.renderPagination();
      return;
    }

    this.items = [];
    this.renderState("Не удалось загрузить карточки.", "error");
  });
}
```

### 4) Лимит и пагинация
Количество карточек можно ограничить с формы, после чего пагинация пересчитывается:

```js
getLimitedItems() {
  if (!this.limitValue || this.limitValue <= 0) {
    return this.items;
  }

  return this.items.slice(0, this.limitValue);
}
```

## Запуск

1. Запустить сервер из ЛР 4 на `http://localhost:3000`.
2. В папке проекта выполнить:

```bash
npm install
npm run start
```

## План

1. Подготовить клиентскую структуру проекта.
2. Создать слой для AJAX-запросов.
3. Вынести URL API в отдельный модуль.
4. Получать список карточек с сервера.
5. Добавить фильтрацию, лимит и состояния интерфейса.
6. Проверить работу клиента вместе с сервером ЛР 4.

## Задание

Взаимодействие с внешним API через `XMLHttpRequest`. Необходимо получить данные с API, вывести их в интерфейс пользователя и выполнить задания по варианту.
