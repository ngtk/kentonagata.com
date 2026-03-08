export type Lang = 'en' | 'ja'

interface TranslationShape {
  nav: { portfolio: string; publications: string }
  hero: { subtitle: string; description: string; cta: string }
  portfolio: { heading: string; empty: string; back: string }
  publications: { heading: string; empty: string; back: string; external: string }
  meta: { suffix: string; description: string }
}

export const translations: Record<Lang, TranslationShape> = {
  en: {
    nav: { portfolio: 'Portfolio', publications: 'Publications' },
    hero: {
      subtitle: 'Software Developer',
      description: 'Building clean, useful software.',
      cta: 'Say Hello',
    },
    portfolio: { heading: 'Portfolio', empty: 'No items yet.', back: '← Portfolio' },
    publications: {
      heading: 'Publications',
      empty: 'No items yet.',
      back: '← Publications',
      external: 'External link ↗',
    },
    meta: {
      suffix: '— Kento Nagata',
      description: 'Kento Nagata — Software Developer.',
    },
  },
  ja: {
    nav: { portfolio: 'ポートフォリオ', publications: '発表・記事' },
    hero: {
      subtitle: 'ソフトウェアエンジニア',
      description: 'シンプルで使いやすいソフトウェアを作っています。',
      cta: 'お問い合わせ',
    },
    portfolio: { heading: 'ポートフォリオ', empty: 'まだありません。', back: '← ポートフォリオ' },
    publications: {
      heading: '発表・記事',
      empty: 'まだありません。',
      back: '← 発表・記事',
      external: '外部リンク ↗',
    },
    meta: {
      suffix: '— Kento Nagata',
      description: 'Kento Nagata — ソフトウェアエンジニア',
    },
  },
}
