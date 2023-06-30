const data = [
  {
    name: "Hong Kong",
    topLevelDomain: [".hk"],
    alpha2Code: "HK",
    alpha3Code: "HKG",
    callingCodes: ["852"],
    capital: "City of Victoria",
    altSpellings: ["HK", "香港"],
    region: "Asia",
    subregion: "Eastern Asia",
    population: 7324300,
    latlng: [22.25, 114.16666666],
    demonym: "Chinese",
    area: 1104.0,
    gini: 53.3,
    timezones: ["UTC+08:00"],
    borders: ["CHN"],
    nativeName: "香港",
    numericCode: "344",
    currencies: [
      {
        code: "HKD",
        name: "Hong Kong dollar",
        symbol: "$",
      },
    ],
    languages: [
      {
        iso639_1: "en",
        iso639_2: "eng",
        name: "English",
        nativeName: "English",
      },
      {
        iso639_1: "zh",
        iso639_2: "zho",
        name: "Chinese",
        nativeName: "中文 (Zhōngwén)",
      },
    ],
    translations: {
      de: "Hong Kong",
      es: "Hong Kong",
      fr: "Hong Kong",
      ja: "香港",
      it: "Hong Kong",
      br: "Hong Kong",
      pt: "Hong Kong",
      nl: "Hongkong",
      hr: "Hong Kong",
      fa: "هنگ‌کنگ",
    },
    flag: "https://flagcdn.com/hk.svg",
    regionalBlocs: [],
    cioc: "HKG",
  },
];

function printObject(title, object) {
  for (let key in object) {
    let value = object[key];
    let message = `${title}_${key}: ${value}`;
    console.log(message);
  }
}

for (let country of data) {
  for (let key in country) {
    let title = key[0].toUpperCase() + key.substring(1);
    let value = country[key];
    let message = `${title}: ${value}`;
    if (message.includes("[object Object")) {
      if (Array.isArray(value)) {
        for (let element of value) {
          printObject(title, element);
        }
      } else {
        printObject(title, value);
      }
    } else {
      console.log(message);
    }
  }
}
