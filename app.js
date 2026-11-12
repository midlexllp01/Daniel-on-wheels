/**
 * DLSO BENIN REGION — "DANIEL ON THE WHEELS"
 * Christian Bible Quiz & Wheel Game Show Engine (50 Book of Daniel Questions Edition)
 */

const STORAGE_KEY = 'dlso_benin_wheel_game_v2_50q';

function cloneData(value) {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

// 50 Complete Bible Quiz Questions from the Book of Daniel (Chapters 1 to 12)
// Mix of Multiple Choice ('mcq') and Short Answer ('short')
const DEFAULT_QUESTIONS = [
  // --- CHAPTER 1: FAITHFULNESS IN BABYLON (Q1 - Q6) ---
  {
    id: 'q1',
    type: 'mcq',
    category: 'Daniel Ch. 1',
    points: 10,
    timer: 30,
    prompt: 'In the third year of the reign of which king of Judah did Nebuchadnezzar king of Babylon come unto Jerusalem and besiege it?',
    options: ['Jehoiakim', 'Zedekiah', 'Josiah', 'Jehoiachin'],
    correctIndex: 0,
    answer: 'Jehoiakim',
    reference: 'Daniel 1:1 — "In the third year of the reign of Jehoiakim king of Judah came Nebuchadnezzar king of Babylon unto Jerusalem, and besieged it."',
    answered: false
  },
  {
    id: 'q2',
    type: 'short',
    category: 'Daniel Ch. 1',
    points: 10,
    timer: 25,
    prompt: 'What was the name of the master of the eunuchs whom King Nebuchadnezzar instructed to bring in certain of the children of Israel?',
    options: [],
    correctIndex: 0,
    answer: 'Ashpenaz',
    reference: 'Daniel 1:3 — "And the king spake unto Ashpenaz the master of his eunuchs, that he should bring certain of the children of Israel..."',
    answered: false
  },
  {
    id: 'q3',
    type: 'mcq',
    category: 'Daniel Ch. 1',
    points: 10,
    timer: 25,
    prompt: 'For how many years were Daniel and his companions to be nourished and taught the learning and tongue of the Chaldeans before standing before the king?',
    options: ['One year', 'Two years', 'Three years', 'Seven years'],
    correctIndex: 2,
    answer: 'Three years',
    reference: 'Daniel 1:5 — "...so nourishing them three years, that at the end thereof they might stand before the king."',
    answered: false
  },
  {
    id: 'q4',
    type: 'short',
    category: 'Daniel Ch. 1',
    points: 15,
    timer: 30,
    prompt: 'What were the four Babylonian names given to Daniel, Hananiah, Mishael, and Azariah?',
    options: [],
    correctIndex: 0,
    answer: 'Belteshazzar, Shadrach, Meshach, and Abednego',
    reference: 'Daniel 1:7 — "...he gave unto Daniel the name of Belteshazzar; and to Hananiah, of Shadrach; and to Mishael, of Meshach; and to Azariah, of Abed-nego."',
    answered: false
  },
  {
    id: 'q5',
    type: 'mcq',
    category: 'Daniel Ch. 1',
    points: 10,
    timer: 25,
    prompt: 'Unto whom did Ashpenaz appoint the care of Daniel, Hananiah, Mishael, and Azariah, whom Daniel asked for a 10-day test of pulse and water?',
    options: ['Arioch', 'Melzar', 'Nebuzaradan', 'Haman'],
    correctIndex: 1,
    answer: 'Melzar',
    reference: 'Daniel 1:11–12 — "Then said Daniel to Melzar, whom the prince of the eunuchs had set over Daniel, Hananiah, Mishael, and Azariah, Prove thy servants, I beseech thee, ten days..."',
    answered: false
  },
  {
    id: 'q6',
    type: 'short',
    category: 'Daniel Ch. 1',
    points: 15,
    timer: 30,
    prompt: 'In all matters of wisdom and understanding that the king enquired of them, how many times better did he find Daniel and his three friends than all the magicians and astrologers in his realm?',
    options: [],
    correctIndex: 0,
    answer: 'Ten times better (10 times)',
    reference: 'Daniel 1:20 — "...he found them ten times better than all the magicians and astrologers that were in all his realm."',
    answered: false
  },

  // --- CHAPTER 2: NEBUCHADNEZZAR'S DREAM OF THE GREAT IMAGE (Q7 - Q12) ---
  {
    id: 'q7',
    type: 'mcq',
    category: 'Daniel Ch. 2',
    points: 10,
    timer: 25,
    prompt: 'In which language did the Chaldeans speak to King Nebuchadnezzar in Daniel 2:4 when they said, "O king, live for ever: tell thy servants the dream"?',
    options: ['Hebrew', 'Greek', 'Syriack (Aramaic)', 'Persian'],
    correctIndex: 2,
    answer: 'Syriack (Aramaic)',
    reference: 'Daniel 2:4 — "Then spake the Chaldeans to the king in Syriack, O king, live for ever: tell thy servants the dream..."',
    answered: false
  },
  {
    id: 'q8',
    type: 'short',
    category: 'Daniel Ch. 2',
    points: 15,
    timer: 30,
    prompt: 'What was the name of the captain of the king’s guard who went forth to slay the wise men of Babylon in Daniel chapter 2?',
    options: [],
    correctIndex: 0,
    answer: 'Arioch',
    reference: 'Daniel 2:14 — "Then Daniel answered with counsel and wisdom to Arioch the captain of the king’s guard, which was gone forth to slay the wise men of Babylon."',
    answered: false
  },
  {
    id: 'q9',
    type: 'mcq',
    category: 'Daniel Ch. 2',
    points: 15,
    timer: 30,
    prompt: 'In Nebuchadnezzar’s dream of the great image (Daniel 2), what were the five materials of the image from top to bottom?',
    options: [
      'Gold, Silver, Brass, Iron, and Iron mixed with Miry Clay',
      'Gold, Brass, Silver, Iron, and Bronze',
      'Gold, Silver, Iron, Copper, and Stone',
      'Silver, Gold, Brass, Clay, and Iron'
    ],
    correctIndex: 0,
    answer: 'Gold, Silver, Brass, Iron, and Iron mixed with Miry Clay',
    reference: 'Daniel 2:32–33 — "This image’s head was of fine gold, his breast and his arms of silver, his belly and his thighs of brass, His legs of iron, his feet part of iron and part of clay."',
    answered: false
  },
  {
    id: 'q10',
    type: 'short',
    category: 'Daniel Ch. 2',
    points: 15,
    timer: 30,
    prompt: 'In Nebuchadnezzar’s dream, what struck the image upon its feet of iron and clay and brake them to pieces?',
    options: [],
    correctIndex: 0,
    answer: 'A stone cut out without hands',
    reference: 'Daniel 2:34 — "Thou sawest till that a stone was cut out without hands, which smote the image upon his feet that were of iron and clay, and brake them to pieces."',
    answered: false
  },
  {
    id: 'q11',
    type: 'mcq',
    category: 'Daniel Ch. 2',
    points: 15,
    timer: 30,
    prompt: 'What did the stone that smote the image become after breaking the iron, clay, brass, silver, and gold to pieces?',
    options: [
      'A river of fire filling the earth',
      'A great mountain that filled the whole earth',
      'A golden temple in Jerusalem',
      'A pillar of cloud reaching to heaven'
    ],
    correctIndex: 1,
    answer: 'A great mountain that filled the whole earth',
    reference: 'Daniel 2:35 — "...and the stone that smote the image became a great mountain, and filled the whole earth."',
    answered: false
  },
  {
    id: 'q12',
    type: 'short',
    category: 'Daniel Ch. 2',
    points: 15,
    timer: 30,
    prompt: 'After Daniel interpreted the dream in Chapter 2, the king made him ruler over the whole province of Babylon and what other position over all the wise men?',
    options: [],
    correctIndex: 0,
    answer: 'Chief of the governors over all the wise men of Babylon',
    reference: 'Daniel 2:48 — "Then the king made Daniel a great man... and made him ruler over the whole province of Babylon, and chief of the governors over all the wise men of Babylon."',
    answered: false
  },

  // --- CHAPTER 3: THE GOLDEN IMAGE & FIERY FURNACE (Q13 - Q17) ---
  {
    id: 'q13',
    type: 'mcq',
    category: 'Daniel Ch. 3',
    points: 15,
    timer: 30,
    prompt: 'What were the dimensions (height and breadth) and location of the image of gold that King Nebuchadnezzar set up in Daniel chapter 3?',
    options: [
      '30 cubits high, 3 cubits broad, in the valley of Kidron',
      '60 cubits high, 6 cubits broad, in the plain of Dura',
      '50 cubits high, 5 cubits broad, in the plain of Shinar',
      '100 cubits high, 10 cubits broad, before the palace gate'
    ],
    correctIndex: 1,
    answer: '60 cubits high, 6 cubits broad, in the plain of Dura',
    reference: 'Daniel 3:1 — "Nebuchadnezzar the king made an image of gold, whose height was threescore cubits, and the breadth thereof six cubits: he set it up in the plain of Dura..."',
    answered: false
  },
  {
    id: 'q14',
    type: 'mcq',
    category: 'Daniel Ch. 3',
    points: 10,
    timer: 25,
    prompt: 'How many times hotter than it was wont to be heated did Nebuchadnezzar command the burning fiery furnace to be heated?',
    options: ['Three times hotter', 'Five times hotter', 'Seven times hotter', 'Ten times hotter'],
    correctIndex: 2,
    answer: 'Seven times hotter',
    reference: 'Daniel 3:19 — "...commanded that they should heat the furnace one seven times more than it was wont to be heated."',
    answered: false
  },
  {
    id: 'q15',
    type: 'short',
    category: 'Daniel Ch. 3',
    points: 15,
    timer: 30,
    prompt: 'What happened to the mighty men of Nebuchadnezzar’s army who threw Shadrach, Meshach, and Abednego into the burning fiery furnace?',
    options: [],
    correctIndex: 0,
    answer: 'The flame of the fire slew them',
    reference: 'Daniel 3:22 — "...the flame of the fire slew those men that took up Shadrach, Meshach, and Abed-nego."',
    answered: false
  },
  {
    id: 'q16',
    type: 'mcq',
    category: 'Daniel Ch. 3',
    points: 15,
    timer: 30,
    prompt: 'When Nebuchadnezzar looked into the furnace in astonishment, how did he describe the fourth man walking in the midst of the fire?',
    options: [
      'Like a mighty warrior with a flaming sword',
      'Like the Son of God',
      'Like the prophet of the Most High',
      'Like a pillar of fire'
    ],
    correctIndex: 1,
    answer: 'Like the Son of God',
    reference: 'Daniel 3:25 — "Lo, I see four men loose, walking in the midst of the fire, and they have no hurt; and the form of the fourth is like the Son of God."',
    answered: false
  },
  {
    id: 'q17',
    type: 'short',
    category: 'Daniel Ch. 3',
    points: 20,
    timer: 35,
    prompt: 'When Shadrach, Meshach, and Abednego came forth out of the fire, name at least TWO of the four signs mentioned in Daniel 3:27 showing the fire had no power upon their bodies.',
    options: [],
    correctIndex: 0,
    answer: '(1) Not a hair of their head was singed, (2) Neither were their coats changed, (3) Nor the smell of fire had passed on them, (4) The fire had no power upon their bodies.',
    reference: 'Daniel 3:27 — "...upon whose bodies the fire had no power, nor was an hair of their head singed, neither were their coats changed, nor the smell of fire had passed on them."',
    answered: false
  },

  // --- CHAPTER 4: THE GREAT TREE & NEBUCHADNEZZAR'S HUMBLING (Q18 - Q21) ---
  {
    id: 'q18',
    type: 'mcq',
    category: 'Daniel Ch. 4',
    points: 15,
    timer: 30,
    prompt: 'In Nebuchadnezzar’s second dream (Daniel 4), what did he see in the midst of the earth whose height reached unto heaven?',
    options: [
      'A tower of brass and iron',
      'A tree of great height',
      'A mountain of fire',
      'A golden ladder'
    ],
    correctIndex: 1,
    answer: 'A tree of great height',
    reference: 'Daniel 4:10–11 — "I saw, and behold a tree in the midst of the earth, and the height thereof was great. The tree grew, and was strong, and the height thereof reached unto heaven..."',
    answered: false
  },
  {
    id: 'q19',
    type: 'short',
    category: 'Daniel Ch. 4',
    points: 15,
    timer: 30,
    prompt: 'In Daniel 4:15, although the tree was to be hewn down, its stump of roots was to be left in the earth bound with a band of what two metals?',
    options: [],
    correctIndex: 0,
    answer: 'Iron and Brass',
    reference: 'Daniel 4:15 — "Nevertheless leave the stump of his roots in the earth, even with a band of iron and brass, in the tender grass of the field..."',
    answered: false
  },
  {
    id: 'q20',
    type: 'mcq',
    category: 'Daniel Ch. 4',
    points: 15,
    timer: 30,
    prompt: 'How many "times" (years) were decreed to pass over Nebuchadnezzar while he was driven from men and ate grass as oxen?',
    options: ['Three times', 'Five times', 'Seven times', 'Twelve times'],
    correctIndex: 2,
    answer: 'Seven times',
    reference: 'Daniel 4:25 — "...and they shall wet thee with the dew of heaven, and seven times shall pass over thee, till thou know that the most High ruleth in the kingdom of men..."',
    answered: false
  },
  {
    id: 'q21',
    type: 'short',
    category: 'Daniel Ch. 4',
    points: 20,
    timer: 30,
    prompt: 'How many months after Daniel interpreted the dream of the tree did the judgment actually fall upon Nebuchadnezzar as he walked in the palace of the kingdom of Babylon?',
    options: [],
    correctIndex: 0,
    answer: 'At the end of twelve months (12 months)',
    reference: 'Daniel 4:29–31 — "At the end of twelve months he walked in the palace of the kingdom of Babylon... While the word was in the king’s mouth, there fell a voice from heaven..."',
    answered: false
  },

  // --- CHAPTER 5: BELSHAZZAR'S FEAST & HANDWRITING ON THE WALL (Q22 - Q26) ---
  {
    id: 'q22',
    type: 'mcq',
    category: 'Daniel Ch. 5',
    points: 10,
    timer: 25,
    prompt: 'To how many of his lords did King Belshazzar make a great feast, drinking wine out of the golden and silver vessels taken from the temple in Jerusalem?',
    options: ['Three hundred lords', 'Five hundred lords', 'A thousand of his lords', 'Two thousand lords'],
    correctIndex: 2,
    answer: 'A thousand of his lords',
    reference: 'Daniel 5:1 — "Belshazzar the king made a great feast to a thousand of his lords, and drank wine before the thousand."',
    answered: false
  },
  {
    id: 'q23',
    type: 'short',
    category: 'Daniel Ch. 5',
    points: 20,
    timer: 35,
    prompt: 'State the exact four words written by the fingers of a man’s hand upon the plaster of the wall of King Belshazzar’s palace.',
    options: [],
    correctIndex: 0,
    answer: 'MENE, MENE, TEKEL, UPHARSIN',
    reference: 'Daniel 5:25 — "And this is the writing that was written, MENE, MENE, TEKEL, UPHARSIN."',
    answered: false
  },
  {
    id: 'q24',
    type: 'mcq',
    category: 'Daniel Ch. 5',
    points: 15,
    timer: 30,
    prompt: 'What reward did Belshazzar promise to whosoever should read the writing on the wall and show its interpretation?',
    options: [
      'Clothed with scarlet, a chain of gold about his neck, and made the third ruler in the kingdom',
      'Half of the kingdom and the king’s daughter in marriage',
      'Ten talents of gold and chief captain of the army',
      'Ruler over all the provinces of Media and Persia'
    ],
    correctIndex: 0,
    answer: 'Clothed with scarlet, a chain of gold about his neck, and made the third ruler in the kingdom',
    reference: 'Daniel 5:7 — "...whosoever shall read this writing, and shew me the interpretation thereof, shall be clothed with scarlet, and have a chain of gold about his neck, and shall be the third ruler in the kingdom."',
    answered: false
  },
  {
    id: 'q25',
    type: 'short',
    category: 'Daniel Ch. 5',
    points: 20,
    timer: 35,
    prompt: 'What is the exact interpretation of the word "TEKEL" given by Daniel to Belshazzar?',
    options: [],
    correctIndex: 0,
    answer: 'Thou art weighed in the balances, and art found wanting',
    reference: 'Daniel 5:27 — "TEKEL; Thou art weighed in the balances, and art found wanting."',
    answered: false
  },
  {
    id: 'q26',
    type: 'mcq',
    category: 'Daniel Ch. 5',
    points: 15,
    timer: 30,
    prompt: 'On the very night that Belshazzar king of the Chaldeans was slain, who took the kingdom, and how old was he?',
    options: [
      'Cyrus the Persian, being about 50 years old',
      'Darius the Median, being about threescore and two (62) years old',
      'Artaxerxes the Mede, being about 40 years old',
      'Ahasuerus, being about 70 years old'
    ],
    correctIndex: 1,
    answer: 'Darius the Median, being about threescore and two (62) years old',
    reference: 'Daniel 5:30–31 — "In that night was Belshazzar the king of the Chaldeans slain. And Darius the Median took the kingdom, being about threescore and two years old."',
    answered: false
  },

  // --- CHAPTER 6: DANIEL IN THE DEN OF LIONS (Q27 - Q31) ---
  {
    id: 'q27',
    type: 'mcq',
    category: 'Daniel Ch. 6',
    points: 10,
    timer: 25,
    prompt: 'In Daniel chapter 6, how many princes did it please King Darius to set over the whole kingdom, with three presidents over them (of whom Daniel was first)?',
    options: ['70 princes', '100 princes', '120 princes', '127 princes'],
    correctIndex: 2,
    answer: '120 princes',
    reference: 'Daniel 6:1–2 — "It pleased Darius to set over the kingdom an hundred and twenty princes, which should be over the whole kingdom; And over these three presidents; of whom Daniel was first..."',
    answered: false
  },
  {
    id: 'q28',
    type: 'short',
    category: 'Daniel Ch. 6',
    points: 15,
    timer: 30,
    prompt: 'Why was Daniel preferred above the presidents and princes so that the king thought to set him over the whole realm?',
    options: [],
    correctIndex: 0,
    answer: 'Because an excellent spirit was in him',
    reference: 'Daniel 6:3 — "Then this Daniel was preferred above the presidents and princes, because an excellent spirit was in him; and the king thought to set him over the whole realm."',
    answered: false
  },
  {
    id: 'q29',
    type: 'mcq',
    category: 'Daniel Ch. 6',
    points: 10,
    timer: 25,
    prompt: 'For how many days did the royal statute decree that whosoever asked a petition of any god or man, save of King Darius, should be cast into the den of lions?',
    options: ['7 days', '10 days', '21 days', '30 days'],
    correctIndex: 3,
    answer: '30 days',
    reference: 'Daniel 6:7 — "...that whosoever shall ask a petition of any God or man for thirty days, save of thee, O king, he shall be cast into the den of lions."',
    answered: false
  },
  {
    id: 'q30',
    type: 'short',
    category: 'Daniel Ch. 6',
    points: 15,
    timer: 30,
    prompt: 'When Daniel knew that the writing was signed, toward which city were his chamber windows open as he kneeled upon his knees three times a day to pray and give thanks?',
    options: [],
    correctIndex: 0,
    answer: 'Jerusalem',
    reference: 'Daniel 6:10 — "Now when Daniel knew that the writing was signed, he went into his house; and his windows being open in his chamber toward Jerusalem, he kneeled upon his knees three times a day, and prayed, and gave thanks before his God, as he did aforetime."',
    answered: false
  },
  {
    id: 'q31',
    type: 'mcq',
    category: 'Daniel Ch. 6',
    points: 15,
    timer: 30,
    prompt: 'What did Daniel tell King Darius in the morning regarding how he was delivered in the lions’ den?',
    options: [
      '"I slew the lions with the strength of the Lord"',
      '"My God hath sent his angel, and hath shut the lions’ mouths, that they have not hurt me"',
      '"The lions were asleep throughout the night"',
      '"A wall of fire stood between me and the lions"'
    ],
    correctIndex: 1,
    answer: '"My God hath sent his angel, and hath shut the lions’ mouths, that they have not hurt me"',
    reference: 'Daniel 6:22 — "My God hath sent his angel, and hath shut the lions’ mouths, that they have not hurt me: forasmuch as before him innocency was found in me; and also before thee, O king, have I done no hurt."',
    answered: false
  },

  // --- CHAPTER 7: VISION OF THE FOUR BEASTS & ANCIENT OF DAYS (Q32 - Q36) ---
  {
    id: 'q32',
    type: 'mcq',
    category: 'Daniel Ch. 7',
    points: 15,
    timer: 30,
    prompt: 'In which year of which king did Daniel have his dream and visions of the four great beasts coming up from the sea in Chapter 7?',
    options: [
      'In the first year of Belshazzar king of Babylon',
      'In the third year of Cyrus king of Persia',
      'In the first year of Darius the Median',
      'In the second year of Nebuchadnezzar'
    ],
    correctIndex: 0,
    answer: 'In the first year of Belshazzar king of Babylon',
    reference: 'Daniel 7:1 — "In the first year of Belshazzar king of Babylon Daniel had a dream and visions of his head upon his bed..."',
    answered: false
  },
  {
    id: 'q33',
    type: 'short',
    category: 'Daniel Ch. 7',
    points: 20,
    timer: 35,
    prompt: 'Describe the four beasts in Daniel chapter 7 in order (1st, 2nd, 3rd, and 4th).',
    options: [],
    correctIndex: 0,
    answer: '1st: Lion with eagle’s wings; 2nd: Bear with 3 ribs in its mouth; 3rd: Leopard with 4 wings and 4 heads; 4th: Dreadful and terrible beast with great iron teeth and 10 horns',
    reference: 'Daniel 7:4–7 — "The first was like a lion, and had eagle’s wings... a second, like to a bear... another, like a leopard... a fourth beast, dreadful and terrible, and strong exceedingly; and it had great iron teeth... and it had ten horns."',
    answered: false
  },
  {
    id: 'q34',
    type: 'mcq',
    category: 'Daniel Ch. 7',
    points: 15,
    timer: 30,
    prompt: 'In Daniel 7:8, as Daniel considered the ten horns of the fourth beast, there came up among them another "little horn" before whom how many of the first horns were plucked up by the roots?',
    options: ['Two horns', 'Three horns', 'Four horns', 'Five horns'],
    correctIndex: 1,
    answer: 'Three horns',
    reference: 'Daniel 7:8 — "I considered the horns, and, behold, there came up among them another little horn, before whom there were three of the first horns plucked up by the roots..."',
    answered: false
  },
  {
    id: 'q35',
    type: 'short',
    category: 'Daniel Ch. 7',
    points: 15,
    timer: 30,
    prompt: 'In Daniel 7:9, by what title is God described when the thrones were cast down, whose garment was white as snow and the hair of His head like the pure wool?',
    options: [],
    correctIndex: 0,
    answer: 'The Ancient of days',
    reference: 'Daniel 7:9 — "I beheld till the thrones were cast down, and the Ancient of days did sit, whose garment was white as snow, and the hair of his head like the pure wool..."',
    answered: false
  },
  {
    id: 'q36',
    type: 'mcq',
    category: 'Daniel Ch. 7',
    points: 20,
    timer: 35,
    prompt: 'In Daniel 7:25, for how long shall the saints be given into the hand of the little horn who speaks great words against the Most High and thinks to change times and laws?',
    options: [
      'A time and times and the dividing of time',
      'Seventy weeks of years',
      'Forty and two years',
      'Seven thousand days'
    ],
    correctIndex: 0,
    answer: 'A time and times and the dividing of time',
    reference: 'Daniel 7:25 — "...and they shall be given into his hand until a time and times and the dividing of time."',
    answered: false
  },

  // --- CHAPTER 8: THE RAM AND THE HE-GOAT (Q37 - Q40) ---
  {
    id: 'q37',
    type: 'mcq',
    category: 'Daniel Ch. 8',
    points: 15,
    timer: 30,
    prompt: 'In Daniel chapter 8, while Daniel was in the vision at Shushan in the palace, by which river was he standing?',
    options: ['The river Hiddekel', 'The river of Ulai', 'The river Chebar', 'The river Euphrates'],
    correctIndex: 1,
    answer: 'The river of Ulai',
    reference: 'Daniel 8:2 — "...I was at Shushan in the palace, which is in the province of Elam; and I saw in a vision, and I was by the river of Ulai."',
    answered: false
  },
  {
    id: 'q38',
    type: 'short',
    category: 'Daniel Ch. 8',
    points: 20,
    timer: 35,
    prompt: 'According to the angel’s interpretation in Daniel 8:20–21, which kingdoms do the two-horned RAM and the rough HE-GOAT represent?',
    options: [],
    correctIndex: 0,
    answer: 'The Ram = Kings of Media and Persia; The Rough Goat = King of Grecia (Greece)',
    reference: 'Daniel 8:20–21 — "The ram which thou sawest having two horns are the kings of Media and Persia. And the rough goat is the king of Grecia: and the great horn that is between his eyes is the first king."',
    answered: false
  },
  {
    id: 'q39',
    type: 'mcq',
    category: 'Daniel Ch. 8',
    points: 20,
    timer: 35,
    prompt: 'In Daniel 8:14, unto how many days was the vision concerning the daily sacrifice and the transgression of desolation before the sanctuary shall be cleansed?',
    options: [
      '1,260 days',
      '2,300 days (Two thousand and three hundred days)',
      '1,335 days',
      '700 days'
    ],
    correctIndex: 1,
    answer: '2,300 days (Two thousand and three hundred days)',
    reference: 'Daniel 8:14 — "And he said unto me, Unto two thousand and three hundred days; then shall the sanctuary be cleansed."',
    answered: false
  },
  {
    id: 'q40',
    type: 'short',
    category: 'Daniel Ch. 8',
    points: 15,
    timer: 25,
    prompt: 'Which angel was commanded by a man’s voice between the banks of Ulai to "make this man to understand the vision" in Daniel 8:16?',
    options: [],
    correctIndex: 0,
    answer: 'Gabriel',
    reference: 'Daniel 8:16 — "And I heard a man’s voice between the banks of Ulai, which called, and said, Gabriel, make this man to understand the vision."',
    answered: false
  },

  // --- CHAPTER 9: DANIEL'S PRAYER & THE SEVENTY WEEKS (Q41 - Q44) ---
  {
    id: 'q41',
    type: 'mcq',
    category: 'Daniel Ch. 9',
    points: 15,
    timer: 30,
    prompt: 'In Daniel 9:2, by studying the books of which prophet did Daniel understand that God would accomplish 70 years in the desolations of Jerusalem?',
    options: ['Isaiah', 'Jeremiah', 'Ezekiel', 'Hosea'],
    correctIndex: 1,
    answer: 'Jeremiah',
    reference: 'Daniel 9:2 — "...I Daniel understood by books the number of the years, whereof the word of the LORD came to Jeremiah the prophet, that he would accomplish seventy years in the desolations of Jerusalem."',
    answered: false
  },
  {
    id: 'q42',
    type: 'short',
    category: 'Daniel Ch. 9',
    points: 15,
    timer: 30,
    prompt: 'At what time of the day did the man Gabriel touch Daniel while he was speaking in prayer in Daniel 9:21?',
    options: [],
    correctIndex: 0,
    answer: 'About the time of the evening oblation (evening sacrifice)',
    reference: 'Daniel 9:21 — "Yea, whiles I was speaking in prayer, even the man Gabriel, whom I had seen in the vision at the beginning, being caused to fly swiftly, touched me about the time of the evening oblation."',
    answered: false
  },
  {
    id: 'q43',
    type: 'mcq',
    category: 'Daniel Ch. 9',
    points: 20,
    timer: 35,
    prompt: 'According to Daniel 9:24, how many "weeks" are determined upon Daniel’s people and upon his holy city to finish the transgression and make an end of sins?',
    options: ['Seven weeks', 'Sixty-two weeks', 'Seventy weeks', 'One hundred weeks'],
    correctIndex: 2,
    answer: 'Seventy weeks',
    reference: 'Daniel 9:24 — "Seventy weeks are determined upon thy people and upon thy holy city, to finish the transgression, and to make an end of sins..."',
    answered: false
  },
  {
    id: 'q44',
    type: 'short',
    category: 'Daniel Ch. 9',
    points: 20,
    timer: 35,
    prompt: 'In Daniel 9:25–26, how are the 69 weeks preceding the cutting off of Messiah the Prince divided?',
    options: [],
    correctIndex: 0,
    answer: 'Seven weeks, and threescore and two weeks (7 weeks + 62 weeks)',
    reference: 'Daniel 9:25–26 — "...unto the Messiah the Prince shall be seven weeks, and threescore and two weeks... And after threescore and two weeks shall Messiah be cut off, but not for himself..."',
    answered: false
  },

  // --- CHAPTERS 10, 11 & 12: FINAL VISIONS, SPIRITUAL WARFARE & END TIMES (Q45 - Q50) ---
  {
    id: 'q45',
    type: 'mcq',
    category: 'Daniel Ch. 10–12',
    points: 15,
    timer: 30,
    prompt: 'In Daniel chapter 10, for how long was Daniel mourning, eating no pleasant bread, neither came flesh nor wine in his mouth?',
    options: ['Ten days', 'Three full weeks (21 days)', 'Forty days', 'Seven weeks'],
    correctIndex: 1,
    answer: 'Three full weeks (21 days)',
    reference: 'Daniel 10:2–3 — "In those days I Daniel was mourning three full weeks. I ate no pleasant bread, neither came flesh nor wine in my mouth..."',
    answered: false
  },
  {
    id: 'q46',
    type: 'short',
    category: 'Daniel Ch. 10–12',
    points: 15,
    timer: 30,
    prompt: 'By the side of which great river was Daniel in Daniel 10:4 when he saw the vision of the man clothed in linen, whose loins were girded with fine gold of Uphaz?',
    options: [],
    correctIndex: 0,
    answer: 'The great river Hiddekel (Tigris)',
    reference: 'Daniel 10:4 — "And in the four and twentieth day of the first month, as I was by the side of the great river, which is Hiddekel..."',
    answered: false
  },
  {
    id: 'q47',
    type: 'mcq',
    category: 'Daniel Ch. 10–12',
    points: 15,
    timer: 30,
    prompt: 'In Daniel 10:13, when the prince of the kingdom of Persia withstood the heavenly messenger one and twenty days, which chief prince came to help him?',
    options: ['Gabriel', 'Michael', 'Raphael', 'Uriel'],
    correctIndex: 1,
    answer: 'Michael',
    reference: 'Daniel 10:13 — "But the prince of the kingdom of Persia withstood me one and twenty days: but, lo, Michael, one of the chief princes, came to help me..."',
    answered: false
  },
  {
    id: 'q48',
    type: 'short',
    category: 'Daniel Ch. 10–12',
    points: 25,
    timer: 35,
    prompt: 'Complete Daniel 11:32 — "And such as do wickedly against the covenant shall he corrupt by flatteries: but the people that do know their God shall be ____________, and do ____________."',
    options: [],
    correctIndex: 0,
    answer: 'Strong, and do exploits',
    reference: 'Daniel 11:32 — "...but the people that do know their God shall be strong, and do exploits."',
    answered: false
  },
  {
    id: 'q49',
    type: 'mcq',
    category: 'Daniel Ch. 10–12',
    points: 20,
    timer: 30,
    prompt: 'According to Daniel 12:3, how shall "they that be wise" and "they that turn many to righteousness" shine?',
    options: [
      'As the brightness of the firmament, and as the stars for ever and ever',
      'As the morning sun and the full moon',
      'As burning lamps before the throne of God',
      'As gold refined seven times in the furnace'
    ],
    correctIndex: 0,
    answer: 'As the brightness of the firmament, and as the stars for ever and ever',
    reference: 'Daniel 12:3 — "And they that be wise shall shine as the brightness of the firmament; and they that turn many to righteousness as the stars for ever and ever."',
    answered: false
  },
  {
    id: 'q50',
    type: 'short',
    category: 'Daniel Ch. 10–12',
    points: 25,
    timer: 35,
    prompt: 'In Daniel 12:11–12, what two specific numbers of days are mentioned from the time that the daily sacrifice shall be taken away and the abomination that maketh desolate set up, and for him that waiteth?',
    options: [],
    correctIndex: 0,
    answer: '1,290 days and 1,335 days (A thousand two hundred and ninety days; and a thousand three hundred and five and thirty days)',
    reference: 'Daniel 12:11–12 — "...there shall be a thousand two hundred and ninety days. Blessed is he that waiteth, and cometh to the thousand three hundred and five and thirty days."',
    answered: false
  }
];

const DEFAULT_CONTENDERS = [
  { id: 'c1', name: 'Daniel House', group: 'Group A • Benin Region', score: 0, answeredCount: 0, color: '#e61919' },
  { id: 'c2', name: 'Hananiah House', group: 'Group B • Benin Region', score: 0, answeredCount: 0, color: '#f59e0b' },
  { id: 'c3', name: 'Mishael House', group: 'Group C • Benin Region', score: 0, answeredCount: 0, color: '#10b981' },
  { id: 'c4', name: 'Azariah House', group: 'Group D • Benin Region', score: 0, answeredCount: 0, color: '#8b5cf6' }
];

const DEFAULT_SETTINGS = {
  orgName: 'DLSO BENIN REGION',
  gameTitle: 'DANIEL ON THE WHEELS',
  gameSubtitle: '50-Question Book of Daniel Quiz & Wheel Challenge',
  customLogoDataUrl: '',
  removeAnsweredFromWheel: true,
  includeSpecialWedges: true,
  autoStartTimer: true,
  spinDuration: 5,
  soundEnabled: true,
  sortContendersByScore: false,
  supabaseUrl: 'https://mrubxczyfxhgfvkpzaxq.supabase.co',
  supabaseAnonKey: ''
};

// Wheel Color Palette (DLSO Royal Theme — 6 rich alternating colors)
const SLICE_PALETTE = [
  { bg: '#c81414', text: '#ffffff', accent: '#fde047' }, // DLSO Crimson
  { bg: '#1b0f3e', text: '#ffffff', accent: '#fbbf24' }, // Royal Indigo
  { bg: '#d97706', text: '#090418', accent: '#ffffff' }, // Championship Gold
  { bg: '#0f766e', text: '#ffffff', accent: '#a7f3d0' }, // Emerald Teal
  { bg: '#5b21b6', text: '#ffffff', accent: '#ddd6fe' }, // Deep Purple
  { bg: '#0369a1', text: '#ffffff', accent: '#bae6fd' }  // Broadcast Sapphire
];

// ==========================================
// WEB AUDIO SYNTHESIZER (Zero External MP3s)
// ==========================================
class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTick() {
    if (!state.settings.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(920, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.028);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.03);
  }

  playQuestionLand() {
    if (!state.settings.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    });
  }

  playCorrect() {
    if (!state.settings.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [587.33, 739.99, 880, 1174.66]; // D5 major arpeggio
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.09;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    });
  }

  playWrong() {
    if (!state.settings.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const tones = [220, 185];
    tones.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.18;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    });
  }

  playTimerBeep(urgent = false) {
    if (!state.settings.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(urgent ? 880 : 660, now);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  playFanfare() {
    if (!state.settings.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const melody = [
      { f: 523.25, t: 0, d: 0.14 },
      { f: 523.25, t: 0.15, d: 0.14 },
      { f: 523.25, t: 0.30, d: 0.14 },
      { f: 659.25, t: 0.45, d: 0.35 },
      { f: 587.33, t: 0.82, d: 0.25 },
      { f: 659.25, t: 1.10, d: 0.25 },
      { f: 783.99, t: 1.38, d: 0.65 }
    ];
    melody.forEach((n) => {
      const now = this.ctx.currentTime + n.t;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now);
      gain.gain.setValueAtTime(0.26, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + n.d + 0.02);
    });
  }
}

const sound = new SoundEngine();

// ==========================================
// APPLICATION STATE
// ==========================================
let state = {
  questions: [],
  contenders: [],
  settings: { ...DEFAULT_SETTINGS },
  activeContenderId: null,
  activeQuestionId: null,
  selectedMcqIndex: null,
  isAnswerRevealed: false,
  activeMultiplier: 1,
  categoryFilter: 'ALL',
  typeFilter: 'ALL',
  wheelAngle: 0,
  isSpinning: false,
  timerSecondsLeft: 30,
  timerTotalSeconds: 30,
  timerRunning: false,
  timerIntervalId: null
};

function setCloudBadge(text, color = '#34d399') {
  const badge = document.getElementById('cloudSyncStatusPill');
  if (!badge) return;
  badge.textContent = text;
  badge.style.borderColor = color;
  badge.style.color = color;
}

// Load state from localStorage first, then sync from Supabase PostgreSQL (/api/state)
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state.questions = Array.isArray(parsed.questions) && parsed.questions.length
        ? parsed.questions
        : cloneData(DEFAULT_QUESTIONS);
      state.contenders = Array.isArray(parsed.contenders) && parsed.contenders.length
        ? parsed.contenders
        : cloneData(DEFAULT_CONTENDERS);
      state.settings = { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) };
      state.activeContenderId = parsed.activeContenderId || state.contenders[0]?.id || null;
    } else {
      state.questions = cloneData(DEFAULT_QUESTIONS);
      state.contenders = cloneData(DEFAULT_CONTENDERS);
      state.settings = { ...DEFAULT_SETTINGS };
      state.activeContenderId = state.contenders[0]?.id || null;
    }
  } catch (err) {
    console.error('Failed to load state from localStorage, using defaults:', err);
    state.questions = cloneData(DEFAULT_QUESTIONS);
    state.contenders = cloneData(DEFAULT_CONTENDERS);
    state.settings = { ...DEFAULT_SETTINGS };
    state.activeContenderId = state.contenders[0]?.id || null;
  }

  // Pull live data from Supabase PostgreSQL backend if running on Netlify or local Node server
  syncFromSupabaseCloud();
}

