const fs = require("fs");

const readData = (filePath) => {
  try {
    const rawData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Ошибка чтения файла:", error);
    return [];
  }
};

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Ошибка записи файла:", error);
  }
};

module.exports = {
  readData,
  writeData
};
