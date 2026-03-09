# Game Launch Automation

Automation tool that collects game launch data from a URL and automatically submits it to a Google Form.
Built with **Node.js, Express, Playwright, Axios, and franc**.

---

# Overview

This project automates the workflow of extracting game information and submitting it to a form without manual entry.

The system:

1. Accepts a game URL
2. Extracts important game data
3. Detects the language of the game description
4. Submits the collected information to a Google Form

This helps eliminate repetitive manual work and speeds up data collection.

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **Playwright** (web automation)
* **Axios** (HTTP requests)
* **franc** (language detection)

---

## ✨ Features

* Automated extraction of game data
* Language detection from game text
* Automatic Google Form submission
* Backend API for processing URLs
* Error handling and debugging logs

---

## 📂 Project Structure

```
game-launch-automation
│
├── server.js
├── package.json
├── utils
│   └── languageDetector.js
├── automation
│   └── formSubmitter.js
└── README.md
```

---

## ⚙️ Installation

Clone the repository:

```
git clone https://github.com/YOUR_USERNAME/game-add-dashboard.git
```

Go into the project folder:

```
cd game-launch-automation
```

Install dependencies:

```
npm install
```

---

## ▶️ Running the Project

Start the server:

```
node server.js
```

The API will start on:

```
http://localhost:3000
```

---

## 📡 Example API Request

```
POST /fetch-game
```

Example body:

```
{
  "url": "https://example-game-url.com"
}
```

The server processes the URL, extracts the game information, detects language, and submits the data to the Google Form.

---

## 🧠 Language Detection

The project uses **franc** to detect the language of game text and restricts detection to selected supported languages.

---

## 📌 Future Improvements

* Add database support
* Add automated scheduling
* Build a simple UI dashboard
* Improve scraping accuracy

---

## 📄 License

MIT License
