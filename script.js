/**
 * ATLAS ABC — script.js
 * Interactive A–Z Geography Explorer for Kids
 * -----------------------------------------------
 * Architecture:
 *   1. Data        – Full A–Z explorer card entries
 *   2. State       – Current letter, filter, open card
 *   3. Render      – Build DOM from data + state
 *   4. Event wiring – Letter clicks, filter clicks, card clicks, modal close
 */

/* ============================================================
   1. DATA — Full A–Z Geography Database
   ============================================================ */

/**
 * Each entry:
 *   id        {string}   unique slug
 *   title     {string}   display name
 *   emoji     {string}   flag or representative emoji
 *   category  {string}   Country | Landmark | Nature | Capital | City
 *   region    {string}   continent or geographic region
 *   capital   {string?}  capital city (Countries only)
 *   facts     {string[]} 2–3 kid-friendly facts (first shown on card)
 *   related   {string[]} vocabulary words for the modal
 */
const explorerData = {

  /* ── A ──────────────────────────────────────────────── */
  A: [
    // Countries
    {
      id: 'australia', title: 'Australia', emoji: '🇦🇺',
      category: 'Country', region: 'Oceania', capital: 'Canberra',
      facts: [
        'Australia is both a country AND a continent — the only place in the world like that!',
        'Australia is home to amazing animals found nowhere else, like kangaroos, koalas, and wombats.',
        'The Great Barrier Reef off Australia\'s coast is the world\'s largest coral reef system.'
      ],
      related: ['Oceania', 'Canberra', 'Sydney', 'Kangaroo', 'Outback', 'Reef']
    },
    {
      id: 'argentina', title: 'Argentina', emoji: '🇦🇷',
      category: 'Country', region: 'South America', capital: 'Buenos Aires',
      facts: [
        'Argentina is famous for the tango dance and the wild lands of Patagonia in the south.',
        'Argentina is the second-largest country in South America — it\'s enormous!',
        'Argentina is one of the top producers of beef, wheat, and wine in the world.'
      ],
      related: ['Patagonia', 'Buenos Aires', 'Tango', 'Pampas', 'Andes', 'Mate']
    },
    {
      id: 'austria', title: 'Austria', emoji: '🇦🇹',
      category: 'Country', region: 'Europe', capital: 'Vienna',
      facts: [
        'Austria is a small landlocked country in the heart of Europe, surrounded by 8 countries.',
        'Austria is famous for classical music — Mozart, Beethoven, and Schubert all lived here!',
        'The Alps cover most of Austria, making it a popular place for skiing.'
      ],
      related: ['Vienna', 'Alps', 'Mozart', 'Europe', 'Classical Music', 'Schnitzel']
    },
    {
      id: 'algeria', title: 'Algeria', emoji: '🇩🇿',
      category: 'Country', region: 'North Africa', capital: 'Algiers',
      facts: [
        'Algeria is the largest country in Africa and the 10th largest in the entire world!',
        'Most of Algeria is covered by the Sahara Desert — the world\'s largest hot desert.',
        'Algeria has ancient Roman ruins and Berber cave paintings thousands of years old.'
      ],
      related: ['Algiers', 'Sahara', 'Africa', 'Berber', 'Mediterranean', 'Ruins']
    },
    // Capitals
    {
      id: 'athens', title: 'Athens', emoji: '🇬🇷',
      category: 'Capital', region: 'Greece, Europe',
      facts: [
        'Athens is the capital of Greece and one of the world\'s oldest cities — over 3,400 years old!',
        'The Acropolis, with the Parthenon temple, sits on a hill overlooking all of Athens.',
        'Ancient Athens is where democracy was invented more than 2,500 years ago.'
      ],
      related: ['Greece', 'Acropolis', 'Parthenon', 'Democracy', 'Mythology', 'Mediterranean']
    },
    {
      id: 'ankara', title: 'Ankara', emoji: '🇹🇷',
      category: 'Capital', region: 'Turkey, Europe/Asia',
      facts: [
        'Ankara is the capital of Turkey, even though Istanbul is the most famous Turkish city.',
        'It sits right in the middle of the Anatolian Plateau in central Turkey.',
        'Ankara became Turkey\'s capital in 1923 when modern Turkey was founded.'
      ],
      related: ['Turkey', 'Anatolia', 'Istanbul', 'Middle East', 'Europe', 'Asia']
    },
    {
      id: 'abu-dhabi', title: 'Abu Dhabi', emoji: '🇦🇪',
      category: 'Capital', region: 'United Arab Emirates, Middle East',
      facts: [
        'Abu Dhabi is the capital of the United Arab Emirates (UAE), a country in the Middle East.',
        'It is one of the richest cities in the world, largely because of oil.',
        'The Sheikh Zayed Grand Mosque in Abu Dhabi is one of the largest mosques on Earth.'
      ],
      related: ['UAE', 'Dubai', 'Mosque', 'Middle East', 'Oil', 'Desert']
    },
    // Cities
    {
      id: 'amsterdam', title: 'Amsterdam', emoji: '🇳🇱',
      category: 'City', region: 'Netherlands, Europe',
      facts: [
        'Amsterdam is famous for its beautiful canals — there are more than 100 canals in the city!',
        'People in Amsterdam love riding bicycles. There are more bikes than people in the city.',
        'The famous Anne Frank House is a museum in Amsterdam that many visitors come to see.'
      ],
      related: ['Netherlands', 'Canals', 'Bicycle', 'Tulips', 'Anne Frank', 'Europe']
    },
    {
      id: 'auckland', title: 'Auckland', emoji: '🇳🇿',
      category: 'City', region: 'New Zealand, Oceania',
      facts: [
        'Auckland is the largest city in New Zealand and is built on a field of volcanoes!',
        'Auckland has two harbours — one on the Pacific Ocean side and one on the Tasman Sea side.',
        'New Zealand is nicknamed the "Land of the Long White Cloud" by its Māori people.'
      ],
      related: ['New Zealand', 'Maori', 'Oceania', 'Pacific', 'Volcano', 'Harbour']
    },
    // Landmarks
    {
      id: 'angkor-wat', title: 'Angkor Wat', emoji: '🛕',
      category: 'Landmark', region: 'Cambodia, Asia',
      facts: [
        'Angkor Wat is one of the largest religious monuments in the world — it covers 400 acres!',
        'It was built over 900 years ago in the 12th century for a Khmer king.',
        'Angkor Wat appears on Cambodia\'s national flag, making it very special to the country.'
      ],
      related: ['Cambodia', 'Temple', 'Khmer', 'Monument', 'UNESCO', 'Asia']
    },
    {
      id: 'acropolis', title: 'Acropolis', emoji: '🏛️',
      category: 'Landmark', region: 'Athens, Greece',
      facts: [
        'The Acropolis is an ancient citadel sitting high on a rocky hill above Athens, Greece.',
        'The Parthenon temple at the top was built around 447 BC for the goddess Athena.',
        '"Acropolis" means "high city" in Greek — it was built on a hill to protect the city below.'
      ],
      related: ['Athens', 'Greece', 'Parthenon', 'Ancient', 'Temple', 'Mythology']
    },
    // Nature
    {
      id: 'amazon-rainforest', title: 'Amazon Rainforest', emoji: '🌳',
      category: 'Nature', region: 'South America',
      facts: [
        'The Amazon is the world\'s largest tropical rainforest — it covers most of Brazil!',
        'More than 3 million species of plants and animals live in the Amazon.',
        'The Amazon River carries more water than any other river on Earth.'
      ],
      related: ['Brazil', 'Rainforest', 'Amazon River', 'Biodiversity', 'Tropics', 'Jaguar']
    },
    {
      id: 'alps', title: 'Alps', emoji: '🏔️',
      category: 'Nature', region: 'Europe',
      facts: [
        'The Alps are the highest and most extensive mountain range in Europe, stretching across 8 countries.',
        'Mont Blanc in the Alps is the highest peak in Western Europe at 4,808 meters tall.',
        'Millions of people visit the Alps every year for skiing, hiking, and stunning scenery.'
      ],
      related: ['Switzerland', 'Austria', 'France', 'Ski', 'Mont Blanc', 'Mountain']
    },
  ],

  /* ── B ──────────────────────────────────────────────── */
  B: [
    // Countries
    {
      id: 'brazil', title: 'Brazil', emoji: '🇧🇷',
      category: 'Country', region: 'South America', capital: 'Brasília',
      facts: [
        'Brazil is the largest country in South America and the fifth-largest in the whole world!',
        'Brazil is famous for Carnival — one of the biggest festivals on the planet.',
        'The Amazon Rainforest covers much of Brazil\'s northern area.'
      ],
      related: ['Brasília', 'Carnival', 'Amazon', 'Rio de Janeiro', 'Samba', 'Soccer']
    },
    {
      id: 'belgium', title: 'Belgium', emoji: '🇧🇪',
      category: 'Country', region: 'Europe', capital: 'Brussels',
      facts: [
        'Belgium is famous all over the world for its yummy waffles and chocolate.',
        'Belgium is a very small country in Western Europe, about the size of Maryland!',
        'Brussels, Belgium\'s capital, is the headquarters of the European Union.'
      ],
      related: ['Brussels', 'Waffle', 'Chocolate', 'Europe', 'Dutch', 'French']
    },
    {
      id: 'bolivia', title: 'Bolivia', emoji: '🇧🇴',
      category: 'Country', region: 'South America', capital: 'Sucre',
      facts: [
        'Bolivia has two capital cities — Sucre (official) and La Paz (government seat).',
        'Bolivia is home to the Salar de Uyuni — the world\'s largest salt flat!',
        'Bolivia sits high in the Andes Mountains and is one of two landlocked countries in South America.'
      ],
      related: ['Andes', 'Salt Flat', 'Sucre', 'La Paz', 'Llama', 'Landlocked']
    },
    // Capitals
    {
      id: 'beijing', title: 'Beijing', emoji: '🇨🇳',
      category: 'Capital', region: 'China, Asia',
      facts: [
        'Beijing is the capital of China and one of the most visited cities in the world.',
        'The Forbidden City in Beijing was home to Chinese emperors for nearly 500 years!',
        'Beijing hosted the Olympic Games in 2008 and again in 2022 for the Winter Olympics.'
      ],
      related: ['China', 'Forbidden City', 'Olympics', 'Asia', 'Great Wall', 'Emperor']
    },
    {
      id: 'baghdad', title: 'Baghdad', emoji: '🇮🇶',
      category: 'Capital', region: 'Iraq, Middle East',
      facts: [
        'Baghdad is the capital of Iraq and one of the oldest cities in the world.',
        'Over 1,000 years ago, Baghdad was one of the largest and most important cities on Earth.',
        'The Tigris River runs right through the center of Baghdad.'
      ],
      related: ['Iraq', 'Tigris', 'Middle East', 'Ancient', 'Mesopotamia', 'Arabia']
    },
    {
      id: 'brussels', title: 'Brussels', emoji: '🇧🇪',
      category: 'Capital', region: 'Belgium, Europe',
      facts: [
        'Brussels is the capital of Belgium and is known as the "Capital of Europe."',
        'The Atomium is a famous landmark in Brussels — it looks like a giant iron atom!',
        'Brussels is famous for its Belgian waffles, chocolate, and comic book murals.'
      ],
      related: ['Belgium', 'EU', 'Atomium', 'Chocolate', 'Waffle', 'Europe']
    },
    // Cities
    {
      id: 'bangkok', title: 'Bangkok', emoji: '🇹🇭',
      category: 'City', region: 'Thailand, Asia',
      facts: [
        'Bangkok is the capital and largest city of Thailand, home to over 10 million people.',
        'Bangkok has over 400 Buddhist temples, called "wats," scattered across the city.',
        'Bangkok\'s official Thai name is one of the longest place names in the world!'
      ],
      related: ['Thailand', 'Temple', 'Wat', 'Buddhism', 'Tuk-tuk', 'Southeast Asia']
    },
    {
      id: 'barcelona', title: 'Barcelona', emoji: '🇪🇸',
      category: 'City', region: 'Spain, Europe',
      facts: [
        'Barcelona is famous for the incredible architecture of Antoni Gaudí, especially the Sagrada Família church.',
        'Barcelona is located on the Mediterranean coast in the Catalonia region of Spain.',
        'The city hosted the 1992 Summer Olympic Games.'
      ],
      related: ['Spain', 'Gaudí', 'Sagrada Família', 'Catalonia', 'Mediterranean', 'Olympics']
    },
    {
      id: 'boston', title: 'Boston', emoji: '🇺🇸',
      category: 'City', region: 'Massachusetts, USA',
      facts: [
        'Boston is one of the oldest cities in the United States, founded in 1630.',
        'The famous Boston Marathon is the world\'s oldest annual marathon race.',
        'Boston is home to Harvard University, one of the most famous universities in the world.'
      ],
      related: ['Massachusetts', 'Harvard', 'Marathon', 'USA', 'History', 'New England']
    },
    // Landmarks
    {
      id: 'big-ben', title: 'Big Ben', emoji: '🕰️',
      category: 'Landmark', region: 'London, United Kingdom',
      facts: [
        'Big Ben is the nickname for the giant bell inside the Elizabeth Tower in London.',
        'The tower is part of the Houses of Parliament and was built in 1859.',
        'Big Ben\'s famous "bong" rings on the hour and can be heard all across London!'
      ],
      related: ['London', 'United Kingdom', 'Tower', 'Clock', 'Parliament', 'Bell']
    },
    {
      id: 'burj-khalifa', title: 'Burj Khalifa', emoji: '🏙️',
      category: 'Landmark', region: 'Dubai, UAE',
      facts: [
        'The Burj Khalifa in Dubai is the tallest building in the world at 828 meters (2,717 feet)!',
        'It has 163 floors, and the observation deck near the top gives amazing views of the desert.',
        'The Burj Khalifa took over 22 million man-hours to build and was completed in 2010.'
      ],
      related: ['Dubai', 'UAE', 'Skyscraper', 'Middle East', 'Architecture', 'Desert']
    },
    // Nature
    {
      id: 'black-forest', title: 'Black Forest', emoji: '🌲',
      category: 'Nature', region: 'Germany, Europe',
      facts: [
        'The Black Forest is a large forested mountain range in southwestern Germany.',
        'It is famous for its dense, dark pine and fir trees — that\'s how it got its name!',
        'The Black Forest is also the home of the original Grimm fairy tales like Hansel and Gretel.'
      ],
      related: ['Germany', 'Forest', 'Fairy Tale', 'Rhine', 'Europe', 'Cuckoo Clock']
    },
    {
      id: 'blue-lagoon', title: 'Blue Lagoon', emoji: '🌊',
      category: 'Nature', region: 'Iceland, Europe',
      facts: [
        'The Blue Lagoon is a stunning geothermal pool in Iceland with bright milky-blue water.',
        'The water is heated by volcanic activity underground and stays about 37–39°C all year.',
        'The mineral-rich water is said to be great for skin because of the silica and algae in it.'
      ],
      related: ['Iceland', 'Geothermal', 'Volcano', 'Hot Spring', 'Scandinavia', 'Minerals']
    },
  ],

  /* ── C ──────────────────────────────────────────────── */
  C: [
    // Countries
    {
      id: 'canada', title: 'Canada', emoji: '🇨🇦',
      category: 'Country', region: 'North America', capital: 'Ottawa',
      facts: [
        'Canada has the most lakes of any country in the world — over 2 million!',
        'Canada is the second-largest country in the world by total area.',
        'The maple leaf on Canada\'s flag represents the many maple trees across the country.'
      ],
      related: ['Ottawa', 'Toronto', 'Maple Leaf', 'Rockies', 'Niagara Falls', 'Hockey']
    },
    {
      id: 'china', title: 'China', emoji: '🇨🇳',
      category: 'Country', region: 'Asia', capital: 'Beijing',
      facts: [
        'China has the Great Wall, stretching over 13,000 miles — one of the world\'s most famous landmarks.',
        'China is the most populated country in the world, with over 1.4 billion people.',
        'China invented paper, printing, gunpowder, and the compass thousands of years ago!'
      ],
      related: ['Beijing', 'Great Wall', 'Panda', 'Silk Road', 'Asia', 'Dragon']
    },
    {
      id: 'chile', title: 'Chile', emoji: '🇨🇱',
      category: 'Country', region: 'South America', capital: 'Santiago',
      facts: [
        'Chile is the longest and narrowest country in the world — it stretches 4,300 km north to south!',
        'Chile has the Atacama Desert, the driest non-polar desert on Earth.',
        'Easter Island, famous for its giant stone statues called moai, belongs to Chile.'
      ],
      related: ['Santiago', 'Atacama', 'Patagonia', 'Andes', 'Easter Island', 'Moai']
    },
    {
      id: 'colombia', title: 'Colombia', emoji: '🇨🇴',
      category: 'Country', region: 'South America', capital: 'Bogotá',
      facts: [
        'Colombia is the only country in South America with coastlines on both the Pacific Ocean and the Caribbean Sea.',
        'Colombia is the world\'s top producer of emeralds and one of the largest producers of coffee.',
        'Colombia is home to the famous Carnival of Barranquilla, a giant street party!'
      ],
      related: ['Bogotá', 'Coffee', 'Emerald', 'Caribbean', 'Pacific', 'Andes']
    },
    // Capitals
    {
      id: 'cairo', title: 'Cairo', emoji: '🇪🇬',
      category: 'Capital', region: 'Egypt, Africa',
      facts: [
        'Cairo is the capital of Egypt and the largest city in Africa!',
        'The famous pyramids of Giza and the Great Sphinx are just outside Cairo.',
        'The Nile River, the world\'s longest river, runs right through Cairo.'
      ],
      related: ['Egypt', 'Pyramids', 'Sphinx', 'Nile River', 'Africa', 'Pharaoh']
    },
    {
      id: 'canberra', title: 'Canberra', emoji: '🇦🇺',
      category: 'Capital', region: 'Australia, Oceania',
      facts: [
        'Canberra is the capital of Australia — but many people think Sydney is the capital (it isn\'t!).',
        'Canberra was purpose-built as the capital city. It was planned and designed from scratch.',
        'The city sits between Sydney and Melbourne and was chosen as a compromise between the two cities.'
      ],
      related: ['Australia', 'Sydney', 'Melbourne', 'Parliament', 'Oceania', 'Planned City']
    },
    {
      id: 'copenhagen', title: 'Copenhagen', emoji: '🇩🇰',
      category: 'Capital', region: 'Denmark, Europe',
      facts: [
        'Copenhagen is the capital of Denmark and one of the happiest cities in the world!',
        'The Little Mermaid statue in Copenhagen harbour is based on a fairy tale by Hans Christian Andersen.',
        'Copenhagen is famous for its colourful waterfront district called Nyhavn.'
      ],
      related: ['Denmark', 'Nyhavn', 'Little Mermaid', 'Scandinavia', 'Viking', 'Bicycle']
    },
    // Cities
    {
      id: 'chicago', title: 'Chicago', emoji: '🇺🇸',
      category: 'City', region: 'Illinois, USA',
      facts: [
        'Chicago is nicknamed the "Windy City" because of the strong winds that blow off Lake Michigan.',
        'Chicago was one of the first cities in the world to have a skyscraper, built in 1885.',
        'Chicago is famous for deep-dish pizza — a thick, cheesy style that is different from other pizzas!'
      ],
      related: ['Illinois', 'Lake Michigan', 'Skyscraper', 'USA', 'Deep-Dish Pizza', 'Jazz']
    },
    {
      id: 'cape-town', title: 'Cape Town', emoji: '🇿🇦',
      category: 'City', region: 'South Africa, Africa',
      facts: [
        'Cape Town sits at the southern tip of Africa, near where the Atlantic and Indian oceans meet.',
        'Table Mountain, a famous flat-topped mountain, overlooks the entire city.',
        'Robben Island, where Nelson Mandela was imprisoned, is visible from Cape Town\'s coast.'
      ],
      related: ['South Africa', 'Table Mountain', 'Nelson Mandela', 'Africa', 'Atlantic', 'Indian Ocean']
    },
    // Landmarks
    {
      id: 'colosseum', title: 'Colosseum', emoji: '🏛️',
      category: 'Landmark', region: 'Rome, Italy',
      facts: [
        'The Colosseum is an ancient oval amphitheater in Rome, Italy, built almost 2,000 years ago.',
        'It could hold up to 80,000 spectators who came to watch gladiator battles.',
        'The Colosseum is now one of the most visited tourist sites in the world.'
      ],
      related: ['Rome', 'Italy', 'Gladiator', 'Ancient Rome', 'Amphitheater', 'Europe']
    },
    {
      id: 'christ-redeemer', title: 'Christ the Redeemer', emoji: '🗿',
      category: 'Landmark', region: 'Rio de Janeiro, Brazil',
      facts: [
        'Christ the Redeemer is a giant statue of Jesus standing on top of Corcovado mountain in Rio de Janeiro.',
        'The statue is 30 meters tall and its arms stretch 28 meters wide, overlooking the whole city.',
        'It was voted one of the New Seven Wonders of the World in 2007.'
      ],
      related: ['Rio de Janeiro', 'Brazil', 'Statue', 'Corcovado', 'Seven Wonders', 'Christianity']
    },
    // Nature
    {
      id: 'coral-reef', title: 'Coral Reef', emoji: '🪸',
      category: 'Nature', region: 'Tropical Oceans Worldwide',
      facts: [
        'Coral reefs are called the "rainforests of the sea" because so many sea creatures live there.',
        'The Great Barrier Reef in Australia is the largest coral reef system in the world.',
        'Corals are tiny living animals that build their hard skeletons over hundreds of years.'
      ],
      related: ['Ocean', 'Great Barrier Reef', 'Fish', 'Ecosystem', 'Australia', 'Tropical']
    },
    {
      id: 'congo-rainforest', title: 'Congo Rainforest', emoji: '🌳',
      category: 'Nature', region: 'Central Africa',
      facts: [
        'The Congo Rainforest is the second-largest tropical rainforest in the world, after the Amazon.',
        'It stretches across the Democratic Republic of Congo and several other African countries.',
        'Gorillas, chimpanzees, forest elephants, and okapis all live in the Congo Rainforest.'
      ],
      related: ['Congo', 'Africa', 'Gorilla', 'Chimpanzee', 'Rainforest', 'Biodiversity']
    },
  ],

  /* ── D ──────────────────────────────────────────────── */
  D: [
    // Countries
    {
      id: 'denmark', title: 'Denmark', emoji: '🇩🇰',
      category: 'Country', region: 'Europe', capital: 'Copenhagen',
      facts: [
        'Denmark is made up of the Jutland peninsula and over 400 islands!',
        'Denmark is where the fairy tales of Hans Christian Andersen were written, like The Little Mermaid.',
        'Denmark is regularly rated one of the happiest countries in the world.'
      ],
      related: ['Copenhagen', 'Scandinavia', 'Viking', 'Fairy Tale', 'Lego', 'North Sea']
    },
    {
      id: 'dominican-republic', title: 'Dominican Republic', emoji: '🇩🇴',
      category: 'Country', region: 'Caribbean', capital: 'Santo Domingo',
      facts: [
        'The Dominican Republic shares the island of Hispaniola with the country of Haiti.',
        'It has some of the most beautiful beaches in the Caribbean!',
        'Santo Domingo, its capital, is the oldest continuously inhabited European settlement in the Americas.'
      ],
      related: ['Santo Domingo', 'Haiti', 'Caribbean', 'Hispaniola', 'Tropical', 'Island']
    },
    // Capitals
    {
      id: 'dublin', title: 'Dublin', emoji: '🇮🇪',
      category: 'Capital', region: 'Ireland, Europe',
      facts: [
        'Dublin is the capital of Ireland and one of Europe\'s most vibrant cities.',
        'The city sits on the River Liffey and is divided into a north and south side.',
        'Ireland is nicknamed the "Emerald Isle" because of its lush green countryside.'
      ],
      related: ['Ireland', 'River Liffey', 'Celtic', 'Europe', 'Shamrock', 'Gaelic']
    },
    {
      id: 'damascus', title: 'Damascus', emoji: '🇸🇾',
      category: 'Capital', region: 'Syria, Middle East',
      facts: [
        'Damascus is the capital of Syria and is considered one of the oldest continuously inhabited cities in the world.',
        'It has been a major city for over 11,000 years!',
        'The ancient Umayyad Mosque in Damascus is one of the largest and oldest mosques in the world.'
      ],
      related: ['Syria', 'Ancient City', 'Middle East', 'Umayyad Mosque', 'Arabia', 'History']
    },
    // Cities
    {
      id: 'dubai', title: 'Dubai', emoji: '🇦🇪',
      category: 'City', region: 'United Arab Emirates, Middle East',
      facts: [
        'Dubai is home to the Burj Khalifa — the tallest building in the world at over 828 meters!',
        'Dubai sits in the desert but has built incredible skyscrapers, shopping malls, and even indoor skiing.',
        'Dubai is one of the fastest-growing cities in the world.'
      ],
      related: ['UAE', 'Burj Khalifa', 'Middle East', 'Desert', 'Skyscraper', 'Abu Dhabi']
    },
    {
      id: 'dallas', title: 'Dallas', emoji: '🇺🇸',
      category: 'City', region: 'Texas, USA',
      facts: [
        'Dallas is one of the largest cities in Texas and the whole United States.',
        'Dallas is famous for its cowboys, rodeos, and American football team the Dallas Cowboys.',
        'The city has a huge arts district and is a major hub for business and technology.'
      ],
      related: ['Texas', 'USA', 'Cowboys', 'Rodeo', 'Football', 'Lone Star']
    },
    // Landmarks
    {
      id: 'disneyland-castle', title: 'Disneyland Castle', emoji: '🏰',
      category: 'Landmark', region: 'California, USA',
      facts: [
        'Sleeping Beauty Castle at Disneyland is one of the most photographed castles in the world.',
        'Disneyland opened in 1955 and was the first Disney theme park ever built.',
        'The castle was inspired by Neuschwanstein Castle in Germany and fairy tale illustrations.'
      ],
      related: ['Disneyland', 'California', 'Disney', 'Theme Park', 'Fairy Tale', 'USA']
    },
    // Nature
    {
      id: 'dead-sea', title: 'Dead Sea', emoji: '🌊',
      category: 'Nature', region: 'Middle East',
      facts: [
        'The Dead Sea is so salty that people float on top of the water without even trying to swim!',
        'It is the lowest point on Earth\'s surface — about 430 meters below sea level.',
        'The Dead Sea is 10 times saltier than the ocean, so almost nothing can live in it.'
      ],
      related: ['Jordan', 'Israel', 'Salt Lake', 'Middle East', 'Sea Level', 'Minerals']
    },
    {
      id: 'danube-river', title: 'Danube River', emoji: '🚣',
      category: 'Nature', region: 'Europe',
      facts: [
        'The Danube is the second-longest river in Europe, flowing through 10 countries.',
        'It starts in Germany\'s Black Forest and travels all the way to the Black Sea.',
        'Vienna, Budapest, and Belgrade are all major cities built along the Danube River.'
      ],
      related: ['Europe', 'River', 'Vienna', 'Budapest', 'Black Sea', 'Germany']
    },
  ],

  /* ── E ──────────────────────────────────────────────── */
  E: [
    {
      id: 'egypt', title: 'Egypt', emoji: '🇪🇬',
      category: 'Country', region: 'North Africa', capital: 'Cairo',
      facts: [
        'Egypt is home to one of the greatest ancient civilizations in history, the Ancient Egyptians.',
        'The Pyramids of Giza in Egypt are one of the Seven Wonders of the Ancient World.',
        'The Nile River, which flows through Egypt, is the longest river in the world.'
      ],
      related: ['Cairo', 'Pyramids', 'Pharaoh', 'Nile', 'Mummy', 'Africa']
    },
    {
      id: 'ecuador', title: 'Ecuador', emoji: '🇪🇨',
      category: 'Country', region: 'South America', capital: 'Quito',
      facts: [
        'Ecuador sits right on the equator — that\'s where it gets its name! "Ecuador" means equator.',
        'The Galapagos Islands belong to Ecuador and are home to amazing animals found nowhere else.',
        'Darwin visited the Galapagos Islands and his discoveries there helped him develop the theory of evolution.'
      ],
      related: ['Quito', 'Equator', 'Galapagos', 'Darwin', 'Pacific', 'Andes']
    },
    {
      id: 'estonia', title: 'Estonia', emoji: '🇪🇪',
      category: 'Country', region: 'Europe', capital: 'Tallinn',
      facts: [
        'Estonia is a small country in Northern Europe on the Baltic Sea.',
        'Estonia is one of the most digital countries in the world — you can even vote online there!',
        'Estonia has over 2,000 islands along its coastline.'
      ],
      related: ['Tallinn', 'Baltic', 'Scandinavia', 'Digital', 'Europe', 'Islands']
    },
    {
      id: 'edinburgh', title: 'Edinburgh', emoji: '🏴',
      category: 'Capital', region: 'Scotland, United Kingdom',
      facts: [
        'Edinburgh is the capital of Scotland and one of the most beautiful cities in Europe.',
        'Edinburgh Castle sits on top of a volcanic rock right in the middle of the city.',
        'The Edinburgh Festival is one of the world\'s largest arts festivals, held every August.'
      ],
      related: ['Scotland', 'UK', 'Castle', 'Festival', 'Highlands', 'Bagpipes']
    },
    {
      id: 'yerevan', title: 'Yerevan', emoji: '🇦🇲',
      category: 'Capital', region: 'Armenia, Asia',
      facts: [
        'Yerevan is the capital of Armenia and one of the world\'s oldest continuously inhabited cities.',
        'Mount Ararat, a famous snow-capped volcano, is visible from Yerevan on clear days.',
        'Yerevan is nicknamed the "Pink City" because many buildings are made of rosy-pink stone.'
      ],
      related: ['Armenia', 'Mount Ararat', 'Caucasus', 'Asia', 'Ancient', 'Pink City']
    },
    {
      id: 'eiffel-tower', title: 'Eiffel Tower', emoji: '🗼',
      category: 'Landmark', region: 'Paris, France',
      facts: [
        'The Eiffel Tower is the most visited monument in the world, in Paris, France.',
        'It was built in 1889 and stands 330 meters tall — it was the world\'s tallest structure for 41 years!',
        'The tower is repainted every 7 years using 60 tonnes of special brown paint.'
      ],
      related: ['Paris', 'France', 'Iron', 'Architecture', 'Europe', 'Tourism']
    },
    {
      id: 'everest', title: 'Mount Everest', emoji: '🏔️',
      category: 'Nature', region: 'Nepal/Tibet, Asia',
      facts: [
        'Mount Everest is the highest mountain in the world at 8,849 meters above sea level!',
        'It sits on the border between Nepal and Tibet and is part of the Himalayan mountain range.',
        'The first people to reach the summit were Sir Edmund Hillary and Tenzing Norgay in 1953.'
      ],
      related: ['Nepal', 'Himalayas', 'Climbing', 'Asia', 'Tibet', 'Summit']
    },
  ],

  /* ── F ──────────────────────────────────────────────── */
  F: [
    {
      id: 'france', title: 'France', emoji: '🇫🇷',
      category: 'Country', region: 'Europe', capital: 'Paris',
      facts: [
        'France is the most visited country in the world — over 90 million tourists come each year!',
        'France is famous for its food, fashion, art, and of course, the Eiffel Tower in Paris.',
        'France is the largest country in the European Union by area.'
      ],
      related: ['Paris', 'Eiffel Tower', 'Baguette', 'Europe', 'Art', 'Fashion']
    },
    {
      id: 'finland', title: 'Finland', emoji: '🇫🇮',
      category: 'Country', region: 'Europe', capital: 'Helsinki',
      facts: [
        'Finland is known as "The Land of a Thousand Lakes" — it actually has over 180,000 lakes!',
        'Finland is where Santa Claus officially lives, in a place called Lapland.',
        'Finland has the Northern Lights (Aurora Borealis), which paint the night sky with green and pink.'
      ],
      related: ['Helsinki', 'Lapland', 'Northern Lights', 'Sauna', 'Santa Claus', 'Scandinavia']
    },
    {
      id: 'funafuti', title: 'Funafuti', emoji: '🇹🇻',
      category: 'Capital', region: 'Tuvalu, Pacific Ocean',
      facts: [
        'Funafuti is the capital of Tuvalu, one of the smallest and least-visited countries in the world.',
        'Tuvalu is a tiny island nation in the Pacific Ocean that may disappear as sea levels rise.',
        'Funafuti is only about 2.8 km² — smaller than most towns!'
      ],
      related: ['Tuvalu', 'Pacific', 'Atoll', 'Island', 'Climate Change', 'Oceania']
    },
    {
      id: 'florence', title: 'Florence', emoji: '🇮🇹',
      category: 'City', region: 'Italy, Europe',
      facts: [
        'Florence is the birthplace of the Renaissance — the great explosion of art and science in Europe.',
        'The Uffizi Gallery in Florence contains some of the most famous paintings in the world.',
        'Michelangelo\'s famous statue of David stands in Florence, Italy.'
      ],
      related: ['Italy', 'Renaissance', 'Michelangelo', 'Art', 'Duomo', 'Arno River']
    },
    {
      id: 'frankfurt', title: 'Frankfurt', emoji: '🇩🇪',
      category: 'City', region: 'Germany, Europe',
      facts: [
        'Frankfurt is Germany\'s financial capital and has one of the biggest airports in Europe.',
        'It sits on the River Main and has a beautiful old town called the Römerberg.',
        'The famous writer Johann Wolfgang von Goethe was born in Frankfurt.'
      ],
      related: ['Germany', 'Rhine', 'Finance', 'Airport', 'Europe', 'Goethe']
    },
    {
      id: 'forbidden-city', title: 'Forbidden City', emoji: '🏯',
      category: 'Landmark', region: 'Beijing, China',
      facts: [
        'The Forbidden City is a huge palace complex in the heart of Beijing, China.',
        'It was home to 24 Chinese emperors over nearly 500 years and ordinary people were not allowed inside.',
        'The Forbidden City has 980 buildings and is the world\'s largest collection of preserved ancient wooden structures.'
      ],
      related: ['Beijing', 'China', 'Emperor', 'Palace', 'Dynasty', 'UNESCO']
    },
    {
      id: 'fiji-beaches', title: 'Fiji Beaches', emoji: '🏖️',
      category: 'Nature', region: 'Fiji, Pacific Ocean',
      facts: [
        'Fiji is an island nation in the South Pacific Ocean made up of over 300 islands.',
        'Fiji\'s beaches have crystal-clear turquoise water and white sandy shores.',
        'Fiji is home to coral reefs, sea turtles, and some of the most colourful tropical fish in the world.'
      ],
      related: ['Pacific', 'Coral', 'Tropical', 'Island', 'Oceania', 'Snorkeling']
    },
  ],

  /* ── G ──────────────────────────────────────────────── */
  G: [
    {
      id: 'germany', title: 'Germany', emoji: '🇩🇪',
      category: 'Country', region: 'Europe', capital: 'Berlin',
      facts: [
        'Germany is the most populous country in the European Union, with over 84 million people.',
        'Germany is famous for its fairy tale castles, especially Neuschwanstein Castle.',
        'Oktoberfest, the world\'s largest folk festival, is held in Munich, Germany every year.'
      ],
      related: ['Berlin', 'Munich', 'Oktoberfest', 'Fairy Tale', 'Europe', 'Rhine']
    },
    {
      id: 'greece', title: 'Greece', emoji: '🇬🇷',
      category: 'Country', region: 'Europe', capital: 'Athens',
      facts: [
        'Greece is the birthplace of democracy, the Olympic Games, and Western philosophy!',
        'Greece has thousands of islands — over 6,000 in total, though only about 200 are inhabited.',
        'The ancient ruins in Greece are among the most important historical sites in the world.'
      ],
      related: ['Athens', 'Acropolis', 'Olympics', 'Philosophy', 'Mediterranean', 'Islands']
    },
    {
      id: 'ghana', title: 'Ghana', emoji: '🇬🇭',
      category: 'Country', region: 'West Africa', capital: 'Accra',
      facts: [
        'Ghana was the first country in sub-Saharan Africa to gain independence from colonial rule, in 1957.',
        'Ghana is one of the world\'s largest producers of cocoa beans, which are used to make chocolate.',
        'The name "Ghana" means "Warrior King" in the Soninke language.'
      ],
      related: ['Accra', 'Cocoa', 'West Africa', 'Independence', 'Kente Cloth', 'Gold']
    },
    {
      id: 'guatemala-city', title: 'Guatemala City', emoji: '🇬🇹',
      category: 'Capital', region: 'Guatemala, Central America',
      facts: [
        'Guatemala City is the capital and largest city in Guatemala and in all of Central America.',
        'It sits at over 1,500 meters above sea level, surrounded by volcanoes.',
        'Guatemala is home to ancient Mayan ruins, including the famous Tikal pyramid complex.'
      ],
      related: ['Guatemala', 'Maya', 'Tikal', 'Central America', 'Volcano', 'Ancient Ruins']
    },
    {
      id: 'guangzhou', title: 'Guangzhou', emoji: '🇨🇳',
      category: 'City', region: 'China, Asia',
      facts: [
        'Guangzhou is one of China\'s largest cities and a major centre for trade and manufacturing.',
        'It is located in southern China near Hong Kong and has a warm, subtropical climate.',
        'Guangzhou is famous for Cantonese cuisine — dim sum originated there!'
      ],
      related: ['China', 'Pearl River', 'Canton', 'Dim Sum', 'Asia', 'Trade']
    },
    {
      id: 'geneva', title: 'Geneva', emoji: '🇨🇭',
      category: 'City', region: 'Switzerland, Europe',
      facts: [
        'Geneva sits on the shores of beautiful Lake Geneva and is one of the most international cities in the world.',
        'The United Nations and the Red Cross both have their headquarters in Geneva.',
        'Geneva is known for making some of the world\'s finest watches and chocolates.'
      ],
      related: ['Switzerland', 'Lake Geneva', 'United Nations', 'Red Cross', 'Alps', 'Watches']
    },
    {
      id: 'great-wall', title: 'Great Wall of China', emoji: '🧱',
      category: 'Landmark', region: 'China, Asia',
      facts: [
        'The Great Wall of China stretches over 21,000 km — it would take over a year to walk the whole thing!',
        'It was built over many centuries by different Chinese emperors to protect against invasions.',
        'The Great Wall is one of the greatest building projects in human history.'
      ],
      related: ['China', 'Beijing', 'Emperor', 'History', 'UNESCO', 'Asia']
    },
    {
      id: 'gobi-desert', title: 'Gobi Desert', emoji: '🏜️',
      category: 'Nature', region: 'China/Mongolia, Asia',
      facts: [
        'The Gobi Desert is the largest desert in Asia and the fifth-largest in the world.',
        'It stretches across northern China and southern Mongolia.',
        'Despite being a desert, the Gobi gets very cold in winter — sometimes down to -40°C!'
      ],
      related: ['Mongolia', 'China', 'Desert', 'Asia', 'Bactrian Camel', 'Dinosaur Fossils']
    },
  ],

  /* ── H ──────────────────────────────────────────────── */
  H: [
    {
      id: 'hungary', title: 'Hungary', emoji: '🇭🇺',
      category: 'Country', region: 'Europe', capital: 'Budapest',
      facts: [
        'Hungary is a landlocked country in Central Europe with a rich history and culture.',
        'Budapest, the capital, is split between two cities — Buda and Pest — separated by the Danube River.',
        'Hungary is famous for its thermal baths, goulash stew, and paprika.'
      ],
      related: ['Budapest', 'Danube', 'Thermal Bath', 'Goulash', 'Paprika', 'Europe']
    },
    {
      id: 'haiti', title: 'Haiti', emoji: '🇭🇹',
      category: 'Country', region: 'Caribbean', capital: 'Port-au-Prince',
      facts: [
        'Haiti shares the island of Hispaniola with the Dominican Republic in the Caribbean Sea.',
        'Haiti became the first Black republic in the world when it gained independence in 1804.',
        'Haiti is known for its vibrant art, music (like Kompa), and colourful festivals.'
      ],
      related: ['Port-au-Prince', 'Caribbean', 'Hispaniola', 'Independence', 'Kompa', 'Creole']
    },
    {
      id: 'hanoi', title: 'Hanoi', emoji: '🇻🇳',
      category: 'Capital', region: 'Vietnam, Asia',
      facts: [
        'Hanoi is the capital of Vietnam and one of Southeast Asia\'s most historic cities.',
        'The city has a beautiful lake called Hoan Kiem Lake right in the middle of the old town.',
        'Hanoi is famous for its delicious street food, especially pho noodle soup.'
      ],
      related: ['Vietnam', 'Pho', 'Southeast Asia', 'Hoan Kiem', 'Old Quarter', 'Noodles']
    },
    {
      id: 'havana', title: 'Havana', emoji: '🇨🇺',
      category: 'Capital', region: 'Cuba, Caribbean',
      facts: [
        'Havana is the capital and largest city of Cuba, an island in the Caribbean Sea.',
        'Havana is famous for its colourful colonial buildings, classic American cars, and salsa music.',
        'Old Havana is a UNESCO World Heritage Site because of its beautiful historic architecture.'
      ],
      related: ['Cuba', 'Caribbean', 'Salsa', 'Classic Cars', 'UNESCO', 'Spanish Colonial']
    },
    {
      id: 'hong-kong', title: 'Hong Kong', emoji: '🇭🇰',
      category: 'City', region: 'China, Asia',
      facts: [
        'Hong Kong is a special city on the southern coast of China, known for its amazing skyline.',
        'It is one of the most densely populated places in the world with millions of people in a small area.',
        'Hong Kong\'s harbour is one of the busiest ports in the world for trade and shipping.'
      ],
      related: ['China', 'Victoria Harbour', 'Skyscraper', 'Trade', 'Asia', 'Cantonese']
    },
    {
      id: 'houston', title: 'Houston', emoji: '🇺🇸',
      category: 'City', region: 'Texas, USA',
      facts: [
        'Houston is the largest city in Texas and the fourth-largest in the entire United States.',
        'NASA\'s Johnson Space Center is in Houston — that\'s why astronauts say "Houston, we have a problem"!',
        'Houston is home to more than 145 languages spoken by its residents — it\'s one of the most diverse cities in the USA.'
      ],
      related: ['Texas', 'NASA', 'Space Center', 'USA', 'Diverse', 'Gulf of Mexico']
    },
    {
      id: 'hagia-sophia', title: 'Hagia Sophia', emoji: '🕌',
      category: 'Landmark', region: 'Istanbul, Turkey',
      facts: [
        'The Hagia Sophia in Istanbul, Turkey is one of the greatest buildings ever constructed.',
        'It was built nearly 1,500 years ago as a Christian cathedral and later became a mosque.',
        'Its massive dome was an architectural wonder — engineers still study it today.'
      ],
      related: ['Istanbul', 'Turkey', 'Mosque', 'Byzantine', 'Dome', 'UNESCO']
    },
    {
      id: 'himalayas', title: 'Himalayas', emoji: '🏔️',
      category: 'Nature', region: 'South/Central Asia',
      facts: [
        'The Himalayas are the tallest mountain range on Earth, containing all 14 peaks above 8,000 meters.',
        'They stretch across five countries: India, Nepal, Bhutan, China, and Pakistan.',
        'The Himalayas were formed when two huge pieces of Earth\'s crust slowly crashed together.'
      ],
      related: ['Nepal', 'Everest', 'Tibet', 'India', 'Glacier', 'Mountain']
    },
  ],

  /* ── I ──────────────────────────────────────────────── */
  I: [
    {
      id: 'india', title: 'India', emoji: '🇮🇳',
      category: 'Country', region: 'Asia', capital: 'New Delhi',
      facts: [
        'India is the second most populated country in the world, with over 1.4 billion people.',
        'India is the birthplace of four major world religions: Hinduism, Buddhism, Jainism, and Sikhism.',
        'India has more languages than almost any other country — over 700 languages are spoken there!'
      ],
      related: ['New Delhi', 'Taj Mahal', 'Ganges', 'Bollywood', 'Cricket', 'Spices']
    },
    {
      id: 'indonesia', title: 'Indonesia', emoji: '🇮🇩',
      category: 'Country', region: 'Southeast Asia', capital: 'Jakarta',
      facts: [
        'Indonesia is the world\'s largest archipelago — it is made up of over 17,000 islands!',
        'Indonesia has more volcanoes than any other country and is part of the "Ring of Fire."',
        'Bali, one of Indonesia\'s most famous islands, is known worldwide for its culture and beaches.'
      ],
      related: ['Jakarta', 'Bali', 'Archipelago', 'Volcano', 'Java', 'Ring of Fire']
    },
    {
      id: 'italy', title: 'Italy', emoji: '🇮🇹',
      category: 'Country', region: 'Europe', capital: 'Rome',
      facts: [
        'Italy is shaped like a boot — you can see it clearly on a map!',
        'Italy gave the world pizza, pasta, gelato, and espresso — some of the world\'s favourite foods.',
        'Italy has more UNESCO World Heritage Sites than any other country.'
      ],
      related: ['Rome', 'Colosseum', 'Pizza', 'Vatican', 'Venice', 'Renaissance']
    },
    {
      id: 'islamabad', title: 'Islamabad', emoji: '🇵🇰',
      category: 'Capital', region: 'Pakistan, Asia',
      facts: [
        'Islamabad is the capital of Pakistan and was specially built to be a new modern capital city.',
        'It sits at the foot of the Margalla Hills and is one of the greenest capitals in Asia.',
        'The Faisal Mosque in Islamabad is one of the largest mosques in the world.'
      ],
      related: ['Pakistan', 'Faisal Mosque', 'South Asia', 'Margalla Hills', 'Modern City', 'Asia']
    },
    {
      id: 'istanbul', title: 'Istanbul', emoji: '🇹🇷',
      category: 'City', region: 'Turkey, Europe/Asia',
      facts: [
        'Istanbul is the only major city in the world that sits on two continents — Europe and Asia!',
        'The Bosphorus Strait, which runs through Istanbul, separates Europe from Asia.',
        'Istanbul has been known by three different names: Byzantium, Constantinople, and then Istanbul.'
      ],
      related: ['Turkey', 'Bosphorus', 'Hagia Sophia', 'Two Continents', 'Ottoman', 'Europe']
    },
    {
      id: 'iguazu-falls', title: 'Iguazu Falls', emoji: '🌊',
      category: 'Landmark', region: 'Argentina/Brazil, South America',
      facts: [
        'Iguazu Falls is one of the most spectacular waterfalls in the world, spread across Argentina and Brazil.',
        'The falls are wider than Niagara Falls and taller than Victoria Falls.',
        'Iguazu Falls was voted one of the New Seven Wonders of Nature.'
      ],
      related: ['Argentina', 'Brazil', 'Waterfall', 'Seven Wonders', 'Rainforest', 'South America']
    },
    {
      id: 'iceland-volcanoes', title: 'Iceland Volcanoes', emoji: '🌋',
      category: 'Nature', region: 'Iceland, Europe',
      facts: [
        'Iceland is called the "Land of Fire and Ice" because it has both active volcanoes AND glaciers!',
        'Iceland sits on the Mid-Atlantic Ridge, where two tectonic plates are slowly moving apart.',
        'Iceland gets its electricity almost entirely from volcanic geothermal energy — very eco-friendly!'
      ],
      related: ['Iceland', 'Volcano', 'Glacier', 'Geothermal', 'Aurora', 'Atlantic']
    },
  ],

  /* ── J ──────────────────────────────────────────────── */
  J: [
    {
      id: 'japan', title: 'Japan', emoji: '🇯🇵',
      category: 'Country', region: 'Asia', capital: 'Tokyo',
      facts: [
        'Japan is an island nation made up of 4 main islands and over 6,800 smaller ones.',
        'Japan is famous for its cherry blossom (sakura) season every spring.',
        'Japan invented manga comics, sushi, anime, and many video games!'
      ],
      related: ['Tokyo', 'Mount Fuji', 'Sakura', 'Sushi', 'Anime', 'Samurai']
    },
    {
      id: 'jordan', title: 'Jordan', emoji: '🇯🇴',
      category: 'Country', region: 'Middle East', capital: 'Amman',
      facts: [
        'Jordan is home to Petra, the ancient "Rose City" carved into pink rock cliffs.',
        'The Dead Sea, the lowest point on Earth, is on Jordan\'s western border.',
        'Jordan is a desert country but has ancient ruins, castles, and amazing landscapes.'
      ],
      related: ['Amman', 'Petra', 'Dead Sea', 'Middle East', 'Desert', 'Ancient Ruins']
    },
    {
      id: 'jakarta', title: 'Jakarta', emoji: '🇮🇩',
      category: 'Capital', region: 'Indonesia, Asia',
      facts: [
        'Jakarta is the capital of Indonesia and one of the most populous cities in the world.',
        'It is located on the island of Java and is home to over 10 million people.',
        'Indonesia is moving its capital to a new city called "Nusantara" to reduce overcrowding in Jakarta.'
      ],
      related: ['Indonesia', 'Java', 'Nusantara', 'Southeast Asia', 'Megacity', 'Pacific']
    },
    {
      id: 'jeddah', title: 'Jeddah', emoji: '🇸🇦',
      category: 'City', region: 'Saudi Arabia, Middle East',
      facts: [
        'Jeddah is Saudi Arabia\'s second-largest city and an important gateway to the holy city of Mecca.',
        'It sits on the Red Sea coast and has one of the world\'s tallest fountains.',
        'Old Jeddah (Al-Balad) is a UNESCO World Heritage Site famous for its coral-stone buildings.'
      ],
      related: ['Saudi Arabia', 'Red Sea', 'Mecca', 'Middle East', 'Coral Architecture', 'Arabia']
    },
    {
      id: 'jeju-island', title: 'Jeju Island', emoji: '🏝️',
      category: 'Landmark', region: 'South Korea, Asia',
      facts: [
        'Jeju Island is a volcanic island south of South Korea, famous for its beautiful nature.',
        'Hallasan, the highest mountain in South Korea, sits in the middle of Jeju Island.',
        'Jeju was voted one of the New Seven Wonders of Nature for its stunning landscapes.'
      ],
      related: ['South Korea', 'Volcano', 'Island', 'Asia', 'Hallasan', 'Haenyeo']
    },
    {
      id: 'jungles', title: 'Tropical Jungles', emoji: '🌴',
      category: 'Nature', region: 'Equatorial Regions, Worldwide',
      facts: [
        'Tropical jungles grow near the equator where it is hot and rainy almost every day.',
        'Jungles are home to more species of plants and animals than any other habitat on Earth.',
        'Toucans, jaguars, orangutans, and hundreds of types of colourful frogs live in jungles!'
      ],
      related: ['Rainforest', 'Equator', 'Tropics', 'Biodiversity', 'Amazon', 'Canopy']
    },
  ],

  /* ── K ──────────────────────────────────────────────── */
  K: [
    {
      id: 'kenya', title: 'Kenya', emoji: '🇰🇪',
      category: 'Country', region: 'East Africa', capital: 'Nairobi',
      facts: [
        'Kenya is famous for its incredible wildlife — lions, elephants, giraffes, and zebras all live on the Kenyan savanna.',
        'The Maasai Mara is one of the world\'s most famous wildlife reserves, home to the Great Migration.',
        'Kenya sits right on the equator and has both tropical coast and cool highland mountains.'
      ],
      related: ['Nairobi', 'Safari', 'Maasai', 'Great Migration', 'Savanna', 'Africa']
    },
    {
      id: 'kazakhstan', title: 'Kazakhstan', emoji: '🇰🇿',
      category: 'Country', region: 'Central Asia', capital: 'Astana',
      facts: [
        'Kazakhstan is the ninth-largest country in the world and the largest landlocked country.',
        'It stretches from Europe to Asia and has vast grassy plains called steppes.',
        'Kazakhstan is famous for the Baikonur Cosmodrome, where the first human was launched into space.'
      ],
      related: ['Astana', 'Steppe', 'Central Asia', 'Space', 'Cosmodrome', 'Landlocked']
    },
    {
      id: 'kyiv', title: 'Kyiv', emoji: '🇺🇦',
      category: 'Capital', region: 'Ukraine, Europe',
      facts: [
        'Kyiv is the capital of Ukraine and one of the oldest cities in Eastern Europe.',
        'The city sits on the Dnipro River and has beautiful golden-domed churches.',
        'Kyiv has been inhabited for over 1,500 years and was once the centre of a powerful kingdom.'
      ],
      related: ['Ukraine', 'Dnipro', 'Eastern Europe', 'Orthodox Church', 'Golden Dome', 'History']
    },
    {
      id: 'kyoto', title: 'Kyoto', emoji: '🇯🇵',
      category: 'City', region: 'Japan, Asia',
      facts: [
        'Kyoto was Japan\'s ancient capital for over 1,000 years before Tokyo took over.',
        'Kyoto has over 2,000 temples and shrines, including the famous golden Kinkaku-ji.',
        'The Arashiyama bamboo forest in Kyoto is one of the most photographed places in the world.'
      ],
      related: ['Japan', 'Temple', 'Shrine', 'Bamboo Forest', 'Geisha', 'Cherry Blossom']
    },
    {
      id: 'kremlin', title: 'Kremlin', emoji: '🏰',
      category: 'Landmark', region: 'Moscow, Russia',
      facts: [
        'The Kremlin is a famous fortress and historic complex in the heart of Moscow, Russia.',
        'It has been the home of Russia\'s leaders for hundreds of years.',
        'The Kremlin contains palaces, cathedrals, towers, and the famous Red Square is right next to it.'
      ],
      related: ['Moscow', 'Russia', 'Red Square', 'Fortress', 'History', 'Tsar']
    },
    {
      id: 'kilimanjaro', title: 'Kilimanjaro', emoji: '🏔️',
      category: 'Nature', region: 'Tanzania, Africa',
      facts: [
        'Mount Kilimanjaro is the highest mountain in Africa at 5,895 meters tall.',
        'Amazingly, Kilimanjaro is a dormant volcano — it could erupt again someday!',
        'Even though Kilimanjaro is near the equator in Africa, its peak is covered in glaciers and snow.'
      ],
      related: ['Tanzania', 'Africa', 'Volcano', 'Glacier', 'Summit', 'Savanna']
    },
  ],

  /* ── L ──────────────────────────────────────────────── */
  L: [
    {
      id: 'laos', title: 'Laos', emoji: '🇱🇦',
      category: 'Country', region: 'Southeast Asia', capital: 'Vientiane',
      facts: [
        'Laos is a landlocked country in Southeast Asia, surrounded by Thailand, Vietnam, China, Cambodia, and Myanmar.',
        'The Mekong River runs through Laos and is important for fishing and transport.',
        'Luang Prabang, an ancient city in Laos, is a UNESCO World Heritage Site full of beautiful temples.'
      ],
      related: ['Vientiane', 'Mekong', 'Southeast Asia', 'Buddhist', 'Temple', 'Landlocked']
    },
    {
      id: 'libya', title: 'Libya', emoji: '🇱🇾',
      category: 'Country', region: 'North Africa', capital: 'Tripoli',
      facts: [
        'Libya is a large country in North Africa, and over 90% of its land is covered by the Sahara Desert.',
        'Libya has ancient Roman ruins, including the well-preserved city of Leptis Magna.',
        'The Mediterranean Sea forms Libya\'s northern border.'
      ],
      related: ['Tripoli', 'Sahara', 'Mediterranean', 'North Africa', 'Roman Ruins', 'Desert']
    },
    {
      id: 'lisbon', title: 'Lisbon', emoji: '🇵🇹',
      category: 'Capital', region: 'Portugal, Europe',
      facts: [
        'Lisbon is the capital of Portugal and one of the oldest cities in the world.',
        'It is built on seven hills overlooking the Tagus River and the Atlantic Ocean.',
        'Lisbon is famous for its traditional music called Fado and its colourful tiled buildings.'
      ],
      related: ['Portugal', 'Tagus River', 'Fado', 'Atlantic', 'Europe', 'Tram']
    },
    {
      id: 'london', title: 'London', emoji: '🇬🇧',
      category: 'Capital', region: 'United Kingdom, Europe',
      facts: [
        'London is the capital of the United Kingdom and one of the most visited cities in the world.',
        'London is home to iconic landmarks like Big Ben, the Tower of London, and Buckingham Palace.',
        'The London Underground (the "Tube") was the world\'s first underground railway, opened in 1863.'
      ],
      related: ['UK', 'Big Ben', 'Thames', 'Buckingham Palace', 'Underground', 'Tower of London']
    },
    {
      id: 'los-angeles', title: 'Los Angeles', emoji: '🇺🇸',
      category: 'City', region: 'California, USA',
      facts: [
        'Los Angeles, known as "LA," is the second-largest city in the USA and home to Hollywood.',
        'LA has sunny weather, beautiful beaches like Venice Beach, and the famous Hollywood Sign.',
        'The entertainment industry — movies, TV, and music — is centred in Los Angeles.'
      ],
      related: ['California', 'Hollywood', 'Pacific', 'Movies', 'Beach', 'USA']
    },
    {
      id: 'louvre', title: 'Louvre Museum', emoji: '🖼️',
      category: 'Landmark', region: 'Paris, France',
      facts: [
        'The Louvre is the world\'s largest art museum and home to the famous Mona Lisa painting.',
        'It was originally built as a fortress in the 12th century and later became a royal palace.',
        'The Louvre has over 35,000 works of art and welcomes millions of visitors every year.'
      ],
      related: ['Paris', 'France', 'Mona Lisa', 'Art', 'Museum', 'History']
    },
    {
      id: 'lake-baikal', title: 'Lake Baikal', emoji: '🌊',
      category: 'Nature', region: 'Russia, Asia',
      facts: [
        'Lake Baikal in Siberia, Russia is the world\'s deepest lake at 1,642 meters deep.',
        'It contains about 20% of all the unfrozen fresh water on Earth!',
        'Lake Baikal is home to thousands of unique species, including the Baikal seal, the only freshwater seal.'
      ],
      related: ['Russia', 'Siberia', 'Freshwater', 'Deep Lake', 'Seal', 'Asia']
    },
  ],

  /* ── M ──────────────────────────────────────────────── */
  M: [
    {
      id: 'mexico', title: 'Mexico', emoji: '🇲🇽',
      category: 'Country', region: 'North America', capital: 'Mexico City',
      facts: [
        'Mexico is home to ancient Mayan and Aztec civilizations that built giant pyramids.',
        'Mexico is the world\'s largest producer of avocados — guacamole\'s favourite ingredient!',
        'Mexico City, the capital, is one of the most populated cities in the entire world.'
      ],
      related: ['Mexico City', 'Aztec', 'Maya', 'Pyramid', 'Avocado', 'Mariachi']
    },
    {
      id: 'morocco', title: 'Morocco', emoji: '🇲🇦',
      category: 'Country', region: 'North Africa', capital: 'Rabat',
      facts: [
        'Morocco is a country in North Africa with both Atlantic and Mediterranean coastlines.',
        'The Sahara Desert covers part of Morocco\'s south, while the Atlas Mountains run through its middle.',
        'Morocco\'s colourful markets, called souks, and spice bazaars are world-famous.'
      ],
      related: ['Rabat', 'Marrakech', 'Sahara', 'Atlas Mountains', 'Souk', 'Couscous']
    },
    {
      id: 'madrid', title: 'Madrid', emoji: '🇪🇸',
      category: 'Capital', region: 'Spain, Europe',
      facts: [
        'Madrid is the capital of Spain and the highest capital city in the European Union.',
        'The Prado Museum in Madrid is one of the finest art museums in the world.',
        'Real Madrid, one of the world\'s most famous football clubs, calls Madrid home.'
      ],
      related: ['Spain', 'Prado', 'Football', 'Flamenco', 'Europe', 'Tapas']
    },
    {
      id: 'manila', title: 'Manila', emoji: '🇵🇭',
      category: 'Capital', region: 'Philippines, Asia',
      facts: [
        'Manila is the capital of the Philippines, an archipelago of over 7,000 islands in Southeast Asia.',
        'Manila Bay is famous for its beautiful sunsets over the water.',
        'The Philippines has the second-longest coastline in the world after Canada.'
      ],
      related: ['Philippines', 'Islands', 'Southeast Asia', 'Tagalog', 'Pacific', 'Archipelago']
    },
    {
      id: 'mumbai', title: 'Mumbai', emoji: '🇮🇳',
      category: 'City', region: 'India, Asia',
      facts: [
        'Mumbai is the financial capital of India and home to the world\'s largest film industry — Bollywood!',
        'It is India\'s most populous city with over 20 million people.',
        'The Gateway of India is a famous arch monument overlooking Mumbai\'s harbour.'
      ],
      related: ['India', 'Bollywood', 'Finance', 'Arabian Sea', 'Gateway of India', 'Asia']
    },
    {
      id: 'milan', title: 'Milan', emoji: '🇮🇹',
      category: 'City', region: 'Italy, Europe',
      facts: [
        'Milan is Italy\'s second-largest city and the world capital of fashion and design.',
        'The famous Last Supper painting by Leonardo da Vinci is in a church in Milan.',
        'Milan\'s Duomo Cathedral, with its countless spires, took nearly 600 years to build!'
      ],
      related: ['Italy', 'Fashion', 'Leonardo da Vinci', 'Duomo', 'Design', 'Europe']
    },
    {
      id: 'machu-picchu', title: 'Machu Picchu', emoji: '🏔️',
      category: 'Landmark', region: 'Peru, South America',
      facts: [
        'Machu Picchu is an ancient Inca city built high in the Andes Mountains of Peru.',
        'It was built around 1450 AD but was abandoned and hidden from the world for centuries.',
        'Machu Picchu was declared a UNESCO World Heritage Site and a Wonder of the World.'
      ],
      related: ['Peru', 'Inca', 'Andes', 'South America', 'UNESCO', 'Ancient Ruins']
    },
    {
      id: 'mount-fuji', title: 'Mount Fuji', emoji: '🗻',
      category: 'Nature', region: 'Japan, Asia',
      facts: [
        'Mount Fuji is Japan\'s highest mountain and most iconic symbol at 3,776 meters tall.',
        'It is a stratovolcano and last erupted in 1707.',
        'Every year, over 200,000 people climb Mount Fuji during the summer climbing season.'
      ],
      related: ['Japan', 'Volcano', 'Volcano', 'Shinto', 'Sakura', 'UNESCO']
    },
  ],

  /* ── N ──────────────────────────────────────────────── */
  N: [
    {
      id: 'nepal', title: 'Nepal', emoji: '🇳🇵',
      category: 'Country', region: 'South Asia', capital: 'Kathmandu',
      facts: [
        'Nepal is home to 8 of the world\'s 10 highest mountains, including Mount Everest.',
        'Nepal\'s flag is the only national flag in the world that is not a rectangle — it\'s two triangles!',
        'Nepal is a deeply spiritual country and the birthplace of Siddhartha Gautama, the Buddha.'
      ],
      related: ['Kathmandu', 'Everest', 'Himalayas', 'Buddhism', 'Trekking', 'South Asia']
    },
    {
      id: 'norway', title: 'Norway', emoji: '🇳🇴',
      category: 'Country', region: 'Europe', capital: 'Oslo',
      facts: [
        'Norway is famous for its stunning fjords — deep, narrow valleys carved by glaciers and filled with sea water.',
        'Norway is one of the best places in the world to see the Northern Lights (Aurora Borealis).',
        'Norway consistently ranks as one of the happiest and most prosperous countries in the world.'
      ],
      related: ['Oslo', 'Fjord', 'Northern Lights', 'Viking', 'Scandinavia', 'Midnight Sun']
    },
    {
      id: 'nairobi', title: 'Nairobi', emoji: '🇰🇪',
      category: 'Capital', region: 'Kenya, Africa',
      facts: [
        'Nairobi is the capital of Kenya and the largest city in East Africa.',
        'It has a unique national park right on the city\'s edge where you can see lions and giraffes!',
        'The name "Nairobi" comes from a Maasai phrase meaning "cool water."'
      ],
      related: ['Kenya', 'Safari', 'East Africa', 'Maasai', 'Wildlife', 'National Park']
    },
    {
      id: 'new-york-city', title: 'New York City', emoji: '🇺🇸',
      category: 'City', region: 'New York, USA',
      facts: [
        'New York City is the most populated city in the USA and one of the most famous cities in the world.',
        'The Statue of Liberty stands in New York Harbour as a symbol of freedom.',
        'New York is known as "The City That Never Sleeps" because it is busy 24 hours a day!'
      ],
      related: ['Statue of Liberty', 'Times Square', 'Central Park', 'Manhattan', 'USA', 'Broadway']
    },
    {
      id: 'niagara-falls', title: 'Niagara Falls', emoji: '🌊',
      category: 'Landmark', region: 'USA/Canada, North America',
      facts: [
        'Niagara Falls sits on the border between the United States and Canada.',
        'It is actually three waterfalls together: Horseshoe Falls, American Falls, and Bridal Veil Falls.',
        'About 3,160 tonnes of water flows over Niagara Falls every second!'
      ],
      related: ['Canada', 'USA', 'Waterfall', 'Ontario', 'Power', 'Border']
    },
    {
      id: 'nile-river', title: 'Nile River', emoji: '🚣',
      category: 'Nature', region: 'Northeast Africa',
      facts: [
        'The Nile is the longest river in the world at about 6,650 km.',
        'It flows northward through 11 countries in Africa before emptying into the Mediterranean Sea.',
        'Ancient Egyptian civilization grew up along the Nile River, relying on its water and rich soil.'
      ],
      related: ['Egypt', 'Sudan', 'Cairo', 'Africa', 'Ancient Egypt', 'Pharaoh']
    },
  ],

  /* ── O ──────────────────────────────────────────────── */
  O: [
    {
      id: 'oman', title: 'Oman', emoji: '🇴🇲',
      category: 'Country', region: 'Middle East', capital: 'Muscat',
      facts: [
        'Oman is a country on the Arabian Peninsula, famous for its dramatic desert and mountain landscapes.',
        'Oman has ancient trading connections with India, Africa, and Persia going back thousands of years.',
        'The Sultan Qaboos Grand Mosque in Muscat has one of the largest hand-woven carpets in the world.'
      ],
      related: ['Muscat', 'Arabian Peninsula', 'Desert', 'Middle East', 'Frankincense', 'Spice Trade']
    },
    {
      id: 'oslo', title: 'Oslo', emoji: '🇳🇴',
      category: 'Capital', region: 'Norway, Europe',
      facts: [
        'Oslo is the capital of Norway and sits at the head of the Oslofjord.',
        'The Nobel Peace Prize is awarded every year in Oslo.',
        'Oslo is one of the world\'s most sustainable and eco-friendly cities.'
      ],
      related: ['Norway', 'Fjord', 'Nobel Prize', 'Scandinavia', 'Viking Museum', 'Europe']
    },
    {
      id: 'ottawa', title: 'Ottawa', emoji: '🇨🇦',
      category: 'Capital', region: 'Canada, North America',
      facts: [
        'Ottawa is the capital of Canada, chosen as a compromise between Toronto and Montreal.',
        'In winter, the Rideau Canal in Ottawa becomes the world\'s largest naturally frozen ice skating rink!',
        'Ottawa sits on the Ottawa River, on the border between Ontario and Quebec.'
      ],
      related: ['Canada', 'Rideau Canal', 'Parliament', 'Ontario', 'Quebec', 'Ice Skating']
    },
    {
      id: 'osaka', title: 'Osaka', emoji: '🇯🇵',
      category: 'City', region: 'Japan, Asia',
      facts: [
        'Osaka is Japan\'s third-largest city and is known as the "Kitchen of Japan" because of its amazing food.',
        'Osaka Castle is one of Japan\'s most famous and beautiful historic landmarks.',
        'Osaka is also known for its friendly, funny, and food-loving people!'
      ],
      related: ['Japan', 'Osaka Castle', 'Takoyaki', 'Food', 'Asia', 'Neon Lights']
    },
    {
      id: 'sydney-opera-house', title: 'Sydney Opera House', emoji: '🎭',
      category: 'Landmark', region: 'Sydney, Australia',
      facts: [
        'The Sydney Opera House is one of the most recognisable buildings in the world, with its shell-like roof.',
        'It was designed by Danish architect Jørn Utzon and opened in 1973.',
        'The Sydney Opera House is a UNESCO World Heritage Site and holds about 1,500 performances every year.'
      ],
      related: ['Sydney', 'Australia', 'Architecture', 'UNESCO', 'Harbour', 'Performing Arts']
    },
    {
      id: 'ocean', title: 'The Ocean', emoji: '🌊',
      category: 'Nature', region: 'Worldwide',
      facts: [
        'The ocean covers over 70% of the Earth\'s surface and holds 97% of all the water on Earth.',
        'The Pacific Ocean is the largest, deepest ocean — it is bigger than all the land on Earth combined!',
        'The ocean is home to the largest animal ever known to exist — the blue whale.'
      ],
      related: ['Pacific', 'Atlantic', 'Indian Ocean', 'Marine Life', 'Coral', 'Blue Whale']
    },
  ],

  /* ── P ──────────────────────────────────────────────── */
  P: [
    {
      id: 'peru', title: 'Peru', emoji: '🇵🇪',
      category: 'Country', region: 'South America', capital: 'Lima',
      facts: [
        'Peru is home to Machu Picchu, the famous ancient Inca city hidden in the Andes Mountains.',
        'Peru has three very different regions: the coast, the Andes mountains, and the Amazon jungle.',
        'Peru is the birthplace of the potato — over 3,000 varieties are grown there!'
      ],
      related: ['Lima', 'Machu Picchu', 'Inca', 'Amazon', 'Andes', 'Potato']
    },
    {
      id: 'portugal', title: 'Portugal', emoji: '🇵🇹',
      category: 'Country', region: 'Europe', capital: 'Lisbon',
      facts: [
        'Portugal is a small country on the western edge of Europe with a long Atlantic coastline.',
        'Portuguese explorers sailed around the world in the 1400s and 1500s, mapping new trade routes.',
        'Portugal is famous for its beautiful azulejo tiles, pastéis de nata (custard tarts), and Fado music.'
      ],
      related: ['Lisbon', 'Explorer', 'Atlantic', 'Fado', 'Azulejo', 'Custard Tart']
    },
    {
      id: 'paris', title: 'Paris', emoji: '🇫🇷',
      category: 'Capital', region: 'France, Europe',
      facts: [
        'Paris is the capital of France and one of the most visited cities in the entire world.',
        'It is known as the "City of Light" and "City of Love."',
        'Paris is home to the Eiffel Tower, the Louvre Museum, and the gorgeous Notre-Dame Cathedral.'
      ],
      related: ['France', 'Eiffel Tower', 'Louvre', 'Seine River', 'Fashion', 'Croissant']
    },
    {
      id: 'prague', title: 'Prague', emoji: '🇨🇿',
      category: 'Capital', region: 'Czech Republic, Europe',
      facts: [
        'Prague is the capital of the Czech Republic and is known for its magical old town and castle.',
        'Prague Castle is the largest ancient castle complex in the world!',
        'Prague\'s Old Town Square has a famous 600-year-old astronomical clock called the Orloj.'
      ],
      related: ['Czech Republic', 'Prague Castle', 'Astronomical Clock', 'Bohemia', 'Vltava', 'Europe']
    },
    {
      id: 'phuket', title: 'Phuket', emoji: '🇹🇭',
      category: 'City', region: 'Thailand, Asia',
      facts: [
        'Phuket is Thailand\'s largest island and one of the most popular beach destinations in the world.',
        'It has stunning turquoise water, white sandy beaches, and dramatic limestone cliffs.',
        'Phuket is also known for colourful temples, street markets, and delicious Thai food.'
      ],
      related: ['Thailand', 'Island', 'Beach', 'Andaman Sea', 'Temple', 'Southeast Asia']
    },
    {
      id: 'pyramids-giza', title: 'Pyramids of Giza', emoji: '🔺',
      category: 'Landmark', region: 'Egypt, Africa',
      facts: [
        'The Pyramids of Giza are one of the Seven Wonders of the Ancient World and the only one still standing!',
        'The Great Pyramid of Khufu was the tallest man-made structure in the world for over 3,800 years.',
        'The pyramids were built by ancient Egyptians as tombs for their pharaohs around 2500 BC.'
      ],
      related: ['Egypt', 'Pharaoh', 'Cairo', 'Sphinx', 'Nile', 'Ancient Wonders']
    },
    {
      id: 'patagonia', title: 'Patagonia', emoji: '🏔️',
      category: 'Nature', region: 'Argentina/Chile, South America',
      facts: [
        'Patagonia is a wild, beautiful region at the southern tip of South America, shared by Argentina and Chile.',
        'It has dramatic glaciers, towering mountains, and is home to penguins, pumas, and condors.',
        'Torres del Paine in Patagonia is considered one of the most spectacular national parks in the world.'
      ],
      related: ['Argentina', 'Chile', 'Glacier', 'Penguin', 'Andes', 'Torres del Paine']
    },
  ],

  /* ── Q ──────────────────────────────────────────────── */
  Q: [
    {
      id: 'qatar', title: 'Qatar', emoji: '🇶🇦',
      category: 'Country', region: 'Middle East', capital: 'Doha',
      facts: [
        'Qatar is a small country on a peninsula in the Persian Gulf, but it is one of the wealthiest per capita.',
        'Qatar hosted the FIFA World Cup in 2022, the first Middle Eastern country to do so.',
        'Qatar has huge reserves of natural gas, which has made it very prosperous.'
      ],
      related: ['Doha', 'Persian Gulf', 'World Cup', 'Natural Gas', 'Middle East', 'Arabia']
    },
    {
      id: 'quito', title: 'Quito', emoji: '🇪🇨',
      category: 'Capital', region: 'Ecuador, South America',
      facts: [
        'Quito is the capital of Ecuador and one of the highest capital cities in the world at 2,850 meters.',
        'It sits in a valley in the Andes Mountains, surrounded by volcanoes.',
        'Quito\'s historic centre was the first city declared a UNESCO World Heritage Site.'
      ],
      related: ['Ecuador', 'Andes', 'Volcano', 'UNESCO', 'High Altitude', 'South America']
    },
    {
      id: 'quebec-city', title: 'Quebec City', emoji: '🇨🇦',
      category: 'City', region: 'Quebec, Canada',
      facts: [
        'Quebec City is one of North America\'s oldest European settlements, founded in 1608.',
        'It\'s the only city in North America with well-preserved city walls still standing.',
        'Quebec City is famous for its Winter Carnival — the world\'s largest winter festival!'
      ],
      related: ['Canada', 'French', 'Old Quebec', 'Saint Lawrence', 'Winter Carnival', 'Fortress']
    },
    {
      id: 'qutub-minar', title: 'Qutub Minar', emoji: '🕌',
      category: 'Landmark', region: 'Delhi, India',
      facts: [
        'The Qutub Minar in Delhi, India is the world\'s tallest brick minaret at 73 meters.',
        'It was built in the 12th century and is decorated with beautiful Islamic carvings.',
        'It was declared a UNESCO World Heritage Site for its architectural beauty.'
      ],
      related: ['Delhi', 'India', 'Minaret', 'UNESCO', 'Islamic', 'Medieval']
    },
    {
      id: 'queensland-reef', title: 'Queensland Reef', emoji: '🪸',
      category: 'Nature', region: 'Queensland, Australia',
      facts: [
        'The Great Barrier Reef off the coast of Queensland is the largest living structure on Earth.',
        'It stretches over 2,300 km and can be seen from outer space!',
        'The reef is home to 1,500 species of fish, 4,000 types of molluscs, and 240 species of birds.'
      ],
      related: ['Australia', 'Coral', 'Pacific', 'Biodiversity', 'UNESCO', 'Marine Life']
    },
  ],

  /* ── R ──────────────────────────────────────────────── */
  R: [
    {
      id: 'romania', title: 'Romania', emoji: '🇷🇴',
      category: 'Country', region: 'Europe', capital: 'Bucharest',
      facts: [
        'Romania is famous for Transylvania, the region that inspired the Dracula story!',
        'Romania has the Carpathian Mountains, dense forests, and beautiful medieval castles.',
        'Romania is home to the Danube Delta, one of the largest river deltas in Europe.'
      ],
      related: ['Bucharest', 'Transylvania', 'Dracula', 'Carpathians', 'Danube', 'Europe']
    },
    {
      id: 'russia', title: 'Russia', emoji: '🇷🇺',
      category: 'Country', region: 'Europe/Asia', capital: 'Moscow',
      facts: [
        'Russia is the largest country in the world — it covers 11 time zones and spans two continents!',
        'Russia has the world\'s largest forests, called the taiga or boreal forest.',
        'Lake Baikal in Russia is the world\'s deepest lake and contains 20% of Earth\'s fresh water.'
      ],
      related: ['Moscow', 'Siberia', 'Taiga', 'Trans-Siberian', 'Baikal', 'Tsar']
    },
    {
      id: 'rome', title: 'Rome', emoji: '🇮🇹',
      category: 'Capital', region: 'Italy, Europe',
      facts: [
        'Rome is the capital of Italy and known as "The Eternal City" — it\'s over 2,700 years old!',
        'The city is home to the Colosseum, Trevi Fountain, Pantheon, and Vatican City.',
        'Rome was the centre of one of history\'s greatest empires, the Roman Empire.'
      ],
      related: ['Italy', 'Colosseum', 'Vatican', 'Trevi Fountain', 'Ancient Rome', 'Gladiator']
    },
    {
      id: 'rio-de-janeiro', title: 'Rio de Janeiro', emoji: '🇧🇷',
      category: 'City', region: 'Brazil, South America',
      facts: [
        'Rio de Janeiro is famous for its stunning beaches, carnival, and the Christ the Redeemer statue.',
        'Copacabana and Ipanema are two of the world\'s most famous beaches, both in Rio.',
        'Rio hosted the 2016 Summer Olympic Games and the 2014 FIFA World Cup Final.'
      ],
      related: ['Brazil', 'Christ the Redeemer', 'Carnival', 'Copacabana', 'Samba', 'Olympics']
    },
    {
      id: 'red-square', title: 'Red Square', emoji: '🟥',
      category: 'Landmark', region: 'Moscow, Russia',
      facts: [
        'Red Square is the most famous public square in Russia, located in the heart of Moscow.',
        'The colourful, onion-domed St. Basil\'s Cathedral sits at one end of Red Square.',
        'Red Square has been used for celebrations, parades, and important events for hundreds of years.'
      ],
      related: ['Moscow', 'Russia', 'Kremlin', "St. Basil's", 'History', 'Square']
    },
    {
      id: 'rocky-mountains', title: 'Rocky Mountains', emoji: '🏔️',
      category: 'Nature', region: 'North America',
      facts: [
        'The Rocky Mountains stretch over 4,800 km from Canada\'s British Columbia down to New Mexico in the USA.',
        'They are home to grizzly bears, wolves, eagles, elk, and mountain goats.',
        'The Rockies are the source of many major rivers, including the Colorado and Missouri rivers.'
      ],
      related: ['Canada', 'USA', 'Grizzly Bear', 'National Park', 'Glacier', 'North America']
    },
  ],

  /* ── S ──────────────────────────────────────────────── */
  S: [
    {
      id: 'spain', title: 'Spain', emoji: '🇪🇸',
      category: 'Country', region: 'Europe', capital: 'Madrid',
      facts: [
        'Spain is famous for flamenco dancing, bullfighting, delicious tapas, and incredible festivals.',
        'Spain has the second-largest number of UNESCO World Heritage Sites in the world.',
        'La Tomatina is a famous Spanish festival where people throw tomatoes at each other!'
      ],
      related: ['Madrid', 'Flamenco', 'Tapas', 'Gaudi', 'Mediterranean', 'Paella']
    },
    {
      id: 'sweden', title: 'Sweden', emoji: '🇸🇪',
      category: 'Country', region: 'Europe', capital: 'Stockholm',
      facts: [
        'Sweden is famous for IKEA furniture, ABBA music, and the delicious Swedish meatball.',
        'Sweden is home to Lapland, where the Midnight Sun shines 24 hours a day in summer.',
        'Sweden has a tradition called "fika" — taking a break for coffee and cake with friends!'
      ],
      related: ['Stockholm', 'Lapland', 'IKEA', 'ABBA', 'Viking', 'Scandinavia']
    },
    {
      id: 'singapore', title: 'Singapore', emoji: '🇸🇬',
      category: 'Country', region: 'Southeast Asia', capital: 'Singapore City',
      facts: [
        'Singapore is both a country AND a city — it\'s one of the world\'s smallest nations.',
        'Singapore is one of the cleanest, most modern, and most organised cities in the world.',
        'The Marina Bay Sands is a famous hotel in Singapore that looks like a giant surfboard on top of three towers!'
      ],
      related: ['Southeast Asia', 'City-State', 'Marina Bay', 'Diversity', 'Technology', 'Hawker Food']
    },
    {
      id: 'seoul', title: 'Seoul', emoji: '🇰🇷',
      category: 'Capital', region: 'South Korea, Asia',
      facts: [
        'Seoul is the capital of South Korea and home to over 25 million people in its metro area.',
        'South Korea is the birthplace of K-pop music, K-dramas, and Korean BBQ!',
        'Seoul has ancient palaces, high-tech neighbourhoods, and futuristic skyscrapers all in one city.'
      ],
      related: ['South Korea', 'K-pop', 'K-drama', 'Hanok', 'Samsung', 'Asia']
    },
    {
      id: 'stockholm', title: 'Stockholm', emoji: '🇸🇪',
      category: 'Capital', region: 'Sweden, Europe',
      facts: [
        'Stockholm is the capital of Sweden and is built across 14 islands connected by 57 bridges.',
        'Stockholm is where the Nobel Prize ceremony is held every year.',
        'The city has the world\'s first open-air museum, called Skansen, opened in 1891.'
      ],
      related: ['Sweden', 'Nobel Prize', 'Islands', 'Viking', 'Scandinavia', 'Baltic']
    },
    {
      id: 'sydney', title: 'Sydney', emoji: '🇦🇺',
      category: 'City', region: 'Australia, Oceania',
      facts: [
        'Sydney is Australia\'s largest city, famous for its iconic Opera House and Harbour Bridge.',
        'Sydney Harbour is one of the most beautiful natural harbours in the world.',
        'Sydney hosted the Summer Olympics in 2000.'
      ],
      related: ['Australia', 'Opera House', 'Harbour Bridge', 'Bondi Beach', 'Oceania', 'Olympics']
    },
    {
      id: 'shanghai', title: 'Shanghai', emoji: '🇨🇳',
      category: 'City', region: 'China, Asia',
      facts: [
        'Shanghai is China\'s largest city and one of the biggest financial centres in the world.',
        'The futuristic skyline of Pudong, with its glowing towers, is one of the most famous in the world.',
        'Shanghai\'s Old Town has traditional Chinese gardens, while the Bund has beautiful colonial buildings.'
      ],
      related: ['China', 'Finance', 'Pudong', 'The Bund', 'Yangtze River', 'Asia']
    },
    {
      id: 'statue-of-liberty', title: 'Statue of Liberty', emoji: '🗽',
      category: 'Landmark', region: 'New York, USA',
      facts: [
        'The Statue of Liberty is a giant copper statue on Liberty Island in New York Harbour.',
        'It was a gift from France to the United States in 1886, as a symbol of freedom.',
        'Lady Liberty\'s torch represents enlightenment, and her seven-spiked crown represents the seven continents.'
      ],
      related: ['New York', 'USA', 'France', 'Freedom', 'Harbour', 'Copper']
    },
    {
      id: 'sahara-desert', title: 'Sahara Desert', emoji: '🏜️',
      category: 'Nature', region: 'North Africa',
      facts: [
        'The Sahara Desert is the world\'s largest hot desert, covering most of North Africa.',
        'It is about the same size as the United States!',
        'Despite being a desert, the Sahara has sand dunes, rocky plateaus, mountains, and even oases.'
      ],
      related: ['Africa', 'Sand Dunes', 'Camel', 'Oasis', 'Algeria', 'Nomad']
    },
  ],

  /* ── T ──────────────────────────────────────────────── */
  T: [
    {
      id: 'thailand', title: 'Thailand', emoji: '🇹🇭',
      category: 'Country', region: 'Southeast Asia', capital: 'Bangkok',
      facts: [
        'Thailand is known as the "Land of Smiles" because of its friendly, welcoming people.',
        'Thailand has over 40,000 Buddhist temples, called "wats."',
        'Thai food — like pad Thai, green curry, and mango sticky rice — is loved all over the world.'
      ],
      related: ['Bangkok', 'Buddhist', 'Temple', 'Elephant', 'Pad Thai', 'Southeast Asia']
    },
    {
      id: 'turkey', title: 'Turkey', emoji: '🇹🇷',
      category: 'Country', region: 'Europe/Asia', capital: 'Ankara',
      facts: [
        'Turkey is a country that straddles two continents — part of it is in Europe and part is in Asia.',
        'Istanbul, Turkey\'s largest city, is the only city in the world on two continents.',
        'Turkey is famous for its beautiful landscapes, including the fairy-tale rock formations of Cappadocia.'
      ],
      related: ['Ankara', 'Istanbul', 'Cappadocia', 'Bosphorus', 'Ottoman', 'Mediterranean']
    },
    {
      id: 'tokyo', title: 'Tokyo', emoji: '🇯🇵',
      category: 'Capital', region: 'Japan, Asia',
      facts: [
        'Tokyo is the capital of Japan and the most populated metropolitan area in the world with 37 million people!',
        'Tokyo has more Michelin-starred restaurants than any other city in the world.',
        'The Tokyo Skytree is the tallest tower in the world at 634 meters.'
      ],
      related: ['Japan', 'Skytree', 'Anime', 'Shinkansen', 'Shibuya', 'Asia']
    },
    {
      id: 'taipei', title: 'Taipei', emoji: '🇹🇼',
      category: 'Capital', region: 'Taiwan, Asia',
      facts: [
        'Taipei is the capital of Taiwan, an island nation in East Asia.',
        'Taipei 101, a skyscraper in Taipei, was the world\'s tallest building from 2004 to 2010.',
        'Taiwan is famous for its night markets — outdoor markets filled with street food, games, and crafts.'
      ],
      related: ['Taiwan', 'Taipei 101', 'Night Market', 'East Asia', 'Bubble Tea', 'Island']
    },
    {
      id: 'toronto', title: 'Toronto', emoji: '🇨🇦',
      category: 'City', region: 'Ontario, Canada',
      facts: [
        'Toronto is Canada\'s largest city and one of the most multicultural cities in the world.',
        'The CN Tower in Toronto was the world\'s tallest free-standing structure from 1975 to 2007.',
        'Over 200 languages are spoken in Toronto — it truly is a city of the world!'
      ],
      related: ['Canada', 'CN Tower', 'Ontario', 'Multicultural', 'Hockey', 'Lake Ontario']
    },
    {
      id: 'taj-mahal', title: 'Taj Mahal', emoji: '🕌',
      category: 'Landmark', region: 'Agra, India',
      facts: [
        'The Taj Mahal is a beautiful white marble mausoleum in Agra, India, built by Emperor Shah Jahan.',
        'It was built as a symbol of love for his wife and took over 20,000 workers and 22 years to complete.',
        'The Taj Mahal is one of the New Seven Wonders of the World and a UNESCO World Heritage Site.'
      ],
      related: ['Agra', 'India', 'Mughal', 'Marble', 'Seven Wonders', 'UNESCO']
    },
    {
      id: 'tundra', title: 'Tundra', emoji: '❄️',
      category: 'Nature', region: 'Arctic Regions, Worldwide',
      facts: [
        'The tundra is one of Earth\'s coldest and harshest biomes, with very little rainfall and frozen ground.',
        'Arctic foxes, polar bears, caribou, and snowy owls all live on the tundra.',
        'In summer, the sun shines 24 hours a day in the tundra — called the Midnight Sun!'
      ],
      related: ['Arctic', 'Polar Bear', 'Permafrost', 'Alaska', 'Midnight Sun', 'Russia']
    },
  ],

  /* ── U ──────────────────────────────────────────────── */
  U: [
    {
      id: 'uganda', title: 'Uganda', emoji: '🇺🇬',
      category: 'Country', region: 'East Africa', capital: 'Kampala',
      facts: [
        'Uganda is called the "Pearl of Africa" because of its beautiful landscapes and wildlife.',
        'Uganda is one of the best places in the world to see mountain gorillas in the wild.',
        'The source of the Nile River — the world\'s longest river — is found at Lake Victoria in Uganda.'
      ],
      related: ['Kampala', 'Gorilla', 'Nile Source', 'Lake Victoria', 'East Africa', 'Wildlife']
    },
    {
      id: 'ukraine', title: 'Ukraine', emoji: '🇺🇦',
      category: 'Country', region: 'Europe', capital: 'Kyiv',
      facts: [
        'Ukraine is the largest country entirely within Europe and is known for its vast golden wheat fields.',
        'Ukraine is the birthplace of Kyivan Rus, an ancient empire that shaped Eastern European history.',
        'Ukrainian culture is famous for its beautiful embroidered clothing, called "vyshyvanka."'
      ],
      related: ['Kyiv', 'Wheat', 'Embroidery', 'Eastern Europe', 'Cossack', 'Black Sea']
    },
    {
      id: 'united-states', title: 'United States', emoji: '🇺🇸',
      category: 'Country', region: 'North America', capital: 'Washington D.C.',
      facts: [
        'The United States is made up of 50 states and is the third-largest country in the world by area.',
        'The USA is famous for the Grand Canyon, Yellowstone, and the Rocky Mountains.',
        'The USA has sent humans to the Moon — the first was Neil Armstrong in 1969!'
      ],
      related: ['Washington D.C.', 'Grand Canyon', 'NASA', 'Hollywood', 'Statue of Liberty', 'North America']
    },
    {
      id: 'ulaanbaatar', title: 'Ulaanbaatar', emoji: '🇲🇳',
      category: 'Capital', region: 'Mongolia, Asia',
      facts: [
        'Ulaanbaatar is the capital of Mongolia and the world\'s coldest national capital city.',
        'Mongolia is a landlocked country between Russia and China, known for vast open steppes.',
        'Genghis Khan, the great Mongol warrior who built the largest land empire in history, was born in Mongolia.'
      ],
      related: ['Mongolia', 'Steppe', 'Genghis Khan', 'Nomad', 'Yurt', 'Asia']
    },
    {
      id: 'utrecht', title: 'Utrecht', emoji: '🇳🇱',
      category: 'City', region: 'Netherlands, Europe',
      facts: [
        'Utrecht is the fourth-largest city in the Netherlands and a very historic university town.',
        'It has the longest and deepest canal system of any Dutch city.',
        'The Dom Tower in Utrecht is the tallest church tower in the Netherlands.'
      ],
      related: ['Netherlands', 'Canals', 'University', 'Dom Tower', 'Bicycle', 'Europe']
    },
    {
      id: 'uluru', title: 'Uluru', emoji: '🪨',
      category: 'Landmark', region: 'Northern Territory, Australia',
      facts: [
        'Uluru is a massive sandstone rock in the Australian Outback — it stands 348 meters high!',
        'Uluru is sacred to the Anangu people, the Aboriginal Australians who have lived there for over 30,000 years.',
        'Uluru appears to change colour throughout the day, turning brilliant orange and red at sunrise and sunset.'
      ],
      related: ['Australia', 'Aboriginal', 'Outback', 'Sacred', 'Red Rock', 'Anangu']
    },
    {
      id: 'ural-mountains', title: 'Ural Mountains', emoji: '🏔️',
      category: 'Nature', region: 'Russia, Europe/Asia',
      facts: [
        'The Ural Mountains form the boundary between Europe and Asia, stretching 2,500 km.',
        'The Urals are one of the oldest mountain ranges on Earth.',
        'The mountains are rich in minerals including gold, platinum, copper, and precious gemstones.'
      ],
      related: ['Russia', 'Europe', 'Asia', 'Continental Divide', 'Mining', 'Gemstones']
    },
  ],

  /* ── V ──────────────────────────────────────────────── */
  V: [
    {
      id: 'vietnam', title: 'Vietnam', emoji: '🇻🇳',
      category: 'Country', region: 'Southeast Asia', capital: 'Hanoi',
      facts: [
        'Vietnam is a long, S-shaped country in Southeast Asia stretching 1,650 km from north to south.',
        'Halong Bay in Vietnam is famous for its thousands of limestone pillars rising from the emerald sea.',
        'Vietnam is the world\'s second-largest exporter of coffee and rice.'
      ],
      related: ['Hanoi', 'Halong Bay', 'Pho', 'Mekong', 'Southeast Asia', 'Coffee']
    },
    {
      id: 'venezuela', title: 'Venezuela', emoji: '🇻🇪',
      category: 'Country', region: 'South America', capital: 'Caracas',
      facts: [
        'Venezuela is home to Angel Falls — the world\'s highest uninterrupted waterfall at 979 meters!',
        'Venezuela has the world\'s largest proven oil reserves.',
        'Venezuela\'s Orinoco River flows through lush savannas called Llanos.'
      ],
      related: ['Caracas', 'Angel Falls', 'Orinoco', 'Savanna', 'Oil', 'Caribbean Coast']
    },
    {
      id: 'vienna', title: 'Vienna', emoji: '🇦🇹',
      category: 'Capital', region: 'Austria, Europe',
      facts: [
        'Vienna is the capital of Austria and is famous for its grand palaces, opera, and classical music.',
        'Vienna was home to famous composers Mozart, Beethoven, Brahms, Schubert, and Strauss.',
        'Vienna is consistently ranked as one of the world\'s most liveable cities.'
      ],
      related: ['Austria', 'Mozart', 'Opera', 'Schönbrunn', 'Danube', 'Waltz']
    },
    {
      id: 'vancouver', title: 'Vancouver', emoji: '🇨🇦',
      category: 'City', region: 'British Columbia, Canada',
      facts: [
        'Vancouver is one of the most beautiful cities in Canada, surrounded by mountains and ocean.',
        'It has a very mild climate for Canada, with rainy winters but rarely any snow.',
        'Vancouver is a very multicultural city — nearly half of its residents were born outside Canada.'
      ],
      related: ['Canada', 'British Columbia', 'Pacific', 'Mountains', 'Diverse', 'Film Industry']
    },
    {
      id: 'venice', title: 'Venice', emoji: '🇮🇹',
      category: 'City', region: 'Italy, Europe',
      facts: [
        'Venice is a magical city in Italy built on 118 small islands connected by canals and bridges.',
        'Instead of cars, people travel by boat through Venice\'s 400+ canals!',
        'Venice is slowly sinking over time, and floods regularly wash through the city\'s famous squares.'
      ],
      related: ['Italy', 'Gondola', 'Canal', 'Carnival', 'Bridge of Sighs', 'Adriatic']
    },
    {
      id: 'victoria-falls', title: 'Victoria Falls', emoji: '🌊',
      category: 'Landmark', region: 'Zambia/Zimbabwe, Africa',
      facts: [
        'Victoria Falls on the Zambezi River is one of the largest and most spectacular waterfalls in the world.',
        'Local people call it "Mosi-oa-Tunya," which means "The Smoke That Thunders."',
        'Victoria Falls is twice as tall as Niagara Falls and creates a mist visible from 50 km away.'
      ],
      related: ['Zambia', 'Zimbabwe', 'Zambezi', 'Africa', 'Waterfall', 'Safari']
    },
    {
      id: 'volcano', title: 'Volcanoes', emoji: '🌋',
      category: 'Nature', region: 'Worldwide',
      facts: [
        'Volcanoes are openings in Earth\'s crust that allow hot magma, ash, and gases to escape.',
        'There are about 1,500 potentially active volcanoes around the world.',
        'Volcanic eruptions have shaped many of the world\'s islands, including Hawaii and Iceland.'
      ],
      related: ['Magma', 'Lava', 'Ring of Fire', 'Hawaii', 'Iceland', 'Earth Science']
    },
  ],

  /* ── W ──────────────────────────────────────────────── */
  W: [
    {
      id: 'wales', title: 'Wales', emoji: '🏴',
      category: 'Country', region: 'United Kingdom, Europe', capital: 'Cardiff',
      facts: [
        'Wales is a country within the United Kingdom, known for its beautiful green valleys and mountains.',
        'Wales has its own language — Welsh — which is one of the oldest languages in Europe!',
        'The Welsh flag features a red dragon, making it one of the most unique national flags.'
      ],
      related: ['Cardiff', 'Welsh Language', 'Dragon', 'UK', 'Celtic', 'Snowdonia']
    },
    {
      id: 'warsaw', title: 'Warsaw', emoji: '🇵🇱',
      category: 'Capital', region: 'Poland, Europe',
      facts: [
        'Warsaw is the capital of Poland and was almost completely destroyed during World War II.',
        'The city was rebuilt after the war and its historic Old Town was declared a UNESCO World Heritage Site.',
        'Warsaw was the birthplace of composer Frédéric Chopin, one of history\'s greatest pianists.'
      ],
      related: ['Poland', 'Old Town', 'Chopin', 'Vistula', 'UNESCO', 'Europe']
    },
    {
      id: 'washington-dc', title: 'Washington D.C.', emoji: '🇺🇸',
      category: 'Capital', region: 'USA, North America',
      facts: [
        'Washington D.C. is the capital of the United States and home to the President (The White House).',
        'D.C. stands for "District of Columbia" — it is not part of any US state.',
        'The National Mall in Washington has many famous monuments, museums, and memorials, all free to visit.'
      ],
      related: ['USA', 'White House', 'Capitol', 'National Mall', 'Smithsonian', 'Monument']
    },
    {
      id: 'wuhan', title: 'Wuhan', emoji: '🇨🇳',
      category: 'City', region: 'China, Asia',
      facts: [
        'Wuhan is a major city in central China and one of the most important industrial and cultural cities in the country.',
        'Wuhan sits where the Yangtze and Han rivers meet.',
        'The city is famous for its hot dry noodles (hot dry noodles are a beloved local breakfast!).'
      ],
      related: ['China', 'Yangtze River', 'Han River', 'Central China', 'Industry', 'Asia']
    },
    {
      id: 'wall-of-china', title: 'Great Wall (continued)', emoji: '🧱',
      category: 'Landmark', region: 'Northern China',
      facts: [
        'The Great Wall of China stretches over 21,000 km — it\'s one of history\'s greatest construction projects.',
        'Parts of the wall were built over 2,000 years ago to protect China from northern invaders.',
        'The wall was built by millions of workers over many different dynasties across hundreds of years.'
      ],
      related: ['China', 'Beijing', 'History', 'Ancient', 'Emperor', 'UNESCO']
    },
    {
      id: 'waterfalls', title: 'Waterfalls of the World', emoji: '🌊',
      category: 'Nature', region: 'Worldwide',
      facts: [
        'Waterfalls form when a river flows over a steep cliff or rock edge and drops down.',
        'Angel Falls in Venezuela is the tallest waterfall in the world at 979 meters.',
        'Waterfalls are home to many unique plants, insects, and animals that love the spray and mist.'
      ],
      related: ['Angel Falls', 'Niagara', 'Victoria Falls', 'River', 'Iguazu', 'Nature']
    },
  ],

  /* ── X ──────────────────────────────────────────────── */
  X: [
    {
      id: 'xian', title: "Xi'an", emoji: '🇨🇳',
      category: 'City', region: 'Shaanxi, China',
      facts: [
        "Xi'an is one of the oldest cities in China and was the capital of the country for over 1,000 years!",
        "The famous Terracotta Army — thousands of life-size clay soldiers — was discovered near Xi'an.",
        "Xi'an was the eastern starting point of the ancient Silk Road trade route."
      ],
      related: ['China', 'Terracotta Army', 'Silk Road', 'Ancient Capital', 'Shaanxi', 'Asia']
    },
    {
      id: 'xiamen', title: 'Xiamen', emoji: '🇨🇳',
      category: 'City', region: 'Fujian, China',
      facts: [
        'Xiamen is a beautiful coastal city in southeast China, known for its clean streets and ocean scenery.',
        'Gulangyu Island, just off Xiamen, is famous for its colonial architecture and no-car streets.',
        'Xiamen is known as one of the most liveable and pleasant cities in China.'
      ],
      related: ['China', 'Fujian', 'Gulangyu Island', 'Coastal', 'Taiwan Strait', 'Asia']
    },
    {
      id: 'xanadu', title: 'Xanadu (Shangdu)', emoji: '🏯',
      category: 'Landmark', region: 'Inner Mongolia, China',
      facts: [
        'Xanadu, also called Shangdu, was the magnificent summer capital of the Mongol emperor Kublai Khan.',
        'The English poet Samuel Taylor Coleridge wrote a famous poem called "Kubla Khan" about this magical place.',
        'The ruins of Xanadu are a UNESCO World Heritage Site in Inner Mongolia, China.'
      ],
      related: ['Mongolia', 'Kublai Khan', 'Mongol Empire', 'Inner Mongolia', 'UNESCO', 'Ancient Ruins']
    },
    {
      id: 'xeric-desert', title: 'Xeric Desert', emoji: '🏜️',
      category: 'Nature', region: 'Worldwide',
      facts: [
        '"Xeric" means very dry — xeric deserts are places where very little rain falls each year.',
        'Desert plants like cacti, succulents, and thorny shrubs have adapted to survive with almost no water.',
        'Deserts cover about one-third of Earth\'s land surface and can be found on every continent.'
      ],
      related: ['Sahara', 'Atacama', 'Gobi', 'Cactus', 'Adaptation', 'Ecosystem']
    },
  ],

  /* ── Y ──────────────────────────────────────────────── */
  Y: [
    {
      id: 'yemen', title: 'Yemen', emoji: '🇾🇪',
      category: 'Country', region: 'Middle East', capital: 'Sanaa',
      facts: [
        'Yemen is located on the southern tip of the Arabian Peninsula, with coasts on the Red Sea and Gulf of Aden.',
        'Yemen has the ancient walled city of Shibam, whose tall mud-brick towers earned it the nickname "Manhattan of the desert."',
        'The island of Socotra, part of Yemen, is home to alien-looking dragon blood trees found nowhere else.'
      ],
      related: ['Sanaa', 'Arabian Peninsula', 'Socotra', 'Dragon Blood Tree', 'Red Sea', 'Ancient']
    },
    {
      id: 'yaounde', title: 'Yaoundé', emoji: '🇨🇲',
      category: 'Capital', region: 'Cameroon, Africa',
      facts: [
        'Yaoundé is the capital of Cameroon, a country in Central/West Africa.',
        'Cameroon is sometimes called "Africa in miniature" because it has every type of landscape found in Africa.',
        'Yaoundé is built on seven hills, giving it beautiful views over the surrounding tropical forests.'
      ],
      related: ['Cameroon', 'Central Africa', 'Tropical', 'Seven Hills', 'Francophone', 'Biodiversity']
    },
    {
      id: 'yokohama', title: 'Yokohama', emoji: '🇯🇵',
      category: 'City', region: 'Japan, Asia',
      facts: [
        'Yokohama is Japan\'s second-largest city and sits right next to Tokyo on Tokyo Bay.',
        'Yokohama has the largest Chinatown in Japan, full of colourful temples, markets, and delicious food.',
        'The city was one of the first Japanese ports to open to foreign trade in the 1850s.'
      ],
      related: ['Japan', 'Tokyo Bay', 'Chinatown', 'Port', 'Asia', 'Trade']
    },
    {
      id: 'yellow-crane-tower', title: 'Yellow Crane Tower', emoji: '🏯',
      category: 'Landmark', region: 'Wuhan, China',
      facts: [
        'The Yellow Crane Tower is a famous ancient tower in Wuhan, China, overlooking the Yangtze River.',
        'It has been rebuilt many times over 1,700 years of history.',
        'The tower is celebrated in Chinese poetry and is considered one of the Four Great Towers of China.'
      ],
      related: ['Wuhan', 'China', 'Yangtze River', 'Ancient', 'Poetry', 'Tang Dynasty']
    },
    {
      id: 'yellowstone', title: 'Yellowstone', emoji: '🌋',
      category: 'Nature', region: 'Wyoming, USA',
      facts: [
        'Yellowstone National Park in the USA is home to the world\'s largest concentration of geysers.',
        'Old Faithful, Yellowstone\'s most famous geyser, erupts about every 90 minutes!',
        'Yellowstone sits on top of a supervolcano — the largest type of volcano on Earth.'
      ],
      related: ['USA', 'Wyoming', 'Geyser', 'Supervolcano', 'National Park', 'Bison']
    },
  ],

  /* ── Z ──────────────────────────────────────────────── */
  Z: [
    {
      id: 'zambia', title: 'Zambia', emoji: '🇿🇲',
      category: 'Country', region: 'Southern Africa', capital: 'Lusaka',
      facts: [
        'Zambia is home to Victoria Falls, one of the world\'s most spectacular waterfalls.',
        'Zambia is a landlocked country in southern Africa rich in wildlife and national parks.',
        'The name Zambia comes from the Zambezi River, one of Africa\'s great rivers.'
      ],
      related: ['Lusaka', 'Victoria Falls', 'Zambezi', 'Safari', 'Africa', 'Wildlife']
    },
    {
      id: 'zimbabwe', title: 'Zimbabwe', emoji: '🇿🇼',
      category: 'Country', region: 'Southern Africa', capital: 'Harare',
      facts: [
        'Zimbabwe shares Victoria Falls with Zambia — it\'s one of the natural wonders of the world.',
        'Zimbabwe has the ancient ruins of Great Zimbabwe, a mysterious stone city built without mortar.',
        'Zimbabwe\'s national symbol is the Zimbabwe bird — a carving found at the Great Zimbabwe ruins.'
      ],
      related: ['Harare', 'Victoria Falls', 'Great Zimbabwe', 'Zambezi', 'Africa', 'Ancient Ruins']
    },
    {
      id: 'zagreb', title: 'Zagreb', emoji: '🇭🇷',
      category: 'Capital', region: 'Croatia, Europe',
      facts: [
        'Zagreb is the capital of Croatia and a charming city with a medieval old town.',
        'Zagreb has a funny museum called the Museum of Broken Relationships!',
        'Croatia is also famous for its beautiful Dalmatian coast and the islands of the Adriatic Sea.'
      ],
      related: ['Croatia', 'Adriatic', 'Dalmatia', 'Medieval', 'Europe', 'Islands']
    },
    {
      id: 'zurich', title: 'Zurich', emoji: '🇨🇭',
      category: 'City', region: 'Switzerland, Europe',
      facts: [
        'Zurich is Switzerland\'s largest city and one of the world\'s leading financial centres.',
        'Switzerland is famous for its Swiss watches, Swiss chocolate, Swiss cheese, and the Alps.',
        'Zurich sits on the beautiful Lake Zurich with the Alps visible in the distance.'
      ],
      related: ['Switzerland', 'Finance', 'Alps', 'Lake Zurich', 'Watches', 'Chocolate']
    },
    {
      id: 'zocalo', title: 'Zócalo', emoji: '⛲',
      category: 'Landmark', region: 'Mexico City, Mexico',
      facts: [
        'The Zócalo is the main public square in the historic centre of Mexico City — one of the largest in the world.',
        'Its full name is Plaza de la Constitución, and it has been an important gathering place for thousands of years.',
        'Aztec ruins, a colonial cathedral, and the National Palace all surround the Zócalo.'
      ],
      related: ['Mexico City', 'Mexico', 'Aztec', 'Cathedral', 'Historic', 'Plaza']
    },
    {
      id: 'zebra-migration', title: 'Zebra Migration', emoji: '🦓',
      category: 'Nature', region: 'Southern/East Africa',
      facts: [
        'Every year, hundreds of thousands of zebras migrate across the plains of Botswana and Zambia — one of Africa\'s great wildlife spectacles.',
        'Zebras are famous for their black-and-white stripes, which are unique to every individual, like a fingerprint.',
        'Zebra herds travel in search of fresh grass and water, following the seasonal rains.'
      ],
      related: ['Botswana', 'Zambia', 'Serengeti', 'Savanna', 'Safari', 'Great Migration']
    },
  ],

};

