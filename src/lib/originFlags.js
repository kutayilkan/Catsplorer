const originToCode = {
  Australia: "AU",
  Avustralya: "AU",
  Burma: "MM",
  Birmanya: "MM",
  Canada: "CA",
  Kanada: "CA",
  China: "CN",
  Çin: "CN",
  Cyprus: "CY",
  "Kıbrıs": "CY",
  Egypt: "EG",
  Mısır: "EG",
  France: "FR",
  Fransa: "FR",
  Greece: "GR",
  Yunanistan: "GR",
  "Iran (Persia)": "IR",
  "İran (Persya)": "IR",
  "Isle of Man": "IM",
  "Man Adası": "IM",
  Japan: "JP",
  Japonya: "JP",
  Norway: "NO",
  Norveç: "NO",
  Russia: "RU",
  Rusya: "RU",
  Singapore: "SG",
  Singapur: "SG",
  Somalia: "SO",
  Somali: "SO",
  Thailand: "TH",
  Tayland: "TH",
  Turkey: "TR",
  Türkiye: "TR",
  "United Arab Emirates": "AE",
  "Birleşik Arap Emirlikleri": "AE",
  "United Kingdom": "GB",
  "Birleşik Krallık": "GB",
  "United States": "US",
  "Amerika Birleşik Devletleri": "US",
};

function codeToFlag(code) {
  if (!code || code.length !== 2) {
    return "🏳️";
  }

  return code
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

export function getOriginCode(origin) {
  return originToCode[origin] || null;
}

export function getOriginFlag(origin) {
  return codeToFlag(getOriginCode(origin));
}

export function getFlagFromCode(code) {
  return codeToFlag(code);
}
