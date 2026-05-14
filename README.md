# ЛР 4. Бэкенд на Express.js

**Давыдов Кирилл Игоревич, ИУ5-44Б**

## Содержание

- [Цель работы](#цель-работы)
- [Тема](#тема)
- [Что реализовано](#что-реализовано)
- [Эндпоинты](#эндпоинты)
- [Дополнение по PUT](#дополнение-по-put)
- [План](#план)
- [Проверка в Postman](#проверка-в-postman)
- [Задание](#задание)

## Цель работы
Реализация REST API на Node.js/Express с хранением данных в JSON-файле.

## Тема
Эпоха географических открытий.

## Что реализовано

- Слой `routes/controllers/services`
- CRUD для `stocks`
- Фильтрация списка по `title`
- Обработчики `404` и `500`
- Логирование запросов
- Добавлен метод `PUT /stocks/:id` (полная замена записи)

## Эндпоинты

- `GET /stocks`
- `POST /stocks`
- `GET /stocks/:id`
- `PUT /stocks/:id`
- `PATCH /stocks/:id`
- `DELETE /stocks/:id`

## Дополнение по PUT

`PUT` реализован отдельным контроллером и сервисным методом:

```js
router.put("/:id", stocksController.replaceStock);
```

```js
const replacedStock = stocksService.replace(id, { src, title, text });
```

```js
stocks[stockIndex] = {
  id,
  ...stockData
};
```

## План

1. Развернуть структуру Express-проекта и подключить middleware.
2. Разделить код на `routes`, `controllers`, `services`.
3. Реализовать CRUD-операции для сущности `stocks`.
4. Добавить валидацию входных данных и корректные HTTP-статусы.
5. Реализовать `PUT` как полную замену записи по `id`.
6. Проверить эндпоинты в Postman.

## Проверка в Postman

1. `GET http://localhost:3000/stocks`
2. `POST http://localhost:3000/stocks`
3. `PUT http://localhost:3000/stocks/1`
4. `PATCH http://localhost:3000/stocks/1`
5. `DELETE http://localhost:3000/stocks/1`

## Задание

Реализация на Node.js собственного веб-сервиса для API с хранением данных в JSON-файле. Необходимо протестировать через Postman основные методы работы с коллекцией: получение списка с фильтрацией, получение одной записи, добавление, редактирование и удаление, а также реализовать метод `PUT` для полной замены записи.
