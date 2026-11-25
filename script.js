(() => {
  const C = window.XQD_CONFIG;
  if (!C) throw new Error('缺少 config.js，请确保它在 script.js 之前加载。');
  const STORAGE_KEY = 'xiaoqidian-nine-star-custom-v3';
  const defaultPalette = ['#e2c27b', '#d48678', '#8f9f91'];
  const paletteOptions = [
    { name: '琥珀金', color: '#e2c27b' },
    { name: '珊瑚红', color: '#d48678' },
    { name: '玫瑰灰', color: '#b88795' },
    { name: '鼠尾草', color: '#8f9f91' },
    { name: '青瓷绿', color: '#78a59b' },
    { name: '深夜蓝', color: '#667a9b' },
    { name: '薰衣草', color: '#998caf' },
    { name: '象牙白', color: '#d9d0b9' },
    { name: '石榴红', color: '#9c5e67' }
  ];

  const memories = [
    { id: 1, x: 49, y: 48, size: 12, ray: -7, label: C.starLabels[0], side: 'right' },
    { id: 2, x: 18, y: 25, size: 7, ray: 19, label: C.starLabels[1], side: 'right' },
    { id: 3, x: 79, y: 36, size: 6.5, ray: -22, label: C.starLabels[2], side: 'left' },
    { id: 4, x: 35, y: 75, size: 8, ray: 12, label: C.starLabels[3], side: 'right' },
    // 为左侧的编号与名称留出安全空间。
    { id: 5, x: 20, y: 58, size: 5.5, ray: -15, label: C.starLabels[4], side: 'left' },
    { id: 6, x: 67, y: 15, size: 7.5, ray: 26, label: C.starLabels[5], side: 'left' },
    { id: 7, x: 86, y: 77, size: 6.5, ray: -31, label: C.starLabels[6], side: 'left' },
    { id: 8, x: 58, y: 61, size: 9, ray: 8, label: C.starLabels[7], side: 'left' },
    { id: 9, x: 28, y: 42, size: 10, ray: -21, label: C.starLabels[8], side: 'right' }
  ];

  const progressNotes = [
    '第一颗星正在等你哦。',
    '三条新的星光小径出现了。',
    '夜空收下了第一份心意。',
    '颜色和词语都找到了位置。',
    '又有三颗星慢慢靠近。',
    '一些画面重新亮了起来。',
    '数字解开了下一段旅程。',
    '藏好的信开始出发了。',
    '最后一颗星正在信封后等待。',
    '今晚的星空，已经被你点亮。'
  ];

  // 十项成就（按问卷定制）：名称固定，图标沿用教学版内嵌图案或同风格新绘。
  const achievements = [
    { id: 1, icon: 'music', name: '对上频率', hint: '音乐响起二十秒时，猜中了它的名字。' },
    { id: 2, icon: 'star', name: '找到了', hint: '十四颗词里，三颗暗号被你看穿。' },
    { id: 3, icon: 'palette', name: '调色盘', hint: '三种颜色已经替今晚定了基调。' },
    { id: 4, icon: 'starbox', name: '星匣收藏者', hint: '你轻轻互动过那片留影。' },
    { id: 5, icon: 'brain', name: '轨道核对', hint: '数字与答案都对上了。' },
    { id: 6, icon: 'letter', name: '未说出口的话', hint: '聊天记录里藏着回声。' },
    { id: 7, icon: 'astronaut', name: '漫读宇航员', hint: '你把信读到了十四秒。' },
    { id: 8, icon: 'cake', name: '第14次', hint: '蜡烛熄灭，好事发生。' },
    { id: 9, icon: 'firework', name: '二十六', hint: '最后一朵烟花为今天升空。' },
    { id: 10, icon: 'gift', name: '三份心意', hint: '三张卡牌都翻开了。' }
  ];

  const birthdayNotes = [392,392,440,392,523.25,493.88, 392,392,440,392,587.33,523.25, 392,392,783.99,659.25,523.25,493.88,440, 698.46,698.46,659.25,523.25,587.33,523.25];
  // 终幕烟花计数与里程碑（config 可调）。
  const MILESTONES = Object.assign({ total: 26, arrowAt: 13, arrowText: '这次我和你说生日快乐', toastAt: 20, toastText: '手酸了吗，还剩六朵' }, C.finaleMilestones || {});
  const finaleCards = Array.isArray(C.finaleCards) && C.finaleCards.length >= 3 ? C.finaleCards.slice(0, 3) : ['第一张 兑换券', '第二张 你会喜欢', '第三张 祝你发一点财'];

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const phone = $('#phone');
  const starLayer = $('#starLayer');
  const progressCount = $('#progressCount');
  const progressDots = $('#progressDots');
  const progressNote = $('#progressNote');
  const memoryDialog = $('#memoryDialog');
  const memoryContent = $('#memoryContent');
  const achievementDialog = $('#achievementDialog');
  const achievementGrid = $('#achievementGrid');
  const achievementDetail = $('#achievementDetail');
  const achievementButton = $('#achievementButton');
  const achievementButtonIcon = $('span', achievementButton);
  const achievementCount = $('#achievementCount');
  const toast = $('#toast');
  const song = $('#birthdaySong');
  const birthdayMusic = $('#birthdayMusic');
  const musicIcon = $('#musicIcon');
  const skyWhisper = $('#skyWhisper');
  const letterJourney = $('#letterJourney');
  const deliveredLetter = $('#deliveredLetter');
  const journeyCaption = $('#journeyCaption');
  const letterView = $('#letterView');
  const finale = $('#finale');
  const finalSky = $('#finalSky');
  const finaleCopy = $('#finaleCopy');
  const fireworkHint = $('#fireworkHint');
  const cakeScene = $('#cakeScene');
  const cake = $('#cake');
  const blowButton = $('#blowButton');
  const launcherRow = $('#launcherRow');
  const messageBox = $('#messageBox');
  const finalMessage = $('#finalMessage');
  const finalMessageLabel = $('label', messageBox);

  const safeParse = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
  };
  const saved = safeParse();
  const state = {
    completed: new Set(Array.isArray(saved.completed) ? saved.completed : []),
    achievements: new Set(Array.isArray(saved.achievements) ? saved.achievements : []),
    keywords: Array.isArray(saved.keywords) ? saved.keywords : ['', '', ''],
    palette: Array.isArray(saved.palette) && saved.palette.length === 3 ? saved.palette : defaultPalette,
    paletteChosen: typeof saved.paletteChosen === 'boolean' ? saved.paletteChosen : (Array.isArray(saved.completed) && saved.completed.includes(3)),
    visibleSecondaries: new Set(Array.isArray(saved.visibleSecondaries) ? saved.visibleSecondaries : []),
    letterDelivered: Boolean(saved.letterDelivered),
    letterJourneyPlayed: Boolean(saved.letterJourneyPlayed || saved.letterDelivered),
    letterSeconds: Number(saved.letterSeconds || 0),
    cakeRevealed: Boolean(saved.cakeRevealed),
    candlesBlown: Boolean(saved.candlesBlown),
    candlesRelit: Boolean(saved.candlesRelit),
    launchers: Boolean(saved.launchers),
    preCakeClicks: Number(saved.preCakeClicks || 0),
    fireworkCount: Number(saved.fireworkCount || 0),
    giftBoxReady: Boolean(saved.giftBoxReady),
    giftBoxOpen: Boolean(saved.giftBoxOpen),
    cardsFlipped: Array.isArray(saved.cardsFlipped) && saved.cardsFlipped.length === 3 ? saved.cardsFlipped : [false, false, false],
    message: String(saved.message || ''),
    memoryReactions: new Set(Array.isArray(saved.memoryReactions) ? saved.memoryReactions : []),
    birthdayUserPaused: Boolean(saved.birthdayUserPaused),
    finaleVisited: Boolean(saved.finaleVisited || saved.cakeRevealed || Number(saved.preCakeClicks || 0) > 0),
  };
  if ([2,3,4].every(id => state.completed.has(id)) && state.visibleSecondaries.size === 0) [5,6,7].forEach(id => state.visibleSecondaries.add(id));

  let audioContext = null;
  let ambient = null;
  let meteorTimer = null;
  let journeyTimers = [];
  let letterEnteredAt = 0;
  let letterTimer = null;
  let finalAnimator = null;
  let autoLauncherTimer = null;
  let heartLauncherTimer = null;
  let heartLauncherEndTimer = null;
  let heartLauncherActive = false;
  let selectedLauncher = null;
  let holdTimer = null;
  let holdStart = 0;
  let holdFrame = null;
  const achievementPopupQueue = [];
  let achievementPopupActive = false;
  let activeAchievementPopup = null;
  const MOBILE_AUDIO_FALLBACK = /Android|iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  // Public teaching edition: all gift-specific content lives in config.js.
  document.title = `${C.siteTitle} · 小奇点`;
  $('#customSiteTitle').textContent = C.siteTitle;
  $('#customAuthor').textContent = `By ${C.author}`;
  $('#customWelcome').textContent = C.welcome;
  $('#customLetterTitle').textContent = C.letterTitle;
  $('#customFinaleTitle').textContent = C.finaleTitle;
  const birthdayBanner = $('#birthdayBunting > span');
  if (birthdayBanner) birthdayBanner.textContent = C.birthdayBannerText || 'HAPPY BIRTHDAY\nTO YOU';
  const letterBody = $('#letterBody');
  C.letterParagraphs.forEach(paragraph => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    letterBody.appendChild(p);
  });
  const signature = document.createElement('p');
  signature.className = 'letter-signature';
  signature.textContent = C.letterSignature;
  letterBody.appendChild(signature);
  const afterword = document.createElement('p');
  afterword.className = 'letter-afterword';
  afterword.textContent = C.letterAfterword;
  letterBody.appendChild(afterword);
  // 设置实际媒体元素的地址并显式加载，避免本地打开时仍使用 HTML 中的旧 source。
  song.src = C.mainMusic;
  birthdayMusic.src = C.birthdayMusic;
  song.load();
  birthdayMusic.load();

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({
      completed: [...state.completed], achievements: [...state.achievements], keywords: state.keywords,
      palette: state.palette, paletteChosen: state.paletteChosen, visibleSecondaries: [...state.visibleSecondaries], letterDelivered: state.letterDelivered,
      letterJourneyPlayed: state.letterJourneyPlayed, letterSeconds: state.letterSeconds, cakeRevealed: state.cakeRevealed, candlesBlown: state.candlesBlown, candlesRelit: state.candlesRelit,
      launchers: state.launchers, preCakeClicks: state.preCakeClicks, fireworkCount: state.fireworkCount,
      giftBoxReady: state.giftBoxReady, giftBoxOpen: state.giftBoxOpen, cardsFlipped: [...state.cardsFlipped],
      message: state.message, memoryReactions: [...state.memoryReactions], birthdayUserPaused: state.birthdayUserPaused, finaleVisited: state.finaleVisited
    })); } catch {}
  }

  function applyPalette() {
    state.palette.forEach((color, i) => phone.style.setProperty(`--palette-${i + 1}`, color));
  }

  function ensureAudio() {
    if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === 'suspended') void audioContext.resume().catch(() => {});
    phone.classList.add('sound-awake');
    return audioContext;
  }

  function playTone(frequency, duration = .32, delay = 0, gain = .018, type = 'sine') {
    const ctx = ensureAudio();
    const osc = ctx.createOscillator();
    const vol = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
    vol.gain.setValueAtTime(.0001, ctx.currentTime + delay);
    vol.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + delay + .025);
    vol.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + delay + duration);
    osc.connect(vol).connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration + .06);
  }

  function playPianoTone(frequency) {
    const ctx = ensureAudio();
    const now = ctx.currentTime;
    const master = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(4200, now);
    filter.frequency.exponentialRampToValueAtTime(1700, now + 1.35);
    master.gain.setValueAtTime(.0001, now);
    master.gain.exponentialRampToValueAtTime(.135, now + .012);
    master.gain.exponentialRampToValueAtTime(.046, now + .26);
    master.gain.exponentialRampToValueAtTime(.0001, now + 1.32);
    master.connect(filter).connect(ctx.destination);
    [
      { ratio: 1, gain: 1 },
      { ratio: 2.01, gain: .26 },
      { ratio: 3.99, gain: .11 }
    ].forEach(({ ratio, gain }) => {
      const osc = ctx.createOscillator();
      const partial = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency * ratio, now);
      osc.detune.setValueAtTime((Math.random() - .5) * 4, now);
      partial.gain.value = gain;
      osc.connect(partial).connect(master);
      osc.start(now);
      osc.stop(now + 1.42);
    });
  }

  function playCheer() {
    const ctx = ensureAudio();
    const now = ctx.currentTime;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 1.45), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      const t = i / data.length;
      const envelope = Math.sin(Math.PI * Math.min(1, t * 1.2)) * Math.pow(1 - t, .35);
      data[i] = (Math.random() * 2 - 1) * envelope * .55;
    }
    const source = ctx.createBufferSource();
    const band = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = buffer;
    band.type = 'bandpass';
    band.frequency.setValueAtTime(1250, now);
    band.Q.value = .55;
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.045, now + .08);
    gain.gain.exponentialRampToValueAtTime(.0001, now + 1.4);
    source.connect(band).connect(gain).connect(ctx.destination);
    source.start(now);
    [659.25, 783.99, 987.77].forEach((frequency, index) => playTone(frequency, .52 + index * .12, index * .08, .008, 'triangle'));
  }


  const MAIN_VOLUME = .72;
  const MAIN_FINALE_VOLUME = .34;
  const BIRTHDAY_VOLUME = .82;
  const audioFadeJobs = new WeakMap();
  let musicTransitionId = 0;
  // 本地 file:// 音乐可能因 MediaElementSource 的跨源限制被静音。
  // 本地预览和移动端使用原生播放；HTTP(S) 桌面端保留原来的混音淡入淡出。
  const LOCAL_FILE_AUDIO_FALLBACK = window.location.protocol === 'file:';
  let musicGraphMode = (MOBILE_AUDIO_FALLBACK || LOCAL_FILE_AUDIO_FALLBACK) ? 'instant' : 'pending';
  let songSourceNode = null;
  let birthdaySourceNode = null;
  let songGainNode = null;
  let birthdayGainNode = null;

  function ensureMusicGraph() {
    if (musicGraphMode === 'webaudio') {
      ensureAudio();
      return musicGraphMode;
    }
    if (musicGraphMode === 'instant') return musicGraphMode;
    if (!(window.AudioContext || window.webkitAudioContext)) {
      musicGraphMode = 'instant';
      return musicGraphMode;
    }
    try {
      const ctx = ensureAudio();
      songSourceNode = ctx.createMediaElementSource(song);
      birthdaySourceNode = ctx.createMediaElementSource(birthdayMusic);
      songGainNode = ctx.createGain();
      birthdayGainNode = ctx.createGain();
      songGainNode.gain.setValueAtTime(0, ctx.currentTime);
      birthdayGainNode.gain.setValueAtTime(0, ctx.currentTime);
      songSourceNode.connect(songGainNode).connect(ctx.destination);
      birthdaySourceNode.connect(birthdayGainNode).connect(ctx.destination);
      // iOS Safari does not always apply frequent HTMLMediaElement.volume
      // updates smoothly. Keep both elements at unity and perform every fade on
      // the audio-rendering thread through GainNodes instead.
      song.volume = 1;
      birthdayMusic.volume = 1;
      musicGraphMode = 'webaudio';
    } catch (error) {
      console.warn('Web Audio music graph unavailable; using instant music changes.', error);
      musicGraphMode = 'instant';
    }
    return musicGraphMode;
  }

  function gainNodeFor(element) {
    if (element === song) return songGainNode;
    if (element === birthdayMusic) return birthdayGainNode;
    return null;
  }

  function holdGainAtCurrentValue(node, now) {
    if (!node) return;
    const param = node.gain;
    try {
      if (typeof param.cancelAndHoldAtTime === 'function') {
        param.cancelAndHoldAtTime(now);
      } else {
        const current = param.value;
        param.cancelScheduledValues(now);
        param.setValueAtTime(current, now);
      }
    } catch {
      const current = param.value;
      try { param.cancelScheduledValues(now); } catch {}
      try { param.setValueAtTime(current, now); } catch {}
    }
  }

  function setMusicLevelImmediately(element, level) {
    const target = Math.max(0, Math.min(1, level));
    const mode = ensureMusicGraph();
    if (mode === 'webaudio') {
      const node = gainNodeFor(element);
      const now = audioContext.currentTime;
      holdGainAtCurrentValue(node, now);
      node.gain.setValueAtTime(target, now);
    } else {
      try { element.volume = target; } catch {}
    }
  }

  function cancelAudioFade(element) {
    const job = audioFadeJobs.get(element);
    if (job) {
      clearTimeout(job.timer);
      audioFadeJobs.delete(element);
      job.resolve(false);
    }
    if (musicGraphMode === 'webaudio' && audioContext) {
      const node = gainNodeFor(element);
      if (node) holdGainAtCurrentValue(node, audioContext.currentTime);
    }
  }

  function fadeAudio(element, targetVolume, duration = 1800, pauseAfter = false) {
    if (!element) return Promise.resolve(false);
    const target = Math.max(0, Math.min(1, targetVolume));
    const mode = ensureMusicGraph();
    cancelAudioFade(element);

    // Safe fallback for engines where a media-element Web Audio graph cannot be
    // created. Instant changes are preferable to a delayed abrupt jump.
    if (mode !== 'webaudio') {
      try { element.volume = target; } catch {}
      if (pauseAfter && target <= .001 && !element.paused) element.pause();
      return Promise.resolve(true);
    }

    const node = gainNodeFor(element);
    const seconds = Math.max(0, duration) / 1000;
    const now = audioContext.currentTime;
    holdGainAtCurrentValue(node, now);
    if (seconds <= .01) {
      node.gain.setValueAtTime(target, now);
      if (pauseAfter && target <= .001 && !element.paused) element.pause();
      return Promise.resolve(true);
    }

    // Schedule the ramp on the audio thread. This stays smooth on mobile even
    // when requestAnimationFrame or JavaScript timers are throttled.
    node.gain.linearRampToValueAtTime(target, now + seconds);
    return new Promise(resolve => {
      const job = {
        timer: setTimeout(() => {
          audioFadeJobs.delete(element);
          if (musicGraphMode === 'webaudio' && audioContext) {
            const endNow = audioContext.currentTime;
            holdGainAtCurrentValue(node, endNow);
            node.gain.setValueAtTime(target, endNow);
          }
          if (pauseAfter && target <= .001 && !element.paused) element.pause();
          resolve(true);
        }, Math.max(20, duration + 60)),
        resolve
      };
      audioFadeJobs.set(element, job);
    });
  }

  async function fadeOutAndPause(element, duration = 1900) {
    if (!element) return false;
    ensureMusicGraph();
    if (element.paused) {
      cancelAudioFade(element);
      setMusicLevelImmediately(element, 0);
      return true;
    }
    return fadeAudio(element, 0, duration, true);
  }

  async function fadeInAndPlay(element, targetVolume, duration = 2400, options = {}) {
    const { restart = false, errorMessage = '音乐加载失败，请轻触右上角的 ♪ 重试' } = options;
    ensureMusicGraph();
    cancelAudioFade(element);
    if (restart) {
      try { element.currentTime = 0; } catch {}
    }
    if (element.paused) {
      setMusicLevelImmediately(element, 0);
      try {
        await element.play();
      } catch {
        showToast(errorMessage);
        return false;
      }
    }
    return fadeAudio(element, targetVolume, duration, false);
  }

  function beginMusicTransition() {
    musicTransitionId += 1;
    cancelAudioFade(song);
    cancelAudioFade(birthdayMusic);
    return musicTransitionId;
  }

  function isCurrentMusicTransition(id) {
    return id === musicTransitionId;
  }

  async function transitionToTrack(target, options = {}) {
    const {
      restart = false,
      targetVolume = target === song ? MAIN_VOLUME : BIRTHDAY_VOLUME,
      fadeOutDuration = 2000,
      fadeInDuration = 2500,
      errorMessage = target === song
        ? '轻触右上角的 ♪ 即可播放背景音乐'
        : '轻触右上角的 ♪ 即可播放生日歌'
    } = options;
    stopAmbient();
    const mode = ensureMusicGraph();
    const id = beginMusicTransition();
    const other = target === song ? birthdayMusic : song;
    const targetWasPaused = target.paused;

    // Mobile browsers use native media playback for reliability. Volume
    // automation is not consistently supported there, so switch tracks directly instead of
    // routing them through a Web Audio MediaElementSource that may go silent.
    if (mode === 'instant') {
      if (!other.paused) other.pause();
      if (restart) {
        try { target.currentTime = 0; } catch {}
      }
      try { target.volume = targetVolume; } catch {}
      try {
        await target.play();
        return isCurrentMusicTransition(id);
      } catch {
        showToast(errorMessage);
        return false;
      }
    }

    // Start the requested media element while the originating click/tap still
    // owns browser user activation. Waiting for the outgoing fade first causes
    // first-visit playback to be rejected by mobile autoplay policies.
    if (restart && targetWasPaused) {
      try { target.currentTime = 0; } catch {}
    }
    if (targetWasPaused) {
      setMusicLevelImmediately(target, 0);
      try {
        await target.play();
      } catch {
        showToast(errorMessage);
        return false;
      }
    }

    // Song changes are always sequential: the previous song reaches true
    // silence and pauses before the next song starts its fade-in.
    if (!other.paused) {
      await fadeOutAndPause(other, fadeOutDuration);
    }
    if (!isCurrentMusicTransition(id)) return false;

    if (restart && !targetWasPaused && !target.paused) await fadeOutAndPause(target, fadeOutDuration);
    if (!isCurrentMusicTransition(id)) return false;

    if (restart && !targetWasPaused) {
      try { target.currentTime = 0; } catch {}
    }

    return fadeInAndPlay(target, targetVolume, fadeInDuration, {
      restart: false,
      errorMessage
    });
  }

  async function transitionToSilence(options = {}) {
    const {
      mainDuration = 2200,
      birthdayDuration = 2000,
      includeMain = true,
      includeBirthday = true
    } = options;
    stopAmbient();
    ensureMusicGraph();
    const id = beginMusicTransition();
    const fades = [];
    if (includeMain) fades.push(fadeOutAndPause(song, mainDuration));
    if (includeBirthday) fades.push(fadeOutAndPause(birthdayMusic, birthdayDuration));
    await Promise.all(fades);
    return isCurrentMusicTransition(id);
  }

  function transitionToMain(options = {}) {
    return transitionToTrack(song, {
      targetVolume: options.targetVolume ?? MAIN_VOLUME,
      restart: Boolean(options.restart),
      fadeOutDuration: options.fadeOutDuration ?? 2100,
      fadeInDuration: options.fadeInDuration ?? 2600,
      errorMessage: '轻触右上角的 ♪ 即可播放背景音乐'
    });
  }

  function transitionToBirthday(options = {}) {
    return transitionToTrack(birthdayMusic, {
      targetVolume: BIRTHDAY_VOLUME,
      restart: Boolean(options.restart),
      fadeOutDuration: options.fadeOutDuration ?? 2100,
      fadeInDuration: options.fadeInDuration ?? 2600,
      errorMessage: '轻触右上角的 ♪ 即可播放生日歌'
    });
  }

  function startAmbient() {
    if (ambient || state.completed.has(1) || phone.classList.contains('scene-open')) return;
    const ctx = ensureAudio();
    const master = ctx.createGain();
    master.gain.setValueAtTime(.0001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(.018, ctx.currentTime + 1.8);
    master.connect(ctx.destination);
    const oscillators = [130.81, 196, 261.63].map((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = index === 1 ? 'triangle' : 'sine';
      osc.frequency.value = freq;
      gain.gain.value = index === 0 ? .45 : .18;
      osc.connect(gain).connect(master);
      osc.start();
      return osc;
    });
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = .075;
    lfoGain.gain.value = .006;
    lfo.connect(lfoGain).connect(master.gain);
    lfo.start();
    ambient = { master, oscillators, lfo };
    musicIcon.textContent = 'Ⅱ';
  }

  function stopAmbient() {
    if (!ambient || !audioContext) return;
    const now = audioContext.currentTime;
    ambient.master.gain.cancelScheduledValues(now);
    ambient.master.gain.setValueAtTime(Math.max(.0001, ambient.master.gain.value), now);
    ambient.master.gain.exponentialRampToValueAtTime(.0001, now + .8);
    const current = ambient;
    setTimeout(() => {
      current.oscillators.forEach(o => { try { o.stop(); } catch {} });
      try { current.lfo.stop(); } catch {}
    }, 900);
    ambient = null;
  }

  function startMainSong(options = {}) {
    return transitionToMain({
      restart: Boolean(options.restart),
      targetVolume: options.targetVolume ?? (finale.classList.contains('is-visible') ? MAIN_FINALE_VOLUME : MAIN_VOLUME),
      fadeOutDuration: options.fadeOutDuration,
      fadeInDuration: options.fadeInDuration
    });
  }

  async function startMainSongImmediately(options = {}) {
    // The first music-star awakening is the single intentional exception to the
    // site's fade-in rule: the song begins at its normal level immediately.
    stopAmbient();
    ensureMusicGraph();
    beginMusicTransition();
    cancelAudioFade(song);
    cancelAudioFade(birthdayMusic);
    if (!birthdayMusic.paused) birthdayMusic.pause();
    setMusicLevelImmediately(birthdayMusic, 0);
    if (options.restart) {
      try { song.currentTime = 0; } catch {}
    }
    setMusicLevelImmediately(song, options.targetVolume ?? MAIN_VOLUME);
    try {
      await song.play();
      scheduleGuessSong();
      return true;
    } catch {
      showToast('轻触右上角的 ♪ 即可播放背景音乐');
      return false;
    }
  }

  // 成就「对上频率」：主音乐开始约 20 秒后弹出猜歌对话框，答对解锁。
  // 采用 3 秒轮询而非一次性定时器：被其他弹层或场景挡住时持续重试，不会错过。
  let guessSongTimer = null;
  let guessSongMusicAt = 0;
  function scheduleGuessSong() {
    if (state.achievements.has(1) || !state.completed.has(1)) return;
    if (!guessSongMusicAt) guessSongMusicAt = Date.now();
    if (guessSongTimer) clearInterval(guessSongTimer);
    guessSongTimer = setInterval(() => {
      if (state.achievements.has(1)) { clearInterval(guessSongTimer); guessSongTimer = null; return; }
      if (Date.now() - guessSongMusicAt < 20000) return;
      if (memoryDialog.open || phone.classList.contains('scene-open')) return;
      openGuessSong();
      // 只有确认弹开才停止轮询，失败则下一轮继续。
      if (memoryDialog.open) { clearInterval(guessSongTimer); guessSongTimer = null; }
    }, 3000);
  }

  function openGuessSong() {
    showDialog(`<article><p class="memory-index">01 · 回响</p><h3>猜一猜这首歌</h3>
      <p>${escapeHtml((C.guessSong && C.guessSong.prompt) || '这首歌的名字是什么？')}</p>
      <div class="keyword-grid"><input class="keyword-input" id="guessSongInput" maxlength="30" placeholder="- SONG NAME -" autocomplete="off" /></div>
      <button class="action-button" id="guessSongSubmit">告诉夜空</button></article>`, () => {
      const input = $('#guessSongInput');
      const submit = () => {
        const value = input.value.trim();
        if (!value) return;
        const answer = String((C.guessSong && C.guessSong.answer) || '');
        if (answer && (value.includes(answer) || answer.includes(value))) {
          unlockAchievement(1);
          showToast('对上频率了！');
          closeDialog();
        } else {
          showToast((C.guessSong && C.guessSong.wrong) || '再听听看～');
          input.value = '';
          input.focus();
        }
      };
      $('#guessSongSubmit').addEventListener('click', submit);
      input.addEventListener('keydown', event => {
        if (event.key === 'Enter' && !event.isComposing) { event.preventDefault(); submit(); }
      });
      // 未答对就关闭时重置 20 秒时钟，之后轮询会再次弹出。
      memoryDialog.addEventListener('close', function onGuessClose() {
        memoryDialog.removeEventListener('close', onGuessClose);
        if (!state.achievements.has(1)) { guessSongMusicAt = Date.now(); scheduleGuessSong(); }
      });
      setTimeout(() => { try { input.focus(); } catch {} }, 350);
    });
  }

  function startBirthdayMusic(restart = false) {
    state.birthdayUserPaused = false;
    persist();
    return transitionToBirthday({ restart });
  }

  function toggleMusic() {
    if (finale.classList.contains('cake-mode') && state.cakeRevealed) {
      if (birthdayMusic.paused) {
        state.birthdayUserPaused = false;
        persist();
        void transitionToBirthday({ restart: false, fadeInDuration: 2200 });
      } else {
        state.birthdayUserPaused = true;
        persist();
        void transitionToSilence({ includeMain: false, birthdayDuration: 1700 });
      }
      return;
    }
    if (state.completed.has(1)) {
      if (song.paused) {
        scheduleGuessSong();
        void transitionToMain({
          targetVolume: finale.classList.contains('is-visible') ? MAIN_FINALE_VOLUME : MAIN_VOLUME,
          fadeInDuration: 2200
        });
      } else {
        void transitionToSilence({ includeBirthday: false, mainDuration: 1700 });
      }
    } else if (ambient) {
      stopAmbient();
      musicIcon.textContent = '♪';
    } else startAmbient();
  }

  function createStars() {
    starLayer.innerHTML = '';
    memories.forEach((memory, index) => {
      const button = document.createElement('button');
      button.className = 'star-node concealed';
      button.dataset.id = memory.id;
      button.dataset.side = memory.side;
      button.style.left = `${memory.x}%`;
      button.style.top = `${memory.y}%`;
      button.style.setProperty('--size', `${memory.size}px`);
      button.style.setProperty('--ray-angle', `${memory.ray}deg`);
      button.style.setProperty('--breath-delay', `${-(index * .61 + .25)}s`);
      button.style.setProperty('--breath-duration', `${4.1 + (index % 4) * .42}s`);
      button.innerHTML = `<span class="star-index">${String(memory.id).padStart(2, '0')} ${escapeHtml(memory.label)}</span>`;
      button.setAttribute('aria-label', `第${memory.id}颗星：${memory.label}`);
      button.addEventListener('click', () => handleStar(memory, button));
      starLayer.appendChild(button);
    });
  }

  function createProgressDots() {
    progressDots.innerHTML = '';
    memories.forEach(() => progressDots.appendChild(document.createElement('span')));
  }

  function isVisible(id) {
    if (id === 1) return true;
    if ([2,3,4].includes(id)) return state.completed.has(1);
    if ([5,6,7].includes(id)) return state.visibleSecondaries.has(id) || state.completed.has(id);
    if (id === 8) return [5,6,7].every(n => state.completed.has(n));
    if (id === 9) return state.letterDelivered;
    return false;
  }

  function isAvailable(id) {
    if (!isVisible(id)) return false;
    if (id === 1) return true;
    if ([2,3,4].includes(id)) return state.completed.has(1);
    if ([5,6,7].includes(id)) return [2,3,4].every(n => state.completed.has(n));
    if (id === 8) return [5,6,7].every(n => state.completed.has(n));
    if (id === 9) return state.letterDelivered;
    return false;
  }

  function updateState() {
    phone.classList.toggle('is-started', state.completed.has(1));
    phone.classList.toggle('has-achievement', state.achievements.size > 0);
    memories.forEach(memory => {
      const node = $(`.star-node[data-id="${memory.id}"]`);
      const visible = isVisible(memory.id);
      node.classList.toggle('visible', visible);
      node.classList.toggle('concealed', !visible);
      node.classList.toggle('lit', state.completed.has(memory.id));
      node.classList.toggle('available', visible && !state.completed.has(memory.id) && isAvailable(memory.id));
      node.disabled = !visible || !isAvailable(memory.id);
    });
    progressCount.textContent = state.completed.size;
    [...progressDots.children].forEach((dot, index) => dot.classList.toggle('on', index < state.completed.size));
    progressNote.textContent = progressNotes[Math.min(state.completed.size, 9)];
    achievementCount.textContent = state.achievements.size;
    const allTenUnlocked = state.achievements.size === 10;
    achievementButton.classList.toggle('all-complete', allTenUnlocked);
    achievementButtonIcon.textContent = allTenUnlocked ? '✧' : '✦';
    const achievementTitle = $('#achievementTitle');
    if (achievementTitle) achievementTitle.textContent = '夜空里的十个秘密';
    if (finalMessage) finalMessage.placeholder = '写一句留给星空的话…';
    if (finalMessageLabel) finalMessageLabel.textContent = allTenUnlocked
      ? '今天的星空已经很完整了。'
      : '写一句留给星空的话';
    if (messageBox) messageBox.classList.toggle('all-secrets', allTenUnlocked);
    renderAchievementGrid();
    persist();
  }

  function createRipple(node) {
    const ripple = document.createElement('span');
    ripple.className = 'star-ripple';
    node.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1700);
  }

  function playUnlock(id) {
    const notes = [392,440,493.88,523.25,587.33,659.25,698.46,783.99,880];
    playTone(notes[id - 1], .38, 0, .018);
    playTone(notes[id - 1] * 1.5, .42, .07, .009);
  }

  function completeStar(id, node = $(`.star-node[data-id="${id}"]`)) {
    if (state.completed.has(id)) return false;
    state.completed.add(id);
    if (node) createRipple(node);
    playUnlock(id);
    updateState();
    if ([2,3,4].every(n => state.completed.has(n))) revealSecondaryStars();
    if ([1,4,7].includes(id)) setTimeout(createShootingStar, 450);
    return true;
  }

  function revealSecondaryStars() {
    [5,6,7].forEach((id, i) => {
      if (state.visibleSecondaries.has(id)) return;
      setTimeout(() => {
        state.visibleSecondaries.add(id);
        updateState();
        const node = $(`.star-node[data-id="${id}"]`);
        if (node) createRipple(node);
      }, 650 + i * 760);
    });
  }

  function handleStar(memory, node) {
    if (!isAvailable(memory.id)) return;
    if (memory.id === 1) {
      completeStar(1, node);
      void startMainSongImmediately({ restart: true });
      return;
    }
    if (memory.id === 2) return openMoodCloud();
    if (memory.id === 3) return openPalette();
    if (memory.id === 4) return openSunset();
    if (memory.id === 5) { completeStar(5, node); return openMemory2018(); }
    if (memory.id === 6) return openMath();
    if (memory.id === 7) { completeStar(7, node); return openLyrics(); }
    if (memory.id === 8) return showLetterJourney();
    if (memory.id === 9) { completeStar(9, node); return showFinale(); }
  }

  function showDialog(html, afterOpen) {
    memoryContent.innerHTML = html;
    memoryDialog.showModal();
    if (afterOpen) afterOpen();
  }

  function closeDialog() { if (memoryDialog.open) memoryDialog.close(); }

  // 第二星「心光」：点任意词，居中浮现对应句子（面板模糊隐去，点任意处返回）；
  // 三颗暗号选对后依次浮现三句话，再点一次金色粒子消散，最后浮现结语。
  function openMoodCloud() {
    const words = Array.isArray(C.moodWords) ? C.moodWords : [];
    if (!words.length) { completeStar(2); return; }
    const picked = state.keywords.filter(Boolean);
    const done = state.completed.has(2);
    const quoteOf = w => words.find(entry => entry.w === w);
    const mergeLines = list => list.map(w => {
      const item = quoteOf(w);
      return item ? `<span class="merge-line">${escapeHtml(item.quote)}<i>—— ${escapeHtml(item.author)}</i></span>` : '';
    }).join('');
    const finalBlock = `<div class="word-final"><p class="final-line">尽力是逆熵的光，</p><p class="final-line">值得宇宙循光回赠幸福。</p></div>`;
    showDialog(`
      <article><p class="memory-index">02 · 心光</p><h3>十四颗词，三颗暗号</h3>
      <p>${escapeHtml(C.moodPrompt)}</p>
      <p class="word-count">${Math.min(picked.length, 3)} / 3</p>
      <div class="mood-cloud">${words.map((item, i) => {
        const isPicked = picked.includes(item.w);
        const lit = done || isPicked;
        return `<button type="button" class="mood-word${lit ? ' picked' : ''}" data-word="${escapeHtml(item.w)}" style="font-size:${13 + (i % 4) * 2}px;opacity:${lit ? 1 : .55 + (i % 3) * .15}" ${lit ? 'disabled' : ''}>${escapeHtml(item.w)}</button>`;
      }).join('')}</div>
      ${done ? `<div class="word-merge static">${mergeLines(picked)}</div>${finalBlock}` : ''}
      </article>`, () => {
        if (done) return;
        $$('.mood-word', memoryContent).forEach(button => button.addEventListener('click', () => {
          const word = button.dataset.word;
          const item = quoteOf(word);
          if (!item || picked.includes(word)) return;
          if (item.correct) {
            // 正确的词直接选中，不浮现句子。
            picked.push(word);
            button.classList.add('picked');
            button.disabled = true;
            const counter = $('.word-count', memoryContent);
            if (counter) counter.textContent = `${Math.min(picked.length, 3)} / 3`;
            playTone(523.25 + picked.length * 110, .3, 0, .014);
            if (picked.length >= 3) {
              state.keywords = picked.slice(0, 3);
              completeStar(2);
              unlockAchievement(2);
              persist();
              setTimeout(() => showMergeSequence(picked), 900);
            }
          } else {
            showWordFocus(item);
          }
        }));
      });
  }

  function showWordFocus(item) {
    $('.word-focus', memoryContent)?.remove();
    const el = document.createElement('div');
    el.className = 'word-focus';
    el.innerHTML = `<div class="word-focus-card"><p class="word-focus-text">${escapeHtml(item.quote)}</p><p class="word-focus-author">—— ${escapeHtml(item.author)}</p><p class="word-focus-hint">点任意处返回</p></div>`;
    memoryContent.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
    el.addEventListener('click', () => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 450);
    });
  }

  function showMergeSequence(picked) {
    if (!$('.mood-cloud', memoryContent)) return;
    $('.word-focus', memoryContent)?.remove();
    const words = Array.isArray(C.moodWords) ? C.moodWords : [];
    const overlay = document.createElement('div');
    overlay.className = 'word-stage';
    overlay.dataset.phase = 'lines';
    overlay.innerHTML = `
      <div class="word-stage-lines">${picked.map(w => {
        const item = words.find(entry => entry.w === w);
        return item ? `<span class="merge-line">${escapeHtml(item.quote)}<i>—— ${escapeHtml(item.author)}</i></span>` : '';
      }).join('')}</div>
      <div class="word-stage-final" hidden>
        <p class="final-line">尽力是逆熵的光，</p>
        <p class="final-line">值得宇宙循光回赠幸福。</p>
      </div>`;
    memoryContent.appendChild(overlay);
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('show')));
    overlay.addEventListener('click', () => {
      if (overlay.dataset.phase !== 'lines') return;
      overlay.dataset.phase = 'dissolve';
      const lines = $$('.merge-line', overlay);
      const layer = document.createElement('div');
      layer.className = 'gold-particles';
      overlay.appendChild(layer);
      const base = overlay.getBoundingClientRect();
      lines.forEach(line => {
        const r = line.getBoundingClientRect();
        for (let i = 0; i < 16; i += 1) {
          const p = document.createElement('i');
          p.className = 'gold-particle';
          p.style.left = `${r.left - base.left + Math.random() * r.width}px`;
          p.style.top = `${r.top - base.top + Math.random() * r.height}px`;
          layer.appendChild(p);
          const dx = (Math.random() - .5) * 170;
          const dy = -50 - Math.random() * 130;
          p.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${dx}px,${dy}px) scale(.15)`, opacity: 0 }
          ], { duration: 950 + Math.random() * 550, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' });
        }
        line.style.transition = 'opacity .55s ease, filter .55s ease';
        line.style.opacity = '0';
        line.style.filter = 'blur(4px)';
      });
      setTimeout(() => {
        const linesBox = $('.word-stage-lines', overlay);
        if (linesBox) linesBox.remove();
        layer.remove();
        const final = $('.word-stage-final', overlay);
        if (final) {
          final.hidden = false;
          final.classList.add('show-final');
          for (let i = 0; i < 18; i += 1) {
            const s = document.createElement('i');
            s.className = 'final-sparkle';
            s.style.left = `${Math.random() * 100}%`;
            s.style.top = `${Math.random() * 100}%`;
            s.style.setProperty('--drift-x', `${(Math.random() - .5) * 48}px`);
            s.style.animationDelay = `${Math.random() * 2.6}s`;
            final.appendChild(s);
          }
        }
      }, 1150);
    });
  }

  function openPalette() {
    // Keep a safe default palette in the background, but do not visually preselect it
    // until the visitor has explicitly saved their own three colors.
    let selected = state.paletteChosen ? [...state.palette] : [];
    showDialog(`
      <article><p class="memory-index">03 · 光谱</p><h3>为今晚选三种颜色</h3>
      <p>从九种颜色里选出此刻最喜欢的三种，组成今晚的调色盘吧。</p>
      <div class="palette-grid">${paletteOptions.map(item => `<button class="palette-swatch ${selected.includes(item.color) ? 'selected' : ''}" style="--swatch:${item.color}" data-color="${item.color}" type="button"><span>${item.name}</span></button>`).join('')}</div>
      <p class="small-note" id="paletteCount">已选择 ${selected.length} / 3</p>
      <button class="action-button" id="savePalette" ${selected.length === 3 ? '' : 'disabled'}>保存我的颜色</button></article>`, () => {
        const update = () => {
          $$('.palette-swatch').forEach(btn => btn.classList.toggle('selected', selected.includes(btn.dataset.color)));
          $('#paletteCount').textContent = `已选择 ${selected.length} / 3`;
          $('#savePalette').disabled = selected.length !== 3;
        };
        $$('.palette-swatch').forEach(btn => btn.addEventListener('click', () => {
          const color = btn.dataset.color;
          if (selected.includes(color)) selected = selected.filter(c => c !== color);
          else if (selected.length < 3) selected.push(color);
          else { selected.shift(); selected.push(color); }
          update();
        }));
        $('#savePalette').addEventListener('click', () => {
          state.palette = selected;
          state.paletteChosen = true;
          applyPalette();
          completeStar(3);
          unlockAchievement(3);
          persist();
          showToast('三种颜色已经被夜空收好。');
          closeDialog();
        });
      });
  }

  function openSunset() {
    showDialog(`
      <article><p class="memory-index">04 · 共天</p><h3>把两片天空连在一起</h3>
      <p>放进你的天空，世界会变小一点。</p>
      <div class="sunset-compare">
        <figure class="sunset-card"><img id="sampleSunset" src="${escapeHtml(C.skyPhoto)}" alt="示例天空"/><figcaption>我的天空</figcaption></figure>
        <figure class="sunset-card"><label class="sunset-upload" id="sunsetUpload"><span>＋<br/>选择你的天空</span><input id="sunsetFile" type="file" accept="image/*"/></label><img id="guestSunset" alt="你上传的天空" hidden/><figcaption>你的天空</figcaption></figure>
      </div>
      <div class="sunset-fusion" id="sunsetFusion" hidden>
        <canvas id="fusionCanvas" aria-label="两张天空融合生成的新图片"></canvas>
        <p>我们的天空</p>
      </div>
      <p class="compare-result" id="compareResult"></p>
      <button class="action-button" id="fuseSunsets" disabled>让两片天空相遇</button>
      <button class="action-button" id="keepFusion" hidden>收好这片天空</button>
      <button class="action-button secondary-button" id="skipSunset">把位置留给下一片天空</button>
      <p class="small-note">照片只属于这个夜晚，不会上传，也不会被保存。</p></article>`, () => {
        let guestUrl = '';
        $('#sunsetFile').addEventListener('change', event => {
          const file = event.target.files?.[0];
          if (!file) return;
          if (guestUrl) URL.revokeObjectURL(guestUrl);
          guestUrl = URL.createObjectURL(file);
          const img = $('#guestSunset');
          img.src = guestUrl; img.hidden = false; $('#sunsetUpload').hidden = true;
          $('#fuseSunsets').disabled = false;
          $('#sunsetFusion').hidden = true;
          $('#keepFusion').hidden = true;
        });
        $('#fuseSunsets').addEventListener('click', async () => {
          const result = $('#compareResult');
          result.textContent = '小小的融合引擎正在重新铺开云层……';
          $('#fuseSunsets').disabled = true;
          try {
            await fuseSunsetImages(C.skyPhoto, $('#guestSunset').src, $('#fusionCanvas'));
            $('#sunsetFusion').hidden = false;
            $('#keepFusion').hidden = false;
            result.textContent = '这是只属于这一晚的天空。';
          } catch (error) {
            console.error(error);
            result.textContent = '云层刚刚走神了，请重新选择一张照片再试。';
            $('#fuseSunsets').disabled = false;
          }
        });
        $('#keepFusion').addEventListener('click', () => {
          completeStar(4);
          showToast('新的平行世界已经被夜空记住。');
          closeDialog();
        });
        $('#skipSunset').addEventListener('click', () => {
          completeStar(4);
          showToast('这里先留给下一片天空。');
          closeDialog();
        });
      });
  }

  function loadImageSource(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  function drawCoverImage(ctx, image, width, height) {
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const sw = width / scale, sh = height / scale;
    const sx = (image.naturalWidth - sw) / 2, sy = (image.naturalHeight - sh) / 2;
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, width, height);
  }

  async function fuseSunsetImages(firstSrc, secondSrc, canvas) {
    const [first, second] = await Promise.all([loadImageSource(firstSrc), loadImageSource(secondSrc)]);
    const width = 720, height = 900;
    const a = document.createElement('canvas'), b = document.createElement('canvas');
    a.width = b.width = width; a.height = b.height = height;
    const actx = a.getContext('2d', { willReadFrequently: true });
    const bctx = b.getContext('2d', { willReadFrequently: true });
    drawCoverImage(actx, first, width, height);
    drawCoverImage(bctx, second, width, height);
    const ad = actx.getImageData(0,0,width,height);
    const bd = bctx.getImageData(0,0,width,height);
    const out = new ImageData(width,height);
    for (let y=0; y<height; y++) {
      const vertical = y / height;
      for (let x=0; x<width; x++) {
        const i = (y*width+x)*4;
        const wave = Math.sin(x*.018 + y*.007) * .055 + Math.sin(x*.004-y*.011)*.035;
        const diagonal = (x/width - .5) * .12;
        let mix = .5 + (vertical-.5)*.22 + wave + diagonal;
        const ar=ad.data[i], ag=ad.data[i+1], ab=ad.data[i+2];
        const br=bd.data[i], bg=bd.data[i+1], bb=bd.data[i+2];
        const al=.2126*ar+.7152*ag+.0722*ab, bl=.2126*br+.7152*bg+.0722*bb;
        mix += (bl-al)/255*.08;
        mix = Math.max(.18,Math.min(.82,mix));
        const screenR = 255-(255-ar)*(255-br)/255;
        const screenG = 255-(255-ag)*(255-bg)/255;
        const screenB = 255-(255-ab)*(255-bb)/255;
        const glow = .10 + Math.max(0,.55-Math.abs(vertical-.58))*.08;
        out.data[i]   = Math.min(255, ar*(1-mix)+br*mix + screenR*glow);
        out.data[i+1] = Math.min(255, ag*(1-mix)+bg*mix + screenG*glow*.72);
        out.data[i+2] = Math.min(255, ab*(1-mix)+bb*mix + screenB*glow*.82);
        out.data[i+3] = 255;
      }
    }
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(out,0,0);
    const grad = ctx.createLinearGradient(0,0,0,height);
    grad.addColorStop(0,'rgba(115,90,150,.08)');
    grad.addColorStop(.55,'rgba(255,113,86,.06)');
    grad.addColorStop(1,'rgba(15,12,22,.12)');
    ctx.fillStyle=grad; ctx.fillRect(0,0,width,height);
  }

  function memoryReactionIcon(type) {
    const icons = {
      like: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 21 23 9c1-3 5-2 5 2v8h8c4 0 6 3 5 7l-3 11H18Z"/><path d="M8 21h10v17H8Z"/></svg>`,
      favorite: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="m24 7 5.2 10.5L41 19.2l-8.5 8.3 2 11.7L24 33.7l-10.5 5.5 2-11.7L7 19.2l11.8-1.7Z"/></svg>`,
      coin: `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="10"/><path d="M20 18h5c5 0 5 7 0 7h-5Zm0 7h6c5 0 5 7 0 7h-6Z"/></svg>`
    };
    return icons[type] || icons.like;
  }

  function bindMemoryReactions() {
    const types = ['like','favorite','coin'];
    const group = $('#memoryReactions');
    const fill = $('#reactionHoldFill');
    let holdRaf = null;
    let holdStartedAt = 0;
    let longPressed = false;
    const render = () => {
      $$('.memory-reaction').forEach(button => button.classList.toggle('active', state.memoryReactions.has(button.dataset.reaction)));
    };
    const resetHold = () => {
      cancelAnimationFrame(holdRaf);
      holdRaf = null;
      group?.classList.remove('holding');
      if (fill) fill.style.width = '0%';
    };
    const activateAll = () => {
      types.forEach(type => state.memoryReactions.add(type));
      unlockAchievement(4);
      persist();
      render();
      group?.classList.remove('triple-flash');
      if (group) { void group.offsetWidth; group.classList.add('triple-flash'); }
      if (navigator.vibrate) navigator.vibrate(35);
      showToast('哒哒，一键三连~认可自己！');
    };
    const beginHold = event => {
      event.preventDefault();
      longPressed = false;
      resetHold();
      group?.classList.add('holding');
      holdStartedAt = performance.now();
      const draw = now => {
        const progress = Math.min(1, (now - holdStartedAt) / 650);
        if (fill) fill.style.width = `${progress * 100}%`;
        if (progress >= 1) {
          longPressed = true;
          activateAll();
          setTimeout(resetHold, 280);
          return;
        }
        holdRaf = requestAnimationFrame(draw);
      };
      holdRaf = requestAnimationFrame(draw);
    };
    $$('.memory-reaction').forEach(button => {
      button.addEventListener('pointerdown', beginHold);
      ['pointerup','pointercancel','pointerleave'].forEach(type => button.addEventListener(type, resetHold));
      ['contextmenu','selectstart','dragstart','copy'].forEach(type => button.addEventListener(type, event => event.preventDefault()));
      button.addEventListener('click', event => {
        event.preventDefault();
        if (longPressed) { longPressed = false; return; }
        const type = button.dataset.reaction;
        if (state.memoryReactions.has(type)) state.memoryReactions.delete(type); else state.memoryReactions.add(type);
        unlockAchievement(4);
        persist();
        render();
      });
    });
    if (group) ['contextmenu','selectstart','dragstart','copy'].forEach(type => group.addEventListener(type, event => event.preventDefault()));
    render();
  }

  function openMemory2018() {
    const gallery = C.gallery;
    showDialog(`<article class="memory-2018-card"><p class="memory-index">05 · 回溯</p><h3>${escapeHtml(C.galleryTitle)}</h3>
      <div class="timeline-mark"><span>那天</span><span>今天</span></div>
      <div class="photo-gallery" aria-label="照片画廊：四张照片">
        <img class="gallery-main" id="galleryMain" src="${escapeHtml(gallery[0].src)}" alt="${escapeHtml(gallery[0].title)}" />
        <p class="gallery-caption" id="galleryCaption">${escapeHtml(gallery[0].title)}</p>
        <div class="gallery-thumbs">${gallery.map((item, i) => `<button class="gallery-thumb ${i === 0 ? 'active' : ''}" type="button" data-gallery="${i}" aria-label="查看第 ${i + 1} 张照片"><img src="${escapeHtml(item.src)}" alt="" /></button>`).join('')}</div>
      </div>
      <div class="memory-social-row">
        <form class="memory-comment-form" id="memoryCommentForm"><input id="memoryComment" maxlength="80" placeholder="写一句给这张照片的话…" autocomplete="off"/><button type="submit" aria-label="发送留言">↑</button></form>
        <div class="memory-reactions" id="memoryReactions" aria-label="三个互动按钮">
          <span class="reaction-hold-fill" id="reactionHoldFill" aria-hidden="true"></span>
          <button type="button" class="memory-reaction" data-reaction="like" aria-label="点亮第一个互动图标">${memoryReactionIcon('like')}</button>
          <button type="button" class="memory-reaction" data-reaction="favorite" aria-label="点亮第二个互动图标">${memoryReactionIcon('favorite')}</button>
          <button type="button" class="memory-reaction" data-reaction="coin" aria-label="点亮第三个互动图标">${memoryReactionIcon('coin')}</button>
        </div>
      </div>
      </article>`, () => {
        $$('.gallery-thumb').forEach(button => button.addEventListener('click', () => {
          const index = Number(button.dataset.gallery);
          $('#galleryMain').src = gallery[index].src;
          $('#galleryMain').alt = gallery[index].title;
          $('#galleryCaption').textContent = gallery[index].title;
          $$('.gallery-thumb').forEach(item => item.classList.toggle('active', item === button));
        }));
        bindMemoryReactions();
        $('#memoryCommentForm').addEventListener('submit', event => {
          event.preventDefault();
          const input = $('#memoryComment');
          if (!input.value.trim()) return;
          input.value = '';
          unlockAchievement(4);
          showToast('我们都记得。');
        });
      });
  }

  function launchMathConfetti() {
    const existing = $('.math-confetti', memoryContent);
    if (existing) existing.remove();
    const layer = document.createElement('div');
    layer.className = 'math-confetti show';
    memoryContent.appendChild(layer);
    const rect = memoryContent.getBoundingClientRect();
    const colors = [...state.palette, '#e7c974', '#f1e7cf', '#b6a2c8'];
    const animations = [];

    for (let i = 0; i < 56; i += 1) {
      const ribbon = document.createElement('i');
      const fromLeft = i % 2 === 0;
      const startX = fromLeft ? -28 - Math.random() * 24 : rect.width + 28 + Math.random() * 24;
      const startY = rect.height * (.48 + Math.random() * .34);
      const endX = rect.width * (.33 + Math.random() * .34);
      const endY = rect.height * (.30 + Math.random() * .42);
      const controlX = fromLeft
        ? rect.width * (.17 + Math.random() * .18)
        : rect.width * (.83 - Math.random() * .18);
      const controlY = Math.max(8, Math.min(startY, endY) - rect.height * (.26 + Math.random() * .18));
      const spin = (fromLeft ? 1 : -1) * (520 + Math.random() * 720);
      const duration = 1650 + Math.random() * 680;
      const delay = Math.random() * 520;

      ribbon.style.left = `${startX}px`;
      ribbon.style.top = `${startY}px`;
      ribbon.style.setProperty('--ribbon-color', colors[i % colors.length]);
      ribbon.style.width = `${4 + Math.random() * 2.8}px`;
      ribbon.style.height = `${11 + Math.random() * 8}px`;
      layer.appendChild(ribbon);

      const frames = [];
      const steps = 10;
      for (let step = 0; step <= steps; step += 1) {
        const t = step / steps;
        const mt = 1 - t;
        const x = mt * mt * startX + 2 * mt * t * controlX + t * t * endX;
        const y = mt * mt * startY + 2 * mt * t * controlY + t * t * endY;
        const opacity = t < .08 ? t / .08 : t > .82 ? (1 - t) / .18 : 1;
        frames.push({
          offset: t,
          opacity: Math.max(0, Math.min(1, opacity)),
          transform: `translate3d(${x - startX}px, ${y - startY}px, 0) rotate(${spin * t}deg) scale(${.7 + Math.sin(Math.PI * t) * .35})`
        });
      }

      animations.push(ribbon.animate(frames, {
        duration,
        delay,
        easing: 'linear',
        fill: 'forwards'
      }));
    }

    const longest = Math.max(...animations.map(animation => animation.effect.getTiming().duration + animation.effect.getTiming().delay));
    setTimeout(() => layer.remove(), longest + 260);
  }

  function openMath() {
    showDialog(`<article><p class="memory-index">06 · 年岁</p><h3>关于今天的小数学题</h3>
      <p>${escapeHtml(C.math.introduction)}</p>
      <div class="math-board" id="mathBoard">
        <div class="birthday-code">${escapeHtml(C.math.dateLabel)}</div>
        <div class="equation">${C.math.first.left} ${escapeHtml(C.math.first.operator)} ${C.math.first.right} = <input inputmode="numeric" id="mathA" maxlength="3" aria-label="第一道数学题"/></div>
        <div class="equation">${C.math.second.left} ${escapeHtml(C.math.second.operator)} ${C.math.second.right} = <input inputmode="numeric" id="mathB" maxlength="3" aria-label="第二道数学题"/></div>
        <div class="equation">答案1 − 答案2 = <input inputmode="numeric" id="mathC" maxlength="3" aria-label="前两个答案相减"/></div>
        <p class="math-result" id="mathResult"></p>
      </div>
      <button class="action-button" id="checkMath">算一算</button></article>`, () => {
        $('#checkMath').addEventListener('click', () => {
          const a = $('#mathA').value.trim(), b = $('#mathB').value.trim(), c = $('#mathC').value.trim();
          const okay = a === String(C.math.first.answer) && b === String(C.math.second.answer) && c === String(C.math.answer);
          if (!okay) {
            $('#mathBoard').classList.remove('shake'); void $('#mathBoard').offsetWidth; $('#mathBoard').classList.add('shake');
            $('#mathResult').textContent = '天呐……晃晃脑袋，再想一下。';
            return;
          }
          $('#mathResult').textContent = C.math.success;
          $('#mathResult').classList.add('celebration-result');
          $('#checkMath').disabled = true;
          $$('#mathBoard input').forEach(input => input.disabled = true);
          launchMathConfetti();
          playCheer();
          playTone(523.25,.62,0,.016); playTone(659.25,.75,.13,.012); playTone(783.99,.9,.27,.01);
          completeStar(6);
          unlockAchievement(5);
          persist();
          setTimeout(closeDialog, 4450);
        });
      });
  }

  function openLyrics() {
    unlockAchievement(6);
    showDialog(`<img class="memory-media contain" src="${escapeHtml(C.chatImage)}" alt="对话截图"/>
      <article><p class="memory-index">07 · 回声</p><h3>${escapeHtml(C.chatTitle)}</h3>
      <p class="lyric-quote">${escapeHtml(C.chatCaption)}</p>
      <p>${escapeHtml(C.chatQuote)}</p></article>`);
  }

  function achievementIcon(id) {
    // 沿用的教学版图案：music(1)、star(2)、brain(5)、letter(6)、cake(8)、gift(10)。
    // 新绘图案与现有图标保持同一线稿风格：64×64、描边、金色系。
    const icons = {
      1: `<svg viewBox="0 0 64 64"><path d="M25 14v35m0-35L49 8v36"/><path d="M25 49c-6 8-19 7-19 0 0-7 15-11 19-5m24 0c-5 9-18 9-18 2 0-7 14-11 18-6"/></svg>`,
      2: `<svg viewBox="0 0 64 64"><path d="m32 7 7.7 15.6L57 25 44.5 37.2 47.4 55 32 46.8 16.6 55l2.9-17.8L7 25l17.3-2.4Z"/><path d="M32 13v29" opacity=".35"/></svg>`,
      3: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="19"/><circle cx="24" cy="27" r="2"/><circle cx="33" cy="23" r="2"/><circle cx="42" cy="28" r="2"/><path d="M38 41c-1.5 4-5.5 6-10 5"/></svg>`,
      4: `<svg viewBox="0 0 64 64"><path d="M11 24h42v28H11Z"/><path d="M8 24l24 9 24-9"/><path d="m32 32 1.9 3.8 4.2.6-3 3 .7 4.2-3.8-2-3.8 2 .7-4.2-3-3 4.2-.6Z"/></svg>`,
      5: `<svg viewBox="0 0 64 64"><path d="M29 13c-8-4-15 2-14 9-7 2-8 12-2 16-3 8 6 14 12 10 3 6 13 5 15-1 8 3 14-5 10-11 7-5 3-15-5-15-2-7-10-10-16-8Z"/><path d="M27 18v25m-7-18c6 1 8 5 7 10m17-9c-5 1-7 5-6 10"/><path d="M47 44c0 5-3 8-7 8s-7-3-7-8c0-4 7-12 7-12s7 8 7 12Z"/></svg>`,
      6: `<svg viewBox="0 0 64 64"><path d="M10 18h36v30H10Z"/><path d="m10 20 18 15 18-15"/><path d="M39 44c8-13 13-26 18-30-1 11-6 25-18 30Zm4-8 8 2"/></svg>`,
      7: `<svg viewBox="0 0 64 64"><circle cx="32" cy="24" r="13"/><path d="M25 24a7 7 0 0 0 14 0"/><path d="M20 46c2-7 7-10 12-10s10 3 12 10"/><path d="M16 54h32"/><path d="m47 11 1 2 2.2.3-1.6 1.6.4 2.2-2-1-2 1 .4-2.2-1.6-1.6 2.2-.3Z"/></svg>`,
      8: `<svg viewBox="0 0 64 64"><path d="M13 38h38v13H13Zm5-13h28v13H18Zm7-10h14v10H25Z"/><path d="M32 15V8m0 0c-4 3-4 7 0 8 4-1 4-5 0-8Z"/><path d="M18 30h28M13 43h38"/></svg>`,
      9: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="3"/><path d="M32 21v-8M32 51v-8M21 32h-8M51 32h-8M24 24l-6-6M46 46l-6-6M24 40l-6 6M46 18l-6 6"/></svg>`,
      10: `<svg viewBox="0 0 64 64"><rect x="11" y="27" width="42" height="29" rx="2"/><path d="M8 20h48v10H8zM32 20v36M12 35h40"/><path d="M32 20C21 20 15 15 18 10c4-7 14 1 14 10Zm0 0c11 0 17-5 14-10-4-7-14 1-14 10Z"/></svg>`
    };
    return `<span class="achievement-svg">${icons[id] || icons[1]}</span>`;
  }

  function renderAchievementGrid() {
    achievementGrid.innerHTML = achievements.map(item => {
      const unlocked = state.achievements.has(item.id);
      return `<button type="button" class="achievement-item ${unlocked ? 'unlocked' : 'locked'}" data-id="${item.id}" aria-label="${unlocked ? item.name : `未解锁的第 ${String(item.id).padStart(2,'0')} 个秘密`}">${achievementIcon(item.id)}<small>- ${String(item.id).padStart(2,'0')} -</small></button>`;
    }).join('');
  }

  function setAchievementHomeMessage() {
    const allTenUnlocked = state.achievements.size === 10;
    achievementDetail.innerHTML = allTenUnlocked
      ? '秘密们竟然都被你发现了！<br>已发现的秘密会被这台设备收藏好哦。'
      : '欢迎来到夜空秘密基地！<br>已发现的秘密会被这台设备收藏好哦。';
  }

  function showAchievementDetail(id) {
    const item = achievements.find(a => a.id === id);
    if (!item || !state.achievements.has(id)) {
      achievementDetail.innerHTML = '？？？<br>一些有趣的东西还藏在夜色里呢。';
      return;
    }
    achievementDetail.innerHTML = `<strong>${item.name}</strong><br>${item.hint}`;
  }

  function achievementById(id) {
    return achievements.find(item => item.id === id);
  }

  function processAchievementPopupQueue() {
    if (achievementPopupActive || achievementPopupQueue.length === 0) return;
    const { item, instant } = achievementPopupQueue.shift();
    activeAchievementPopup = { item, instant };
    const overlay = $('#achievementUnlock');
    achievementPopupActive = true;
    const unlockIndex = $('#achievementUnlockIndex');
    if (unlockIndex) unlockIndex.textContent = `- ${String(item.id).padStart(2,'0')} -`;
    $('#achievementUnlockIcon').innerHTML = achievementIcon(item.id);
    $('#achievementUnlockName').textContent = item.name;
    const hint = $('#achievementUnlockHint');
    if (hint) hint.textContent = item.hint || '';
    if (overlay.open) overlay.close();
    overlay.classList.remove('show','instant');
    if (instant) overlay.classList.add('instant');
    overlay.showModal();
    void overlay.offsetWidth;
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden','false');
  }

  function showAchievementUnlock(item, options = {}) {
    if (!item) return;
    achievementPopupQueue.push({ item, instant: Boolean(options.instant) });
    processAchievementPopupQueue();
  }

  function finalizeAchievementUnlockClose() {
    const overlay = $('#achievementUnlock');
    overlay.classList.remove('show','instant','closing-to-menu');
    overlay.setAttribute('aria-hidden','true');
    if (overlay.open) overlay.close();
    achievementPopupActive = false;
    activeAchievementPopup = null;
    setTimeout(processAchievementPopupQueue, 120);
  }

  function closeAchievementUnlock() {
    const overlay = $('#achievementUnlock');
    if (!achievementPopupActive) return;
    const card = $('.achievement-unlock-card', overlay);
    const shouldFly = activeAchievementPopup && !activeAchievementPopup.instant && activeAchievementPopup.item.id >= 1 && activeAchievementPopup.item.id <= 10 && card && achievementButton;
    if (!shouldFly || typeof card.animate !== 'function') {
      finalizeAchievementUnlockClose();
      return;
    }
    const cardRect = card.getBoundingClientRect();
    const targetRect = achievementButton.getBoundingClientRect();
    const dx = targetRect.left + targetRect.width / 2 - (cardRect.left + cardRect.width / 2);
    const dy = targetRect.top + targetRect.height / 2 - (cardRect.top + cardRect.height / 2);
    overlay.classList.add('closing-to-menu');
    overlay.style.pointerEvents = 'none';
    const animation = card.animate([
      { opacity: 1, transform: 'translate(0,0) scale(1)', filter: 'brightness(1) blur(0)' },
      { offset: .58, opacity: .96, transform: `translate(${dx * .72}px,${dy * .72}px) scale(.2)`, filter: 'brightness(1.8) blur(0)' },
      { opacity: 0, transform: `translate(${dx}px,${dy}px) scale(.025)`, filter: 'brightness(3.2) blur(1px)' }
    ], { duration: 760, easing: 'cubic-bezier(.2,.78,.2,1)', fill: 'forwards' });
    animation.finished.catch(() => {}).then(() => {
      animation.cancel();
      overlay.style.pointerEvents = '';
      achievementButton.classList.remove('catching-light');
      void achievementButton.offsetWidth;
      achievementButton.classList.add('catching-light');
      setTimeout(() => achievementButton.classList.remove('catching-light'), 760);
      finalizeAchievementUnlockClose();
    });
  }

  function unlockAchievement(id, popupDelay = 0) {
    if (state.achievements.has(id)) return;
    state.achievements.add(id);
    updateState();
    const item = achievementById(id);
    if (popupDelay > 0) setTimeout(() => showAchievementUnlock(item), popupDelay);
    else showAchievementUnlock(item);
  }

  function createShootingStar() {
    if (phone.classList.contains('scene-open') || !state.completed.has(1)) return;
    const meteor = document.createElement('span');
    meteor.className = 'shooting-star';
    const angle = 26 + Math.random() * 11;
    const length = 75 + Math.random() * 85;
    const x = -12 + Math.random() * 63;
    const y = 5 + Math.random() * 47;
    const distance = 220 + Math.random() * 150;
    meteor.style.left = `${x}%`;
    meteor.style.top = `${y}%`;
    meteor.style.setProperty('--meteor-angle', `${angle}deg`);
    meteor.style.setProperty('--meteor-length', `${length}px`);
    meteor.style.setProperty('--meteor-duration', `${1.3 + Math.random() * .75}s`);
    meteor.style.setProperty('--meteor-x', `${distance}px`);
    meteor.style.setProperty('--meteor-y', `${distance * Math.tan(angle * Math.PI / 180)}px`);
    $('#constellation').appendChild(meteor);
    setTimeout(() => meteor.remove(), 2600);
  }

  function scheduleMeteors() {
    clearTimeout(meteorTimer);
    const tick = () => {
      if (state.completed.has(1) && !phone.classList.contains('scene-open')) {
        createShootingStar();
        if (Math.random() > .68) setTimeout(createShootingStar, 650 + Math.random() * 900);
      }
      meteorTimer = setTimeout(tick, 4200 + Math.random() * 3900);
    };
    meteorTimer = setTimeout(tick, 2400);
  }

  function clearJourneyTimers() { journeyTimers.forEach(clearTimeout); journeyTimers = []; }

  function showLetterJourney() {
    closeDialog();
    closeLetterView();
    phone.classList.add('scene-open');
    letterJourney.classList.add('is-visible');
    letterJourney.setAttribute('aria-hidden', 'false');
    clearJourneyTimers();
    letterJourney.classList.remove('playing','delivered-state');

    if (state.letterDelivered) {
      state.letterDelivered = true;
      letterJourney.classList.add('delivered-state');
      deliveredLetter.classList.add('ready');
      journeyCaption.textContent = '这封信已经在这里等你。';
      completeStar(8);
      updateState();
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      letterJourney.classList.add('delivered-state');
      deliveredLetter.classList.add('ready');
      journeyCaption.textContent = '它终于来到你面前。';
      state.letterJourneyPlayed = true;
      state.letterDelivered = true;
      completeStar(8);
      updateState();
      return;
    }

    deliveredLetter.classList.remove('ready');
    journeyCaption.textContent = '流星从云层里送来了一封信';
    void letterJourney.offsetWidth;
    letterJourney.classList.add('playing');

    journeyTimers.push(setTimeout(() => {
      journeyCaption.textContent = '它穿过一片柔软的云。';
    }, 2050));
    journeyTimers.push(setTimeout(() => {
      journeyCaption.textContent = '星光在夜空中轻轻闪了一下。';
    }, 3800));
    journeyTimers.push(setTimeout(() => {
      journeyCaption.textContent = '这封信正在穿过夜色。';
    }, 5200));
    journeyTimers.push(setTimeout(() => {
      journeyCaption.textContent = '它终于来到你面前。';
      deliveredLetter.classList.add('ready');
      state.letterJourneyPlayed = true;
      state.letterDelivered = true;
      completeStar(8);
      updateState();
    }, 7000));
  }

  function hideLetterJourney() {
    clearJourneyTimers();
    letterJourney.classList.remove('is-visible','playing');
    letterJourney.setAttribute('aria-hidden','true');
    phone.classList.remove('scene-open');
  }

  function beginLetterReadingTimer() {
    letterEnteredAt = Date.now();
    clearInterval(letterTimer);
    letterTimer = setInterval(() => {
      const total = state.letterSeconds + Math.floor((Date.now() - letterEnteredAt) / 1000);
      if (total >= 14) unlockAchievement(7);
    }, 1000);
  }

  function recordLetterReadingTime() {
    if (letterEnteredAt) {
      state.letterSeconds += Math.floor((Date.now() - letterEnteredAt) / 1000);
      letterEnteredAt = 0;
      persist();
    }
    clearInterval(letterTimer);
    letterTimer = null;
  }

  function showLetterView() {
    letterJourney.classList.remove('is-visible');
    letterJourney.setAttribute('aria-hidden','true');
    letterView.classList.remove('folding','unfolded');
    letterView.classList.add('is-visible');
    letterView.setAttribute('aria-hidden','false');
    const paper = $('.letter-paper', letterView);
    if (paper) paper.scrollTop = 0;
    void letterView.offsetWidth;
    requestAnimationFrame(() => requestAnimationFrame(() => letterView.classList.add('unfolded')));
    beginLetterReadingTimer();
  }

  function leaveLetterView() {
    recordLetterReadingTime();
    letterView.classList.remove('is-visible','unfolded','folding');
    letterView.setAttribute('aria-hidden','true');
  }

  function foldLetterBackToJourney() {
    if (!letterView.classList.contains('is-visible') || letterView.classList.contains('folding')) return;
    recordLetterReadingTime();
    letterView.classList.add('folding');
    letterView.classList.remove('unfolded');
    setTimeout(() => {
      letterView.classList.remove('is-visible','folding');
      letterView.setAttribute('aria-hidden','true');
      letterJourney.classList.add('is-visible','delivered-state');
      letterJourney.setAttribute('aria-hidden','false');
      deliveredLetter.classList.add('ready');
    }, 1020);
  }

  function closeLetterView() {
    leaveLetterView();
  }

  function showFinale() {
    closeDialog();
    hideLetterJourney();
    closeLetterView();
    const firstFinaleEntry = !state.finaleVisited;
    state.finaleVisited = true;
    persist();
    phone.classList.add('scene-open','finale-open');
    finale.classList.add('is-visible');
    finale.setAttribute('aria-hidden','false');
    // The birthday track is not needed on the landing scene. Begin fetching it
    // only when the visitor reaches the finale, leaving ample time before the
    // cake reveal without competing with the first screen's assets.
    if (birthdayMusic.preload !== 'auto') {
      birthdayMusic.preload = 'auto';
      birthdayMusic.load();
    }
    startFinalSky();
    restoreFinaleState();

    if (firstFinaleEntry || !state.cakeRevealed) {
      // First arrival at star 09: the main background music gently fades out.
      // The birthday song remains stopped until the cake is revealed.
      void transitionToSilence({ mainDuration: 2500, birthdayDuration: 2100 });
      return;
    }

    if (state.birthdayUserPaused) {
      // Respect a deliberate pause while still withdrawing the main song softly.
      void transitionToSilence({ mainDuration: 2200, birthdayDuration: 1900 });
      return;
    }

    // Ordinary return to the fireworks page: main song out first, birthday song in second.
    void transitionToBirthday({
      restart: false,
      fadeOutDuration: 2200,
      fadeInDuration: 2700
    });
  }

  function hideFinale(options = {}) {
    const { skipAudioTransition = false } = options;
    finale.classList.remove('is-visible','cake-mode','gift-phase');
    finale.setAttribute('aria-hidden','true');
    phone.classList.remove('scene-open','finale-open');
    cakeScene.classList.remove('visible','candles-lit','celebrated');
    launcherRow.classList.remove('visible');
    stopAutoLaunchers();
    stopHeartLaunchers();
    stopFinalSky();
    if (skipAudioTransition || !state.completed.has(1)) return;

    // Whether the birthday song has started or not, leave the fireworks page by
    // fully fading out its current track before resuming the main music.
    void transitionToMain({
      restart: false,
      fadeOutDuration: 2200,
      fadeInDuration: 2700
    });
  }

  // ===== 终幕定制组件：烟花计数、里程碑、礼物盒与三张卡牌 =====
  function updateFireworkCounter() {
    const el = $('#fireworkCount');
    if (el) el.textContent = String(Math.min(state.fireworkCount, MILESTONES.total));
  }

  function showMilestoneText(text) {
    const el = document.createElement('p');
    el.className = 'milestone-text';
    el.textContent = text;
    finale.appendChild(el);
    setTimeout(() => el.remove(), 3600);
  }

  function triggerFinaleFlash() {
    const flash = $('#finaleFlash');
    if (!flash) return;
    flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go');
  }

  function showGiftBox() {
    const box = $('#giftBox');
    if (box) box.hidden = false;
    // 礼盒出现后蛋糕隐去，两者不再叠加。
    finale.classList.add('gift-phase');
  }

  function openGiftBox() {
    if (!state.giftBoxReady) return;
    if (state.giftBoxOpen) {
      // 已经打开且三张牌都翻完：再点一次礼盒（或点天空任意处）收起礼盒，蛋糕回归。
      if (state.cardsFlipped.every(Boolean)) closeGiftPhase();
      return;
    }
    state.giftBoxOpen = true;
    persist();
    const box = $('#giftBox');
    if (box) box.classList.add('open');
    const cards = $('#giftCards');
    if (cards) {
      cards.hidden = false;
      $$('.gift-card', cards).forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('emerge');
          if (state.cardsFlipped[i]) card.classList.add('flipped');
        }, 240 + i * 300);
      });
    }
  }

  function closeGiftPhase() {
    state.giftBoxOpen = false;
    state.fireworkCount = 0;
    persist();
    const box = $('#giftBox');
    if (box) box.hidden = true;
    const cards = $('#giftCards');
    if (cards) cards.hidden = true;
    $$('.gift-card').forEach(card => card.classList.remove('emerge'));
    finale.classList.remove('gift-phase');
    updateFireworkCounter();
    showToast('蛋糕又回来了。再数 26 朵烟花，礼盒还会来。');
  }

  function flipGiftCard(index, card) {
    if (card.classList.contains('flipped')) return;
    card.classList.add('flipped');
    state.cardsFlipped[index] = true;
    persist();
    playTone(659.25, .3, 0, .014);
    if (state.cardsFlipped.length >= 3 && state.cardsFlipped.every(Boolean)) {
      setTimeout(() => unlockAchievement(10), 1000);
    }
  }

  function restoreGiftCards() {
    if (!state.giftBoxReady) return;
    if (state.giftBoxOpen) {
      const box = $('#giftBox');
      if (box) box.classList.add('open');
      const cards = $('#giftCards');
      if (cards) {
        cards.hidden = false;
        $$('.gift-card', cards).forEach((card, i) => {
          card.classList.add('emerge');
          if (state.cardsFlipped[i]) card.classList.add('flipped');
        });
      }
    }
  }

  function createCandles() {
    const top = $('#cakeCandlesTop');
    const mid = $('#cakeCandlesMid');
    if (top) { top.innerHTML = ''; for (let i = 0; i < 10; i += 1) top.appendChild(document.createElement('i')); }
    if (mid) { mid.innerHTML = ''; for (let i = 0; i < 16; i += 1) mid.appendChild(document.createElement('i')); }
  }

  function restoreFinaleState() {
    if (state.cakeRevealed) revealCake(false);
    if (state.candlesBlown) {
      cakeScene.classList.add('celebrated');
      cake.classList.remove('candles-on');
    }
    if (state.candlesRelit) {
      cakeScene.classList.add('celebrated','candles-lit');
      cake.classList.add('candles-on');
    }
    if (state.launchers) showLaunchers();
    if (state.candlesBlown) {
      const counter = $('#fireworkCounter');
      if (counter) { counter.hidden = false; updateFireworkCounter(); }
    }
    if (state.giftBoxReady) showGiftBox();
    restoreGiftCards();
  }

  function startFinalSky() {
    stopFinalSky();
    const ctx = finalSky.getContext('2d');
    let width = 0, height = 0, dpr = 1, raf = null, previousTime = 0;
    let stars = [], particles = [], flashes = [], rockets = [], embers = [];
    const zodiacPatterns = window.XQD_ZODIAC_PATTERNS || {};
    const zodiacKey = String(C.zodiac || 'aquarius').trim().toLowerCase();
    const zodiacPattern = zodiacPatterns[zodiacKey] || zodiacPatterns.aquarius;
    if (!zodiacPattern) throw new Error('缺少 zodiac-patterns.js 星座数据');

    function hexToRgb(hex) { const value=hex.replace('#',''); return [parseInt(value.slice(0,2),16),parseInt(value.slice(2,4),16),parseInt(value.slice(4,6),16)]; }
    function resize() {
      const rect=phone.getBoundingClientRect(); width=rect.width; height=rect.height; dpr=Math.min(devicePixelRatio||1,2);
      finalSky.width=width*dpr; finalSky.height=height*dpr; finalSky.style.width=`${width}px`; finalSky.style.height=`${height}px`;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      stars=Array.from({length:160},()=>({x:Math.random()*width,y:Math.random()*height,r:Math.random()*1.05+.18,a:Math.random()*.5+.1,s:Math.random()*.0012+.00035,p:Math.random()*Math.PI*2}));
    }
    function addParticle(x,y,angle,speed,color,opts={}) {
      particles.push({x,y,px:x,py:y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:1,decay:opts.decay??(.0037+Math.random()*.0018),drag:opts.drag??.994,gravity:opts.gravity??.0105,color,size:opts.size??(.7+Math.random()*1.15),trail:opts.trail??(9+Math.random()*10),shimmer:Math.random()*6.28});
    }
    function emitCrackle(x,y,color,count=18) {
      for(let i=0;i<count;i++) embers.push({x,y,vx:(Math.random()-.5)*1.6,vy:(Math.random()-.5)*1.6,life:1,decay:.02+Math.random()*.02,color});
    }
    function starAngle(i,points=5){ const outer=i%2===0?1:.43; return {a:-Math.PI/2+i*Math.PI/points,m:outer}; }
    function burst(x,y,forcedKind,scale=1) {
      const colors=state.palette.map(hexToRgb);
      const kinds=['chrysanthemum','ring','double-ring','willow','palm','peony','spiral','star','cascade','crossette'];
      const kind=forcedKind||kinds[Math.floor(Math.random()*kinds.length)];
      flashes.push({x,y,life:1,size:scale});
      const c=()=>colors[Math.floor(Math.random()*colors.length)];
      if(kind==='ring'||kind==='double-ring') {
        const rings=kind==='double-ring'?[1.95,1.25]:[1.8];
        rings.forEach((base,ri)=>{const count=ri?48:72;for(let i=0;i<count;i++){const a=Math.PI*2*i/count+(ri?.04:0);addParticle(x,y,a,(base+Math.random()*.18)*scale,colors[i%colors.length],{gravity:.007,decay:.0035+Math.random()*.0012,trail:12+Math.random()*8});}});
      } else if(kind==='willow'||kind==='cascade') {
        const count=kind==='cascade'?110:92;
        for(let i=0;i<count;i++){const a=Math.PI*2*i/count+(Math.random()-.5)*.12;addParticle(x,y,a,(.75+Math.random()*1.35)*scale,c(),{gravity:kind==='cascade'?.018:.015,decay:.0028+Math.random()*.0011,drag:.996,trail:17+Math.random()*11});}
      } else if(kind==='palm') {
        for(let arm=0;arm<16;arm++){const a=Math.PI*2*arm/16;for(let j=0;j<7;j++)addParticle(x,y,a+(Math.random()-.5)*.055,(.62+j*.25)*scale,colors[arm%colors.length],{gravity:.011,decay:.0034+Math.random()*.0012,trail:13+Math.random()*9});}
      } else if(kind==='spiral') {
        for(let i=0;i<110;i++){const a=i*.38;const speed=(.45+i/110*1.65)*scale;addParticle(x,y,a,speed,colors[i%colors.length],{gravity:.009,decay:.0035+Math.random()*.0014,trail:11+Math.random()*8});}
      } else if(kind==='message-star') {
        const starColor = colors[Math.floor(Math.random()*colors.length)];
        const vertices = Array.from({length:10},(_,i)=>{
          const a=-Math.PI/2+i*Math.PI/5;
          const radius=i%2===0?1:.43;
          return {x:Math.cos(a)*radius,y:Math.sin(a)*radius};
        });
        for(let edge=0;edge<10;edge++){
          const from=vertices[edge],to=vertices[(edge+1)%10];
          for(let step=0;step<15;step++){
            const t=step/15;
            const sx=from.x+(to.x-from.x)*t;
            const sy=from.y+(to.y-from.y)*t;
            const angle=Math.atan2(sy,sx)+(Math.random()-.5)*.012;
            const magnitude=Math.hypot(sx,sy);
            addParticle(x,y,angle,(.34+magnitude*2.22+Math.random()*.08)*scale,starColor,{gravity:.0058,decay:.00305+Math.random()*.0009,drag:.996,trail:13+Math.random()*7,size:.72+Math.random()*.58});
          }
        }
        for(let i=0;i<14;i++) addParticle(x,y,Math.random()*Math.PI*2,(.16+Math.random()*.46)*scale,colors[i%colors.length],{gravity:.005,decay:.0034+Math.random()*.001,drag:.996,trail:8+Math.random()*5,size:.62+Math.random()*.45});
      } else if(kind==='star') {
        for(let i=0;i<100;i++){const info=starAngle(i%10,5);const jitter=(Math.random()-.5)*.07;addParticle(x,y,info.a+jitter,(.55+info.m*1.7+Math.random()*.18)*scale,colors[i%colors.length],{gravity:.008,decay:.0037+Math.random()*.0012,trail:10+Math.random()*7});}
      } else if(kind==='heart') {
        const heartColor = colors[Math.floor(Math.random()*colors.length)];
        for(let i=0;i<132;i++){
          const t=Math.PI*2*i/132;
          const hx=16*Math.pow(Math.sin(t),3);
          const hy=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);
          const angle=Math.atan2(-hy,hx)+(Math.random()-.5)*.025;
          const magnitude=Math.hypot(hx,hy)/17;
          addParticle(x,y,angle,(.42+magnitude*1.75)*scale,heartColor,{gravity:.0065,decay:.0032+Math.random()*.001,drag:.995,trail:12+Math.random()*7,size:.75+Math.random()*.7});
        }
      } else if(kind==='butterfly') {
        const leftColor = colors[Math.floor(Math.random()*colors.length)];
        const rightColor = colors[Math.floor(Math.random()*colors.length)];
        const bodyColor = [244,229,190];
        const left = [], right = [], body = [];
        const cubic = (target,p0,p1,p2,p3,steps=28) => {
          for(let i=0;i<=steps;i++){
            const t=i/steps, q=1-t;
            target.push({
              x:q*q*q*p0.x+3*q*q*t*p1.x+3*q*t*t*p2.x+t*t*t*p3.x,
              y:q*q*q*p0.y+3*q*q*t*p1.y+3*q*t*t*p2.y+t*t*t*p3.y
            });
          }
        };
        const buildWing = (target,side=1) => {
          const P=(x,y)=>({x:x*side,y});
          // Large upper wing, soft outer shoulder, smaller lower wing.
          cubic(target,P(.02,-.02),P(.18,-.70),P(.80,-1.18),P(1.24,-.72),34);
          cubic(target,P(1.24,-.72),P(1.50,-.36),P(1.24,.06),P(.58,.10),30);
          cubic(target,P(.58,.10),P(1.18,.28),P(1.10,.88),P(.62,.92),28);
          cubic(target,P(.62,.92),P(.26,.88),P(.08,.34),P(.02,.08),26);
        };
        buildWing(left,-1);
        buildWing(right,1);
        cubic(body,{x:0,y:-.12},{x:-.05,y:.18},{x:-.04,y:.58},{x:0,y:.80},24);
        cubic(body,{x:-.01,y:-.08},{x:-.18,y:-.35},{x:-.30,y:-.43},{x:-.42,y:-.48},12);
        cubic(body,{x:.01,y:-.08},{x:.18,y:-.35},{x:.30,y:-.43},{x:.42,y:-.48},12);
        const emitPath=(points,color,boost=2.38)=>points.forEach(point=>{
          const angle=Math.atan2(point.y,point.x)+(Math.random()-.5)*.008;
          const magnitude=Math.hypot(point.x,point.y);
          addParticle(x,y,angle,(.34+magnitude*boost)*scale,color,{gravity:.0047,decay:.0028+Math.random()*.00072,drag:.9965,trail:15+Math.random()*8,size:.74+Math.random()*.58});
        });
        emitPath(left,leftColor);
        emitPath(right,rightColor);
        emitPath(body,bodyColor,2.05);
      } else if(kind==='keepsake') {
        const inkColor = colors[Math.floor(Math.random()*colors.length)];
        const highlightColor = [247,232,194];
        const lStroke = [], aLoop = [], aStem = [];
        const cubic = (target,p0,p1,p2,p3,steps=26) => {
          for(let i=0;i<=steps;i++){
            const t=i/steps, q=1-t;
            target.push({
              x:q*q*q*p0.x+3*q*q*t*p1.x+3*q*t*t*p2.x+t*t*t*p3.x,
              y:q*q*q*p0.y+3*q*q*t*p1.y+3*q*t*t*p2.y+t*t*t*p3.y
            });
          }
        };
        // A readable handwritten “La”: the capital L keeps a clear tall
        // downstroke and baseline sweep; the lower-case a has its own oval
        // and stem, joined only where real handwriting would naturally join.
        cubic(lStroke,{x:-1.12,y:-.42},{x:-1.08,y:-.82},{x:-.62,y:-.98},{x:-.52,y:-.62},22);
        cubic(lStroke,{x:-.52,y:-.62},{x:-.58,y:-.08},{x:-.72,y:.52},{x:-.43,y:.69},32);
        cubic(lStroke,{x:-.43,y:.69},{x:-.18,y:.82},{x:.00,y:.58},{x:.08,y:.30},22);

        cubic(aLoop,{x:.08,y:.30},{x:.13,y:-.08},{x:.64,y:-.16},{x:.75,y:.18},26);
        cubic(aLoop,{x:.75,y:.18},{x:.86,y:.53},{x:.48,y:.74},{x:.20,y:.59},25);
        cubic(aLoop,{x:.20,y:.59},{x:.01,y:.49},{x:-.01,y:.20},{x:.08,y:.30},22);

        cubic(aStem,{x:.70,y:.02},{x:.70,y:.20},{x:.69,y:.47},{x:.73,y:.59},20);
        cubic(aStem,{x:.73,y:.59},{x:.88,y:.70},{x:1.06,y:.60},{x:1.24,y:.42},20);

        const emitStroke = (points, accentOffset=0) => points.forEach((point,index)=>{
          const angle=Math.atan2(point.y,point.x)+(Math.random()-.5)*.0055;
          const magnitude=Math.hypot(point.x,point.y);
          const color=(index+accentOffset)%13===0?highlightColor:inkColor;
          addParticle(x,y,angle,(.35+magnitude*1.96)*scale,color,{gravity:.0043,decay:.00285+Math.random()*.00072,drag:.9965,trail:15+Math.random()*7,size:.72+Math.random()*.48});
        });
        emitStroke(lStroke,0);
        emitStroke(aLoop,4);
        emitStroke(aStem,8);
      } else if(kind==='arrow') {
        // 第 13 朵里程碑：箭形轨迹（射手座箭形），冰蓝色与其他朵区分。
        const arrowColor=[173,216,255];
        const arrowPts=[];
        const arrowSeg=(ax,ay,bx,by,n)=>{for(let i=0;i<n;i++){const t=n===1?0:i/(n-1);arrowPts.push([ax+(bx-ax)*t,ay+(by-ay)*t]);}};
        arrowSeg(-.35,1,-.35,-.2,26);
        arrowSeg(-.35,-.2,-.8,.32,10);
        arrowSeg(-.35,-.2,.1,.32,10);
        arrowSeg(-.35,1,-.7,.8,6);
        arrowSeg(-.35,1,0,.8,6);
        arrowPts.forEach((p,i)=>{
          const angle=Math.atan2(p[1],p[0])+(Math.random()-.5)*.012;
          const magnitude=Math.hypot(p[0],p[1]);
          addParticle(x,y,angle,(.3+magnitude*1.9)*scale,i%6===0?[255,244,214]:arrowColor,{gravity:.004,decay:.0032+Math.random()*.0008,drag:.996,trail:14+Math.random()*7,size:.7+Math.random()*.5});
        });
      } else if(kind==='music-note') {
        const noteColor = colors[Math.floor(Math.random()*colors.length)];
        const shimmerColor = [248,232,194];
        const points=[];
        const cubic=(p0,p1,p2,p3,steps=28)=>{
          for(let i=0;i<=steps;i++){
            const t=i/steps,q=1-t;
            points.push({x:q*q*q*p0.x+3*q*q*t*p1.x+3*q*t*t*p2.x+t*t*t*p3.x,y:q*q*q*p0.y+3*q*q*t*p1.y+3*q*t*t*p2.y+t*t*t*p3.y});
          }
        };
        const ellipse=(cx,cy,rx,ry,rotation,count=42)=>{
          const c=Math.cos(rotation),sn=Math.sin(rotation);
          for(let i=0;i<count;i++){
            const t=Math.PI*2*i/count,ex=Math.cos(t)*rx,ey=Math.sin(t)*ry;
            points.push({x:cx+ex*c-ey*sn,y:cy+ex*sn+ey*c});
          }
        };
        // An elegant pair of beamed quavers, with tilted noteheads and a
        // gently rising handwritten beam.
        ellipse(-.54,.58,.34,.22,-.24,46);
        ellipse(.43,.38,.34,.22,-.24,46);
        cubic({x:-.28,y:.48},{x:-.28,y:.04},{x:-.27,y:-.43},{x:-.26,y:-.78},34);
        cubic({x:.69,y:.28},{x:.69,y:-.06},{x:.69,y:-.42},{x:.68,y:-.62},30);
        cubic({x:-.26,y:-.78},{x:.05,y:-.72},{x:.43,y:-.68},{x:.68,y:-.62},34);
        cubic({x:-.25,y:-.61},{x:.08,y:-.56},{x:.43,y:-.52},{x:.68,y:-.46},30);
        points.forEach((point,index)=>{
          const angle=Math.atan2(point.y,point.x)+(Math.random()-.5)*.0065;
          const magnitude=Math.hypot(point.x,point.y);
          addParticle(x,y,angle,(.36+magnitude*2.02)*scale,index%11===0?shimmerColor:noteColor,{gravity:.0046,decay:.0029+Math.random()*.00078,drag:.9965,trail:15+Math.random()*8,size:.74+Math.random()*.52});
        });
      } else if(kind==='crossette') {
        for(let arm=0;arm<18;arm++){const a=Math.PI*2*arm/18;const col=colors[arm%colors.length];for(let j=0;j<4;j++)addParticle(x,y,a+(j-1.5)*.035,(1+j*.3)*scale,col,{gravity:.009,decay:.0032+Math.random()*.0012,trail:12});}
        setTimeout(()=>emitCrackle(x,y,c(),28),360);
      } else {
        const count=kind==='peony'?132:112;
        for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2;const radial=.45+Math.pow(Math.random(),.4)*(kind==='peony'?2.05:1.85);addParticle(x,y,a,radial*scale,c(),{gravity:.0095,decay:.0034+Math.random()*.0017,trail:10+Math.random()*10});}
      }
      if(!forcedKind && Math.random()>.58){
        const offset=24+Math.random()*24;
        setTimeout(()=>burst(x-offset,y+8+Math.random()*18,'ring',.48),150+Math.random()*120);
        setTimeout(()=>burst(x+offset,y-4+Math.random()*20,'peony',.44),260+Math.random()*140);
      }
    }
    function launchRocket(sx,sy,tx,ty,done,kind,options={}) {
      const hasVector = Number.isFinite(options.vx) && Number.isFinite(options.vy);
      const controlDistance = options.controlDistance || 94;
      rockets.push({sx,sy,x:sx,y:sy,tx,ty,t:0,done,kind,
        cx: hasVector ? sx + options.vx * controlDistance : null,
        cy: hasVector ? sy + options.vy * controlDistance : null
      });
    }
    function drawZodiac(time) {
      if (state.cakeRevealed) return;
      const chartWidth = Math.min(width * .91, 356);
      const chartHeight = chartWidth * (155 / 300);
      const left = (width - chartWidth) / 2;
      const top = height * .17;
      const centerX = left + chartWidth / 2;
      const centerY = top + chartHeight / 2;
      const tilt = -0.065;
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);
      const pts = zodiacPattern.points.map(([x,y]) => {
        const rawX = left + x / 300 * chartWidth;
        const rawY = top + y / 155 * chartHeight;
        const dx = rawX - centerX;
        const dy = rawY - centerY;
        return {
          x: centerX + dx * cosTilt - dy * sinTilt,
          y: centerY + dx * sinTilt + dy * cosTilt
        };
      });
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      zodiacPattern.links.forEach(([a,b], index) => {
        const p=pts[a],q=pts[b];
        ctx.beginPath();
        ctx.moveTo(p.x,p.y);
        ctx.lineTo(q.x,q.y);
        ctx.lineWidth = index % 5 === 0 ? .72 : .58;
        ctx.strokeStyle = `rgba(218,211,231,${.105 + Math.sin(time*.0007+index)*.025})`;
        ctx.stroke();
      });
      pts.forEach((p,i) => {
        const major = i === 0 || i === Math.floor(pts.length / 2) || i === pts.length - 1 || i % 4 === 0;
        const radius = major ? 1.9 : (i % 3 === 0 ? 1.35 : .95);
        const alpha = (major ? .42 : .25) + Math.sin(time*.001+i)*.055;
        if (major) {
          const halo=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,6.2);
          halo.addColorStop(0,`rgba(235,224,197,${alpha*.17})`);
          halo.addColorStop(1,'rgba(235,224,197,0)');
          ctx.beginPath();ctx.fillStyle=halo;ctx.arc(p.x,p.y,6.2,0,Math.PI*2);ctx.fill();
        }
        ctx.beginPath();ctx.fillStyle=`rgba(236,226,204,${alpha})`;ctx.arc(p.x,p.y,radius,0,Math.PI*2);ctx.fill();
      });
      ctx.restore();
    }
    function render(time) {
      const frameScale = previousTime ? Math.min(3, Math.max(.45, (time - previousTime) / 16.667)) : 1;
      previousTime = time;
      ctx.clearRect(0,0,width,height);
      stars.forEach(star=>{const a=Math.max(.035,star.a+Math.sin(time*star.s+star.p)*.14);ctx.beginPath();ctx.fillStyle=`rgba(242,235,216,${a})`;ctx.arc(star.x,star.y,star.r,0,Math.PI*2);ctx.fill();});
      drawZodiac(time);
      flashes=flashes.filter(f=>f.life>0);flashes.forEach(f=>{ctx.beginPath();ctx.fillStyle=`rgba(255,244,211,${f.life*.13})`;ctx.arc(f.x,f.y,(1-f.life)*38*f.size+3,0,Math.PI*2);ctx.fill();f.life-=.025*frameScale;});
      rockets=rockets.filter(r=>r.t<1);rockets.forEach(r=>{r.t+=.018*frameScale;const e=1-Math.pow(1-Math.min(1,r.t),2);if(Number.isFinite(r.cx)&&Number.isFinite(r.cy)){const q=1-e;r.x=q*q*r.sx+2*q*e*r.cx+e*e*r.tx;r.y=q*q*r.sy+2*q*e*r.cy+e*e*r.ty;}else{r.x=r.sx+(r.tx-r.sx)*e;r.y=r.sy+(r.ty-r.sy)*e-Math.sin(Math.PI*r.t)*26;}const glow=ctx.createRadialGradient(r.x,r.y,0,r.x,r.y,8);glow.addColorStop(0,'rgba(255,249,220,1)');glow.addColorStop(.28,'rgba(255,224,145,.88)');glow.addColorStop(1,'rgba(255,202,104,0)');ctx.beginPath();ctx.fillStyle=glow;ctx.arc(r.x,r.y,8,0,6.28);ctx.fill();ctx.beginPath();ctx.fillStyle='#fff4c8';ctx.arc(r.x,r.y,2.15,0,6.28);ctx.fill();if(Math.random()>.56)embers.push({x:r.x+(Math.random()-.5)*2,y:r.y+3+Math.random()*3,vx:(Math.random()-.5)*.22,vy:.18+Math.random()*.22,life:.58,decay:.035,color:[246,202,112]});if(r.t>=1){burst(r.tx,r.ty,r.kind);if(r.done)r.done();}});
      particles=particles.filter(p=>p.life>0);particles.forEach(p=>{p.px=p.x;p.py=p.y;p.x+=p.vx*frameScale;p.y+=p.vy*frameScale;p.vx*=Math.pow(p.drag,frameScale);p.vy=p.vy*Math.pow(p.drag,frameScale)+p.gravity*frameScale;p.life-=p.decay*frameScale;const alpha=Math.max(0,p.life)*(.8+Math.sin(time*.018+p.shimmer)*.17);const[r,g,b]=p.color;const dx=p.x-p.px,dy=p.y-p.py,len=Math.hypot(dx,dy)||1,tx=p.x-dx/len*p.trail,ty=p.y-dy/len*p.trail;const grad=ctx.createLinearGradient(tx,ty,p.x,p.y);grad.addColorStop(0,`rgba(${r},${g},${b},0)`);grad.addColorStop(1,`rgba(${r},${g},${b},${alpha})`);ctx.beginPath();ctx.strokeStyle=grad;ctx.lineWidth=Math.max(.45,p.size*.72);ctx.lineCap='round';ctx.moveTo(tx,ty);ctx.lineTo(p.x,p.y);ctx.stroke();ctx.beginPath();ctx.fillStyle=`rgba(${r},${g},${b},${Math.min(1,alpha+.14)})`;ctx.arc(p.x,p.y,p.size,0,6.28);ctx.fill();});
      embers=embers.filter(e=>e.life>0);embers.forEach(e=>{e.x+=e.vx*frameScale;e.y+=e.vy*frameScale;e.vy+=.018*frameScale;e.life-=e.decay*frameScale;const[r,g,b]=e.color;ctx.fillStyle=`rgba(${r},${g},${b},${e.life})`;ctx.fillRect(e.x,e.y,1.3,1.3);});
      raf=requestAnimationFrame(render);
    }
    function playFireworkSound(loud = false) {
      const audio=ensureAudio();const now=audio.currentTime;
      const buffer=audio.createBuffer(1,Math.floor(audio.sampleRate*.52),audio.sampleRate);const data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.pow(1-i/data.length,2.2);
      const noise=audio.createBufferSource();noise.buffer=buffer;const filter=audio.createBiquadFilter();filter.type='bandpass';filter.frequency.value=620+Math.random()*520;filter.Q.value=.6;const gain=audio.createGain();gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(loud ? .17 : .115,now+.018);gain.gain.exponentialRampToValueAtTime(.0001,now+.5);noise.connect(filter).connect(gain).connect(audio.destination);noise.start(now);
      playTone(72+Math.random()*25,loud ? .52 : .38,0,loud ? .068 : .052,'sine');
    }
    function onPointer(event) {
      if (event.target.closest('button,input,form,dialog,.topbar,.message-box,.launcher-row')) return;
      const rect=finalSky.getBoundingClientRect();const x=event.clientX-rect.left,y=event.clientY-rect.top;
      const isPrelude = !state.cakeRevealed && state.preCakeClicks < 25;
      burst(x,y);playFireworkSound(isPrelude);fireworkHint.classList.add('fade');
      if(!state.cakeRevealed){
        const noteIndex=Math.min(state.preCakeClicks,birthdayNotes.length-1);
        playPianoTone(birthdayNotes[noteIndex]);
        state.preCakeClicks+=1;
        if(state.preCakeClicks>=25)revealCake(true);
      }else if(state.candlesBlown){
        // 礼盒已打开且三张牌翻完：点天空任意处收起礼盒、蛋糕回归，计数清零可再来一轮。
        if(state.giftBoxOpen&&state.cardsFlipped.every(Boolean)){closeGiftPhase();return;}
        if(state.fireworkCount<MILESTONES.total){
        // 吹灭蜡烛后：点一次天空绽放一朵，计数到固定朵数出现文字与成就。
        state.fireworkCount+=1;
        updateFireworkCounter();
        if(state.fireworkCount===MILESTONES.arrowAt){
          launchRocket(rect.width/2,rect.height+8,x,y,null,'arrow',{});
          showMilestoneText(MILESTONES.arrowText);
        }
        if(state.fireworkCount===MILESTONES.toastAt)showToast(MILESTONES.toastText);
        if(state.fireworkCount>=MILESTONES.total){
          burst(x,y,'peony',1.8);
          triggerFinaleFlash();
          unlockAchievement(9);
          state.giftBoxReady=true;
          persist();
          showGiftBox();
        }
        }
      }
      persist();
    }
    resize();finale.addEventListener('pointerdown',onPointer);window.addEventListener('resize',resize);raf=requestAnimationFrame(render);
    finalAnimator={burst,launchRocket,stop(){cancelAnimationFrame(raf);finale.removeEventListener('pointerdown',onPointer);window.removeEventListener('resize',resize);ctx.clearRect(0,0,width,height);}};
  }

  function stopFinalSky(){ if(finalAnimator) finalAnimator.stop(); finalAnimator=null; }

  function revealCake(withMusic) {
    if (!state.cakeRevealed) state.cakeRevealed = true;
    finale.classList.add('cake-mode');
    cakeScene.classList.add('visible');
    cakeScene.setAttribute('aria-hidden','false');
    fireworkHint.classList.add('fade');
    // 礼炮随蛋糕一同出现：蜡烛一律先点礼炮、再点蜡烛点燃。
    showLaunchers();
    if (withMusic) showToast('先点朝天炮，再轻触蜡烛。');
    if (!state.candlesBlown && !state.candlesRelit) {
      cake.classList.remove('candles-on','smoking');
      cakeScene.classList.remove('candles-lit');
    }
    if (withMusic) {
      state.birthdayUserPaused = false;
      // First birthday playback: any remaining main-song sound finishes fading
      // before the birthday track rewinds and gently rises from silence.
      void transitionToBirthday({
        restart: true,
        fadeOutDuration: 2100,
        fadeInDuration: 2800
      });
    }
    persist();
  }

  function lightCandles(fromLauncher=false) {
    cake.classList.remove('smoking');
    cake.classList.add('candles-on');
    cakeScene.classList.add('candles-lit');
    if (fromLauncher) {
      if (state.candlesBlown) {
        state.candlesBlown = false;
        state.candlesRelit = true;
        showToast('呜呼！再许一个愿望~');
      } else {
        showToast('蜡烛点燃了。');
      }
    }
    persist();
  }

  function blowCandles() {
    cake.classList.remove('candles-on');
    cake.classList.add('smoking');
    cakeScene.classList.remove('candles-lit');
    cakeScene.classList.add('celebrated');
    state.candlesBlown = true;
    state.candlesRelit = false;
    unlockAchievement(8, 2150);
    playTone(523.25,.7,0,.011); playTone(659.25,.9,.16,.008); playTone(783.99,1.1,.32,.006);
    fireworkHint.textContent = '';
    fireworkHint.classList.add('fade');
    // 吹灭后：朝天炮作为可选玩具出现（不挂成就、不拦截进度），烟花计数开始。
    showLaunchers();
    const counter = $('#fireworkCounter');
    if (counter) { counter.hidden = false; updateFireworkCounter(); }
    setTimeout(() => cake.classList.remove('smoking'), 1850);
    setTimeout(() => showToast('蜡烛熄灭，好事发生~'), 420);
    persist();
  }

  function stopAutoLaunchers() {
    clearInterval(autoLauncherTimer);
    autoLauncherTimer = null;
  }

  function stopHeartLaunchers() {
    clearInterval(heartLauncherTimer);
    clearTimeout(heartLauncherEndTimer);
    heartLauncherTimer = null;
    heartLauncherEndTimer = null;
    heartLauncherActive = false;
  }

  function launchSpecialFireworks(kind, options = {}) {
    if (!state.launchers || !finalAnimator || !finale.classList.contains('is-visible')) return;
    stopAutoLaunchers();
    stopHeartLaunchers();
    heartLauncherActive = true;
    const launchers = $$('.launcher');
    const maxBursts = Math.min(5, Math.max(1, options.maxBursts || 5));
    const interval = Math.max(560, options.interval || 650);
    let launcherIndex = 0;
    let burstCount = 0;

    const launchOne = () => {
      if (burstCount >= maxBursts) return;
      if (document.hidden || !finalAnimator || !finale.classList.contains('is-visible')) return;
      const launcher = launchers[launcherIndex % launchers.length];
      launcherIndex += 1;
      burstCount += 1;
      const root = phone.getBoundingClientRect();
      const mouth = getLauncherMouth(launcher);
      const isLeft = launcher.classList.contains('launcher-a');
      const xBase = options.xBase || (isLeft ? .49 : .33);
      const xRange = options.xRange || .18;
      const yBase = options.yBase || .12;
      const yRange = options.yRange || .19;
      const tx = root.width * (xBase + Math.random() * xRange);
      const ty = root.height * (yBase + Math.random() * yRange);
      finalAnimator.launchRocket(mouth.x,mouth.y,tx,ty,null,kind,{
        vx:mouth.vx,
        vy:mouth.vy,
        controlDistance:options.controlDistance || 110
      });
      if (burstCount >= maxBursts && heartLauncherTimer) {
        clearInterval(heartLauncherTimer);
        heartLauncherTimer = null;
      }
    };

    launchOne();
    heartLauncherTimer = setInterval(launchOne, interval);
    heartLauncherEndTimer = setTimeout(() => {
      stopHeartLaunchers();
      if (state.launchers && finale.classList.contains('is-visible')) startAutoLaunchers();
    }, 3000);
  }

  function launchHeartFireworks() {
    launchSpecialFireworks('heart', { xBase: .40, xRange: .24, yBase: .12, yRange: .20, controlDistance: 108 });
  }

  function launchStarMessageFireworks() {
    launchSpecialFireworks('message-star', { xBase: .38, xRange: .22, yBase: .12, yRange: .19, controlDistance: 110 });
  }

  function launchMusicNoteFireworks() {
    launchSpecialFireworks('music-note', { xBase: .39, xRange: .22, yBase: .12, yRange: .20, controlDistance: 110, maxBursts: 3, interval: 1000 });
  }

  function getLauncherMouth(launcher) {
    const rowRect = launcherRow.getBoundingClientRect();
    const rootRect = phone.getBoundingClientRect();
    const baseX = rowRect.left - rootRect.left + launcher.offsetLeft + launcher.offsetWidth / 2;
    const baseY = rowRect.top - rootRect.top + launcher.offsetTop + launcher.offsetHeight;
    const angleDeg = launcher.classList.contains('launcher-a') ? 31 : -31;
    const angle = angleDeg * Math.PI / 180;
    const length = Math.max(20, launcher.offsetHeight - 5);
    const vx = Math.sin(angle);
    const vy = -Math.cos(angle);
    return { x: baseX + vx * length, y: baseY + vy * length, vx, vy };
  }

  function startAutoLaunchers() {
    stopAutoLaunchers();
    if (!state.launchers || heartLauncherActive || document.hidden || !finalAnimator || !finale.classList.contains('is-visible')) return;
    autoLauncherTimer = setInterval(() => {
      if (document.hidden || !finalAnimator || !finale.classList.contains('is-visible')) return;
      const launchers=$$('.launcher');
      const launcher=launchers[Math.floor(Math.random()*launchers.length)];
      const root=phone.getBoundingClientRect();
      const mouth=getLauncherMouth(launcher);
      const isLeft=launcher.classList.contains('launcher-a');
      const tx=root.width*(isLeft ? (.42+Math.random()*.42) : (.16+Math.random()*.42));
      const ty=root.height*(.07+Math.random()*.30);
      finalAnimator.launchRocket(mouth.x,mouth.y,tx,ty,null,Math.random()>.6?'willow':null,{vx:mouth.vx,vy:mouth.vy,controlDistance:104});
    }, 1180);
  }

  function showLaunchers() {
    state.launchers = true;
    launcherRow.classList.add('visible');
    launcherRow.setAttribute('aria-hidden','false');
    startAutoLaunchers();
    persist();
  }

  function selectLauncher(event) {
    event.preventDefault();
    event.stopPropagation();
    selectedLauncher = event.currentTarget;
    $$('.launcher').forEach(button => button.classList.toggle('selected', button === selectedLauncher));
    showToast('朝天炮准备好了，再轻触蜡烛。');
  }

  function relightFromSelectedLauncher() {
    if (cake.classList.contains('candles-on')) return;
    if (!selectedLauncher || !finalAnimator) {
      showToast('先点朝天炮，再点蜡烛。');
      return;
    }
    const candle=$('#cakeCandlesTop').getBoundingClientRect(),root=phone.getBoundingClientRect();
    const mouth=getLauncherMouth(selectedLauncher);
    const cx=candle.left-root.left+candle.width/2,cy=candle.top-root.top+candle.height/2;
    const chosen=selectedLauncher;
    selectedLauncher=null;
    $$('.launcher').forEach(button => button.classList.remove('selected'));
    finalAnimator.launchRocket(mouth.x,mouth.y,cx,cy,()=>lightCandles(true),chosen.classList.contains('launcher-a')?'ring':'star',{vx:mouth.vx,vy:mouth.vy,controlDistance:88});
  }

  function startHold(event) {
    if (!cake.classList.contains('candles-on')) return;
    event.preventDefault();
    holdStart=performance.now();
    const ring=$('.hold-ring',blowButton);
    const draw=now=>{ const p=Math.min(1,(now-holdStart)/2600); ring.style.width=`${p*100}%`; if(p>=1){cancelHold();blowCandles();} else holdFrame=requestAnimationFrame(draw); };
    holdFrame=requestAnimationFrame(draw);
    holdTimer=setTimeout(()=>{},2600);
  }
  function cancelHold(){ clearTimeout(holdTimer);holdTimer=null;cancelAnimationFrame(holdFrame);holdFrame=null;const ring=$('.hold-ring',blowButton);if(ring)ring.style.width='0'; }

  function checkMessage(text) {
    // 留言关键词不再解锁成就（十项成就均有各自的明确触发点）。
    // 「音乐」「星星」「爱」仍触发三种特殊烟花；「礼物」只显示一句专属提示。
    const words = C.achievementWords;
    if (state.launchers && text.includes(words.stars)) {
      launchStarMessageFireworks();
      showToast('夜空收到了留言并摘下星星送给你。');
      return true;
    }
    if (state.launchers && text.includes(words.music)) {
      launchMusicNoteFireworks();
      showToast('夜空收到了留言并让叶子哼起了歌。');
      return true;
    }
    if (state.launchers && text.includes(words.love)) {
      launchHeartFireworks();
      showToast('夜空收到了留言并向你比了个心。');
      return true;
    }
    if (text.includes(words.keepsake)) {
      showToast('夜空替你收好了这份心意。');
      return true;
    }
    return false;
  }

  function showToast(message) {
    toast.textContent = message;
    clearTimeout(showToast.timer);
    const supportsPopover = typeof toast.showPopover === 'function';
    if (supportsPopover) {
      try {
        if (toast.matches(':popover-open')) toast.hidePopover();
        toast.showPopover();
      } catch {}
    } else {
      const openDialogs = $$('dialog[open]');
      (openDialogs.at(-1) || phone).appendChild(toast);
    }
    toast.classList.add('show');
    showToast.timer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (supportsPopover && toast.matches(':popover-open')) {
          try { toast.hidePopover(); } catch {}
        }
      }, 420);
    }, 2900);
  }

  function escapeHtml(value) { return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

  function initSky() {
    const canvas=$('#sky'),ctx=canvas.getContext('2d'); let stars=[],raf,lastDraw=0,width=0,height=0;
    function resize(){const rect=phone.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);width=rect.width;height=rect.height;canvas.width=width*dpr;canvas.height=height*dpr;canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;ctx.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:88},()=>({x:Math.random()*width,y:Math.random()*height,r:Math.random()*.78+.15,a:Math.random()*.38+.06,s:Math.random()*.00135+.00035,p:Math.random()*6.28}));}
    function render(t){raf=requestAnimationFrame(render);if(document.hidden||finale.classList.contains('is-visible')||t-lastDraw<16)return;lastDraw=t;ctx.clearRect(0,0,width,height);stars.forEach(s=>{const a=Math.max(.025,s.a+Math.sin(t*s.s+s.p)*.1);ctx.beginPath();ctx.fillStyle=`rgba(242,235,216,${a})`;ctx.arc(s.x,s.y,s.r,0,6.28);ctx.fill();});}resize();new ResizeObserver(resize).observe(phone);raf=requestAnimationFrame(render);
  }

  async function resetAll() {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    await transitionToSilence({ mainDuration: 850, birthdayDuration: 850 });
    try { song.currentTime = 0; } catch {}
    try { birthdayMusic.currentTime = 0; } catch {}
    location.reload();
  }

  $('#dialogClose').addEventListener('click',closeDialog);
  memoryDialog.addEventListener('click',event=>{const rect=memoryDialog.getBoundingClientRect();if(event.clientY<rect.top)closeDialog();});
  $('#achievementButton').addEventListener('click',()=>{
    setAchievementHomeMessage();
    achievementDialog.showModal();
  });
  $('#achievementClose').addEventListener('click',()=>achievementDialog.close());
  achievementGrid.addEventListener('click', event => {
    const button = event.target.closest('.achievement-item[data-id]');
    if (!button) return;
    showAchievementDetail(Number(button.dataset.id));
  });
  achievementDialog.addEventListener('click',event=>{const rect=achievementDialog.getBoundingClientRect();if(event.clientY<rect.top)achievementDialog.close();});
  $('#achievementUnlock').addEventListener('click', event => {
    if (!event.target.closest('.achievement-unlock-card')) closeAchievementUnlock();
  });
  $('#achievementUnlock').addEventListener('cancel', event => {
    event.preventDefault();
    closeAchievementUnlock();
  });
  $('#musicButton').addEventListener('click',toggleMusic);
  const resetConfirmDialog = $('#resetConfirmDialog');
  $('#resetButton').addEventListener('click', () => {
    if (!resetConfirmDialog.open) resetConfirmDialog.showModal();
  });
  $('#resetCancel').addEventListener('click', () => resetConfirmDialog.close());
  $('#resetConfirm').addEventListener('click', () => {
    $('#resetConfirm').disabled = true;
    resetConfirmDialog.close();
    void resetAll();
  });
  resetConfirmDialog.addEventListener('click', event => {
    const rect = resetConfirmDialog.getBoundingClientRect();
    if (event.target === resetConfirmDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) resetConfirmDialog.close();
  });
  song.addEventListener('play',()=>{musicIcon.textContent='Ⅱ';phone.classList.add('sound-awake');});
  song.addEventListener('pause',()=>{if(!ambient)musicIcon.textContent='♪';});
  song.addEventListener('ended',()=>musicIcon.textContent='♪');
  birthdayMusic.loop = true;
  birthdayMusic.addEventListener('play',()=>{musicIcon.textContent='Ⅱ';phone.classList.add('sound-awake');});
  birthdayMusic.addEventListener('pause',()=>{if(song.paused&&!ambient)musicIcon.textContent='♪';});
  birthdayMusic.addEventListener('ended',()=>musicIcon.textContent='♪');
  birthdayMusic.addEventListener('error',()=>showToast('生日歌加载失败，请刷新页面后重试'));
  song.addEventListener('error',()=>showToast('音乐文件加载失败，请刷新页面后重试'));
  $('#letterBack').addEventListener('click',hideLetterJourney);
  deliveredLetter.addEventListener('click',showLetterView);
  $('#letterViewBack').addEventListener('click',foldLetterBackToJourney);
  $('#finaleBack').addEventListener('click',hideFinale);
  cake.addEventListener('click',event=>{
    event.stopPropagation();
    // 蜡烛一律经由朝天炮点燃：先点礼炮，再点蜡烛。
    if (cake.classList.contains('candles-on')) return;
    relightFromSelectedLauncher();
  });
  blowButton.addEventListener('pointerdown',startHold);
  ['pointerup','pointercancel','pointerleave'].forEach(type=>blowButton.addEventListener(type,cancelHold));
  $$('.launcher').forEach(button=>button.addEventListener('click',selectLauncher));
  messageBox.addEventListener('submit', event => {
    event.preventDefault();
    const input = $('#finalMessage');
    const value = input.value.trim();
    if (!value) return;
    state.message = '';
    const heartTriggered = checkMessage(value);
    persist();
    input.value = '';
    input.style.height = '';
    $('#messageStatus').textContent = '这句话只留在当前浏览器里。';
    if (!heartTriggered) showToast('夜空收到了留言并向你眨了眨眼睛。');
  });
  $('#finalMessage').value='';
  $('#finalMessage').addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.isComposing) {
      event.preventDefault();
      messageBox.requestSubmit();
    }
  });
  $('#finalMessage').addEventListener('input', event => {
    const field = event.currentTarget;
    const singleLine = field.value.replace(/\s*[\r\n]+\s*/g, ' ');
    if (singleLine !== field.value) field.value = singleLine;
    field.style.height = '39px';
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoLaunchers();
      return;
    }
    if (musicGraphMode === 'webaudio' && (!song.paused || !birthdayMusic.paused)) ensureAudio();
    if (state.launchers && finale.classList.contains('is-visible')) startAutoLaunchers();
  });

  document.addEventListener('pointerdown',event=>{
    if (!state.completed.has(1) && !event.target.closest('button,input,dialog')) startAmbient();
  },{once:true,capture:true});

  applyPalette();
  createStars();
  createProgressDots();
  createCandles();
  initSky();
  updateState();
  scheduleMeteors();
  const counterEl = $('#fireworkCounter');
  if (counterEl) counterEl.innerHTML = `已点亮 <b id="fireworkCount">0</b> / ${MILESTONES.total} 朵`;
  $$('.gift-card').forEach((card, i) => {
    const front = $('.card-front-text', card);
    if (front && finaleCards[i]) front.textContent = finaleCards[i];
    card.addEventListener('click', () => flipGiftCard(i, card));
  });
  const giftBoxButton = $('#giftBox');
  if (giftBoxButton) giftBoxButton.addEventListener('click', openGiftBox);
  setTimeout(()=>phone.classList.add('ready','reveal-1'),180);
  setTimeout(()=>phone.classList.add('reveal-2'),820);
  setTimeout(()=>phone.classList.add('reveal-3'),1500);
  setTimeout(()=>phone.classList.add('reveal-4'),2180);
})();
