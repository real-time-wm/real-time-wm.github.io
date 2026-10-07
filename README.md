# Real-Time World Models for Robotics

Website for the ICLR 2027 workshop proposal.

This is a static website with no build step or package dependencies.

## Editing

- `index.html`: workshop overview, schedule, and call for papers.
- `people.js`: speakers, organizers, affiliations, and profile links.
- `styles.css`: layout and styling.
- `app.js`: people cards and navigation.
- `assets/`: portrait images.

## Local preview

From the repository root, run:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## GitHub Pages

The website is ready to serve from the root of `main`. To publish it, configure GitHub Pages to deploy from the `main` branch and `/ (root)` directory in the repository settings. `.nojekyll` keeps these static files unchanged during publication.