/* ============================================================
   2. STATE
   ============================================================ */

const state = {
  activeLetter:  'A',
  activeFilter:  'All',
  activeCardId:  null,
  challengeEntry: null,
  challengeHintLevel: 0,
  challengeLastPoint: null,
  challengeSolved: false
};

const FILTERS = ['All', 'Countries', 'Landmarks', 'Capitals', 'Nature', 'Cities'];

const CATEGORY_TO_FILTER = {
  'Country':  'Countries',
  'Landmark': 'Landmarks',
  'Capital':  'Capitals',
  'Nature':   'Nature',
  'City':     'Cities'
};

const LETTER_COLORS = [
  { bg: '#FFD94A', fg: '#7A5C00' },
  { bg: '#FF9BB5', fg: '#7A1038' },
  { bg: '#6DD5B0', fg: '#0A5C3C' },
  { bg: '#85CEFF', fg: '#07436E' },
  { bg: '#C3B1E1', fg: '#3B2060' },
  { bg: '#FF9B72', fg: '#7A2800' },
  { bg: '#A8E6CF', fg: '#0D5434' }
];

const MAP_COORDS = {
  australia: { x: 82, y: 72 }, brazil: { x: 36, y: 66 }, canada: { x: 23, y: 22 }, china: { x: 74, y: 37 },
  egypt: { x: 56, y: 48 }, france: { x: 49, y: 34 }, germany: { x: 51, y: 32 }, india: { x: 68, y: 51 },
  japan: { x: 84, y: 38 }, mexico: { x: 25, y: 45 }, russia: { x: 70, y: 24 }, 'united-states': { x: 23, y: 38 },
  'eiffel-tower': { x: 49, y: 34 }, everest: { x: 70, y: 43 }, 'great-wall': { x: 75, y: 35 }, 'pyramids-giza': { x: 56, y: 48 },
  'statue-of-liberty': { x: 28, y: 38 }, 'taj-mahal': { x: 68, y: 51 }, uluru: { x: 80, y: 72 }, 'victoria-falls': { x: 56, y: 70 }
};

