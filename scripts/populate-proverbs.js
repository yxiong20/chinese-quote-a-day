const fs = require('fs');
const path = require('path');

const proverbs = [
  {
    id: "p0001",
    zh: "千里之行，始于足下",
    pinyin: "qiān lǐ zhī xíng, shǐ yú zú xià",
    en: "A journey of a thousand miles begins with a single step.",
    origin: "This proverb emphasizes that great achievements start with small, initial actions. It encourages taking the first step despite the daunting nature of large goals.",
    source: "Dao De Jing by Laozi"
  },
  {
    id: "p0002",
    zh: "学而不思则罔，思而不学则殆",
    pinyin: "xué ér bù sī zé wǎng, sī ér bù xué zé dài",
    en: "Learning without thought is labor lost; thought without learning is perilous.",
    origin: "Confucius taught that true understanding requires both study and reflection. Knowledge without critical thinking leads nowhere, while thinking without learning is dangerous.",
    source: "The Analects of Confucius"
  },
  {
    id: "p0003",
    zh: "塞翁失马，焉知非福",
    pinyin: "sài wēng shī mǎ, yān zhī fēi fú",
    en: "A blessing in disguise.",
    origin: "From a story about an old man whose horse ran away, seemingly bad luck. But the horse returned with another horse, good luck. His son broke his leg riding it, bad luck. But this saved him from going to war. This teaches that fortunes change unpredictably.",
    source: "Huainanzi"
  },
  {
    id: "p0004",
    zh: "授人以鱼不如授人以渔",
    pinyin: "shòu rén yǐ yú bù rú shòu rén yǐ yú",
    en: "Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime.",
    origin: "This proverb emphasizes the value of teaching skills over providing temporary solutions. Empowering others with knowledge is more beneficial than simple charity.",
    source: "Traditional Chinese wisdom"
  },
  {
    id: "p0005",
    zh: "三人行，必有我师焉",
    pinyin: "sān rén xíng, bì yǒu wǒ shī yān",
    en: "When three people walk together, one of them can be my teacher.",
    origin: "Confucius taught humility in learning. Among any group, there is always someone from whom we can learn something valuable.",
    source: "The Analects of Confucius"
  },
  {
    id: "p0006",
    zh: "水滴石穿",
    pinyin: "shuǐ dī shí chuān",
    en: "Constant dripping wears away the stone.",
    origin: "Persistence and consistency can overcome the hardest obstacles. Small, repeated efforts eventually lead to significant results.",
    source: "Han Dynasty writings"
  },
  {
    id: "p0007",
    zh: "知己知彼，百战不殆",
    pinyin: "zhī jǐ zhī bǐ, bǎi zhàn bù dài",
    en: "Know yourself and know your enemy, and you will never be defeated.",
    origin: "Sun Tzu's famous military strategy principle emphasizes thorough understanding of both one's own capabilities and the opponent's strengths and weaknesses.",
    source: "The Art of War by Sun Tzu"
  },
  {
    id: "p0008",
    zh: "己所不欲，勿施于人",
    pinyin: "jǐ suǒ bù yù, wù shī yú rén",
    en: "Do not do to others what you do not want done to yourself.",
    origin: "This is Confucius's version of the Golden Rule, emphasizing empathy and treating others with the same consideration we wish for ourselves.",
    source: "The Analects of Confucius"
  },
  {
    id: "p0009",
    zh: "笨鸟先飞",
    pinyin: "bèn niǎo xiān fēi",
    en: "The slow bird should make an early start.",
    origin: "Those who are less talented must work harder and start earlier to succeed. Effort and diligence can compensate for natural disadvantages.",
    source: "Traditional Chinese proverb"
  },
  {
    id: "p0010",
    zh: "百闻不如一见",
    pinyin: "bǎi wén bù rú yī jiàn",
    en: "Seeing once is better than hearing a hundred times.",
    origin: "Direct experience is more valuable than secondhand knowledge. This emphasizes the importance of personal observation and verification.",
    source: "Han Shu (Book of Han)"
  },
  {
    id: "p0011",
    zh: "读万卷书不如行万里路",
    pinyin: "dú wàn juàn shū bù rú xíng wàn lǐ lù",
    en: "Reading ten thousand books is not as useful as traveling ten thousand miles.",
    origin: "Practical experience and real-world exposure provide deeper understanding than pure academic study.",
    source: "Traditional Chinese wisdom"
  },
  {
    id: "p0012",
    zh: "失败乃成功之母",
    pinyin: "shī bài nǎi chéng gōng zhī mǔ",
    en: "Failure is the mother of success.",
    origin: "Setbacks and mistakes provide valuable lessons that lead to eventual success. Learning from failure is essential for achievement.",
    source: "Modern Chinese expression"
  },
  {
    id: "p0013",
    zh: "有志者事竟成",
    pinyin: "yǒu zhì zhě shì jìng chéng",
    en: "Where there is a will, there is a way.",
    origin: "Determination and strong resolve enable one to overcome obstacles and achieve goals.",
    source: "Book of the Later Han"
  },
  {
    id: "p0014",
    zh: "温故而知新",
    pinyin: "wēn gù ér zhī xīn",
    en: "Review the old to learn the new.",
    origin: "Confucius taught that revisiting past knowledge helps us discover new insights and deeper understanding.",
    source: "The Analects of Confucius"
  },
  {
    id: "p0015",
    zh: "熟能生巧",
    pinyin: "shú néng shēng qiǎo",
    en: "Practice makes perfect.",
    origin: "Repeated practice and familiarity with a task lead to mastery and skillful execution.",
    source: "Traditional Chinese proverb"
  },
  {
    id: "p0016",
    zh: "一箭双雕",
    pinyin: "yī jiàn shuāng diāo",
    en: "Kill two birds with one stone.",
    origin: "Accomplish two objectives with a single action, demonstrating efficiency and clever strategy.",
    source: "Northern History chronicles"
  },
  {
    id: "p0017",
    zh: "画蛇添足",
    pinyin: "huà shé tiān zú",
    en: "Draw a snake and add feet to it.",
    origin: "From a story about servants competing to draw a snake fastest. The winner added feet to his snake and lost. It warns against overdoing things or adding unnecessary elements that ruin perfection.",
    source: "Warring States texts"
  },
  {
    id: "p0018",
    zh: "对牛弹琴",
    pinyin: "duì niú tán qín",
    en: "Play the lute to a cow.",
    origin: "Refers to wasting effort on someone who cannot appreciate it, like explaining complex matters to those unable to understand.",
    source: "Buddhist scripture commentary"
  },
  {
    id: "p0019",
    zh: "亡羊补牢",
    pinyin: "wáng yáng bǔ láo",
    en: "Mend the fold after the sheep are lost.",
    origin: "It's never too late to fix a problem, even after damage has occurred. Taking corrective action is still valuable.",
    source: "Warring States texts"
  },
  {
    id: "p0020",
    zh: "井底之蛙",
    pinyin: "jǐng dǐ zhī wā",
    en: "A frog in a well.",
    origin: "Describes someone with a narrow, limited perspective who is unaware of the broader world beyond their small experience.",
    source: "Zhuangzi"
  },
  {
    id: "p0021",
    zh: "滴水之恩，当涌泉相报",
    pinyin: "dī shuǐ zhī ēn, dāng yǒng quán xiāng bào",
    en: "A drop of water in need shall be returned with a burst of spring.",
    origin: "Teaches gratitude: even small acts of kindness should be repaid generously.",
    source: "Traditional Chinese wisdom"
  },
  {
    id: "p0022",
    zh: "远水救不了近火",
    pinyin: "yuǎn shuǐ jiù bù liǎo jìn huǒ",
    en: "Distant water cannot quench a nearby fire.",
    origin: "Solutions must be timely and practical; help from far away may arrive too late to address urgent problems.",
    source: "Traditional proverb"
  },
  {
    id: "p0023",
    zh: "人非圣贤，孰能无过",
    pinyin: "rén fēi shèng xián, shú néng wú guò",
    en: "People are not sages; who can be without faults?",
    origin: "Acknowledges human imperfection and encourages forgiveness and understanding of mistakes.",
    source: "Traditional wisdom"
  },
  {
    id: "p0024",
    zh: "良药苦口利于病",
    pinyin: "liáng yào kǔ kǒu lì yú bìng",
    en: "Good medicine tastes bitter but benefits the illness.",
    origin: "Difficult truths and harsh advice, though unpleasant, are often what we need most for improvement.",
    source: "Traditional proverb"
  },
  {
    id: "p0025",
    zh: "三思而后行",
    pinyin: "sān sī ér hòu xíng",
    en: "Think three times before acting.",
    origin: "Encourages careful deliberation before taking action to avoid mistakes and ensure wise decisions.",
    source: "The Analects of Confucius"
  },
  {
    id: "p0026",
    zh: "一寸光阴一寸金",
    pinyin: "yī cùn guāng yīn yī cùn jīn",
    en: "An inch of time is an inch of gold.",
    origin: "Time is as precious as gold and should not be wasted. This emphasizes the value of time management.",
    source: "Tang Dynasty poetry"
  },
  {
    id: "p0027",
    zh: "书山有路勤为径",
    pinyin: "shū shān yǒu lù qín wéi jìng",
    en: "There is a path through the mountain of books, and diligence is the way.",
    origin: "Success in learning requires hard work and dedication. There are no shortcuts to knowledge.",
    source: "Traditional educational saying"
  },
  {
    id: "p0028",
    zh: "天下无难事，只怕有心人",
    pinyin: "tiān xià wú nán shì, zhǐ pà yǒu xīn rén",
    en: "Nothing in the world is difficult for one who sets their mind to it.",
    origin: "Determination and focused effort can overcome any challenge.",
    source: "Traditional proverb"
  },
  {
    id: "p0029",
    zh: "冰冻三尺，非一日之寒",
    pinyin: "bīng dòng sān chǐ, fēi yī rì zhī hán",
    en: "It takes more than one cold day for a river to freeze three feet deep.",
    origin: "Problems and achievements don't happen overnight; they result from long-term accumulation of causes.",
    source: "Traditional wisdom"
  },
  {
    id: "p0030",
    zh: "一言既出，驷马难追",
    pinyin: "yī yán jì chū, sì mǎ nán zhuī",
    en: "A word spoken cannot be overtaken even by a team of four horses.",
    origin: "Once something is said, it cannot be taken back. This emphasizes being careful with one's words and keeping promises.",
    source: "The Analects of Confucius"
  },
  {
    id: "p0031",
    zh: "天生我材必有用",
    pinyin: "tiān shēng wǒ cái bì yǒu yòng",
    en: "Heaven has made us all for some useful purpose.",
    origin: "Everyone has inherent value and talents that will find their purpose. This encourages self-confidence.",
    source: "Poem by Li Bai"
  },
  {
    id: "p0032",
    zh: "入乡随俗",
    pinyin: "rù xiāng suí sú",
    en: "When in Rome, do as the Romans do.",
    origin: "Adapt to local customs and practices when in a new place to show respect and integrate successfully.",
    source: "Traditional proverb"
  },
  {
    id: "p0033",
    zh: "不经一事，不长一智",
    pinyin: "bù jīng yī shì, bù zhǎng yī zhì",
    en: "Without experiencing one thing, you won't gain one piece of wisdom.",
    origin: "Experience is the best teacher. We learn and grow through direct encounters with challenges.",
    source: "Traditional wisdom"
  },
  {
    id: "p0034",
    zh: "欲速则不达",
    pinyin: "yù sù zé bù dá",
    en: "Haste makes waste.",
    origin: "Rushing toward a goal too quickly often leads to mistakes and failure. Patience and proper pace lead to success.",
    source: "The Analects of Confucius"
  },
  {
    id: "p0035",
    zh: "患难见真情",
    pinyin: "huàn nàn jiàn zhēn qíng",
    en: "A friend in need is a friend indeed.",
    origin: "True friendship and character are revealed during difficult times and adversity.",
    source: "Traditional proverb"
  },
  {
    id: "p0036",
    zh: "不入虎穴，焉得虎子",
    pinyin: "bù rù hǔ xué, yān dé hǔ zǐ",
    en: "If you don't enter the tiger's den, how can you catch the tiger cub?",
    origin: "Great rewards require taking risks. Success often demands courage to face danger.",
    source: "Book of the Later Han"
  },
  {
    id: "p0037",
    zh: "纸上谈兵",
    pinyin: "zhǐ shàng tán bīng",
    en: "Discussing military strategy on paper.",
    origin: "From the story of Zhao Kuo, who studied military theory but had no practical experience, leading to disastrous defeat. Warns against relying solely on theoretical knowledge.",
    source: "Records of the Grand Historian"
  },
  {
    id: "p0038",
    zh: "明枪易躲，暗箭难防",
    pinyin: "míng qiāng yì duǒ, àn jiàn nán fáng",
    en: "Open attacks are easy to dodge; hidden arrows are hard to guard against.",
    origin: "Obvious threats can be dealt with, but deception and hidden dangers are more treacherous.",
    source: "Traditional proverb"
  },
  {
    id: "p0039",
    zh: "勤能补拙",
    pinyin: "qín néng bǔ zhuō",
    en: "Diligence can make up for lack of talent.",
    origin: "Hard work and persistence can overcome natural disadvantages or lack of innate ability.",
    source: "Traditional wisdom"
  },
  {
    id: "p0040",
    zh: "一叶知秋",
    pinyin: "yī yè zhī qiū",
    en: "One falling leaf heralds the autumn.",
    origin: "Small signs can indicate larger trends. Observant people can predict future developments from subtle clues.",
    source: "Huainanzi"
  },
  {
    id: "p0041",
    zh: "人无远虑，必有近忧",
    pinyin: "rén wú yuǎn lǜ, bì yǒu jìn yōu",
    en: "Without foresight, one will have immediate worries.",
    origin: "Failing to plan for the future leads to problems in the present. Strategic thinking prevents crises.",
    source: "The Analects of Confucius"
  },
  {
    id: "p0042",
    zh: "少壮不努力，老大徒伤悲",
    pinyin: "shào zhuàng bù nǔ lì, lǎo dà tú shāng bēi",
    en: "If you don't work hard in youth, you'll only grieve in old age.",
    origin: "Encourages making the most of one's youth and energy, as opportunities lost in youth cannot be regained.",
    source: "Ancient folk poem"
  },
  {
    id: "p0043",
    zh: "听君一席话，胜读十年书",
    pinyin: "tīng jūn yī xí huà, shèng dú shí nián shū",
    en: "Listening to your words is better than reading ten years of books.",
    origin: "A single insightful conversation can provide more value than years of study alone.",
    source: "Traditional expression"
  },
  {
    id: "p0044",
    zh: "宁为玉碎，不为瓦全",
    pinyin: "nìng wéi yù suì, bù wéi wǎ quán",
    en: "Better to be a shattered jade than an intact tile.",
    origin: "Better to die with honor than to live in disgrace. This emphasizes integrity and dignity over mere survival.",
    source: "Book of Northern Qi"
  },
  {
    id: "p0045",
    zh: "前事不忘，后事之师",
    pinyin: "qián shì bù wàng, hòu shì zhī shī",
    en: "Remember past lessons to guide future actions.",
    origin: "Learning from history and past experiences helps avoid repeating mistakes.",
    source: "Warring States texts"
  },
  {
    id: "p0046",
    zh: "磨刀不误砍柴工",
    pinyin: "mó dāo bù wù kǎn chái gōng",
    en: "Sharpening your axe won't delay your job of cutting wood.",
    origin: "Proper preparation and tool maintenance actually save time and improve efficiency in the long run.",
    source: "Traditional proverb"
  },
  {
    id: "p0047",
    zh: "众人拾柴火焰高",
    pinyin: "zhòng rén shí chái huǒ yàn gāo",
    en: "Many hands make light work.",
    origin: "Collective effort produces better results than individual work. Teamwork amplifies achievements.",
    source: "Traditional saying"
  },
  {
    id: "p0048",
    zh: "瓜田不纳履，李下不整冠",
    pinyin: "guā tián bù nà lǚ, lǐ xià bù zhěng guān",
    en: "Don't adjust your shoes in a melon field, don't fix your hat under a plum tree.",
    origin: "Avoid situations that might create suspicion or misunderstanding, even if you're innocent.",
    source: "Ancient poem"
  },
  {
    id: "p0049",
    zh: "凡事预则立，不预则废",
    pinyin: "fán shì yù zé lì, bù yù zé fèi",
    en: "Preparation leads to success; lack of preparation leads to failure.",
    origin: "Proper planning is essential for achieving any goal.",
    source: "The Doctrine of the Mean"
  },
  {
    id: "p0050",
    zh: "当局者迷，旁观者清",
    pinyin: "dāng jú zhě mí, páng guān zhě qīng",
    en: "The player is confused; the bystander sees clearly.",
    origin: "Those directly involved in a situation may lack perspective, while outside observers can see things more objectively.",
    source: "Old Book of Tang"
  },
  {
    id: "p0051",
    zh: "一箭双雕",
    pinyin: "yī jiàn shuāng diāo",
    en: "Kill two eagles with one arrow.",
    origin: "Kill two birds with one stone - achieve two aims at once.",
    source: "History of the Northern Dynasties"
  },
  {
    id: "p0052",
    zh: "破釜沉舟",
    pinyin: "pò fǔ chén zhōu",
    en: "Break the cauldrons and sink the boats.",
    origin: "Burn bridges - commit oneself irrevocably to a course of action.",
    source: "Battle of Julu"
  },
  {
    id: "p0053",
    zh: "指鹿为马",
    pinyin: "zhǐ lù wéi mǎ",
    en: "Call a deer a horse.",
    origin: "Deliberately misrepresent the truth.",
    source: "Zhao Gao"
  },
  {
    id: "p0054",
    zh: "乐不思蜀",
    pinyin: "lè bù sī shǔ",
    en: "So happy as to forget Shu.",
    origin: "Indulge in pleasures and forget one's duty or homeland.",
    source: "Liu Shan"
  },
  {
    id: "p0055",
    zh: "朝三暮四",
    pinyin: "zhāo sān mù sì",
    en: "Three in the morning and four in the evening.",
    origin: "A change without any substantive difference; inconsistent behavior.",
    source: "Zhuangzi"
  },
  {
    id: "p0056",
    zh: "磨杵成针",
    pinyin: "mó chǔ chéng zhēn",
    en: "Grind an iron bar down to a fine needle.",
    origin: "Persevere in a difficult task; with patience anything is possible.",
    source: "Li Bai"
  },
  {
    id: "p0057",
    zh: "守株待兔",
    pinyin: "shǒu zhū dài tù",
    en: "Guard a tree-stump to wait for rabbits.",
    origin: "Wait idly for a reward; rely on luck rather than effort.",
    source: "Han Feizi"
  },
  {
    id: "p0058",
    zh: "三人成虎",
    pinyin: "sān rén chéng hǔ",
    en: "Three men make a tiger.",
    origin: "A repeated rumor becomes accepted as fact.",
    source: "Warring States Records"
  },
  {
    id: "p0059",
    zh: "完璧归赵",
    pinyin: "wán bì guī zhào",
    en: "Return the jade to Zhao.",
    origin: "Return something intact to its rightful owner.",
    source: "Mr. He's jade"
  },
  {
    id: "p0060",
    zh: "刻舟求剑",
    pinyin: "kè zhōu qiú jiàn",
    en: "Carve the boat in search of the sword.",
    origin: "Approach without considering the reality of a changing situation.",
    source: "Lüshi Chunqiu"
  },
  {
    id: "p0061",
    zh: "火中取栗",
    pinyin: "huǒ zhōng qǔ lì",
    en: "Take chestnuts out of the fire.",
    origin: "Someone acting in another's interest; being a cat's-paw.",
    source: "The Monkey and the Cat"
  },
  {
    id: "p0062",
    zh: "负荆请罪",
    pinyin: "fù jīng qǐng zuì",
    en: "Carrying a bramble and ask for punishment.",
    origin: "Offer a humble apology; acknowledge one's mistakes.",
    source: "Lian Po"
  },
  {
    id: "p0063",
    zh: "画龙点睛",
    pinyin: "huà lóng diǎn jīng",
    en: "To add eyes when painting a dragon.",
    origin: "Adding the finishing touch to something.",
    source: "Zhang Sengyou"
  },
  {
    id: "p0064",
    zh: "狼吞虎咽",
    pinyin: "láng tūn hǔ yàn",
    en: "Swallow like a tiger and devour like a wolf.",
    origin: "Devouring food quickly and in a messy manner.",
    source: "Traditional saying"
  },
  {
    id: "p0065",
    zh: "衣锦还乡",
    pinyin: "yī jǐn huán xiāng",
    en: "To wear embroidered clothing and return to one's hometown.",
    origin: "Return to humble origins after making it big; return home in glory.",
    source: "Traditional saying"
  },
  {
    id: "p0066",
    zh: "易如反掌",
    pinyin: "yì rú fǎn zhǎng",
    en: "As easy as turning over one's hand.",
    origin: "For something to be very easy.",
    source: "Mencius"
  },
  {
    id: "p0067",
    zh: "邯郸学步",
    pinyin: "hán dān xué bù",
    en: "To learn the walk of Handan.",
    origin: "To imitate others and lose one's own abilities in the process.",
    source: "Learning the Walk of Handan"
  },
  {
    id: "p0068",
    zh: "虎背熊腰",
    pinyin: "hǔ bèi xióng yāo",
    en: "Tiger's back and bear's waist.",
    origin: "Describes a man who is big and burly.",
    source: "Traditional saying"
  },
  {
    id: "p0069",
    zh: "虎头虎脑",
    pinyin: "hǔ tóu hǔ nǎo",
    en: "Tiger's head and tiger's brain.",
    origin: "Describes a sturdy, simple and honest child.",
    source: "Traditional saying"
  },
  {
    id: "p0070",
    zh: "虎口余生",
    pinyin: "hǔ kǒu yú shēng",
    en: "Rescued from a tiger's mouth.",
    origin: "Narrowly escape from death.",
    source: "Traditional saying"
  },
  {
    id: "p0071",
    zh: "狐假虎威",
    pinyin: "hú jiǎ hǔ wēi",
    en: "A fox borrowing a tiger's fierceness.",
    origin: "Bully others by flaunting one's powerful connections.",
    source: "Traditional saying"
  },
  {
    id: "p0072",
    zh: "钻牛角尖",
    pinyin: "zuān niú jiǎo jiān",
    en: "Screw the pointy end of an ox's horn.",
    origin: "Splitting hairs; being overly meticulous about trivial matters.",
    source: "Traditional saying"
  },
  {
    id: "p0073",
    zh: "吹牛皮",
    pinyin: "chuī niú pí",
    en: "Blow a bull's skin.",
    origin: "Talking big; boasting.",
    source: "Traditional saying"
  },
  {
    id: "p0074",
    zh: "九牛一毛",
    pinyin: "jiǔ niú yī máo",
    en: "One hair from nine bulls.",
    origin: "A drop in the bucket; an insignificant amount.",
    source: "Traditional saying"
  },
  {
    id: "p0075",
    zh: "鸡飞蛋打",
    pinyin: "jī fēi dàn dǎ",
    en: "The hen flies away and eggs are broken.",
    origin: "To suffer a dead loss; lose everything.",
    source: "Traditional saying"
  },
  {
    id: "p0076",
    zh: "鸡犬不宁",
    pinyin: "jī quǎn bù níng",
    en: "Even chickens and dogs do not have peace.",
    origin: "Great turmoil; extreme disturbance.",
    source: "Traditional saying"
  },
  {
    id: "p0077",
    zh: "鸡毛蒜皮",
    pinyin: "jī máo suàn pí",
    en: "Chicken's feathers and garlic skins.",
    origin: "Trivialities; unimportant matters.",
    source: "Traditional saying"
  },
  {
    id: "p0078",
    zh: "鸡蛋里挑骨头",
    pinyin: "jī dàn lǐ tiāo gǔ tóu",
    en: "Look for a bone in an egg.",
    origin: "Look for a flaw where there's none to be found; be overly critical.",
    source: "Traditional saying"
  },
  {
    id: "p0079",
    zh: "百闻不如一见",
    pinyin: "bǎi wén bù rú yī jiàn",
    en: "Hearing something a hundred times isn't better than seeing it once.",
    origin: "Direct experience is more valuable than hearsay.",
    source: "Han Shu"
  },
  {
    id: "p0080",
    zh: "宁为玉碎不为瓦全",
    pinyin: "nìng wéi yù suì bù wéi wǎ quán",
    en: "Better to be a shattered jade than an intact tile.",
    origin: "Better to die with honor than to live in disgrace.",
    source: "Book of Northern Qi"
  },
  {
    id: "p0081",
    zh: "言而无信",
    pinyin: "yán ér wú xìn",
    en: "Speaking yet without trust.",
    origin: "One who cannot be trusted despite what he says; deceitful.",
    source: "The Analects"
  },
  {
    id: "p0082",
    zh: "言不由衷",
    pinyin: "yán bù yóu zhōng",
    en: "Speak not from the bosom.",
    origin: "To speak with one's tongue in one's cheek; insincere speech.",
    source: "Traditional saying"
  },
  {
    id: "p0083",
    zh: "冰山一角",
    pinyin: "bīng shān yī jiǎo",
    en: "One corner of an ice mountain.",
    origin: "The tip of the iceberg; a small visible part of a larger problem.",
    source: "Modern expression"
  },
  {
    id: "p0084",
    zh: "一日千秋",
    pinyin: "yī rì qiān qiū",
    en: "One day, a thousand autumns.",
    origin: "One day equals a thousand years; rapid changes or missing someone deeply.",
    source: "Traditional expression"
  },
  {
    id: "p0085",
    zh: "一日千里",
    pinyin: "yī rì qiān lǐ",
    en: "One day, a thousand miles.",
    origin: "Rapid progress; traveling a thousand miles in a day.",
    source: "Traditional expression"
  },
  {
    id: "p0086",
    zh: "一日三秋",
    pinyin: "yī rì sān qiū",
    en: "One day, three autumns.",
    origin: "Greatly missing someone; one day feels as long as three years.",
    source: "Traditional expression"
  },
  {
    id: "p0087",
    zh: "一帆风顺",
    pinyin: "yī fán fēng shùn",
    en: "Ship with a single sail, sailing smoothly.",
    origin: "Success without obstacles; smooth sailing.",
    source: "Traditional blessing"
  },
  {
    id: "p0088",
    zh: "二龙腾飞",
    pinyin: "èr lóng téng fēi",
    en: "Two dragons soaring.",
    origin: "Aspirations for soaring success and progress.",
    source: "Traditional blessing"
  },
  {
    id: "p0089",
    zh: "三阳开泰",
    pinyin: "sān yáng kāi tài",
    en: "The arrival of good fortune.",
    origin: "Metaphor for winter's end and spring's beginning; good luck arriving.",
    source: "Traditional blessing"
  },
  {
    id: "p0090",
    zh: "四季平安",
    pinyin: "sì jì píng ān",
    en: "Peace and safety throughout the four seasons.",
    origin: "Peace and safety throughout the year.",
    source: "Traditional blessing"
  },
  {
    id: "p0091",
    zh: "五福临门",
    pinyin: "wǔ fú lín mén",
    en: "The five blessings arrive.",
    origin: "Health, longevity, prosperity, virtue, and peace arriving together.",
    source: "Traditional blessing"
  },
  {
    id: "p0092",
    zh: "六六大顺",
    pinyin: "liù liù dà shùn",
    en: "Everything goes smoothly.",
    origin: "Everything flows smoothly without hindrance.",
    source: "Traditional blessing"
  },
  {
    id: "p0093",
    zh: "七星高照",
    pinyin: "qī xīng gāo zhào",
    en: "The seven stars shine brightly.",
    origin: "Invoking the auspiciousness of the Big Dipper Constellation.",
    source: "Traditional blessing"
  },
  {
    id: "p0094",
    zh: "八方来财",
    pinyin: "bā fāng lái cái",
    en: "Wealth arrives from all directions.",
    origin: "Prosperity coming from everywhere.",
    source: "Traditional blessing"
  },
  {
    id: "p0095",
    zh: "九九同心",
    pinyin: "jiǔ jiǔ tóng xīn",
    en: "United in heart forever.",
    origin: "Conveying a sense of eternity and longevity in relationships.",
    source: "Traditional blessing"
  },
  {
    id: "p0096",
    zh: "十全十美",
    pinyin: "shí quán shí měi",
    en: "Perfect in every way.",
    origin: "Completeness and perfection in all aspects.",
    source: "Traditional expression"
  },
  {
    id: "p0097",
    zh: "卧虎藏龙",
    pinyin: "wò hǔ cáng lóng",
    en: "Crouching tiger, hidden dragon.",
    origin: "Hidden talents; undiscovered brilliance.",
    source: "Traditional expression"
  },
  {
    id: "p0098",
    zh: "实事求是",
    pinyin: "shí shì qiú shì",
    en: "Seek truth from facts.",
    origin: "Be practical and realistic; base conclusions on evidence.",
    source: "Traditional philosophy"
  },
  {
    id: "p0099",
    zh: "两虎相斗",
    pinyin: "liǎng hǔ xiāng dòu",
    en: "When two tigers fight.",
    origin: "When powerful rivals clash, someone gets hurt.",
    source: "Traditional saying"
  },
  {
    id: "p0100",
    zh: "镜花水月",
    pinyin: "jìng huā shuǐ yuè",
    en: "Mirror flower, water moon.",
    origin: "Illusion; something beautiful but unattainable.",
    source: "Traditional expression"
  },
  {
    id: "p0101",
    zh: "胸有成竹",
    pinyin: "xiōng yǒu chéng zhú",
    en: "Have a well-thought-out plan.",
    origin: "To have a bamboo in one's chest; be well-prepared and confident.",
    source: "Traditional expression"
  },
  {
    id: "p0102",
    zh: "愚公移山",
    pinyin: "yú gōng yí shān",
    en: "The Foolish Old Man removes the mountains.",
    origin: "Perseverance can overcome any obstacle.",
    source: "Liezi"
  },
  {
    id: "p0103",
    zh: "杯弓蛇影",
    pinyin: "bēi gōng shé yǐng",
    en: "Mistaking the reflection of a bow in a cup for a snake.",
    origin: "Unfounded fear; paranoia.",
    source: "Jin Shu"
  },
  {
    id: "p0104",
    zh: "盲人摸象",
    pinyin: "máng rén mō xiàng",
    en: "Blind men touching an elephant.",
    origin: "Partial understanding leading to wrong conclusions.",
    source: "Buddhist scripture"
  },
  {
    id: "p0105",
    zh: "望梅止渴",
    pinyin: "wàng méi zhǐ kě",
    en: "Quench thirst by thinking of plums.",
    origin: "Console oneself with false hopes.",
    source: "Wei Shu"
  },
  {
    id: "p0106",
    zh: "掩耳盗铃",
    pinyin: "yǎn ěr dào líng",
    en: "Cover one's ears while stealing a bell.",
    origin: "Deceive oneself; bury one's head in the sand.",
    source: "Lü's Spring and Autumn Annals"
  },
  {
    id: "p0107",
    zh: "叶公好龙",
    pinyin: "yè gōng hào lóng",
    en: "Lord Ye loves dragons.",
    origin: "Profess to like something but fear it in reality.",
    source: "Han Feizi"
  },
  {
    id: "p0108",
    zh: "买椟还珠",
    pinyin: "mǎi dú huán zhū",
    en: "Buy the case but return the pearl.",
    origin: "Focus on superficial things and miss what's valuable.",
    source: "Han Feizi"
  },
  {
    id: "p0109",
    zh: "夸父追日",
    pinyin: "kuā fù zhuī rì",
    en: "Kuafu chasing the sun.",
    origin: "Pursue an impossible goal with determination.",
    source: "Shan Hai Jing"
  },
  {
    id: "p0110",
    zh: "精卫填海",
    pinyin: "jīng wèi tián hǎi",
    en: "Jingwei trying to fill up the sea.",
    origin: "Indomitable spirit in pursuing a difficult task.",
    source: "Shan Hai Jing"
  },
  {
    id: "p0111",
    zh: "女娲补天",
    pinyin: "nǚ wā bǔ tiān",
    en: "Nüwa mending the sky.",
    origin: "Heroic efforts to fix a major problem.",
    source: "Huainanzi"
  },
  {
    id: "p0112",
    zh: "愚公之志",
    pinyin: "yú gōng zhī zhì",
    en: "The determination of the Foolish Old Man.",
    origin: "Unwavering determination to achieve one's goal.",
    source: "Liezi"
  },
  {
    id: "p0113",
    zh: "后羿射日",
    pinyin: "hòu yì shè rì",
    en: "Hou Yi shooting the suns.",
    origin: "Heroic feat overcoming great challenges.",
    source: "Shan Hai Jing"
  },
  {
    id: "p0114",
    zh: "嫦娥奔月",
    pinyin: "cháng é bēn yuè",
    en: "Chang'e fleeing to the moon.",
    origin: "Sacrifice and separation for a greater cause.",
    source: "Huainanzi"
  },
  {
    id: "p0115",
    zh: "大公无私",
    pinyin: "dà gōng wú sī",
    en: "Selfless and impartial.",
    origin: "Acting for public good without selfish motives.",
    source: "Traditional expression"
  },
  {
    id: "p0116",
    zh: "公而忘私",
    pinyin: "gōng ér wàng sī",
    en: "Devoted to public duty and forgetting private interests.",
    origin: "Put public interest above personal gain.",
    source: "Traditional expression"
  },
  {
    id: "p0117",
    zh: "刚正不阿",
    pinyin: "gāng zhèng bù ē",
    en: "Upright and never stooping to flattery.",
    origin: "Maintain integrity and principles.",
    source: "Traditional expression"
  },
  {
    id: "p0118",
    zh: "光明磊落",
    pinyin: "guāng míng lěi luò",
    en: "Frank and open; above-board.",
    origin: "Honest and straightforward in behavior.",
    source: "Traditional expression"
  },
  {
    id: "p0119",
    zh: "正大光明",
    pinyin: "zhèng dà guāng míng",
    en: "Just and honorable.",
    origin: "Acting openly and righteously.",
    source: "Traditional expression"
  },
  {
    id: "p0120",
    zh: "心口如一",
    pinyin: "xīn kǒu rú yī",
    en: "What the heart thinks, the mouth speaks.",
    origin: "Honest and sincere.",
    source: "Traditional expression"
  },
  {
    id: "p0121",
    zh: "表里如一",
    pinyin: "biǎo lǐ rú yī",
    en: "Same inside and outside.",
    origin: "Consistent in thoughts and actions.",
    source: "Traditional expression"
  },
  {
    id: "p0122",
    zh: "言行一致",
    pinyin: "yán xíng yī zhì",
    en: "Words and deeds match.",
    origin: "Practice what you preach.",
    source: "Traditional expression"
  },
  {
    id: "p0123",
    zh: "表里一致",
    pinyin: "biǎo lǐ yī zhì",
    en: "Appearance and reality are consistent.",
    origin: "Genuine and authentic.",
    source: "Traditional expression"
  },
  {
    id: "p0124",
    zh: "襟怀坦白",
    pinyin: "jīn huái tǎn bái",
    en: "Open and frank.",
    origin: "Honest and straightforward.",
    source: "Traditional expression"
  },
  {
    id: "p0125",
    zh: "开诚布公",
    pinyin: "kāi chéng bù gōng",
    en: "Speak frankly and sincerely.",
    origin: "Be honest and open in communication.",
    source: "Traditional expression"
  },
  {
    id: "p0126",
    zh: "开门见山",
    pinyin: "kāi mén jiàn shān",
    en: "Open the door and see the mountain.",
    origin: "Get straight to the point.",
    source: "Tang Dynasty poem"
  },
  {
    id: "p0127",
    zh: "直言不讳",
    pinyin: "zhí yán bù huì",
    en: "Speak frankly without reservation.",
    origin: "Express opinions candidly.",
    source: "Traditional expression"
  },
  {
    id: "p0128",
    zh: "直截了当",
    pinyin: "zhí jié liǎo dàng",
    en: "Straightforward and to the point.",
    origin: "Clear and direct communication.",
    source: "Traditional expression"
  },
  {
    id: "p0129",
    zh: "推心置腹",
    pinyin: "tuī xīn zhì fù",
    en: "Give one's heart to someone.",
    origin: "Be completely honest and sincere.",
    source: "Han Shu"
  },
  {
    id: "p0130",
    zh: "肝胆相照",
    pinyin: "gān dǎn xiāng zhào",
    en: "Show utter devotion to each other.",
    origin: "Be completely loyal and honest.",
    source: "Traditional expression"
  },
  {
    id: "p0131",
    zh: "心心相印",
    pinyin: "xīn xīn xiāng yìn",
    en: "Hearts in perfect harmony.",
    origin: "Mutual understanding and empathy.",
    source: "Traditional expression"
  },
  {
    id: "p0132",
    zh: "志同道合",
    pinyin: "zhì tóng dào hé",
    en: "Share the same ambitions and follow the same path.",
    origin: "Like-minded people.",
    source: "Traditional expression"
  },
  {
    id: "p0133",
    zh: "情同手足",
    pinyin: "qíng tóng shǒu zú",
    en: "As close as brothers.",
    origin: "Brotherly affection.",
    source: "Traditional expression"
  },
  {
    id: "p0134",
    zh: "手足情深",
    pinyin: "shǒu zú qíng shēn",
    en: "Deep brotherly affection.",
    origin: "Close bond between siblings or friends.",
    source: "Traditional expression"
  },
  {
    id: "p0135",
    zh: "情深似海",
    pinyin: "qíng shēn sì hǎi",
    en: "Love as deep as the ocean.",
    origin: "Profound affection.",
    source: "Traditional expression"
  },
  {
    id: "p0136",
    zh: "恩重如山",
    pinyin: "ēn zhòng rú shān",
    en: "Kindness as heavy as a mountain.",
    origin: "Great debt of gratitude.",
    source: "Traditional expression"
  },
  {
    id: "p0137",
    zh: "知恩图报",
    pinyin: "zhī ēn tú bào",
    en: "Know kindness and seek to repay it.",
    origin: "Be grateful and repay kindness.",
    source: "Traditional expression"
  },
  {
    id: "p0138",
    zh: "饮水思源",
    pinyin: "yǐn shuǐ sī yuán",
    en: "When drinking water, think of the source.",
    origin: "Remember one's origins and benefactors.",
    source: "Traditional expression"
  },
  {
    id: "p0139",
    zh: "吃水不忘挖井人",
    pinyin: "chī shuǐ bù wàng wā jǐng rén",
    en: "Don't forget those who dug the well.",
    origin: "Remember and appreciate those who helped you.",
    source: "Traditional expression"
  },
  {
    id: "p0140",
    zh: "滴水之恩当涌泉相报",
    pinyin: "dī shuǐ zhī ēn dāng yǒng quán xiāng bào",
    en: "A drop of kindness should be repaid with a spring.",
    origin: "Repay kindness generously.",
    source: "Traditional expression"
  },
  {
    id: "p0141",
    zh: "结草衔环",
    pinyin: "jié cǎo xián huán",
    en: "Tie grass into knots and hold a ring in the mouth.",
    origin: "Repay kindness even after death.",
    source: "Zuo Zhuan"
  },
  {
    id: "p0142",
    zh: "感恩戴德",
    pinyin: "gǎn ēn dài dé",
    en: "Feel grateful and cherish virtue.",
    origin: "Be deeply grateful.",
    source: "Traditional expression"
  },
  {
    id: "p0143",
    zh: "知足常乐",
    pinyin: "zhī zú cháng lè",
    en: "Contentment brings happiness.",
    origin: "Be satisfied with what you have.",
    source: "Dao De Jing"
  },
  {
    id: "p0144",
    zh: "知足不辱",
    pinyin: "zhī zú bù rǔ",
    en: "Contentment prevents humiliation.",
    origin: "Being content avoids disgrace.",
    source: "Dao De Jing"
  },
  {
    id: "p0145",
    zh: "安贫乐道",
    pinyin: "ān pín lè dào",
    en: "Content with poverty and happy with one's principles.",
    origin: "Find joy in simple living and moral values.",
    source: "The Analects"
  },
  {
    id: "p0146",
    zh: "淡泊名利",
    pinyin: "dàn bó míng lì",
    en: "Indifferent to fame and fortune.",
    origin: "Not pursuing wealth or status.",
    source: "Traditional expression"
  },
  {
    id: "p0147",
    zh: "宠辱不惊",
    pinyin: "chǒng rǔ bù jīng",
    en: "Remain calm whether favored or humiliated.",
    origin: "Keep composure in all circumstances.",
    source: "Caigentan"
  },
  {
    id: "p0148",
    zh: "泰然处之",
    pinyin: "tài rán chǔ zhī",
    en: "Take things calmly.",
    origin: "Remain composed and unperturbed.",
    source: "Traditional expression"
  },
  {
    id: "p0149",
    zh: "处变不惊",
    pinyin: "chǔ biàn bù jīng",
    en: "Remain calm in the face of change.",
    origin: "Stay composed during upheaval.",
    source: "Traditional expression"
  },
  {
    id: "p0150",
    zh: "临危不惧",
    pinyin: "lín wēi bù jù",
    en: "Not fear in the face of danger.",
    origin: "Remain brave when threatened.",
    source: "Traditional expression"
  },
  {
    id: "p0151",
    zh: "临危不乱",
    pinyin: "lín wēi bù luàn",
    en: "Not panic in the face of danger.",
    origin: "Keep cool in crisis.",
    source: "Traditional expression"
  },
  {
    id: "p0152",
    zh: "从容不迫",
    pinyin: "cóng róng bù pò",
    en: "Calm and unhurried.",
    origin: "Composed and unrushed.",
    source: "Traditional expression"
  },
  {
    id: "p0153",
    zh: "神色自若",
    pinyin: "shén sè zì ruò",
    en: "Looking calm and at ease.",
    origin: "Composed demeanor.",
    source: "Traditional expression"
  },
  {
    id: "p0154",
    zh: "视死如归",
    pinyin: "shì sǐ rú guī",
    en: "Face death as if going home.",
    origin: "Fearless in facing death.",
    source: "Traditional expression"
  },
  {
    id: "p0155",
    zh: "舍生取义",
    pinyin: "shě shēng qǔ yì",
    en: "Give up life for righteousness.",
    origin: "Sacrifice life for justice.",
    source: "Mencius"
  },
  {
    id: "p0156",
    zh: "杀身成仁",
    pinyin: "shā shēn chéng rén",
    en: "Sacrifice oneself for benevolence.",
    origin: "Die for a righteous cause.",
    source: "The Analects"
  },
  {
    id: "p0157",
    zh: "大义凛然",
    pinyin: "dà yì lǐn rán",
    en: "Awe-inspiring righteousness.",
    origin: "Uphold justice fearlessly.",
    source: "Traditional expression"
  },
  {
    id: "p0158",
    zh: "义无反顾",
    pinyin: "yì wú fǎn gù",
    en: "Go forward without hesitation.",
    origin: "Act righteously without looking back.",
    source: "Han Shu"
  },
  {
    id: "p0159",
    zh: "当仁不让",
    pinyin: "dāng rén bù ràng",
    en: "Not yield when benevolence is at stake.",
    origin: "Take responsibility without hesitation.",
    source: "The Analects"
  },
  {
    id: "p0160",
    zh: "见义勇为",
    pinyin: "jiàn yì yǒng wéi",
    en: "Act bravely for a just cause.",
    origin: "Step forward when witnessing injustice.",
    source: "The Analects"
  },
  {
    id: "p0161",
    zh: "路见不平拔刀相助",
    pinyin: "lù jiàn bù píng bá dāo xiāng zhù",
    en: "Draw one's sword to help when seeing injustice.",
    origin: "Stand up against injustice.",
    source: "Traditional expression"
  },
  {
    id: "p0162",
    zh: "赴汤蹈火",
    pinyin: "fù tāng dǎo huǒ",
    en: "Go through fire and water.",
    origin: "Face any danger without fear.",
    source: "Han Shu"
  },
  {
    id: "p0163",
    zh: "出生入死",
    pinyin: "chū shēng rù sǐ",
    en: "Between life and death.",
    origin: "Risk one's life.",
    source: "Dao De Jing"
  },
  {
    id: "p0164",
    zh: "万死不辞",
    pinyin: "wàn sǐ bù cí",
    en: "Not refuse even at the cost of death.",
    origin: "Willing to die for a cause.",
    source: "Traditional expression"
  },
  {
    id: "p0165",
    zh: "勇往直前",
    pinyin: "yǒng wǎng zhí qián",
    en: "March forward courageously.",
    origin: "Move ahead bravely.",
    source: "Traditional expression"
  },
  {
    id: "p0166",
    zh: "一往无前",
    pinyin: "yī wǎng wú qián",
    en: "Advance without hesitation.",
    origin: "Push forward fearlessly.",
    source: "Traditional expression"
  },
  {
    id: "p0167",
    zh: "勇冠三军",
    pinyin: "yǒng guàn sān jūn",
    en: "Bravest of all the troops.",
    origin: "Unmatched in courage.",
    source: "Historical Records"
  },
  {
    id: "p0168",
    zh: "英勇无敌",
    pinyin: "yīng yǒng wú dí",
    en: "Heroically invincible.",
    origin: "Brave and unbeatable.",
    source: "Traditional expression"
  },
  {
    id: "p0169",
    zh: "所向无敌",
    pinyin: "suǒ xiàng wú dí",
    en: "Invincible wherever one goes.",
    origin: "Unstoppable force.",
    source: "Traditional expression"
  },
  {
    id: "p0170",
    zh: "战无不胜",
    pinyin: "zhàn wú bù shèng",
    en: "Win every battle.",
    origin: "Always victorious in war.",
    source: "Traditional expression"
  },
  {
    id: "p0171",
    zh: "攻无不克",
    pinyin: "gōng wú bù kè",
    en: "Succeed in every attack.",
    origin: "Overcome every obstacle.",
    source: "Traditional expression"
  },
  {
    id: "p0172",
    zh: "百战百胜",
    pinyin: "bǎi zhàn bǎi shèng",
    en: "Win a hundred battles.",
    origin: "Always victorious.",
    source: "Traditional expression"
  },
  {
    id: "p0173",
    zh: "兵不厌诈",
    pinyin: "bīng bù yàn zhà",
    en: "All is fair in war.",
    origin: "Deception is permissible in warfare.",
    source: "Sun Tzu"
  },
  {
    id: "p0174",
    zh: "出奇制胜",
    pinyin: "chū qí zhì shèng",
    en: "Win by surprise tactics.",
    origin: "Achieve victory through unexpected means.",
    source: "Sun Tzu"
  },
  {
    id: "p0175",
    zh: "声东击西",
    pinyin: "shēng dōng jī xī",
    en: "Feint to the east and attack to the west.",
    origin: "Create a diversion.",
    source: "Sun Tzu"
  },
  {
    id: "p0176",
    zh: "围魏救赵",
    pinyin: "wéi wèi jiù zhào",
    en: "Besiege Wei to rescue Zhao.",
    origin: "Relieve pressure by attacking the enemy's vulnerable point.",
    source: "Historical Records"
  },
  {
    id: "p0177",
    zh: "趁火打劫",
    pinyin: "chèn huǒ dǎ jié",
    en: "Loot a burning house.",
    origin: "Take advantage of someone's misfortune.",
    source: "Traditional expression"
  },
  {
    id: "p0178",
    zh: "混水摸鱼",
    pinyin: "hùn shuǐ mō yú",
    en: "Fish in troubled waters.",
    origin: "Profit from confusion.",
    source: "Traditional expression"
  },
  {
    id: "p0179",
    zh: "暗渡陈仓",
    pinyin: "àn dù chén cāng",
    en: "Secretly cross to Chencang.",
    origin: "Advance secretly while pretending otherwise.",
    source: "Historical Records"
  },
  {
    id: "p0180",
    zh: "明修栈道暗度陈仓",
    pinyin: "míng xiū zhàn dào àn dù chén cāng",
    en: "Openly repair the plank road but secretly cross to Chencang.",
    origin: "Deceive opponents with fake actions.",
    source: "Historical Records"
  },
  {
    id: "p0181",
    zh: "瞒天过海",
    pinyin: "mán tiān guò hǎi",
    en: "Deceive the heavens to cross the ocean.",
    origin: "Hide one's true intentions.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0182",
    zh: "欲擒故纵",
    pinyin: "yù qín gù zòng",
    en: "Feign retreat to lure the enemy.",
    origin: "Let go to catch better.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0183",
    zh: "抛砖引玉",
    pinyin: "pāo zhuān yǐn yù",
    en: "Throw a brick to attract jade.",
    origin: "Offer something modest to elicit something valuable.",
    source: "Traditional expression"
  },
  {
    id: "p0184",
    zh: "以逸待劳",
    pinyin: "yǐ yì dài láo",
    en: "Wait at ease for the exhausted enemy.",
    origin: "Conserve energy while the enemy tires.",
    source: "Sun Tzu"
  },
  {
    id: "p0185",
    zh: "借刀杀人",
    pinyin: "jiè dāo shā rén",
    en: "Kill with a borrowed knife.",
    origin: "Use another to do one's dirty work.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0186",
    zh: "隔岸观火",
    pinyin: "gé àn guān huǒ",
    en: "Watch a fire from across the river.",
    origin: "Observe others' troubles without intervening.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0187",
    zh: "笑里藏刀",
    pinyin: "xiào lǐ cáng dāo",
    en: "Hide a knife in a smile.",
    origin: "Appear friendly while harboring ill intent.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0188",
    zh: "李代桃僵",
    pinyin: "lǐ dài táo jiāng",
    en: "Plum dies in place of peach.",
    origin: "Sacrifice the unimportant to preserve the important.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0189",
    zh: "顺手牵羊",
    pinyin: "shùn shǒu qiān yáng",
    en: "Lead away a goat in passing.",
    origin: "Take advantage of an opportunity.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0190",
    zh: "打草惊蛇",
    pinyin: "dǎ cǎo jīng shé",
    en: "Beat the grass to startle the snake.",
    origin: "Inadvertently alert the enemy.",
    source: "Traditional expression"
  },
  {
    id: "p0191",
    zh: "借尸还魂",
    pinyin: "jiè shī huán hún",
    en: "Borrow a corpse to resurrect the soul.",
    origin: "Revive something using existing resources.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0192",
    zh: "调虎离山",
    pinyin: "diào hǔ lí shān",
    en: "Lure the tiger away from the mountain.",
    origin: "Remove a powerful opponent from their stronghold.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0193",
    zh: "欲擒故纵",
    pinyin: "yù qín gù zòng",
    en: "To catch, first let go.",
    origin: "Give freedom to capture later.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0194",
    zh: "金蝉脱壳",
    pinyin: "jīn chán tuō qiào",
    en: "The cicada sheds its shell.",
    origin: "Escape by misdirection.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0195",
    zh: "关门捉贼",
    pinyin: "guān mén zhuō zéi",
    en: "Shut the door to catch the thief.",
    origin: "Trap the enemy.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0196",
    zh: "远交近攻",
    pinyin: "yuǎn jiāo jìn gōng",
    en: "Befriend distant states while attacking nearby ones.",
    origin: "Diplomatic strategy of making distant allies.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0197",
    zh: "假道伐虢",
    pinyin: "jiǎ dào fá guó",
    en: "Borrow the path to conquer Guo.",
    origin: "Attack an ally of one's target.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0198",
    zh: "偷梁换柱",
    pinyin: "tōu liáng huàn zhù",
    en: "Steal the beams and replace the pillars.",
    origin: "Secretly replace with a substitute.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0199",
    zh: "指桑骂槐",
    pinyin: "zhǐ sāng mà huái",
    en: "Point at the mulberry and curse the locust.",
    origin: "Criticize indirectly.",
    source: "Traditional expression"
  },
  {
    id: "p0200",
    zh: "假痴不癫",
    pinyin: "jiǎ chī bù diān",
    en: "Feign madness but stay alert.",
    origin: "Pretend to be foolish to deceive.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0201",
    zh: "上屋抽梯",
    pinyin: "shàng wū chōu tī",
    en: "Remove the ladder after the enemy climbs up.",
    origin: "Lure someone into a trap.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0202",
    zh: "树上开花",
    pinyin: "shù shàng kāi huā",
    en: "Make flowers bloom on a tree.",
    origin: "Create illusions to deceive.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0203",
    zh: "反客为主",
    pinyin: "fǎn kè wéi zhǔ",
    en: "Turn from guest to host.",
    origin: "Seize control from a position of disadvantage.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0204",
    zh: "美人计",
    pinyin: "měi rén jì",
    en: "The beauty trap.",
    origin: "Use seduction as a strategy.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0205",
    zh: "空城计",
    pinyin: "kōng chéng jì",
    en: "The empty city stratagem.",
    origin: "Appear weak when strong to fool the enemy.",
    source: "Romance of the Three Kingdoms"
  },
  {
    id: "p0206",
    zh: "反间计",
    pinyin: "fǎn jiàn jì",
    en: "Sow discord among enemies.",
    origin: "Use the enemy's spies against them.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0207",
    zh: "苦肉计",
    pinyin: "kǔ ròu jì",
    en: "The self-torture stratagem.",
    origin: "Harm oneself to gain the enemy's trust.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0208",
    zh: "连环计",
    pinyin: "lián huán jì",
    en: "The linked stratagems.",
    origin: "Use multiple strategies in sequence.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0209",
    zh: "走为上策",
    pinyin: "zǒu wéi shàng cè",
    en: "Retreat is the best strategy.",
    origin: "When all else fails, retreat.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0210",
    zh: "三十六计走为上计",
    pinyin: "sān shí liù jì zǒu wéi shàng jì",
    en: "Of the thirty-six stratagems, fleeing is best.",
    origin: "Sometimes retreat is the wisest choice.",
    source: "Thirty-Six Stratagems"
  },
  {
    id: "p0211",
    zh: "运筹帷幄",
    pinyin: "yùn chóu wéi wò",
    en: "Plan strategies within a tent.",
    origin: "Mastermind military strategy.",
    source: "Historical Records"
  },
  {
    id: "p0212",
    zh: "决胜千里",
    pinyin: "jué shèng qiān lǐ",
    en: "Win a thousand miles away.",
    origin: "Achieve victory through strategic planning.",
    source: "Historical Records"
  },
  {
    id: "p0213",
    zh: "料事如神",
    pinyin: "liào shì rú shén",
    en: "Predict events with divine accuracy.",
    origin: "Extraordinary foresight.",
    source: "Traditional expression"
  },
  {
    id: "p0214",
    zh: "先见之明",
    pinyin: "xiān jiàn zhī míng",
    en: "Foresight; prescience.",
    origin: "Ability to predict future events.",
    source: "Traditional expression"
  },
  {
    id: "p0215",
    zh: "深谋远虑",
    pinyin: "shēn móu yuǎn lǜ",
    en: "Think deeply and plan carefully.",
    origin: "Far-sighted planning.",
    source: "Traditional expression"
  },
  {
    id: "p0216",
    zh: "老谋深算",
    pinyin: "lǎo móu shēn suàn",
    en: "Experienced and calculating.",
    origin: "Shrewd and strategic.",
    source: "Traditional expression"
  },
  {
    id: "p0217",
    zh: "足智多谋",
    pinyin: "zú zhì duō móu",
    en: "Wise and full of strategems.",
    origin: "Resourceful and clever.",
    source: "Traditional expression"
  },
  {
    id: "p0218",
    zh: "神机妙算",
    pinyin: "shén jī miào suàn",
    en: "Divine strategy and wonderful plans.",
    origin: "Brilliant tactical mind.",
    source: "Traditional expression"
  },
  {
    id: "p0219",
    zh: "锦囊妙计",
    pinyin: "jǐn náng miào jì",
    en: "Brilliant plan in a brocade bag.",
    origin: "A clever stratagem kept secret.",
    source: "Romance of the Three Kingdoms"
  },
  {
    id: "p0220",
    zh: "智者千虑必有一失",
    pinyin: "zhì zhě qiān lǜ bì yǒu yī shī",
    en: "Even the wise make mistakes.",
    origin: "Nobody is perfect.",
    source: "Historical Records"
  },
  {
    id: "p0221",
    zh: "愚者千虑必有一得",
    pinyin: "yú zhě qiān lǜ bì yǒu yī dé",
    en: "Even a fool sometimes has a good idea.",
    origin: "Everyone can contribute something.",
    source: "Historical Records"
  },
  {
    id: "p0222",
    zh: "智者见智仁者见仁",
    pinyin: "zhì zhě jiàn zhì rén zhě jiàn rén",
    en: "The wise see wisdom, the benevolent see benevolence.",
    origin: "Different perspectives on the same thing.",
    source: "Book of Changes"
  },
  {
    id: "p0223",
    zh: "见仁见智",
    pinyin: "jiàn rén jiàn zhì",
    en: "Different people have different views.",
    origin: "Matter of perspective.",
    source: "Book of Changes"
  },
  {
    id: "p0224",
    zh: "仁者乐山智者乐水",
    pinyin: "rén zhě lè shān zhì zhě lè shuǐ",
    en: "The benevolent love mountains, the wise love water.",
    origin: "Different temperaments prefer different things.",
    source: "The Analects"
  },
  {
    id: "p0225",
    zh: "兼听则明偏信则暗",
    pinyin: "jiān tīng zé míng piān xìn zé àn",
    en: "Listen to all sides and be enlightened; believe one side and be in the dark.",
    origin: "Consider multiple perspectives.",
    source: "Zizhi Tongjian"
  },
  {
    id: "p0226",
    zh: "博学多才",
    pinyin: "bó xué duō cái",
    en: "Learned and talented.",
    origin: "Knowledgeable and skilled.",
    source: "Traditional expression"
  },
  {
    id: "p0227",
    zh: "博古通今",
    pinyin: "bó gǔ tōng jīn",
    en: "Know the past and present.",
    origin: "Well-versed in history and current affairs.",
    source: "Traditional expression"
  },
  {
    id: "p0228",
    zh: "学富五车",
    pinyin: "xué fù wǔ chē",
    en: "Learning fills five carts.",
    origin: "Extremely knowledgeable.",
    source: "Zhuangzi"
  },
  {
    id: "p0229",
    zh: "才高八斗",
    pinyin: "cái gāo bā dǒu",
    en: "Talent as high as eight bushels.",
    origin: "Exceptionally talented.",
    source: "Traditional expression"
  },
  {
    id: "p0230",
    zh: "满腹经纶",
    pinyin: "mǎn fù jīng lún",
    en: "Full of learning and insight.",
    origin: "Rich in knowledge and strategy.",
    source: "Traditional expression"
  },
  {
    id: "p0231",
    zh: "学贯中西",
    pinyin: "xué guàn zhōng xī",
    en: "Learned in both Chinese and Western knowledge.",
    origin: "Well-versed in diverse fields.",
    source: "Modern expression"
  },
  {
    id: "p0232",
    zh: "融会贯通",
    pinyin: "róng huì guàn tōng",
    en: "Achieve a thorough understanding.",
    origin: "Integrate knowledge comprehensively.",
    source: "Traditional expression"
  },
  {
    id: "p0233",
    zh: "举一反三",
    pinyin: "jǔ yī fǎn sān",
    en: "Infer three from one instance.",
    origin: "Learn by analogy.",
    source: "The Analects"
  },
  {
    id: "p0234",
    zh: "触类旁通",
    pinyin: "chù lèi páng tōng",
    en: "Comprehend by analogy.",
    origin: "Apply knowledge from one area to another.",
    source: "Book of Changes"
  },
  {
    id: "p0235",
    zh: "闻一知十",
    pinyin: "wén yī zhī shí",
    en: "Know ten from hearing one.",
    origin: "Quick to understand.",
    source: "The Analects"
  },
  {
    id: "p0236",
    zh: "心领神会",
    pinyin: "xīn lǐng shén huì",
    en: "Understand tacitly.",
    origin: "Grasp intuitively.",
    source: "Traditional expression"
  },
  {
    id: "p0237",
    zh: "心照不宣",
    pinyin: "xīn zhào bù xuān",
    en: "Tacit understanding without words.",
    origin: "Mutual understanding.",
    source: "Traditional expression"
  },
  {
    id: "p0238",
    zh: "心有灵犀一点通",
    pinyin: "xīn yǒu líng xī yī diǎn tōng",
    en: "Hearts connected by the magical rhinoceros horn.",
    origin: "Telepathic understanding between kindred spirits.",
    source: "Tang poetry"
  },
  {
    id: "p0239",
    zh: "一点就通",
    pinyin: "yī diǎn jiù tōng",
    en: "Understand at the slightest hint.",
    origin: "Quick learner.",
    source: "Traditional expression"
  },
  {
    id: "p0240",
    zh: "冰雪聪明",
    pinyin: "bīng xuě cōng míng",
    en: "As clever as ice and snow.",
    origin: "Extremely intelligent.",
    source: "Traditional expression"
  },
  {
    id: "p0241",
    zh: "聪明伶俐",
    pinyin: "cōng míng líng lì",
    en: "Bright and clever.",
    origin: "Intelligent and quick-witted.",
    source: "Traditional expression"
  },
  {
    id: "p0242",
    zh: "机智灵活",
    pinyin: "jī zhì líng huó",
    en: "Quick-witted and flexible.",
    origin: "Resourceful and adaptable.",
    source: "Traditional expression"
  },
  {
    id: "p0243",
    zh: "耳聪目明",
    pinyin: "ěr cōng mù míng",
    en: "Sharp ears and clear eyes.",
    origin: "Alert and perceptive.",
    source: "Traditional expression"
  },
  {
    id: "p0244",
    zh: "心明眼亮",
    pinyin: "xīn míng yǎn liàng",
    en: "Clear mind and bright eyes.",
    origin: "Perceptive and discerning.",
    source: "Traditional expression"
  },
  {
    id: "p0245",
    zh: "明察秋毫",
    pinyin: "míng chá qiū háo",
    en: "See the tip of an autumn hair.",
    origin: "Extremely observant.",
    source: "Mencius"
  },
  {
    id: "p0246",
    zh: "洞察秋毫",
    pinyin: "dòng chá qiū háo",
    en: "Perceive the tiniest detail.",
    origin: "Sharp insight.",
    source: "Traditional expression"
  },
  {
    id: "p0247",
    zh: "明辨是非",
    pinyin: "míng biàn shì fēi",
    en: "Distinguish right from wrong.",
    origin: "Have clear moral judgment.",
    source: "Traditional expression"
  },
  {
    id: "p0248",
    zh: "是非分明",
    pinyin: "shì fēi fēn míng",
    en: "Clear about right and wrong.",
    origin: "Firm moral principles.",
    source: "Traditional expression"
  },
  {
    id: "p0249",
    zh: "黑白分明",
    pinyin: "hēi bái fēn míng",
    en: "Distinguish black from white.",
    origin: "See things clearly.",
    source: "Traditional expression"
  },
  {
    id: "p0250",
    zh: "泾渭分明",
    pinyin: "jīng wèi fēn míng",
    en: "As clear as the Jing and Wei rivers.",
    origin: "Clear distinction between good and bad.",
    source: "Book of Songs"
  },
  {
    id: "p0251",
    zh: "一清二楚",
    pinyin: "yī qīng èr chǔ",
    en: "Absolutely clear.",
    origin: "Perfectly understood.",
    source: "Traditional expression"
  },
  {
    id: "p0252",
    zh: "一目了然",
    pinyin: "yī mù liǎo rán",
    en: "Understand at a glance.",
    origin: "Immediately obvious.",
    source: "Traditional expression"
  },
  {
    id: "p0253",
    zh: "了如指掌",
    pinyin: "liǎo rú zhǐ zhǎng",
    en: "Know like the palm of one's hand.",
    origin: "Thoroughly familiar with.",
    source: "The Analects"
  },
  {
    id: "p0254",
    zh: "了然于胸",
    pinyin: "liǎo rán yú xiōng",
    en: "Clearly understood in one's heart.",
    origin: "Fully comprehended.",
    source: "Traditional expression"
  },
  {
    id: "p0255",
    zh: "心中有数",
    pinyin: "xīn zhōng yǒu shù",
    en: "Know what one is doing.",
    origin: "Have a clear idea.",
    source: "Traditional expression"
  },
  {
    id: "p0256",
    zh: "胸中有数",
    pinyin: "xiōng zhōng yǒu shù",
    en: "Have a plan in mind.",
    origin: "Know the situation well.",
    source: "Traditional expression"
  },
  {
    id: "p0257",
    zh: "成竹在胸",
    pinyin: "chéng zhú zài xiōng",
    en: "Have a complete bamboo in one's chest.",
    origin: "Have a well-thought-out plan.",
    source: "Traditional expression"
  },
  {
    id: "p0258",
    zh: "稳操胜券",
    pinyin: "wěn cāo shèng quàn",
    en: "Hold the winning ticket.",
    origin: "Assured of victory.",
    source: "Traditional expression"
  },
  {
    id: "p0259",
    zh: "万无一失",
    pinyin: "wàn wú yī shī",
    en: "Absolutely safe.",
    origin: "No chance of failure.",
    source: "Han Shu"
  },
  {
    id: "p0260",
    zh: "十拿九稳",
    pinyin: "shí ná jiǔ wěn",
    en: "Nine out of ten certain.",
    origin: "Almost guaranteed.",
    source: "Traditional expression"
  },
  {
    id: "p0261",
    zh: "八九不离十",
    pinyin: "bā jiǔ bù lí shí",
    en: "Eight or nine out of ten.",
    origin: "Highly probable.",
    source: "Traditional expression"
  },
  {
    id: "p0262",
    zh: "稳如泰山",
    pinyin: "wěn rú tài shān",
    en: "Stable as Mount Tai.",
    origin: "Unshakable and secure.",
    source: "Han Shu"
  },
  {
    id: "p0263",
    zh: "坚如磐石",
    pinyin: "jiān rú pán shí",
    en: "Firm as a rock.",
    origin: "Unwavering and solid.",
    source: "Traditional expression"
  },
  {
    id: "p0264",
    zh: "固若金汤",
    pinyin: "gù ruò jīn tāng",
    en: "As secure as metal and boiling water.",
    origin: "Impregnable defense.",
    source: "Han Shu"
  },
  {
    id: "p0265",
    zh: "铜墙铁壁",
    pinyin: "tóng qiáng tiě bì",
    en: "Walls of copper and iron.",
    origin: "Impenetrable defense.",
    source: "Traditional expression"
  },
  {
    id: "p0266",
    zh: "坚不可摧",
    pinyin: "jiān bù kě cuī",
    en: "Indestructible.",
    origin: "Unbreakable strength.",
    source: "Traditional expression"
  },
  {
    id: "p0267",
    zh: "牢不可破",
    pinyin: "láo bù kě pò",
    en: "Unbreakable.",
    origin: "Firm and solid.",
    source: "Traditional expression"
  },
  {
    id: "p0268",
    zh: "坚定不移",
    pinyin: "jiān dìng bù yí",
    en: "Firm and unwavering.",
    origin: "Steadfast determination.",
    source: "Traditional expression"
  },
  {
    id: "p0269",
    zh: "坚持不懈",
    pinyin: "jiān chí bù xiè",
    en: "Persist without giving up.",
    origin: "Unwavering perseverance.",
    source: "Traditional expression"
  },
  {
    id: "p0270",
    zh: "锲而不舍",
    pinyin: "qiè ér bù shě",
    en: "Carve without stopping.",
    origin: "Persevere relentlessly.",
    source: "Xunzi"
  },
  {
    id: "p0271",
    zh: "持之以恒",
    pinyin: "chí zhī yǐ héng",
    en: "Persevere with constancy.",
    origin: "Maintain consistent effort.",
    source: "Traditional expression"
  },
  {
    id: "p0272",
    zh: "有始有终",
    pinyin: "yǒu shǐ yǒu zhōng",
    en: "Have a beginning and an end.",
    origin: "See things through to completion.",
    source: "The Analects"
  },
  {
    id: "p0273",
    zh: "善始善终",
    pinyin: "shàn shǐ shàn zhōng",
    en: "Good beginning and good ending.",
    origin: "Complete well what was started well.",
    source: "Zhuangzi"
  },
  {
    id: "p0274",
    zh: "全始全终",
    pinyin: "quán shǐ quán zhōng",
    en: "Complete from start to finish.",
    origin: "See through to the end.",
    source: "Traditional expression"
  },
  {
    id: "p0275",
    zh: "自始至终",
    pinyin: "zì shǐ zhì zhōng",
    en: "From beginning to end.",
    origin: "Throughout the entire process.",
    source: "Traditional expression"
  },
  {
    id: "p0276",
    zh: "始终如一",
    pinyin: "shǐ zhōng rú yī",
    en: "Consistent from beginning to end.",
    origin: "Unwavering throughout.",
    source: "Xunzi"
  },
  {
    id: "p0277",
    zh: "一以贯之",
    pinyin: "yī yǐ guàn zhī",
    en: "Consistent principle throughout.",
    origin: "Maintain consistency.",
    source: "The Analects"
  },
  {
    id: "p0278",
    zh: "一脉相承",
    pinyin: "yī mài xiāng chéng",
    en: "Passed down in one continuous line.",
    origin: "Continuous inheritance.",
    source: "Traditional expression"
  },
  {
    id: "p0279",
    zh: "一脉相通",
    pinyin: "yī mài xiāng tōng",
    en: "Connected in one line.",
    origin: "Inherently related.",
    source: "Traditional expression"
  },
  {
    id: "p0280",
    zh: "息息相关",
    pinyin: "xī xī xiāng guān",
    en: "Closely related.",
    origin: "Intimately connected.",
    source: "Traditional expression"
  },
  {
    id: "p0281",
    zh: "唇齿相依",
    pinyin: "chún chǐ xiāng yī",
    en: "Lips and teeth depend on each other.",
    origin: "Mutually dependent.",
    source: "Zuo Zhuan"
  },
  {
    id: "p0282",
    zh: "唇亡齿寒",
    pinyin: "chún wáng chǐ hán",
    en: "When the lips are gone, the teeth are cold.",
    origin: "Closely interdependent.",
    source: "Zuo Zhuan"
  },
  {
    id: "p0283",
    zh: "相辅相成",
    pinyin: "xiāng fǔ xiāng chéng",
    en: "Complement each other.",
    origin: "Mutually reinforcing.",
    source: "Traditional expression"
  },
  {
    id: "p0284",
    zh: "相得益彰",
    pinyin: "xiāng dé yì zhāng",
    en: "Complement and enhance each other.",
    origin: "Bring out the best in each other.",
    source: "Han Shu"
  },
  {
    id: "p0285",
    zh: "珠联璧合",
    pinyin: "zhū lián bì hé",
    en: "Pearls and jade combined.",
    origin: "Perfect match.",
    source: "Traditional expression"
  },
  {
    id: "p0286",
    zh: "天作之合",
    pinyin: "tiān zuò zhī hé",
    en: "A match made in heaven.",
    origin: "Perfect union.",
    source: "Book of Songs"
  },
  {
    id: "p0287",
    zh: "天生一对",
    pinyin: "tiān shēng yī duì",
    en: "A heaven-made pair.",
    origin: "Natural match.",
    source: "Traditional expression"
  },
  {
    id: "p0288",
    zh: "郎才女貌",
    pinyin: "láng cái nǚ mào",
    en: "Talented man and beautiful woman.",
    origin: "Well-matched couple.",
    source: "Traditional expression"
  },
  {
    id: "p0289",
    zh: "才子佳人",
    pinyin: "cái zǐ jiā rén",
    en: "Talented scholar and beautiful lady.",
    origin: "Ideal romantic couple.",
    source: "Traditional expression"
  },
  {
    id: "p0290",
    zh: "琴瑟和鸣",
    pinyin: "qín sè hé míng",
    en: "Qin and se harmonize.",
    origin: "Marital harmony.",
    source: "Book of Songs"
  },
  {
    id: "p0291",
    zh: "举案齐眉",
    pinyin: "jǔ àn qí méi",
    en: "Raise the tray to eyebrow level.",
    origin: "Respectful marital relationship.",
    source: "Book of the Later Han"
  },
  {
    id: "p0292",
    zh: "相敬如宾",
    pinyin: "xiāng jìng rú bīn",
    en: "Respect each other as guests.",
    origin: "Mutual respect in marriage.",
    source: "Zuo Zhuan"
  },
  {
    id: "p0293",
    zh: "白头偕老",
    pinyin: "bái tóu xié lǎo",
    en: "Grow old together.",
    origin: "Lifelong companionship.",
    source: "Book of Songs"
  },
  {
    id: "p0294",
    zh: "百年好合",
    pinyin: "bǎi nián hǎo hé",
    en: "A hundred years of harmony.",
    origin: "Lasting marital happiness.",
    source: "Traditional expression"
  },
  {
    id: "p0295",
    zh: "夫唱妇随",
    pinyin: "fū chàng fù suí",
    en: "Husband leads, wife follows.",
    origin: "Harmonious marriage.",
    source: "Traditional expression"
  },
  {
    id: "p0296",
    zh: "比翼双飞",
    pinyin: "bǐ yì shuāng fēi",
    en: "Fly wing to wing.",
    origin: "Inseparable couple.",
    source: "Traditional expression"
  },
  {
    id: "p0297",
    zh: "连理枝",
    pinyin: "lián lǐ zhī",
    en: "Intertwined branches.",
    origin: "Deep love between couples.",
    source: "Traditional expression"
  },
  {
    id: "p0298",
    zh: "鸳鸯戏水",
    pinyin: "yuān yāng xì shuǐ",
    en: "Mandarin ducks playing in water.",
    origin: "Loving couple.",
    source: "Traditional expression"
  },
  {
    id: "p0299",
    zh: "如胶似漆",
    pinyin: "rú jiāo sì qī",
    en: "Like glue and lacquer.",
    origin: "Inseparable relationship.",
    source: "Historical Records"
  },
  {
    id: "p0300",
    zh: "形影不离",
    pinyin: "xíng yǐng bù lí",
    en: "Inseparable like body and shadow.",
    origin: "Always together.",
    source: "Traditional expression"
  },
  {
    id: "p0301",
    zh: "形影相随",
    pinyin: "xíng yǐng xiāng suí",
    en: "Body and shadow follow each other.",
    origin: "Constant companionship.",
    source: "Traditional expression"
  },
  {
    id: "p0302",
    zh: "寸步不离",
    pinyin: "cùn bù bù lí",
    en: "Not leave for a moment.",
    origin: "Stay close at all times.",
    source: "Traditional expression"
  },
  {
    id: "p0303",
    zh: "寸步难行",
    pinyin: "cùn bù nán xíng",
    en: "Cannot move an inch.",
    origin: "Unable to proceed.",
    source: "Traditional expression"
  },
  {
    id: "p0304",
    zh: "举步维艰",
    pinyin: "jǔ bù wéi jiān",
    en: "Every step is difficult.",
    origin: "Extremely challenging.",
    source: "Traditional expression"
  },
  {
    id: "p0305",
    zh: "步履维艰",
    pinyin: "bù lǚ wéi jiān",
    en: "Walking with difficulty.",
    origin: "In dire straits.",
    source: "Traditional expression"
  },
  {
    id: "p0306",
    zh: "进退两难",
    pinyin: "jìn tuì liǎng nán",
    en: "Difficult to advance or retreat.",
    origin: "In a dilemma.",
    source: "Traditional expression"
  },
  {
    id: "p0307",
    zh: "进退维谷",
    pinyin: "jìn tuì wéi gǔ",
    en: "Stuck between advance and retreat.",
    origin: "In a tight spot.",
    source: "Book of Songs"
  },
  {
    id: "p0308",
    zh: "左右为难",
    pinyin: "zuǒ yòu wéi nán",
    en: "Difficult either way.",
    origin: "Caught in a dilemma.",
    source: "Traditional expression"
  },
  {
    id: "p0309",
    zh: "骑虎难下",
    pinyin: "qí hǔ nán xià",
    en: "Difficult to dismount from a tiger.",
    origin: "Committed to a dangerous course.",
    source: "Traditional expression"
  },
  {
    id: "p0310",
    zh: "欲罢不能",
    pinyin: "yù bà bù néng",
    en: "Want to stop but cannot.",
    origin: "Unable to quit.",
    source: "The Analects"
  },
  {
    id: "p0311",
    zh: "身不由己",
    pinyin: "shēn bù yóu jǐ",
    en: "Body not controlled by oneself.",
    origin: "Not in control of one's situation.",
    source: "Traditional expression"
  },
  {
    id: "p0312",
    zh: "情不自禁",
    pinyin: "qíng bù zì jīn",
    en: "Cannot help one's feelings.",
    origin: "Unable to control emotions.",
    source: "Traditional expression"
  },
  {
    id: "p0313",
    zh: "不由自主",
    pinyin: "bù yóu zì zhǔ",
    en: "Not of one's own volition.",
    origin: "Involuntary action.",
    source: "Traditional expression"
  },
  {
    id: "p0314",
    zh: "鬼使神差",
    pinyin: "guǐ shǐ shén chāi",
    en: "As if directed by ghosts and gods.",
    origin: "Inexplicably compelled.",
    source: "Traditional expression"
  },
  {
    id: "p0315",
    zh: "阴差阳错",
    pinyin: "yīn chā yáng cuò",
    en: "By a strange coincidence.",
    origin: "Accidental mix-up.",
    source: "Traditional expression"
  },
  {
    id: "p0316",
    zh: "歪打正着",
    pinyin: "wāi dǎ zhèng zháo",
    en: "A crooked shot hitting the mark.",
    origin: "Accidentally successful.",
    source: "Traditional expression"
  },
  {
    id: "p0317",
    zh: "无心插柳柳成荫",
    pinyin: "wú xīn chā liǔ liǔ chéng yīn",
    en: "Unintentionally plant a willow that grows into shade.",
    origin: "Unexpected success.",
    source: "Traditional expression"
  },
  {
    id: "p0318",
    zh: "有心栽花花不开",
    pinyin: "yǒu xīn zāi huā huā bù kāi",
    en: "Deliberately plant flowers that don't bloom.",
    origin: "Intended efforts fail.",
    source: "Traditional expression"
  },
  {
    id: "p0319",
    zh: "事与愿违",
    pinyin: "shì yǔ yuàn wéi",
    en: "Things turn out contrary to one's wishes.",
    origin: "Expectations not met.",
    source: "Traditional expression"
  },
  {
    id: "p0320",
    zh: "适得其反",
    pinyin: "shì dé qí fǎn",
    en: "Achieve the opposite effect.",
    origin: "Backfire.",
    source: "Wei Shu"
  },
  {
    id: "p0321",
    zh: "弄巧成拙",
    pinyin: "nòng qiǎo chéng zhuō",
    en: "Trying to be clever but acting stupidly.",
    origin: "Overreaching leads to failure.",
    source: "Traditional expression"
  },
  {
    id: "p0322",
    zh: "画蛇添足",
    pinyin: "huà shé tiān zú",
    en: "Draw a snake and add feet.",
    origin: "Ruin something by adding unnecessary details.",
    source: "Zhanguo Ce"
  },
  {
    id: "p0323",
    zh: "多此一举",
    pinyin: "duō cǐ yī jǔ",
    en: "One superfluous action.",
    origin: "Unnecessary effort.",
    source: "Traditional expression"
  },
  {
    id: "p0324",
    zh: "节外生枝",
    pinyin: "jié wài shēng zhī",
    en: "Grow extra branches.",
    origin: "Create complications.",
    source: "Traditional expression"
  },
  {
    id: "p0325",
    zh: "横生枝节",
    pinyin: "héng shēng zhī jié",
    en: "Create unexpected complications.",
    origin: "Unforeseen problems arise.",
    source: "Traditional expression"
  },
  {
    id: "p0326",
    zh: "无事生非",
    pinyin: "wú shì shēng fēi",
    en: "Create trouble out of nothing.",
    origin: "Stir up problems unnecessarily.",
    source: "Traditional expression"
  },
  {
    id: "p0327",
    zh: "惹是生非",
    pinyin: "rě shì shēng fēi",
    en: "Provoke trouble.",
    origin: "Stir up conflict.",
    source: "Traditional expression"
  },
  {
    id: "p0328",
    zh: "无风不起浪",
    pinyin: "wú fēng bù qǐ làng",
    en: "No waves without wind.",
    origin: "There's no smoke without fire.",
    source: "Traditional expression"
  },
  {
    id: "p0329",
    zh: "无风三尺浪",
    pinyin: "wú fēng sān chǐ làng",
    en: "Three-foot waves even without wind.",
    origin: "Trouble even in calm times.",
    source: "Traditional expression"
  },
  {
    id: "p0330",
    zh: "一波未平一波又起",
    pinyin: "yī bō wèi píng yī bō yòu qǐ",
    en: "One wave barely settled, another rises.",
    origin: "One problem after another.",
    source: "Traditional expression"
  },
  {
    id: "p0331",
    zh: "祸不单行",
    pinyin: "huò bù dān xíng",
    en: "Misfortunes never come singly.",
    origin: "Bad luck comes in groups.",
    source: "Traditional expression"
  },
  {
    id: "p0332",
    zh: "福无双至",
    pinyin: "fú wú shuāng zhì",
    en: "Good fortune seldom comes in pairs.",
    origin: "Blessings are rare.",
    source: "Traditional expression"
  },
  {
    id: "p0333",
    zh: "雪上加霜",
    pinyin: "xuě shàng jiā shuāng",
    en: "Add frost to snow.",
    origin: "Make bad situation worse.",
    source: "Traditional expression"
  },
  {
    id: "p0334",
    zh: "雪中送炭",
    pinyin: "xuě zhōng sòng tàn",
    en: "Send charcoal in snowy weather.",
    origin: "Help in time of need.",
    source: "Song Dynasty literature"
  },
  {
    id: "p0335",
    zh: "锦上添花",
    pinyin: "jǐn shàng tiān huā",
    en: "Add flowers to brocade.",
    origin: "Make something good even better.",
    source: "Traditional expression"
  },
  {
    id: "p0336",
    zh: "火上浇油",
    pinyin: "huǒ shàng jiāo yóu",
    en: "Pour oil on fire.",
    origin: "Aggravate a situation.",
    source: "Traditional expression"
  },
  {
    id: "p0337",
    zh: "火中取栗",
    pinyin: "huǒ zhōng qǔ lì",
    en: "Take chestnuts from fire.",
    origin: "Take risks for others' benefit.",
    source: "La Fontaine's Fables"
  },
  {
    id: "p0338",
    zh: "刀山火海",
    pinyin: "dāo shān huǒ hǎi",
    en: "Mountain of swords and sea of fire.",
    origin: "Extreme danger.",
    source: "Traditional expression"
  },
  {
    id: "p0339",
    zh: "水深火热",
    pinyin: "shuǐ shēn huǒ rè",
    en: "Deep water and hot fire.",
    origin: "Dire straits; extreme suffering.",
    source: "Mencius"
  },
  {
    id: "p0340",
    zh: "水火不容",
    pinyin: "shuǐ huǒ bù róng",
    en: "Water and fire don't mix.",
    origin: "Irreconcilable differences.",
    source: "Han Shu"
  },
  {
    id: "p0341",
    zh: "水火无情",
    pinyin: "shuǐ huǒ wú qíng",
    en: "Water and fire show no mercy.",
    origin: "Natural disasters are ruthless.",
    source: "Traditional expression"
  },
  {
    id: "p0342",
    zh: "水到渠成",
    pinyin: "shuǐ dào qú chéng",
    en: "When water flows, a channel forms.",
    origin: "Things happen naturally when conditions are right.",
    source: "Traditional expression"
  },
  {
    id: "p0343",
    zh: "瓜熟蒂落",
    pinyin: "guā shú dì luò",
    en: "When the melon is ripe, it falls.",
    origin: "Things happen at the right time.",
    source: "Traditional expression"
  },
  {
    id: "p0344",
    zh: "水滴石穿",
    pinyin: "shuǐ dī shí chuān",
    en: "Dripping water penetrates stone.",
    origin: "Persistence achieves the impossible.",
    source: "Han Shu"
  },
  {
    id: "p0345",
    zh: "绳锯木断",
    pinyin: "shéng jù mù duàn",
    en: "A rope saw cuts through wood.",
    origin: "Persistence overcomes obstacles.",
    source: "Han Shu"
  },
  {
    id: "p0346",
    zh: "铁杵磨成针",
    pinyin: "tiě chǔ mó chéng zhēn",
    en: "An iron rod ground into a needle.",
    origin: "Perseverance achieves anything.",
    source: "Traditional tale"
  },
  {
    id: "p0347",
    zh: "磨杵成针",
    pinyin: "mó chǔ chéng zhēn",
    en: "Grind a pestle into a needle.",
    origin: "Patient effort brings success.",
    source: "Traditional tale"
  },
  {
    id: "p0348",
    zh: "积少成多",
    pinyin: "jī shǎo chéng duō",
    en: "Little by little adds up.",
    origin: "Small amounts accumulate.",
    source: "Han Shu"
  },
  {
    id: "p0349",
    zh: "集腋成裘",
    pinyin: "jí yè chéng qiú",
    en: "Collect fur under the arms to make a coat.",
    origin: "Many little things make something big.",
    source: "Master Zhuang"
  },
  {
    id: "p0350",
    zh: "聚沙成塔",
    pinyin: "jù shā chéng tǎ",
    en: "Gather sand to make a tower.",
    origin: "Small contributions build great things.",
    source: "Buddhist scripture"
  },
  {
    id: "p0351",
    zh: "众志成城",
    pinyin: "zhòng zhì chéng chéng",
    en: "United wills form a fortress.",
    origin: "Unity is strength.",
    source: "Zuo Zhuan"
  },
  {
    id: "p0352",
    zh: "众人拾柴火焰高",
    pinyin: "zhòng rén shí chái huǒ yàn gāo",
    en: "Many hands gather firewood, flames rise high.",
    origin: "Collective effort achieves more.",
    source: "Traditional expression"
  },
  {
    id: "p0353",
    zh: "团结就是力量",
    pinyin: "tuán jié jiù shì lì liàng",
    en: "Unity is strength.",
    origin: "Together we are stronger.",
    source: "Modern expression"
  },
  {
    id: "p0354",
    zh: "人心齐泰山移",
    pinyin: "rén xīn qí tài shān yí",
    en: "When hearts unite, even Mount Tai can be moved.",
    origin: "Unity achieves the impossible.",
    source: "Traditional expression"
  },
  {
    id: "p0355",
    zh: "一根筷子易折断十根筷子折不断",
    pinyin: "yī gēn kuài zi yì zhé duàn shí gēn kuài zi zhé bù duàn",
    en: "One chopstick breaks easily, ten don't.",
    origin: "Strength in numbers.",
    source: "Traditional expression"
  },
  {
    id: "p0356",
    zh: "三个臭皮匠赛过诸葛亮",
    pinyin: "sān gè chòu pí jiàng sài guò zhū gě liàng",
    en: "Three cobblers equal one Zhuge Liang.",
    origin: "Collective wisdom surpasses individual genius.",
    source: "Traditional expression"
  },
  {
    id: "p0357",
    zh: "人多力量大",
    pinyin: "rén duō lì liàng dà",
    en: "Many people, great strength.",
    origin: "Numbers bring power.",
    source: "Traditional expression"
  },
  {
    id: "p0358",
    zh: "人多势众",
    pinyin: "rén duō shì zhòng",
    en: "Strength in numbers.",
    origin: "Large group has power.",
    source: "Traditional expression"
  },
  {
    id: "p0359",
    zh: "人山人海",
    pinyin: "rén shān rén hǎi",
    en: "Mountain and sea of people.",
    origin: "Huge crowd.",
    source: "Traditional expression"
  },
  {
    id: "p0360",
    zh: "摩肩接踵",
    pinyin: "mó jiān jiē zhǒng",
    en: "Shoulders rubbing, heels touching.",
    origin: "Very crowded.",
    source: "Zhuangzi"
  },
  {
    id: "p0361",
    zh: "门庭若市",
    pinyin: "mén tíng ruò shì",
    en: "Courtyard like a marketplace.",
    origin: "Very busy and popular.",
    source: "Zhanguo Ce"
  },
  {
    id: "p0362",
    zh: "车水马龙",
    pinyin: "chē shuǐ mǎ lóng",
    en: "Carriages like flowing water, horses like dragons.",
    origin: "Busy traffic; bustling scene.",
    source: "Book of the Later Han"
  },
  {
    id: "p0363",
    zh: "络绎不绝",
    pinyin: "luò yì bù jué",
    en: "Continuous stream.",
    origin: "Endless flow of people.",
    source: "Book of the Later Han"
  },
  {
    id: "p0364",
    zh: "川流不息",
    pinyin: "chuān liú bù xī",
    en: "Flow like a river without cease.",
    origin: "Continuous movement.",
    source: "Traditional expression"
  },
  {
    id: "p0365",
    zh: "纷至沓来",
    pinyin: "fēn zhì tà lái",
    en: "Come in succession.",
    origin: "Arrive one after another.",
    source: "Song Dynasty literature"
  },
  {
    id: "p0366",
    zh: "接踵而至",
    pinyin: "jiē zhǒng ér zhì",
    en: "Arrive heel to heel.",
    origin: "Come in rapid succession.",
    source: "Zhuangzi"
  },
  {
    id: "p0367",
    zh: "源源不断",
    pinyin: "yuán yuán bù duàn",
    en: "Continuous stream from the source.",
    origin: "Unending supply.",
    source: "Traditional expression"
  },
  {
    id: "p0368",
    zh: "滔滔不绝",
    pinyin: "tāo tāo bù jué",
    en: "Flow on and on.",
    origin: "Talk endlessly.",
    source: "Traditional expression"
  },
  {
    id: "p0369",
    zh: "口若悬河",
    pinyin: "kǒu ruò xuán hé",
    en: "Mouth like a hanging river.",
    origin: "Speak eloquently and fluently.",
    source: "Jin Shu"
  },
  {
    id: "p0370",
    zh: "能说会道",
    pinyin: "néng shuō huì dào",
    en: "Good at speaking.",
    origin: "Eloquent and persuasive.",
    source: "Traditional expression"
  },
  {
    id: "p0371",
    zh: "能言善辩",
    pinyin: "néng yán shàn biàn",
    en: "Skilled in speaking and debating.",
    origin: "Articulate and persuasive.",
    source: "Traditional expression"
  },
  {
    id: "p0372",
    zh: "巧舌如簧",
    pinyin: "qiǎo shé rú huáng",
    en: "Clever tongue like a reed.",
    origin: "Smooth talker.",
    source: "Book of Songs"
  },
  {
    id: "p0373",
    zh: "伶牙俐齿",
    pinyin: "líng yá lì chǐ",
    en: "Sharp teeth and clever mouth.",
    origin: "Quick-witted in speech.",
    source: "Traditional expression"
  },
  {
    id: "p0374",
    zh: "出口成章",
    pinyin: "chū kǒu chéng zhāng",
    en: "Words form chapters.",
    origin: "Speak eloquently without preparation.",
    source: "Traditional expression"
  },
  {
    id: "p0375",
    zh: "妙语连珠",
    pinyin: "miào yǔ lián zhū",
    en: "Wonderful words like a string of pearls.",
    origin: "Witty and eloquent speech.",
    source: "Traditional expression"
  },
  {
    id: "p0376",
    zh: "字字珠玑",
    pinyin: "zì zì zhū jī",
    en: "Every word is a pearl.",
    origin: "Precious and meaningful words.",
    source: "Traditional expression"
  },
  {
    id: "p0377",
    zh: "一字千金",
    pinyin: "yī zì qiān jīn",
    en: "One word worth a thousand gold.",
    origin: "Precious writing.",
    source: "Historical Records"
  },
  {
    id: "p0378",
    zh: "一言九鼎",
    pinyin: "yī yán jiǔ dǐng",
    en: "One word carries the weight of nine tripods.",
    origin: "Words of great authority.",
    source: "Historical Records"
  },
  {
    id: "p0379",
    zh: "一诺千金",
    pinyin: "yī nuò qiān jīn",
    en: "A promise worth a thousand gold.",
    origin: "Keep one's word faithfully.",
    source: "Historical Records"
  },
  {
    id: "p0380",
    zh: "言而有信",
    pinyin: "yán ér yǒu xìn",
    en: "Words are trustworthy.",
    origin: "Keep promises.",
    source: "The Analects"
  },
  {
    id: "p0381",
    zh: "言出必行",
    pinyin: "yán chū bì xíng",
    en: "Words spoken must be acted upon.",
    origin: "Do what you say.",
    source: "The Analects"
  },
  {
    id: "p0382",
    zh: "说到做到",
    pinyin: "shuō dào zuò dào",
    en: "Say it and do it.",
    origin: "Follow through on promises.",
    source: "Traditional expression"
  },
  {
    id: "p0383",
    zh: "信守承诺",
    pinyin: "xìn shǒu chéng nuò",
    en: "Keep one's promise.",
    origin: "Honor commitments.",
    source: "Traditional expression"
  },
  {
    id: "p0384",
    zh: "一言为定",
    pinyin: "yī yán wéi dìng",
    en: "It's settled with one word.",
    origin: "Finalize with a verbal agreement.",
    source: "Traditional expression"
  },
  {
    id: "p0385",
    zh: "君子一言驷马难追",
    pinyin: "jūn zǐ yī yán sì mǎ nán zhuī",
    en: "A gentleman's word cannot be caught by four horses.",
    origin: "A promise cannot be taken back.",
    source: "The Analects"
  },
  {
    id: "p0386",
    zh: "驷马难追",
    pinyin: "sì mǎ nán zhuī",
    en: "Four horses cannot catch up.",
    origin: "Words cannot be taken back.",
    source: "Traditional expression"
  },
  {
    id: "p0387",
    zh: "覆水难收",
    pinyin: "fù shuǐ nán shōu",
    en: "Spilt water is hard to recover.",
    origin: "What's done cannot be undone.",
    source: "Traditional tale"
  },
  {
    id: "p0388",
    zh: "木已成舟",
    pinyin: "mù yǐ chéng zhōu",
    en: "The wood is already a boat.",
    origin: "What's done is done.",
    source: "Traditional expression"
  },
  {
    id: "p0389",
    zh: "生米煮成熟饭",
    pinyin: "shēng mǐ zhǔ chéng shú fàn",
    en: "Raw rice cooked into cooked rice.",
    origin: "Fait accompli.",
    source: "Traditional expression"
  },
  {
    id: "p0390",
    zh: "铁板钉钉",
    pinyin: "tiě bǎn dìng dīng",
    en: "Nails driven into iron board.",
    origin: "Absolutely certain.",
    source: "Traditional expression"
  },
  {
    id: "p0391",
    zh: "板上钉钉",
    pinyin: "bǎn shàng dìng dīng",
    en: "Nails on the board.",
    origin: "Settled and certain.",
    source: "Traditional expression"
  },
  {
    id: "p0392",
    zh: "千真万确",
    pinyin: "qiān zhēn wàn què",
    en: "Absolutely true.",
    origin: "Completely certain.",
    source: "Traditional expression"
  },
  {
    id: "p0393",
    zh: "确凿无疑",
    pinyin: "què záo wú yí",
    en: "Conclusive and without doubt.",
    origin: "Absolutely certain.",
    source: "Traditional expression"
  },
  {
    id: "p0394",
    zh: "毋庸置疑",
    pinyin: "wú yōng zhì yí",
    en: "Beyond doubt.",
    origin: "Unquestionable.",
    source: "Traditional expression"
  },
  {
    id: "p0395",
    zh: "毫无疑问",
    pinyin: "háo wú yí wèn",
    en: "Without any doubt.",
    origin: "Absolutely certain.",
    source: "Traditional expression"
  },
  {
    id: "p0396",
    zh: "不容置疑",
    pinyin: "bù róng zhì yí",
    en: "Allow no doubt.",
    origin: "Indisputable.",
    source: "Traditional expression"
  },
  {
    id: "p0397",
    zh: "无可置疑",
    pinyin: "wú kě zhì yí",
    en: "No room for doubt.",
    origin: "Unquestionable.",
    source: "Traditional expression"
  },
  {
    id: "p0398",
    zh: "理所当然",
    pinyin: "lǐ suǒ dāng rán",
    en: "Naturally so.",
    origin: "As it should be.",
    source: "Traditional expression"
  },
  {
    id: "p0399",
    zh: "天经地义",
    pinyin: "tiān jīng dì yì",
    en: "Law of heaven and principle of earth.",
    origin: "Unquestionable truth.",
    source: "Traditional expression"
  },
  {
    id: "p0400",
    zh: "天理昭昭",
    pinyin: "tiān lǐ zhāo zhāo",
    en: "The heavenly principle is clear.",
    origin: "Justice is evident.",
    source: "Traditional expression"
  }
];

const outputPath = path.join(__dirname, '..', 'src', 'data', 'proverbs.bundled.json');
fs.writeFileSync(outputPath, JSON.stringify(proverbs, null, 2), 'utf8');

console.log(`✅ Successfully wrote ${proverbs.length} authentic Chinese proverbs to ${outputPath}`);
