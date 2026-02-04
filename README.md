# 🎨 DuoCanvas

> **Professional Sports Graphics Generator**
> Optimized for social media sharing (Instagram/Mobile). Built for the **Duo Ligones** sports club.

[![Link Live](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://PtrTella.github.io/DuoCanvas/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🌟 Overview

DuoCanvas is a high-performance web application designed to empower sports organizations to create high-quality, professional graphics in seconds. Whether it's a match result, a starting lineup, or a league ranking, DuoCanvas provides a seamless experience from data entry to PNG export.

### Key Highlights

- **Retina Quality Export:** 1080x1350px PNG images optimized for Instagram standards.
- **Mobile-First Workflow:** Fully responsive interface with native-like mobile controls (bottom sheets) and virtual keyboard optimization.
- **Smart Data Import:** Automatic synchronization with CSI portals and intelligent manual text parsing for rankings.
- **Dynamic Theming:** Instant switching between brand colors (Orange, Blue, Green, etc.).

---

## 🚀 Features

### 📋 Intelligent Ranking Management

Includes advanced parsing utilities for basketball and soccer. Just paste raw text from a website or spreadsheet, and the system automatically detects teams, points, matches played, and averages.

### 🖼️ Modular Template System

Designed with a **Registry Pattern**. Adding a new graphic type takes minutes and requires zero changes to the core engine.

### 📱 Superior UX

- **Live Preview:** Real-time feedback as you type.
- **Double-Shot Export:** Advanced rendering technique to ensure consistent font and image decoding on mobile browsers.
- **Sponsor Engine:** Automatically applies a consistent sponsor footer across all generated graphics.

---

## 🛠️ Tech Stack

- **Framework:** React 19 (Functional Components & Hooks)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Image Processing:** `html-to-image` with pixel-ratio 2x optimization.
- **Icons:** Lucide React
- **Utility:** `downloadjs` for seamless file management.

---

## 🏗️ Architecture & Documentation

For detailed technical information, architecture diagrams, and contribution guides, please refer to the **[Technical Documentation](DOCUMENTATION.md)**.

## 🛠️ Development Setup

### Local Installation

1. **Clone:**

   ```bash
   git clone https://github.com/PtrTella/DuoCanvas.git
   cd DuoCanvas
   ```

2. **Setup:**

   ```bash
   npm install
   ```

3. **Running:**

   ```bash
   npm run dev
   ```

### Deployment

Managed via **GitHub Pages**:

```bash
npm run deploy
```

---

## 📄 License & Ownership

Created for **Duo Ligones**. All rights reserved. Professional redistribution requires authorization.
