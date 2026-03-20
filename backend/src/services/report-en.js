// English report generation
export function generateReportEn({ birthDate, bloodType, testType, tarotCards }) {
  const cards = typeof tarotCards === 'string' ? JSON.parse(tarotCards) : tarotCards;
  const zodiac = getZodiac(birthDate);
  const bloodTraits = getBloodTraitsEn(bloodType);
  const zodiacTraits = getZodiacTraitsEn(zodiac);
  const tarotAnalysis = getTarotAnalysisEn(cards, testType);

  const typeLabels = { love: 'Love', friendship: 'Friendship', career: 'Career' };
  const label = typeLabels[testType] || testType;

  return `
## 🌟 ${zodiac} × Blood Type ${bloodType} — ${label} Reading

### I. Zodiac Reading — ${zodiac}
${zodiacTraits.base}

In **${label}**, ${zodiacTraits[testType]}

---

### II. Blood Type Reading — Type ${bloodType}
${bloodTraits.base}

Combined with ${zodiac}, ${bloodTraits[testType]}

---

### III. Tarot Reading
Your three cards: **${cards.map(c => c.nameEn).join(', ')}**

${tarotAnalysis}

---

### IV. Overall Guidance
${getSummaryEn(zodiac, bloodType, testType, cards)}
  `.trim();
}