const MAP_REGION_COORDS = [
  { match: /north america|usa|united states|canada|mexico|texas|california|new york|massachusetts|illinois|wyoming|ontario|quebec/i, x: 24, y: 38, label: 'North America' },
  { match: /south america|brazil|argentina|chile|colombia|ecuador|bolivia|venezuela|patagonia/i, x: 35, y: 68, label: 'South America' },
  { match: /caribbean|cuba|haiti|dominican/i, x: 31, y: 48, label: 'the Caribbean' },
  { match: /europe|france|germany|italy|spain|greece|austria|denmark|sweden|switzerland|united kingdom|uk|poland|croatia|romania|hungary|ireland|scotland|wales|iceland|netherlands|belgium|estonia|ukraine|russia/i, x: 51, y: 33, label: 'Europe' },
  { match: /africa|egypt|ghana|algeria|uganda|zambia|zimbabwe|cameroon|congo|sahara|cape town|south africa/i, x: 54, y: 58, label: 'Africa' },
  { match: /middle east|turkey|syria|iraq|uae|qatar|yemen|jordan|israel|arabia|persian gulf/i, x: 61, y: 45, label: 'the Middle East' },
  { match: /asia|china|japan|india|vietnam|thailand|singapore|cambodia|nepal|taiwan|mongolia|armenia|korea|hong kong/i, x: 72, y: 42, label: 'Asia' },
  { match: /oceania|australia|new zealand|pacific|fiji|tuvalu|queensland/i, x: 82, y: 73, label: 'Oceania' },
  { match: /arctic|tundra/i, x: 56, y: 17, label: 'the Arctic' },
  { match: /worldwide|world|oceans/i, x: 50, y: 50, label: 'around the world' }
];

