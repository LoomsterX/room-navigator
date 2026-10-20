# Romkart – møterommene våre

A Norwegian-language, interactive map of the office meeting rooms and shared facilities. Select a room on the floor plan or in the room list to view its capacity, booking status, use, equipment, and the story behind its name.

## Run locally

No build step or dependencies are required. Open [`index.html`](./index.html) in a web browser.

Google Fonts are loaded from the internet; system font fallbacks are used if they are unavailable.

## Files

- [`index.html`](./index.html) — page content and floor plan
- [`styles.css`](./styles.css) — layout, colors, and responsive styles
- [`script.js`](./script.js) — room data, map rendering, selection, and filters

Room details and floor-plan positions are defined in the `ROOMS` array in `script.js`.

## Using the map

- Choose a filter to show all rooms, bookable rooms, non-bookable rooms, or facilities.
- Select a room in the map or list to see its details.
- Press **Escape** to clear the current selection.
