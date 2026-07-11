# Happy Birthday, My Dearest Sister 🎂

A private, cinematic birthday surprise website — built with Next.js 15, React 19,
TypeScript, Tailwind CSS, and Framer Motion. Luxury black-and-gold design,
password-protected, full of memories, letters, a photo gallery, a Hindi
shayari section, a cake to "blow out," and a gift to open.

## 1. Install dependencies

```bash
npm install
```

## 2. Add your media

Everything is wired up to placeholder paths so you can drop your own files
in and it just works:

| Folder | What goes here | Referenced from |
|---|---|---|
| `public/photos/` | `photo1.jpg` … `photo30.jpg` (30+ images) | `data/photos.ts` |
| `public/videos/` | `video1.mp4`, `video2.mp4`, `video3.mp4` | `data/videos.ts` |
| `public/music/` | `song1.mp3`, `song2.mp3`, `song3.mp3` | `components/MusicPlayer.tsx` |

You can either name your files exactly as above, or edit the `src` paths in
those files to match whatever you have. Captions, titles, and descriptions
are all editable in the same files.

## 3. Personalize the text

- `components/PasswordGate.tsx` — change the `password` and `hint` props
  (or pass them from `app/page.tsx`) to set your own secret word.
- `components/Hero.tsx` — pass a `sisterName` prop to `<Hero />` in
  `app/page.tsx` to personalize the headline.
- `components/IntroLetter.tsx` — edit `LETTER_PARAGRAPHS` with your own words.
- `data/memories.ts` — edit the timeline events.
- `data/shayri.ts` — 16 original Hindi shayaris; add, remove, or replace.
- `data/wishes.ts` — the "You Are..." qualities grid.
- `components/Countdown.tsx` — pass a `targetDate` prop (e.g. `"2027-07-11"`)
  for the next-birthday countdown.

## 4. Run it locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 5. Build for production

```bash
npm run build
npm run start
```

## Project structure

```
app/                Next.js App Router entry (layout, page, global styles)
components/          All UI sections and reusable pieces
data/                 Editable content: photos, videos, memories, shayari, wishes
hooks/                Small reusable client hooks (magnetic buttons, media queries)
lib/                  Shared utilities (className merging)
types/                Shared TypeScript interfaces
public/               Static assets — photos, videos, music, icons
```

## Notes

- The experience flows one **step at a time** — Loading Screen → Password
  Gate → Hero → Letter → Timeline → Photo Gallery → Video Gallery →
  Shayari → Wishes → Cake → Countdown → Gift → The End — navigated with
  the **Back / Next** buttons (or arrow keys, or the dots) fixed at the
  bottom of the screen, instead of continuous scrolling. A floating music
  player stays visible throughout.
- Respects `prefers-reduced-motion` and keeps keyboard focus visible
  throughout for accessibility.
- The custom golden cursor automatically disables itself on touch devices.
- Below-the-fold sections are lazily loaded via `next/dynamic` for a fast
  first paint.
