# Домашнее задание

**Давыдов Кирилл Игоревич, ИУ5-44Б**

## Цель работы
Практика работы с коллекциями, функциями и компонентной структурой JS-приложения.

## Тема
Эпоха географических открытий.

## Сайт для вдохновения
[Русское географическое общество](https://www.rgo.ru/)

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
Если видео не стартовало автоматически, сначала показывается GIF как базовая текстура, затем после `playing` подключается `VideoTexture`.

## План

1. Подготовить набор карточек и данные для каталога.
2. Реализовать переход между списком и страницей «Подробнее».
3. Выделить отдельный компонент для блока модели.
4. Заменить загрузку GLB на GIF/MP4-текстуру.
5. Добавить fallback и обработку автозапуска анимации.
