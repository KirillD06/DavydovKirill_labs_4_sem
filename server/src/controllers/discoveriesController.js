const discoveriesService = require("../services/discoveriesService");

const getAllDiscoveries = (req, res) => {
  const { title } = req.query;
  const discoveries = discoveriesService.findAll(title);
  res.json(discoveries);
};

const getDiscoveryById = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Некорректный ID" });
  }

  const item = discoveriesService.findOne(id);

  if (!item) {
    return res.status(404).json({ error: "Карточка не найдена" });
  }

  return res.json(item);
};

const createDiscovery = (req, res) => {
  const { src, title, route, year, text } = req.body;

  if (!src || !title || !route || !year || !text) {
    return res.status(400).json({ error: "Не все поля заполнены" });
  }

  const newItem = discoveriesService.create({ src, title, route, year, text });
  return res.status(201).json(newItem);
};

const patchDiscovery = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Некорректный ID" });
  }

  const allowedFields = ["src", "title", "route", "year", "text"];
  const payload = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      payload[field] = req.body[field];
    }
  });

  if (Object.keys(payload).length === 0) {
    return res.status(400).json({ error: "Нет полей для обновления" });
  }

  const updated = discoveriesService.update(id, payload);

  if (!updated) {
    return res.status(404).json({ error: "Карточка не найдена" });
  }

  return res.json(updated);
};

const putDiscovery = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const { src, title, route, year, text } = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Некорректный ID" });
  }

  if (!src || !title || !route || !year || !text) {
    return res.status(400).json({ error: "Не все поля заполнены" });
  }

  const replaced = discoveriesService.replace(id, { src, title, route, year, text });

  if (!replaced) {
    return res.status(404).json({ error: "Карточка не найдена" });
  }

  return res.json(replaced);
};

const deleteDiscovery = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Некорректный ID" });
  }

  const deleted = discoveriesService.remove(id);

  if (!deleted) {
    return res.status(404).json({ error: "Карточка не найдена" });
  }

  return res.status(204).send();
};

module.exports = {
  getAllDiscoveries,
  getDiscoveryById,
  createDiscovery,
  patchDiscovery,
  putDiscovery,
  deleteDiscovery
};