async function syncFromSupabaseCloud() {
  const sbUrl = (state.settings.supabaseUrl || 'https://mrubxczyfxhgfvkpzaxq.supabase.co').replace(/\/$/, '');
  const sbKey = (state.settings.supabaseAnonKey || '').trim();

  // 1. Direct Browser-to-Supabase PostgREST sync (Works on Netlify Drag-and-Drop & file://)
  if (sbKey) {
    try {
      setCloudBadge('☁️ Supabase: Syncing...', '#fbbf24');
      const headers = {
        apikey: sbKey,
        'Content-Type': 'application/json'
      };
      if (sbKey.startsWith('eyJ')) {
        headers.Authorization = `Bearer ${sbKey}`;
      }
      const [qRes, cRes, sRes] = await Promise.all([
        fetch(`${sbUrl}/rest/v1/dlso_questions?select=*&order=q_order.asc,id.asc`, { headers }),
        fetch(`${sbUrl}/rest/v1/dlso_contenders?select=*&order=c_order.asc,id.asc`, { headers }),
        fetch(`${sbUrl}/rest/v1/dlso_game_state?id=eq.main&select=*`, { headers })
      ]);

      if (!qRes.ok) throw new Error(`Supabase REST HTTP ${qRes.status}`);
      const [qRows, cRows, sRows] = await Promise.all([qRes.json(), cRes.json(), sRes.json()]);

      if (Array.isArray(qRows) && qRows.length > 0) {
        state.questions = qRows.map((r) => ({
          id: r.id,
          type: r.type,
          category: r.category,
          points: Number(r.points),
          timer: Number(r.timer || 30),
          prompt: r.prompt,
          options: Array.isArray(r.options) ? r.options : [],
          correctIndex: Number(r.correct_index || 0),
          answer: r.answer || '',
          reference: r.reference || '',
          answered: Boolean(r.answered)
        }));
      }

      if (Array.isArray(cRows) && cRows.length > 0) {
        state.contenders = cRows.map((r) => ({
          id: r.id,
          name: r.name,
          group: r.group_name || '',
          score: Number(r.score || 0),
          answeredCount: Number(r.answered_count || 0),
          color: r.color || '#e61919'
        }));
      }

      if (Array.isArray(sRows) && sRows[0]) {
        const savedSettings = sRows[0].settings || {};
        state.settings = {
          ...DEFAULT_SETTINGS,
          ...savedSettings,
          supabaseUrl: sbUrl,
          supabaseAnonKey: sbKey
        };
        state.activeContenderId = sRows[0].active_contender_id || state.contenders[0]?.id || null;
      }

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          questions: state.questions,
          contenders: state.contenders,
          settings: state.settings,
          activeContenderId: state.activeContenderId
        })
      );
      renderAll();
      setCloudBadge(`☁️ Supabase Live (${state.questions.length} Qs)`, '#34d399');
      return;
    } catch (err) {
      console.warn('Direct Supabase REST sync error:', err.message);
    }
  }

  // 2. Serverless / Node API endpoint (/api/state)
  if (window.location.protocol === 'file:') {
    setCloudBadge('💾 50 Qs Ready (Add Anon Key in Admin for Cloud)', '#fbbf24');
    return;
  }
  try {
    setCloudBadge('☁️ Supabase: Syncing...', '#fbbf24');
    const res = await fetch('/api/state', { method: 'GET' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data && data.ok && Array.isArray(data.questions) && data.questions.length > 0) {
      state.questions = data.questions;
      if (Array.isArray(data.contenders) && data.contenders.length > 0) {
        state.contenders = data.contenders;
      }
      if (data.settings && Object.keys(data.settings).length > 0) {
        state.settings = { ...DEFAULT_SETTINGS, ...data.settings };
      }
      state.activeContenderId = data.activeContenderId || state.contenders[0]?.id || null;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          questions: state.questions,
          contenders: state.contenders,
          settings: state.settings,
          activeContenderId: state.activeContenderId
        })
      );
      renderAll();
      setCloudBadge(`☁️ Supabase Connected (${state.questions.length} Qs)`, '#34d399');
    }
  } catch (err) {
    console.warn('Supabase cloud fetch fallback to localStorage:', err.message);
    setCloudBadge(`💾 50 Qs Ready (Add Anon Key in Admin for Cloud)`, '#fbbf24');
  }
}

