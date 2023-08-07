const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const username = 'YOUR USERNAME'
  const password = 'YOUR PASSWORD'
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://utexas.app.box.com/folder/0');
  // Click the Continue button
  await page.waitForSelector('.btn.btn-primary.btn-full-width');
  await page.click('.btn.btn-primary.btn-full-width');

  // Wait for navigation to the new page
  await page.waitForNavigation();

  // Input the username and password
  await page.type('#username', username);
  await page.type('#password', password);

  // Click the proceed input
  await page.click('input[name="_eventId_proceed"]');

  // Wait for navigation to the next page
  await page.waitForNavigation();

   // Wait for 2 seconds

  // Wait until the URL contains "duosecurity.com"
  await page.waitForSelector('#trust-browser-button');

  // Click on the button with id "trust-browser-button"
  await page.click('#trust-browser-button');

  await page.waitForNavigation();

  await page.waitForTimeout(10000);

   // Click on the element with data-resin-folder_id="219769283041"
  await page.click('[data-resin-folder_id="219769283041"]');

  // Wait for navigation to the new page
  await page.waitForNavigation();

  await page.waitForTimeout(50000);

  
  // Click on the <button> with the property data-resin-target="uploadmenubutton"
  await page.waitForSelector('[data-resin-target="uploadmenubutton"]');
  await page.click('[data-resin-target="uploadmenubutton"]');

  // Wait for two seconds
  await page.waitForTimeout(2000);
 
  const materialPath = path.join(__dirname, 'text.txt');
 
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click('.menu-item.UploadMenuItem')


  ])
  await fileChooser.accept([materialPath])

  await page.waitForTimeout(3000);


  await browser.close();
})();