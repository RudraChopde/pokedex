# POKEDEX

Reimagining the Pokedex as a modern, generation-aware web product.

## Features

-  Live Pokémon Search (API-powered)
-  Dynamic Stat Radar Visualization
-  Accurate Type Effectiveness Calculation (competitive-level)
-  Form & Mega Evolution Architecture (UI-ready)
-  Real Pokédex Entries with Typewriter Animation
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
- Forms and Regional Variants
- Cry Audio
- Advanced Animations

# Status as of Now
Day 1: Layoutting
Day 2: Restrucuted Screen into 2D layout, addded accent styling, defined forms & megas architecture plan
Day 3: Built Pokemon battle panel, i.e radar stat chart, BST display, type effectiveness, mega evolution toggle logics, and dex entry section
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