function getZodiacTraitsEn(zodiac) {
  const traits = {
    'Aries': {
      base: 'Aries is the first sign of the zodiac, symbolizing courage and pioneering spirit. You are naturally energetic and action-oriented, always ready to be the first to take a step forward. As a fire sign, you are passionate and driven, though you can sometimes act impulsively.',
      love: 'In love, you are direct and passionate, preferring to take the initiative. You crave excitement and novelty, but need to learn patience to nurture a long-term relationship and avoid losing interest too quickly.',
      friendship: 'You are the life of the party and the action-taker in your friend group. You are generous and enthusiastic, but can sometimes be self-centered — practice listening more to others.',
      career: 'You have a strong competitive drive and natural leadership qualities, making you well-suited for trailblazing work. Balance your momentum with planning to avoid unfinished projects.'
    },
    'Taurus': {
      base: 'Taurus is an earth sign symbolizing stability and abundance. You are practical and reliable, with high standards for quality of life. Patient and persistent, you are the most dependable person your friends know.',
      love: 'In love, you are loyal and devoted, valuing security above all. You don\'t rush into declarations, but once committed, you give everything. Watch out for possessiveness.',
      friendship: 'You are the most trustworthy friend — your word is your bond. Your social circle may be small, but those friendships run deep. Quality over quantity, always.',
      career: 'You have exceptional follow-through and financial instincts, thriving in roles requiring patience and stability. Your money sense is outstanding, though be careful not to be so conservative that you miss opportunities.'
    },
    'Gemini': {
      base: 'Gemini is an air sign symbolizing communication and adaptability. Your mind is sharp, your wit is quick, and your curiosity knows no bounds. Your multifaceted nature is captivating, even if hard to pin down.',
      love: 'In love, you are playful and inventive, always keeping things interesting. You need a partner who can keep up with your mind — intellectual connection matters more than anything.',
      friendship: 'You are the social butterfly, spreading laughter wherever you go. Just remember: consistency and follow-through build the real trust your friendships deserve.',
      career: 'You thrive in roles that demand creativity and communication — media, sales, strategy. Multi-tasking is your superpower; just make sure you follow ideas through to completion.'
    },
    'Cancer': {
      base: 'Cancer is a water sign symbolizing emotion and home. Your intuition is sharp and your heart is vast, always caring deeply for the people around you. You treasure family and belonging — you are a natural protector.',
      love: 'In love, you are tender and nurturing. You crave deep emotional bonds but can be overly sensitive to small things. Learn to express rather than retreat when hurt.',
      friendship: 'You are the emotional anchor of your friend group, showing up when people need you most. Your memory for details and gestures makes others feel truly seen. Just don\'t let your own emotional weight silently build.',
      career: 'Your empathy and attentiveness are assets in fields like education, healthcare, and counseling. Your intuition is invaluable in the workplace.'
    },
    'Leo': {
      base: 'Leo is a fire sign symbolizing glory and creativity. You naturally radiate presence and have a powerful leadership aura. Generous and warm, you hold yourself and others to high standards.',
      love: 'In love, you are passionate and expressive, and you love being adored. You create romance effortlessly, but need a partner who gives you genuine respect and space.',
      friendship: 'You are the center of your social universe, generous and magnetic. You love bringing people together, but remember to let others have the spotlight too.',
      career: 'You have natural leadership charisma, perfect for management and creative work. Your confidence and magnetism are assets — just make sure to value teamwork alongside your own brilliance.'
    },
    'Virgo': {
      base: 'Virgo is an earth sign symbolizing perfection and service. Your analytical mind and eye for detail are unmatched. You have a strong sense of responsibility and are the indispensable backbone of any team.',
      love: 'In love, you express care through thoughtful actions. You have high standards for partners — work on accepting imperfections and letting go of over-criticism.',
      friendship: 'You are the most attentive friend, always noticing what others miss. Your helpfulness is boundless, but try to appreciate your friends\' strengths rather than focusing on their flaws.',
      career: 'You excel in precision-driven fields like data, research, and medicine. Your perfectionism is a strength, but watch that it doesn\'t lead to paralysis or delay.'
    },
    'Libra': {
      base: 'Libra is an air sign symbolizing balance and beauty. Elegant and sociable, you have a keen aesthetic sense and a talent for diplomacy. You seek fairness and harmony in all things.',
      love: 'In love, you are romantic and gentle, valuing equality and harmony in relationships. You create beautiful moments naturally, but struggle with indecisiveness — practice making clear choices.',
      friendship: 'You are everyone\'s favorite friend, empathetic and conflict-dissolving. You value the quality of your connections, but don\'t sacrifice your own needs just to keep the peace.',
      career: 'You thrive in coordination and aesthetics-focused roles — design, law, public relations. Your interpersonal skills are your greatest professional asset.'
    },
    'Scorpio': {
      base: 'Scorpio is a water sign symbolizing depth and transformation. Your perception is razor-sharp, your will is iron, and your aura is magnetic. Your understanding of things goes far deeper than most.',
      love: 'In love, you love with intense devotion. You crave a soul-level connection, but jealousy and control can surface — trust is the lesson you are here to learn.',
      friendship: 'You are selective in friendship, but once someone earns your loyalty, it\'s for life. Sometimes your mystery makes it hard for others to get close — open up more.',
      career: 'You excel in fields requiring deep research and strategy — finance, psychology, investigation. Your insight and execution are your core competitive advantages.'
    },
    'Sagittarius': {
      base: 'Sagittarius is a fire sign symbolizing freedom and philosophy. Optimistic and adventurous, you are endlessly curious about the world, with grand visions and ideals.',
      love: 'In love, you are free-spirited and need a partner who gives you room to breathe. You are direct and enthusiastic, but can be overly casual — learn to take responsibility in relationships.',
      friendship: 'You are the most entertaining friend, always arriving with fresh ideas and experiences. You are sincere, but your bluntness can sting — choose your words with care.',
      career: 'You flourish in roles with creative freedom — travel, education, media. Your optimism and broad perspective are treasures in any professional setting.'
    },
    'Capricorn': {
      base: 'Capricorn is an earth sign symbolizing responsibility and achievement. Practical and composed, you have a powerful drive and a deep sense of duty. Disciplined and goal-oriented, you are one of the hardest-working signs.',
      love: 'In love, you are serious and committed, valuing long-term stability. You show love through action rather than words. Learn to relax and enjoy the sweetness of romance.',
      friendship: 'You are the most reliable friend — when you say it, you mean it. You value quality friendships, but can come across as too serious. Allow yourself to enjoy the lighter side of friendship.',
      career: 'Your ambition and execution are exceptional, perfect for roles requiring long-term planning. Patience and grit are your keys to success, but remember to balance work with life.'
    },
    'Aquarius': {
      base: 'Aquarius is an air sign symbolizing innovation and humanitarianism. You have a unique perspective and a strong sense of individuality. You care about society, hold idealistic values, and are always ahead of your time.',
      love: 'In love, you need intellectual resonance and an equal, independent relationship. You can be overly rational — practice expressing your feelings so your partner feels your warmth.',
      friendship: 'You are the thinker in your social circle, bringing a distinctive viewpoint to everything. You are genuine but fiercely independent — learn the art of mutual reliance.',
      career: 'You thrive in innovation and forward-thinking roles — tech, design, social work. Your unconventional thinking is your greatest competitive edge.'
    },
    'Pisces': {
      base: 'Pisces is a water sign symbolizing dreams and spirituality. Full of compassion and intuition, you have a rich inner world. You are a born artist and dreamer with extraordinary sensitivity to beauty and emotion.',
      love: 'In love, you are romantic and deeply feeling, creating a dreamlike atmosphere. You give wholeheartedly, but guard against losing yourself — keep your clarity and judgment.',
      friendship: 'You are the most empathetic friend, always attuned to others\' emotions. Your generosity is boundless, but set boundaries so you don\'t drain yourself.',
      career: 'You flourish in creative and intuitive fields — art, music, counseling. Your intuition and empathy are unique advantages in any professional environment.'
    }
  };
  return traits[zodiac] || traits['Aries'];
}

