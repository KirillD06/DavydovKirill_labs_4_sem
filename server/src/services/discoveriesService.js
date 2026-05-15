const fileService = require("./fileService");

let dataFilePath = "";

const init = (filePath) => {
  dataFilePath = filePath;
};

const ensureInitialized = () => {
  if (!dataFilePath) {
    throw new Error("DiscoveriesService не инициализирован");
  }
};

const findAll = (title) => {
  ensureInitialized();
  const discoveries = fileService.readData(dataFilePath);

  if (!title) {
    return discoveries;
  }

  const normalizedTitle = title.toLowerCase();
  return discoveries.filter((item) => item.title.toLowerCase().includes(normalizedTitle));
};

const findOne = (id) => {
  ensureInitialized();
  const discoveries = fileService.readData(dataFilePath);
  return discoveries.find((item) => item.id === id);
};

const create = (payload) => {
  ensureInitialized();
  const discoveries = fileService.readData(dataFilePath);
  const newId = discoveries.length > 0 ? Math.max(...discoveries.map((item) => item.id)) + 1 : 1;

  const newItem = {
    id: newId,
    ...payload
  };

  discoveries.push(newItem);
  fileService.writeData(dataFilePath, discoveries);
  return newItem;
};

const update = (id, payload) => {
  ensureInitialized();
  const discoveries = fileService.readData(dataFilePath);
  const itemIndex = discoveries.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    return null;
  }

  discoveries[itemIndex] = {
    ...discoveries[itemIndex],
    ...payload
  };

  fileService.writeData(dataFilePath, discoveries);
  return discoveries[itemIndex];
};

const replace = (id, payload) => {
  ensureInitialized();
  const discoveries = fileService.readData(dataFilePath);
  const itemIndex = discoveries.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    return null;
  }

  discoveries[itemIndex] = {
    id,
    ...payload
  };

  fileService.writeData(dataFilePath, discoveries);
  return discoveries[itemIndex];
};

const remove = (id) => {
  ensureInitialized();
  const discoveries = fileService.readData(dataFilePath);
  const filtered = discoveries.filter((item) => item.id !== id);

  if (filtered.length === discoveries.length) {
    return false;
  }

  fileService.writeData(dataFilePath, filtered);
  return true;
};

module.exports = {
  init,
  findAll,
  findOne,
  create,
  update,
  replace,
  remove
};
