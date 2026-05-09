export const siteConfig = {
  name: 'ゲーム開發集會',
  englishName: 'Game Development Meetup',
  description:
    'VRChatで活動するゲーム開発者とクリエイターのための、ゆるやかな交流・制作コミュニティ。',
  assets: {
    icon: '/site-icon.svg',
    host: '/characters/uyu-host.png',
    heroImage: '/screenshots/meetup-2026-01-18.webp',
    photos: [
      '/screenshots/meetup-2026-01-18.webp',
      '/screenshots/meetup-2025-11-09.webp',
      '/screenshots/meetup-2024-11-10.webp',
    ],
  },
  event: {
    schedule: '隔週日曜日 21:00～22:00',
    timezone: '日本時間',
    timeZoneId: 'Asia/Tokyo',
    utcOffsetHours: 9,
    firstDate: '2026-05-10',
    firstEventNumber: 107,
    startHour: 21,
    startMinute: 0,
    durationMinutes: 60,
    intervalDays: 14,
    summary:
      'ゲーム開発に興味がある人なら誰でも参加できます。内容は固定せず、ゲーム開発に関する交流の場として自由に利用できます。',
  },
  urls: {
    contentJson: 'https://gdm.tik-choco.com/website/content.json',
    discord: 'https://discord.gg/Mes3nP3mZt',
    vrchatGroup: 'https://vrc.group/GAME.2515',
    website: 'https://metaverse-gdm.github.io/ja/',
    github: 'https://github.com/metaverse-gdm',
    gallery: '#gallery',
  },
  videos: [
    {
      id: '8S-E8wB3ozk',
      url: 'https://youtu.be/8S-E8wB3ozk',
    },
    {
      id: 'MSp6O8eGbME',
      url: 'https://youtu.be/MSp6O8eGbME',
    },
    {
      id: 'Dat6KH4RSUU',
      url: 'https://youtu.be/Dat6KH4RSUU',
    },
    {
      id: 'uif7U46RV0M',
      url: 'https://youtu.be/uif7U46RV0M',
    },
  ],
};

export const communityLinks = [
  {
    key: 'discord',
    icon: 'messages',
    title: 'Discordに参加',
    description: 'おしゃべり・イベント情報はこちら！',
    url: siteConfig.urls.discord,
  },
  {
    key: 'vrchat',
    icon: 'group',
    title: 'VRChat Group',
    description: 'グループに参加して集会へ！',
    url: siteConfig.urls.vrchatGroup,
  },
  {
    key: 'github',
    icon: 'github',
    title: 'GitHub',
    description: 'プロジェクトやツールを公開中！',
    url: siteConfig.urls.github,
  },
  {
    key: 'website',
    icon: 'website',
    title: 'Web Site',
    description: '元サイト・イベント情報はこちら！',
    url: siteConfig.urls.website,
  },
] as const;
