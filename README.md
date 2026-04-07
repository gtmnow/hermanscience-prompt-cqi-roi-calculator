# HermanScience Prompt CQI Alignment ROI Calculator

Browser-based ROI calculator prototype built from the initial prompt-eval results.

## What is included

- HermanScience-styled React + TypeScript web app
- Static dataset based on the initial evaluation workbook
- ROI model for task mix, selected profile, and estimated value recovery
- GitHub Pages workflow for public deployment

## Local run

```bash
npm install
npm run dev
```

## Production build

```bash
npm install
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Extract this project into the repo root.
3. Commit and push to the `main` branch.
4. In GitHub, open **Settings > Pages**.
5. Set the source to **GitHub Actions**.
6. Push again if needed. The included workflow will build and publish the site.

## Current model logic

- **Selected CQI lift vs neutral** = weighted selected-profile win rate across the entered task mix.
- **Best observed headroom** = weighted best win rate seen across all profiles for each task.
- **Applied productivity factor** = chosen ROI basis.
- **Weekly hours recovered** = weekly LLM hours × applied productivity factor.
- **Value created** = recovered hours × hourly value.

## Important note

This prototype still uses the profile labels from the initial evaluation dataset. When a true CQI-labeled dataset is ready, replace the values in `src/data/evalData.ts` and the app will update without structural changes.
