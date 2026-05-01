const stocksService = require("../services/stocksService");

const getAllStocks = (req, res) => {
  const { title } = req.query;
  const stocks = stocksService.findAll(title);
  res.json(stocks);
};

const getStockById = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Некорректный ID" });
  }

  const stock = stocksService.findOne(id);

  if (!stock) {
    return res.status(404).json({ error: "Карточка не найдена" });
  }

  return res.json(stock);
};

const createStock = (req, res) => {
  const { src, title, text } = req.body;

  if (!src || !title || !text) {
    return res.status(400).json({ error: "Не все поля заполнены" });
  }

  const newStock = stocksService.create({ src, title, text });
  return res.status(201).json(newStock);
};

const updateStock = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Некорректный ID" });
  }

  const allowedFields = ["src", "title", "text"];
  const payload = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      payload[field] = req.body[field];
    }
  });

  if (Object.keys(payload).length === 0) {
    return res.status(400).json({ error: "Нет полей для обновления" });
  }

  const updatedStock = stocksService.update(id, payload);

  if (!updatedStock) {
    return res.status(404).json({ error: "Карточка не найдена" });
  }

  return res.json(updatedStock);
};

const replaceStock = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const { src, title, text } = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Некорректный ID" });
  }

  if (!src || !title || !text) {
    return res.status(400).json({ error: "Не все поля заполнены" });
  }

  const replacedStock = stocksService.replace(id, { src, title, text });

  if (!replacedStock) {
    return res.status(404).json({ error: "Карточка не найдена" });
  }

  return res.json(replacedStock);
};

const deleteStock = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Некорректный ID" });
  }

  const deleted = stocksService.remove(id);

  if (!deleted) {
    return res.status(404).json({ error: "Карточка не найдена" });
  }

  return res.status(204).send();
};

module.exports = {
  getAllStocks,
  getStockById,
  createStock,
  replaceStock,
  updateStock,
  deleteStock
};