const PROGRESS_KEY = 'atlas-abc-progress-v1';
const XP_PER_LEVEL = 50;
const PASSPORT_EMPTY_SLOTS = 8;
const BADGE_CATEGORIES = [
  { title: 'Country Collector', category: 'Country', emoji: '🌎' },
  { title: 'Landmark Hunter', category: 'Landmark', emoji: '🏛️' },
  { title: 'Nature Explorer', category: 'Nature', emoji: '🌿' },
  { title: 'Capital Finder', category: 'Capital', emoji: '🏙️' }
];


/* ============================================================
   3. DOM REFERENCES
   ============================================================ */

const alphaStrip    = document.querySelector('.alpha-strip');
const filterBar     = document.querySelector('.filter-bar');
const cardsGrid     = document.getElementById('cards-grid');
const emptyState    = document.getElementById('empty-state');
const letterBadge   = document.getElementById('letter-badge');
const letterTitle   = document.getElementById('letter-title');
const letterCount   = document.getElementById('letter-count');

const modalOverlay  = document.getElementById('modal-overlay');
const modalClose    = document.getElementById('modal-close');
const modalEmoji    = document.getElementById('modal-emoji');
const modalCatPill  = document.getElementById('modal-category-pill');
const modalTitle    = document.getElementById('modal-title');
const modalLocation = document.getElementById('modal-location');
const modalCapital  = document.getElementById('modal-capital');
const modalFacts    = document.getElementById('modal-facts');
const modalRelated  = document.getElementById('modal-related');
const mapChallengeOpen = document.getElementById('map-challenge-open');