function getBloodTraitsEn(type) {
  const traits = {
    A: {
      base: 'Type A individuals are thoughtful and sensitive, conscientious and responsible, with a strong sense of planning. You value rules and order, holding yourself and others to high standards. Rich on the inside but reserved on the outside — you run warm beneath a cool surface.',
      love: 'In relationships, you are loyal and devoted, with a deep appreciation for meaningful gestures. You give quietly and steadily, but sometimes suppress your own needs — learn to express your true feelings.',
      friendship: 'You are a reliable friend who honors commitments. You are careful about who you let in, but once you do, you protect the friendship with everything you have. Build more self-confidence in social settings.',
      career: 'Your attention to detail and sense of responsibility are your core professional strengths. You excel in precise, methodical work — just make sure perfectionism doesn\'t become a source of undue pressure.'
    },
    B: {
      base: 'Type B individuals are free-spirited and distinctive, resisting constraints and following instinct and enthusiasm. Your authenticity and spontaneity leave a lasting impression.',
      love: 'In love, you are enthusiastic and crave novelty. You need a partner who accepts your independent nature — space for both of you is essential.',
      friendship: 'You are the most entertaining friend, always bringing laughter to the room. You are genuine, but can be self-focused at times — make more effort to consider others\' perspectives.',
      career: 'Your creativity and energy are workplace assets, best channeled into innovative roles. Focus on consistency and follow-through to avoid the "great start, no finish" pattern.'
    },
    O: {
      base: 'Type O individuals are warm and outgoing, with strong leadership instincts and a competitive streak. Direct and honest, you are a natural-born leader who moves fast and gets things done.',
      love: 'In love, you are enthusiastic and proactive, loving directly. You value taking the lead, but learn to listen and compromise — give your partner more room to breathe.',
      friendship: 'You are the heart of your social circle, generous and energizing. Your enthusiasm is infectious, but be mindful of coming on too strong — respect others\' opinions.',
      career: 'You have intense ambition and execution power, perfect for management and sales. Your leadership and drive are your biggest professional assets.'
    },
    AB: {
      base: 'Type AB individuals are a blend of logic and feeling, with a unique perspective that\'s hard to read. Your sharp analytical mind coexists with a rich emotional world. This duality lets you navigate many different situations with ease.',
      love: 'In love, you are both rational and deeply caring. You need time to build trust, but once you commit, you are fully in. Seek a partner who can appreciate your complex inner world.',
      friendship: 'You are the most intellectually engaging friend, offering perspectives that others haven\'t considered. You prefer a small, high-quality social circle centered on meaningful exchange.',
      career: 'Your dual nature — analytical yet creative — is a rare professional advantage, allowing you to excel in diverse fields. Your versatility is your superpower.'
    }
  };
  return traits[type] || traits['O'];
}

function getTarotAnalysisEn(cards, testType) {
  if (!cards || cards.length === 0) return 'Tarot card information is incomplete.';
  const positions = ['Past', 'Present', 'Future'];
  let analysis = '';
  cards.forEach((card, i) => {
    const pos = positions[i] || `Card ${i + 1}`;
    analysis += `**${pos} — ${card.nameEn}**\n`;
    analysis += `${getTarotMeaningEn(card.nameEn, testType)}\n\n`;
  });
  return analysis.trim();
}

