# 📔 Technical Documentation - DuoCanvas

This document provides a deep dive into the architecture, patterns, and development standards of the DuoCanvas project.

---

## 🏗️ Core Architecture: The Template Registry

DuoCanvas avoids complex conditional rendering by using a **Registry Pattern**. Every graphic is treated as a "Plugin".

### 1. Anatomy of a Template

Each file in `src/templates/` must export a configuration object:

```javascript
export const MyTemplate = {
  id: 'unique_id',         // String: Must match keys in TEMPLATE_DEFAULTS
  name: 'Display Name',    // String: Shown in the Template Selector
  icon: Trophy,            // Component: Lucide Icon
  defaultTheme: 'blue',    // String: Applied on first load (optional)

  // The visual output (1080x1350px)
  Render: ({ data, theme, cardRef, branding }) => (
    <BaseCard theme={theme} ref={cardRef} branding={branding}>
      {/* Content */}
    </BaseCard>
  ),

  // The editor form
  Controls: ({ data, onChange, themeColor }) => (
    <div>{/* Form Blocks */}</div>
  )
};
```

### 2. State Hub & Lifecycle

The application manages state through `App.jsx` using a sophisticated persistence model:

- **`activeProfileId`**: Determines the core branding and default data (Duo Ligones vs Volta).
- **`sessionData`**: Global shared state (Home Team, Logo, Generic Colors). Resets or inherits from the profile default upon switching.
- **`templateDataMap`**: A directory of states, keyed by template ID. This ensures that when you switch from "Result" to "Lineup", your lineup doesn't overwrite your scores, and vice versa.
- **Sync Logic**: `onChange` automatically detects if a key belongs to global or template state and updates the map accordingly.

---

## 🏗️ Advanced Systems

### Multi-Profile Architecture

Introduced in v2.0, this allows for white-labeling the studio.

- **Location**: `src/config/defaults.js` -> `APP_PROFILES`.
- **Scope**: Each profile defines its own `branding` (sponsors, tagline) and `global` defaults (primary team logo, stadium name).

### Typography Engine ("Cyber Sport")

To ensure a high-impact aesthetic, DuoCanvas uses a dynamic font injection system.

- **Font**: **Orbitron** (Google Fonts).
- **Implementation**: `BaseCard.jsx` injects fonts using CSS variables:

  ```css
  --font-sans: var(--font-cyber);
  --font-mono: var(--font-cyber);
  ```

- **Result**: Consistent, futuristic typography across both text and numeric scores without manual class application on every element.

---

## 📂 Folder Structure

```text
DuoCanvas/
├── public/
│   ├── logos/           # Assets (Sponsors, Club Logos)
│   └── themes/          # High-res background textures
├── src/
│   ├── components/
│   │   ├── blocks/      # UI logic fragments (MatchScore, TeamMatchup, etc.)
│   │   ├── ui/          # Atomic components (BaseCard, TeamDisplay)
│   │   └── editor/      # ControlsPanel, ProfileSelector, etc.
│   ├── config/          # Defaults (APP_PROFILES), Constants (THEMES)
│   ├── hooks/           # useScale, useDownload, useCsi
│   ├── templates/
│   │   ├── factories/   # Blueprints for multi-sport layouts
│   │   └── ...          # Specific templates
│   ├── utils/           # Pure logic (ranking parsing, scraper helpers)
│   └── App.jsx          # Root orchestrator
└── vite.config.js       # V7 + Tailwind 4 Setup
```

---

## 🛠️ Logic Utilities

### Ranking Parser (`rankingUtils.js`)

Universal parser for raw tournament data.

- **Features**: Multi-format support, column normalization, and error handling. It supports sport-specific configurations (Soccer vs Basketball).

### CSI Synchronization (`useCsi.jsx`)

A robust hook that fetches remote data via proxy/script-injection.

- **Smart Caching**: Avoids redundant network requests during session.
- **Validation**: Sanitizes scrapped strings to prevent rendering artifacts.

---

## 🎨 Styling Standards & Design Language

The project follows a **"Cyber Sport Studio"** aesthetic:

1. **Hierarchy**: Headers must use `tracking-widest` and Lucide icons.
2. **Typography**: Always rely on the `BaseCard` font injection; do not hardcode font families in components.
3. **Standard Inputs**: Use `bg-gray-50`, `rounded-xl`, and `focus:border-black`.
4. **Encapsulation**: Layout blocks (like `MatchScore`) should include their own `Controls` component for easy assembly.
5. **Dynamic Themes**: Use `theme.primary` (gradient) and `theme.accent` (text color). Use the `gold` theme for premium "Dragon Ball" inspired graphics.

---

## 🚀 Development Workflow

### Adding a New Layout

1. **Define Blocks**: Create/Reuse components in `src/components/blocks/`.
2. **Instance Template**: Create a file or use a factory in `src/templates/`.
3. **Defaults**: Add initial state to `TEMPLATE_DEFAULTS` in `config/defaults.js`.
4. **Register**: Add the object to `TEMPLATES` in `config/templateRegistry.js`.
5. **Branding Check**: Ensure the new template's `Render` function receives the `branding` prop for footer consistency.
