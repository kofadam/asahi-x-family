// Katakana characters organized by learning progression
export const katakanaData = {
  // Basic vowels - start here
  vowels: [
    { katakana: 'ア', romaji: 'a', sound: '/a/' },
    { katakana: 'イ', romaji: 'i', sound: '/i/' },
    { katakana: 'ウ', romaji: 'u', sound: '/ɯ/' },
    { katakana: 'エ', romaji: 'e', sound: '/e/' },
    { katakana: 'オ', romaji: 'o', sound: '/o/' }
  ],

  // K-sounds (ka, ki, ku, ke, ko)
  kSounds: [
    { katakana: 'カ', romaji: 'ka', sound: '/ka/' },
    { katakana: 'キ', romaji: 'ki', sound: '/ki/' },
    { katakana: 'ク', romaji: 'ku', sound: '/kɯ/' },
    { katakana: 'ケ', romaji: 'ke', sound: '/ke/' },
    { katakana: 'コ', romaji: 'ko', sound: '/ko/' }
  ],

  // S-sounds
  sSounds: [
    { katakana: 'サ', romaji: 'sa', sound: '/sa/' },
    { katakana: 'シ', romaji: 'shi', sound: '/ʃi/' },
    { katakana: 'ス', romaji: 'su', sound: '/sɯ/' },
    { katakana: 'セ', romaji: 'se', sound: '/se/' },
    { katakana: 'ソ', romaji: 'so', sound: '/so/' }
  ],

  // T-sounds
  tSounds: [
    { katakana: 'タ', romaji: 'ta', sound: '/ta/' },
    { katakana: 'チ', romaji: 'chi', sound: '/tʃi/' },
    { katakana: 'ツ', romaji: 'tsu', sound: '/tsɯ/' },
    { katakana: 'テ', romaji: 'te', sound: '/te/' },
    { katakana: 'ト', romaji: 'to', sound: '/to/' }
  ],

  // N-sounds
  nSounds: [
    { katakana: 'ナ', romaji: 'na', sound: '/na/' },
    { katakana: 'ニ', romaji: 'ni', sound: '/ni/' },
    { katakana: 'ヌ', romaji: 'nu', sound: '/nɯ/' },
    { katakana: 'ネ', romaji: 'ne', sound: '/ne/' },
    { katakana: 'ノ', romaji: 'no', sound: '/no/' }
  ],

  // H-sounds
  hSounds: [
    { katakana: 'ハ', romaji: 'ha', sound: '/ha/' },
    { katakana: 'ヒ', romaji: 'hi', sound: '/hi/' },
    { katakana: 'フ', romaji: 'fu', sound: '/ɸɯ/' },
    { katakana: 'ヘ', romaji: 'he', sound: '/he/' },
    { katakana: 'ホ', romaji: 'ho', sound: '/ho/' }
  ],

  // M-sounds
  mSounds: [
    { katakana: 'マ', romaji: 'ma', sound: '/ma/' },
    { katakana: 'ミ', romaji: 'mi', sound: '/mi/' },
    { katakana: 'ム', romaji: 'mu', sound: '/mɯ/' },
    { katakana: 'メ', romaji: 'me', sound: '/me/' },
    { katakana: 'モ', romaji: 'mo', sound: '/mo/' }
  ],

  // Y-sounds
  ySounds: [
    { katakana: 'ヤ', romaji: 'ya', sound: '/ja/' },
    { katakana: 'ユ', romaji: 'yu', sound: '/jɯ/' },
    { katakana: 'ヨ', romaji: 'yo', sound: '/jo/' }
  ],

  // R-sounds
  rSounds: [
    { katakana: 'ラ', romaji: 'ra', sound: '/ɾa/' },
    { katakana: 'リ', romaji: 'ri', sound: '/ɾi/' },
    { katakana: 'ル', romaji: 'ru', sound: '/ɾɯ/' },
    { katakana: 'レ', romaji: 're', sound: '/ɾe/' },
    { katakana: 'ロ', romaji: 'ro', sound: '/ɾo/' }
  ],

  // W-sounds and N
  misc: [
    { katakana: 'ワ', romaji: 'wa', sound: '/wa/' },
    { katakana: 'ヲ', romaji: 'wo', sound: '/wo/' },
    { katakana: 'ン', romaji: 'n', sound: '/n/' }
  ]
}

