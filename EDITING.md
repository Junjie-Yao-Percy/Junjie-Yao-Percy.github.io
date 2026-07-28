# Website content editing guide

The resume content and visual design are now separated.

## Routine resume updates

Edit **`content.js`** only for normal content changes:

- `hero` — name, degree, school, research summary, Scholar link
- `about` — introduction, focus areas, current work, statistics
- `experience` — internship and work experience entries
- `publications` — published papers and their citation metadata
- `worksInProgress` — under-review and planned submissions
- `awards` / `patents` — honors and patent applications
- `highlight` — award evidence links and video paths
- `contact` / `footer` — email, profile links, location, update time

Each list item is an independent JavaScript object. To add a new entry, copy a nearby object, update its values, and keep the surrounding commas and brackets intact.

Publication display data and citation data live in the same publication object, so a paper no longer needs to be updated in two unrelated parts of the website.

## Files that normally should not be changed

- `styles.css` — colors, layout, responsive behavior, animations
- `app.js` — rendering functions and interactive behavior
- `index.html` — minimal page shell and asset loading order

## Quick validation

Before deployment, check JavaScript syntax:

```powershell
node --check content.js
node --check app.js
```

Then open the site through a local HTTP server rather than directly with `file://`.

## Rollback reference

The version before this refactor is preserved in the GitHub branch:

`codex/pre-content-refactor-20260728`