const challengeOverlay  = document.getElementById('challenge-overlay');
const challengeClose    = document.getElementById('challenge-close');
const challengeTitle    = document.getElementById('challenge-title');
const challengeSubtitle = document.getElementById('challenge-subtitle');
const challengeMap      = document.getElementById('challenge-map');
const explorerPin       = document.getElementById('explorer-pin');
const targetGlow        = document.getElementById('target-glow');
const successBurst      = document.getElementById('success-burst');
const challengeFeedback = document.getElementById('challenge-feedback');
const challengeHint     = document.getElementById('challenge-hint');
const challengeTry      = document.getElementById('challenge-try');
const challengeShow     = document.getElementById('challenge-show');
const challengeDone     = document.getElementById('challenge-done');

const rewardLevel       = document.getElementById('reward-level');
const rewardXp          = document.getElementById('reward-xp');
const rewardStamps      = document.getElementById('reward-stamps');
const rewardMissions    = document.getElementById('reward-missions');
const rewardProgressFill = document.getElementById('reward-progress-fill');
const passportOpen      = document.getElementById('passport-open');
const passportOverlay   = document.getElementById('passport-overlay');
const passportClose     = document.getElementById('passport-close');
const passportBadges    = document.getElementById('passport-badges');
const passportStamps    = document.getElementById('passport-stamps');
const passportDiscoveries = document.getElementById('passport-discoveries');
const rewardFeedbackLayer = document.getElementById('reward-feedback-layer');

