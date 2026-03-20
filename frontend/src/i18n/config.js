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
      nav: {
        login: '登录'
      },
      login: {
        title: '登录以使用服务'
      },
      test: {
        birthDate: '出生日期',
        bloodType: '血型',
        testType: '测试类型',
        love: '爱情',
        friendship: '友情',
        career: '事业',
        drawCards: '抽取塔罗牌',
        submit: '生成报告',
        drawTitle: '抽取3张塔罗牌',
        drawHint: '请在心里默默想着你所测的内容',
        drawHintSub: '全身心专注，让塔罗牌感应你的能量',
        drawBtn: '开始抽牌',
        drawing: '正在为你抽取塔罗牌...',
        yourCards: '你的塔罗牌',
        past: '过去',
        present: '现在',
        future: '未来'
      },
      history: {
        title: '测试历史',
        empty: '暂无历史记录'
      },
      profile: {
        startTest: '🔮 开始测试',
        history: '📜 历史记录',
        logout: '退出登录'
      },
      pricing: {
        title: '选择你的套餐',
        subtitle: '注册即送10次免费体验，随时升级解锁更多',
        buyNow: '立即购买',
        loginToBuy: '登录后购买',
        usages: '可使用',
        faqTitle: '常见问题',
        successMsg: '🎉 支付成功！已解锁 {{name}}，请重新登录刷新次数。',
        badge: {
          popular: '最受欢迎',
          value: '超值'
        },
        plans: {
          once: {
            name: '单次体验',
            credits: '1次',
            features: ['1次完整分析', '星座+血型+塔罗三合一', '报告永久保存']
          },
          pro: {
            name: 'Pro 月订阅',
            sub: '/月',
            credits: '30次',
            features: ['每月30次分析', '星座+血型+塔罗三合一', '报告永久保存', '历史记录查看', '优先客服支持']
          },
          unlimited: {
            name: 'Unlimited',
            sub: '/月',
            credits: '无限次',
            features: ['无限次分析', '星座+血型+塔罗三合一', '报告永久保存', '历史记录查看', '优先客服支持', '新功能优先体验']
          }
        },
        faqs: [
          { q: '免费用户能用几次？', a: '注册后赠送10次免费体验，用完后需要购买次数或订阅套餐。' },
          { q: '单次购买和月订阅有什么区别？', a: '单次购买适合偶尔使用，月订阅性价比更高，适合每月多次测试的用户。' },
          { q: '支持什么付款方式？', a: '支持 PayPal，包括信用卡、借记卡、PayPal 余额等多种方式。' },
          { q: '订阅可以随时取消吗？', a: '可以随时取消，取消后当月剩余次数仍可使用，不会续费。' },
          { q: '分析结果准确吗？', a: '我们结合星座、血型和塔罗牌进行综合分析，提供参考和娱乐，请理性看待。' },
          { q: '历史记录可以查多久？', a: 'Pro 和 Unlimited 用户的历史记录永久保存，免费用户保存最近3条。' }
        ]
      },
      result: {
        retest: '再测一次',
        history: '查看历史'
      }
    }
  },
  en: {
    translation: {
      home: {
        title: 'Know Yourself Better',
        subtitle: 'Explore your inner self through divination',
        start: 'Start Test'
      },
      nav: {
        login: 'Login'
      },
      login: {
        title: 'Sign in to continue'
      },
      test: {
        birthDate: 'Birth Date',
        bloodType: 'Blood Type',
        testType: 'Reading Type',
        love: 'Love',
        friendship: 'Friendship',
        career: 'Career',
        drawCards: 'Draw Tarot Cards',
        submit: 'Generate Report',
        drawTitle: 'Draw 3 Tarot Cards',
        drawHint: 'Silently focus on your question in your mind',
        drawHintSub: 'Concentrate fully and let the cards sense your energy',
        drawBtn: 'Draw Cards',
        drawing: 'Drawing your tarot cards...',
        yourCards: 'Your Tarot Cards',
        past: 'Past',
        present: 'Present',
        future: 'Future'
      },
      history: {
        title: 'Reading History',
        empty: 'No history yet'
      },
      profile: {
        startTest: '🔮 Start Test',
        history: '📜 History',
        logout: 'Sign Out'
      },
      pricing: {
        title: 'Choose Your Plan',
        subtitle: 'Get 10 free readings on sign-up. Upgrade anytime.',
        buyNow: 'Buy Now',
        loginToBuy: 'Login to Purchase',
        usages: 'readings',
        faqTitle: 'Frequently Asked Questions',
        successMsg: '🎉 Payment successful! {{name}} unlocked. Please re-login to refresh credits.',
        badge: {
          popular: 'Most Popular',
          value: 'Best Value'
        },
        plans: {
          once: {
            name: 'Single Reading',
            credits: '1 reading',
            features: ['1 full analysis', 'Zodiac + Blood Type + Tarot', 'Report saved forever']
          },
          pro: {
            name: 'Pro Monthly',
            sub: '/mo',
            credits: '30 readings',
            features: ['30 readings/month', 'Zodiac + Blood Type + Tarot', 'Report saved forever', 'History access', 'Priority support']
          },
          unlimited: {
            name: 'Unlimited',
            sub: '/mo',
            credits: 'Unlimited',
            features: ['Unlimited readings', 'Zodiac + Blood Type + Tarot', 'Report saved forever', 'History access', 'Priority support', 'Early access to new features']
          }
        },
        faqs: [
          { q: 'How many free readings do I get?', a: 'You get 10 free readings when you sign up. Purchase more or subscribe for additional readings.' },
          { q: "What's the difference between single and subscription?", a: 'Single purchase is great for occasional use. Subscriptions offer better value for frequent users.' },
          { q: 'What payment methods are supported?', a: 'We support PayPal, including credit/debit cards and PayPal balance.' },
          { q: 'Can I cancel my subscription anytime?', a: 'Yes, cancel anytime. Your remaining credits for the month stay active and you won\'t be charged again.' },
          { q: 'How accurate are the readings?', a: 'We combine astrology, blood type analysis, and tarot for a comprehensive reading. Please enjoy it as guidance and entertainment.' },
          { q: 'How long is history stored?', a: 'Pro and Unlimited users get permanent history. Free users can access their last 3 readings.' }
        ]
      },
      result: {
        retest: 'Read Again',
        history: 'View History'
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
