import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  zh: {
    translation: {
      home: {
        title: '让你更了解你自己',
        subtitle: '通过占卜探索内心',
        start: '开始测试'
      },
      test: {
        birthDate: '出生日期',
        bloodType: '血型',
        testType: '测试类型',
        love: '爱情',
        friendship: '友情',
        career: '事业',
        drawCards: '抽取塔罗牌',
        submit: '生成报告'
      }
    }
  },
  en: {
    translation: {
      home: {
        title: 'Know Yourself Better',
        subtitle: 'Explore your inner self',
        start: 'Start Test'
      },
      test: {
        birthDate: 'Birth Date',
        bloodType: 'Blood Type',
        testType: 'Test Type',
        love: 'Love',
        friendship: 'Friendship',
        career: 'Career',
        drawCards: 'Draw Tarot Cards',
        submit: 'Generate Report'
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'zh',
  fallbackLng: 'zh',
  interpolation: { escapeValue: false }
});

export default i18n;