let cloudSaveTimer = null;

function saveState() {
  const payload = {
    questions: state.questions,
    contenders: state.contenders,
    settings: state.settings,
    activeContenderId: state.activeContenderId
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error('Failed to save state locally:', err);
  }

  const sbUrl = (state.settings.supabaseUrl || 'https://mrubxczyfxhgfvkpzaxq.supabase.co').replace(/\/$/, '');
  const sbKey = (state.settings.supabaseAnonKey || '').trim();

  // Debounced sync to Supabase
  if (cloudSaveTimer) clearTimeout(cloudSaveTimer);
  cloudSaveTimer = setTimeout(async () => {
    // 1. Direct Browser-to-Supabase REST save (works on Netlify Drag-and-Drop!)
    if (sbKey) {
      try {
        setCloudBadge('☁️ Supabase: Saving...', '#fbbf24');
        const headers = {
          apikey: sbKey,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates'
        };
        if (sbKey.startsWith('eyJ')) {
          headers.Authorization = `Bearer ${sbKey}`;
        }

        const qRows = state.questions.map((q, idx) => ({
          id: q.id,
          q_order: idx + 1,
          type: q.type || 'mcq',
          category: q.category || 'Book of Daniel',
          points: Number(q.points || 10),
          timer: Number(q.timer || 30),
          prompt: q.prompt || '',
          options: q.options || [],
          correct_index: Number(q.correctIndex || 0),
          answer: q.answer || '',
          reference: q.reference || '',
          answered: Boolean(q.answered),
          updated_at: new Date().toISOString()
        }));

        const cRows = state.contenders.map((c, idx) => ({
          id: c.id,
          c_order: idx + 1,
          name: c.name || 'Contender',
          group_name: c.group || '',
          score: Number(c.score || 0),
          answered_count: Number(c.answeredCount || 0),
          color: c.color || '#e61919',
          updated_at: new Date().toISOString()
        }));

        await Promise.all([
          fetch(`${sbUrl}/rest/v1/dlso_questions`, {
            method: 'POST',
            headers,
            body: JSON.stringify(qRows)
          }),
          fetch(`${sbUrl}/rest/v1/dlso_contenders`, {
            method: 'POST',
            headers,
            body: JSON.stringify(cRows)
          }),
          fetch(`${sbUrl}/rest/v1/dlso_game_state`, {
            method: 'POST',
            headers,
            body: JSON.stringify([
              {
                id: 'main',
                settings: state.settings,
                active_contender_id: state.activeContenderId,
                updated_at: new Date().toISOString()
              }
            ])
          })
        ]);

        setCloudBadge(`☁️ Supabase Saved ✓ (${state.questions.length} Qs)`, '#34d399');
        return;
      } catch (err) {
        console.warn('Direct Supabase REST save error:', err.message);
      }
    }

    if (window.location.protocol === 'file:') return;

    // 2. Fallback to /api/state (Node server or Netlify Function)
    try {
      setCloudBadge('☁️ Supabase: Saving...', '#fbbf24');
      const res = await fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setCloudBadge(`☁️ Supabase Saved ✓ (${state.questions.length} Qs)`, '#34d399');
      } else {
        throw new Error(data.error || 'Save failed');
      }
    } catch (err) {
      setCloudBadge('💾 Saved Locally (50 Qs)', '#fbbf24');
    }
  }, 350);
}

