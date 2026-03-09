//import detectLanguage from "./utils/languageDetector";

import { test, expect } from '@playwright/test';
import { Locator } from '@playwright/test';

test('test', async ({ page }) => {

  // 1. opeaning google form
  await page.goto('https://play.google.com/store/apps/details?id=vnggames.samkok.fantasy');

const dev_id = await page.getByLabel('See more information on More by ').click()

// Locate by text (e.g., the "Website" link on a Play Store page)
const href = await page.getAttribute('text="Visit website"', 'href');

console.log('The URL is:', href);



  //await page.goto('https://docs.google.com/forms/d/e/1FAIpQLSfNFbqE1XvEbd3xZlkXAhKmrkzH2OxZXuYcaK7d61CcAztSEg/viewform');
//  await page.getByRole('checkbox', { name: 'Record email as the email to' }).click(({ delay: 2000 }));

await page.waitForTimeout(5000); // waits for 2 seconds


});