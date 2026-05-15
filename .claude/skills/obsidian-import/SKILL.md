---
name: obsidian-import
description: Search for an Obsidian note by query, read its content, generate front matter, and create a draft blog post in src/posts/.
---

Import a note from Obsidian into the blog as a properly formatted draft post.

## Usage

```
/obsidian-import <search query>
```

## Steps

### 1. Search for the note

Run:

```bash
obsidian search query="<search query>"
```

Review the results and identify the best matching note.

### 2. Read the note content

Run:

```bash
obsidian read --copy "<note title or path>"
```

### 3. Generate front matter

Analyze the note content and produce:

- **title**: Use the note's H1 heading, or derive a clean title from the note name
- **date**: Today's date in `YYYY-MM-DD` format (no quotes)
- **tags**: 2–5 lowercase hyphenated tags inferred from the subject matter (see tagging guide below)
- **description**: 1–2 sentence summary of the post's main argument
- **permalink**: Always the literal string `posts/{{ title | slugify }}/index.html`
- **status**: Always `draft`
- **socialImage**: Omit the field entirely if no image is referenced

### 4. Write the post file

Slugify the title (lowercase, spaces → hyphens, strip punctuation) and create:

```
src/posts/<slugified-title>.md
```

Paste the front matter block, then the note body. Clean up Obsidian-specific syntax:
- Wikilinks `[[Note Name]]` → plain text or a standard markdown link
- Callouts `> [!note]` → plain `>` blockquotes
- Tags `#tag` inline → remove (tags go in front matter only)

---

## Front matter reference

### Correct example

```yaml
---
title: "Why Staff Engineers Write More Docs Than Code"
date: 2026-05-13
tags: [staff-plus-engineering, leadership, documentation, communication]
description: Staff engineers spend more time writing than coding — here's why that's the right call and how to do it well.
permalink: posts/{{ title | slugify }}/index.html
status: draft
socialImage: /images/my-image.jpg
---
```

### Field rules

| Field | Format | Notes |
|---|---|---|
| `title` | Quoted string | Title case; keep under 80 chars |
| `date` | `YYYY-MM-DD` unquoted | Use today's date on import |
| `tags` | Inline array `[tag-one, tag-two]` | Lowercase, hyphenated, 2–5 tags |
| `description` | Unquoted string | One or two sentences |
| `permalink` | `posts/{{ title | slugify }}/index.html` | Exact literal — do not evaluate the template |
| `status` | `draft` | Always `draft` on import |
| `socialImage` | `/images/filename.ext` | **Omit the field entirely** if no image |

---

## Tagging guide

Pick tags that reflect the **subject**, not the form. Existing tags on this blog:

- **Engineering**: `serverless`, `aws`, `aws-sam`, `dynamodb`, `nosql`, `software-engineering`, `distributed-services`, `metaphors`
- **Leadership / career**: `leadership`, `staff-plus-engineering`, `individual-contributor-leadership`, `team-communication`, `psychological-safety`
- **Culture**: `game`, `review`

Prefer existing tags. Invent a new tag only when nothing fits.

---

## Do's and Don'ts

### Do

- Tags lowercase and hyphenated: `staff-plus-engineering` ✓
- Description summarizes the *argument*, not just the topic: `How X helps Y` ✓
- `status: draft` — never import as `published`
- Keep permalink as the literal template string, un-evaluated
- `date: 2026-05-13` — unquoted

### Don't

- Don't invent tags not reflected in the content
- Don't leave `title:` blank or use the raw filename
- Don't add a `layout:` field — posts inherit it automatically
- Don't quote the date: `date: "2026-05-13"` ✗
- Don't include `socialImage:` with an empty value — omit it entirely
- Don't preserve Obsidian wikilinks in the output
- Don't add `popularity:` or other non-standard fields on import

---

## Example run

**Input**: `/obsidian-import staff engineering`

```bash
obsidian search query="staff engineering"
# → finds "Staff Engineering Reflections.md"

obsidian read --copy "Staff Engineering Reflections"
# → copies note content to clipboard / stdout
```

**Output**: `src/posts/staff-engineering-reflections.md`

```yaml
---
title: "Staff Engineering Reflections"
date: 2026-05-13
tags: [staff-plus-engineering, leadership, individual-contributor-leadership]
description: Reflections on what it actually means to operate as a staff engineer day-to-day, beyond the job description.
permalink: posts/{{ title | slugify }}/index.html
status: draft
---

<note body here>
```
