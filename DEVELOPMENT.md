# GanjaGuru - The Socket: Android Development Guide

This guide explains how to run and develop this application entirely offline on your Android device using **Termux** and **Acode**.

## 1. Prerequisites
- **Termux**: Download from F-Droid (not Play Store).
- **Acode**: A powerful code editor for Android.
- **Project Files**: Download the project ZIP from AI Studio or use `git clone`.

## 2. Setup Environment
Open Termux and run these commands to install the necessary tools:
```bash
pkg update && pkg upgrade
pkg install nodejs git build-essential python
```

## 3. Project Setup
Navigate to your project folder (e.g., if you downloaded it to your Downloads folder):
```bash
cd /sdcard/Download/ganjaguru-socket
npm install
```
*Note: You may need to run `termux-setup-storage` first to access your files.*

## 4. Run Development Server
To start the app locally:
```bash
npm run dev
```
The app will be available at `http://localhost:3000` in your Android browser.

## 5. Offline Development Workflow
1. **Edit**: Open the project folder in **Acode**. Make your changes and save.
2. **View**: Switch to your browser and refresh `localhost:3000`.
3. **Build**: To create a single-file version for easy sharing:
   ```bash
   npm run build:single
   ```
   This creates `dist/index.html` which you can open directly in any browser without a server.

## 6. PWA Installation
Once the app is running on `localhost:3000`:
1. Open Chrome on Android.
2. Tap the three dots (menu).
3. Select **"Add to Home Screen"**.
4. The app will now appear on your home screen and work offline!

---
*Stay green. Keep coding. - GanjaGuru*
