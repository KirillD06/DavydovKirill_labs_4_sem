const express = require("express");
const fs = require("fs");
const path = require("path");
const discoveriesRouter = require("./routes/discoveries");
const discoveriesService = require("./services/discoveriesService");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE_PATH = path.join(__dirname, "data", "discoveries.json");
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const INDEX_FILE = path.join(PUBLIC_DIR, "index.html");

discoveriesService.init(DATA_FILE_PATH);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/api/discoveries", discoveriesRouter);
app.use(express.static(PUBLIC_DIR));

app.get("/", (req, res) => {
  if (!fs.existsSync(INDEX_FILE)) {
    res
      .status(200)
      .send("Клиент еще не собран. Перейдите в client и выполните npm install && npm run build");
    return;
  }

  res.sendFile(INDEX_FILE);
});

app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    res.status(404).json({ error: "Маршрут API не найден" });
    return;
  }

  if (!fs.existsSync(INDEX_FILE)) {
    res.status(404).send("Клиент не собран");
    return;
  }

  res.sendFile(INDEX_FILE);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
