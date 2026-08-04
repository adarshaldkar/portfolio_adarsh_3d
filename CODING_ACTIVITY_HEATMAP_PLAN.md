# GitHub & LeetCode Coding Activity Heatmap Architecture Plan

> **Architectural Blueprint & Implementation Guide**  
> **Target Project:** Adarsh Patel 3D Portfolio (`Adarsh_3D_Portfolio`)  
> **Component Name:** `CodingActivity.jsx`  
> **GitHub Profile:** [`adarshaldkar`](https://github.com/adarshaldkar)  
> **LeetCode Profile:** `adarshaldkar`  
> **Date:** August 2026  

---

## Executive Overview

To showcase Adarsh Patel's consistent software engineering workflow, daily commit discipline, and algorithmic problem-solving mastery, we are building a dedicated **Coding Activity & Open Source Showcase** component (`CodingActivity.jsx`).

This component will feature:
1. **GitHub 365-Day Interactive Contribution Heatmap**: Real-time visualization of commit activity, pull requests, and repository creations over the past year using custom dark-mode theme colors (`#915EFF` purple/indigo gradient).
2. **GitHub Developer Stats Card**: Live statistics tracking Total Commits, Stars Received, Merged PRs, Contributed Repositories, and Current Commit Streak.
3. **LeetCode Problem-Solving Dashboard**: Live breakdown of solved problems across **Easy**, **Medium**, and **Hard** difficulty tiers with radial progress meters, Acceptance Rate %, and Global Ranking.
4. **LeetCode Submission Heatmap**: Daily submission activity calendar tracking active problem-solving streaks.

---

## System Architecture & Component Design

```
[ App.jsx Main Page Layout ]
       │
       ├── <Navbar />
       ├── <Hero />
       ├── <About />
       ├── <Experience />
       ├── <Tech />
       │
       ├── ▶ <CodingActivity />  <-- [NEW COMPONENT]
       │       ├── GitHub Activity Tab
       │       │     ├── 365-Day Contribution Calendar Heatmap
       │       │     ├── GitHub Profile Metrics Grid (Commits, Stars, PRs, Streak)
       │       │     └── Language Distribution Percentage Bar
       │       │
       │       └── LeetCode Activity Tab
       │             ├── Problem Solver Radial Progress Rings (Easy / Medium / Hard)
       │             ├── Global Rank, Acceptance Rate & Rating Badges
       │             └── Submission Activity Calendar
       │
       ├── <Works />
       ├── <Feedbacks />
       ├── <Contact />
       └── <Footer />
```

---

## Detailed Feature Specifications

### 1. 🐙 GitHub Activity & Contribution Heatmap

- **365-Day Heatmap Grid**:
  - Uses `react-activity-calendar` or live SVG chart endpoint (`https://ghchart.rshah.org/915EFF/adarshaldkar`).
  - Custom color scale aligned with portfolio aesthetics:
    - Level 0 (No activity): `#161b22` (Dark Slate)
    - Level 1 (Low activity): `#39d35322` / `#915EFF33`
    - Level 2 (Moderate): `#915EFF66`
    - Level 3 (High): `#915EFF99`
    - Level 4 (Extreme): `#915EFF` (Vibrant Glowing Purple)
  - Tooltips displaying exact date and commit count on hover (e.g., *"14 contributions on Aug 3, 2026"*).

- **Real-Time GitHub Stats Cards**:
  - **Total Contributions**: Fetched live via GitHub REST API (`https://api.github.com/users/adarshaldkar`).
  - **Public Repositories**: Total count of active repositories.
  - **Star Counter**: Total stars accrued across all public projects.
  - **Current Streak**: Consecutive days with at least 1 commit.

---

### 2. 🧩 LeetCode Problem-Solving Dashboard

- **Live Data Fetcher**:
  - Fetches real-time profile metrics from `https://leetcode-stats-api.herokuapp.com/adarshaldkar` or fallback proxy endpoint `https://alfa-leetcode-api.onrender.com/userProfile/adarshaldkar`.

- **Difficulty Breakdown Cards & Progress Rings**:
  - **Total Solved Counter**: Highlighted total count (e.g., `450+ Solved`).
  - **Easy Problems**: Green progress bar (`#00E676`) with solved/total ratio.
  - **Medium Problems**: Yellow/Orange progress bar (`#FFB300`) with solved/total ratio.
  - **Hard Problems**: Pink/Red progress bar (`#FF1744`) with solved/total ratio.

- **Rank & Acceptance Badges**:
  - **Global Ranking**: Top X% percentile worldwide badge.
  - **Acceptance Rate**: Overall submission accuracy percentage (e.g., `68.4%`).
  - **Contribution Points**: LeetCode community reputation score.

---

## Step-by-Step Implementation Roadmap

### Step 1: Create Component File `src/components/CodingActivity.jsx`
- Build a responsive layout container wrapped in `SectionWrapper` for motion animations (`framer-motion`).
- Implement tab navigation toggle: `[ 🐙 GitHub Activity ]` vs `[ 🧩 LeetCode Stats ]` (or a unified side-by-side grid on desktop).

### Step 2: Add API Fetchers & Error Boundaries
- Implement asynchronous `fetchGitHubStats()` and `fetchLeetCodeStats()` with error handling.
- Add fallback static metrics so the component renders seamlessly even during API rate-limiting or offline mode.

### Step 3: Register & Embed in Portfolio Layout
- Export `CodingActivity` from `src/components/index.js`.
- Render `<CodingActivity />` inside `src/App.jsx` right after `<Tech />` and before `<Works />`.

### Step 4: Update Navigation Links
- Add `{ id: "activity", title: "Activity" }` to `navLinks` in `src/constants/index.js` for smooth scroll navigation.

---

## Verification & Testing Strategy

1. **API Integration Test**: Verify live data response from GitHub REST API and LeetCode API endpoints.
2. **Responsive Layout Verification**: Ensure the heatmap scales properly on mobile screens (`< 640px`) without horizontal overflow.
3. **Theme & Hover Effects**: Verify neon purple glassmorphism borders (`border-[#915EFF40]`), smooth card hover scales, and tooltip positioning.
4. **Build Validation**: Run `npm run build` to confirm zero compilation or bundler errors.
