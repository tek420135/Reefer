# GanjaGuru - The Socket: Placeholder Registry

This document tracks all placeholder assets, data points, and hardcoded values currently used in the **The Socket** metaverse. Replace these with production assets and real-time data as the platform scales.

## 🖼 Image Placeholders (CDN)
All images currently use `picsum.photos` with specific seeds for thematic consistency.

| Location | Placeholder URL | Purpose |
| :--- | :--- | :--- |
| **Hero Section** | `https://picsum.photos/seed/cannabis-meta/800/450` | Main metaverse preview visual. |
| **Blog Section** | `https://picsum.photos/seed/blog-{i}/400/225` | Featured images for blog dispatches. |
| **Marketplace** | `https://picsum.photos/seed/product-{i}/400/400` | Product thumbnails for the shop. |
| **VR Portal** | `https://picsum.photos/seed/vr-grow/800/400` | Preview for the Virtual Grow space. |
| **Floating Guru** | `https://picsum.photos/seed/guru-avatar/100/100` | Avatar for the AI assistant. |

## 📊 Hardcoded Data Points
These values are currently static or randomized for the demo experience.

| Feature | Hardcoded Value | File |
| :--- | :--- | :--- |
| **Seed Counter** | Starts at `420`, increments randomly. | `App.tsx` |
| **User Profile** | `GUEST_420` (Rank: Seedling). | `LandingPage.tsx` |
| **Grow Stats** | Temp: `78°F`, Humid: `55%`, CO2: `1200`. | `GrowDashboard.tsx` |
| **Market Prices** | Randomized between `$10` and `$500`. | `Marketplace.tsx` |
| **Booking Slots** | Static time arrays (9 AM - 5 PM). | `BookingSystem.tsx` |

## 🔑 Environment Variables
Defined in `.env.example`.

*   `GEMINI_API_KEY`: Required for the AI Guru to function.
*   `APP_URL`: Injected by the platform for internal routing.

## 🛠 Integration Placeholders
*   **Checkout**: The "Buy" button triggers a confetti animation but does not process actual payments.
*   **Consultation**: The "Book" button shows a success message but does not send calendar invites.
*   **VR Portal**: The "Launch" button is a UI placeholder for future WebXR integration.

---
**Note:** To replace these, update the corresponding components in `src/components/`.
