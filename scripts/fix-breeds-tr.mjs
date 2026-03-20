import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../src/data/breeds_tr.json");

const originMap = {
  Australia: "Avustralya",
  Burma: "Birmanya",
  Canada: "Kanada",
  China: "Çin",
  Cyprus: "Kıbrıs",
  Egypt: "Mısır",
  France: "Fransa",
  Greece: "Yunanistan",
  "Iran (Persia)": "İran (Persya)",
  "Isle of Man": "Man Adası",
  Japan: "Japonya",
  Norway: "Norveç",
  Russia: "Rusya",
  Singapore: "Singapur",
  Somalia: "Somali",
  Thailand: "Tayland",
  Turkey: "Türkiye",
  "United Arab Emirates": "Birleşik Arap Emirlikleri",
  "United Kingdom": "Birleşik Krallık",
  "United States": "Amerika Birleşik Devletleri",
};

const temperamentMap = {
  Active: "Aktif",
  Affectionate: "Şefkatli",
  Agile: "Çevik",
  Alert: "Dikkatli",
  Calm: "Sakin",
  Clever: "Akıllı",
  Curious: "Meraklı",
  Demanding: "İlgi Bekleyen",
  Devoted: "Bağlı",
  Easygoing: "Rahat",
  Energetic: "Enerjik",
  Friendly: "Canayakın",
  "Fun-loving": "Eğlenceli",
  Gentle: "Nazik",
  Independent: "Bağımsız",
  Intelligent: "Zeki",
  Interactive: "Etkileşimli",
  Lively: "Canlı",
  Loving: "Sevecen",
  Loyal: "Sadık",
  Mischievous: "Yaramaz",
  Outgoing: "Dışa Dönük",
  Patient: "Sabırlı",
  Playful: "Oyuncu",
  Quiet: "Sessiz",
  Responsive: "Duyarlı",
  Sedate: "Uysal",
  Sensible: "Mantıklı",
  Sensitive: "Hassas",
  Social: "Sosyal",
  Sociable: "Sosyal",
  Sweet: "Tatlı",
  Talkative: "Konuşkan",
  Trainable: "Eğitilebilir",
};

const lowerTemperamentMap = Object.fromEntries(
  Object.entries(temperamentMap).map(([key, value]) => [key.toLowerCase(), value])
);

const nameMap = {
  ctif: "Chantilly-Tiffany",
  char: "Chartreux",
  chau: "Chausie",
  chee: "Cheetoh",
  csho: "Colorpoint Shorthair",
  crex: "Cornish Rex",
  cymr: "Cymric",
  cypr: "Kıbrıs Kedisi",
  drex: "Devon Rex",
  dons: "Donskoy",
  lihu: "Dragon Li",
  emau: "Egyptian Mau",
  ebur: "European Burmese",
  esho: "Exotic Shorthair",
  hbro: "Havana Brown",
  hima: "Himalaya",
  jbob: "Japanese Bobtail",
  java: "Javanese",
  khao: "Khao Manee",
  kora: "Korat",
  kuri: "Kurilian",
  lape: "LaPerm",
  mcoo: "Maine Coon",
  mala: "Malayan",
  manx: "Manx",
  munc: "Munchkin",
  nebe: "Nebelung",
  norw: "Norveç Orman Kedisi",
  ocic: "Ocicat",
  orie: "Oriental",
  pers: "İran Kedisi",
  pixi: "Pixie-bob",
  raga: "Ragamuffin",
  ragd: "Ragdoll",
  rblu: "Rus Mavisi",
  sava: "Savannah",
  sfol: "Scottish Fold",
  srex: "Selkirk Rex",
  siam: "Siyam Kedisi",
  sibe: "Sibirya Kedisi",
  sing: "Singapura",
  snow: "Snowshoe",
  soma: "Somali",
  sphy: "Sphynx",
  tonk: "Tonkinese",
  toyg: "Toyger",
  tang: "Ankara Kedisi",
  tvan: "Van Kedisi",
  ycho: "York Chocolate",
};