function getTarotMeaningEn(cardName, testType) {
  const cardMeanings = {
    'The Fool': {
      love: 'The Fool in love signals a brand-new beginning — a relationship full of the unknown and delight is opening its doors to you. Let go of the past and step in with a pure heart.',
      friendship: 'The Fool suggests new friendships are on the way. Stay open and unguarded; don\'t let past wounds close you off to new connections.',
      career: 'The Fool heralds a fresh start professionally — an unexpected opportunity may be at hand. Take that first brave step without letting the unknown hold you back.'
    },
    'The Magician': {
      love: 'The Magician says you already have everything it takes to attract love. Take the initiative and use your energy and creativity to weave something beautiful.',
      friendship: 'The Magician reminds you that you have the power to build genuine friendships. Use your communication gifts to actively nurture the connections that matter.',
      career: 'The Magician is one of the most powerful career cards — you already have all the resources and skills needed to succeed. Now is the perfect time to act on your ideas.'
    },
    'The High Priestess': {
      love: 'The High Priestess asks you to trust your intuition in love. Something is being held back — be patient, and the answer will reveal itself at the right moment.',
      friendship: 'The High Priestess invites you to reflect quietly. A friendship may have a deeper layer you haven\'t yet seen — open yourself to greater understanding.',
      career: 'The High Priestess suggests you hold key information, but the timing isn\'t right yet. Accumulate and deepen; don\'t rush to show your hand.'
    },
    'The Empress': {
      love: 'The Empress speaks of a nurturing, flourishing love. Your emotional life is in full bloom — offer warmth and acceptance, and the bond will only grow stronger.',
      friendship: 'The Empress reflects that you are warmth itself in the eyes of your friends. Keep giving generously and caringly — your friendships are blossoming.',
      career: 'The Empress signals creative abundance in your work. Your efforts are taking root; stay the course and the harvest is near.'
    },
    'The Emperor': {
      love: 'The Emperor in love represents stability and structure — a mature, secure relationship is forming. Set clear boundaries and commitments for a more solid foundation.',
      friendship: 'The Emperor reminds you that true friendship is built on mutual respect and trust. Be the reliable friend, and your network will become a real source of strength.',
      career: 'The Emperor symbolizes authority and growing command. Set clear goals and drive forward with discipline and resolve.'
    },
    'The Hierophant': {
      love: 'The Hierophant hints at a traditional, stable relationship — perhaps one with family approval. Honor your inner longing for commitment.',
      friendship: 'The Hierophant points to shared values as the bedrock of lasting friendship. Like-minded companions will offer you genuine belonging and spiritual support.',
      career: 'The Hierophant advises finding a mentor or following established professional norms. Go deep within existing frameworks — steady mastery is the path to success.'
    },
    'The Lovers': {
      love: 'The Lovers is one of the most powerful positive cards in romance — it speaks of profound connection and soul-level resonance. A significant choice is before you; follow your heart.',
      friendship: 'The Lovers suggests a friendship is deepening into something more meaningful. The understanding and chemistry between you is growing — treasure this rare bond.',
      career: 'The Lovers represents an important career choice. When facing multiple directions, follow your true passion and choose the path aligned with your values.'
    },
    'The Chariot': {
      love: 'The Chariot in love speaks of unwavering will and forward momentum. You have what it takes to overcome any obstacles on your path — stay focused and victory will come.',
      friendship: 'The Chariot reminds you to stand your ground in friendships while keeping your emotions in check. Don\'t let impulse damage something precious.',
      career: 'The Chariot is a powerful success signal — your efforts are driving you swiftly toward your goal. Stay focused; victory is within reach.'
    },
    'Strength': {
      love: 'Strength in love speaks of gentle persistence and inner courage. Real love requires patience and acceptance — use softness to dissolve the fear in both your hearts.',
      friendship: 'Strength reminds you to meet challenges in friendship with patience and grace. Gentle firmness is the true power that sustains meaningful relationships.',
      career: 'Strength encourages you to remain calm and resilient when facing workplace challenges. You have the capacity and endurance to overcome what lies ahead.'
    },
    'The Hermit': {
      love: 'The Hermit asks you to give yourself and your partner some space for solitude. Deep self-knowledge is what leads you to the person truly right for you.',
      friendship: 'The Hermit suggests spending time alone in reflection — clarify which friendships truly matter. Fewer but deeper is more valuable than a wide but shallow network.',
      career: 'The Hermit points to a period of settling and reflection. Don\'t rush for results; use this time to accumulate wisdom and prepare for the next breakthrough.'
    },
    'Wheel of Fortune': {
      love: 'The Wheel of Fortune signals a turn in your romantic fortunes. If things have been difficult, the wheel will spin toward good luck again; if you\'re in a good place, cherish and protect it.',
      friendship: 'The Wheel signals change coming in your friendships. Old ties may fade as new ones arrive — go with the flow and embrace fresh connections.',
      career: 'The Wheel heralds a pivotal turning point. An opportunity is approaching — stay alert and seize this life-changing moment.'
    },
    'Justice': {
      love: 'Justice in love urges honesty and fairness. A relationship\'s quality depends on balanced giving and receiving — face the truth in your heart with courage.',
      friendship: 'Justice reminds you that friendship requires honesty and mutual respect. If a relationship feels unequal, it\'s time for an open, honest conversation.',
      career: 'Justice assures you that your hard work and dedication will be fairly rewarded. Stand by your principles in any workplace disputes — truth and fairness will prevail.'
    },
    'The Hanged Man': {
      love: 'The Hanged Man asks you to release your grip on the outcome and look at your relationship from a new angle. After sacrifice and waiting, a deeper emotional understanding will emerge.',
      friendship: 'The Hanged Man invites you to set your ego aside. See the situation from your friend\'s perspective — you may discover something you\'ve been overlooking.',
      career: 'The Hanged Man signals that pausing and rethinking is wiser than pressing forward. Let things unfold naturally — the right time will come.'
    },
    'Death': {
      love: 'The Death card represents profound transformation, not an ending. Old relationship patterns are closing; a more mature, authentic love is being reborn.',
      friendship: 'Death signals a friendship reaching a turning point — perhaps a farewell, perhaps a transformation. Either way, it makes space for something more genuine.',
      career: 'Death heralds a major professional transformation. One chapter is ending; new possibilities are germinating. Release the past and embrace your career\'s next chapter.'
    },
    'Temperance': {
      love: 'Temperance in love speaks of balance and patience. Don\'t rush — let love flow naturally. Find the harmonious rhythm with your partner for lasting connection.',
      friendship: 'Temperance reminds you to give and receive in equal measure. Both over-dependence and over-giving throw things off balance — find the comfortable middle ground.',
      career: 'Temperance advises a steady, balanced approach. Avoid extremes; tend to both short and long-term goals, and patient accumulation will bear fruit.'
    },
    'The Devil': {
      love: 'The Devil asks you to examine whether unhealthy dependency or entrapment exists in your relationship. True love gives freedom, not chains — face and break free from what binds you.',
      friendship: 'The Devil warns that a friendship may involve an unhealthy attachment. Ask yourself if fear of loneliness is keeping you in a relationship that drains you.',
      career: 'The Devil warns of being trapped in a problematic work pattern. Identify the source of your constraints — it\'s time to make a change.'
    },
    'The Tower': {
      love: 'The Tower represents sudden upheaval — a conflict or revelation that shakes things up. Though unsettling, it clears away what is false and leaves only what is real.',
      friendship: 'The Tower signals an unexpected test for a friendship. This storm is a purification — the ones who stay through it are your true friends.',
      career: 'The Tower warns of sudden professional disruption. Though painful, the collapse of an old structure is often the foundation on which a better future is built.'
    },
    'The Star': {
      love: 'The Star is one of the most hopeful cards in romance. After trials, the light of true love is shining your way — hold on to your belief.',
      friendship: 'The Star brings hope and healing to friendship. A strained relationship may be repaired, or a soulful new connection is about to unfold.',
      career: 'The Star signals a beautiful professional horizon — you are on the right path. Keep following your dream; starlight will guide you, and success awaits.'
    },
    'The Moon': {
      love: 'The Moon points to uncertainty and hidden emotions in love. Don\'t be misled by appearances — tune in to your deepest intuition and clarify what you truly feel.',
      friendship: 'The Moon warns of possible misunderstanding or concealed information in a friendship. Hold your judgment until the mist clears; stay clear-headed and cautious.',
      career: 'The Moon suggests murky factors in your professional environment. Stay alert, don\'t trust surface information alone, and wait for clarity before making major decisions.'
    },
    'The Sun': {
      love: 'The Sun is the brightest, most joyful card in love! It heralds happiness, joy, and a flourishing romance. Your love life is moving into the light — soak it in.',
      friendship: 'The Sun radiates warmth and positivity in your relationships. Now is the best time to make new friends and deepen existing ones.',
      career: 'The Sun is the ultimate sign of professional success! Your hard work is about to shine — walk forward with confidence, as achievement and recognition are flowing your way.'
    },
    'Judgement': {
      love: 'Judgement speaks of awakening and rebirth in love — perhaps an old flame rekindled, or a whole new understanding of what love means. Listen to the call deep within and make an authentic choice.',
      friendship: 'Judgement asks you to reassess which friendships truly matter. Someone may be waiting for you to reach out — an important friendship awaits renewal.',
      career: 'Judgement marks a profound professional awakening. You now see your career direction with far greater clarity — it\'s time to boldly answer your inner calling.'
    },
    'The World': {
      love: 'The World is the ultimate symbol of romantic fulfillment. A relationship has reached a state of wholeness, or you are about to meet the one who makes you feel complete. Celebrate this beauty.',
      friendship: 'The World represents wholeness and fulfillment in your social world. Your circle is your solid ground — treasure these deep, hard-won bonds.',
      career: 'The World is the highest card of professional achievement, marking the perfect completion of a major chapter. Your efforts have earned the finest reward; now prepare for an even grander stage.'
    }
  };

  const card = cardMeanings[cardName];
  if (card && card[testType]) return card[testType];

  const fallback = {
    love: 'This card brings an important message about love — stay open-hearted and let your authentic feelings guide you toward the best outcome.',
    friendship: 'This card speaks to your friendships — sincerity and trust are the foundation of every lasting bond. Cherish those who are truly there for you.',
    career: 'This card signals emerging opportunities in your career — stay focused and decisive, and seize the moment when it arrives.'
  };
  return fallback[testType] || 'This card carries an important message. Open yourself to what it is trying to show you.';
}

