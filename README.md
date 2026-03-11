# tilou

## run locally

```bash
npm install
npm run dev
```

## deploy on vercel (easy)

1. push this repo to github.
2. go to vercel and click `add new...` -> `project`.
3. import the repo and keep default settings:
   - framework preset: `next.js`
   - root directory: `.`
   - build command: `next build`
   - output directory: leave empty
4. click `deploy`.

## notes

- video file is served from `public/batman-rain.mp4`.
- cache headers for the video are already set in `vercel.json`.
