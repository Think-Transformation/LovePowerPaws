# Love Power Paws — marketing site (GitHub Pages)

Static marketing site for **lovepowerpaws.com**, focused on **booth #6113** at **The Shed**: hero, optional booth text updates, image gallery, about, and a **GetResponse** mailing list form.

Built with [Astro](https://astro.build/) (static output) and deployed with **GitHub Actions** to **GitHub Pages**.

**Repository:** [Think-Transformation/LovePowerPaws](https://github.com/Think-Transformation/LovePowerPaws)  
Clone: `git clone git@github.com:Think-Transformation/LovePowerPaws.git`

This is a **project** site (not `*.github.io`), so the default GitHub URL is **`https://think-transformation.github.io/LovePowerPaws/`** until **`lovepowerpaws.com`** is configured in Pages + DNS. With the custom domain enabled, the site is served at the domain root (paths like `/thanks/` stay correct).

## Brand (logo + colors)

- **Header logo:** [`public/brand/logo-text.png`](public/brand/logo-text.png) (wordmark in the site header).
- **Round mark (optional asset):** [`public/brand/logo-full.svg`](public/brand/logo-full.svg).
- **Favicon:** [`public/favicon.svg`](public/favicon.svg) (and [`public/favicon.ico`](public/favicon.ico) for broader browser support).
- **Theme tokens:** [`src/styles/global.css`](src/styles/global.css) defines Tailwind `lp-*` colors (teal, purple, orange, ginger, ink) used across components.

If you export official vector assets from your design file, replace those SVGs (keep the same filenames) so you don’t need code changes.

## Local development

```bash
npm install
cp .env.example .env
# Set PUBLIC_GETRESPONSE_CAMPAIGN_TOKEN in .env for local previews
npm run dev
```

```bash
npm run build   # output in dist/
npm run preview # serve dist/
```

## GetResponse

1. In GetResponse, enable **plain HTML form** signups for your list if required (new lists may block this by default).
2. Copy your list **campaign token** from GetResponse’s HTML form snippet.
3. Local: set `PUBLIC_GETRESPONSE_CAMPAIGN_TOKEN` in `.env` (see `.env.example`).
4. CI: add a GitHub Actions secret named **`GETRESPONSE_CAMPAIGN_TOKEN`** with the same value. The workflow passes it to the build as `PUBLIC_GETRESPONSE_CAMPAIGN_TOKEN`.

The form posts to GetResponse and redirects subscribers to `/thanks/` on this domain.

## Gallery

- Add images under [`public/gallery/`](public/gallery/) (`.jpg`, `.png`, `.webp`, `.gif`, `.avif`).
- Push to GitHub; the **Deploy site to GitHub Pages** workflow rebuilds the site.

### Optional captions and order

Edit [`src/content/gallery.json`](src/content/gallery.json):

- **`captions`**: map filename → caption (e.g. `"booth-sign.jpg": "Our booth sign"`).
- **`order`**: list filenames in the order you want them shown (any files not listed are appended alphabetically).

## Booth text updates

Edit [`src/content/updates.json`](src/content/updates.json). Remove or empty `items` to hide the **Booth updates** section.

## GitHub Pages setup

1. Use this repo (**`Think-Transformation/LovePowerPaws`**) on branch **`main`** (already pushed).
2. Repo **Settings → Pages**:
   - **Build and deployment**: Source **GitHub Actions**.
3. After the first successful deploy, set the **custom domain** to `lovepowerpaws.com` (GitHub will commit or manage `public/CNAME`; this repo already includes [`public/CNAME`](public/CNAME)).
4. Enable **Enforce HTTPS** once the certificate is ready.

### DNS (apex + www)

At your DNS host for `lovepowerpaws.com`:

**Apex (`lovepowerpaws.com`)** — add **four** `A` records (GitHub Pages):

| Type | Name | Data             |
| ---- | ---- | ---------------- |
| A    | @    | `185.199.108.153` |
| A    | @    | `185.199.109.153` |
| A    | @    | `185.199.110.153` |
| A    | @    | `185.199.111.153` |

**`www`** — add a `CNAME` to **`think-transformation.github.io`** (GitHub Pages hostname for the `Think-Transformation` org).

Confirm values in GitHub Docs if they change: [Configuring a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Phase 2: Slack → auto-publish (optional)

GitHub Pages only updates when the **git repository** changes. To let someone post images or text in **Slack** and have the site redeploy:

- Use **Zapier** or **Make** (or a small **Cloudflare Worker**) to listen for messages/files in a **dedicated private channel**, then use the **GitHub API** to commit files under `public/gallery/` and/or append to `src/content/updates.json`.
- Your existing **Deploy site to GitHub Pages** workflow will run on that commit.

Use a **private channel**, restrict who can post, and store **GitHub tokens** only in the automation’s secrets.

## License

Private project — all rights reserved unless you add a license.
