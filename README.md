# Game Add Dashboard

> Automation tool that collects game launch data from a Google Play Store URL and automatically submits it to a Google Form — eliminating manual data entry entirely.

Built with **Node.js · Express · Playwright · Axios · franc**

---

## Overview

**Game Add Dashboard** automates the process of tracking newly launched games on the Google Play Store.

Instead of manually copying game details like the name, developer, and Play Store link, this system automatically extracts all required information from a given URL and submits it directly to a Google Form — which feeds into a live Google Sheets dashboard.

The result: what used to take minutes of manual work now happens in seconds.

**Live Dashboard →** [View Google Sheets](https://docs.google.com/spreadsheets/d/18Zc1F8TOE6cCWPNTNsTeRImzepJdGydfAD7nRx3ys9U/edit?gid=1115735951#gid=1115735951)

---

## How It Works

```
User submits a Play Store URL
        ↓
Backend API receives the request
        ↓
Playwright opens the Play Store page
        ↓
Game information is extracted
        ↓
Language of the game title is detected
        ↓
Google Form is automatically filled & submitted
        ↓
Data is stored in Google Sheets 
```

---

## Features

-  Accepts any Google Play Store game URL as input
-  Automatically extracts game name, developer, and Play Store link
-  Detects the language of the game title using `franc`
-  Submits extracted data directly to a Google Form
-  Data is stored and visible in a live Google Sheets dashboard
-  Error handling and logging for easy debugging

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Node.js](https://nodejs.org) | JavaScript runtime for backend |
| [Express.js](https://expressjs.com) | API server and routing |
| [Playwright](https://playwright.dev) | Browser automation and scraping |
| [Axios](https://axios-http.com) | HTTP client for form submissions |
| [franc](https://github.com/wooorm/franc) | Language detection from text |

---

## Project Structure

```
game-add-dashboard/
│
├── server.js                 # Main Express server & API logic
├── package.json              # Project dependencies
├── utils/
│   └── languageDetector.js   # Language detection using franc
├── public/
│   ├── index.html            # Frontend UI
│   ├── script.js             # Frontend logic
│   └── style.css             # Styling
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/gurpreetsingh911/playstore-game-launch-scraper.git
```

**2. Navigate into the project:**
```bash
cd playstore-game-launch-scraper
```

**3. Install dependencies:**
```bash
npm install
npx playwright install chromium
```

**4. Start the server:**
```bash
node server.js
```

The server runs at:
```
http://localhost:3000
```

---

##  API Reference

### `POST /fetch-game`

Accepts a Play Store URL, scrapes the game data, and submits it to the Google Form.

**Request Body:**
```json
{
  "url": "https://play.google.com/store/apps/details?id=com.example.game"
}
```

**What happens next:**
1. Playwright opens the Play Store page
2. Game name, developer, and link are extracted
3. Language is detected from the game title
4. Data is submitted to the Google Form
5. Response is stored in Google Sheets

**Success Response:**
```json
{
  "status": "success",
  "message": "Game data submitted successfully"
}
```

---

##  Future Improvements

- [ ] Add database support for storing historical game records
- [ ] Build a proper frontend dashboard for viewing submissions
- [ ] Add scheduled automation for daily/weekly game tracking
- [ ] Support bulk URL submissions
- [ ] Improve scraping reliability with retry logic
- [ ] Add email/Slack notifications on new submissions

---

##  License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## Author

**Gurpreet Singh**
- GitHub: [@gurpreetsingh911](https://github.com/gurpreetsingh911)

---

> If you found this useful, consider giving the repo a star!