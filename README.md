# ЛР 4. Бэкенд на Express.js

**Давыдов Кирилл Игоревич, ИУ5-44Б**

## Цель работы
Реализация REST API на Node.js/Express с хранением данных в JSON-файле.

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

## Запуск
```bash
npm install
npm run dev
```

## Проверка в Postman

1. `GET http://localhost:3000/stocks`
2. `POST http://localhost:3000/stocks`
3. `PUT http://localhost:3000/stocks/1`
4. `PATCH http://localhost:3000/stocks/1`
5. `DELETE http://localhost:3000/stocks/1`
