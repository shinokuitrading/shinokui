# Shin-Okui Trading Website — Repository Instructions

This repository is the production website for **信億尉貿易有限公司 / Shin-Okui Trading**.

The site is a live commercial website. Changes to product data, pricing, alcohol information, SEO, images, branding, or production routes must be handled carefully.

---

# 1. Repository workflow

For every user-requested task that modifies repository files:

1. Complete the requested changes.
2. Validate the changes before committing.
3. Review `git diff` and confirm that only files relevant to the current task were modified.
4. Stage only files changed for the current task.
5. Create a concise Git commit automatically without asking for confirmation.
6. Push the commit automatically to the current branch's configured upstream.
7. Confirm the push completed successfully.
8. Confirm the working tree is clean after the push.

Do not leave completed work uncommitted unless validation fails or the task is incomplete.

## Git safety rules

- Never use `git push --force`.
- Never force-push.
- Never amend an existing commit unless the user explicitly requests it.
- Never run `git reset`, `git rebase`, or destructive Git history operations unless explicitly requested.
- Never switch branches or create a new branch unless explicitly requested.
- Never push to a different branch than the current configured upstream unless explicitly requested.
- Never include unrelated or pre-existing changes in the commit.
- If the current branch has no upstream, do not guess the destination. Report the issue instead.
- If a normal push fails, do not force the push. Report the error.
- If validation fails, do not commit or push until the issue is fixed.
- If file ownership or the source of unrelated changes is unclear, stop and report the issue.

The normal production workflow is expected to use:

`main → origin/main → Vercel production deployment`

Do not alter deployment configuration unless explicitly requested.

---

# 2. Technology stack

Current expected stack:

- Next.js 14
- App Router
- React 18
- TypeScript
- next-intl
- MDX news/content
- Vercel deployment
- GitHub repository
- Node.js 22 LTS for local development unless the repository later specifies another version

Respect the existing architecture.

Do not:

- migrate frameworks
- replace App Router
- upgrade major framework versions
- change package managers
- perform broad dependency upgrades
- rewrite working architecture

unless the user explicitly requests it.

Prefer the smallest change that correctly completes the task.

---

# 3. Validation before commit

For code or content changes that can affect the production website, run the relevant project validation.

At minimum, when applicable:

```bash
npm run build
```

Also run, when supported by the repository:

```bash
npx tsc --noEmit
```

and:

```bash
npm run lint
```

If the project has no test script, do not invent one.

For page-level changes, also verify the affected route when practical.

Do not push changes that cause:

- build errors
- TypeScript errors
- ESLint errors
- broken routes
- broken images
- invalid JSON-LD
- unintended 404 pages
- obvious hydration or runtime errors

Existing non-blocking warnings should not automatically trigger unrelated refactoring.

---

# 4. Company identity

The official company name is:

**信億尉貿易有限公司**

English brand/company reference:

**Shin-Okui Trading**

Never change the company name to:

- 信億廚
- 信億衛
- other similar-looking variants

unless the user explicitly instructs otherwise.

The website domain is:

`https://shin-okui-trading.com`

The canonical production domain is the non-www HTTPS domain.

Do not change the canonical domain unless explicitly requested.

---

# 5. Brand identity

The primary Japanese sake brewery currently represented on the website is:

**月の井酒造店**

Traditional Chinese usage may use:

**月之井酒造店**

Important Japanese product/brand spellings include:

- 和の月39
- 彦市
- 発泡清酒 AQUA
- 恋梅

Traditional Chinese display names include:

- 和之月39
- 彥市
- AQUA 發泡清酒
- 戀梅

Do not convert Traditional Chinese website content to Simplified Chinese.

Do not arbitrarily change Japanese names or romanization.

---

# 6. Product data is protected

Product data must be treated as business-critical data.

Do not modify any of the following unless the user explicitly requests the specific change:

- retail prices
- case prices
- wholesale prices
- promotional prices
- bottle size
- case quantity
- alcohol percentage
- rice variety
- polishing ratio
- flavor classification
- serving recommendations
- product descriptions
- product availability
- product slugs
- product images

