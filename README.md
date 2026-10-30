# Rawayat & Co. — The Art of Pakistani Living

Modernized React + Vite project converted from TypeScript/TSX to JavaScript/JSX.

## Stack

- Node.js 26.12.0 (Current)
- React 19
- Vite 8.3.4
- Tailwind CSS 4
- JSX (no TypeScript source files)

## Run locally

```bash
nvm install
nvm use
npm install
npm run dev
```

Then open the URL shown by Vite (default: `http://localhost:3000`).

## Production build

```bash
npm run build
npm run preview
```

## Notes

- All `.ts`/`.tsx` application source files were transpiled to `.js`/JSX-compatible JavaScript.
- The TypeScript type-only source (`src/types.ts`) was removed because its types have no runtime purpose after conversion.
- Vite configuration is now `vite.config.js` and uses ESM-safe `import.meta.url` path handling.
- The original application structure, assets, screens, context logic, and styling are preserved.