// ==========================================
// TOAST NOTIFICATION HELPER
// ==========================================
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'toast-msg';
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.25s ease';
    setTimeout(() => el.remove(), 250);
  }, 3200);
}

// ==========================================
// WHEEL SLICES COMPUTATION & HIGH-CAPACITY CANVAS RENDERER (Supports 50+ Slices)
// ==========================================
function getWheelSlices() {
  const filteredQuestions = state.questions.filter((q) => {
    if (state.settings.removeAnsweredFromWheel && q.answered) return false;
    if (state.categoryFilter !== 'ALL' && q.category !== state.categoryFilter) return false;
    if (state.typeFilter !== 'ALL' && q.type !== state.typeFilter) return false;
    return true;
  });

  const slices = filteredQuestions.map((q) => {
    const globalIndex = state.questions.findIndex((item) => item.id === q.id) + 1;
    return {
      kind: 'question',
      questionId: q.id,
      qNumber: globalIndex,
      label: `Q${globalIndex}`,
      subLabel: `${q.points}m`,
      fullTitle: `Question #${globalIndex} (${q.points} Marks)`,
      points: q.points,
      category: q.category
    };
  });

  // Add special game show slices distributed evenly around the wheel if enabled
  if (state.settings.includeSpecialWedges && slices.length >= 2) {
    const specials = [
      {
        kind: 'special',
        specialType: 'DOUBLE',
        label: '2×',
        longLabel: '🔥 2× MARKS',
        subLabel: 'Double Next',
        fullTitle: 'DOUBLE MARKS (2× Next Question!)',
        customColor: { bg: '#b45309', text: '#fef08a', accent: '#ffffff' }
      },
      {
        kind: 'special',
        specialType: 'BONUS5',
        label: '+5m',
        longLabel: '🎁 +5 BONUS',
        subLabel: 'Free Marks',
        fullTitle: '+5 BONUS MARKS & Spin Again!',
        customColor: { bg: '#047857', text: '#ffffff', accent: '#fde047' }
      },
      {
        kind: 'special',
        specialType: 'SPIN_AGAIN',
        label: 'SPIN',
        longLabel: '🎡 FREE SPIN',
        subLabel: 'Spin Again',
        fullTitle: 'FREE SPIN — Spin the Wheel Again!',
        customColor: { bg: '#6d28d9', text: '#ffffff', accent: '#fde047' }
      }
    ];

    // Interleave special wedges evenly around the wheel instead of clumping at the end
    const step = Math.max(1, Math.floor(slices.length / specials.length));
    specials.forEach((sp, idx) => {
      const insertPos = Math.min(slices.length, (idx + 1) * step + idx);
      slices.splice(insertPos, 0, sp);
    });
  }

  return slices;
}