function getSummaryEn(zodiac, bloodType, testType, cards) {
  const past    = cards[0];
  const present = cards[1];
  const future  = cards[2];

  const pastKw    = past?.keywords?.[0]    || past?.nameEn    || 'the past';
  const presentKw = present?.keywords?.[0] || present?.nameEn || 'the present';
  const futureKw  = future?.keywords?.[0]  || future?.nameEn  || 'the future';

  const pastName    = past?.nameEn    || '';
  const presentName = present?.nameEn || '';
  const futureName  = future?.nameEn  || '';

  const summaries = {
    love: `All considered, you are a ${zodiac} with Blood Type ${bloodType} — someone with a distinctive depth and magnetism in love.\n\n**The Past (${pastName})** and its theme of "${pastKw}" has shaped the lens through which you view relationships today. **The Present (${presentName})** and "${presentKw}" mirrors exactly where you stand right now — take it seriously. And **The Future (${futureName})**, with its energy of "${futureKw}", tells you the direction ahead is already becoming clear.\n\nStay true to yourself in love, let ${zodiac}'s intuition and the loyalty of Blood Type ${bloodType} guide you — and take that courageous step forward.`,

    friendship: `You are a ${zodiac} with Blood Type ${bloodType} — someone who brings a rare warmth and depth to every friendship.\n\nThe three cards tell a coherent story: **The Past (${pastName})** and "${pastKw}" laid the foundation for how you connect with others. **The Present (${presentName})** and "${presentKw}" reflects the real state of your friendships right now. **The Future (${futureName})** and "${futureKw}" points to the energy you\'re about to receive.\n\nFollow ${zodiac}'s perceptiveness and the loyalty of Blood Type ${bloodType} — actively nurture the friendships that truly matter, and beautiful connections are drawing near.`,

    career: `You are a ${zodiac} with Blood Type ${bloodType} — someone with both potential and a distinctive edge in professional life.\n\nThe three cards map your career trajectory: **The Past (${pastName})** and "${pastKw}" represents the foundation you\'ve built. **The Present (${presentName})** and "${presentKw}" is the core thing to focus on right now. **The Future (${futureName})** and "${futureKw}" reveals the direction of what comes next.\n\nLean into ${zodiac}\'s strengths and the work style of Blood Type ${bloodType} — be steady, be bold, and opportunity is already waiting ahead.`
  };

  return summaries[testType] || `Drawing on ${zodiac}'s qualities, Blood Type ${bloodType}'s character, and the complete guidance of your three cards (${pastName}, ${presentName}, ${futureName}) — you stand at an important crossroads. "Past: ${pastKw}" · "Present: ${presentKw}" · "Future: ${futureKw}" — these are your signposts. Stay clear-headed, stay in motion, and good fortune is on its way.`;
}

function getZodiac(date) {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  // Returns English zodiac name
  const signs = ['Capricorn','Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn'];
  const dates = [20,19,21,20,21,22,23,23,23,24,23,22];
  return signs[month - (day < dates[month-1] ? 1 : 0)];
}
