# ЛР 6. Promise/fetch и сборка клиентской части

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
Переход от `XMLHttpRequest` к современному `fetch` с `Promise`/`async await`, а также сборка клиентской части через Vite и раздача готового фронтенда с сервера Express.

## Тема
Эпоха географических открытий.

## Сайт для вдохновения
[Русское географическое общество](https://www.rgo.ru/)

## Дополнительные задания

1. Добавить страницу подробной карточки с загрузкой данных по `id` через `fetch`.
2. Добавить удаление карточки через `DELETE /api/discoveries/:id` из интерфейса подробной страницы.
3. Сохранить фильтрацию по названию, лимит карточек и точечную пагинацию после перехода на `fetch`.

## Как реализовано

### 1) API-модуль на fetch
В `client/modules/discoveryApi.js` создан общий метод запроса, который обрабатывает JSON, пустой ответ `204` и ошибки API:

```js
async request(url, options = {}) {
  const response = await fetch(url, options);

  if (response.status === 204) {
    return null;
  }

  const body = await response.text();
  let data = null;

  if (body) {
    data = JSON.parse(body);
  }

  if (!response.ok) {
    throw new Error(data?.error || "Ошибка запроса к API");
  }

  return data;
}
```

### 2) Загрузка каталога через async/await
Каталог получает список карточек с сервера и показывает состояние загрузки или ошибки:

```js
async fetchData() {
  this.renderState("Загрузка данных с сервера...", "info");

  try {
    const data = await discoveryApi.getDiscoveries(this.searchValue.trim());
    this.items = Array.isArray(data) ? data : [];
    this.currentPage = 0;
    this.renderCards();
    this.renderPagination();
  } catch (error) {
    this.items = [];
    this.renderState(error.message || "Не удалось загрузить карточки.", "error");
  }
}
```

### 3) Страница подробной карточки
По клику открывается отдельная страница, которая запрашивает карточку по `id` и умеет удалять ее:

```js
async deleteItem() {
  const confirmed = window.confirm("Удалить эту карточку? Действие нельзя отменить.");

  if (!confirmed) {
    return;
  }

  await discoveryApi.deleteDiscoveryById(this.id);
  this.onBack();
}
```

### 4) Express API и статика
Сервер отдает API по `/api/discoveries` и собранный клиент из `server/public`:

```js
app.use("/api/discoveries", discoveriesRouter);
app.use(express.static(PUBLIC_DIR));

app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    res.status(404).json({ error: "Маршрут API не найден" });
    return;
  }

  res.sendFile(INDEX_FILE);
});
```

## Запуск

1. Если нужно пересобрать клиент:

```bash
cd client
npm install
npm run build
```

2. Запустить сервер:

```bash
cd ../server
npm install
npm start
```

3. Открыть `http://localhost:3000`.

## План

1. Перевести клиентские запросы на `fetch`.
2. Добавить обработку успешных и ошибочных ответов API.
3. Реализовать страницу подробной карточки.
4. Добавить удаление карточки из интерфейса.
5. Собрать клиентскую часть через Vite.
6. Настроить Express на раздачу собранного фронтенда как статики.

## Задание

Лабораторная состоит из двух частей: заменить механизм взаимодействия с API на `fetch` с использованием `Promise`/`async await`, а также собрать клиентскую часть через Vite и раздавать ее с сервера Express во избежание проблем с CORS.