function drawWheel() {
  const canvas = document.getElementById('wheelCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const cx = width / 2;
  const cy = height / 2;
  const outerRadius = Math.min(cx, cy) - 10;
  const rimWidth = 20;
  const wheelRadius = outerRadius - rimWidth;

  ctx.clearRect(0, 0, width, height);

  const slices = getWheelSlices();

  // Draw metallic outer rim
  const rimGrad = ctx.createRadialGradient(cx, cy, wheelRadius, cx, cy, outerRadius);
  rimGrad.addColorStop(0, '#78350f');
  rimGrad.addColorStop(0.35, '#fbbf24');
  rimGrad.addColorStop(0.7, '#fef08a');
  rimGrad.addColorStop(1, '#92400e');

  ctx.beginPath();
  ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
  ctx.fillStyle = rimGrad;
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#e61919';
  ctx.stroke();

  // Studio bulb lights around the outer rim
  const bulbCount = 32;
  for (let i = 0; i < bulbCount; i++) {
    const angle = (i * (Math.PI * 2)) / bulbCount + state.wheelAngle * 0.25;
    const bx = cx + Math.cos(angle) * (outerRadius - rimWidth / 2);
    const by = cy + Math.sin(angle) * (outerRadius - rimWidth / 2);
    ctx.beginPath();
    ctx.arc(bx, by, 4.2, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? '#fef08a' : '#ff4d4d';
    ctx.fill();
  }

  if (slices.length === 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, wheelRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#1b0f3e';
    ctx.fill();

    ctx.fillStyle = '#fef08a';
    ctx.font = '800 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ALL QUESTIONS COMPLETED!', cx, cy - 70);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '600 16px Inter, sans-serif';
    ctx.fillText('Click "Restore All Questions" or change filter', cx, cy + 85);
    return;
  }

  const count = slices.length;
  const arcSize = (Math.PI * 2) / count;

  // Dynamic sizing for 1 to 60+ slices on the wheel
  let fontSize = 20;
  let pegRadius = 5;
  let dividerWidth = 2;

  if (count > 45) {
    fontSize = 11.5;
    pegRadius = 2.6;
    dividerWidth = 1;
  } else if (count > 32) {
    fontSize = 13;
    pegRadius = 3.2;
    dividerWidth = 1.2;
  } else if (count > 22) {
    fontSize = 15;
    pegRadius = 3.8;
    dividerWidth = 1.5;
  } else if (count > 14) {
    fontSize = 17;
    pegRadius = 4.4;
    dividerWidth = 1.8;
  }

  slices.forEach((slice, i) => {
    const startAngle = state.wheelAngle + i * arcSize;
    const endAngle = startAngle + arcSize;
    const palette = slice.customColor || SLICE_PALETTE[i % SLICE_PALETTE.length];

    // Wedge fill
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, wheelRadius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = palette.bg;
    ctx.fill();

    // Wedge divider line
    ctx.lineWidth = dividerWidth;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.stroke();

    // Draw text inside slice near outer rim for maximum separation even with 50+ slices
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(startAngle + arcSize / 2);

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = palette.text;
    ctx.font = `900 ${fontSize}px Inter, sans-serif`;

    if (count > 30) {
      // Compact single-line radial label near outer rim (e.g. "Q42 • 15m" or "Q42")
      const compactText =
        slice.kind === 'special'
          ? `${slice.label}`
          : count > 44
          ? `${slice.label}·${slice.points}`
          : `${slice.label} (${slice.subLabel})`;
      ctx.fillText(compactText, wheelRadius - 14, 0);
    } else {
      const displayLabel = slice.kind === 'special' && slice.longLabel ? slice.longLabel : slice.label;
      ctx.fillText(displayLabel, wheelRadius - 20, -4);
      if (slice.subLabel) {
        ctx.fillStyle = palette.accent;
        ctx.font = `700 ${Math.max(10, fontSize - 4)}px Inter, sans-serif`;
        ctx.fillText(slice.subLabel, wheelRadius - 20, 12);
      }
    }

    ctx.restore();

    // Draw metallic peg at slice boundary
    const pegX = cx + Math.cos(startAngle) * (wheelRadius - 5);
    const pegY = cy + Math.sin(startAngle) * (wheelRadius - 5);
    ctx.beginPath();
    ctx.arc(pegX, pegY, pegRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fef08a';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#090418';
    ctx.stroke();
  });
}

// Determine which slice is currently under the right-hand pointer (angle 0 rad)
function getSliceIndexAtPointer(angle, sliceCount) {
  if (sliceCount === 0) return -1;
  const twoPi = Math.PI * 2;
  const arcSize = twoPi / sliceCount;
  // Pointer is at 0 radians (3 o'clock right side)
  const normalizedAngle = ((twoPi - (angle % twoPi)) + twoPi) % twoPi;
  return Math.floor(normalizedAngle / arcSize) % sliceCount;
}

// Spin the Wheel with smooth physics easing
function spinWheel() {
  if (state.isSpinning) return;
  const slices = getWheelSlices();
  if (slices.length === 0) {
    showToast('No unanswered questions on the wheel! Click "Restore All Questions" or adjust filter.');
    return;
  }

  state.isSpinning = true;
  const container = document.getElementById('wheelContainer');
  const spinBtnMain = document.getElementById('btnSpinMain');
  const spinBtnCenter = document.getElementById('wheelCenterSpinBtn');
  const pointerEl = document.getElementById('wheelPointer');

  if (container) container.classList.add('spinning');
  if (spinBtnMain) spinBtnMain.disabled = true;
  if (spinBtnCenter) spinBtnCenter.disabled = true;

  updateWheelBanner('SPINNING...', 'The Wheel of the Word is spinning!', 'Watch the pointer on the right...');

  const durationMs = Math.max(2000, (Number(state.settings.spinDuration) || 5) * 1000);
  const startAngle = state.wheelAngle;
  // Spin between 6 and 9 full rotations + random offset
  const extraSpins = (6 + Math.random() * 3.5) * Math.PI * 2;
  const targetAngle = startAngle + extraSpins;
  const startTime = performance.now();
  let lastSliceIndex = getSliceIndexAtPointer(startAngle, slices.length);
  let lastTickTime = 0;

  function animateFrame(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / durationMs);
    // Quartic ease-out for realistic game show wheel deceleration
    const eased = 1 - Math.pow(1 - progress, 4);

    state.wheelAngle = startAngle + (targetAngle - startAngle) * eased;
    drawWheel();

    const currentSliceIndex = getSliceIndexAtPointer(state.wheelAngle, slices.length);
    if (currentSliceIndex !== lastSliceIndex) {
      lastSliceIndex = currentSliceIndex;
      // Throttle audio ticks slightly at ultra-high speed when 50 slices are on the wheel
      if (now - lastTickTime > 22) {
        lastTickTime = now;
        sound.playTick();
        if (pointerEl) {
          pointerEl.classList.add('tick-bounce');
          setTimeout(() => pointerEl.classList.remove('tick-bounce'), 42);
        }
      }
    }

    if (progress < 1) {
      requestAnimationFrame(animateFrame);
    } else {
      state.isSpinning = false;
      if (container) container.classList.remove('spinning');
      if (spinBtnMain) spinBtnMain.disabled = false;
      if (spinBtnCenter) spinBtnCenter.disabled = false;

      const winningSlice = slices[currentSliceIndex];
      handleWheelLanded(winningSlice);
    }
  }

  requestAnimationFrame(animateFrame);
}

function handleWheelLanded(slice) {
  if (!slice) return;
  sound.playQuestionLand();

  if (slice.kind === 'special') {
    if (slice.specialType === 'DOUBLE') {
      state.activeMultiplier = 2;
      renderMultiplierBanner();
      updateWheelBanner(
        '🔥 2× DOUBLE MARKS ACTIVATED!',
        'Spin again! The next question is worth DOUBLE MARKS!',
        'Click SPIN THE WHEEL to draw the 2× question.'
      );
      showToast('🔥 DOUBLE MARKS! Spin again for a 2× points question!');
    } else if (slice.specialType === 'BONUS5') {
      const contender = getActiveContender();
      if (contender) {
        contender.score += 5;
        saveState();
        renderContenders();
        showToast(`🎁 +5 Bonus Marks awarded to ${contender.name}! Spin again!`);
        updateWheelBanner(
          '🎁 +5 BONUS MARKS!',
          `${contender.name} receives +5 Free Bonus Marks!`,
          'Now spin the wheel again to draw their Bible question!'
        );
      } else {
        updateWheelBanner('🎁 +5 BONUS SLICE!', 'Select a contender and spin again!', '');
      }
    } else if (slice.specialType === 'SPIN_AGAIN') {
      updateWheelBanner(
        '🎡 FREE SPIN!',
        'Landed on Free Spin — Spin the Wheel Again!',
        'Press Spacebar or click SPIN THE WHEEL.'
      );
      showToast('🎡 Landed on Free Spin! Spin again!');
    }
    return;
  }

  // Landed on a Question Slice
  updateWheelBanner(
    '🎯 QUESTION SELECTED!',
    `${slice.fullTitle} — ${slice.category}`,
    'Look at the Question Box directly below to answer and award marks.'
  );

  openQuestionInStage(slice.questionId);
}

function updateWheelBanner(tag, headline, sub) {
  const tagEl = document.getElementById('wheelStatusTag');
  const headEl = document.getElementById('wheelStatusHeadline');
  const subEl = document.getElementById('wheelStatusSub');
  if (tagEl) tagEl.textContent = tag;
  if (headEl) headEl.textContent = headline;
  if (subEl) subEl.innerHTML = sub;
}

function renderMultiplierBanner() {
  const banner = document.getElementById('multiplierBanner');
  if (!banner) return;
  if (state.activeMultiplier > 1) {
    banner.classList.add('active');
  } else {
    banner.classList.remove('active');
  }
}

// ==========================================
// QUESTION STAGE BOX (UNDER THE WHEEL)
// ==========================================
function openQuestionInStage(questionId) {
  const q = state.questions.find((item) => item.id === questionId);
  if (!q) return;

  state.activeQuestionId = q.id;
  state.selectedMcqIndex = null;
  state.isAnswerRevealed = false;

  const qNumber = state.questions.findIndex((item) => item.id === q.id) + 1;
  const effectivePoints = q.points * state.activeMultiplier;

  const emptyState = document.getElementById('questionEmptyState');
  const activeContent = document.getElementById('questionActiveContent');
  const stageCard = document.getElementById('questionStageCard');

  if (emptyState) emptyState.style.display = 'none';
  if (activeContent) activeContent.style.display = 'block';
  if (stageCard) stageCard.classList.add('active-question');

  // Badges
  document.getElementById('qDisplayNumber').textContent = `QUESTION #${qNumber} OF ${state.questions.length}`;
  document.getElementById('qDisplayCategory').textContent = q.category;
  document.getElementById('qDisplayType').textContent =
    q.type === 'mcq' ? 'Multiple Choice' : 'Short Answer';
  document.getElementById('qDisplayMarks').textContent =
    state.activeMultiplier > 1
      ? `🔥 ${effectivePoints} MARKS (2×)`
      : `⭐ ${effectivePoints} MARKS`;

  // Question Prompt
  document.getElementById('qDisplayPrompt').textContent = q.prompt;

  // Hide Answer Reveal Box initially
  const revealBox = document.getElementById('answerRevealBox');
  if (revealBox) revealBox.style.display = 'none';

  // Render MCQ vs Short Answer
  const mcqContainer = document.getElementById('mcqOptionsContainer');
  const shortContainer = document.getElementById('shortAnswerContainer');
  const shortInput = document.getElementById('shortAnswerHostInput');
  if (shortInput) shortInput.value = '';

  if (q.type === 'mcq') {
    mcqContainer.style.display = 'grid';
    shortContainer.style.display = 'none';
    renderMcqOptions(q);
  } else {
    mcqContainer.style.display = 'none';
    shortContainer.style.display = 'flex';
  }

  // Update Scoring Buttons labels with effective marks
  const halfPoints = Math.round((effectivePoints / 2) * 10) / 10;
  document.getElementById('btnScoreFull').textContent = `✅ Correct! (+${effectivePoints} Marks)`;
  document.getElementById('btnScoreHalf').textContent = `➗ Half Marks (+${halfPoints} Marks)`;

  // Populate Scoring Contender Select
  populateScoringContenderDropdown();

  // Setup Timer
  resetQuestionTimer(q.timer || 30, state.settings.autoStartTimer);

  // Update Question Grid Tracker highlight
  renderQuestionTrackerGrid();

  // Smooth scroll Question Box into comfortable view
  stageCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderMcqOptions(q) {
  const container = document.getElementById('mcqOptionsContainer');
  if (!container) return;
  container.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  (q.options || []).forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mcq-option-btn';
    if (state.selectedMcqIndex === idx) {
      btn.classList.add('selected');
    }
    if (state.isAnswerRevealed) {
      if (idx === Number(q.correctIndex)) {
        btn.classList.add('correct-reveal');
      } else if (state.selectedMcqIndex === idx) {
        btn.classList.add('wrong-reveal');
      }
    }

    btn.innerHTML = `
      <span class="mcq-letter">${letters[idx] || idx + 1}</span>
      <span>${escapeHtml(optText)}</span>
    `;

    btn.addEventListener('click', () => {
      if (state.isAnswerRevealed) return;
      state.selectedMcqIndex = idx;
      sound.playTick();
      renderMcqOptions(q);
    });

    container.appendChild(btn);
  });
}