/* ============================================================
   4. PROGRESS / REWARDS
   ============================================================ */

const progress = loadProgress();

function createProgress() {
  return { xp: 0, discovered: [], stamps: [], completedChallenges: [] };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? { ...createProgress(), ...JSON.parse(raw) } : createProgress();
  } catch {
    return createProgress();
  }
}

function saveProgress() {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch { /* ignore storage errors */ }
}

function getExplorerLevel() {
  return Math.floor(progress.xp / XP_PER_LEVEL) + 1;
}

function awardXp(amount, label) {
  progress.xp += amount;
  saveProgress();
  renderRewardBar();
  showRewardFloat(`+${amount} XP`, label || '');
}

function awardDiscovery(entry) {
  if (progress.discovered.includes(entry.id)) return;
  progress.discovered.push(entry.id);
  awardXp(5, 'New discovery');
}

function awardChallengeComplete(entry) {
  if (progress.completedChallenges.includes(entry.id)) return;
  progress.completedChallenges.push(entry.id);
  progress.stamps.push({ id: entry.id, title: entry.title, emoji: entry.emoji, category: entry.category });
  awardXp(10, 'Mission complete');
  showStampPop(entry);
}

function renderRewardBar() {
  const level = getExplorerLevel();
  rewardLevel.textContent = level;
  rewardXp.textContent = progress.xp;
  rewardStamps.textContent = progress.stamps.length;
  rewardMissions.textContent = progress.completedChallenges.length;
  if (rewardProgressFill) {
    rewardProgressFill.style.width = `${(progress.xp % XP_PER_LEVEL) / XP_PER_LEVEL * 100}%`;
  }
}

