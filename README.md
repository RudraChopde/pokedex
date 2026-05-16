# Pokédex

Reimagining the Pokedex as a modern, generation-aware web product.

## Features

-  Live Pokémon Search (API-powered)
-  Live Search Autocomplete
-  Dynamic Stat Radar Visualization
-  Accurate Type Effectiveness Calculation (competitive-level)
-  Interactive Form & Mega Evolution Interface
-  Real Pokédex Entries with Typewriter Animation
-  Shiny Pokémon Toggle
-  Responsive Layout
-  BackEnd Caching for faster searches
-  Modern Rotom-inspired UI/UX

## Tech Stack Used:
Frontend
- React (Vite)
- Tailwindcss

BackEnd
- FastAPI

Data Visualization
- Recharts

# In Progress
- Real Forms and Regional Variants System
- Branch Evolution Chains
- Animations and Transitions
- Compare Mode

# Status as of Now
Day 1: Layouting
Day 2: Restructured Screen into 2D layout, added accent styling, defined forms & megas architecture plan
Day 3: Built Pokémon battle panel, i.e radar stat chart, BST display, type effectiveness, mega evolution toggle logics, and dex entry section
Day 4: Integrated FastAPI backend with PokéAPI
- Enabled live Pokémon search (real-time data fetching)
- Connected frontend to backend API
- Rendered dynamic:
  - Pokémon stats
  - Types
  - Official artwork sprites
- Added real Pokédex descriptions (species endpoint)
- Implemented typewriter animation for dex entry
- Optimized rendering (memoization for radar chart)
- Implemented fully accurate type effectiveness system:
  - Supports ×4, ×2, ×0.5, ×0.25, ×0 multipliers
  - Works correctly for dual-type Pokémon
### Day 5
Focused on responsiveness, UX polish, and search improvements:
- Added Pokémon cry support
- Added shiny sprite support
- Added evolution chain visualization
- Refactored layout architecture for scalable rendering
- Rebuilt content rendering system using conditional rendering
- Fixed overflow & scrolling conflicts across layouts
- Implemented responsive multi-device support
- Improved evolution chain responsiveness
- Optimized radar chart sizing and spacing
- Added shiny evolution sprite support
- Improved search responsiveness and loading flow
- Added backend caching for faster repeated searches
- Built live Pokémon autocomplete system
- Implemented interactive autocomplete dropdown behavior
- Polished dropdown UX interactions and mobile responsiveness