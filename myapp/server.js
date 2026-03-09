const detectLanguage = require("./utils/languageDetector");

const { chromium } = require("playwright");

const express = require("express");

const axios = require("axios");

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/fetch-game", async (req, res) => {
  const { url } = req.body;

  const browser = await chromium.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded" });

await page.waitForLoadState('networkidle');

// ⭐ Game Name
const gameTitle = await page.locator("h1").first().textContent();

// ⭐ Google Play link
const Google_link = page.url();

// ⭐ Developer name
const developer = await page.locator('a[href*="dev"]').first().textContent();

console.log("Game Name:", gameTitle);
console.log("Developer:", developer);
console.log("Google_link:", Google_link);

// fetch Dev id

const dev_id = await page.getByLabel('See more information on More by').click()

// Locate by text (e.g., the "Website" link on a Play Store page)

const Dev_href = await page.page.locator('a:has-text("Visit website")')

// // OR - const Dev_href = await page.getAttribute('text="Visit website"', 'href');

// console.log(Dev_href)

// let devLink = "N/A"

// if(Dev_href){

// }











// 1. opeaning google form

const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfNFbqE1XvEbd3xZlkXAhKmrkzH2OxZXuYcaK7d61CcAztSEg/viewform";
await page.goto(formUrl);

//2. Check Email field
const Email_Check_Box = await page.getByRole('checkbox', { name: 'Record email as the email to' });

//2.1 Perform an action, e.g., click or fill
await Email_Check_Box.click();

// 3. Add Google Form URL
await page.getByLabel('Game Name').fill(gameTitle);

// 4. Add Google Play Link
await page.getByLabel('Google play link').fill(Google_link);

// 5. Developer Name
await page.getByLabel('Developer name (must required for the New Launch)').fill(developer);

//------------------STEP 2 — Fill Text Fields-----------------

// 1. Click on Game submitted for -> Game launch
await page.getByText('Game launch', { exact: true }).click();

// 2. Click Any kind of deal expected? (ONLY for new launches) -> Yes
await page.getByLabel('Any kind of deal expected? ').getByText('CPI', { exact: true }).click();

// 3. Launch timeframe -> add todays data
    //For added Current date in Launch timeframe
     
  let Launch_Timeframe = await page.locator("div[class='rFrNMe k3kHxc RdH0ib yqQS1 zKHdkd u3bW4e'] input[type='text']")

  let CurrentDate = new Date();

  let today_day = CurrentDate.getDate();
  let today_Month = CurrentDate.getMonth() + 1; // months start from 0
  let today_Year = CurrentDate.getFullYear();

  let updateDate = (`${today_day}-${today_Month}-${today_Year}`);

  await Launch_Timeframe.click();  
  await Launch_Timeframe.fill(updateDate);

// await Launch_Timeframe.nth(0).fill(`${today_day}`);
// await Launch_Timeframe.nth(1).fill(`${today_Month}`);
// await Launch_Timeframe.nth(2).fill(`${today_Year}`);


// 4. Fill Target geo?
 
const language = await detectLanguage(gameTitle);
//console.log("Detected language:", language);

await page.getByLabel('Target geo?').fill(language);


//await page.waitForTimeout(5000); // waits for 2 seconds

//STEP 5 — Fill Expected Rating
await page.getByLabel('Expected game rating/Tier?').fill('IP2');

//STEP 6 — Check mark Live in other geo or not

await page.getByLabel('ONLY for new launches').getByText('Yes', { exact: true }).click();


//STEP 7 — fill the Fetch dev "Dev_href" website link (if available)


await page.getByLabel('Official forums (game website, FB').fill(Dev_href);



//STEP 5 — Submit Form
//await page.getByRole('button', { name: 'Submit' }).click();

await axios.post(
  "https://docs.google.com/forms/d/e/1FAIpQLSefoeEJUV7joqOQGsHFFf4ukw5NhtnFZYZVwjnUzg9Kpsqcig/formResponse",
  new URLSearchParams({
    "entry.1645981813": gameTitle,
    "entry.1449005772": Google_link,
    "entry.1685270148": developer,
    "entry.558663507": "IP2"
  }),
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }
);








res.json({
  message: "Game fetched",
  gameName: gameTitle,
  googleLink: Google_link,
  developer: developer
});



});


