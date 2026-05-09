export const languageOrder = ['ja', 'en', 'zh'] as const;

export type Language = (typeof languageOrder)[number];

export const translations = {
  ja: {
    htmlLang: 'ja',
    locale: 'ja-JP',
    shortLabel: 'JP',
    label: '日本語',
    languageLabel: '表示言語',
    siteName: 'ゲーム開發集會',
    eyebrow: 'Game Development Meetup',
    nav: {
      about: 'イベントについて',
      host: 'うゆ',
      videos: '動画',
      links: 'リンク',
    },
    heroTitle: 'ゲーム開發集會へようこそ',
    heroSummary:
      'ゲーム開発に興味がある人のための、VRChat上のゆるやかな交流会です。',
    nextEvent: '次回開催',
    tokyoTime: '日本時間',
    buttons: {
      vrchatGroup: 'VRChat Group',
      discord: 'Discordに参加',
    },
    participation: {
      title: '参加方法',
      vrchat: '参加はVRChat Groupから',
      discord: '発表希望はDiscordに投稿',
    },
    about: {
      eyebrow: 'About',
      title: 'イベントについて',
      introTitle: 'うゆちゃんが、集会まで案内します',
      intro:
        '参加はVRChat Groupから。LTや作品発表をしたい人はDiscordに書くだけで、うゆが必要なお知らせを届けます。',
      note: 'うゆの魔法が、集会に必要なお知らせをそっと届けます。',
    },
    linksSection: {
      eyebrow: 'Links',
      title: '参加する',
      description: '集会に入る場所と、発表・告知を書く場所を分けて用意しています。',
    },
    photos: {
      eyebrow: 'Photos',
      title: '集会の様子',
      alt: 'VRChat内で開催されたゲーム開發集會のスクリーンショット',
      previous: '前の画像',
      next: '次の画像',
      expand: '画像を拡大表示',
    },
    host: {
      eyebrow: 'Host',
      title: '案内役は、うゆ',
      lead:
        'うゆちゃんは、ゲーム開發集會の案内役。Discordに届いた発表や作品紹介を読み取り、みんなへ知らせてくれます。',
      automationTitle: 'うゆの魔法でめぐります',
      automation:
        'Discordに届いた投稿をうゆが受け取り、告知や発表情報として集会へ届けます。',
      submitTitle: '発表したいとき',
      submit:
        'タイトル・発表者・日時・URLを書くだけ。うゆが内容を読み取り、お知らせします。',
      quote: 'さあ、行こう。まだ見ぬ世界へ！',
      steps: ['Discordに投稿', 'うゆが受け取る', '集会へ届く'],
    },
    videos: {
      eyebrow: 'Archive',
      title: 'LT・作品発表',
      description: 'これまでのライトニングトークや作品発表のアーカイブです。',
      open: 'YouTubeで見る',
      iframeTitle: 'ゲーム開發集會のLT・作品発表動画',
      items: ['LT・作品発表 #1', 'LT・作品発表 #2', 'LT・作品発表 #3', 'LT・作品発表 #4'],
    },
    eventPoints: {
      welcome: {
        title: '初めてでも大丈夫',
        text: 'ゲーム開発に興味があれば、経験や役割は問いません。',
      },
      time: {
        titlePrefix: 'あなたの時間',
        textPrefix: '日本時間では',
        textSuffix: 'に開催。VRChat Groupからイベント情報を確認できます。',
      },
      free: {
        title: '発表も雑談も自由',
        text: '相談、雑談、進捗共有、作品紹介を気軽に持ち寄れます。',
      },
    },
    links: {
      discord: {
        title: 'Discordに参加',
        description: '発表投稿・告知・交流はこちら。',
      },
      vrchat: {
        title: 'VRChat Group',
        description: '集会への参加入口はこちら。',
      },
      github: {
        title: 'GitHub',
        description: 'プロジェクトやツールを公開中！',
      },
      website: {
        title: 'Web Site',
        description: '元サイト・イベント情報はこちら！',
      },
    },
    footerSuffix: 'In VRChat',
  },
  en: {
    htmlLang: 'en',
    locale: 'en-US',
    shortLabel: 'EN',
    label: 'English',
    languageLabel: 'Display language',
    siteName: 'Game Development Meetup',
    eyebrow: 'Game Development Meetup',
    nav: {
      about: 'About',
      host: 'Uyu',
      videos: 'Videos',
      links: 'Links',
    },
    heroTitle: 'Welcome to Game Development Meetup',
    heroSummary:
      'A relaxed VRChat meetup for people interested in game development.',
    nextEvent: 'Next meetup',
    tokyoTime: 'Tokyo time',
    buttons: {
      vrchatGroup: 'VRChat Group',
      discord: 'Join Discord',
    },
    participation: {
      title: 'How to join',
      vrchat: 'Join from the VRChat Group.',
      discord: 'Post showcase requests in Discord.',
    },
    about: {
      eyebrow: 'About',
      title: 'About the Event',
      introTitle: 'Uyu guides everyone to the meetup',
      intro:
        'Join from the VRChat Group. If you want to give a talk or show a project, post it in Discord and Uyu will carry the notice to the meetup.',
      note: "Uyu's magic quietly carries the notices the meetup needs.",
    },
    linksSection: {
      eyebrow: 'Links',
      title: 'Join the Meetup',
      description: 'Use the VRChat Group to attend, and Discord for talks, announcements, and community updates.',
    },
    photos: {
      eyebrow: 'Photos',
      title: 'Meetup Scenes',
      alt: 'Screenshot from the Game Development Meetup in VRChat',
      previous: 'Previous image',
      next: 'Next image',
      expand: 'Open larger image',
    },
    host: {
      eyebrow: 'Host',
      title: 'Meet Uyu, the guide',
      lead:
        'Uyu is the guide of Game Development Meetup. She reads talks and showcase posts from Discord and announces them to everyone.',
      automationTitle: "Guided by Uyu's magic",
      automation:
        'Uyu receives posts sent to Discord and carries them to the meetup as announcements and showcase notes.',
      submitTitle: 'When you want to present',
      submit:
        'Post the title, presenter, date, and URL. Uyu reads it and sends the notice.',
      quote: 'Let us go. Toward worlds we have yet to see.',
      steps: ['Post in Discord', 'Uyu receives it', 'It reaches the meetup'],
    },
    videos: {
      eyebrow: 'Archive',
      title: 'LTs and Showcases',
      description: 'An archive of past lightning talks and project showcase sessions.',
      open: 'Watch on YouTube',
      iframeTitle: 'Game Development Meetup talk and showcase video',
      items: ['Talk / Showcase #1', 'Talk / Showcase #2', 'Talk / Showcase #3', 'Talk / Showcase #4'],
    },
    eventPoints: {
      welcome: {
        title: 'Easy to join',
        text: 'If you are interested in game development, you are welcome.',
      },
      time: {
        titlePrefix: 'Your time',
        textPrefix: 'In Tokyo time, this event is',
        textSuffix: '. Check the VRChat Group for event details.',
      },
      free: {
        title: 'Talks and chat are open',
        text: 'Bring questions, progress, playtests, talks, or anything you want to share.',
      },
    },
    links: {
      discord: {
        title: 'Join Discord',
        description: 'Talk submissions, announcements, and chat.',
      },
      vrchat: {
        title: 'VRChat Group',
        description: 'The entrance to the meetup instance.',
      },
      github: {
        title: 'GitHub',
        description: 'Projects and tools are published here.',
      },
      website: {
        title: 'Web Site',
        description: 'Original website and event information.',
      },
    },
    footerSuffix: 'In VRChat',
  },
  zh: {
    htmlLang: 'zh-CN',
    locale: 'zh-CN',
    shortLabel: '中文',
    label: '中文',
    languageLabel: '显示语言',
    siteName: '游戏开发集会',
    eyebrow: 'Game Development Meetup',
    nav: {
      about: '活动介绍',
      host: 'Uyu',
      videos: '视频',
      links: '链接',
    },
    heroTitle: '欢迎来到游戏开发集会',
    heroSummary:
      '面向游戏开发兴趣者的 VRChat 轻松交流会。',
    nextEvent: '下次举办',
    tokyoTime: '日本时间',
    buttons: {
      vrchatGroup: 'VRChat Group',
      discord: '加入 Discord',
    },
    participation: {
      title: '参加方式',
      vrchat: '从 VRChat Group 参加。',
      discord: '想发表时在 Discord 投稿。',
    },
    about: {
      eyebrow: 'About',
      title: '活动介绍',
      introTitle: 'Uyu 会引导大家来到集会',
      intro:
        '参加请加入 VRChat Group。想演讲或展示作品时，只要写在 Discord，Uyu 就会把通知带到集会中。',
      note: 'Uyu 的魔法会悄悄把集会需要的通知送到大家身边。',
    },
    linksSection: {
      eyebrow: 'Links',
      title: '参加集会',
      description: 'VRChat Group 用于参加集会，Discord 用于投稿、公告和交流。',
    },
    photos: {
      eyebrow: 'Photos',
      title: '集会现场',
      alt: 'VRChat 中游戏开发集会的截图',
      previous: '上一张图片',
      next: '下一张图片',
      expand: '放大图片',
    },
    host: {
      eyebrow: 'Host',
      title: '引导者 Uyu',
      lead:
        'Uyu 是游戏开发集会的引导者。她会读取 Discord 中的演讲和作品投稿，并通知大家。',
      automationTitle: '由 Uyu 的魔法引导',
      automation:
        'Uyu 会接收 Discord 中的投稿，并作为公告或作品发表信息送到集会中。',
      submitTitle: '想要发表时',
      submit:
        '写下标题、发表者、日期和 URL 即可。Uyu 会读取内容并发送通知。',
      quote: '走吧。前往还未见过的世界。',
      steps: ['在 Discord 投稿', 'Uyu 接收', '送到集会'],
    },
    videos: {
      eyebrow: 'Archive',
      title: '闪电演讲与作品发表',
      description: '这里收录了过去的闪电演讲和作品发表视频。',
      open: '在 YouTube 观看',
      iframeTitle: '游戏开发集会的演讲和作品发表视频',
      items: ['演讲 / 作品发表 #1', '演讲 / 作品发表 #2', '演讲 / 作品发表 #3', '演讲 / 作品发表 #4'],
    },
    eventPoints: {
      welcome: {
        title: '初次参加也没问题',
        text: '只要对游戏开发感兴趣都欢迎参加。',
      },
      time: {
        titlePrefix: '你的当地时间',
        textPrefix: '日本时间为',
        textSuffix: '。请在 VRChat Group 中确认活动信息。',
      },
      free: {
        title: '发表和交流都很自由',
        text: '可以分享咨询、进度、试玩反馈、演讲或作品。',
      },
    },
    links: {
      discord: {
        title: '加入 Discord',
        description: '投稿、公告和交流在这里。',
      },
      vrchat: {
        title: 'VRChat Group',
        description: '进入集会实例的入口。',
      },
      github: {
        title: 'GitHub',
        description: '项目和工具在这里公开。',
      },
      website: {
        title: 'Web Site',
        description: '原网站和活动信息。',
      },
    },
    footerSuffix: 'In VRChat',
  },
} as const;

export function isLanguage(value: string | null): value is Language {
  return languageOrder.includes(value as Language);
}