Do not infer missing product data.

Do not invent:

- SKU
- GTIN
- stock status
- awards
- reviews
- ratings
- tasting scores
- production quantities
- brewery claims

If information is not present in the project or user instructions, do not fabricate it.

---

# 7. Current important product rules

The site currently includes important products such as:

- 和之月39
- 彥市 純米大吟釀
- 彥市 純米吟釀
- AQUA 發泡清酒
- 戀梅 梅酒

Existing product data in the repository is the source of truth.

Important existing flavor terminology must not be casually changed:

- 彥市 純米大吟釀：微辛口
- 彥市 純米吟釀：辛口

For 和之月39, existing serving guidance includes:

- 溫酒
- 冷飲
- 加氣泡水
- 加冰塊

Do not replace「溫酒」with「熱燗」unless explicitly requested.

---

# 8. Images and logos

Product photography and logos are protected assets.

Do not:

- generate replacement product images
- generate replacement logos
- redraw logos
- substitute product bottle images
- use AI-generated approximations of existing products
- rename image files unnecessarily
- replace image paths unless explicitly requested

When a user asks to use an existing uploaded or repository image, use that image.

Do not generate a visually similar substitute.

Preserve image aspect ratio unless the task specifically requires a crop.

Avoid introducing broken image paths.

---

# 9. Website design

Do not redesign the website unless explicitly requested.

For ordinary content, SEO, pricing, copy, or data changes:

- preserve existing layout
- preserve existing CSS
- preserve spacing system
- preserve responsive behavior
- preserve component hierarchy when possible

Do not introduce a new design system for a small task.

Reuse existing components before creating new ones.

If adding a small UI block such as "延伸閱讀", use the existing visual language.

---

# 10. SEO rules

SEO is an important part of this site.

Current SEO architecture may include:

- page metadata
- canonical URLs
- Open Graph
- Twitter metadata
- sitemap.xml
- robots.txt
- Product JSON-LD
- NewsArticle JSON-LD
- Organization
- WebSite
- BreadcrumbList
- CollectionPage
- AboutPage

Do not remove or weaken existing SEO implementation without a clear reason.

## SEO safety

Never:

- use keyword stuffing
- create hidden SEO text
- add fake reviews
- add fake AggregateRating
- add fake stock status
- create fake schema properties
- create duplicate canonical URLs
- change a working URL merely for aesthetics
- create multiple articles targeting the same query without considering keyword cannibalization

Use real page content and real product data.

Product structured data prices must come from the existing product data source rather than a separately hardcoded SEO price table.

---

# 11. SEO article workflow

Existing SEO articles are intentional search assets.

Do not delete, rename, or change their slugs unless explicitly requested.

When modifying an existing article:

- preserve `datePublished`
- update `dateModified` only when meaningful article content is actually changed
- preserve canonical URL
- preserve working internal links
- preserve NewsArticle JSON-LD
- avoid unnecessary title changes
- avoid rewriting content unrelated to the requested SEO goal

When adding a new SEO article:

- use a unique search intent
- avoid competing with an existing article
- use one clear H1
- use natural H2/H3 structure
- add relevant internal links
- add the article to the existing sitemap system
- use the existing NewsArticle implementation

Do not mass-produce SEO articles simply to increase page count.

Search Console data should be preferred when determining future SEO topics.

---

# 12. Internal linking

Internal links should be natural and useful.

Prefer descriptive anchor text.

Good example:

`了解彥市純米大吟釀`

Avoid using only:

`點這裡`

Do not:

- spam footer links
- link every article to every product
- add `nofollow` to normal internal links
- open normal internal links in a new tab without reason

Use canonical internal URLs.

Avoid unnecessary redirect chains.

---

# 13. Structured data

JSON-LD must reflect actual page content.

For Product structured data:

- use real product name
- use real product image
- use real product description
- use real product URL
- use real pricing data
- use TWD when pricing is in New Taiwan Dollars

