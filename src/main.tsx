import { render } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Globe,
  HeartHandshake,
  MessagesSquare,
  X,
} from 'lucide-preact';
import { communityLinks, siteConfig } from './config';
import { isLanguage, languageOrder, translations, type Language } from './i18n';
import './style.css';

type ContentConfig = {
  assets: typeof siteConfig.assets;
  urls: typeof siteConfig.urls;
  videos: typeof siteConfig.videos;
};

type ContentVideo = {
  id: string;
  url: string;
};

const communityIcons = {
  messages: MessagesSquare,
  group: HeartHandshake,
  github: Github,
  website: Globe,
};

const dayInMs = 24 * 60 * 60 * 1000;

const fallbackContent: ContentConfig = {
  assets: siteConfig.assets,
  urls: siteConfig.urls,
  videos: siteConfig.videos,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function getYouTubeVideoId(url: string) {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.split('/').filter(Boolean)[0];
    }

    if (parsedUrl.searchParams.has('v')) {
      return parsedUrl.searchParams.get('v') ?? undefined;
    }

    const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
    const embedIndex = pathParts.findIndex((part) => part === 'embed' || part === 'shorts');

    if (embedIndex >= 0) {
      return pathParts[embedIndex + 1];
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function normalizeVideos(value: unknown): ContentVideo[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const videos = value.flatMap((item) => {
    if (typeof item === 'string') {
      const id = getYouTubeVideoId(item);
      return id ? [{ id, url: item }] : [];
    }

    if (!isRecord(item) || typeof item.url !== 'string') {
      return [];
    }

    const id = typeof item.id === 'string' ? item.id : getYouTubeVideoId(item.url);
    return id ? [{ id, url: item.url }] : [];
  });

  return videos.length > 0 ? videos : undefined;
}

function uniqueStrings(values: string[]) {
  return [...new Set(values)];
}

function uniqueVideos(videos: ContentVideo[]) {
  const seen = new Set<string>();

  return videos.filter((video) => {
    const key = video.url || video.id;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function mergeContentConfig(value: unknown): ContentConfig {
  if (!isRecord(value)) {
    return fallbackContent;
  }

  const assets = isRecord(value.assets) ? value.assets : {};
  const urls = isRecord(value.urls) ? value.urls : {};

  return {
    assets: {
      icon: typeof assets.icon === 'string' ? assets.icon : siteConfig.assets.icon,
      host: typeof assets.host === 'string' ? assets.host : siteConfig.assets.host,
      heroImage: typeof assets.heroImage === 'string' ? assets.heroImage : siteConfig.assets.heroImage,
      photos: isStringArray(assets.photos) && assets.photos.length > 0
        ? uniqueStrings([...siteConfig.assets.photos, ...assets.photos])
        : siteConfig.assets.photos,
    },
    urls: {
      contentJson: siteConfig.urls.contentJson,
      discord: typeof urls.discord === 'string' ? urls.discord : siteConfig.urls.discord,
      vrchatGroup: typeof urls.vrchatGroup === 'string' ? urls.vrchatGroup : siteConfig.urls.vrchatGroup,
      website: typeof urls.website === 'string' ? urls.website : siteConfig.urls.website,
      github: typeof urls.github === 'string' ? urls.github : siteConfig.urls.github,
      gallery: typeof urls.gallery === 'string' ? urls.gallery : siteConfig.urls.gallery,
    },
    videos: normalizeVideos(value.videos)
      ? uniqueVideos([...siteConfig.videos, ...normalizeVideos(value.videos)!])
      : siteConfig.videos,
  };
}

function getInitialLanguage(): Language {
  const savedLanguage = window.localStorage.getItem('gdm-language');

  if (isLanguage(savedLanguage)) {
    return savedLanguage;
  }

  const browserLanguage = window.navigator.language.toLowerCase();

  if (browserLanguage.startsWith('zh')) {
    return 'zh';
  }

  if (browserLanguage.startsWith('en')) {
    return 'en';
  }

  return 'ja';
}

function getEventStartMs(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return Date.UTC(
    year,
    month - 1,
    day,
    siteConfig.event.startHour - siteConfig.event.utcOffsetHours,
    siteConfig.event.startMinute,
  );
}

function getNextEventInfo() {
  const anchorStartMs = getEventStartMs(siteConfig.event.firstDate);
  const eventEndMs = anchorStartMs + siteConfig.event.durationMinutes * 60 * 1000;
  const intervalMs = siteConfig.event.intervalDays * dayInMs;
  const nowMs = Date.now();

  if (nowMs <= eventEndMs) {
    return {
      start: new Date(anchorStartMs),
      number: siteConfig.event.firstEventNumber,
    };
  }

  const intervalCount = Math.floor((nowMs - eventEndMs) / intervalMs) + 1;
  return {
    start: new Date(anchorStartMs + intervalCount * intervalMs),
    number: siteConfig.event.firstEventNumber + intervalCount,
  };
}

function getTimeZoneLabel(date: Date, locale: string, timeZone?: string) {
  const parts = new Intl.DateTimeFormat(locale, {
    timeZone,
    timeZoneName: 'short',
  }).formatToParts(date);

  return parts.find((part) => part.type === 'timeZoneName')?.value;
}

function formatEventDate(start: Date, locale: string, timeZone?: string) {
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(start);
}

function formatEventTimeRange(start: Date, locale: string, timeZone?: string, showTimeZone = false) {
  const end = new Date(start.getTime() + siteConfig.event.durationMinutes * 60 * 1000);
  const timeFormatter = new Intl.DateTimeFormat(locale, {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
  const timeZoneLabel = showTimeZone ? getTimeZoneLabel(start, locale, timeZone) : undefined;
  const suffix = timeZoneLabel ? ` ${timeZoneLabel}` : '';

  return `${timeFormatter.format(start)}-${timeFormatter.format(end)}${suffix}`;
}

function formatEventNumber(eventNumber: number, language: Language) {
  if (language === 'en') {
    return `Meetup #${eventNumber}`;
  }

  return `第${eventNumber}回`;
}

function getCommunityLinkUrl(key: (typeof communityLinks)[number]['key'], urls: ContentConfig['urls']) {
  if (key === 'vrchat') {
    return urls.vrchatGroup;
  }

  return urls[key];
}

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [content, setContent] = useState<ContentConfig>(fallbackContent);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const t = translations[language];
  const photos = content.assets.photos;
  const nextEventInfo = useMemo(getNextEventInfo, []);
  const nextEventStart = nextEventInfo.start;
  const nextEventNumber = useMemo(
    () => formatEventNumber(nextEventInfo.number, language),
    [nextEventInfo.number, language],
  );
  const nextEventLocalDate = useMemo(
    () => formatEventDate(nextEventStart, t.locale),
    [nextEventStart, t.locale],
  );
  const nextEventLocalTime = useMemo(
    () => formatEventTimeRange(nextEventStart, t.locale),
    [nextEventStart, t.locale],
  );
  const nextEventTokyoTime = useMemo(
    () => formatEventTimeRange(nextEventStart, t.locale, siteConfig.event.timeZoneId, language !== 'ja'),
    [nextEventStart, t.locale, language],
  );

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    window.localStorage.setItem('gdm-language', language);
  }, [language, t.htmlLang]);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(siteConfig.urls.contentJson, {
      cache: 'no-store',
      signal: abortController.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load content JSON: ${response.status}`);
        }

        return response.json();
      })
      .then((json) => {
        setContent(mergeContentConfig(json));
        setHeroImageIndex(0);
        setSelectedPhotoIndex(null);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        console.warn(error);
      });

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroImageIndex((current) => (current + 1) % photos.length);
    }, 6500);

    return () => window.clearInterval(intervalId);
  }, [photos.length]);

  useEffect(() => {
    if (selectedPhotoIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPhotoIndex(null);
      }

      if (event.key === 'ArrowLeft') {
        setSelectedPhotoIndex((current) =>
          current === null
            ? current
            : (current - 1 + photos.length) % photos.length,
        );
      }

      if (event.key === 'ArrowRight') {
        setSelectedPhotoIndex((current) =>
          current === null ? current : (current + 1) % photos.length,
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photos.length, selectedPhotoIndex]);

  const showPreviousHeroImage = () => {
    setHeroImageIndex(
      (current) => (current - 1 + photos.length) % photos.length,
    );
  };

  const showNextHeroImage = () => {
    setHeroImageIndex((current) => (current + 1) % photos.length);
  };

  const showPreviousPhoto = () => {
    setSelectedPhotoIndex((current) =>
      current === null
        ? current
        : (current - 1 + photos.length) % photos.length,
    );
  };

  const showNextPhoto = () => {
    setSelectedPhotoIndex((current) =>
      current === null ? current : (current + 1) % photos.length,
    );
  };

  const links = communityLinks.map((link) => ({
    ...link,
    url: getCommunityLinkUrl(link.key, content.urls),
  }));
  const primaryLinks = ['vrchat', 'discord'].map((key) =>
    links.find((link) => link.key === key),
  ).filter((link): link is (typeof links)[number] => Boolean(link));
  const secondaryLinks = links.filter(
    (link) => link.key === 'github' || link.key === 'website',
  );

  return (
    <main class="site-shell">
      <header class="nav">
        <a class="brand" href="#">
          <img src={siteConfig.assets.icon} alt="" width="34" height="34" />
          <span>{t.siteName}</span>
        </a>
        <nav class="nav-links" aria-label={t.nav.links}>
          <a href="#host">{t.nav.host}</a>
          <a href="#links">{t.nav.links}</a>
          <a href="#videos">{t.nav.videos}</a>
        </nav>
        <div class="nav-tools">
          <div class="language-switcher" aria-label={t.languageLabel}>
            {languageOrder.map((item) => (
              <button
                type="button"
                class={item === language ? 'active' : ''}
                aria-pressed={item === language}
                onClick={() => setLanguage(item)}
                key={item}
              >
                {translations[item].shortLabel}
              </button>
            ))}
          </div>
          <a
            class="nav-cta"
            href={content.urls.discord}
            target="_blank"
            rel="noreferrer"
          >
            Discord
            <ExternalLink size={16} />
          </a>
        </div>
      </header>

      <section class="hero">
        <div class="hero-slides" aria-hidden="true">
          {photos.map((photo, index) => (
            <img
              class={index === heroImageIndex ? 'hero-image active' : 'hero-image'}
              src={photo}
              alt=""
              key={photo}
            />
          ))}
        </div>
        <div class="hero-image-controls" aria-label={t.photos.title}>
          <button type="button" onClick={showPreviousHeroImage} aria-label={t.photos.previous}>
            <ChevronLeft size={22} />
          </button>
          <button type="button" onClick={showNextHeroImage} aria-label={t.photos.next}>
            <ChevronRight size={22} />
          </button>
        </div>
        <div class="hero-overlay" />
        <div class="hero-content">
          <div class="hero-copy-block">
            <p class="eyebrow">{t.eyebrow}</p>
            <h1>{t.heroTitle}</h1>
            <p class="hero-copy">{t.heroSummary}</p>
          </div>
          <div class="hero-action-panel">
            <div class="schedule">
              <CalendarClock size={22} />
              <span>
                <b>
                  {t.nextEvent}
                  <i>{nextEventNumber}</i>
                </b>
                <strong>{nextEventLocalDate}</strong>
                <em>{nextEventLocalTime}</em>
              </span>
              <small>{t.tokyoTime}: {nextEventTokyoTime}</small>
            </div>
            <div class="hero-actions">
              <a
                class="primary-button"
                href={content.urls.vrchatGroup}
                target="_blank"
                rel="noreferrer"
              >
                {t.buttons.vrchatGroup}
                <ChevronRight size={20} />
              </a>
              <a
                class="secondary-button"
                href={content.urls.discord}
                target="_blank"
                rel="noreferrer"
              >
                {t.buttons.discord}
              </a>
            </div>
            <div class="participation-note" aria-label={t.participation.title}>
              <b>{t.participation.title}</b>
              <span>{t.participation.vrchat}</span>
              <span>{t.participation.discord}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section host-section" id="host">
        <div class="host-layout">
          <div class="host-visual">
            <img src={content.assets.host} alt={t.host.title} loading="lazy" />
          </div>
          <div class="host-copy">
            <p class="eyebrow">{t.host.eyebrow}</p>
            <h2>{t.host.title}</h2>
            <p class="host-lead">{t.host.lead}</p>
            <ol class="host-steps">
              {t.host.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div class="host-note-row">
              <p>{t.host.automation}</p>
              <p>{t.host.quote}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section links-section" id="links">
        <div class="section-heading section-heading-with-copy">
          <div>
            <p class="eyebrow">{t.linksSection.eyebrow}</p>
            <h2>{t.linksSection.title}</h2>
          </div>
          <p>{t.linksSection.description}</p>
        </div>
        <div class="links-panel">
          <div class="links-primary">
            {primaryLinks.map((link) => {
              const Icon = communityIcons[link.icon];
              const linkText = t.links[link.key];
              return (
                <a
                  class={`resource-link primary-resource ${link.key}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  key={link.key}
                >
                  <Icon size={30} />
                  <span>
                    <strong>{linkText.title}</strong>
                    {linkText.description}
                  </span>
                  <ExternalLink size={18} />
                </a>
              );
            })}
          </div>
          <div class="links-secondary">
            {secondaryLinks.map((link) => {
              const Icon = communityIcons[link.icon];
              const linkText = t.links[link.key];
              return (
                <a
                  class="resource-link secondary-resource"
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  key={link.key}
                >
                  <Icon size={22} />
                  <span>
                    <strong>{linkText.title}</strong>
                    {linkText.description}
                  </span>
                  <ExternalLink size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section class="section videos-section" id="videos">
        <div class="section-heading section-heading-with-copy">
          <div>
            <p class="eyebrow">{t.videos.eyebrow}</p>
            <h2>{t.videos.title}</h2>
          </div>
          <p>{t.videos.description}</p>
        </div>
        <div class="video-grid">
          {content.videos.map((video, index) => (
            <article class="video-card" key={video.id}>
              <div class="video-frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={`${t.videos.iframeTitle} ${index + 1}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div class="video-meta">
                <h3>{t.videos.items[index] ?? `${t.videos.title} #${index + 1}`}</h3>
                <a href={video.url} target="_blank" rel="noreferrer">
                  {t.videos.open}
                  <ExternalLink size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section class="photo-strip" aria-labelledby="photos-title">
        <div class="section-heading">
          <p class="eyebrow">{t.photos.eyebrow}</p>
          <h2 id="photos-title">{t.photos.title}</h2>
        </div>
        <div class="photo-grid">
          {photos.map((photo, index) => (
            <button
              type="button"
              class="photo-button"
              onClick={() => setSelectedPhotoIndex(index)}
              aria-label={`${t.photos.expand} ${index + 1}`}
              key={photo}
            >
              <img src={photo} alt={t.photos.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      <footer>
        © {t.siteName} 2024-2026 / {t.footerSuffix}
      </footer>

      {selectedPhotoIndex !== null && (
        <div
          class="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t.photos.alt}
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <button
            type="button"
            class="lightbox-close"
            aria-label="Close"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <X size={24} />
          </button>
          <button
            type="button"
            class="lightbox-nav previous"
            aria-label={t.photos.previous}
            onClick={(event) => {
              event.stopPropagation();
              showPreviousPhoto();
            }}
          >
            <ChevronLeft size={30} />
          </button>
          <img
            src={photos[selectedPhotoIndex]}
            alt={t.photos.alt}
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            class="lightbox-nav next"
            aria-label={t.photos.next}
            onClick={(event) => {
              event.stopPropagation();
              showNextPhoto();
            }}
          >
            <ChevronRight size={30} />
          </button>
        </div>
      )}
    </main>
  );
}

render(<App />, document.getElementById('app')!);