const descriptionMap = {
  ctif: "Chantilly-Tiffany nazik, sakin ve insanına bağlı bir kedidir. Sessiz yapısı ve yumuşak tüyleriyle ev yaşamına iyi uyum sağlar.",
  char: "Chartreux sessiz, dengeli ve sevgi dolu bir kedidir. Avcı içgüdülerini korurken ailesiyle güçlü bağ kurar.",
  chau: "Chausie enerjik, meraklı ve atletik bir kedidir. Zihinsel uyarım ve hareket alanı olduğunda çok mutlu olur.",
  chee: "Cheetoh benekli görünümüne rağmen canayakın ve oyuncu bir ev kedisidir. Aktif yapısı nedeniyle ilgi ve oyun ister.",
  csho: "Colorpoint Shorthair konuşkan, zeki ve insan odaklı bir kedidir. Siyam kedisine benzer hareketli yapısıyla sürekli etkileşim ister.",
  crex: "Cornish Rex ince kıvırcık tüyleriyle tanınan, hareketli ve sevgi dolu bir kedidir. Oyun oynamayı ve insanlarla birlikte olmayı çok sever.",
  cymr: "Cymric uzun tüylü Manx olarak bilinen, sakin ve sevgi dolu bir kedidir. Güçlü arka bacakları sayesinde çevik ve oyuncudur.",
  cypr: "Kıbrıs Kedisi doğal gelişmiş, dayanıklı ve sosyal bir kedi ırkıdır. İnsanlarla yakın ilişki kurar ve hareketli bir karaktere sahiptir.",
  drex: "Devon Rex büyük kulakları, kıvırcık tüyleri ve yaramaz karakteriyle bilinir. İnsan ilgisini seven çok sosyal bir kedidir.",
  dons: "Donskoy tüysüz görünümü ve sıcak karakteriyle öne çıkan bir kedidir. Sahibine yakın olmayı sever ve oldukça sosyal davranır.",
  lihu: "Dragon Li dikkatli, bağımsız ve zeki bir kedidir. Güçlü avcılık içgüdüsüyle hareketli ama dengeli bir yapı gösterir.",
  emau: "Egyptian Mau benekli tüyleri ve yüksek hızıyla tanınır. Sadık, hassas ve oyun seven bir kedi türüdür.",
  ebur: "European Burmese sevgi dolu, meraklı ve insan odaklı bir kedidir. Ev içinde sürekli iletişim kurmaktan hoşlanır.",
  esho: "Exotic Shorthair, İran kedisinin kısa tüylü ve daha bakım dostu halidir. Sakin, nazik ve sevecen bir mizaca sahiptir.",
  hbro: "Havana Brown parlak kahverengi tüyleri ve meraklı doğasıyla bilinir. İnsanlarla iletişim kurmayı seven zarif bir kedidir.",
  hima: "Himalaya, İran kedisi ve Siyam kedisi özelliklerini birleştiren sakin bir kedi ırkıdır. Sessiz ortamları ve ilgiyi sever.",
  jbob: "Japanese Bobtail kısa kuyruğu ve neşeli karakteriyle tanınır. Çevik, zeki ve insanlarla güçlü bağ kuran bir kedidir.",
  java: "Javanese ince yapılı, konuşkan ve sevgi dolu bir kedidir. Ailesiyle sürekli etkileşim kurmak ister.",
  khao: "Khao Manee bembeyaz tüyleri ve dikkat çekici gözleriyle tanınır. Meraklı, sosyal ve insan odaklı bir kedidir.",
  kora: "Korat zarif yapısı ve parlak mavi-gri tüyleriyle bilinir. Sadık, hassas ve ailesine bağlı bir karaktere sahiptir.",
  kuri: "Kurilian güçlü, çevik ve avcı ruhlu bir kedidir. Buna rağmen evde sevgi dolu ve dengeli davranır.",
  lape: "LaPerm kıvırcık tüyleri ve sıcak mizacıyla dikkat çeker. İnsanlarla vakit geçirmekten hoşlanan sevecen bir kedidir.",
  mcoo: "Maine Coon iri yapısına rağmen nazik bir dev olarak bilinir. İnsanlarla birlikte olmayı sever, ancak aşırı ilgi talep etmez ve suyla arası genellikle iyidir.",
  mala: "Malayan oyuncu, sevecen ve insan ilişkileri güçlü bir kedidir. Ev yaşamına kolay uyum sağlar.",
  manx: "Manx kuyruksuz görünümüyle tanınan, güçlü arka bacaklı bir kedidir. Sadık, oyuncu ve meraklı bir yapıya sahiptir.",
  munc: "Munchkin kısa bacaklarıyla dikkat çeken, enerjik ve neşeli bir kedidir. Hareketli yapısına rağmen ev içinde uyumlu yaşar.",
  nebe: "Nebelung uzun, ipeksi tüyleri ve sakin mizacıyla bilinir. Güvendiği insanlara karşı sevgi dolu ve sadıktır.",
  norw: "Norveç Orman Kedisi tatlı, sevgi dolu ve zeki bir kedidir. Avcı içgüdülerini korur, oyuncak kovalamayı sever ve ailesine bağlanır.",
  ocic: "Ocicat vahşi görünümlü ama insan dostu bir kedidir. Aktif, oyuncu ve oldukça zeki bir mizaca sahiptir.",
  orie: "Oriental ince yapılı, konuşkan ve çok sosyal bir kedidir. İnsan ilgisiyle beslenir ve yalnız kalmaktan hoşlanmaz.",
  pers: "İran kedisi tatlı, nazik ve sakin bir kedidir. Aile yaşamına uyum sağlar, ev içinde dinlenmeyi sever ve gerektiğinde kendi alanına çekilir.",
  pixi: "Pixie-bob vahşi görünüşüne rağmen sadık ve uysal bir ev kedisidir. Ailesiyle bağ kurmayı ve oyun oynamayı sever.",
  raga: "Ragamuffin yumuşak yapılı, çok sevecen ve insan odaklı bir kedidir. Kucakta durmayı seven rahat bir mizaca sahiptir.",
  ragd: "Ragdoll kucağa alındığında gevşeyen yapısı ve sakinliğiyle bilinir. Sevgi dolu, nazik ve aile yaşamına çok uygun bir kedidir.",
  rblu: "Rus Mavisi zarif görünüşü, mavi-gri tüyleri ve çekingen asaletiyle bilinir. Sessiz ama sahibine bağlı bir kedidir.",
  sava: "Savannah uzun bacaklı, atletik ve çok enerjik bir kedidir. Zekası yüksek olduğu için ilgi, hareket ve zihinsel uyarım ister.",
  sfol: "Scottish Fold öne doğru kıvrılan kulakları ve tatlı ifadesiyle tanınır. Sakin, uyumlu ve insan dostu bir kedidir.",
  srex: "Selkirk Rex kıvırcık tüyleri ve sevecen mizacıyla dikkat çeker. Oyuncu ama dengeli bir aile kedisidir.",
  siam: "Siyam kedisi insanlarına çok düşkün, konuşkan ve dikkat çekici bir kedidir. Yalnız kalmaktan hoşlanmaz; sosyal ve ilgi talep eden bir karaktere sahiptir.",
  sibe: "Sibirya kedisi köpeksi bağlılığı ve şefkatiyle ideal bir ev kedisi olabilir. Güçlü, çevik ve yüksek yerlere kolayca sıçrayabilen bir yapısı vardır.",
  sing: "Singapura küçük yapısına rağmen meraklı ve enerjik bir kedidir. İnsanlarla yakın ilişki kurar ve oyun oynamayı sever.",
  snow: "Snowshoe, Siyam benzeri zarif çizgilere sahip, sevgi dolu bir kedidir. Zeki, sosyal ve insan odaklı bir yapı gösterir.",
  soma: "Somali uzun tüylü, canlı ve meraklı bir kedidir. Zekası ve oyunculuğu nedeniyle hareketli evlere iyi uyum sağlar.",
  sphy: "Sphynx tüysüz görünümüne rağmen sıcak, sevecen ve dışa dönük bir kedidir. İnsan teması ve ilgi onun için çok önemlidir.",
  tonk: "Tonkinese Siyam ve Burmese özelliklerini birleştiren, dengeli ve oyuncu bir kedidir. İnsanlarla sürekli etkileşim kurmayı sever.",
  toyg: "Toyger minyatür kaplan görünümüne sahip, enerjik ve zeki bir kedidir. Oyuncu karakteriyle aktif ailelere iyi uyum sağlar.",
  tang: "Ankara kedisi zeki ve insanlarla güçlü bağ kuran bir kedidir. Şefkatli, oyuncu ve aile yaşamı için çok iyi bir seçimdir; evdeki diğer hayvanlarla da genelde iyi anlaşır.",
  tvan: "Van kedisi zıplamayı, tırmanmayı ve oyuncaklarla oynamayı seven hareketli bir kedidir. Kucak kedisi olmasa da sahibinin yanında olmaktan ve onunla uyumaktan hoşlanır.",
  ycho: "York Chocolate uzun tüylü, sevecen ve dengeli bir kedidir. İnsan ilişkileri güçlüdür ve sakin ev yaşamına iyi uyum sağlar.",
};

function translateTemperament(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .map((item) => lowerTemperamentMap[item.toLowerCase()] || item)
    .join(", ");
}

const breeds = JSON.parse(fs.readFileSync(filePath, "utf8"));

const nextBreeds = breeds.map((breed) => {
  const nextBreed = { ...breed };

  if (originMap[nextBreed.origin]) {
    nextBreed.origin = originMap[nextBreed.origin];
  }

  if (nextBreed.temperament) {
    nextBreed.temperament = translateTemperament(nextBreed.temperament);
  }

  if (nameMap[nextBreed.id]) {
    nextBreed.name = nameMap[nextBreed.id];
  }

  if (descriptionMap[nextBreed.id]) {
    nextBreed.description = descriptionMap[nextBreed.id];
  }

  if (nameMap[nextBreed.id] && nextBreed.description) {
    nextBreed.description = nextBreed.description.replaceAll(breed.name, nameMap[nextBreed.id]);
  }

  return nextBreed;
});

fs.writeFileSync(filePath, `${JSON.stringify(nextBreeds, null, 2)}\n`);
console.log(`Updated ${nextBreeds.length} Turkish breed records.`);
