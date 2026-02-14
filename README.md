# NBA Space Explorer 🏀

An interactive shot chart and spatial analysis tool built to explore how NBA players score from different areas of the court. 
I started this project because I’m interested in the intersection of sports analytics and spatial data. 
Instead of just looking at box scores, I wanted to visualize where scoring happens and how shot distribution shapes a player’s style.

## What it currently does
- Renders an interactive NBA half-court using SVG
- Plots shot locations with make/miss visualization
- Supports player and team filtering
- Lays the foundation for spatial aggregation (heatmaps / binning)
- Exploring how spacing affects shot selection

## Tech Stack
- React (UI + state management)
- Vite (build tool)
- SVG (court rendering + coordinate control)
- Planned: spatial binning, shot-quality modeling, optional ArcGIS integration

## Next Steps
- Implement grid / hexbin spatial aggregation
- Add expected FG (xFG) modeling
- Build heatmap layers
- Improve UI + add tooltips and legends

## How to run locally
npm install
npm run dev
