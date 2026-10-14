# brendorobo // DFIR notebook

Personal blog + lab notebook. Built with [Astro](https://astro.build), deployed to GitHub Pages, DNS on Cloudflare.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
```

## Write something

```bash
npm run new -- "GCFA notes: lateral movement"     # new blog post
npm run new -- lab "Velociraptor hunt lab"         # new lab/project
```

This creates an `.mdx` file (with `draft: true`, so it only shows in dev) and an image folder.
Remove `draft: true` when it's ready to publish.

| What | Where |
| --- | --- |
| Posts | `src/content/posts/*.mdx` |
| Labs / projects | `src/content/labs/*.mdx` |
| Images | `public/images/posts/<slug>/` → `/images/posts/<slug>/file.png` |
| GCFA progress, milestones, toolbox | `src/data/journey.ts` |
| Name, links | `src/site.ts` |

### Components you can drop into any post

```mdx
<Callout type="tip|warn|ioc|note" title="optional">Text</Callout>
<Cmd cmd="vol -f mem.raw windows.pslist" output="optional output" />
<Figure src="/images/posts/x/shot.png" alt="..." caption="..." />
<Timeline title="..." events={[{ time, source, event, detail, flag }]} />
<Flashcards title="..." cards={[{ q, a }]} />
```

Need something custom for a project? Add an `.astro` component in `src/components/mdx/` and import it in the post.

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
