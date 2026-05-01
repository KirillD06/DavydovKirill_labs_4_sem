const initialDiscovererCardList = [
  {
    id: 1,
    discovererKey: "gagarin",
    fullName: "Юрий Гагарин",
    shortPeriod: "Первый человек в космосе, 1961",
    shortText: "Полет «Восток-1»: 1 виток вокруг Земли за 108 минут и старт эпохи пилотируемой космонавтики.",
    longText:
      "12 апреля 1961 года Юрий Гагарин на корабле «Восток-1» совершил первый в истории полет человека в космос. Полет длился 108 минут и стал ключевым событием в мировой науке и инженерии.",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Yuri%20Gagarin%20%28cropped%2001%29.jpg",
    imagePosition: "center 22%",
    sourceLink: "https://ru.wikipedia.org/wiki/%D0%93%D0%B0%D0%B3%D0%B0%D1%80%D0%B8%D0%BD,_%D0%AE%D1%80%D0%B8%D0%B9_%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B5%D0%B5%D0%B2%D0%B8%D1%87",
    rocketGifUrl: "./media/rocket-launch.gif",
    rocketVideoUrl: "./media/rocket-launch.mp4",
    expeditionSteps: [1, 0, 1],
    expeditionScores: [10, 10, 9]
  },
  {
    id: 2,
    discovererKey: "tereshkova",
    fullName: "Валентина Терешкова",
    shortPeriod: "Первая женщина в космосе, 1963",
    shortText: "Полет «Восток-6»: 48 витков вокруг Земли и почти 3 суток на орбите.",
    longText:
      "Валентина Терешкова в 1963 году стала первой женщиной-космонавтом. Ее полет на «Востоке-6» подтвердил готовность длительных орбитальных миссий и расширил состав космических экипажей.",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/RIAN%20archive%20612748%20Valentina%20Tereshkova.jpg",
    imagePosition: "center 18%",
    sourceLink: "https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%80%D0%B5%D1%88%D0%BA%D0%BE%D0%B2%D0%B0,_%D0%92%D0%B0%D0%BB%D0%B5%D0%BD%D1%82%D0%B8%D0%BD%D0%B0_%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%BD%D0%B0",
    rocketGifUrl: "./media/rocket-launch.gif",
    rocketVideoUrl: "./media/rocket-launch.mp4",
    expeditionSteps: [1, 0, 3],
    expeditionScores: [9, 9, 10]
  },
  {
    id: 3,
    discovererKey: "leonov",
    fullName: "Алексей Леонов",
    shortPeriod: "Первый выход в открытый космос, 1965",
    shortText: "«Восход-2»: первый в истории выход в открытый космос и важный этап внекорабельной деятельности.",
    longText:
      "Алексей Леонов в 1965 году первым выполнил выход в открытый космос. Позже он командовал советским кораблем «Союз-19» в международной программе «Союз-Аполлон».",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Alexei%20Leonov.jpg",
    imagePosition: "center 20%",
    sourceLink: "https://ru.wikipedia.org/wiki/%D0%9B%D0%B5%D0%BE%D0%BD%D0%BE%D0%B2,_%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B5%D0%B9_%D0%90%D1%80%D1%85%D0%B8%D0%BF%D0%BE%D0%B2%D0%B8%D1%87",
    rocketGifUrl: "./media/rocket-launch.gif",
    rocketVideoUrl: "./media/rocket-launch.mp4",
    expeditionSteps: [2, 1, 2],
    expeditionScores: [10, 9, 9]
  },
  {
    id: 4,
    discovererKey: "armstrong",
    fullName: "Нил Армстронг",
    shortPeriod: "Первый человек на Луне, 1969",
    shortText: "Командир «Apollo 11»: первая высадка человека на Луну в июле 1969 года.",
    longText:
      "Нил Армстронг первым ступил на поверхность Луны в миссии «Apollo 11». Это событие закрепило переход от орбитальных полетов к исследованию других небесных тел.",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Neil%20Armstrong.jpg",
    imagePosition: "center 34%",
    sourceLink: "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%BC%D1%81%D1%82%D1%80%D0%BE%D0%BD%D0%B3,_%D0%9D%D0%B8%D0%BB",
    rocketGifUrl: "./media/rocket-launch.gif",
    rocketVideoUrl: "./media/rocket-launch.mp4",
    expeditionSteps: [2, 0, 8],
    expeditionScores: [10, 10, 10]
  }
];

let discovererCardList = initialDiscovererCardList.map((discovererCard) => ({
  ...discovererCard
}));

export const pioneerBaseNameById = {
  firstLaunchBase: "Стартовая площадка Восток",
  firstWomanFlightBase: "Подготовка Восток-6",
  firstSpacewalkBase: "Орбитальный модуль Восход-2",
  moonLandingBase: "Миссия Аполлон-11"
};

export const pioneerBaseIdList = [
  "firstLaunchBase",
  "firstWomanFlightBase",
  "firstSpacewalkBase",
  "moonLandingBase"
];

export const closedPioneerBaseIdList = ["firstWomanFlightBase"];

export const pioneerSloganText = "смелость наука память подвиг";

export function getDiscovererCardList() {
  return discovererCardList;
}

export function getDiscovererById(discovererId) {
  return discovererCardList.find((discovererCard) => discovererCard.id === Number(discovererId));
}
