# Pokédex

Reimagining the Pokédex as a modern, generation-aware web application.

---

## Features

- Live Pokémon Search (PokéAPI-powered)
- Real-time Search Autocomplete
- Dynamic Radar Stat Visualization
- Accurate Competitive Type Effectiveness Engine
  - ×4, ×2, ×0.5, ×0.25, ×0 multipliers
  - Correct dual-type calculations
- Interactive Forms & Transformation System
  - Mega Evolutions
  - Alternate Forms
  - Battle Forms
- Reactive Form Switching
  - Instantly updates:
    - stats
    - typings
    - weaknesses/resistances
    - radar chart
    - cries
    - sprites
- Real Pokédex Entries with Typewriter Animation
- Pokémon Cry Playback
- Shiny Pokémon Toggle
- Evolution Chain Visualization
- Responsive Multi-device Layout
- Backend Response Caching
- Modern Rotom-inspired UI/UX

---

# Tech Stack

## Frontend
- React (Vite)
- TailwindCSS

## Backend
- FastAPI

## Visualization
- Recharts

---

# Currently In Progress

- Branching Evolution Trees
- UI Animations & Transitions
- Compare Mode
- Regional Variant Enhancements

---

# Development Progress

## Day 1
- Initial layout structure
- Core visual direction

## Day 2
- Restructured app into scalable 2D layout architecture
- Added accent styling system
- Planned forms & mega evolution architecture

## Day 3
- Built Pokémon battle panel
- Added:
  - Radar stat chart
  - BST display
  - Type effectiveness section
  - Dex entry section
- Implemented early mega evolution logic

## Day 4
### Backend + API Integration
- Integrated FastAPI backend with PokéAPI
- Enabled live Pokémon search
- Connected frontend to backend API

### Dynamic Rendering
- Rendered:
  - stats
  - typings
  - official artwork sprites
  - Pokédex descriptions

## Day 5
### UX + Performance
- Added typewriter animation
- Optimized radar rendering using memoization

### Battle System
- Built fully accurate type effectiveness engine
- Supports:
  - ×4
  - ×2
  - ×0.5
  - ×0.25
  - ×0 immunities
- Correct dual-type interaction calculations

## Day 6
### UX + Responsiveness
- Improved responsive multi-device support
- Fixed overflow & scrolling conflicts
- Optimized radar chart sizing and spacing
- Improved loading flow and rendering responsiveness

### Features
- Added Pokémon cries
- Added shiny Pokémon support
- Added evolution chain visualization
- Added shiny evolution sprites

## Day 7
### Search System
- Implemented live autocomplete system
- Built interactive dropdown behavior
- Added keyboard navigation support
- Improved dropdown UX interactions

### Architecture
- Refactored scalable rendering architecture
- Rebuilt content rendering using conditional rendering
- Added backend caching for faster repeated searches

## Day 8
### Dynamic Forms System
- Implemented fully reactive forms architecture
- Supports:
  - Mega Evolutions
  - Alternate Forms
  - Battle Forms
  - Form-specific typings

### Reactive Form Switching
- Instantly updates:
  - stats
  - radar chart
  - typings
  - type effectiveness
  - cries
  - sprites
  - shiny sprites

## Day 9
### Backend Improvements
- Built dynamic form aggregation system using PokéAPI varieties
- Added form-aware type effectiveness calculations
- Added fallback species searching for special-form Pokémon

### UI Improvements
- Added interactive form-switching interface
- Improved radar chart balancing and readability
- Enhanced autocomplete UX behavior