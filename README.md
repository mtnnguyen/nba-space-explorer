# NBA Space Explorer 🏀

An interactive shot chart and spatial analysis tool built to explore how NBA players score from different areas of the court. 
I started this project because I’m interested in the intersection of sports analytics and spatial data. 
Instead of just looking at box scores, I wanted to visualize where scoring happens and how shot distribution shapes a player’s style.

## What it currently does
- Renders an interactive NBA half-court using SVG
- Plots shot locations with make/miss visualization
- Supports player and team filtering
- Lays the foundation for spatial aggregation (heatmaps/binning)
- Exploring how spacing affects shot selection

## Tech Stack
- React (UI + state management)
- Vite (build tool)
- SVG (court rendering + coordinate control)
- Planned: spatial binning, shot-quality modelling, optional ArcGIS integration

## Next Steps
- Implement grid / hexbin spatial aggregation
- Add expected FG (xFG) modelling
- Build heatmap layers
- Improve UI + add tooltips and legends

## How to run locally
npm install
npm run dev

## Shot data quality

The bundled data is synthetic, not observed NBA performance. Coordinates must be in feet relative to the hoop, with x between -25 and 25 and y between -6 and 41 (the current SVG viewport). Convert other coordinate systems before importing. Missing, nonnumeric or off-court coordinates and unknown outcomes are rejected instead of becoming fake shots at the hoop or misses. The fallback sample uses the same units. The interface reports rejected rows for the public JSON sample.

Run normalization regression tests with `node --test tests/normalizeShots.test.mjs`.
