// 简化版报告生成逻辑
export function generateReport({ birthDate, bloodType, testType, tarotCards }) {
  const cards = typeof tarotCards === 'string' ? JSON.parse(tarotCards) : tarotCards;
  const zodiac = getZodiac(birthDate);
  const isPositive = Math.random() > 0.1; // 90% 正向
  
  const templates = {
    love: {
      positive: `${zodiac}座的你在爱情中充满魅力。${bloodType}型血让你在感情中${getBloodTraits(bloodType)}。塔罗牌显示：${cards.map(c => c.name).join('、')}，预示着美好的情感连接即将到来。`,
      negative: `说实话，${zodiac}座在爱情里有时候挺作的。不过${bloodType}型血的执着也许能帮你找到对的人。`
    },
    friendship: {
      positive: `作为${zodiac}座，你的朋友运一直不错。${bloodType}型血的性格让你容易交到真心朋友。塔罗牌${cards[0].name}暗示，珍惜身边的人。`,
      negative: `${zodiac}座有时候太独立了，记得多关心朋友。${bloodType}型血容易钻牛角尖，放轻松点。`
    },
    career: {
      positive: `${zodiac}座在事业上有天生的优势。${bloodType}型血赋予你${getBloodTraits(bloodType)}的特质。塔罗牌显示机会即将来临，抓住它！`,
      negative: `${zodiac}座别太拼了，工作不是全部。${bloodType}型血容易工作狂，注意平衡生活。`
    }
  };
  
  return templates[testType][isPositive ? 'positive' : 'negative'];
}

function getZodiac(date) {
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();
  const signs = ['摩羯','水瓶','双鱼','白羊','金牛','双子','巨蟹','狮子','处女','天秤','天蝎','射手'];
  const dates = [20,19,21,20,21,22,23,23,23,24,23,22];
  return signs[month - (day < dates[month-1] ? 1 : 0)];
}

function getBloodTraits(type) {
  const traits = { A: '细腻敏感', B: '自由奔放', O: '热情直率', AB: '理性独特' };
  return traits[type] || '独特';
}
