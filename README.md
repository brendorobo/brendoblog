# brendorobo // DFIR write-ups

Personal DFIR blog. Built with [Astro](https://astro.build), deployed to GitHub Pages, DNS on Cloudflare.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
```

## Write something

```bash
npm run new -- "GCFA notes: lateral movement"     # new write-up
npm run new -- linkedin "Passed the GCFA"          # mirror a LinkedIn post on /posts
```

This creates an `.mdx` file (with `draft: true`, so it only shows in dev) and an image folder.
Remove `draft: true` when it's ready to publish.

| What | Where |
| --- | --- |
| Write-ups | `src/content/posts/*.mdx` |
| LinkedIn posts (/posts) | `src/content/linkedin/*.md` |
| Images | `public/images/posts/<slug>/` → `/images/posts/<slug>/file.png` |
| GCFA status, milestones, certs, toolbox | `src/data/journey.ts` |
| "Currently" box + study log (mood) | `src/data/now.ts` |
| Resume (/resume + About) | `src/data/resume.ts` |
| Cheat sheet (/cheatsheet) | `src/data/cheatsheet.ts` |
| Name, links, default theme, comments, analytics | `src/site.ts` |

### Components you can drop into any post

```mdx
<Callout type="tip|warn|ioc|note" title="optional">Text</Callout>
<Cmd cmd="vol -f mem.raw windows.pslist" output="optional output" />
<Figure src="/images/posts/x/shot.png" alt="..." caption="..." />
<Timeline title="..." events={[{ time, source, event, detail, flag }]} />
<Flashcards title="..." cards={[{ q, a }]} />
```

Need something custom for a project? Add an `.astro` component in `src/components/mdx/` and import it in the post.

## Themes

`nebula` (blue/purple), `breach` (red), `abyss` (dark blue), `phosphor` (green). Set the default with
`THEME` in `src/site.ts`. Visitors can switch from the header picker or the terminal (`theme breach`).

## Comments (giscus)

1. Repo Settings → General → Features → tick **Discussions**.
2. Install the giscus app on the repo: https://github.com/apps/giscus
3. Create a Discussions category named **Comments** (type: Announcement).
4. Go to https://giscus.app, enter `brendorobo/brendoblog`, pick the Comments category, and copy
   `data-category-id` into `SITE.giscus.categoryId` in `src/site.ts`.

## Analytics (Cloudflare Web Analytics)

Cloudflare dashboard → Analytics & Logs → Web Analytics → Add a site → `brendorobo.com` → copy the token
from the JS snippet into `SITE.cfAnalyticsToken` in `src/site.ts`. No cookies, no banner needed.

## Deploy

Pushing to `main` builds and deploys automatically via `.github/workflows/deploy.yml`.
One-time setup: **repo Settings → Pages → Source: GitHub Actions**.

### Custom domain (Cloudflare)

1. `public/CNAME` holds the domain (`brendorobo.com`).
2. `site` in `astro.config.mjs` matches it.
3. In Cloudflare DNS add (all **DNS only**, grey cloud, at first):
   - `A @` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME www` → `brendorobo.github.io`
4. GitHub repo → Settings → Pages → Custom domain → enter domain → wait for the check → tick **Enforce HTTPS**.
5. Optional: switch the records to proxied (orange cloud) and set Cloudflare SSL/TLS mode to **Full**.
