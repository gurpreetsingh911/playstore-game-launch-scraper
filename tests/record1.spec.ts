//import detectLanguage from "./utils/languageDetector";

import { test, expect } from '@playwright/test';
import { Locator } from '@playwright/test';

test('test', async ({ page }) => {

  // 1. opeaning google form
  await page.goto('https://docs.google.com/forms/d/e/1FAIpQLSfNFbqE1XvEbd3xZlkXAhKmrkzH2OxZXuYcaK7d61CcAztSEg/viewform');
  await page.getByRole('checkbox', { name: 'Record email as the email to' }).click(({ delay: 2000 }));

  
// 3. Launch timeframe -> add todays data
    //For added Current date in Launch timeframe




await page.waitForTimeout(5000); // waits for 2 seconds


});