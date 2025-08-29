# 🪙 Metal Prices Generator App

A cross-platform mobile/web application built using **React Native (Expo)** that displays real-time prices of precious metals like Gold, Silver, Platinum, and Palladium in ₹ per gram.

## 📱 Features

- Real-time metal prices via **GoldAPI**
- Supports **mock fallback prices** if API key fails or quota exceeded
- Platform support: **Android, iOS, and Web**
- Metal Detail screen with:
  - Current Price
  - Open Price
  - Previous Close Price
  - Ask Price
  - Last Updated Time
- Minimalist **dark UI** with Ionicons for visual enhancement
- Refreshes prices every 5 minutes

---

## 🔧 Tech Stack

- **React Native** (via Expo)
- **Expo Constants** (for API key management)
- **React Navigation**
- **Ionicons**
- **GoldAPI** (https://www.goldapi.io/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Shawshank08/metal-prices-generator-js.git
cd metal-prices-generator-js
```

### 2. Install dependencies
```bash
npm install
```

3. Set up your API Key
Create an .env file (already ignored via .gitignore) at the root:
```bash
GOLD_API_KEY=your_api_key_here
```

4. Run the app
```bash
npm start
```
## Then choose:

  Android: press a

  iOS: press i

  Web: press w

⚠️ Make sure Expo Go is installed on your device if running on physical hardware.
