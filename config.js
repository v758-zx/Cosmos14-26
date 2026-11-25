/*
 * 小奇点 · 内容配置（按问卷定制版）
 * 先只修改这个文件中的文字与素材路径，避免直接改动交互核心 script.js。
 * 图片放进 assets/，文件名与下面的路径完全一致。
 */
window.XQD_CONFIG = {
  siteTitle: 'Cosmos 14/26',
  author: '创造宇宙的大魔王',
  welcome: '恒星第26次回到原点，星图第14次展开。欢迎你的到来',
  mainMusic: 'assets/fen.mp3',
  birthdayMusic: 'assets/shengri-kuaile.mp3',
  // 九颗星的名称（按问卷章节命名，顺序不可变动）。
  starLabels: ['回响', '心光', '光谱', '共天', '回溯', '年岁', '回声', '星笺', '星轮'],
  // 第二星「心光」：十四颗词浮在星图上，其中三颗是暗号。
  // correct 为 true 的三颗是答案；点错会浮现该词对应的句子。
  moodWords: [
    { w: '值得', quote: '对未来的真正慷慨，是把一切献给现在。', author: '加缪', correct: true },
    { w: '尽力', quote: '重要的不是发生了什么，而是你如何应对。', author: '爱比克泰德', correct: true },
    { w: '平淡', quote: '人间有味是清欢。', author: '苏轼', correct: false },
    { w: '幸福', quote: '幸福不是宏大的东西，它由许多小事组成。', author: '托尔金', correct: true },
    { w: '会好的', quote: '在隆冬，我终于知道，我身上有一个不可战胜的夏天。', author: '加缪', correct: false },
    { w: '又长大一岁', quote: '岁月不饶人，我亦未曾饶过岁月。', author: '木心', correct: false },
    { w: '许愿', quote: '我们都生活在阴沟里，但仍有人仰望星空。', author: '王尔德', correct: false },
    { w: '慢慢来', quote: '要耐心对待心中尚未解决的一切，试着去爱那些问题本身。', author: '里尔克', correct: false },
    { w: '松一口气', quote: '太阳，它每时每刻都是夕阳也都是旭日。', author: '史铁生', correct: false },
    { w: '好好吃饭', quote: '四方食事，不过一碗人间烟火。', author: '汪曾祺', correct: false },
    { w: '有点想逃', quote: '我并不是要生活得更好，我是要生活得不同。', author: '毛姆', correct: false },
    { w: '有点想哭', quote: '世界以痛吻我，要我报之以歌。', author: '泰戈尔', correct: false },
    { w: '有点累', quote: '一个人能使自己成为自己，比什么都重要。', author: '伍尔夫', correct: false },
    { w: '烦躁', quote: '焦虑是自由的眩晕。', author: '克尔凯郭尔', correct: false }
  ],
  moodPrompt: '十四颗词浮在星图上，其中三颗，是给你的暗号。',
  skyPhoto: 'assets/sky.jpg',
  galleryTitle: '四次抵达',
  gallery: [
    { src: 'assets/xin1.jpg', title: '昂宿一---第一次一起过生日' },
    { src: 'assets/xin2.jpg', title: '昂宿二---去忘记烦恼吧' },
    { src: 'assets/xin3.jpg', title: '昂宿三---还想再来一次' },
    { src: 'assets/xin4.jpg', title: '昂宿四---开启新篇章' }
  ],
  math: {
    dateLabel: '观测起始历年 ·2013',
    introduction: '历年已定 接下来是这段轨道的长度',
    first: { left: 2026, operator: '-', right: 2000, answer: 26 },
    second: { left: 2013, operator: '-', right: 2001, answer: 12 },
    answer: 14,
    success: '数据核对无误。祝你后面旅途愉快'
  },
  chatImage: 'assets/liao.jpg',
  chatTitle: '两颗星的呼应，回荡飘渺宇宙',
  chatCaption: '19.11.27',
  chatQuote: '现在可没有距离咯',
  letterTitle: '旅途使用说明',
  letterParagraphs: [
    '亲爱的旅人：',
    '你好。很高兴你参与这趟行动，不知道前面的那些体验，是否让你觉得还有想要接着向前进的兴趣，如果有，那本大魔王真的很荣幸了！因为毕竟是第一次创造宇宙，第一位游客的建议还是让我内心忐忑的～',
    '那来到这个宇宙，肯定要了解一下这个宇宙的来历，名字含义是吧！那恭敬不如从命，就让本魔王简单来介绍一下吧😎！所谓Cosmos的意思就是：宇宙（好吧，其实没啥什么深故作高深的含义）。从科学上来说，宇宙的宇宙网和人的脑补神经很相似，从文学角度来说，我们DNA里的氮元素：我们牙齿里的钙元素，我们血液里的铁元素，还有我们吃掉的东西里的碳元素，都是會经大爆炸时的万千星散落后组成。照这样推，那人就是星辰，那宇宙那么大，按照那句痛苦会在庞大的东西中被稀释，那进到这个宇宙里的旅客，就可以获得：接下来的日子，痛苦少少，幸福多多（魔王可以对任何东西赋魔，所以这个就是可能实现！😈）至于后面的数字，就由后续你自己去发现（打字太多累了，我的知识水平也编不出来太多东西了👿）',
    '那么祝你后面一切顺利，也希望这个宇宙旅行让你感受到惊喜和短暂的有趣，也愿你所愿皆所得！'
  ],
  letterSignature: '很善良且牛逼的大魔王',
  letterAfterword: 'κÉŠ□ρŋ﹁¿Ã（一些外星语言，愚蠢的人类是看不懂的）',
  finaleTitle: '旅途结束…\n在这里…\n好的坏的都可以说…',
  // 生日蛋糕上方的大字；可用 \n 分行，留空时保持默认。
  birthdayBannerText: '',
  // 第九颗星的星座装饰图：射手座（点线星图，风格与默认一致）。
  zodiac: 'sagittarius',
  // 第一颗星「回响」：音乐响起约 20 秒后弹出猜歌对话框，答对解锁成就「对上频率」。
  guessSong: {
    answer: '分分钟需要你',
    prompt: '音乐响起约二十秒了。这首歌的名字是什么？',
    wrong: '再听听看～'
  },
  // 留言关键词仍触发三种特殊烟花：music→音符，stars→星形，love→爱心。
  // keepsake（礼物）不再解锁成就，只显示一句专属提示。
  achievementWords: {
    music: '音乐',
    stars: '星星',
    keepsake: '礼物',
    love: '爱'
  },
  // 第九颗星终幕：烟花计数与里程碑。
  finaleMilestones: {
    total: 26,
    arrowAt: 13,
    arrowText: '这次我和你说生日快乐',
    toastAt: 20,
    toastText: '手酸了吗，还剩六朵'
  },
  // 礼物盒里三张卡牌的正面文案（按顺序）。
  finaleCards: ['一起庆祝', '你会喜欢', '祝你发点小财']
};
