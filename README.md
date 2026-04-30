# Game Add Dashboard

Automation tool that collects game launch data from a Google Play Store URL and automatically submits it to a Google Form.

Built with **Node.js, Express, Playwright, Axios, and franc**.

---

# Overview

This project automates the process of collecting game launch information from the Google Play Store and submitting it to a Google Form.

Instead of manually copying game details such as the game name, developer, and Play Store link, the system automatically extracts the required information and submits it to a dashboard.

The automation significantly reduces manual effort and speeds up the workflow for tracking new game launches.

---

## Sheet Link

https://docs.google.com/spreadsheets/d/18Zc1F8TOE6cCWPNTNsTeRImzepJdGydfAD7nRx3ys9U/edit?gid=1115735951#gid=1115735951

---

# Tech Stack

* **Node.js** – JavaScript runtime for backend development
* **Express.js** – Web framework used to build the API server
* **Playwright** – Browser automation for scraping and form automation
* **Axios** – HTTP client used to send form submissions
* **franc** – Language detection library for detecting game language

---

# Features

* Automated extraction of game data from Play Store URLs
* Automatic language detection from game text
* Automated Google Form submission
* Backend API endpoint to process URLs
* Error handling and logging for debugging

---

# System Workflow

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
Google Form is automatically filled
↓
Data is stored in Google Sheets

---

# Project Structure

```
game-add-dashboard
│
├── server.js
├── package.json
├── utils
│   └── languageDetector.js
├── public
│   └── index.html
|   └── script.js
|   └── stype.css  
└── README.md
```

---

# Installation

Clone the repository:

```
git clone https://github.com/gurpreetsingh911/game-add-dashboard.git
```

Navigate into the project directory:

```
cd game-add-dashboard
```

Install dependencies:

```
npm install
```

---

# Running the Project

Start the server:

```
node server.js
```

The API server will run on:

```
http://localhost:3000
```

---

# Example API Request

Endpoint:

```
POST /fetch-game
```

Example request body:

```
{
  "url": "https://play.google.com/store/apps/details?id=example"
}
```

The server will:

1. Open the Play Store page
2. Extract the game information
3. Detect the language
4. Submit the data to the Google Form
5. Store the response in Google Sheets

---

# Future Improvements

* Add database support for storing game records
* Build a frontend dashboard for submissions
* Add scheduled automation for daily checks
* Improve scraping reliability and error handling

---

# License

MIT License