function showRewardFloat(amount, label) {
  const node = document.createElement('div');
  node.className = 'xp-float';
  node.textContent = label ? `${amount} · ${label}` : amount;
  rewardFeedbackLayer.appendChild(node);
  node.addEventListener('animationend', () => node.remove(), { once: true });
}

function showStampPop(entry) {
  const node = document.createElement('div');
  node.className = 'stamp-pop';
  node.textContent = `${entry.emoji} Passport stamp!`;
  rewardFeedbackLayer.appendChild(node);
  node.addEventListener('animationend', () => node.remove(), { once: true });
}

function renderPassport() {
  const discoveredEntries = progress.discovered.map(findEntryById).filter(Boolean);
  passportBadges.innerHTML = BADGE_CATEGORIES.map(badge => {
    const count = discoveredEntries.filter(entry => entry.category === badge.category).length;
    return `
      <div class="passport-badge">
        <strong>${badge.emoji} ${badge.title}</strong>
        <span>${count} discovered</span>
      </div>
    `;
  }).join('');

  const stampCards = progress.stamps.map(stamp => `
    <div class="passport-stamp">
      <div><strong>${stamp.emoji}</strong><br>${escapeHtml(stamp.title)}</div>
    </div>
  `);
  const emptyCount = Math.max(PASSPORT_EMPTY_SLOTS - stampCards.length, 0);
  passportStamps.innerHTML = stampCards.join('') + Array.from({ length: emptyCount }, () => '<div class="passport-empty">Empty<br>stamp slot</div>').join('');

  passportDiscoveries.innerHTML = discoveredEntries.length
    ? discoveredEntries.map(entry => `
        <div class="passport-discovery">
          <strong>${entry.emoji} ${escapeHtml(entry.title)}</strong>
          <span>${escapeHtml(entry.category)} · ${escapeHtml(entry.region)}</span>
        </div>
      `).join('')
    : '<div class="passport-empty">Open a place card to start your passport.</div>';
}

