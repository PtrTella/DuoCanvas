# 📔 Technical Documentation - DuoCanvas

This document provides a deep dive into the architecture, patterns, and development standards of the DuoCanvas project.

---

## 🏗️ Core Architecture: The Template Registry

DuoCanvas avoids complex conditional rendering by using a **Registry Pattern**. Every graphic is treated as a "Plugin".

### 1. Anatomy of a Template

Each file in `src/templates/` must export a configuration object:

```javascript
export const MyTemplate = {
  id: 'unique_id',         // String: Must match keys in defaults.js
  name: 'Display Name',    // String: Shown in the Template Selector
  icon: Trophy,            // Component: Lucide Icon
  defaultTheme: 'blue',    // String: Applied on first load (optional)

  // The visual output (1080x1350px)
  Render: ({ data, theme, cardRef }) => (
    <BaseCard theme={theme} ref={cardRef}>
      {/* Content */}
    </BaseCard>
  ),

  // The editor form
  Controls: ({ data, onChange, themeColor }) => (
    <div>{/* Form Fields */}</div>
  )
};
```

### 2. The State Hub (`App.jsx`)

The application manages two distinct state objects that are merged before being passed to templates:

- **`sessionData`**: Shared global info (Home Team, Logo, Season).
- **`templateData`**: Exclusive to the active template (Scores, Roster text).

## 📂 Folder Structure

```text
DuoCanvas/
├── public/
│   ├── logos/           # Assets (Sponsors, Club Logos)
│   └── themes/          # High-res background textures
├── src/
│   ├── components/
│   │   ├── blocks/      # UI logic fragments (MatchScore, RankingTable, etc.)
│   │   ├── UI/          # Atomic components (BaseCard, TeamDisplay)
│   │   └── editor/      # ControlsPanel and input specialized components
│   ├── data/            # Defaults and Template Registry
│   ├── hooks/           # Custom hooks (scaling, downloads, logic-fetchers)
│   ├── templates/       # Individual graphic templates (The Layouts)
│   ├── utils/           # Pure JS/JSX logic, parsers, and data formatters
│   └── App.jsx          # Application entry point & State Orchestrator
└── vite.config.js       # Deployment & Path Configuration
```

---

## 🛠️ Logic Utilities

### Ranking Parser (`rankingUtils.js`)

Instead of templates handling complex regex, we use a universal parser.

- **Input**: Raw multiline text.
- **Features**: Automatic column detection, number extraction, and per-sport formatting.
- **Usage Example**:

  ```javascript
  const { ranking, hasStats } = parseManualRanking(text, { showDraws: true });
  ```

### CSI Synchronization (`csiUtils.jsx`)

Handles script-injection fetching for the CSI Faenza portal to bypass CORS limitations.

---

## 🎨 Styling Standards

### 1. Dynamic Themes

Never hardcode colors. Use the `theme` object passed to your `Render` component.

- `theme.primary`: Tailwind gradient string (e.g., `from-orange-600 to-red-600`).
- `theme.bg`: Background class for the card.
- `theme.accent`: Text color utility for highlights.

### 2. BaseCard Layers

The `BaseCard` handles the 1080x1350px container and background effects:

1. **Background Layer**: User upload OR theme-default image.
2. **Overlay Layer**: Gradient matching the theme primary color.
3. **Content Layer**: Your `Render` logic.
4. **Footer Layer**: Standardized sponsors.

---

## 📸 Image Export Logic

We use a **"Double-Shot" Technique** in `useDownload.jsx` to solve font/image rendering issues on mobile browsers:

1. **Shot 1 (Invisible)**: Triggers `toPng` once to force the browser to decode resources.
2. **Buffer**: 100ms wait period.
3. **Shot 2 (Final)**: Captures the actual high-res PNG (Retina 2x pixel ratio).

---

## 🚀 How to add a Sport

1. Define the UI blocks in `src/components/blocks/`.
2. Create the Template in `src/templates/`.
3. Update `src/data/defaults.js` with initial values.
4. Register the template in `src/data/templateRegistry.js`.
