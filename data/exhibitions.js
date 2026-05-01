export const exhibitions = [
  {
    id: 1,
    title: "Юрий Гагарин после полета",
    subtitle: "Исторический портрет 1961 года",
    tag: "Архив",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Yuri%20Gagarin%20%281961%29%20-%20Restoration.jpg",
    text: "Фотография первого космонавта после полета «Восток-1». Снимок связан с периодом, когда имя Гагарина стало символом начала космической эры.",
    sourceLink: "https://commons.wikimedia.org/wiki/File:Yuri_Gagarin_(1961)_-_Restoration.jpg"
  },
  {
    id: 2,
    title: "Юрий Гагарин с наградами",
    subtitle: "Официальный портрет 1963 года",
    tag: "История",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Yuri%20Gagarin%20%28cropped%2001%29.jpg",
    text: "Портрет Юрия Гагарина в парадной форме. Карточка показывает, как быстро он стал центральной фигурой советской космонавтики.",
    sourceLink: "https://commons.wikimedia.org/wiki/File:Yuri_Gagarin_(cropped_01).jpg"
  },
  {
    id: 3,
    title: "Юрий Гагарин в Швеции",
    subtitle: "Зарубежная поездка, 1964 год",
    tag: "Путешествие",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Yuri%20Gagarin%20in%20Sweden%2C%201964%20%28cropped%29.jpg",
    text: "Снимок из европейской поездки Гагарина. Такие визиты подчеркивали международное значение первого полета человека в космос.",
    sourceLink: "https://commons.wikimedia.org/wiki/File:Yuri_Gagarin_in_Sweden,_1964_(cropped).jpg"
  },
  {
    id: 4,
    title: "Юрий Гагарин с супругой",
    subtitle: "Семейный кадр, 1964 год",
    tag: "Архив",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Yuri%20Gagarin%20with%20wife%20in%201964%20%28cropped%29.jpg",
    text: "Фотография Юрия Гагарина и Валентины Гагариной. Карточка добавляет личный, человеческий контекст к истории первого космонавта.",
    sourceLink: "https://commons.wikimedia.org/wiki/File:Yuri_Gagarin_with_wife_in_1964_(cropped).jpg"
  }
];

export function getExhibitionById(id) {
  return exhibitions.find((item) => item.id === Number(id));
}