function openPassport() {
  renderPassport();
  passportOverlay.hidden = false;
  requestAnimationFrame(() => passportClose.focus());
}

function closePassport() {
  passportOverlay.hidden = true;
  passportOpen.focus();
}

/* ============================================================
   5. RENDER FUNCTIONS
   ============================================================ */

function renderAlphaStrip() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  alphaStrip.innerHTML = '';

  letters.forEach(letter => {
    const btn = document.createElement('button');
    btn.className   = 'alpha-btn' + (letter === state.activeLetter ? ' active' : '');
    btn.textContent = letter;
    btn.setAttribute('aria-label', `Explore letter ${letter}`);
    btn.setAttribute('aria-pressed', letter === state.activeLetter ? 'true' : 'false');
    btn.setAttribute('role', 'listitem');

    btn.addEventListener('click', () => {
      state.activeLetter = letter;
      state.activeFilter = 'All';
      renderAlphaStrip();
      renderFilterBar();
      renderCards();
      updateLetterHeading();
    });

    alphaStrip.appendChild(btn);
  });
}

function renderFilterBar() {
  filterBar.innerHTML = '';

  FILTERS.forEach(filter => {
    const btn = document.createElement('button');
    btn.className   = 'filter-btn' + (filter === state.activeFilter ? ' active' : '');
    btn.textContent = filter;
    btn.setAttribute('role', 'listitem');
    btn.setAttribute('aria-pressed', filter === state.activeFilter ? 'true' : 'false');
    btn.setAttribute('aria-label', `Filter by ${filter}`);

    btn.addEventListener('click', () => {
      state.activeFilter = filter;
      renderFilterBar();
      renderCards();
    });

    filterBar.appendChild(btn);
  });
}

function updateLetterHeading() {
  const letter   = state.activeLetter;
  const allCards = explorerData[letter] || [];

  const colorIndex = (letter.charCodeAt(0) - 65) % LETTER_COLORS.length;
  const color = LETTER_COLORS[colorIndex];
  letterBadge.textContent = letter;
  letterBadge.style.background = `linear-gradient(135deg, ${color.bg}, ${adjustColor(color.bg, -20)})`;
  letterBadge.style.borderBottomColor = adjustColor(color.bg, -40);

  letterTitle.textContent = `Exploring the letter ${letter}`;
  letterCount.textContent = allCards.length
    ? `${allCards.length} explorer card${allCards.length !== 1 ? 's' : ''} found`
    : '';
}

function adjustColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

function getFilteredCards() {
  const entries = explorerData[state.activeLetter] || [];
  if (state.activeFilter === 'All') return entries;
  return entries.filter(e => CATEGORY_TO_FILTER[e.category] === state.activeFilter);
}

function renderCards() {
  cardsGrid.innerHTML = '';
  const cards = getFilteredCards();

  if (cards.length === 0) {
    cardsGrid.hidden  = true;
    emptyState.hidden = false;
    return;
  }

  cardsGrid.hidden  = false;
  emptyState.hidden = true;

  cards.forEach((entry, index) => {
    const card = buildCard(entry, index);
    cardsGrid.appendChild(card);
  });
}

function buildCard(entry, index) {
  const card = document.createElement('article');
  const isSelected = entry.id === state.activeCardId;
  card.className        = 'explorer-card' + (isSelected ? ' selected' : '');
  card.dataset.category = entry.category;
  card.dataset.entryId  = entry.id;
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Open ${entry.title} explorer card`);
  card.setAttribute('aria-current', isSelected ? 'true' : 'false');
  card.style.animationDelay = `${index * 0.07}s`;

  const shortFact = entry.facts[0];

  card.innerHTML = `
    <span class="card-xp" aria-hidden="true">+10 XP</span>
    <div class="card-inner">
      <p class="card-series">Explorer Card</p>
      <div class="card-header">
        <span class="card-emoji" aria-hidden="true">${entry.emoji}</span>
        <span class="card-category-badge badge-${entry.category}" aria-label="Category: ${entry.category}">
          ${entry.category}
        </span>
      </div>
      <h3 class="card-title">${escapeHtml(entry.title)}</h3>
      <p class="card-region">${escapeHtml(entry.region)}</p>
      <p class="card-fact">${escapeHtml(shortFact)}</p>
      <button class="card-explore-btn" aria-label="Explore ${escapeHtml(entry.title)} in detail">
        <span aria-hidden="true">🔍</span> Explore
      </button>
    </div>
  `;

  const openModal = () => openDetailModal(entry);
  card.addEventListener('click', openModal);
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(); }
  });

  return card;
}

/* ============================================================
   6. MODAL / DETAIL PANEL
   ============================================================ */

function openDetailModal(entry) {
  state.activeCardId = entry.id;
  awardDiscovery(entry);

  modalEmoji.textContent   = entry.emoji;
  modalTitle.textContent   = entry.title;
  modalCatPill.textContent = entry.category;
  modalCatPill.className   = `modal-category-pill badge-${entry.category}`;
  modalLocation.innerHTML  = `<span aria-hidden="true">📍</span> ${escapeHtml(entry.region)}`;

  if (entry.capital) {
    modalCapital.innerHTML = `<span aria-hidden="true">🏛️</span> Capital: <strong>${escapeHtml(entry.capital)}</strong>`;
    modalCapital.hidden    = false;
  } else {
    modalCapital.hidden = true;
  }

  modalFacts.innerHTML = entry.facts.map(fact => `
    <div class="modal-fact-item">
      <span class="fact-bullet" aria-hidden="true">⭐</span>
      <span>${escapeHtml(fact)}</span>
    </div>
  `).join('');

  if (entry.related && entry.related.length) {
    modalRelated.innerHTML = `
      <p class="modal-related-label">Related words</p>
      <div class="related-tags">
        ${entry.related.map(w => `<span class="related-tag">${escapeHtml(w)}</span>`).join('')}
      </div>
    `;
    modalRelated.hidden = false;
  } else {
    modalRelated.hidden = true;
  }

  modalOverlay.hidden = false;
  document.body.classList.add('detail-panel-open');
  syncActiveCardState();
}

function closeDetailModal() {
  modalOverlay.hidden = true;
  state.activeCardId  = null;
  document.body.classList.remove('detail-panel-open');
  syncActiveCardState();
}

function syncActiveCardState() {
  cardsGrid.querySelectorAll('.explorer-card').forEach(card => {
    const isSelected = card.dataset.entryId === state.activeCardId;
    card.classList.toggle('selected', isSelected);
    card.setAttribute('aria-current', isSelected ? 'true' : 'false');
  });
}


/* ============================================================
   6. MAP CHALLENGE
   ============================================================ */

function findEntryById(id) {
  for (const entries of Object.values(explorerData)) {
    const match = entries.find(entry => entry.id === id);
    if (match) return match;
  }
  return null;
}

function getMapPoint(entry) {
  if (MAP_COORDS[entry.id]) {
    return { ...MAP_COORDS[entry.id], label: entry.region };
  }

  const source = `${entry.title} ${entry.region} ${entry.related ? entry.related.join(' ') : ''}`;
  const match = MAP_REGION_COORDS.find(item => item.match.test(source));
  return match ? { x: match.x, y: match.y, label: match.label } : { x: 50, y: 50, label: 'the world map' };
}

function openMapChallenge(entry) {
  state.challengeEntry = entry;
  state.challengeHintLevel = 0;
  state.challengeLastPoint = null;
  state.challengeSolved = false;

  challengeTitle.textContent = `Find ${entry.title}!`;
  challengeSubtitle.textContent = 'Tap the map to drop your explorer pin.';
  challengeFeedback.textContent = 'Drop your pin anywhere on the map.';
  challengeFeedback.classList.remove('success');
  explorerPin.hidden = true;
  targetGlow.hidden = true;
  successBurst.hidden = true;
  challengeOverlay.hidden = false;

  requestAnimationFrame(() => challengeMap.focus());
}

function closeMapChallenge() {
  challengeOverlay.hidden = true;
  state.challengeEntry = null;
  mapChallengeOpen?.focus();
}

function setMapMarker(el, point) {
  el.style.setProperty('--pin-x', `${point.x}%`);
  el.style.setProperty('--pin-y', `${point.y}%`);
}

function handleMapGuess(clientX, clientY) {
  if (!state.challengeEntry) return;

  const rect = challengeMap.getBoundingClientRect();
  const guess = {
    x: Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)),
    y: Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100))
  };
  const target = getMapPoint(state.challengeEntry);
  const distance = Math.hypot(guess.x - target.x, guess.y - target.y);

  state.challengeLastPoint = guess;
  setMapMarker(explorerPin, guess);
  explorerPin.hidden = false;
  explorerPin.style.animation = 'none';
  explorerPin.offsetHeight;
  explorerPin.style.animation = '';

  if (distance <= 11) {
    state.challengeSolved = true;
    awardChallengeComplete(state.challengeEntry);
    challengeFeedback.textContent = `Great job! You found ${state.challengeEntry.title}!`;
    challengeFeedback.classList.add('success');
    setMapMarker(successBurst, guess);
    successBurst.hidden = false;
    successBurst.style.animation = 'none';
    successBurst.offsetHeight;
    successBurst.style.animation = '';
    return;
  }

  challengeFeedback.classList.remove('success');
  challengeFeedback.textContent = getDirectionalFeedback(guess, target);
}

function getDirectionName(from, target) {
  const eastWest = target.x > from.x + 8 ? 'east' : target.x < from.x - 8 ? 'west' : '';
  const northSouth = target.y > from.y + 8 ? 'south' : target.y < from.y - 8 ? 'north' : '';
  return [northSouth, eastWest].filter(Boolean).join(eastWest && northSouth ? '-' : '');
}

function getDirectionalFeedback(from, target) {
  const direction = getDirectionName(from, target);

  if (!direction) return 'So close! Try just a little nearby.';
  return `Nice explorer move. Try a little farther ${direction}.`;
}

function showChallengeHint() {
  if (!state.challengeEntry) return;

  state.challengeHintLevel = Math.min(3, state.challengeHintLevel + 1);
  const target = getMapPoint(state.challengeEntry);

  if (state.challengeHintLevel === 1) {
    challengeFeedback.classList.remove('success');
    challengeFeedback.textContent = `Hint 1: Look around ${target.label}.`;
    return;
  }

  if (state.challengeHintLevel === 2) {
    const start = state.challengeLastPoint || { x: 50, y: 50 };
    const direction = getDirectionName(start, target);
    challengeFeedback.textContent = direction
      ? `Hint 2: From your last pin, go ${direction}.`
      : 'Hint 2: You are very close. Try nearby.';
    return;
  }

  challengeFeedback.textContent = 'Hint 3: The glowing explorer zone is your target area.';
  setMapMarker(targetGlow, target);
  targetGlow.hidden = false;
}

function resetChallengeGuess() {
  state.challengeLastPoint = null;
  state.challengeSolved = false;
  explorerPin.hidden = true;
  successBurst.hidden = true;
  challengeFeedback.classList.remove('success');
  challengeFeedback.textContent = 'Try again. Drop your explorer pin on the map.';
}

function showChallengeAnswer() {
  if (!state.challengeEntry) return;

  const target = getMapPoint(state.challengeEntry);
  setMapMarker(targetGlow, target);
  setMapMarker(explorerPin, target);
  targetGlow.hidden = false;
  explorerPin.hidden = false;
  challengeFeedback.classList.add('success');
  challengeFeedback.textContent = `${state.challengeEntry.title} is right here on the explorer map!`;
}

/* ============================================================
   7. EVENT WIRING
   ============================================================ */

modalClose.addEventListener('click', closeDetailModal);

mapChallengeOpen.addEventListener('click', () => {
  const entry = findEntryById(state.activeCardId);
  if (entry) openMapChallenge(entry);
});

challengeClose.addEventListener('click', closeMapChallenge);
challengeOverlay.addEventListener('click', e => {
  if (e.target === challengeOverlay) closeMapChallenge();
});
challengeDone.addEventListener('click', closeMapChallenge);
passportOpen.addEventListener('click', openPassport);
passportClose.addEventListener('click', closePassport);
passportOverlay.addEventListener('click', e => {
  if (e.target === passportOverlay) closePassport();
});
challengeHint.addEventListener('click', showChallengeHint);
challengeTry.addEventListener('click', resetChallengeGuess);
challengeShow.addEventListener('click', showChallengeAnswer);
challengeMap.addEventListener('click', e => handleMapGuess(e.clientX, e.clientY));
challengeMap.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    const rect = challengeMap.getBoundingClientRect();
    handleMapGuess(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !passportOverlay.hidden) {
    closePassport();
    return;
  }
  if (e.key === 'Escape' && !challengeOverlay.hidden) {
    closeMapChallenge();
    return;
  }
  if (e.key === 'Escape' && !modalOverlay.hidden) closeDetailModal();
});

/* ============================================================
   8. UTILITY
   ============================================================ */

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;');
}

/* ============================================================
   9. INIT
   ============================================================ */

function init() {
  renderRewardBar();
  renderAlphaStrip();
  renderFilterBar();
  updateLetterHeading();
  renderCards();
}

document.addEventListener('DOMContentLoaded', init);
