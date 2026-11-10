# A Little Something for You

A responsive, four-slide message carousel built with plain HTML, CSS, and JavaScript. It has no backend and no package installation is required.

## Files

- `index.html` — page structure and slide content
- `style.css` — responsive design and animations
- `script.js` — next/previous controls, thumbnail selection, keyboard navigation, swipe support, and the Read More dialog
- `render.yaml` — Render Blueprint configuration for a static site
- `favicon.svg` — browser tab icon

## Run locally

Open `index.html` in a browser. For the most reliable local preview, use the VS Code Live Server extension.

## Upload to GitHub

1. Create a new repository on GitHub.
2. Upload all files from this folder into the repository's root (not inside another nested folder).
3. Commit the files to the `main` branch.

## Deploy on Render

This project is a **static site**, not a backend web service.

### Option A — use the included `render.yaml`

1. Sign in to Render and choose **New → Blueprint**.
2. Connect the GitHub repository you just created.
3. Render will detect `render.yaml` and configure the static site.
4. Review the settings and deploy.

### Option B — create a Static Site manually

1. In Render, choose **New → Static Site** and connect your GitHub repository.
2. Set the branch to `main`.
3. Set the **Build Command** to `echo 'No build step required'`.
4. Set the **Publish Directory** to `.` (a single dot).
5. Create the site.

Render will provide an `onrender.com` address. With auto-deploy enabled, later pushes to the connected branch will publish automatically.

## Change the messages or images

Edit the four `<li class="item">` blocks in `index.html`. Update each slide's `data-title`, `data-message`, heading, description, and image `src`. Keep the `data-slide` values unique and numbered from 1 to 4 unless you add or remove slides; the JavaScript automatically counts the slides.

## Notes

- The four illustrations are loaded from the image-hosting URLs supplied with the original code, so those images need to remain publicly accessible.
- Google Fonts are loaded online. If a visitor is offline, the page falls back to system fonts.
