export type Locale = "et" | "ru";
export type RequestType = "equipment" | "service";

export type ServiceItem = {
  title: string;
  model: string;
  description: string;
  price: string;
  image: string;
  cta: string;
  specs: string[];
};

export type StepItem = {
  title: string;
  text: string;
};

export const content = {
  et: {
    nav: ["Kuidas see töötab", "Tehnika", "Hinnakiri", "Päring"],
    cta: "Saada päring",
    hero: {
      eyebrow: "Tallinn ja Harjumaa",
      title: "Murumaster",
      subtitle: "Aiatehnika rent ja niitmisteenus Tallinnas ja Harjumaal",
      text: "Rentige tehnika või tellige töö tegijaga. Aitame leida sobiva lahenduse muru, aia ja krundi hoolduseks.",
    },
    trustItems: [
      "Tallinn ja Harjumaa",
      "Kohaletoimetamine võimalik",
      "Erakliendid ja ettevõtted",
      "Kiire vastus päringule",
    ],
    choiceTitle: "Mida otsite?",
    choices: [
      {
        type: "equipment" as const,
        icon: "🚜",
        title: "Soovin rentida tehnikat",
        text: "Murutraktor, trimmer, muruniiduk, haagis ja muu aiatehnika.",
        button: "Vali tehnika",
        image: "/images/hero/hero-tractor-back.jpg",
      },
      {
        type: "service" as const,
        icon: "🌿",
        title: "Soovin tellida töö tegijaga",
        text: "Muru niitmine, trimmerdamine ja krundi hooldus.",
        button: "Küsi pakkumist",
        image: "/images/hero/hero-trimmer.jpg",
      },
    ],
    servicesTitle: "Mida pakume",
    services: [
      {
        title: "Murutraktor",
        model: "Husqvarna R 216T AWD",
        description: "Suuremate murupindade ja kruntide kiireks hoolduseks.",
        price: "alates 60€/päev",
        image: "/images/services/murutraktor.png",
        cta: "Küsi saadavust",
        specs: [
          "Lõikelaius: 103 cm",
          "Kütus: bensiin 98",
          "Sobib suurematele murupindadele",
        ],
      },
      {
        title: "Muruniiduk",
        model: "Husqvarna LC140SP",
        description: "Koduaia regulaarseks niitmiseks ja väiksematele pindadele.",
        price: "alates 25€/päev",
        image: "/images/services/muruniiduk.png",
        cta: "Küsi saadavust",
        specs: [
          "Kütus: bensiin 98",
          "4-taktiline mootor",
          "Sobib väiksematele ja keskmistele aladele",
        ],
      },
      {
        title: "Trimmer",
        model: "STIHL FS 180",
        description: "Servade, kraavide ja raskesti ligipääsetavate kohtade jaoks.",
        price: "alates 20€/päev",
        image: "/images/services/trimmer.png",
        cta: "Küsi saadavust",
        specs: [
          "Kütus: bensiin 98",
          "2-taktiline mootor",
          "Vajab 2T õlisegu",
        ],
      },
      {
        title: "Oksapurusti",
        model: "GTM GT150",
        description: "Okste ja aiajäätmete purustamiseks.",
        price: "alates 30€/päev",
        image: "/images/services/oksapurusti.png",
        cta: "Küsi pakkumist",
        specs: [
          "Bensiinimootor",
          "Võimsus: 9100 W",
          "Okste ja aiajäätmete purustamiseks",
        ],
      },
      {
        title: "Haagis",
        model: "Haagis",
        description: "Tehnika transpordiks või aiatöödeks.",
        price: "alates 20€/päev",
        image: "/images/services/haagis.png",
        cta: "Küsi saadavust",
        specs: [
          "Sobib tehnika transpordiks",
          "Sobib aiatöödeks",
          "Täpsemad andmed kokkuleppel",
        ],
      },
      {
        title: "Niitmisteenus",
        model: "Töö tegijaga",
        description: "Muru niitmine, trimmerdamine ja krundi hooldus tegijaga.",
        price: "alates 80€",
        image: "/images/services/niitmisteenus.png",
        cta: "Küsi pakkumist",
        specs: ["Muru niitmine", "Trimmerdamine", "Krundi hooldus"],
      },
    ],
    howTitle: "Kuidas see töötab",
    steps: [
      { title: "Saada päring", text: "Kirjelda mida vajad" },
      { title: "Võtame ühendust", text: "Täpsustame detailid" },
      { title: "Kinnitame pakkumise", text: "Lepime aja kokku" },
      { title: "Tehnika käes või töö tehtud", text: "Kõik valmis" },
    ],
    pricingTitle: "Esialgsed hinnad",
    pricingNote:
      "Hinnad on esialgsed ja sõltuvad saadavusest, piirkonnast ja töö mahust.",
    areaTitle: "Teeninduspiirkond",
    areaText:
      "Töötame Tallinnas ja Harjumaal. Täpne võimalus sõltub tehnikast, ajast ja asukohast.",
    areas: ["Tallinn", "Viimsi", "Pirita", "Rae", "Harku", "Saue", "Harjumaa"],
    areaFeatures: [
      "Kohaletoimetamine võimalik",
      "Tehnika transport",
      "Töö tegijaga teenus",
      "Vastame samal päeval",
    ],
    form: {
      title: "Saada päring",
      text: "Kirjutage, mida vajate, ja võtame Teiega ühendust esimesel võimalusel.",
      name: "Nimi",
      email: "E-post",
      type: "Päringu tüüp",
      equipment: "Tehnika rent",
      service: "Rent koos töö tegijaga",
      need: "Vali teenus",
      needOptions: [
        "Murutraktor",
        "Muruniiduk",
        "Trimmer",
        "Oksapurusti",
        "Haagis",
        "Niitmisteenus",
        "Ei ole kindel",
      ],
      area: "Piirkond",
      comment: "Kommentaar",
      button: "Saada päring",
      success: "Täname! Võtame Teiega peagi ühendust.",
    },
    footer: {
      line1: "Aiatehnika rent ja niitmisteenus",
      line2: "Tallinn ja Harjumaa",
      links: ["Privacy", "Terms"],
    },
  },
  ru: {
    nav: ["Как это работает", "Техника", "Цены", "Заявка"],
    cta: "Отправить заявку",
    hero: {
      eyebrow: "Таллинн и Харьюмаа",
      title: "Murumaster",
      subtitle: "Аренда садовой техники и покос участков в Таллинне и Харьюмаа",
      text: "Арендуйте технику или закажите работу с исполнителем. Поможем подобрать решение для ухода за газоном, садом и участком.",
    },
    trustItems: [
      "Таллинн и Харьюмаа",
      "Возможна доставка техники",
      "Частные клиенты и фирмы",
      "Быстрый ответ на заявку",
    ],
    choiceTitle: "Что вы ищете?",
    choices: [
      {
        type: "equipment" as const,
        icon: "🚜",
        title: "Хочу арендовать технику",
        text: "Газонный трактор, триммер, газонокосилка, прицеп и другая садовая техника.",
        button: "Выбрать технику",
        image: "/images/hero/hero-tractor-back.jpg",
      },
      {
        type: "service" as const,
        icon: "🌿",
        title: "Хочу заказать работу",
        text: "Покос травы, триммеринг и уход за участком.",
        button: "Запросить цену",
        image: "/images/hero/hero-trimmer.jpg",
      },
    ],
    servicesTitle: "Что предлагаем",
    services: [
      {
        title: "Трактор-газонокосилка",
        model: "Husqvarna R 216T AWD",
        description: "Для быстрой обработки больших газонов и участков.",
        price: "от 60€/день",
        image: "/images/services/murutraktor.png",
        cta: "Уточнить наличие",
        specs: [
          "Ширина покоса: 103 см",
          "Топливо: бензин 98",
          "Подходит для больших газонов и участков",
        ],
      },
      {
        title: "Газонокосилка",
        model: "Husqvarna LC140SP",
        description: "Для регулярного покоса домашнего газона и небольших участков.",
        price: "от 25€/день",
        image: "/images/services/muruniiduk.png",
        cta: "Уточнить наличие",
        specs: [
          "Топливо: бензин 98",
          "4-тактный двигатель",
          "Подходит для малых и средних участков",
        ],
      },
      {
        title: "Триммер",
        model: "STIHL FS 180",
        description: "Для краёв, канав и труднодоступных мест.",
        price: "от 20€/день",
        image: "/images/services/trimmer.png",
        cta: "Уточнить наличие",
        specs: [
          "Топливо: бензин 98",
          "2-тактный двигатель",
          "Требуется смесь с 2T маслом",
        ],
      },
      {
        title: "Измельчитель веток",
        model: "GTM GT150",
        description: "Для веток и садовых отходов.",
        price: "от 30€/день",
        image: "/images/services/oksapurusti.png",
        cta: "Запросить цену",
        specs: [
          "Бензиновый двигатель",
          "Мощность: 9100 Вт",
          "Для веток и садовых отходов",
        ],
      },
      {
        title: "Прицеп",
        model: "Прицеп",
        description: "Для перевозки техники и садовых работ.",
        price: "от 20€/день",
        image: "/images/services/haagis.png",
        cta: "Уточнить наличие",
        specs: [
          "Для перевозки техники",
          "Для садовых работ",
          "Точные данные по запросу",
        ],
      },
      {
        title: "Покос участка",
        model: "Работа с исполнителем",
        description: "Покос травы, работа триммером и уход за участком с исполнителем.",
        price: "от 80€",
        image: "/images/services/niitmisteenus.png",
        cta: "Запросить предложение",
        specs: ["Покос травы", "Работа триммером", "Уход за участком"],
      },
    ],
    howTitle: "Как это работает",
    steps: [
      { title: "Отправьте заявку", text: "Опишите что нужно" },
      { title: "Свяжемся с вами", text: "Уточним детали" },
      { title: "Подтвердим предложение", text: "Согласуем время" },
      {
        title: "Техника получена или работа выполнена",
        text: "Все готово",
      },
    ],
    pricingTitle: "Предварительные цены",
    pricingNote:
      "Цены предварительные и зависят от наличия, района и объёма работы.",
    areaTitle: "Зона обслуживания",
    areaText:
      "Работаем в Таллинне и Харьюмаа. Точная возможность зависит от техники, времени и адреса.",
    areas: ["Таллинн", "Виймси", "Пирита", "Раэ", "Харку", "Сауэ", "Харьюмаа"],
    areaFeatures: [
      "Возможна доставка техники",
      "Перевозка техники",
      "Услуга с исполнителем",
      "Отвечаем в тот же день",
    ],
    form: {
      title: "Отправить заявку",
      text: "Напишите, что вам нужно, и мы свяжемся с вами при первой возможности.",
      name: "Имя",
      email: "E-mail",
      type: "Тип заявки",
      equipment: "Аренда техники",
      service: "Аренда с работником",
      need: "Выберите услугу",
      needOptions: [
        "Трактор-газонокосилка",
        "Газонокосилка",
        "Триммер",
        "Измельчитель веток",
        "Прицеп",
        "Покос участка",
        "Не уверен",
      ],
      area: "Район",
      comment: "Комментарий",
      button: "Отправить заявку",
      success: "Спасибо! Мы скоро свяжемся с вами.",
    },
    footer: {
      line1: "Аренда садовой техники и покос участков",
      line2: "Таллинн и Харьюмаа",
      links: ["Privacy", "Terms"],
    },
  },
} satisfies Record<
  Locale,
  {
    nav: string[];
    cta: string;
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
      text: string;
    };
    trustItems: string[];
    choiceTitle: string;
    choices: Array<{
      type: RequestType;
      icon: string;
      title: string;
      text: string;
      button: string;
      image: string;
    }>;
    servicesTitle: string;
    services: ServiceItem[];
    howTitle: string;
    steps: StepItem[];
    pricingTitle: string;
    pricingNote: string;
    areaTitle: string;
    areaText: string;
    areas: string[];
    areaFeatures: string[];
    form: {
      title: string;
      text: string;
      name: string;
      email: string;
      type: string;
      equipment: string;
      service: string;
      need: string;
      needOptions: string[];
      area: string;
      comment: string;
      button: string;
      success: string;
    };
    footer: {
      line1: string;
      line2: string;
      links: string[];
    };
  }
>;
