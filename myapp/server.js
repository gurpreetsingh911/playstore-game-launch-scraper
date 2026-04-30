const detectLanguage = require("./utils/languageDetector");

const { chromium } = require("playwright");

const express = require("express");

const axios = require("axios");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// ----------------------------------------Home Route-----------------------------
app.get("/", (req, res) => {
  res.send("Server is running ✅");
})

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// Fetch Game Route
app.post("/fetch-game", async (req, res) => {

  let browser;

  try {

    const { url } = req.body;

    // Check if URL exists
    if (!url) {
      return res.status(400).json({
        error: "Play Store URL is required"
      });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return res.status(400).json({
        error: "Invalid URL format"
      });
    }

    // Check if it is Play Store link
    if (!url.includes("play.google.com")) {
      return res.status(400).json({
        error: "Please provide a valid Google Play Store URL"
      });
    }

    // If valid → continue with Playwright

    browser = await chromium.launch({
      headless: false,
    });

    const page = await browser.newPage();

    // Open Play Store page
    await page.goto(url, { waitUntil: "domcontentloaded" });

    await page.waitForLoadState('networkidle');

    // Get Game Name
    const gameTitle = await page.locator("h1").first().textContent();

    // Get Google Play link
    const Google_link = page.url();

    // Get Developer name
    const developer = await page.locator('a[href*="dev"]').first().textContent();

    // fetch Dev id & Locate by text (e.g., the "Website" link on a Play Store page)

    let dev_href = "N/A";

    try {

      // get developer page link
      const devPage = await page.locator('a[href*="/store/apps/dev"]').first().getAttribute("href");

      const devUrl = "https://play.google.com" + devPage;

      console.log("Developer Page:", devUrl);

      // open developer page
      await page.goto(devUrl, { waitUntil: "domcontentloaded" });

      const websiteLocator = page.getByRole("link", { name: /visit website/i });

      if (await websiteLocator.count() > 0) {
        dev_href = await websiteLocator.first().getAttribute("href");
      }

    } catch (err) {
      dev_href = "N/A";
    }

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

    let Launch_Timeframe = await page.getByLabel(`Launch timeframe`);

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

    await page.getByLabel('Official forums (game website, FB').fill(dev_href);

    // Step click on submit button


    await page.getByRole('button', { name: 'submit' }).click();

    await page.waitForTimeout(2000);

    // Close browser
    await browser.close();

    //  Optional form submission via API
    // await axios.post(
    //   "https://docs.google.com/forms/d/e/1FAIpQLSefoeEJUV7joqOQGsHFFf4ukw5NhtnFZYZVwjnUzg9Kpsqcig/formResponse",
    //   new URLSearchParams({
    //     "entry.1645981813": gameTitle,
    //     "entry.1449005772": Google_link,
    //     "entry.1685270148": developer,
    //     "entry.558663507": "IP2"
    //   }),
    //   {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //       "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
    //       "Accept": "text/html,application/xhtml+xml"
    //     }
    //   }
    // );


    // API response
    // Cleaned up API response in server.js
  res.json({
    status: "success",
    message: "Game added successfully and submitted to Google Form",
    gameName: gameTitle,
    googleLink: Google_link,
    developer: developer,
    developerWebsite: dev_href,
    targetGeo: language
});

  }  catch (error) {
    console.error("❌ Backend Error:", error.message);
    
    // ✅ Close browser FIRST
    if (browser) {
      await browser.close();
    }
    
    // ✅ Then send ONE response
    res.status(500).json({ error: error.message });
}



});

