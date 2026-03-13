// TIER 1: Iconic
// TIER 2: Zodiac
// TIER 3: The Rest

export const CONSTELLATIONS = [
  // =====================
  // TIER 1: ICONIC
  // =====================
  {
    name: "Ursa Major",
    tier: 1,
    anchor: 59774, // Merak
    meaning: "The Great Bear",
    season: "Spring",
    brightest: "Alioth",
    description: "Contains the 'Big Dipper'. Used to find the North Star.",
    lines: [
      [54061, 53910],
      [53910, 58001],
      [58001, 59774],
      [59774, 62956],
      [62956, 65378],
      [65378, 67301],
      [59774, 65378],
    ],
  },
  {
    name: "Ursa Minor",
    tier: 1,
    anchor: 11767, // Polaris
    meaning: "The Little Bear",
    season: "All Year",
    brightest: "Polaris",
    description: "Home to the North Star.",
    lines: [
      [11767, 85822],
      [85822, 82080],
      [82080, 77055],
      [77055, 75097],
      [75097, 72607],
      [72607, 76952],
      [77055, 76952],
    ],
  },
  {
    name: "Orion",
    tier: 1,
    anchor: 26727, // Alnilam
    meaning: "The Hunter",
    season: "Winter",
    brightest: "Rigel",
    description: "The most recognizable constellation in the winter sky.",
    lines: [
      [27989, 27366],
      [27366, 26727],
      [27989, 28614],
      [26727, 25930],
      [27989, 29426],
      [26727, 25336],
      [29426, 28614],
      [25336, 25930],
    ],
  },
  {
    name: "Cassiopeia",
    tier: 1,
    anchor: 4427, // Gamma Cas
    meaning: "The Queen",
    season: "Autumn",
    brightest: "Schedar",
    description: "Distinctive 'W' shape opposite the Big Dipper.",
    lines: [
      [3179, 746],
      [746, 4427],
      [4427, 2685],
      [2685, 94114],
    ],
  },
  {
    name: "Crux",
    tier: 1,
    anchor: 60718, // Acrux
    meaning: "The Southern Cross",
    season: "Spring (South)",
    brightest: "Acrux",
    description: "Smallest but most famous southern constellation.",
    lines: [
      [60718, 62434],
      [62434, 61084],
      [61084, 59747],
      [59747, 60718],
      [62434, 59747],
    ],
  },
  {
    name: "Cygnus",
    tier: 1,
    anchor: 102098, // Deneb
    meaning: "The Swan",
    season: "Summer",
    brightest: "Deneb",
    description: "The Northern Cross.",
    lines: [
      [102098, 100453],
      [100453, 98110],
      [98110, 95947],
      [98110, 97649],
      [97649, 96405],
      [98110, 102488],
    ],
  },
  {
    name: "Lyra",
    tier: 1,
    anchor: 91262, // Vega
    meaning: "The Harp",
    season: "Summer",
    brightest: "Vega",
    description: "Home to Vega, the 5th brightest star.",
    lines: [
      [91262, 91971],
      [91971, 92420],
      [92420, 93244],
      [93244, 91971],
    ],
  },
  {
    name: "Aquila",
    tier: 1,
    anchor: 97649, // Altair
    meaning: "The Eagle",
    season: "Summer",
    brightest: "Altair",
    description: "The Eagle carrying Zeus's thunderbolts.",
    lines: [
      [97649, 97278],
      [97278, 96229],
      [97278, 95501],
      [95501, 93747],
      [93747, 93244],
      [93244, 93805],
      [97649, 98036],
    ],
  },

  // =====================
  // TIER 2: ZODIAC
  // =====================
  {
    name: "Aries",
    tier: 2,
    anchor: 9884, // Hamal
    meaning: "The Ram",
    season: "Winter",
    brightest: "Hamal",
    lines: [
      [9884, 8832],
      [8832, 8198],
      [8198, 6686],
    ],
  },
  {
    name: "Taurus",
    tier: 2,
    anchor: 21421, // Aldebaran
    meaning: "The Bull",
    season: "Winter",
    brightest: "Aldebaran",
    lines: [
      [21421, 20889],
      [20889, 20205],
      [20205, 18724],
      [20889, 21192],
      [21192, 27989],
      [21421, 25930],
    ],
  },
  {
    name: "Gemini",
    tier: 2,
    anchor: 37826, // Pollux
    meaning: "The Twins",
    season: "Winter",
    brightest: "Pollux",
    lines: [
      // Castor's Body
      [36850, 33694], // Castor -> Mebsuta
      [33694, 32246], // Mebsuta -> Tejat
      [32246, 30343], // Tejat -> Propus (Foot)

      // Pollux's Body
      [37826, 35550], // Pollux -> Wasat
      [35550, 32362], // Wasat -> Mekbuda
      [32362, 31681], // Mekbuda -> Alhena (Foot)

      // Connection (Holding Hands)
      [36850, 37826], // Castor -> Pollux (Heads) OR connect bodies
    ],
  },
  {
    name: "Cancer",
    tier: 2,
    anchor: 42911, // Altarf
    meaning: "The Crab",
    season: "Spring",
    brightest: "Altarf",
    lines: [
      [42911, 42806],
      [42806, 42403],
      [42403, 40526],
      [42403, 39339],
    ],
  },
  {
    name: "Leo",
    tier: 2,
    anchor: 49669, // Regulus
    meaning: "The Lion",
    season: "Spring",
    brightest: "Regulus",
    lines: [
      // The Sickle (Head/Mane)
      [49669, 49583], // Regulus -> Eta Leonis (Base of neck)
      [49583, 50583], // Eta -> Algieba (Neck)
      [50583, 50335], // Algieba -> Adhafera (Mane)
      [50335, 47908], // Adhafera -> Rasalas (Top of head)
      [47908, 46750], // Rasalas -> Epsilon (Nose)

      // The Body
      [50583, 54872], // Algieba -> Zosma (Back)
      [54872, 57632], // Zosma -> Denebola (Tail tip)
      [57632, 54879], // Denebola -> Chertan (Rump)
      [54879, 49669], // Chertan -> Regulus (Belly - closes the loop)
    ],
  },
  {
    name: "Virgo",
    tier: 2,
    anchor: 65474, // Spica
    meaning: "The Virgin",
    season: "Spring",
    brightest: "Spica",
    lines: [
      [65474, 63608], // Spica -> Porrima (Center)
      [63608, 60965], // Porrima -> Auva
      [60965, 57632], // Auva -> Zavijava (Head) - Note: Connects to Leo's tail area visually
      [63608, 66249], // Porrima -> Theta Vir
      [66249, 72607], // Theta -> Tau Vir (Feet)
      [63608, 57380], // Porrima -> Vindemiatrix (Arm)
    ],
  },
  {
    name: "Libra",
    tier: 2,
    anchor: 72622, // Zubeneschamali
    meaning: "The Scales",
    season: "Summer",
    brightest: "Zubeneschamali",
    lines: [
      [72622, 76333],
      [76333, 74785],
      [74785, 71352],
      [71352, 72622],
    ],
  },
  {
    name: "Scorpius",
    tier: 2,
    anchor: 80763, // Antares
    meaning: "The Scorpion",
    season: "Summer",
    brightest: "Antares",
    description: "Looks like a scorpion. Antares is the 'Rival of Mars'.",
    lines: [
      [80763, 78820],
      [78820, 78265],
      [78265, 76297],
      [80763, 82396],
      [82396, 82514],
      [82514, 84143],
      [84143, 86228],
      [86228, 86670],
      [86670, 85927],
      [85927, 85696],
    ],
  },
  {
    name: "Sagittarius",
    tier: 2,
    anchor: 90185, // Kaus Australis
    meaning: "The Archer",
    season: "Summer",
    brightest: "Kaus Australis",
    lines: [
      [90185, 89931],
      [89931, 90496],
      [90496, 92855],
      [92855, 90185],
      [90496, 89962],
      [89962, 88635],
      [88635, 90185],
      [92855, 93864],
    ],
  },
  {
    name: "Capricornus",
    tier: 2,
    anchor: 100064,
    meaning: "The Sea Goat",
    season: "Autumn",
    brightest: "Deneb Algedi",
    lines: [
      [100064, 100345],
      [100345, 107556],
      [107556, 108428],
      [108428, 105199],
      [105199, 102485],
      [102485, 100064],
    ],
  },
  {
    name: "Aquarius",
    tier: 2,
    anchor: 109074, // Sadalsuud
    meaning: "The Water Bearer",
    season: "Autumn",
    brightest: "Sadalsuud",
    lines: [
      [109074, 106278],
      [106278, 110395],
      [110395, 110960],
      [110960, 114341],
    ],
  },
  {
    name: "Pisces",
    tier: 2,
    anchor: 6706,
    meaning: "The Fish",
    season: "Autumn",
    brightest: "Eta Piscium",
    lines: [
      [6706, 3786],
      [3786, 117245],
      [117245, 114971],
      [114971, 114341],
      [114971, 5131],
      [5131, 7097],
      [7097, 8198],
    ],
  },

  // =====================
  // TIER 3: SOUTHERN GIANTS & NAVIGATIONAL
  // =====================
  {
    name: "Centaurus",
    tier: 3,
    anchor: 71683, // Rigil Kentaurus
    meaning: "The Centaur",
    season: "Spring (Southern)",
    brightest: "Alpha Centauri",
    description:
      "Contains Alpha Centauri, the closest star system to Earth. One of the largest constellations.",
    lines: [
      [71683, 68702],
      [68702, 61932],
      [61932, 59196],
      [59196, 56561],
      [68702, 64003],
      [64003, 52638],
      [52638, 44402],
      [44402, 48191],
      [48191, 56561],
    ],
  },
  {
    name: "Carina",
    tier: 3,
    anchor: 30438, // Canopus
    meaning: "The Keel",
    season: "Winter (Southern)",
    brightest: "Canopus",
    description:
      "Part of the former giant constellation Argo Navis. Canopus is the second brightest star in the sky.",
    lines: [
      [30438, 45556],
      [45556, 41037],
      [41037, 33061],
      [33061, 40680],
      [40680, 48002],
      [48002, 50191],
    ],
  },
  {
    name: "Eridanus",
    tier: 3,
    anchor: 7588, // Achernar
    meaning: "The River",
    season: "Winter",
    brightest: "Achernar",
    description:
      "The Celestial River. It flows from the foot of Orion all the way down to the southern horizon.",
    lines: [
      [24385, 21444],
      [21444, 19587],
      [19587, 17851],
      [17851, 13147],
      [13147, 7588],
    ],
  },
  {
    name: "Canis Major",
    tier: 3,
    anchor: 32349, // Sirius
    meaning: "The Great Dog",
    season: "Winter",
    brightest: "Sirius",
    description:
      "Contains Sirius, the brightest star in the entire night sky. Orion's hunting dog.",
    lines: [
      [32349, 31405],
      [31405, 33579],
      [33579, 34045],
      [34045, 35659],
      [34045, 33150],
      [33150, 33977],
      [32349, 30324],
    ],
  },
  {
    name: "Pegasus",
    tier: 3,
    anchor: 113963, // Scheat
    meaning: "The Winged Horse",
    season: "Autumn",
    brightest: "Enif",
    description:
      "Easily identified by the 'Great Square of Pegasus'. Shared star Alpheratz connects it to Andromeda.",
    lines: [
      [113963, 113881],
      [113881, 161],
      [161, 879],
      [879, 113963],
      [113963, 107315],
      [107315, 109176],
    ],
  },
  {
    name: "Andromeda",
    tier: 3,
    anchor: 677, // Alpheratz
    meaning: "The Chained Princess",
    season: "Autumn",
    brightest: "Alpheratz",
    description:
      "Contains the Andromeda Galaxy (M31), the nearest major galaxy to the Milky Way. Mythologically chained to a rock.",
    lines: [
      [677, 3092],
      [3092, 5447],
      [5447, 8903],
      [8903, 9640],
      [3092, 3881],
      [3881, 2912],
      [5447, 4436],
      [4436, 2912],
    ],
  },
  {
    name: "Auriga",
    tier: 3,
    anchor: 24608, // Capella
    meaning: "The Charioteer",
    season: "Winter",
    brightest: "Capella",
    description:
      "Its brightest star, Capella, is the 6th brightest in the sky. Forms a pentagon shape.",
    lines: [
      [24608, 28360],
      [28360, 28380],
      [28380, 25428],
      [25428, 23015],
      [23015, 23453],
      [23453, 24608],
    ],
  },
  {
    name: "Boötes",
    tier: 3,
    anchor: 69673, // Arcturus
    meaning: "The Herdsman",
    season: "Spring",
    brightest: "Arcturus",
    description:
      "Dominated by Arcturus, the 4th brightest star in the sky. Looks like a giant kite.",
    lines: [
      [69673, 71075],
      [71075, 72105],
      [72105, 73555],
      [73555, 75097],
      [73555, 71795],
      [71795, 69714],
      [69714, 69673],
      [69673, 67927],
    ],
  },
  {
    name: "Cepheus",
    tier: 3,
    anchor: 105199, // Alderamin
    meaning: "The King",
    season: "Autumn",
    brightest: "Alderamin",
    description:
      "Resembles a child's drawing of a house. Represents the King of Ethiopia, husband of Cassiopeia.",
    lines: [
      [105199, 106032],
      [106032, 109434],
      [109434, 115128],
      [115128, 112724],
      [112724, 105199],
    ],
  },
  {
    name: "Draco",
    tier: 3,
    anchor: 87833, // Eltanin
    meaning: "The Dragon",
    season: "Summer",
    brightest: "Eltanin",
    description:
      "Snakes around the Little Dipper. Thuban, a star in its tail, was the North Star 4,000 years ago.",
    lines: [
      [87833, 85693],
      [85693, 91117],
      [91117, 94376],
      [94376, 80883],
      [80883, 81292],
      [81292, 83608],
      [83608, 75458],
      [75458, 68756],
      [68756, 59862],
      [59862, 44248],
    ],
  },
  {
    name: "Hercules",
    tier: 3,
    anchor: 80112, // Kornephoros
    meaning: "The Hero",
    season: "Summer",
    brightest: "Kornephoros",
    description:
      "Contains the 'Keystone' asterism and the Great Globular Cluster (M13).",
    lines: [
      [80112, 81693],
      [81693, 83207],
      [83207, 84345],
      [84345, 85693],
      [85693, 84379],
      [84379, 81833],
      [81833, 80112],
    ],
  },
  {
    name: "Perseus",
    tier: 3,
    anchor: 15863, // Mirfak
    meaning: "The Hero",
    season: "Winter",
    brightest: "Mirfak",
    description:
      "Home to the famous Double Cluster and the variable star Algol (the Demon Star).",
    lines: [
      [15863, 17358],
      [17358, 18532],
      [15863, 14354],
      [14354, 14328],
      [15863, 13254],
      [13254, 14576],
      [14576, 14135],
      [14135, 9340],
      [9340, 8903],
    ],
  },
  {
    name: "Ophiuchus",
    tier: 3,
    anchor: 86032, // Rasalhague
    meaning: "The Serpent Bearer",
    season: "Summer",
    brightest: "Rasalhague",
    description:
      "The '13th Zodiac'. A massive constellation holding the serpent Serpens.",
    lines: [
      [86032, 86263],
      [86263, 84012],
      [84012, 81377],
      [81377, 77516],
      [81377, 80494],
      [86032, 87965],
      [87965, 88794],
      [88794, 84970],
      [84970, 82396],
    ],
  },
  {
    name: "Corona Borealis",
    tier: 3,
    anchor: 76267, // Alphecca
    meaning: "The Northern Crown",
    season: "Spring",
    brightest: "Alphecca",
    description:
      "A distinct semi-circle of stars. Represents the crown given to Ariadne by Dionysus.",
    lines: [
      [76267, 77655],
      [77655, 78368],
      [78368, 79593],
      [76267, 75695],
      [75695, 75011],
      [75011, 74666],
    ],
  },
  {
    name: "Vela",
    tier: 3,
    anchor: 41037, // Suhail
    meaning: "The Sails",
    season: "Winter (Southern)",
    brightest: "Regor",
    description:
      "Part of the former giant ship Argo Navis. Contains spectacular nebulas.",
    lines: [
      [41037, 44816],
      [44816, 42913],
      [42913, 39429],
      [39429, 41037],
      [44816, 46701],
      [46701, 48356],
    ],
  },
  {
    name: "Puppis",
    tier: 3,
    anchor: 39429, // Naos
    meaning: "The Stern",
    season: "Winter",
    brightest: "Naos",
    description:
      "The stern (deck) of the ship Argo Navis. Lies in the rich band of the Milky Way.",
    lines: [
      [39429, 37819],
      [37819, 38020],
      [38020, 36377],
      [36377, 35793],
    ],
  },
  {
    name: "Grus",
    tier: 3,
    anchor: 109268, // Alnair
    meaning: "The Crane",
    season: "Autumn (Southern)",
    brightest: "Alnair",
    description:
      "A southern bird constellation. Known as the 'Flamingo' in some cultures.",
    lines: [
      [109268, 112122],
      [112122, 110823],
      [110823, 111054],
      [110823, 109427],
      [109427, 106656],
      [106656, 109268],
    ],
  },
  {
    name: "Phoenix",
    tier: 3,
    anchor: 2081, // Ankaa
    meaning: "The Phoenix",
    season: "Autumn (Southern)",
    brightest: "Ankaa",
    description:
      "Represents the mythical bird reborn from fire. Located near Eridanus.",
    lines: [
      [2081, 2599],
      [2599, 6411],
      [6411, 8588],
      [8588, 9644],
      [9644, 5571],
      [5571, 3414],
      [3414, 2081],
    ],
  },
  {
    name: "Pavo",
    tier: 3,
    anchor: 100751, // Peacock
    meaning: "The Peacock",
    season: "Summer (Southern)",
    brightest: "Peacock",
    description:
      "One of the 'Southern Birds'. Its brightest star is appropriately named Peacock.",
    lines: [
      [100751, 99240],
      [99240, 95853],
      [95853, 90853],
      [90853, 88567],
      [88567, 81623],
    ],
  },
  {
    name: "Tucana",
    tier: 3,
    anchor: 112405, // Alpha Tuc
    meaning: "The Toucan",
    season: "Autumn (Southern)",
    brightest: "Alpha Tucanae",
    description:
      "Deep southern constellation. Home to the Small Magellanic Cloud (SMC).",
    lines: [
      [112405, 113246],
      [113246, 117567],
      [117567, 2854],
      [117567, 1053],
    ],
  },
  {
    name: "Ara",
    tier: 3,
    anchor: 85792, // Alpha Arae
    meaning: "The Altar",
    season: "Summer",
    brightest: "Beta Arae",
    description:
      "The altar where the gods made alliances. Lies just south of Scorpius.",
    lines: [
      [85792, 85727],
      [85727, 85267],
      [85267, 83081],
      [83081, 83519],
      [83519, 85792],
    ],
  },
  {
    name: "Hydrus",
    tier: 3,
    anchor: 9236, // Beta Hydri
    meaning: "The Male Water Snake",
    season: "Winter (Southern)",
    brightest: "Beta Hydri",
    description:
      "Not to be confused with the massive northern Hydra. Wraps around the South Celestial Pole.",
    lines: [
      [9236, 6066],
      [6066, 8993],
      [8993, 12305],
    ],
  },
  {
    name: "Canes Venatici",
    tier: 3,
    anchor: 63125,
    meaning: "The Hunting Dogs",
    lines: [[63125, 61317]],
  },
  {
    name: "Coma Berenices",
    tier: 3,
    anchor: 64394,
    meaning: "Berenice's Hair",
    lines: [
      [64394, 64241],
      [64241, 60742],
    ],
  },
  {
    name: "Corvus",
    tier: 3,
    anchor: 60965,
    meaning: "The Crow",
    lines: [
      [60965, 59803],
      [59803, 59199],
      [59199, 61359],
      [61359, 60965],
      [60965, 58587],
    ],
  },
  {
    name: "Crater",
    tier: 3,
    anchor: 55642,
    meaning: "The Cup",
    lines: [
      [55642, 55282],
      [55282, 53563],
      [53563, 52913],
      [52913, 54682],
      [54682, 55642],
      [53563, 54879],
    ],
  },
  {
    name: "Delphinus",
    tier: 3,
    anchor: 101958,
    meaning: "The Dolphin",
    lines: [
      [101958, 101909],
      [101909, 101769],
      [101769, 101916],
      [101916, 101958],
      [101916, 101421],
    ],
  },
  {
    name: "Equuleus",
    tier: 3,
    anchor: 104732,
    meaning: "The Little Horse",
    lines: [
      [104732, 104887],
      [104887, 104858],
      [104858, 104732],
    ],
  },
  {
    name: "Lacerta",
    tier: 3,
    anchor: 111104,
    meaning: "The Lizard",
    lines: [
      [111104, 112185],
      [112185, 110538],
      [110538, 109387],
      [109387, 108605],
    ],
  },
  {
    name: "Leo Minor",
    tier: 3,
    anchor: 51624,
    meaning: "The Lesser Lion",
    lines: [
      [51624, 47508],
      [47508, 48486],
    ],
  },
  {
    name: "Lepus",
    tier: 3,
    anchor: 25985,
    meaning: "The Hare",
    lines: [
      [25985, 26634],
      [26634, 27288],
      [27288, 25606],
      [25606, 23685],
      [23685, 25985],
    ],
  },
  {
    name: "Lynx",
    tier: 3,
    anchor: 44248,
    meaning: "The Lynx",
    lines: [
      [44248, 41381],
      [41381, 36850],
      [36850, 28380],
    ],
  },
  {
    name: "Monoceros",
    tier: 3,
    anchor: 30867,
    meaning: "The Unicorn",
    lines: [
      [30867, 34045],
      [30867, 27366],
      [27366, 22298],
    ],
  },
  {
    name: "Sagitta",
    tier: 3,
    anchor: 97278,
    meaning: "The Arrow",
    lines: [
      [97278, 98267],
      [98267, 96757],
      [96757, 97496],
    ],
  },
  {
    name: "Serpens",
    tier: 3,
    anchor: 77516,
    meaning: "The Serpent",
    lines: [
      [77516, 76267],
      [76267, 76001],
    ],
  }, // Caput
  {
    name: "Sextans",
    tier: 3,
    anchor: 49641,
    meaning: "The Sextant",
    lines: [[49641, 50583]],
  },
  {
    name: "Scutum",
    tier: 3,
    anchor: 91117,
    meaning: "The Shield",
    lines: [
      [91117, 92041],
      [92041, 92855],
    ],
  },
  {
    name: "Triangulum",
    tier: 3,
    anchor: 8903,
    meaning: "The Triangle",
    lines: [
      [8903, 10064],
      [10064, 9640],
      [9640, 8903],
    ],
  },
  {
    name: "Vulpecula",
    tier: 3,
    anchor: 95501,
    meaning: "The Fox",
    lines: [
      [95501, 95771],
      [95771, 98543],
    ],
  },
  {
    name: "Antlia",
    tier: 3,
    anchor: 49669,
    meaning: "The Air Pump",
    lines: [[49669, 51802]],
  },
  {
    name: "Caelum",
    tier: 3,
    anchor: 23875,
    meaning: "The Chisel",
    lines: [[23875, 23883]],
  },
  {
    name: "Camelopardalis",
    tier: 3,
    anchor: 2599,
    meaning: "The Giraffe",
    lines: [
      [2599, 14135],
      [14135, 22783],
      [22783, 58001],
    ],
  },
  {
    name: "Chamaeleon",
    tier: 3,
    anchor: 61932,
    meaning: "The Chameleon",
    lines: [[61932, 51839]],
  },
  {
    name: "Circinus",
    tier: 3,
    anchor: 71908,
    meaning: "The Compass",
    lines: [
      [71908, 75323],
      [75323, 71908],
    ],
  },
  {
    name: "Columba",
    tier: 3,
    anchor: 27989,
    meaning: "The Dove",
    lines: [[27989, 26634]],
  },
  {
    name: "Corona Australis",
    tier: 3,
    anchor: 93805,
    meaning: "The Southern Crown",
    lines: [
      [93805, 92953],
      [92953, 92728],
    ],
  },
  {
    name: "Dorado",
    tier: 3,
    anchor: 21281,
    meaning: "The Dolphinfish",
    lines: [[21281, 19587]],
  },
  {
    name: "Fornax",
    tier: 3,
    anchor: 13147,
    meaning: "The Furnace",
    lines: [[13147, 15671]],
  },
  {
    name: "Horologium",
    tier: 3,
    anchor: 13502,
    meaning: "The Clock",
    lines: [[13502, 17851]],
  },
  {
    name: "Indus",
    tier: 3,
    anchor: 100751,
    meaning: "The Indian",
    lines: [[100751, 104732]],
  },
  {
    name: "Mensa",
    tier: 3,
    anchor: 20580,
    meaning: "The Table Mountain",
    lines: [[20580, 22783]],
  },
  {
    name: "Microscopium",
    tier: 3,
    anchor: 102485,
    meaning: "The Microscope",
    lines: [[102485, 105199]],
  },
  {
    name: "Musca",
    tier: 3,
    anchor: 60718,
    meaning: "The Fly",
    lines: [[60718, 59747]],
  },
  {
    name: "Norma",
    tier: 3,
    anchor: 78820,
    meaning: "The Level",
    lines: [[78820, 78265]],
  },
  {
    name: "Octans",
    tier: 3,
    anchor: 85822,
    meaning: "The Octant",
    lines: [[85822, 82080]],
  },
  {
    name: "Pictor",
    tier: 3,
    anchor: 30438,
    meaning: "The Easel",
    lines: [[30438, 25930]],
  },
  {
    name: "Pyxis",
    tier: 3,
    anchor: 42913,
    meaning: "The Compass",
    lines: [[42913, 44816]],
  },
  {
    name: "Reticulum",
    tier: 3,
    anchor: 19780,
    meaning: "The Reticle",
    lines: [[19780, 17851]],
  },
  {
    name: "Sculptor",
    tier: 3,
    anchor: 3786,
    meaning: "The Sculptor",
    lines: [[3786, 117245]],
  },
  {
    name: "Telescopium",
    tier: 3,
    anchor: 92855,
    meaning: "The Telescope",
    lines: [[92855, 90496]],
  },
  {
    name: "Volans",
    tier: 3,
    anchor: 40680,
    meaning: "The Flying Fish",
    lines: [[40680, 33061]],
  },
];
