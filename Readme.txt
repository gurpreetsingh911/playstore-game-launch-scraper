✅ Complete Flow — Game Link ➜ Trello Card

STEP 1 — User Input

You create a small webpage/app:

Input box → Paste Google Play link
Button → "Add Game"

User pastes:

https://play.google.com/store/apps/details?id=com.xxx.game



STEP 2 — Send Link to Backend

When button is clicked:

Frontend → sends GP link → Backend API

Example:

POST /fetch-game
{
   "url": "playstore link"
}
STEP 3 — Open Play Store Page

Backend script uses Playwright:

Launch browser
Open Play Store URL
Wait until page loads
STEP 4 — Extract Game Details

Automation reads page elements and collects:

Game Name
Developer
Package Name
Category
Rating
Downloads
Last Updated
Icon URL
Description

Store data as JSON.

STEP 5 — Map Data to Form Fields

Create mapping once:

Game Name  → Form Field A
Developer  → Form Field B
Version    → Form Field C
Platform   → Form Field D
etc.

(You get field IDs from Google Form inspection.)

STEP 6 — Auto Submit Google Form

Backend sends hidden form submission:

POST → Google Form endpoint

Form gets submitted automatically.

(No manual typing.)

STEP 7 — Google Form Automation Runs

Existing system:

Google Form
   ↓
Google Sheet
   ↓
Automation
   ↓
Trello Card Created

Nothing changes here.

STEP 8 — Show Success Message

Frontend displays:

✅ Game Added Successfully
Trello card created
🔁 Final Workflow (Your Daily Use)
Paste Play Store Link
        ↓
Click Add Game
        ↓
System fetches details
        ↓
Form auto-filled
        ↓
Trello card appears

Time taken: ~5 seconds per game