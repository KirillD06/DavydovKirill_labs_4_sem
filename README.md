# Домашнее задание

**Давыдов Кирилл Игоревич, ИУ5-44Б**

## Цель работы
Практика работы с коллекциями, функциями и компонентной структурой JS-приложения.

## Тема
Каталог первооткрывателей космоса.

## Сайт для вдохновения
[Музей Ю. А. Гагарина](https://museumgagarin.ru/)

## Дополнительное задание
Сделать видео/гифку вместо 3D-модели.

## Как реализовано

### 1) На странице «Подробнее» подключен отдельный компонент модели

```js
import { RocketModelComponent } from "../../components/rocket-gif/index.js";
...
const rocketModel = new RocketModelComponent(this.contentRoot);
rocketModel.render(discovererCard);
```

### 2) Вместо загрузки GLB-модели используется GIF/MP4
Компонент строит 3D-сцену и выводит прямоугольник с анимированной текстурой:

```js
const videoUrl = discovererCard.rocketVideoUrl || discovererCard.rocketGifUrl;
const videoElement = this.createVideoElement(videoUrl);

const fallbackTexture = textureLoader.load(discovererCard.rocketGifUrl);
const { frameMesh, screenMaterial } = this.createGifPlane(fallbackTexture);
```

### 3) Добавлен fallback
Если видео не стартовало автоматически, сначала показывается GIF как статичная/базовая текстура, затем после `playing` подключается `VideoTexture`.

## Запуск
```bash
npm install
npm start
```

Если `npm start` недоступен в вашей среде — откройте `index.html` через Live Server.
