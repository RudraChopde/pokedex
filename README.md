# Rotom Pokédex (Name TBD)

A modern, generation aware Pokémon companion app 
  Reimagining the Rotom Deex as a complete full experience

---
## What's Inside (FOR NOW)
- **Splash Screen** — interactive boot sequence with Rotom Dex animation, cry playback, and typewriter dialogue
- **Pokédex** — live Pokémon search with full stats, typings, evolution chains, forms, and more

## Features

- Live Pokémon Search (PokéAPI-powered)
- Real-time Search Autocomplete with keyboard navigations
- Dynamic Radar Stat Visualization
- Accurate Competitive Type Effectiveness Engine
  - ×4, ×2, ×0.5, ×0.25, ×0 multipliers
  - Correct dual-type calculations
- Interactive Forms & Transformation System
  - Mega Evolutions, Alternate Forms, Battle Forms
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
- Generation aware UI Theming
- Backend Response Caching
- Modern Rotom-inspired UI/UX

---

# Tech Stack

## Frontend
- React (Vite)
- TailwindCSS
- Recharts

## Backend
- FastAPI

---


# Currently In Progress

- Hub Screen — central navigation for all dex modules
- Move Dex
- Ability Dex
- Item Dex
- Compare Mode
- Regional Variant Enhancements
- UI Animations & Transitions

---

# Development Progress

### Day 1
- Initial layout structure
- Core visual direction

### Day 2
- Restructured app into scalable 2D layout architecture
- Added accent styling system
- Planned forms & mega evolution architecture

### Day 3
- Built Pokémon battle panel
- Added:
  - Radar stat chart
  - BST display
  - Type effectiveness section
  - Dex entry section
- Implemented early mega evolution logic

### Day 4
#### Backend + API Integration
- Integrated FastAPI backend with PokéAPI
- Enabled live Pokémon search
- Connected frontend to backend API

#### Dynamic Rendering
- Rendered:
  - stats
  - typings
  - official artwork sprites
  - Pokédex descriptions

### Day 5
#### UX + Performance
- Added typewriter animation
- Optimized radar rendering using memoization

#### Battle System
- Built fully accurate type effectiveness engine
- Supports:
  - ×4
  - ×2
  - ×0.5
  - ×0.25
  - ×0 immunities
- Correct dual-type interaction calculations

### Day 6
#### UX + Responsiveness
- Improved responsive multi-device support
- Fixed overflow & scrolling conflicts
- Optimized radar chart sizing and spacing
- Improved loading flow and rendering responsiveness

#### Features
- Added Pokémon cries
- Added shiny Pokémon support
- Added evolution chain visualization
- Added shiny evolution sprites

### Day 7
#### Search System
- Implemented live autocomplete system
- Built interactive dropdown behavior
- Added keyboard navigation support
- Improved dropdown UX interactions

#### Architecture
- Refactored scalable rendering architecture
- Rebuilt content rendering using conditional rendering
- Added backend caching for faster repeated searches

### Day 8
#### Dynamic Forms System
- Implemented fully reactive forms architecture
- Supports:
  - Mega Evolutions
  - Alternate Forms
  - Battle Forms
  - Form-specific typings

#### Reactive Form Switching
- Instantly updates:
  - stats
  - radar chart
  - typings
  - type effectiveness
  - cries
  - sprites
  - shiny sprites

### Day 9
#### Backend Improvements
- Built dynamic form aggregation system using PokéAPI varieties
- Added form-aware type effectiveness calculations
- Added fallback species searching for special-form Pokémon

#### UI Improvements
- Added interactive form-switching interface
- Improved radar chart balancing and readability
- Enhanced autocomplete UX behavior

### Day 10
#### Evolution Intelligence System
- Rebuilt evolution parsing using recursive tree traversal
- Added full branching evolution support
- Supports:
  - Eevee evolutions
  - Split evolution paths
  - Multi-stage recursive chains

#### Intelligent Evolution Rendering
- Added recursive frontend evolution rendering
- Built responsive branch-based evolution layout
- Added clickable evolution navigation system
- Enabled instant evolution-to-Pokémon traversal

#### Evolution Condition Engine
- Added support for:
  - level evolutions
  - item evolutions
  - trade evolutions
  - friendship evolutions
  - affection evolutions
  - time-based evolutions
  - location-based evolutions

#### Backend Normalization
- Added semantic evolution condition formatting
- Added modern evolution method overrides
- Added legacy + modern evolution compatibility
- Improved human-readable evolution descriptions

### Day 11
#### UI + Interaction Polish
- Improved evolution card responsiveness
- Enhanced hover interactions and transitions
- Refined evolution readability and spacing
- Improved recursive rendering performance

#### Navigation Improvements
- Added graph-like Pokémon exploration flow
- Improved search-to-render transition behavior
- Enhanced interactive traversal UX

#### Architecture Improvements
- Refined recursive component architecture
- Improved scalable state propagation
- Cleaned reusable evolution rendering logic

### Day 12
- Changed the Flow of the Project
- Bug Fixes (UI/UX and Backend)
- Added Splash Screen to start the new approach of the project