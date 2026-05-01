const fileService = require("./fileService");

let dataFilePath = "";

const init = (filePath) => {
  dataFilePath = filePath;
};

const ensureInitialized = () => {
  if (!dataFilePath) {
    throw new Error("StocksService не инициализирован: не задан путь к данным");
  }
};

const findAll = (title) => {
  ensureInitialized();
  const stocks = fileService.readData(dataFilePath);

  if (!title) {
    return stocks;
  }

  const normalizedTitle = title.toLowerCase();
  return stocks.filter((stock) => stock.title.toLowerCase().includes(normalizedTitle));
};

const findOne = (id) => {
  ensureInitialized();
  const stocks = fileService.readData(dataFilePath);
  return stocks.find((stock) => stock.id === id);
};

const create = (stockData) => {
  ensureInitialized();
  const stocks = fileService.readData(dataFilePath);
  const newId = stocks.length > 0 ? Math.max(...stocks.map((stock) => stock.id)) + 1 : 1;

  const newStock = {
    id: newId,
    ...stockData
  };

  stocks.push(newStock);
  fileService.writeData(dataFilePath, stocks);
  return newStock;
};

const update = (id, stockData) => {
  ensureInitialized();
  const stocks = fileService.readData(dataFilePath);
  const stockIndex = stocks.findIndex((stock) => stock.id === id);

  if (stockIndex === -1) {
    return null;
  }

  stocks[stockIndex] = {
    ...stocks[stockIndex],
    ...stockData
  };

  fileService.writeData(dataFilePath, stocks);
  return stocks[stockIndex];
};

const replace = (id, stockData) => {
  ensureInitialized();
  const stocks = fileService.readData(dataFilePath);
  const stockIndex = stocks.findIndex((stock) => stock.id === id);

  if (stockIndex === -1) {
    return null;
  }

  stocks[stockIndex] = {
    id,
    ...stockData
  };

  fileService.writeData(dataFilePath, stocks);
  return stocks[stockIndex];
};

const remove = (id) => {
  ensureInitialized();
  const stocks = fileService.readData(dataFilePath);
  const filteredStocks = stocks.filter((stock) => stock.id !== id);

  if (filteredStocks.length === stocks.length) {
    return false;
  }

  fileService.writeData(dataFilePath, filteredStocks);
  return true;
};

module.exports = {
  init,
  findAll,
  findOne,
  create,
  replace,
  update,
  remove
};
