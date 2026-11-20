# Zaidan Dhiyaurrahman — Portfolio

[zaidandya.vercel.app](https://zaidandya.vercel.app)

Personal portfolio upgraded from [zaidandya/zaidan-portfolio](https://github.com/zaidandya/zaidan-portfolio), featuring an ASCII accretion-disk main background, a footer-scoped ASCII goldfish canvas, a responsive Dynamic Island navigation bar, and Geist Serif typography.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4
- **Motion & Typography**: `motion`, `geist` (Geist Serif)
- **Deployment**: Vercel

---

## File Structure

```text
.
├── public/
│   └── assets/aistudio/
│       ├── devault-ascii-tiles-u-g0orqyuo_d242c892.mp4   # Main ASCII background
│       └── devault-ascii-tiles-u-pa7qt6jf_a2570146.mp4   # Footer ASCII goldfish
├── src/
│   ├── components/
│   │   ├── AsciiBackground.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── PageViews.tsx
│   ├── data/
│   │   └── siteData.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

---

## Development

```bash
npm install
npm run dev
```

## Production Build & Typecheck

```bash
npm run lint
npm run build
```