function revealCurrentAnswer() {
  const q = state.questions.find((item) => item.id === state.activeQuestionId);
  if (!q) return;

  stopQuestionTimer();
  state.isAnswerRevealed = true;

  if (q.type === 'mcq') {
    renderMcqOptions(q);
    const letters = ['A', 'B', 'C', 'D'];
    const correctLetter = letters[q.correctIndex] || '';
    const correctText = (q.options && q.options[q.correctIndex]) || q.answer || '';
    document.getElementById('answerRevealText').textContent = `${correctLetter}. ${correctText}`;

    if (state.selectedMcqIndex !== null) {
      if (state.selectedMcqIndex === Number(q.correctIndex)) {
        sound.playCorrect();
      } else {
        sound.playWrong();
      }
    } else {
      sound.playQuestionLand();
    }
  } else {
    document.getElementById('answerRevealText').textContent = q.answer || 'See Scripture Reference';
    sound.playQuestionLand();
  }

  document.getElementById('answerRevealRef').textContent = q.reference || '';
  document.getElementById('answerRevealBox').style.display = 'flex';
}

function closeQuestionBox() {
  stopQuestionTimer();
  state.activeQuestionId = null;
  state.selectedMcqIndex = null;
  state.isAnswerRevealed = false;

  document.getElementById('questionEmptyState').style.display = 'flex';
  document.getElementById('questionActiveContent').style.display = 'none';
  document.getElementById('questionStageCard').classList.remove('active-question');
  renderQuestionTrackerGrid();
}

// ==========================================
// QUESTION TIMER ENGINE
// ==========================================
function resetQuestionTimer(seconds = 30, autoStart = false) {
  stopQuestionTimer();
  state.timerTotalSeconds = seconds;
  state.timerSecondsLeft = seconds;
  updateTimerDisplay();
  if (autoStart) {
    startQuestionTimer();
  }
}

function startQuestionTimer() {
  if (state.timerRunning) return;
  if (state.timerSecondsLeft <= 0) {
    state.timerSecondsLeft = state.timerTotalSeconds;
  }
  state.timerRunning = true;
  document.getElementById('btnTimerToggle').textContent = '⏸ Pause';

  state.timerIntervalId = setInterval(() => {
    state.timerSecondsLeft = Math.max(0, state.timerSecondsLeft - 1);
    updateTimerDisplay();

    if (state.timerSecondsLeft > 0 && state.timerSecondsLeft <= 5) {
      sound.playTimerBeep(true);
    } else if (state.timerSecondsLeft === 0) {
      stopQuestionTimer();
      sound.playWrong();
      showToast('⏰ Time is up!');
    }
  }, 1000);
}

function stopQuestionTimer() {
  state.timerRunning = false;
  if (state.timerIntervalId) {
    clearInterval(state.timerIntervalId);
    state.timerIntervalId = null;
  }
  const btn = document.getElementById('btnTimerToggle');
  if (btn) btn.textContent = '▶ Start';
}

function toggleQuestionTimer() {
  if (!state.activeQuestionId) return;
  if (state.timerRunning) {
    stopQuestionTimer();
  } else {
    startQuestionTimer();
  }
}

function updateTimerDisplay() {
  const readout = document.getElementById('timerReadout');
  const fill = document.getElementById('timerProgressFill');
  if (readout) {
    readout.textContent = `${state.timerSecondsLeft}s`;
    if (state.timerSecondsLeft <= 5 && state.timerSecondsLeft > 0) {
      readout.classList.add('urgent');
    } else {
      readout.classList.remove('urgent');
    }
  }
  if (fill) {
    const pct = state.timerTotalSeconds > 0
      ? (state.timerSecondsLeft / state.timerTotalSeconds) * 100
      : 0;
    fill.style.width = `${pct}%`;
  }
}

// ==========================================
// HOST SCORING & CONTENDER TURN MANAGEMENT
// ==========================================
function getActiveContender() {
  return state.contenders.find((c) => c.id === state.activeContenderId) || state.contenders[0] || null;
}

function populateScoringContenderDropdown() {
  const select = document.getElementById('scoringContenderSelect');
  if (!select) return;
  select.innerHTML = '';
  state.contenders.forEach((c) => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = `${c.name} (${c.score} Marks)`;
    if (c.id === state.activeContenderId) opt.selected = true;
    select.appendChild(opt);
  });
}

function awardPointsForCurrentQuestion(multiplierFraction = 1) {
  const q = state.questions.find((item) => item.id === state.activeQuestionId);
  if (!q) return;

  const targetContenderId = document.getElementById('scoringContenderSelect').value || state.activeContenderId;
  const contender = state.contenders.find((c) => c.id === targetContenderId);

  const effectiveBase = q.points * state.activeMultiplier;
  const pointsEarned = Math.round(effectiveBase * multiplierFraction * 10) / 10;

  if (contender && pointsEarned > 0) {
    contender.score = Math.round((contender.score + pointsEarned) * 10) / 10;
    contender.answeredCount = (contender.answeredCount || 0) + 1;
    sound.playCorrect();
    launchConfetti(45);
    showToast(`✅ +${pointsEarned} Marks awarded to ${contender.name}!`);
  } else {
    sound.playWrong();
    showToast(`❌ 0 Marks recorded for ${contender ? contender.name : 'Contender'}.`);
  }

  // Mark question answered & reset any 2X multiplier
  q.answered = true;
  state.activeMultiplier = 1;
  renderMultiplierBanner();

  saveState();
  closeQuestionBox();
  advanceToNextContender();
  renderAll();
}

function passQuestionToBonus() {
  if (!state.activeQuestionId) return;
  advanceToNextContender();
  populateScoringContenderDropdown();
  const c = getActiveContender();
  resetQuestionTimer(15, true); // 15s bonus timer
  showToast(`↪ Passed for Bonus Attempt to ${c ? c.name : 'Next Contender'} (15s)!`);
}

function markCompleteAndNext() {
  const q = state.questions.find((item) => item.id === state.activeQuestionId);
  if (q) q.answered = true;
  state.activeMultiplier = 1;
  renderMultiplierBanner();
  saveState();
  closeQuestionBox();
  advanceToNextContender();
  renderAll();
}

function advanceToNextContender() {
  if (state.contenders.length === 0) return;
  const idx = state.contenders.findIndex((c) => c.id === state.activeContenderId);
  const nextIdx = (idx + 1) % state.contenders.length;
  state.activeContenderId = state.contenders[nextIdx].id;
  saveState();
  renderContenders();
}

// ==========================================
// RENDER UI: HEADER, CONTENDERS, TRACKER, FILTERS
// ==========================================
function renderBrandingAndHeader() {
  document.getElementById('orgTitleDisplay').textContent = state.settings.orgName || 'DLSO BENIN REGION';
  document.getElementById('gameTitleDisplay').textContent = state.settings.gameTitle || 'DANIEL ON THE WHEELS';
  document.getElementById('gameSubtitleDisplay').textContent =
    state.settings.gameSubtitle || '50-Question Book of Daniel Quiz & Wheel Challenge';

  const soundBtn = document.getElementById('btnToggleSound');
  if (soundBtn) {
    soundBtn.textContent = state.settings.soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
  }

  const headerLogoImg = document.getElementById('headerLogoImg');
  const wheelLogoImg = document.getElementById('wheelCenterLogoImg');
  const headerFallback = document.getElementById('headerFallbackSvg');
  const wheelFallback = document.getElementById('wheelFallbackSvg');

  if (state.settings.customLogoDataUrl) {
    if (headerLogoImg) {
      headerLogoImg.src = state.settings.customLogoDataUrl;
      headerLogoImg.style.display = 'block';
    }
    if (wheelLogoImg) {
      wheelLogoImg.src = state.settings.customLogoDataUrl;
      wheelLogoImg.style.display = 'block';
    }
    if (headerFallback) headerFallback.style.display = 'none';
    if (wheelFallback) wheelFallback.style.display = 'none';
  }
}

function renderContenders() {
  const container = document.getElementById('contendersListContainer');
  if (!container) return;

  if (!state.contenders.some((c) => c.id === state.activeContenderId) && state.contenders.length > 0) {
    state.activeContenderId = state.contenders[0].id;
  }

  const activeContender = getActiveContender();
  document.getElementById('activeContenderBannerName').textContent =
    activeContender ? activeContender.name : 'No Contender';
  document.getElementById('activeContenderBannerScore').textContent =
    activeContender ? `${activeContender.score} Marks` : '0 Marks';

  const rankedIds = [...state.contenders]
    .sort((a, b) => b.score - a.score)
    .map((c) => c.id);

  const displayList = state.settings.sortContendersByScore
    ? [...state.contenders].sort((a, b) => b.score - a.score)
    : [...state.contenders];

  container.innerHTML = '';

  displayList.forEach((c) => {
    const rankPos = rankedIds.indexOf(c.id) + 1;
    const isTurn = c.id === state.activeContenderId;

    const item = document.createElement('div');
    item.className = `contender-item ${isTurn ? 'active-turn' : ''}`;

    const rankClass = rankPos <= 3 ? `rank-${rankPos}` : '';

    item.innerHTML = `
      <div class="contender-left">
        <div class="rank-badge ${rankClass}" style="border-bottom: 3px solid ${c.color || '#e61919'};">
          #${rankPos}
        </div>
        <div class="contender-info">
          <div class="contender-name-row">
            <span class="contender-name">${escapeHtml(c.name)}</span>
            ${isTurn ? '<span class="turn-pill">HOT SEAT</span>' : ''}
          </div>
          <div class="contender-meta">${escapeHtml(c.group || 'Contender')} • ${c.answeredCount || 0} solved</div>
        </div>
      </div>
      <div class="contender-right">
        <div class="contender-score">${c.score}</div>
        <div class="score-nudge-btns">
          <button class="nudge-btn" data-action="plus" title="Add +5 Marks">+</button>
          <button class="nudge-btn" data-action="minus" title="Subtract 5 Marks">−</button>
        </div>
      </div>
    `;

    item.addEventListener('click', (e) => {
      const btn = e.target.closest('.nudge-btn');
      if (btn) {
        e.stopPropagation();
        const delta = btn.dataset.action === 'plus' ? 5 : -5;
        c.score = Math.max(0, c.score + delta);
        saveState();
        renderContenders();
        if (state.activeQuestionId) populateScoringContenderDropdown();
        return;
      }
      state.activeContenderId = c.id;
      saveState();
      renderContenders();
      if (state.activeQuestionId) populateScoringContenderDropdown();
    });

    container.appendChild(item);
  });

  const sortBtn = document.getElementById('btnSortContenders');
  if (sortBtn) {
    sortBtn.textContent = state.settings.sortContendersByScore ? '⇅ Sort: Score' : '⇅ Sort: Turn';
  }
}

function renderCategoryFilterOptions() {
  const select = document.getElementById('categoryFilterSelect');
  if (!select) return;
  const categories = Array.from(new Set(state.questions.map((q) => q.category).filter(Boolean)));
  const current = state.categoryFilter;

  select.innerHTML = '<option value="ALL">All Chapters (50 Questions)</option>';
  categories.forEach((cat) => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    if (cat === current) opt.selected = true;
    select.appendChild(opt);
  });
}

function renderWheelStatsAndTracker() {
  const total = state.questions.length;
  const answered = state.questions.filter((q) => q.answered).length;
  const onWheel = getWheelSlices().filter((s) => s.kind === 'question').length;

  document.getElementById('statOnWheelCount').textContent = onWheel;
  document.getElementById('statAnsweredCount').textContent = answered;
  document.getElementById('statTotalBankCount').textContent = total;
  document.getElementById('trackerSummaryText').textContent = `${total - answered} / ${total} available`;

  renderQuestionTrackerGrid();
}

function renderQuestionTrackerGrid() {
  const grid = document.getElementById('questionPillsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  state.questions.forEach((q, idx) => {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = `q-grid-pill ${q.answered ? 'answered' : ''} ${state.activeQuestionId === q.id ? 'active-now' : ''}`;
    pill.title = `Q${idx + 1}: ${q.category} (${q.points} Marks) — Click to open, Right-click to toggle Answered state`;
    pill.innerHTML = `
      <div>Q${idx + 1}</div>
      <span>${q.points}m</span>
    `;

    pill.addEventListener('click', () => {
      openQuestionInStage(q.id);
    });

    pill.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      q.answered = !q.answered;
      saveState();
      renderAll();
      showToast(`Question #${idx + 1} marked as ${q.answered ? 'Answered' : 'Unanswered'}.`);
    });

    grid.appendChild(pill);
  });
}

