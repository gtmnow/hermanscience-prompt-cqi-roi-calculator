# HermanScience Prompt CQI Alignment ROI Calculator

Browser-based ROI and token-savings calculator for prompt-type alignment.

## What is included

- Herman Science-styled React + TypeScript web app
- Static dataset based on the initial evaluation workbook
- Role-based task-mix presets by function/role and Type-based profile selection
- Token savings estimation using the savings matrix
- Value recovery outputs for both time and token economics
- GitHub Pages workflow for public deployment

## Local run

```bash
npm install
npm run dev
```
Or use Make:

```bash
make run
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

- **Selected CQI lift vs neutral** = weighted selected personality uplift across the role mix.
- **Best observed headroom** = weighted best win rate seen across all personality types for each task.
- **Applied productivity factor** = chosen ROI basis.
- **Weekly hours recovered** = weekly LLM hours × applied productivity factor.
- **Value created** = recovered hours × hourly value.
- **Token savings factor** = weighted selected personality savings rate across role mix.
- **Estimated weekly token volume** = weekly LLM hours × 60 prompts/hour assumption × task-type-specific token usage (from Calculation Detail data, multiplied by 40), then blended by role mix.
- **Weekly token savings** = estimated weekly token volume × token savings factor.
- **Token value created** = weekly token savings × cost per million tokens.

## Important note

Profile labels use the Enneagram names Reformer, Helper, Achiever, Individualist, Investigator, Loyalist, Enthusiast, Challenger, and Peacemaker. Role presets provide the initial task mix, which can then be adjusted in the UI. Update `roles` in `src/data/evalData.ts` if you want different role-task mix defaults.
