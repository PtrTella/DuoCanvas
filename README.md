# 🎨 DuoCanvas

> **Professional Sports Graphics Generator**
> Optimized for social media sharing (Instagram/Mobile). Multi-profile support for **Duo Ligones** and **Volta Basket**.

[![Link Live](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://PtrTella.github.io/DuoCanvas/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🌟 Overview

DuoCanvas is a high-performance web application designed to empower sports organizations to create high-quality, professional graphics in seconds. Since v2.0, the app supports **Multiple Club Profiles**, allowing organizations to manage different brands (logos, sponsors, arenas) within a single studio environment.

### Key Highlights

- **Retina Quality Export:** 1080x1350px PNG images optimized for Instagram standards.
- **Cyber Sport Typography:** Dynamic font injection using **Orbitron** for a futuristic, impactful look.
- **Multi-Profile Architecture:** Switch between clubs (e.g., Duo Ligones, Volta Basket) with one click.
- **Dynamic Theming:** Premium palettes including **Gold** (Premium Yellow/Amber) and **Black/White**.
- **Mobile-First Workflow:** Fully responsive interface with native-like mobile controls and virtual keyboard optimization.
- **Smart Data Import:** Automatic synchronization with CSI portals and intelligent manual text parsing for rankings.

---

## 🚀 Features

### 🏢 Multi-Society Switcher

Manage multiple sports clubs from the same interface. Each profile (defined in `APP_PROFILES`) automatically loads specific:

- Home Team names & logos.
- Sponsor footers.
- Default palettes (e.g., Gold/Stone for Volta).
- Standard Arenas/Locations.

### 📋 Intelligent Ranking Management

Includes advanced parsing utilities for basketball and soccer. Just paste raw text from a website or spreadsheet, and the system automatically detects teams, points, matches played, and averages.

### 🖼️ Modular Template System

Designed with a **Registry Pattern**. Adding a new graphic type takes minutes and requires zero changes to the core engine.

### 📱 Superior UX

- **Live Preview:** Real-time feedback as you type.
- **Double-Shot Export:** Advanced rendering technique to ensure consistent font and image decoding on mobile browsers.
- **Cyber Typography:** Numbers and headers utilize CSS variable overrides to ensure high-impact readability.

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