// Anime-inspired katakana words for practice
export const katakanaWords = {
  beginner: [
    { katakana: 'アニメ', romaji: 'anime', english: 'anime', animeContext: '🎌 The word that started it all!' },
    { katakana: 'マンガ', romaji: 'manga', english: 'manga', animeContext: '📚 Japanese comics you love' },
    { katakana: 'ヒーロー', romaji: 'hiiroo', english: 'hero', animeContext: '🦸 Like your favorite anime protagonists' },
    { katakana: 'カメラ', romaji: 'kamera', english: 'camera', animeContext: '📸 For taking photos at Akihabara!' },
    { katakana: 'コーヒー', romaji: 'koohii', english: 'coffee', animeContext: '☕ Fuel for anime marathons' },
    { katakana: 'ゲーム', romaji: 'geemu', english: 'game', animeContext: '🎮 Japanese video games' },
    { katakana: 'フィギュア', romaji: 'figyua', english: 'figure', animeContext: '🗿 Anime character figures' },
    { katakana: 'コスプレ', romaji: 'kosupure', english: 'cosplay', animeContext: '👘 Dressing as anime characters' }
  ],

  intermediate: [
    { katakana: 'アキハバラ', romaji: 'akihabara', english: 'Akihabara', animeContext: '🏙️ Tokyo\'s anime district' },
    { katakana: 'オタク', romaji: 'otaku', english: 'otaku', animeContext: '🤓 Passionate anime fan (wear it proudly!)' },
    { katakana: 'ライトノベル', romaji: 'raito noberu', english: 'light novel', animeContext: '📖 Source material for many anime' },
    { katakana: 'ボーカロイド', romaji: 'bookaroido', english: 'Vocaloid', animeContext: '🎵 Like Hatsune Miku!' },
    { katakana: 'イベント', romaji: 'ibento', english: 'event', animeContext: '🎪 Anime conventions and festivals' }
  ],

  animeSpecific: [
    { katakana: 'ナルト', romaji: 'naruto', english: 'Naruto', animeContext: '🍥 The ninja who never gives up' },
    { katakana: 'ピカチュウ', romaji: 'pikachuu', english: 'Pikachu', animeContext: '⚡ Everyone\'s favorite electric mouse' },
    { katakana: 'ドラゴンボール', romaji: 'doragon booru', english: 'Dragon Ball', animeContext: '🐉 Classic battle anime' },
    { katakana: 'ガンダム', romaji: 'gandamu', english: 'Gundam', animeContext: '🤖 Giant mecha series' },
    { katakana: 'セーラームーン', romaji: 'seeraa muun', english: 'Sailor Moon', animeContext: '🌙 Magical girl classic' }
  ]
}

// Generate random katakana for practice
export const getRandomKatakana = (groups = ['vowels']) => {
  const selectedChars = []
  groups.forEach(group => {
    if (katakanaData[group]) {
      selectedChars.push(...katakanaData[group])
    }
  })
  return selectedChars[Math.floor(Math.random() * selectedChars.length)]
}

// Generate practice sets with better distribution
export const generatePracticeSet = (groups, count = 10) => {
  const chars = []
  groups.forEach(group => {
    if (katakanaData[group]) {
      chars.push(...katakanaData[group])
    }
  })

  const practiceSet = []

  // First, ensure each character appears at least once if count >= chars.length
  if (count >= chars.length) {
    // Add each character once
    practiceSet.push(...chars)
    // Fill remaining slots
    const remaining = count - chars.length
    for (let i = 0; i < remaining; i++) {
      const randomChar = chars[Math.floor(Math.random() * chars.length)]
      practiceSet.push(randomChar)
    }
  } else {
    // For smaller counts, select random characters avoiding immediate repetition
    for (let i = 0; i < count; i++) {
      let attempts = 0
      let randomChar
      do {
        randomChar = chars[Math.floor(Math.random() * chars.length)]
        attempts++
      } while (attempts < 10 && i > 0 && practiceSet[i - 1].romaji === randomChar.romaji)

      practiceSet.push(randomChar)
    }
  }

  // Shuffle the array to randomize order while maintaining distribution
  return practiceSet.sort(() => Math.random() - 0.5)
}