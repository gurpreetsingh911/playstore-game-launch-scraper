# Game Link → Trello Card Automation Flow

This system automates the process of collecting game launch information from the Google Play Store and creating a Trello card through an automated workflow.

The goal is to eliminate manual data entry and speed up the process of adding new games to the tracking dashboard.

---

# System Workflow

## Step 1 — User Input

A small web interface allows the user to submit a Google Play Store link.

Interface elements:

* Input box → Paste Google Play Store link
* Button → **Add Game**

Example input:

https://play.google.com/store/apps/details?id=com.xxx.game

---

## Step 2 — Send Request to Backend

When the **Add Game** button is clicked, the frontend sends the Play Store URL to the backend API.

Example API request:

POST /fetch-game

Request body:

{
"url": "playstore link"
}

---

## Step 3 — Open Play Store Page

The backend uses **Playwright automation** to open the Play Store page.

Automation steps:

1. Launch browser
2. Open Play Store URL
3. Wait for page to fully load

---

## Step 4 — Extract Game Information

The automation script reads elements from the page and extracts important game data.

Extracted fields include:

* Game Name
* Developer Name
* Package Name
* Category
* Rating
* Downloads
* Last Updated Date
* Icon URL
* Description

All extracted information is stored as structured JSON data.

---

## Step 5 — Map Data to Form Fields

Each extracted field is mapped to a corresponding Google Form field.

Example mapping:

Game Name → Form Field A
Developer → Form Field B
Version → Form Field C
Platform → Form Field D

Field IDs are obtained by inspecting the Google Form.

---

## Step 6 — Automatically Submit Google Form

The backend sends a hidden POST request to the Google Form endpoint.

This automatically submits the collected data without requiring manual typing.

---

## Step 7 — Existing Automation Workflow

After the form submission, the existing automation pipeline handles the rest of the process.

Google Form
↓
Google Sheets
↓
Automation Script
↓
Trello Card Created

No changes are required in this part of the system.

---

## Step 8 — Success Response

Once the process completes, the frontend displays a confirmation message.

Example message:

✅ Game Added Successfully
Trello card created

---

# Final User Workflow

Daily usage flow:

Paste Play Store link
↓
Click **Add Game**
↓
System fetches game details
↓
Google Form is auto-filled
↓
Trello card is created

Average processing time: **~5 seconds per game**

------------------------------------------------------------------------------------------------