// ==========================================
// ADMIN PORTAL LOGIC (CRUD FOR QUESTIONS & CONTENDERS)
// ==========================================
function renderAdminPortal() {
  document.getElementById('adminQCountBadge').textContent = state.questions.length;
  document.getElementById('adminCCountBadge').textContent = state.contenders.length;

  const searchVal = (document.getElementById('adminSearchQuestions')?.value || '').toLowerCase().trim();
  const qListEl = document.getElementById('adminQuestionsList');
  if (qListEl) {
    qListEl.innerHTML = '';
    state.questions.forEach((q, idx) => {
      const hay = `q${idx + 1} ${q.prompt} ${q.category} ${q.answer} ${q.reference}`.toLowerCase();
      if (searchVal && !hay.includes(searchVal)) return;

      const card = document.createElement('div');
      card.className = 'admin-q-item';
      card.innerHTML = `
        <div style="flex:1; min-width:0;">
          <div style="display:flex; align-items:center; gap:0.45rem; flex-wrap:wrap; margin-bottom:0.35rem;">
            <span class="q-badge q-badge-number" style="font-size:0.7rem; padding:0.15rem 0.55rem;">Q${idx + 1}</span>
            <span class="q-badge q-badge-category" style="font-size:0.7rem; padding:0.15rem 0.55rem;">${escapeHtml(q.category)}</span>
            <span class="q-badge q-badge-type" style="font-size:0.7rem; padding:0.15rem 0.55rem;">${q.type === 'mcq' ? 'MCQ' : 'Short Answer'}</span>
            <span class="q-badge q-badge-marks" style="font-size:0.7rem; padding:0.15rem 0.55rem;">${q.points} Marks • ${q.timer}s</span>
            ${q.answered ? '<span style="font-size:0.7rem; color:#34d399; font-weight:800;">✔ Answered</span>' : ''}
          </div>
          <div style="font-weight:700; font-size:0.93rem; margin-bottom:0.25rem;">${escapeHtml(q.prompt)}</div>
          <div style="font-size:0.8rem; color:var(--gold-light);">
            <strong>Answer:</strong> ${escapeHtml(
              q.type === 'mcq' ? `${['A', 'B', 'C', 'D'][q.correctIndex]}. ${q.options?.[q.correctIndex] || ''}` : q.answer
            )}
            ${q.reference ? `<span style="color:var(--text-dim);"> — ${escapeHtml(q.reference)}</span>` : ''}
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.35rem; flex-shrink:0;">
          <button class="btn btn-sm" data-action="edit">✏ Edit</button>
          <button class="btn btn-sm" data-action="toggle">${q.answered ? '↺ Restore' : '✔ Mark Done'}</button>
          <button class="btn btn-sm btn-danger" data-action="delete">🗑 Delete</button>
        </div>
      `;

      card.querySelector('[data-action="edit"]').addEventListener('click', () => loadQuestionIntoForm(q));
      card.querySelector('[data-action="toggle"]').addEventListener('click', () => {
        q.answered = !q.answered;
        saveState();
        renderAll();
        renderAdminPortal();
      });
      card.querySelector('[data-action="delete"]').addEventListener('click', () => {
        state.questions = state.questions.filter((item) => item.id !== q.id);
        saveState();
        renderAll();
        renderAdminPortal();
        showToast('Question deleted.');
      });

      qListEl.appendChild(card);
    });
  }

  // Render Admin Contenders List
  const cListEl = document.getElementById('adminContendersList');
  if (cListEl) {
    cListEl.innerHTML = '';
    state.contenders.forEach((c, idx) => {
      const row = document.createElement('div');
      row.className = 'admin-q-item';
      row.style.alignItems = 'center';
      row.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div style="width:18px; height:18px; border-radius:50%; background:${c.color || '#e61919'};"></div>
          <div>
            <div style="font-weight:800; font-size:0.96rem;">${escapeHtml(c.name)}</div>
            <div style="font-size:0.78rem; color:var(--text-dim);">${escapeHtml(c.group || '')} • Score: <strong style="color:var(--gold-bright);">${c.score} Marks</strong></div>
          </div>
        </div>
        <div style="display:flex; gap:0.4rem;">
          <button class="btn btn-sm" data-action="up" ${idx === 0 ? 'disabled' : ''}>↑</button>
          <button class="btn btn-sm" data-action="down" ${idx === state.contenders.length - 1 ? 'disabled' : ''}>↓</button>
          <button class="btn btn-sm" data-action="edit">✏ Edit</button>
          <button class="btn btn-sm btn-danger" data-action="delete">🗑</button>
        </div>
      `;

      row.querySelector('[data-action="up"]').addEventListener('click', () => {
        if (idx === 0) return;
        const temp = state.contenders[idx - 1];
        state.contenders[idx - 1] = state.contenders[idx];
        state.contenders[idx] = temp;
        saveState();
        renderAll();
        renderAdminPortal();
      });

      row.querySelector('[data-action="down"]').addEventListener('click', () => {
        if (idx >= state.contenders.length - 1) return;
        const temp = state.contenders[idx + 1];
        state.contenders[idx + 1] = state.contenders[idx];
        state.contenders[idx] = temp;
        saveState();
        renderAll();
        renderAdminPortal();
      });

      row.querySelector('[data-action="edit"]').addEventListener('click', () => loadContenderIntoForm(c));
      row.querySelector('[data-action="delete"]').addEventListener('click', () => {
        state.contenders = state.contenders.filter((item) => item.id !== c.id);
        saveState();
        renderAll();
        renderAdminPortal();
        showToast('Contender removed.');
      });

      cListEl.appendChild(row);
    });
  }

  // Sync Settings Form
  document.getElementById('setOrgName').value = state.settings.orgName || '';
  document.getElementById('setGameTitle').value = state.settings.gameTitle || '';
  document.getElementById('setGameSubtitle').value = state.settings.gameSubtitle || '';
  document.getElementById('setRemoveAnswered').checked = !!state.settings.removeAnsweredFromWheel;
  document.getElementById('setIncludeSpecialWedges').checked = !!state.settings.includeSpecialWedges;
  document.getElementById('setAutoStartTimer').checked = !!state.settings.autoStartTimer;
  document.getElementById('setSpinDuration').value = state.settings.spinDuration || 5;
  const sbUrlEl = document.getElementById('setSupabaseUrl');
  const sbKeyEl = document.getElementById('setSupabaseAnonKey');
  if (sbUrlEl) sbUrlEl.value = state.settings.supabaseUrl || 'https://mrubxczyfxhgfvkpzaxq.supabase.co';
  if (sbKeyEl) sbKeyEl.value = state.settings.supabaseAnonKey || '';
}

function loadQuestionIntoForm(q) {
  document.getElementById('questionFormHeading').textContent = '✏ Edit Question';
  document.getElementById('editQuestionId').value = q.id;
  document.getElementById('qFormType').value = q.type;
  document.getElementById('qFormCategory').value = q.category;
  document.getElementById('qFormPoints').value = q.points;
  document.getElementById('qFormTimer').value = q.timer || 30;
  document.getElementById('qFormPrompt').value = q.prompt;
  document.getElementById('qFormReference').value = q.reference || '';

  toggleQuestionFormTypeFields();

  if (q.type === 'mcq') {
    for (let i = 0; i < 4; i++) {
      document.getElementById(`qFormOpt${i}`).value = (q.options && q.options[i]) || '';
    }
    const radio = document.querySelector(`input[name="qFormCorrectIndex"][value="${q.correctIndex || 0}"]`);
    if (radio) radio.checked = true;
  } else {
    document.getElementById('qFormShortAnswer').value = q.answer || '';
  }

  document.getElementById('btnCancelEditQuestion').style.display = 'inline-flex';
}

function resetQuestionForm() {
  document.getElementById('questionFormHeading').textContent = '➕ Add New Question';
  document.getElementById('editQuestionId').value = '';
  document.getElementById('qFormPrompt').value = '';
  document.getElementById('qFormReference').value = '';
  document.getElementById('qFormShortAnswer').value = '';
  for (let i = 0; i < 4; i++) {
    document.getElementById(`qFormOpt${i}`).value = '';
  }
  const radio0 = document.querySelector('input[name="qFormCorrectIndex"][value="0"]');
  if (radio0) radio0.checked = true;
  document.getElementById('btnCancelEditQuestion').style.display = 'none';
  toggleQuestionFormTypeFields();
}

function toggleQuestionFormTypeFields() {
  const type = document.getElementById('qFormType').value;
  document.getElementById('qFormMcqFields').style.display = type === 'mcq' ? 'flex' : 'none';
  document.getElementById('qFormShortFields').style.display = type === 'short' ? 'flex' : 'none';
}

function loadContenderIntoForm(c) {
  document.getElementById('contenderFormHeading').textContent = '✏ Edit Contender / Team';
  document.getElementById('editContenderId').value = c.id;
  document.getElementById('cFormName').value = c.name;
  document.getElementById('cFormGroup').value = c.group || '';
  document.getElementById('cFormScore').value = c.score || 0;
  document.getElementById('cFormColor').value = c.color || '#e61919';
  document.getElementById('btnCancelEditContender').style.display = 'inline-flex';
}

function resetContenderForm() {
  document.getElementById('contenderFormHeading').textContent = '👤 Add Contender / Team';
  document.getElementById('editContenderId').value = '';
  document.getElementById('cFormName').value = '';
  document.getElementById('cFormGroup').value = '';
  document.getElementById('cFormScore').value = 0;
  document.getElementById('btnCancelEditContender').style.display = 'none';
}

// ==========================================
// PODIUM MODAL & CONFETTI ENGINE
// ==========================================
function openPodiumModal() {
  const modal = document.getElementById('podiumModalBackdrop');
  if (!modal) return;
  modal.classList.add('open');

  const sorted = [...state.contenders].sort((a, b) => b.score - a.score);
  const first = sorted[0];
  const second = sorted[1];
  const third = sorted[2];

  const stageEl = document.getElementById('podiumStageContainer');
  stageEl.innerHTML = '';

  const buildPillar = (c, place, trophy) => {
    if (!c) return '';
    return `
      <div class="podium-column podium-${place}">
        <div class="podium-avatar">${trophy}</div>
        <div class="podium-name">${escapeHtml(c.name)}</div>
        <div class="podium-score">${c.score} Marks</div>
        <div class="podium-pillar">${place}${place === 1 ? 'st' : place === 2 ? 'nd' : 'rd'}</div>
      </div>
    `;
  };

  stageEl.innerHTML =
    buildPillar(second, 2, '🥈') +
    buildPillar(first, 1, '👑') +
    buildPillar(third, 3, '🥉');

  const fullEl = document.getElementById('podiumFullStandings');
  fullEl.innerHTML = '';
  sorted.slice(3).forEach((c, idx) => {
    const row = document.createElement('div');
    row.style.cssText =
      'display:flex; justify-content:space-between; padding:0.5rem 0.85rem; background:rgba(255,255,255,0.06); border-radius:8px; font-weight:700;';
    row.innerHTML = `<span>#${idx + 4} ${escapeHtml(c.name)}</span><span style="color:var(--gold-bright);">${c.score} Marks</span>`;
    fullEl.appendChild(row);
  });

  sound.playFanfare();
  launchConfetti(130);
}

// Canvas Confetti Celebration
let confettiParticles = [];
let confettiAnimId = null;

function launchConfetti(count = 90) {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#e61919', '#fbbf24', '#fef08a', '#10b981', '#ffffff', '#8b5cf6'];

  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: window.innerWidth * (0.2 + Math.random() * 0.6),
      y: window.innerHeight * 0.35,
      vx: (Math.random() - 0.5) * 16,
      vy: -(Math.random() * 14 + 6),
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.25,
      alpha: 1
    });
  }

  if (!confettiAnimId) {
    animateConfetti();
  }
}

function animateConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiParticles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.38;
    p.rot += p.vRot;
    p.alpha -= 0.008;

    ctx.save();
    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();
  });

  confettiParticles = confettiParticles.filter((p) => p.alpha > 0 && p.y < canvas.height + 30);

  if (confettiParticles.length > 0) {
    confettiAnimId = requestAnimationFrame(animateConfetti);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiAnimId = null;
  }
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderAll() {
  renderBrandingAndHeader();
  renderCategoryFilterOptions();
  renderContenders();
  renderWheelStatsAndTracker();
  renderMultiplierBanner();
  drawWheel();
}