Do not invent:

- reviews
- rating values
- review counts
- stock availability
- SKU
- GTIN

unless reliable repository data exists.

For NewsArticle:

- preserve real `datePublished`
- only update `dateModified` after a real content update

Structured data must remain valid JSON.

---

# 14. URLs and routing

Do not change working production URLs unless the user explicitly requests it.

Important production routes may include:

- `/products/...`
- `/news/...`
- `/brand/...`
- `/about`
- `/products`
- `/news`

When adding or modifying content:

- preserve HTTP 200 for valid pages
- preserve true HTTP 404 for missing pages
- avoid soft 404s
- avoid redirect chains
- preserve canonical consistency

---

# 15. Localization

The website uses Traditional Chinese and may include Japanese content through next-intl.

Expected language values may include:

- `zh-Hant-TW`
- `ja-JP`

Do not create hreflang implementation unless the URL architecture actually supports distinct language URLs.

Do not change locale routing or language behavior as part of unrelated work.

---

# 16. Content accuracy

This is a commercial alcohol website.

Do not make unsupported claims about:

- health benefits
- medicinal effects
- "healthy alcohol"
- hangover prevention
- reduced harm
- guaranteed food pairing
- guaranteed flavor
- awards
- rankings
- superiority claims

Do not write:

- "日本第一"
- "最頂級"
- "最好喝"
- "零負擔"
- "不容易醉"

unless the user provides a verifiable source and specifically requests the claim.

When describing alcohol products, keep language factual and commercially appropriate.

---

# 17. Alcohol-related content

Do not imply that lower alcohol means safe or harmless.

Do not describe alcohol as:

- healthy
- medicinal
- suitable for unlimited consumption
- risk-free

Preserve any legally required alcohol-related notices already present on the website.

Do not remove age or legal notices unless explicitly requested.

---

# 18. Contact information

Existing company contact details must not be changed unless explicitly requested.

If contact information is needed, use the repository's current source of truth.

Known business identity must remain consistent across:

- visible page content
- metadata
- Organization JSON-LD
- contact pages
- footer
- Open Graph data

---

# 19. Scope control

For every task:

Change only what is necessary.

Before committing, inspect:

```bash
git status
git diff
```

Ask internally:

- Did I modify unrelated files?
- Did a formatter rewrite unrelated content?
- Did a generated file change unexpectedly?
- Did package-lock.json change without a dependency task?
- Did a product price or alcohol percentage change accidentally?
- Did any image path change?
- Did any URL change?

If unrelated changes exist, do not include them in the commit.

---

# 20. Dependency policy

Do not update dependencies unless required by the user's task.

Do not run:

```bash
npm audit fix --force
```

unless the user explicitly requests a dependency/security upgrade and understands possible breaking changes.

Do not upgrade:

- Next.js major version
- React major version
- npm major version
- next-intl major version

as part of unrelated work.

If `npm audit` reports issues but the requested task is unrelated, report them separately rather than automatically changing dependencies.

---

# 21. Production deployment

GitHub `main` is connected to Vercel production deployment.

Therefore, pushing to `origin/main` may update the live website automatically.

Before pushing:

1. complete the task
2. validate
3. inspect `git diff`
4. make sure no unrelated files are staged
5. commit
6. push

Do not push partially completed work.

Do not push code with known build errors.

---

# 22. Final response after coding task

After completing a repository modification, report concisely:

- what was changed
- affected files
- validation performed
- Git commit hash
- whether push succeeded

For SEO work, also report when relevant:

- affected URL
- SEO Title
- Meta Description
- canonical
- structured data changes
- `dateModified`

Do not claim a deployment is live unless it has actually been verified.

---

# 23. Default behavior

The default workflow for a completed repository task is:

**edit → validate → review diff → stage relevant files → commit → push**

Do this automatically.

Do not ask the user:

“Should I commit this?”

or:

“Should I push this?”

after the requested work is complete and validation has passed.

The repository-level instruction is to commit and push completed validated work automatically.