// ==========================================
// WIRE UP EVENT LISTENERS
// ==========================================
function initEvents() {
  const spinControls = ['btnSpinMain', 'wheelCenterSpinBtn', 'wheelCanvas'];
  spinControls.forEach((id) => {
    const control = document.getElementById(id);
    if (!control) return;
    control.addEventListener('click', spinWheel);
  });

  // Some mobile browsers/webviews omit the compatibility click after touch.
  // Forward a short, stationary touch to the normal click handlers and suppress
  // the browser's follow-up click when it does emit one.
  let touchStart = null;
  let lastForwardedTouch = null;
  let lastForwardedTouchAt = 0;
  document.addEventListener('touchstart', (event) => {
    const touch = event.changedTouches?.[0];
    if (!touch) return;
    touchStart = { x: touch.clientX, y: touch.clientY, target: event.target };
  }, { capture: true, passive: true });
  document.addEventListener('touchend', (event) => {
    const touch = event.changedTouches?.[0];
    if (!touch || !touchStart) return;
    const start = touchStart;
    touchStart = null;
    if (Math.hypot(touch.clientX - start.x, touch.clientY - start.y) > 12) return;

    const target = start.target instanceof Element
      ? start.target.closest('button, a, label, summary, canvas, [role="button"]')
      : null;
    if (!target || target.matches(':disabled') || target.getAttribute('aria-disabled') === 'true') return;

    lastForwardedTouch = target;
    lastForwardedTouchAt = Date.now();
    target.click();
    setTimeout(() => {
      if (Date.now() - lastForwardedTouchAt >= 900) lastForwardedTouch = null;
    }, 950);
  }, { capture: true, passive: true });
  document.addEventListener('click', (event) => {
    if (!event.isTrusted || !lastForwardedTouch) return;
    const clicked = event.target;
    if (Date.now() - lastForwardedTouchAt < 900 &&
        (clicked === lastForwardedTouch || lastForwardedTouch.contains(clicked))) {
      event.preventDefault();
      event.stopImmediatePropagation();
      lastForwardedTouch = null;
    }
  }, true);

  document.getElementById('btnCancelMultiplier').addEventListener('click', () => {
    state.activeMultiplier = 1;
    renderMultiplierBanner();
  });

  document.getElementById('btnNextTurnHeader').addEventListener('click', () => {
    advanceToNextContender();
    const c = getActiveContender();
    if (c) showToast(`🎯 Now on the Hot Seat: ${c.name}`);
  });

  document.getElementById('btnToggleSound').addEventListener('click', () => {
    state.settings.soundEnabled = !state.settings.soundEnabled;
    saveState();
    renderBrandingAndHeader();
  });

  document.getElementById('btnFullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  });

  document.getElementById('categoryFilterSelect').addEventListener('change', (e) => {
    state.categoryFilter = e.target.value;
    renderWheelStatsAndTracker();
    drawWheel();
  });

  document.getElementById('typeFilterSelect').addEventListener('change', (e) => {
    state.typeFilter = e.target.value;
    renderWheelStatsAndTracker();
    drawWheel();
  });

  document.getElementById('btnResetAnsweredQuestions').addEventListener('click', () => {
    state.questions.forEach((q) => {
      q.answered = false;
    });
    saveState();
    renderAll();
    showToast('All 50 questions restored onto the wheel!');
  });

  document.getElementById('btnTimerToggle').addEventListener('click', toggleQuestionTimer);
  document.getElementById('btnTimerReset').addEventListener('click', () => {
    const q = state.questions.find((item) => item.id === state.activeQuestionId);
    resetQuestionTimer(q?.timer || 30, false);
  });

  document.getElementById('btnRevealAnswer').addEventListener('click', revealCurrentAnswer);
  document.getElementById('btnCloseQuestionBox').addEventListener('click', closeQuestionBox);

  document.getElementById('btnScoreFull').addEventListener('click', () => awardPointsForCurrentQuestion(1));
  document.getElementById('btnScoreHalf').addEventListener('click', () => awardPointsForCurrentQuestion(0.5));
  document.getElementById('btnScoreWrong').addEventListener('click', () => awardPointsForCurrentQuestion(0));
  document.getElementById('btnPassBonus').addEventListener('click', passQuestionToBonus);
  document.getElementById('btnMarkCompleteNext').addEventListener('click', markCompleteAndNext);

  document.getElementById('btnSortContenders').addEventListener('click', () => {
    state.settings.sortContendersByScore = !state.settings.sortContendersByScore;
    saveState();
    renderContenders();
  });

  document.getElementById('btnQuickAddContender').addEventListener('click', () => {
    openAdminModal('tabContenders');
  });

  document.getElementById('btnOpenPodium').addEventListener('click', openPodiumModal);
  document.getElementById('btnClosePodium').addEventListener('click', () => {
    document.getElementById('podiumModalBackdrop').classList.remove('open');
  });
  document.getElementById('btnFireConfettiAgain').addEventListener('click', () => {
    sound.playFanfare();
    launchConfetti(130);
  });

  document.getElementById('btnOpenAdmin').addEventListener('click', () => openAdminModal('tabQuestions'));
  document.getElementById('btnCloseAdmin').addEventListener('click', () => {
    document.getElementById('adminModalBackdrop').classList.remove('open');
  });

  document.querySelectorAll('.admin-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      switchAdminTab(btn.dataset.tab);
    });
  });

  document.getElementById('qFormType').addEventListener('change', toggleQuestionFormTypeFields);
  document.getElementById('btnCancelEditQuestion').addEventListener('click', resetQuestionForm);
  document.getElementById('adminSearchQuestions').addEventListener('input', renderAdminPortal);

  document.getElementById('questionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('editQuestionId').value;
    const type = document.getElementById('qFormType').value;
    const category = document.getElementById('qFormCategory').value.trim() || 'Book of Daniel';
    const points = Math.max(1, Number(document.getElementById('qFormPoints').value) || 10);
    const timer = Math.max(5, Number(document.getElementById('qFormTimer').value) || 30);
    const prompt = document.getElementById('qFormPrompt').value.trim();
    const reference = document.getElementById('qFormReference').value.trim();

    if (!prompt) return;

    let options = [];
    let correctIndex = 0;
    let answer = '';

    if (type === 'mcq') {
      options = [
        document.getElementById('qFormOpt0').value.trim() || 'Option A',
        document.getElementById('qFormOpt1').value.trim() || 'Option B',
        document.getElementById('qFormOpt2').value.trim() || 'Option C',
        document.getElementById('qFormOpt3').value.trim() || 'Option D'
      ];
      const checkedRadio = document.querySelector('input[name="qFormCorrectIndex"]:checked');
      correctIndex = checkedRadio ? Number(checkedRadio.value) : 0;
      answer = options[correctIndex];
    } else {
      answer = document.getElementById('qFormShortAnswer').value.trim() || 'Host Verified Answer';
    }

    if (editId) {
      const existing = state.questions.find((q) => q.id === editId);
      if (existing) {
        existing.type = type;
        existing.category = category;
        existing.points = points;
        existing.timer = timer;
        existing.prompt = prompt;
        existing.options = options;
        existing.correctIndex = correctIndex;
        existing.answer = answer;
        existing.reference = reference;
        showToast('Question updated!');
      }
    } else {
      state.questions.push({
        id: 'q_' + Date.now(),
        type,
        category,
        points,
        timer,
        prompt,
        options,
        correctIndex,
        answer,
        reference,
        answered: false
      });
      showToast('New question added to the wheel!');
    }

    saveState();
    resetQuestionForm();
    renderAll();
    renderAdminPortal();
  });

  document.getElementById('btnExportQuestions').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state.questions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dlso-benin-50-daniel-questions.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('inputImportQuestions').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        if (Array.isArray(imported) && imported.length > 0) {
          state.questions = imported;
          saveState();
          renderAll();
          renderAdminPortal();
          showToast(`Imported ${imported.length} questions successfully!`);
        } else {
          showToast('Invalid JSON question array.');
        }
      } catch (err) {
        showToast('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
  });

  document.getElementById('btnResetDefaultQuestions').addEventListener('click', () => {
    state.questions = cloneData(DEFAULT_QUESTIONS);
    saveState();
    renderAll();
    renderAdminPortal();
    showToast('Loaded all 50 Book of Daniel Questions!');
  });

  document.getElementById('btnCancelEditContender').addEventListener('click', resetContenderForm);
  document.getElementById('contenderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('editContenderId').value;
    const name = document.getElementById('cFormName').value.trim();
    const group = document.getElementById('cFormGroup').value.trim();
    const score = Number(document.getElementById('cFormScore').value) || 0;
    const color = document.getElementById('cFormColor').value || '#e61919';

    if (!name) return;

    if (editId) {
      const existing = state.contenders.find((c) => c.id === editId);
      if (existing) {
        existing.name = name;
        existing.group = group;
        existing.score = score;
        existing.color = color;
        showToast('Contender updated!');
      }
    } else {
      const newC = {
        id: 'c_' + Date.now(),
        name,
        group,
        score,
        answeredCount: 0,
        color
      };
      state.contenders.push(newC);
      if (!state.activeContenderId) state.activeContenderId = newC.id;
      showToast(`Added contender: ${name}`);
    }

    saveState();
    resetContenderForm();
    renderAll();
    renderAdminPortal();
  });

  document.getElementById('btnResetAllScores').addEventListener('click', () => {
    state.contenders.forEach((c) => {
      c.score = 0;
      c.answeredCount = 0;
    });
    saveState();
    renderAll();
    renderAdminPortal();
    showToast('All contender scores reset to 0.');
  });

  document.getElementById('settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    state.settings.orgName = document.getElementById('setOrgName').value.trim() || 'DLSO BENIN REGION';
    state.settings.gameTitle = document.getElementById('setGameTitle').value.trim() || 'DANIEL ON THE WHEELS';
    state.settings.gameSubtitle = document.getElementById('setGameSubtitle').value.trim();
    saveState();
    renderAll();
    showToast('Branding & event details saved!');
  });

  ['setRemoveAnswered', 'setIncludeSpecialWedges', 'setAutoStartTimer', 'setSpinDuration'].forEach((id) => {
    document.getElementById(id).addEventListener('change', () => {
      state.settings.removeAnsweredFromWheel = document.getElementById('setRemoveAnswered').checked;
      state.settings.includeSpecialWedges = document.getElementById('setIncludeSpecialWedges').checked;
      state.settings.autoStartTimer = document.getElementById('setAutoStartTimer').checked;
      state.settings.spinDuration = Math.max(2, Number(document.getElementById('setSpinDuration').value) || 5);
      saveState();
      renderAll();
    });
  });

  document.getElementById('setLogoUpload').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.settings.customLogoDataUrl = reader.result;
      saveState();
      renderBrandingAndHeader();
      showToast('Custom logo uploaded!');
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('btnResetLogoDefault').addEventListener('click', () => {
    state.settings.customLogoDataUrl = '';
    saveState();
    location.reload();
  });

  const btnSaveSb = document.getElementById('btnSaveSupabaseKey');
  if (btnSaveSb) {
    btnSaveSb.addEventListener('click', async () => {
      state.settings.supabaseUrl =
        document.getElementById('setSupabaseUrl').value.trim() || 'https://mrubxczyfxhgfvkpzaxq.supabase.co';
      state.settings.supabaseAnonKey = document.getElementById('setSupabaseAnonKey').value.trim();
      saveState();
      await syncFromSupabaseCloud();
      showToast('☁️ Supabase cloud connection updated!');
    });
  }

  window.addEventListener('keydown', (e) => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (document.getElementById('adminModalBackdrop').classList.contains('open')) return;

    if (e.code === 'Space') {
      e.preventDefault();
      spinWheel();
    } else if (e.key === 'r' || e.key === 'R') {
      if (state.activeQuestionId) revealCurrentAnswer();
    } else if (e.key === 't' || e.key === 'T') {
      if (state.activeQuestionId) toggleQuestionTimer();
    } else if (e.key === 'n' || e.key === 'N') {
      advanceToNextContender();
      const c = getActiveContender();
      if (c) showToast(`🎯 Now on the Hot Seat: ${c.name}`);
    }
  });
}

function openAdminModal(tabId = 'tabQuestions') {
  renderAdminPortal();
  switchAdminTab(tabId);
  document.getElementById('adminModalBackdrop').classList.add('open');
}

function switchAdminTab(tabId) {
  document.querySelectorAll('.admin-tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.admin-tab-pane').forEach((pane) => {
    pane.classList.toggle('active', pane.id === tabId);
  });
}

// Initialize App on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initEvents();
  renderAll();
});
